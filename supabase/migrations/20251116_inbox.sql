create extension if not exists "uuid-ossp";

create table if not exists public.inbox_items (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null,
    content text not null,
    status text not null default 'pending' check (status in ('pending','scheduled','done')),
    carried_over_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_timestamp on public.inbox_items;
create trigger set_timestamp
before update on public.inbox_items
for each row
execute procedure public.set_updated_at();

create index if not exists idx_inbox_items_user_id on public.inbox_items(user_id);
create index if not exists idx_inbox_items_status on public.inbox_items(status);

alter table public.inbox_items enable row level security;

drop policy if exists "allow demo user access" on public.inbox_items;
create policy "allow demo user access"
on public.inbox_items
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
