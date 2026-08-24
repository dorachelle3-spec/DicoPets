-- Races favorites visibles sur les profils de membres DicoPets.
-- À coller une seule fois dans Supabase > SQL Editor > New query > Run.
alter table public.profils_publics
  add column if not exists favorites jsonb not null default '{}'::jsonb;

-- Le membre ne peut modifier que son propre profil ; tout le monde peut lire les favoris publics.
drop policy if exists "Un membre modifie son profil public" on public.profils_publics;
create policy "Un membre modifie son profil public"
on public.profils_publics for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
