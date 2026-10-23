/*
 * POST /api/enquiry  (Vercel Node function, CommonJS)
 * Body (JSON): { name, email, organisation, type, message, website }
 * 'website' is a honeypot: humans leave it empty.
 *
 * Environment variable NAMES (set values in the Vercel dashboard, never in code):
 *   RESEND_API_KEY   required to send. If missing, this returns 503 {error:'not_configured'}
 *                    and the browser falls back to a prefilled mailto: link.
 *   ENQUIRY_TO       optional, defaults to admin@luviumcapital.com
 *   ENQUIRY_FROM     optional, defaults to "Luvium Capital <onboarding@resend.dev>".
 *                    Use an address on a Resend-verified domain once DNS (SPF, DKIM, DMARC) is done.
 */
'use strict';

const TYPES = {
  general: 'General enquiry',
  documents: 'Investor documents request',
  funder: 'Funder or co-lender',
  insurer: 'Insurer or guarantor',
  data: 'Data or verification provider',
  network: 'Dealer network or OEM channel'
};

// Best-effort limiter. Serverless instances are short-lived, so this only slows bursts.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip) {
  const now = Date.now();
  const rec = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  rec.push(now);
  hits.set(ip, rec);
  if (hits.size > 500) {
    for (const [k, v] of hits) { if (!v.some((t) => now - t < WINDOW_MS)) { hits.delete(k); } }
  }
  return rec.length > MAX_HITS;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'method_not_allowed' });
  }

  const ctype = String(req.headers['content-type'] || '');
  if (ctype.indexOf('application/json') === -1) {
    return send(res, 400, { error: 'bad_request', message: 'Unsupported content type.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  if (!body || typeof body !== 'object') {
    return send(res, 400, { error: 'bad_request', message: 'We could not read that message.' });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (clean(body.website, 200)) { return send(res, 200, { ok: true }); }

  const ip = String((req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket.remoteAddress || 'unknown').trim();
  if (limited(ip)) {
    return send(res, 429, { error: 'rate_limited', message: 'Too many messages in a short time. Please try again later.' });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const organisation = clean(body.organisation, 160);
  const type = TYPES[body.type] ? body.type : 'general';
  const message = clean(body.message, 4000);

  if (!name) { return send(res, 400, { error: 'invalid', message: 'Please enter your name.' }); }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { return send(res, 400, { error: 'invalid', message: 'Please enter a valid email address.' }); }
  if (message.length < 5) { return send(res, 400, { error: 'invalid', message: 'Please tell us a little about your enquiry.' }); }

  const key = String(process.env.RESEND_API_KEY || '').trim();
  if (!key) { return send(res, 503, { error: 'not_configured' }); }

  const to = String(process.env.ENQUIRY_TO || '').trim() || 'admin@luviumcapital.com';
  const from = String(process.env.ENQUIRY_FROM || '').trim() || 'Luvium Capital <onboarding@resend.dev>';
  const subject = 'Website enquiry: ' + TYPES[type] + ' (' + name + ')';
  const text = 'Name: ' + name + '\nEmail: ' + email + '\nOrganisation: ' + (organisation || '-') +
    '\nType: ' + TYPES[type] + '\n\n' + message + '\n';
  const html = '<p><strong>Name:</strong> ' + esc(name) + '<br><strong>Email:</strong> ' + esc(email) +
    '<br><strong>Organisation:</strong> ' + esc(organisation || '-') + '<br><strong>Type:</strong> ' + esc(TYPES[type]) +
    '</p><p>' + esc(message).replace(/\n/g, '<br>') + '</p>';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html })
    });
    if (!r.ok) { return send(res, 502, { error: 'upstream_failed' }); }
    return send(res, 200, { ok: true });
  } catch (e) {
    return send(res, 502, { error: 'upstream_failed' });
  }
};
