-- Calendrier DicoCheval : chaque membre lit et modifie uniquement ses propres événements.
create table if not exists public.horse_calendar_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_date date not null,
  event_time time,
  title text not null check (char_length(title) <= 120),
  event_type text not null check (char_length(event_type) <= 60),
  notes text check (char_length(notes) <= 1500),
  created_at timestamptz not null default now()
);
alter table public.horse_calendar_events enable row level security;
drop policy if exists "horse calendar read own" on public.horse_calendar_events;
drop policy if exists "horse calendar insert own" on public.horse_calendar_events;
drop policy if exists "horse calendar delete own" on public.horse_calendar_events;
create policy "horse calendar read own" on public.horse_calendar_events for select to authenticated using (auth.uid() = user_id);
create policy "horse calendar insert own" on public.horse_calendar_events for insert to authenticated with check (auth.uid() = user_id);
create policy "horse calendar delete own" on public.horse_calendar_events for delete to authenticated using (auth.uid() = user_id);
create index if not exists horse_calendar_events_user_date_idx on public.horse_calendar_events (user_id, event_date, event_time);
