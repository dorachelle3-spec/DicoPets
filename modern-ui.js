/* Habillage commun DicoPets : moderne, léger et compatible tactile. */
(() => {
  'use strict';
  const style = document.createElement('style');
  style.id = 'dicopets-modern-ui';
  style.textContent = `
    :root{--dp-forest:#4a321b;--dp-forest-2:#765127;--dp-gold:#bc8537;--dp-paper:#fffaf1;--dp-mist:#f2e7d2;--dp-line:#dfc9a4;--dp-shadow:0 18px 45px rgba(74,50,27,.12)}
    html{scroll-padding-top:92px}
    body{background:radial-gradient(circle at 8% 5%,#f6e8c9 0,transparent 28rem),radial-gradient(circle at 92% 12%,#f4dec0 0,transparent 25rem),#f8f0e2!important;color:#3c2b1c!important}
    body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;opacity:.42;background-image:linear-gradient(90deg,rgba(112,75,30,.022) 1px,transparent 1px),linear-gradient(rgba(112,75,30,.022) 1px,transparent 1px);background-size:34px 34px}
    .top,.topbar,header.top{background:linear-gradient(110deg,#4a321b,#765127)!important;box-shadow:0 1px 0 rgba(255,255,255,.12),0 9px 28px rgba(56,34,15,.18)}
    .nav,.controls{background:rgba(255,250,241,.91)!important;border-color:#dfc9a4!important;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 9px 24px rgba(84,54,20,.08)}
    .nav a{position:relative;transition:color .2s ease,background .2s ease,transform .2s ease}
    .nav a{color:#4a321b!important}.nav a::after{content:'';position:absolute;left:15%;right:15%;bottom:5px;height:2px;border-radius:99px;background:var(--dp-gold);transform:scaleX(0);transition:transform .2s ease}
    .nav a:hover::after,.nav a:focus-visible::after{transform:scaleX(1)}
    :is(.button,.btn,.open,.google,.journal-button,button:not(.close):not(.modal-close):not(.owner-close):not(.account-close):not(.member-close):not(.password-eye)):not([disabled]){transition:transform .18s ease,box-shadow .18s ease,filter .18s ease!important;box-shadow:0 8px 18px rgba(74,50,27,.16)}
    :is(.button,.btn,.open,.google,.journal-button,button:not(.close):not(.modal-close):not(.owner-close):not(.account-close):not(.member-close):not(.password-eye)):not([disabled]):hover{transform:translateY(-2px);filter:saturate(1.06);box-shadow:0 13px 25px rgba(74,50,27,.23)}
    :is(.button,.btn,.open,.google,.journal-button,button):active{transform:translateY(1px)!important}
    :is(input,textarea,select){transition:border-color .18s ease,box-shadow .18s ease!important}
    :is(input,textarea,select):focus{outline:none!important;border-color:#b68439!important;box-shadow:0 0 0 4px rgba(196,147,67,.16)!important}
    :is(.world-card,.tool-card,.card,.credit,.equip-card,.news-card,.profile,.signal,.term,.job,.disc,.detail,.comparison .profile,.adoption-result,.event-card,.member-box,.account-box,.modal-box,.owner-box,.auth-box,.sheet){box-shadow:0 10px 28px rgba(74,50,27,.075);transition:transform .24s ease,box-shadow .24s ease,border-color .24s ease}
    :is(.world-card,.tool-card,.card,.credit,.equip-card,.news-card,.profile,.signal,.term,.job,.disc,.detail,.comparison .profile,.event-card):hover{transform:translateY(-5px);box-shadow:var(--dp-shadow);border-color:rgba(196,147,67,.52)!important}
    :is(.world-card,.tool-card,.card,.credit,.equip-card,.news-card,.profile,.signal,.term,.job,.disc,.detail,.comparison .profile){overflow:hidden}
    .world-card img,.tool-card img,.credit img,.equip-card img,.news-card img{transition:transform .5s cubic-bezier(.2,.7,.2,1),filter .5s ease}
    :is(.world-card,.tool-card,.credit,.equip-card,.news-card):hover img{transform:scale(1.035);filter:saturate(1.06)}
    .modal,.owner-modal,.account-modal,.member-modal,.auth-modal,.comment-auth-modal{backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px)}
    /* Palette doré et beige : zones claires et texte foncé, sans exception. */
    html[data-theme="light"] :is(.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card,.notification-help,.notification-ios-notice,.credit,.equip-card,.news-card,.modal-box,.owner-box,.auth-box,.comment-auth-box){background:#fffaf1!important;color:#3c2b1c!important;border-color:#dfc9a4!important}
    html[data-theme="light"] :is(.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card,.notification-help,.notification-ios-notice,.credit,.equip-card,.news-card,.modal-box,.owner-box,.auth-box,.comment-auth-box) :is(h1,h2,h3,h4,p,small,label,li,dt,dd,strong){color:#3c2b1c!important}
    html[data-theme="light"] :is(.detail,.fact,.quality,.member-badge,.member-favorite,.tag,.points-total,.favourite-status,.signal-illustration){background:#f2e7d2!important;color:#3c2b1c!important}
    html[data-theme="light"] :is(.button,.btn,.open,.google,.journal-button){background:#bc8537!important;color:#fff!important}
    html[data-theme="light"] :is(.button-ghost,.secondary,.credits-hero-button){background:#fffaf1!important;color:#4a321b!important;border-color:#bc8537!important}
    html[data-theme="light"] :is(input,textarea,select){background:#fffdf8!important;color:#3c2b1c!important;border-color:#cfb17e!important}
    html[data-theme="light"] :is(.official-badge,.button-danger,.danger){background:#934949!important;color:#fff!important}
    html[data-theme="light"] :is(.panel,.book,.library,.entry,.entries,.member-box,.account-box,.sheet,.world-card,.tool-card,.tool,.card,.profile,.adoption-result,.signal,.event-card,.credit,.equip-card,.news-card,.modal-box,.owner-box,.auth-box,.comment-auth-box) .official-badge{background:#934949!important;color:#fff!important}
    :is(.modal-box,.owner-box,.account-box,.auth-box,.comment-auth-box,.member-box,.sheet){border-radius:24px!important}
    .modern-reveal{opacity:0;transform:translateY(24px);transition:opacity .52s ease,transform .52s cubic-bezier(.2,.7,.2,1)}
    .modern-reveal.is-visible{opacity:1;transform:none}
    @media(max-width:720px){body::before{background-size:26px 26px}.modern-reveal{transform:translateY(14px)}:is(.world-card,.tool-card,.card,.credit,.equip-card,.news-card,.profile,.signal,.term,.job,.disc,.detail,.comparison .profile,.event-card):hover{transform:none}}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}.modern-reveal{opacity:1;transform:none}}
  `;
  document.head.appendChild(style);

  const candidates = [
    '.world-card','.tool-card','.card','.credit','.equip-card','.news-card','.profile',
    '.signal','.term','.job','.disc','.detail','.event-card','.summary-box','.panel'
  ];
  const nodes = [...new Set(candidates.flatMap(selector => [...document.querySelectorAll(selector)]))].slice(0,220);
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: .08 });
  nodes.forEach((node, index) => {
    node.classList.add('modern-reveal');
    node.style.transitionDelay = `${Math.min(index % 5, 4) * 45}ms`;
    observer.observe(node);
  });
})();
