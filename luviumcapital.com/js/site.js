/* Luvium Capital: progressive enhancement only. Every page works with this file disabled. */
(function () {
  'use strict';

  var d = document;
  var root = d.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MAIL = 'admin@luviumcapital.com';

  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }

  /* Theme toggle */
  var themeBtn = $('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('lv-theme', next); } catch (e) { /* storage blocked: fine */ }
      themeBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
    themeBtn.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* Mobile menu */
  var navBtn = $('[data-nav-toggle]');
  var nav = $('#nav-links');
  if (navBtn && nav) {
    var setNav = function (open) {
      nav.classList.toggle('open', open);
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      var u = navBtn.querySelector('use');
      if (u) { u.setAttribute('href', open ? '/icons.svg#x' : '/icons.svg#list'); }
    };
    navBtn.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { setNav(false); } });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setNav(false); } });
  }

  /* Reveal on scroll */
  var revealEls = $$('.reveal, .matrix');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Matrix stagger (CSSOM, so it is allowed by the CSP) */
  $$('.matrix').forEach(function (m) {
    $$('i', m).forEach(function (c, i) { c.style.transitionDelay = (reduce ? 0 : i * 16) + 'ms'; });
  });

  /* Number counters. Final text is in the HTML, so no-JS shows the real value. */
  function fmt(n, dec) {
    return n.toLocaleString('en-ZA', { minimumFractionDigits: dec, maximumFractionDigits: dec }).replace(/ /g, ' ');
  }
  var counters = $$('[data-count]');
  counters.forEach(function (el) {
    el.setAttribute('aria-label', el.textContent.trim());
  });
  if (!reduce && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        cio.unobserve(en.target);
        run(en.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) {
      var pre = el.getAttribute('data-prefix') || '';
      var suf = el.getAttribute('data-suffix') || '';
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = pre + fmt(0, dec) + suf;
      cio.observe(el);
    });
  }
  function run(el) {
    var to = parseFloat(el.getAttribute('data-count'));
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var t0 = null, dur = 1500;
    function tick(t) {
      if (t0 === null) { t0 = t; }
      var p = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(to * e, dec) + suf;
      if (p < 1) { requestAnimationFrame(tick); } else { el.textContent = pre + fmt(to, dec) + suf; }
    }
    requestAnimationFrame(tick);
  }

  /* Active section in the nav */
  var links = $$('.nav-links a[href^="/#"], .nav-links a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { var id = a.getAttribute('href').split('#')[1]; if (id) { map[id] = a; } });
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'location');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var s = d.getElementById(id); if (s) { sio.observe(s); } });
  }

  /* Floor plan illustrator: plain arithmetic on the figures printed on the page. */
  var cd = $('#calc-dealers'), cf = $('#calc-facility'), cr = $('#calc-return');
  if (cd && cf && cr) {
    var calcMatrix = $('#calc-matrix');
    var money = function (m) { return m >= 1000 ? 'R' + (m / 1000).toFixed(2) + 'bn' : 'R' + m.toFixed(1) + 'M'; };
    var update = function () {
      var dealers = parseInt(cd.value, 10);
      var fac = parseFloat(cf.value);
      var rate = parseFloat(cr.value);
      var capital = dealers * fac;
      var interest = capital * rate / 100;
      $('#o-dealers').textContent = dealers;
      $('#o-facility').textContent = 'R' + fac.toFixed(1) + 'M';
      $('#o-return').textContent = rate.toFixed(1) + '%';
      $('#r-capital').textContent = money(capital);
      $('#r-interest').textContent = money(interest);
      if (calcMatrix) {
        $$('i', calcMatrix).forEach(function (c, i) { c.classList.toggle('off', i >= dealers); });
      }
    };
    ['input', 'change'].forEach(function (ev) {
      cd.addEventListener(ev, update); cf.addEventListener(ev, update); cr.addEventListener(ev, update);
    });
    update();
  }

  /* Enquiry forms: POST JSON to /api/enquiry, fall back to a prefilled email. */
  var TYPE_LABELS = {
    general: 'General enquiry', documents: 'Investor documents request', funder: 'Funder or co-lender',
    insurer: 'Insurer or guarantor', data: 'Data or verification provider', network: 'Dealer network or OEM channel'
  };
  var qtype = null;
  try { qtype = new URLSearchParams(window.location.search).get('type'); } catch (e) { qtype = null; }

  $$('form[data-enquiry]').forEach(function (form) {
    var status = $('.form-status', form);
    var btn = $('button[type="submit"]', form);
    var sel = $('select[name="type"]', form);
    if (sel && qtype && TYPE_LABELS[qtype]) { sel.value = qtype; }
    if (sel && form.getAttribute('data-default-type') && !qtype) { sel.value = form.getAttribute('data-default-type'); }

    function setStatus(msg, state) { if (status) { status.textContent = msg; status.setAttribute('data-state', state || ''); } }
    function fieldErr(input, msg) {
      var holder = input.closest('.field'); var e = holder && $('.err', holder);
      if (msg) { input.setAttribute('aria-invalid', 'true'); } else { input.removeAttribute('aria-invalid'); }
      if (e) { e.textContent = msg || ''; }
    }
    $$('input, select, textarea', form).forEach(function (i) {
      i.addEventListener('input', function () { fieldErr(i, ''); });
    });

    function validate() {
      var ok = true, first = null;
      var nameI = form.elements.name, emailI = form.elements.email, msgI = form.elements.message;
      [[nameI, 'Please enter your name.'], [emailI, 'Please enter a valid email address.'], [msgI, 'Please tell us a little about your enquiry.']].forEach(function (p) {
        var el = p[0]; var v = (el.value || '').trim(); var bad = !v;
        if (el === emailI && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { bad = true; }
        fieldErr(el, bad ? p[1] : '');
        if (bad) { ok = false; if (!first) { first = el; } }
      });
      if (first) { first.focus(); }
      return ok;
    }

    function mailtoFallback(data) {
      var subject = 'Website enquiry: ' + (TYPE_LABELS[data.type] || 'General enquiry');
      var body = 'Name: ' + data.name + '\nEmail: ' + data.email + '\nOrganisation: ' + data.organisation +
        '\nType: ' + (TYPE_LABELS[data.type] || data.type) + '\n\n' + data.message;
      if (body.length > 1500) { body = body.slice(0, 1500) + '\n[message shortened]'; }
      window.location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!validate()) { setStatus('Please check the highlighted fields.', 'error'); return; }
      var data = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        organisation: (form.elements.organisation.value || '').trim(),
        type: form.elements.type.value,
        message: form.elements.message.value.trim(),
        website: (form.elements.website && form.elements.website.value) || ''
      };
      btn.disabled = true; setStatus('Sending...', '');
      var ctl = ('AbortController' in window) ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctl) { ctl.abort(); } }, 12000);
      fetch('/api/enquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
        signal: ctl ? ctl.signal : undefined
      }).then(function (res) {
        clearTimeout(timer);
        if (res.ok) {
          setStatus('Thank you. Your message has been sent and we will reply to ' + data.email + '.', 'ok');
          form.reset(); if (sel && qtype && TYPE_LABELS[qtype]) { sel.value = qtype; }
          return;
        }
        if (res.status === 400 || res.status === 429) {
          return res.json().catch(function () { return {}; }).then(function (j) {
            setStatus(j.message || 'We could not accept that message. Please check the fields and try again.', 'error');
          });
        }
        throw new Error('fallback');
      }).catch(function () {
        clearTimeout(timer);
        setStatus('We could not send this online, so your email app should open with the message ready. You can also write to ' + MAIL + '.', 'error');
        mailtoFallback(data);
      }).then(function () { btn.disabled = false; });
    });
  });
})();
