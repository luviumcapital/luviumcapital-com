// Run: node --test test/forms.test.mjs   (no network, no keys; fetch is mocked)
import test from "node:test";
import assert from "node:assert/strict";
import contact from "../api/contact.js";
import subscribe from "../api/subscribe.js";

function mk(body, method = "POST", ip = "1.1.1." + Math.floor(Math.random() * 250)) {
  const res = {
    code: 0, body: null, headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.code = c; return this; },
    json(o) { this.body = o; return this; },
  };
  return [{ method, body, headers: { "x-forwarded-for": ip } }, res];
}
const okFetch = (log) => async (url, opt) => { log.push({ url, opt }); return { ok: true, status: 201, json: async () => ({ success: true }) }; };

test("contact: valid enquiry sends one Resend email", async () => {
  process.env.RESEND_API_KEY = "test"; delete process.env.TURNSTILE_SECRET_KEY;
  const log = []; const [req, res] = mk({ name: "A Dealer", email: "a@dealer.co.za", message: "We want floor plan finance." });
  await contact(req, res, { fetch: okFetch(log) });
  assert.equal(res.code, 200); assert.equal(log.length, 1); assert.match(log[0].url, /resend/);
});
test("contact: honeypot sends nothing", async () => {
  process.env.RESEND_API_KEY = "test"; const log = [];
  const [req, res] = mk({ name: "Bot", email: "b@x.com", message: "spam spam spam", website: "http://spam" });
  await contact(req, res, { fetch: okFetch(log) });
  assert.equal(res.code, 200); assert.equal(log.length, 0);
});
test("contact: bad input rejected", async () => {
  const [req, res] = mk({ name: "", email: "nope", message: "hi" });
  await contact(req, res, { fetch: okFetch([]) });
  assert.equal(res.code, 400);
});
test("contact: html in message is escaped", async () => {
  process.env.RESEND_API_KEY = "test"; const log = [];
  const [req, res] = mk({ name: "X", email: "x@y.co.za", message: "<script>alert(1)</script> hello" });
  await contact(req, res, { fetch: okFetch(log) });
  assert.ok(!JSON.parse(log[0].opt.body).html.includes("<script>"));
});
test("contact: GET not allowed", async () => {
  const [req, res] = mk({}, "GET"); await contact(req, res, {}); assert.equal(res.code, 405);
});
test("contact: not configured returns 500", async () => {
  delete process.env.RESEND_API_KEY;
  const [req, res] = mk({ name: "A", email: "a@b.co", message: "ten chars+ here" });
  await contact(req, res, { fetch: okFetch([]) }); assert.equal(res.code, 500);
});
test("contact: rate limit after 5 from same ip", async () => {
  process.env.RESEND_API_KEY = "test"; const ip = "9.9.9.9"; let last;
  for (let i = 0; i < 7; i++) {
    const [req, res] = mk({ name: "A", email: "a@b.co", message: "ten chars+ here" }, "POST", ip);
    await contact(req, res, { fetch: okFetch([]) }); last = res.code;
  }
  assert.equal(last, 429);
});
test("subscribe: valid email adds to Brevo list", async () => {
  process.env.BREVO_API_KEY = "test"; process.env.BREVO_LIST_ID = "3"; const log = [];
  const [req, res] = mk({ email: "News@Reader.com" });
  await subscribe(req, res, { fetch: okFetch(log) });
  assert.equal(res.code, 200); assert.equal(JSON.parse(log[0].opt.body).email, "news@reader.com");
});
test("subscribe: not configured returns 500", async () => {
  delete process.env.BREVO_API_KEY; const [req, res] = mk({ email: "a@b.co" });
  await subscribe(req, res, { fetch: okFetch([]) }); assert.equal(res.code, 500);
});
