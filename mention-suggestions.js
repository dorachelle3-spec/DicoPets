/* Suggestions de pseudos après @ dans tous les champs de commentaires. */
(() => {
  const db=window.supabase?.createClient?.('https://mmxdlnfntpufwwkdvgzc.supabase.co','sb_publishable_Pa-DX3nwNTZktbWK46KDQg_IuIy8TZP');
  if(!db)return;
  const normalise=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
  const esc=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  document.head.insertAdjacentHTML('beforeend','<style>.mention-wrap{position:relative}.mention-list{position:absolute;z-index:90;left:0;right:0;bottom:calc(100% + 6px);display:none;max-height:210px;overflow:auto;padding:5px;background:#fffdf8;border:1px solid #cbd8ce;border-radius:10px;box-shadow:0 10px 24px #17352635}.mention-list.open{display:block}.mention-choice{display:flex;width:100%;align-items:center;gap:8px;border:0;background:transparent;color:#24362e;padding:8px;text-align:left;cursor:pointer;font:700 13px Arial}.mention-choice:hover{background:#edf2ea}.mention-choice img{width:28px;height:28px;border-radius:50%;object-fit:cover;background:#dfe9df}</style>');
  function mount(textarea){
    if(textarea.dataset.mentions)return;
    textarea.dataset.mentions='true';
    const wrap=document.createElement('div');wrap.className='mention-wrap';
    textarea.parentNode.insertBefore(wrap,textarea);wrap.append(textarea);
    const list=document.createElement('div');list.className='mention-list';wrap.append(list);
    let timer=0,request=0;
    const close=()=>{list.classList.remove('open');list.replaceChildren()};
    async function suggest(){
      const before=textarea.value.slice(0,textarea.selectionStart);
      const match=before.match(/@([^\s@]{1,40})$/);
      if(!match){close();return}
      const query=match[1].replace(/[%_]/g,'');if(!query){close();return}
      const own=++request;
      const {data,error}=await db.from('profils_publics').select('pseudo,avatar_url').ilike('pseudo',query+'%').limit(7);
      if(own!==request||error){close();return}
      const choices=(data||[]).filter(profile=>normalise(profile.pseudo)!=='dicocheval');
      if(!choices.length){close();return}
      list.innerHTML=choices.map(profile=>'<button type="button" class="mention-choice" data-pseudo="'+esc(profile.pseudo)+'">'+(profile.avatar_url?'<img src="'+esc(profile.avatar_url)+'" alt="">':'<img src="assets/avatar-0.png" alt="">')+'<span>@'+esc(profile.pseudo)+'</span></button>').join('');
      list.classList.add('open');
      list.querySelectorAll('[data-pseudo]').forEach(button=>button.addEventListener('click',()=>{
        const prefix=textarea.value.slice(0,textarea.selectionStart).replace(/@([^\s@]{1,40})$/,'@'+button.dataset.pseudo+' '),suffix=textarea.value.slice(textarea.selectionStart);
        textarea.value=prefix+suffix;textarea.focus();textarea.setSelectionRange(prefix.length,prefix.length);close();
      }));
    }
    textarea.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(suggest,120)});
    textarea.addEventListener('keyup',()=>{clearTimeout(timer);timer=setTimeout(suggest,120)});
    textarea.addEventListener('blur',()=>setTimeout(close,180));
  }
  const scan=()=>document.querySelectorAll('textarea').forEach(mount);
  scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
})();
