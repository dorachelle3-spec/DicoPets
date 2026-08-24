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
       pâle héritée d'un ancien thème. Les boutons clairs restent traités séparément. */
    if(!document.getElementById('dicopetsContrastFix')){
      const style=document.createElement('style');style.id='dicopetsContrastFix';style.textContent=`
html[data-theme="light"]{color-scheme:light!important}
html[data-theme="light"] body{background:#f7f3e9!important;color:#18352c!important}
html[data-theme="light"] :is(.promise,.intro,.news-section,.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card,.notification-help,.notification-ios-notice){color:#18352c!important}
html[data-theme="light"] :is(.promise,.intro,.news-section,.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card) :is(h1,h2,h3,h4,p,small,label,li,dt,dd,strong){color:#18352c!important}
html[data-theme="light"] :is(.promise,.intro,.news-section,.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card) :is(input,textarea,select){background:#fff!important;color:#18352c!important;border-color:#b9c7bb!important}
html[data-theme="light"] :is(.member-badge,.member-favorite,.quality,.badge,.tag,.points-total,.favourite-status){background:#e8f0e8!important;color:#18352c!important}
html[data-theme="light"] :is(.button,.open,.google,.journal-button,.member-actions .btn,.account-actions button){color:#fff!important}
html[data-theme="light"] :is(.button-ghost,.account-actions .secondary,.journal-button,.credits-hero-button){color:#173b30!important}
html[data-theme="light"] .official-badge{background:#234238!important;color:#fff!important}
html[data-theme="light"] .member-favorite small{color:#53695e!important}
html[data-theme="light"] .member-favorite-remove{background:#fff!important;color:#87433d!important}
/* Fenêtres de connexion et de publication : elles ne doivent jamais hériter
   d'un texte blanc prévu pour une bannière sombre. */
html[data-theme="light"] :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box){background:#fffdf8!important;color:#18352c!important;border:1px solid #d7dfd5!important;box-shadow:0 24px 70px #071b1555!important}
html[data-theme="light"] :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box) :is(h1,h2,h3,h4,p,label,.status,.help,.account-message){color:#18352c!important}
html[data-theme="light"] :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box) :is(input,textarea,select){background:#fff!important;color:#18352c!important;border-color:#b9c7bb!important}
html[data-theme="light"] :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box) .button:not(.button-ghost):not(.button-danger),html[data-theme="light"] :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box) .btn:not(.danger){color:#fff!important}
html[data-theme="light"] :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box) .button-ghost{color:#173b30!important}
html[data-theme="light"] :is(.modal-close,.owner-close,.account-close,.comment-auth-close){background:#edf2ec!important;color:#173b30!important;border-radius:10px!important}
/* Finition moderne légère : profondeur discrète, sans alourdir l'interface. */
html[data-theme="light"] :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box){border-radius:22px!important}
`;document.head.appendChild(style);
    }
  };
  apply();
  document.addEventListener('DOMContentLoaded', apply);
  window.DicoPetsTheme = { set: apply, getPreference: () => 'light', getTheme: () => 'light' };
})();
