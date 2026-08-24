/* DicoPets reste volontairement en mode clair pour une lecture fiable sur tous les appareils. */
(() => {
  'use strict';
  try { localStorage.removeItem('dicopetsThemePreference'); } catch (_) {}
  const apply = () => {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#173b30');
    document.querySelectorAll('.member-theme').forEach(node => node.remove());
  };
  apply();
  document.addEventListener('DOMContentLoaded', apply);
  window.DicoPetsTheme = { set: apply, getPreference: () => 'light', getTheme: () => 'light' };
})();
