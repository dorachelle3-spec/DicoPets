/* Palette finale DicoPets : chargée après les anciens habillages. */
(() => {
  'use strict';

  const applyPalette = () => {
    document.documentElement.dataset.finalPalette = 'gold';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = 'light';
  };

  applyPalette();
  window.addEventListener('DOMContentLoaded', () => window.setTimeout(applyPalette, 0), { once: true });

  const style = document.createElement('style');
  style.id = 'dicopets-final-gold-palette';
  style.textContent = `
    :root {
      --dp-ink: #3d291b;
      --dp-brown: #5c3a1e;
      --dp-gold: #bd8a3e;
      --dp-gold-dark: #956523;
      --dp-cream: #fffaf1;
      --dp-beige: #f6efe2;
      --dp-sand: #ead8bb;
      --dp-border: #d9bc89;
      --dp-muted: #725d49;
    }

    html, body { width: 100%; max-width: 100%; overflow-x: hidden !important; }
    body { background: var(--dp-beige) !important; color: var(--dp-ink) !important; }
    body::before { background: linear-gradient(90deg, rgba(189,138,62,.035) 1px, transparent 1px), linear-gradient(rgba(189,138,62,.025) 1px, transparent 1px) !important; }
    .wrap, main .wrap, section .wrap { width: min(1120px, calc(100% - 32px)) !important; max-width: calc(100% - 32px) !important; margin-left: auto !important; margin-right: auto !important; }
    .section { padding-top: clamp(42px, 6vw, 72px) !important; padding-bottom: clamp(42px, 6vw, 72px) !important; }

    .top, .topbar, header.top, footer, .footer, .site-footer {
      background: linear-gradient(110deg, #5b391d, #795126) !important;
      border-color: var(--dp-gold) !important;
      color: var(--dp-cream) !important;
    }
    .top :is(a, p, span, strong, button), .topbar :is(a, p, span, strong, button), footer :is(a, p, span, strong) { color: var(--dp-cream) !important; }
    .nav, nav, .controls, .searchbar, .site-nav {
      background: rgba(255,250,241,.98) !important;
      border-color: var(--dp-border) !important;
    }
    .nav .wrap, nav .wrap, .site-nav .wrap { flex-wrap: nowrap !important; overflow-x: auto !important; scrollbar-width: thin; }
    .nav a, nav a, .site-nav a { color: var(--dp-brown) !important; flex: 0 0 auto !important; text-decoration: none !important; }
    .nav a:hover, nav a:hover, .site-nav a:hover, .nav a:focus-visible, nav a:focus-visible { color: var(--dp-gold-dark) !important; }

    main :is(h1,h2,h3,h4) { color: var(--dp-ink) !important; }
    main :is(p,li,dd,dt,label,small,.muted,.lead,.section-copy,.subtitle) { color: var(--dp-muted) !important; }
    main a:not(.button):not(button):not(.btn) { color: var(--dp-brown) !important; }
    .hero :is(h1,h2,h3,p,.lead,.subtitle,.eyebrow), .page-hero :is(h1,h2,h3,p,.lead,.subtitle,.eyebrow) { color: var(--dp-cream) !important; }
    .hero, .page-hero { border-color: var(--dp-gold) !important; }

    .tint, .rose, .search, .search-section, .news-section, .discussion-section, .equipment-summary, .promise, .account-intro, .section-alt, .section-soft, .bg-soft {
      background: var(--dp-beige) !important;
      color: var(--dp-ink) !important;
    }
    .card, .tile, .panel, .race-card, .discipline-card, .news-card, .article-card, .feature-card, .modal-card, .journal-card, .profile-card, .signal-card, .compare-card, .credit-card, .accordion-item, .form-card {
      background: var(--dp-cream) !important;
      border-color: var(--dp-border) !important;
      color: var(--dp-ink) !important;
      box-shadow: 0 12px 28px rgba(92,58,30,.08) !important;
    }
    .card :is(h1,h2,h3,h4,p,li,small,strong,span,label), .tile :is(h1,h2,h3,h4,p,li,small,strong,span,label), .panel :is(h1,h2,h3,h4,p,li,small,strong,span,label), .modal-card :is(h1,h2,h3,h4,p,li,small,strong,span,label) { color: var(--dp-ink) !important; }
    .card p, .tile p, .panel p, .modal-card p, .card small, .tile small, .panel small, .modal-card small { color: var(--dp-muted) !important; }

    button, .button, .btn, input[type="submit"], input[type="button"] {
      background: var(--dp-gold) !important;
      border-color: var(--dp-gold-dark) !important;
      color: #fffdf8 !important;
      text-shadow: none !important;
    }
    button:hover, .button:hover, .btn:hover, input[type="submit"]:hover, input[type="button"]:hover { background: var(--dp-gold-dark) !important; }
    .secondary, .button.secondary, .btn.secondary, .button-ghost, .ghost, .cancel, .close, .language-switch, select {
      background: var(--dp-cream) !important;
      border-color: var(--dp-gold) !important;
      color: var(--dp-brown) !important;
    }
    .danger, .delete, .button.danger, .btn.danger { background: #a54542 !important; border-color: #843633 !important; color: #fff !important; }
    .tab, .tabs button, .filter-chip, .chip { background: #f2e5ce !important; color: var(--dp-brown) !important; border-color: var(--dp-border) !important; }
    .tab.active, .tabs button.active, .filter-chip.active, .chip.active { background: var(--dp-gold) !important; color: #fffdf8 !important; border-color: var(--dp-gold-dark) !important; }

    input, textarea, select { background: #fffdf8 !important; color: var(--dp-ink) !important; border-color: var(--dp-border) !important; caret-color: var(--dp-brown) !important; }
    input::placeholder, textarea::placeholder { color: #907a62 !important; opacity: 1 !important; }
    input:focus, textarea:focus, select:focus { outline-color: var(--dp-gold) !important; box-shadow: 0 0 0 3px rgba(189,138,62,.18) !important; }

    .modal, dialog, .overlay, .popup { background-color: rgba(61,41,27,.42) !important; }
    .modal-content, dialog > *, .modal-card, .popup-content { background: var(--dp-cream) !important; border-color: var(--dp-border) !important; color: var(--dp-ink) !important; }
    .modal-content :is(h1,h2,h3,h4,p,label,small,strong,span), dialog :is(h1,h2,h3,h4,p,label,small,strong,span), .popup-content :is(h1,h2,h3,h4,p,label,small,strong,span) { color: var(--dp-ink) !important; }

    .badge, .role-owner, .owner-badge, .points-badge, .tag { background: #f1dfbd !important; border-color: var(--dp-gold) !important; color: var(--dp-brown) !important; }
    .heart, .like-button { background: #fff4e8 !important; border-color: #dfaf86 !important; color: #9c433b !important; }
    .comment, .comment-card, .reply, .message, .discussion-message { background: #fffaf1 !important; border-color: var(--dp-border) !important; color: var(--dp-ink) !important; }
    .comment :is(p,small,strong,span), .reply :is(p,small,strong,span), .message :is(p,small,strong,span), .discussion-message :is(p,small,strong,span) { color: var(--dp-ink) !important; }

    .hero .wrap, .page-hero .wrap { min-width: 0 !important; }
    @media (max-width: 720px) {
      .wrap, main .wrap, section .wrap { width: min(100% - 24px, 1120px) !important; max-width: calc(100% - 24px) !important; }
      .top .wrap, .topbar .wrap { gap: 8px !important; }
      .top :is(.actions,.top-actions,.utility-actions), .topbar :is(.actions,.top-actions,.utility-actions) { max-width: 100%; overflow-x: auto; }
      .hero h1, .page-hero h1 { font-size: clamp(2.25rem, 12vw, 3.5rem) !important; line-height: .98 !important; overflow-wrap: anywhere; }
      .nav .wrap, nav .wrap, .site-nav .wrap { justify-content: flex-start !important; }
      .section { padding-top: 42px !important; padding-bottom: 42px !important; }
      .grid, .cards, .news-grid { grid-template-columns: minmax(0, 1fr) !important; }
    }
  `;
  document.head.appendChild(style);
})();
