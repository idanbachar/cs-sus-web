create table if not exists public.tracking_list (
  owner_steam_id text not null,
  target_steam_id text not null,
  target_profile_url text not null,
  created_at timestamptz not null default now(),
  primary key (owner_steam_id, target_steam_id)
);

alter table public.tracking_list enable row level security;

create policy "owner can read own tracking list"
on public.tracking_list
for select
using (auth.uid()::text = owner_steam_id);

create policy "owner can insert own tracking list"
on public.tracking_list
for insert
with check (auth.uid()::text = owner_steam_id);

create policy "owner can delete own tracking list"
on public.tracking_list
for delete
using (auth.uid()::text = owner_steam_id);
