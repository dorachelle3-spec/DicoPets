/* Races favorites : conservées dans le navigateur et, pour les membres connectés, dans le compte DicoPets. */
(() => {
  const KEY='dicopetsFavorites';
  const universes={horse:'DicoCheval',dog:'DicoChien',cat:'DicoChat'};
  const db=window.supabase?.createClient?.('https://mmxdlnfntpufwwkdvgzc.supabase.co','sb_publishable_Pa-DX3nwNTZktbWK46KDQg_IuIy8TZP');
  const clean=value=>String(value||'').trim().slice(0,80);
  const read=()=>{try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'?value:{}}catch{return {}}};
  const normalise=source=>Object.fromEntries(Object.keys(universes).map(key=>[key,[...new Set((Array.isArray(source?.[key])?source[key]:[]).map(clean).filter(Boolean))].slice(0,40)]));
  const write=value=>localStorage.setItem(KEY,JSON.stringify(normalise(value)));
  async function sync(user,favorites){
    if(!user||!db)return;
    const metadata=user.user_metadata||{};
    await db.auth.updateUser({data:{favorite_breeds:favorites}});
    /* Cette écriture devient visible après l'exécution du fichier SQL fourni. */
    await db.from('profils_publics').upsert({
      id:user.id,
      pseudo:user.id==='f22161e4-7528-4fd2-9860-a18be084b1f6'?'DicoPets':(metadata.pseudo||'Visiteur'),
      avatar_url:metadata.avatar_url||'assets/avatar-0.png',
      points:Number(metadata.points||0),
      badges:Array.isArray(metadata.badges)?metadata.badges:[],
      favorites,
      membre_depuis:user.created_at
    },{onConflict:'id'});
  }
  async function persist(next){
    const value=normalise(next);write(value);
    const {data}=await db?.auth.getUser?.()||{data:{}};
    if(data?.user)await sync(data.user,value);
    window.dispatchEvent(new CustomEvent('dicopets-favorites-changed',{detail:value}));
    return value;
  }
  async function toggle(universe,name){
    if(!universes[universe]||!clean(name))return false;
    const next=read(),list=Array.isArray(next[universe])?next[universe]:[];
    const found=list.includes(clean(name));
    next[universe]=found?list.filter(item=>item!==clean(name)):[...list,clean(name)];
    await persist(next);return !found;
  }
  async function remove(universe,name){
    const next=read();next[universe]=(next[universe]||[]).filter(item=>item!==clean(name));await persist(next);
  }
  window.DicoPetsFavorites={read:()=>normalise(read()),list:universe=>normalise(read())[universe]||[],is:(universe,name)=>normalise(read())[universe]?.includes(clean(name))||false,toggle,remove,label:universe=>universes[universe]||'DicoPets'};
  db?.auth.onAuthStateChange(async(event,session)=>{
    if(!['INITIAL_SESSION','SIGNED_IN'].includes(event)||!session?.user)return;
    const saved=normalise(session.user.user_metadata?.favorite_breeds||{}),local=normalise(read()),merged={};
    Object.keys(universes).forEach(world=>merged[world]=[...new Set([...(saved[world]||[]),...(local[world]||[])])]);
    write(merged);await sync(session.user,merged);window.dispatchEvent(new CustomEvent('dicopets-favorites-changed',{detail:merged}));
  });
})();
