/* DicoPets reste volontairement en mode clair pour une lecture fiable sur tous les appareils. */
(() => {
  'use strict';
  try { localStorage.removeItem('dicopetsThemePreference'); } catch (_) {}
  const apply = () => {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#173b30');
    document.querySelectorAll('.member-theme').forEach(node => node.remove());
    /* Sécurité de lisibilité : aucune zone claire ne garde une ancienne couleur
       pâle héritée du mode sombre ou d'une ancienne couleur personnelle. */
    if(!document.getElementById('dicopetsContrastFix')){
      const style=document.createElement('style');style.id='dicopetsContrastFix';style.textContent=`
html[data-theme="light"]{color-scheme:light!important}
html[data-theme="light"] body{background:#f7f3e9!important;color:#18352c!important}
html[data-theme="light"] :is(.promise,.intro,.news-section,.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card,.notification-help,.notification-ios-notice){color:#18352c!important}
html[data-theme="light"] :is(.promise,.intro,.news-section,.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card) :is(h1,h2,h3,h4,p,small,span,label,li,dt,dd,strong){color:inherit!important}
html[data-theme="light"] :is(.promise,.intro,.news-section,.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card) :is(input,textarea,select){background:#fff!important;color:#18352c!important;border-color:#b9c7bb!important}
html[data-theme="light"] :is(.member-badge,.member-favorite,.quality,.badge,.tag,.points-total,.favourite-status){background:#e8f0e8!important;color:#18352c!important}
html[data-theme="light"] :is(.button,.open,.google,.journal-button,.member-actions .btn,.account-actions button){color:#fff!important}
html[data-theme="light"] :is(.button-ghost,.account-actions .secondary,.journal-button){color:#173b30!important}
`;document.head.appendChild(style);
    }
  };
  apply();
  document.addEventListener('DOMContentLoaded', apply);
  window.DicoPetsTheme = { set: apply, getPreference: () => 'light', getTheme: () => 'light' };
})();
