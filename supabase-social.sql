-- DicoCheval : notifications, cœurs et réponses publiques sécurisées.

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  destinataire_id uuid not null references auth.users(id) on delete cascade,
  expediteur_id uuid not null references auth.users(id) on delete cascade,
  texte text not null check (char_length(texte) <= 500),
  commentaire_id uuid references public.commentaires(id) on delete cascade,
  lu boolean not null default false,
  cree_le timestamptz not null default now()
);
alter table public.notifications enable row level security;

drop policy if exists "Membre lit ses notifications" on public.notifications;
drop policy if exists "Membre marque ses notifications" on public.notifications;
drop policy if exists "Membre crée une notification" on public.notifications;
create policy "Membre lit ses notifications" on public.notifications for select to authenticated using (destinataire_id = auth.uid());
create policy "Membre marque ses notifications" on public.notifications for update to authenticated using (destinataire_id = auth.uid()) with check (destinataire_id = auth.uid());
create policy "Membre crée une notification" on public.notifications for insert to authenticated with check (expediteur_id = auth.uid() and destinataire_id <> auth.uid());

create table if not exists public.likes_actualites (
  id uuid primary key default gen_random_uuid(),
  actualite_id uuid not null references public.actualites(id) on delete cascade,
  auteur_id uuid not null references auth.users(id) on delete cascade,
  cree_le timestamptz not null default now(),
  unique(actualite_id, auteur_id)
);
create table if not exists public.likes_commentaires (
  id uuid primary key default gen_random_uuid(),
  commentaire_id uuid not null references public.commentaires(id) on delete cascade,
  auteur_id uuid not null references auth.users(id) on delete cascade,
  cree_le timestamptz not null default now(),
  unique(commentaire_id, auteur_id)
);
alter table public.likes_actualites enable row level security;
alter table public.likes_commentaires enable row level security;

create policy "Tous lisent les coeurs actualites" on public.likes_actualites for select to anon, authenticated using (true);
create policy "Membre ajoute son coeur actualite" on public.likes_actualites for insert to authenticated with check (auteur_id = auth.uid());
create policy "Membre retire son coeur actualite" on public.likes_actualites for delete to authenticated using (auteur_id = auth.uid());
create policy "Tous lisent les coeurs commentaires" on public.likes_commentaires for select to anon, authenticated using (true);
create policy "Membre ajoute son coeur commentaire" on public.likes_commentaires for insert to authenticated with check (auteur_id = auth.uid());
create policy "Membre retire son coeur commentaire" on public.likes_commentaires for delete to authenticated using (auteur_id = auth.uid());

-- Tous les membres connectés peuvent répondre. Le nom DicoCheval reste réservé à la propriétaire.
drop policy if exists "Visiteurs connectes publient leurs commentaires" on public.commentaires;
drop policy if exists "Chacun modifie seulement son commentaire" on public.commentaires;
create policy "Membres publient commentaires et reponses" on public.commentaires for insert to authenticated
with check (
  auteur_id = auth.uid()
  and (
    auth.uid() = 'f22161e4-7528-4fd2-9860-a18be084b1f6'
    or regexp_replace(lower(coalesce(pseudo, '')), '[^a-z0-9]', '', 'g') not like '%dicocheval%'
  )
);
create policy "Membre modifie seulement son commentaire" on public.commentaires for update to authenticated
using (auteur_id = auth.uid())
with check (
  auteur_id = auth.uid()
  and (
    auth.uid() = 'f22161e4-7528-4fd2-9860-a18be084b1f6'
    or regexp_replace(lower(coalesce(pseudo, '')), '[^a-z0-9]', '', 'g') not like '%dicocheval%'
  )
);

drop policy if exists "Membre supprime son commentaire ou propriétaire" on public.commentaires;
create policy "Membre supprime son commentaire ou propriétaire" on public.commentaires for delete to authenticated
using (
  auteur_id = auth.uid()
  or auth.uid() = 'f22161e4-7528-4fd2-9860-a18be084b1f6'::uuid
);
