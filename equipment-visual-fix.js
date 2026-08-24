/* Photos d'équipement : le cheval entier reste visible, sans rognage. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    #eq-cheval .equip-card img{
      height:360px!important;
      object-fit:contain!important;
      object-position:center!important;
      background:#eef2ed!important;
    }
    @media(max-width:720px){#eq-cheval .equip-card img{height:300px!important}}
  `;
  document.head.appendChild(style);
  const classic = document.querySelector('#eq-cheval .equip-card:first-child img');
  if(classic){
    classic.src='assets/equip-cheval-classique-user.png';
    classic.alt='Cheval entier équipé en équitation classique';
  }
})();
