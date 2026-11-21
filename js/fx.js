/* Test-4 · Modern fintech: page-specific behaviour.
   Dashboard tilt that flattens as you scroll, cursor glow on feature cards,
   and the Service finder that pre-fills the booking form. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------- Dashboard: tilted at first, flattens as it scrolls into view ----------
  var dash = document.getElementById('dash');
  if (dash) {
    if (reduce) {
      dash.style.setProperty('--tilt', '0deg'); dash.style.setProperty('--scale', '1');
    } else {
      var ticking = false;
      var update = function () {
        ticking = false;
        var r = dash.getBoundingClientRect();
        var vh = window.innerHeight;
        var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * .75)));
        dash.style.setProperty('--tilt', (14 * (1 - p)).toFixed(2) + 'deg');
        dash.style.setProperty('--scale', (.96 + .04 * p).toFixed(3));
      };
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      window.addEventListener('resize', update);
      update();
    }
  }

  // ---------- Dashboard greeting follows the visitor's time of day ----------
  var hello = document.querySelector('.dash-head strong');
  if (hello) {
    var h = new Date().getHours();
    hello.textContent = (h < 12 ? 'Good morning' : (h < 18 ? 'Good afternoon' : 'Good evening')) + ', Alex';
  }

  // ---------- Cursor glow on feature cards ----------
  if (fine) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-glow]'), function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  // ---------- Service finder ----------
  var NAMES = {
    personal: 'Personal tax returns', selfemp: 'Self-employed & small business tax', corp: 'Corporate tax & year-end',
    books: 'Bookkeeping', payroll: 'Payroll', setup: 'Business set-up & incorporation', planning: 'Tax planning',
    cra: 'CRA support & catch-up filing', cfo: 'Advisory & fractional CFO'
  };
  var ORDER = Object.keys(NAMES);
  var chips = document.querySelectorAll('.chip');
  var list = document.getElementById('fr-list');
  var count = document.getElementById('fr-count');
  var cta = document.getElementById('fr-cta');
  if (!chips.length || !list) return;

  function render() {
    var keys = [], kinds = {};
    Array.prototype.forEach.call(chips, function (c) {
      if (c.getAttribute('aria-pressed') !== 'true') return;
      kinds[c.getAttribute('data-kind')] = true;
      c.getAttribute('data-svc').split(' ').forEach(function (k) { if (keys.indexOf(k) === -1) keys.push(k); });
    });
    keys.sort(function (a, b) { return ORDER.indexOf(a) - ORDER.indexOf(b); });
    list.textContent = '';
    if (!keys.length) {
      var empty = document.createElement('li');
      empty.className = 'fr-empty';
      empty.textContent = 'Pick a few situations to see your match.';
      list.appendChild(empty);
    }
    keys.forEach(function (k, i) {
      var li = document.createElement('li');
      li.textContent = NAMES[k];
      li.style.animationDelay = (i * 60) + 'ms';
      list.appendChild(li);
    });
    count.textContent = keys.length;
    var type = (kinds.personal && kinds.business) || kinds.both ? 'both' : (kinds.business ? 'business' : 'personal');
    cta.setAttribute('data-plan', keys.map(function (k) { return NAMES[k]; }).join(', '));
    cta.setAttribute('data-type', type);
    cta.setAttribute('aria-disabled', keys.length ? 'false' : 'true');
    if (keys.length) cta.removeAttribute('tabindex'); else cta.setAttribute('tabindex', '-1');
  }
  Array.prototype.forEach.call(chips, function (c) {
    c.addEventListener('click', function () {
      c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      render();
    });
  });
  render();
})();
