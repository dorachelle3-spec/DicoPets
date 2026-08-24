-- DicoPets : abonnements Web Push et file de rappels privés.
-- À exécuter une seule fois dans Supabase > SQL Editor.

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  expiration_time bigint,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists push_subscriptions_user_idx
  on public.push_subscriptions(user_id);

alter table public.push_subscriptions enable row level security;

drop policy if exists "push_select_own" on public.push_subscriptions;
create policy "push_select_own" on public.push_subscriptions
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "push_insert_own" on public.push_subscriptions;
create policy "push_insert_own" on public.push_subscriptions
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "push_update_own" on public.push_subscriptions;
create policy "push_update_own" on public.push_subscriptions
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "push_delete_own" on public.push_subscriptions;
create policy "push_delete_own" on public.push_subscriptions
  for delete to authenticated using (auth.uid() = user_id);

create table if not exists public.notification_queue (
  user_id uuid not null references auth.users(id) on delete cascade,
  reminder_id text not null,
  notify_at timestamptz not null,
  title text not null,
  body text not null,
  url text not null default '/DicoPets/index.html',
  status text not null default 'pending'
    check (status in ('pending','sent','failed')),
  attempts integer not null default 0,
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  primary key (user_id, reminder_id)
);

create index if not exists notification_queue_due_idx
  on public.notification_queue(status, notify_at);

alter table public.notification_queue enable row level security;

drop policy if exists "queue_select_own" on public.notification_queue;
create policy "queue_select_own" on public.notification_queue
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "queue_insert_own" on public.notification_queue;
create policy "queue_insert_own" on public.notification_queue
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "queue_update_own" on public.notification_queue;
create policy "queue_update_own" on public.notification_queue
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "queue_delete_own" on public.notification_queue;
create policy "queue_delete_own" on public.notification_queue
  for delete to authenticated using (auth.uid() = user_id);
