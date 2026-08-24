/* Habillage commun DicoPets : moderne, léger et compatible tactile. */
(() => {
  'use strict';
  const style = document.createElement('style');
  style.id = 'dicopets-modern-ui';
  style.textContent = `
    :root{--dp-forest:#173b30;--dp-forest-2:#285f4c;--dp-gold:#c49343;--dp-paper:#fffdf8;--dp-mist:#eef4ed;--dp-line:#d7e2d7;--dp-shadow:0 18px 45px rgba(23,59,48,.10)}
    html{scroll-padding-top:92px}
    body{background:radial-gradient(circle at 8% 5%,#eef5ec 0,transparent 28rem),radial-gradient(circle at 92% 12%,#f7e9ca 0,transparent 25rem),#f8f5ed!important}
    body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;opacity:.42;background-image:linear-gradient(90deg,rgba(23,59,48,.018) 1px,transparent 1px),linear-gradient(rgba(23,59,48,.018) 1px,transparent 1px);background-size:34px 34px}
    .top,.topbar,header.top{box-shadow:0 1px 0 rgba(255,255,255,.12),0 9px 28px rgba(8,37,28,.16)}
    .nav,.controls{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 9px 24px rgba(23,59,48,.06)}
    .nav a{position:relative;transition:color .2s ease,background .2s ease,transform .2s ease}
    .nav a::after{content:'';position:absolute;left:15%;right:15%;bottom:5px;height:2px;border-radius:99px;background:var(--dp-gold);transform:scaleX(0);transition:transform .2s ease}
    .nav a:hover::after,.nav a:focus-visible::after{transform:scaleX(1)}
    :is(.button,.btn,.open,.google,.journal-button,button:not(.close):not(.modal-close):not(.owner-close):not(.account-close):not(.member-close):not(.password-eye)):not([disabled]){transition:transform .18s ease,box-shadow .18s ease,filter .18s ease!important;box-shadow:0 8px 18px rgba(23,59,48,.15)}
    :is(.button,.btn,.open,.google,.journal-button,button:not(.close):not(.modal-close):not(.owner-close):not(.account-close):not(.member-close):not(.password-eye)):not([disabled]):hover{transform:translateY(-2px);filter:saturate(1.06);box-shadow:0 13px 25px rgba(23,59,48,.20)}
    :is(.button,.btn,.open,.google,.journal-button,button):active{transform:translateY(1px)!important}
    :is(input,textarea,select){transition:border-color .18s ease,box-shadow .18s ease!important}
    :is(input,textarea,select):focus{outline:none!important;border-color:#b68439!important;box-shadow:0 0 0 4px rgba(196,147,67,.16)!important}
    :is(.world-card,.tool-card,.card,.credit,.equip-card,.news-card,.profile,.signal,.term,.job,.disc,.detail,.comparison .profile,.adoption-result,.event-card,.member-box,.account-box,.modal-box,.owner-box,.auth-box,.sheet){box-shadow:0 10px 28px rgba(23,59,48,.075);transition:transform .24s ease,box-shadow .24s ease,border-color .24s ease}
    :is(.world-card,.tool-card,.card,.credit,.equip-card,.news-card,.profile,.signal,.term,.job,.disc,.detail,.comparison .profile,.event-card):hover{transform:translateY(-5px);box-shadow:var(--dp-shadow);border-color:rgba(196,147,67,.52)!important}
    :is(.world-card,.tool-card,.card,.credit,.equip-card,.news-card,.profile,.signal,.term,.job,.disc,.detail,.comparison .profile){overflow:hidden}
    .world-card img,.tool-card img,.credit img,.equip-card img,.news-card img{transition:transform .5s cubic-bezier(.2,.7,.2,1),filter .5s ease}
    :is(.world-card,.tool-card,.credit,.equip-card,.news-card):hover img{transform:scale(1.035);filter:saturate(1.06)}
    .modal,.owner-modal,.account-modal,.member-modal,.auth-modal,.comment-auth-modal{backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px)}
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
