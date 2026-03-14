create table if not exists public.leases (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  tenant text not null,
  unit text not null,
  date date not null,
  rent numeric(10, 2),
  created_at timestamptz not null default now()
);

alter table public.leases enable row level security;

drop policy if exists "Users can view their own leases" on public.leases;
create policy "Users can view their own leases"
on public.leases
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own leases" on public.leases;
create policy "Users can insert their own leases"
on public.leases
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own leases" on public.leases;
create policy "Users can delete their own leases"
on public.leases
for delete
using (auth.uid() = user_id);
