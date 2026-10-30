create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  flavor text not null,
  zip text,
  created_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
-- No public policies: only the server (service role key) can read or write.
