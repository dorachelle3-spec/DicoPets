/* Bouton de favori injecté dans chaque fiche de race. */
(() => {
  const configs=[
    {universe:'horse',title:'#mtitle',anchor:'#google'},
    {universe:'dog',title:'#modalTitle',anchor:'#googleLink'},
    {universe:'cat',title:'#mTitle',anchor:'#google'}
  ];
  const english=()=>document.documentElement.lang.startsWith('en')||document.querySelector('#language,#languageHero')?.value==='en';
  function mount(){
    const config=configs.find(item=>document.querySelector(item.title)&&document.querySelector(item.anchor));
    if(!config||document.getElementById('breedFavoriteButton'))return;
    const anchor=document.querySelector(config.anchor),button=document.createElement('button');
    button.id='breedFavoriteButton';button.type='button';button.className='breed-favorite-button';
    anchor.insertAdjacentElement('afterend',button);
    document.head.insertAdjacentHTML('beforeend','<style>.breed-favorite-button{display:inline-flex;align-items:center;justify-content:center;margin:18px 0 0 9px;padding:13px 17px;border:1px solid #b88a44;border-radius:11px;background:#fffdf8;color:#234238;font:800 14px Arial;cursor:pointer}.breed-favorite-button:hover{background:#f3dfb8}.breed-favorite-button.is-saved{background:#edf2ea;border-color:#6f967d}@media(max-width:560px){.breed-favorite-button{margin:12px 0 0;width:100%}}</style>');
    const refresh=()=>{
      const name=document.querySelector(config.title)?.textContent.trim();
      if(!name){button.hidden=true;return}button.hidden=false;
      const saved=window.DicoPetsFavorites?.is(config.universe,name)||false;
      button.classList.toggle('is-saved',saved);
      button.textContent=saved?(english()?'♥ Remove from favourites':'♥ Retirer des favoris'):(english()?'♡ Add to favourites':'♡ Ajouter aux favoris');
      button.dataset.name=name;
    };
    button.addEventListener('click',async()=>{const name=button.dataset.name;if(!name||!window.DicoPetsFavorites)return;await window.DicoPetsFavorites.toggle(config.universe,name);refresh()});
    document.addEventListener('click',()=>setTimeout(refresh,0),true);
    document.querySelector('#language,#languageHero')?.addEventListener('change',()=>setTimeout(refresh,0));
    window.addEventListener('dicopets-favorites-changed',refresh);refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
