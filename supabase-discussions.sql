-- Discussions DicoPets : deux espaces distincts, français et anglais.
-- À exécuter une seule fois dans Supabase > SQL Editor > New query > Run.
create table if not exists public.discussions_dicopets (
  id uuid primary key default gen_random_uuid(),
  language text not null check (language in ('fr','en')),
  auteur_id uuid not null references auth.users(id) on delete cascade,
  pseudo text not null default 'Visiteur',
  avatar_url text,
  contenu text not null check (char_length(contenu) between 1 and 700),
  cree_le timestamptz not null default now(),
  expire_le timestamptz not null default (now() + interval '1 day')
);

alter table public.discussions_dicopets enable row level security;

drop policy if exists "Discussion visible moins de 24 heures" on public.discussions_dicopets;
create policy "Discussion visible moins de 24 heures"
on public.discussions_dicopets for select using (expire_le > now());

drop policy if exists "Un membre publie sa discussion" on public.discussions_dicopets;
create policy "Un membre publie sa discussion"
on public.discussions_dicopets for insert to authenticated
with check (auth.uid() = auteur_id and expire_le > now() and expire_le <= now() + interval '1 day 5 minutes');

drop policy if exists "Un membre supprime sa discussion" on public.discussions_dicopets;
create policy "Un membre supprime sa discussion"
on public.discussions_dicopets for delete to authenticated
using (auth.uid() = auteur_id or auth.uid() = 'f22161e4-7528-4fd2-9860-a18be084b1f6'::uuid);

-- Les messages expirés disparaissent automatiquement des lectures;
-- cette fonction les efface réellement à l'ouverture d'une discussion.
create or replace function public.nettoyer_discussions_expirees()
returns void language sql security definer set search_path = public as $$
  delete from public.discussions_dicopets where expire_le <= now();
$$;
grant execute on function public.nettoyer_discussions_expirees() to anon, authenticated;
