/* Album personnel : images redimensionnées automatiquement pour rester légères. */
(() => {
  'use strict';
  const universe=document.body.dataset.albumUniverse;
  if(!universe)return;
  const lang=()=>document.documentElement.lang?.startsWith('en')?'en':'fr';
  const t=(fr,en)=>lang()==='en'?en:fr;
  const key='dicopets-album-'+universe;
  const $=id=>document.getElementById(id);
  const esc=value=>String(value||'').replace(/[&<>]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]));
  const host=document.createElement('section');
  host.className='album-panel';
  host.innerHTML='<h2></h2><p class="album-lead"></p><div class="album-form"><label><span></span><input id="albumPhoto" type="file" accept="image/png,image/jpeg,image/webp"></label><label><span></span><input id="albumCaption" maxlength="120"></label><button class="button" type="button" id="albumSave"></button></div><p class="album-status" id="albumStatus"></p><div class="album-grid" id="albumGrid"></div>';
  /* Dans le journal félin, l'album doit sortir de la grille des deux panneaux. */
  const target=document.querySelector('#privateArea .grid')||document.querySelector('.journal-layout')||document.querySelector('.library')||document.querySelector('main .wrap');
  if(!target)return;
  target.after(host);
  document.head.insertAdjacentHTML('beforeend','<style>.album-panel{margin:34px 0;padding:clamp(22px,4vw,38px);border:1px solid #cfddd1;border-radius:22px;background:#edf4ef;color:#19372f}.album-panel h2{margin:0 0 5px;color:#19372f}.album-lead,.album-status{color:#526d60}.album-form{display:grid;grid-template-columns:1fr 1fr auto;gap:12px;align-items:end}.album-form label{display:grid;gap:6px;font-weight:800}.album-form input{min-width:0;padding:11px;border:1px solid #bdc9bf;border-radius:10px;background:#fff;color:#19372f;font:inherit}.album-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:17px;margin-top:24px}.album-item{position:relative;overflow:hidden;border-radius:15px;background:#fffdf8;border:1px solid #cfddd1;box-shadow:0 8px 20px #17352612}.album-item img{display:block;width:100%;height:225px;object-fit:cover;background:#e2ece4}.album-item p{margin:0;padding:12px 14px;color:#19372f;font-size:14px}.album-delete{position:absolute;right:9px;top:9px;border:0;border-radius:50%;width:32px;height:32px;background:#983f43;color:#fff;font-weight:900;cursor:pointer}@media(max-width:650px){.album-form{grid-template-columns:1fr}.album-form .button{justify-self:start}.album-grid{grid-template-columns:1fr}.album-item img{height:min(70vw,320px)}}</style>');
  function read(){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch(_){return[]}}
  function write(items){localStorage.setItem(key,JSON.stringify(items.slice(0,18)))}
  function render(){
    const items=read();
    $('albumGrid').innerHTML=items.length?items.map((item,index)=>'<article class="album-item"><img src="'+item.image+'" alt="'+String(item.caption||'').replace(/"/g,'&quot;')+'"><button class="album-delete" data-delete="'+index+'" type="button" aria-label="Supprimer">×</button><p>'+esc(item.caption)+'</p></article>').join(''):'<p>'+t('Ton album est prêt pour son premier souvenir.','Your album is ready for its first memory.')+'</p>';
    document.querySelectorAll('[data-delete]').forEach(button=>button.onclick=()=>{const items=read();items.splice(Number(button.dataset.delete),1);write(items);render()});
  }
  function labels(){
    host.querySelector('h2').textContent=t('Mon album de souvenirs','My memory album');
    host.querySelector('.album-lead').textContent=t('Ajoute une photo et une petite légende. Les images sont automatiquement allégées pour ton journal.','Add a photo and a short caption. Images are automatically optimized for your journal.');
    host.querySelectorAll('label span')[0].textContent=t('Photo','Photo');
    host.querySelectorAll('label span')[1].textContent=t('Légende','Caption');
    $('albumCaption').placeholder=t('Ex. Première promenade ensemble','E.g. Our first walk together');
    $('albumSave').textContent=t('Ajouter au livre','Add to album');
    render();
  }
  function optimize(file){
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onerror=()=>reject(new Error('read'));
      reader.onload=()=>{
        const image=new Image();
        image.onerror=()=>reject(new Error('image'));
        image.onload=()=>{
          const max=1500,ratio=Math.min(1,max/Math.max(image.width,image.height));
          const canvas=document.createElement('canvas');
          canvas.width=Math.max(1,Math.round(image.width*ratio));
          canvas.height=Math.max(1,Math.round(image.height*ratio));
          canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL('image/jpeg',0.82));
        };
        image.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  $('albumSave').onclick=async()=>{
    const file=$('albumPhoto').files[0],caption=$('albumCaption').value.trim(),status=$('albumStatus');
    if(!file||!caption){status.textContent=t('Choisis une photo et écris une légende.','Choose a photo and write a caption.');return}
    status.textContent=t('Préparation de la photo…','Preparing the photo…');
    try{
      const image=await optimize(file),items=read();
      items.unshift({image,caption,created:Date.now()});
      write(items);
      $('albumPhoto').value='';$('albumCaption').value='';
      status.textContent=t('Souvenir ajouté à ton album.','Memory added to your album.');
      render();
    }catch(_){status.textContent=t('Cette photo ne peut pas être ajoutée. Essaie une image PNG, JPG ou WebP.','This photo could not be added. Try a PNG, JPG or WebP image.')}
  };
  labels();
  window.addEventListener('dicopets-language-change',labels);
})();
