/* Runs before first paint: marks JS as available and applies the saved or system theme. */
(function () {
  var r = document.documentElement;
  r.classList.add('js');
  var t = null;
  try { t = localStorage.getItem('lv-theme'); } catch (e) { t = null; }
  if (t !== 'light' && t !== 'dark') {
    t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  r.setAttribute('data-theme', t);
})();
