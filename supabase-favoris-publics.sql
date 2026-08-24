-- Profils publics et races favorites visibles dans la recherche DicoPets.
-- À coller une seule fois dans Supabase > SQL Editor > New query > Run.
create table if not exists public.profils_publics (
  id uuid primary key references auth.users(id) on delete cascade,
  pseudo text not null default 'Visiteur',
  avatar_url text,
  points integer not null default 0,
  badges jsonb not null default '[]'::jsonb,
  favorites jsonb not null default '{}'::jsonb,
  membre_depuis timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profils_publics enable row level security;

drop policy if exists "Profils visibles publiquement" on public.profils_publics;
create policy "Profils visibles publiquement"
on public.profils_publics for select using (true);

drop policy if exists "Un membre crée son profil public" on public.profils_publics;
create policy "Un membre crée son profil public"
on public.profils_publics for insert to authenticated
with check (auth.uid() = id);

alter table public.profils_publics
  add column if not exists favorites jsonb not null default '{}'::jsonb;

alter table public.profils_publics
  add column if not exists badges jsonb not null default '[]'::jsonb;

-- Le membre ne peut modifier que son propre profil ; tout le monde peut lire les favoris publics.
drop policy if exists "Un membre modifie son profil public" on public.profils_publics;
create policy "Un membre modifie son profil public"
on public.profils_publics for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- L'ancien nom de propriétaire ne doit plus apparaître dans la recherche.
update public.profils_publics
set pseudo = 'DicoPets'
where id = 'f22161e4-7528-4fd2-9860-a18be084b1f6'::uuid;

-- Les anciennes réponses officielles gardent leur contenu, mais portent le bon nom.
do $$
begin
  if to_regclass('public.commentaires') is not null then
    update public.commentaires
    set pseudo = 'DicoPets'
    where auteur_id = 'f22161e4-7528-4fd2-9860-a18be084b1f6'::uuid
      and lower(regexp_replace(coalesce(pseudo, ''), '[^[:alnum:]]', '', 'g')) = 'dicocheval';
  end if;
end $$;

delete from public.profils_publics
where id <> 'f22161e4-7528-4fd2-9860-a18be084b1f6'::uuid
  and lower(regexp_replace(pseudo, '[^[:alnum:]]', '', 'g')) = 'dicocheval';
