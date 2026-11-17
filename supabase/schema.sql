-- Tallo store database (Supabase project "tallo"). Already applied; kept here for reference.
-- Row level security is on with no public policies: only the site's server (secret key) can read or write.

create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  flavor text not null,
  zip text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  kind text not null default 'bag',          -- bag | bundle
  price_cents integer not null,
  bags_per_unit integer not null default 1,
  stock integer not null default 0,           -- for single-flavor bags
  active boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text,
  phone text,
  email_opt_in boolean not null default false,
  sms_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  stripe_session_id text unique,
  stripe_payment_intent text,
  customer_id bigint references public.customers(id),
  email text not null,
  name text,
  phone text,
  shipping_address jsonb,
  subtotal_cents integer not null,
  shipping_cents integer not null default 0,
  tax_cents integer not null default 0,
  discount_cents integer not null default 0,
  total_cents integer not null,
  status text not null default 'paid',         -- paid | packed | shipped | delivered | refunded | cancelled
  tracking_number text,
  carrier text,
  notes text,
  created_at timestamptz not null default now(),
  shipped_at timestamptz
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  name text not null,
  quantity integer not null,
  unit_price_cents integer not null
);

create index if not exists orders_created_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists order_items_order_idx on public.order_items (order_id);

alter table public.waitlist enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create or replace function public.decrement_stock(p_id text, qty integer)
returns void language sql security definer set search_path = public as $$
  update public.products set stock = greatest(stock - qty, 0) where id = p_id;
$$;
revoke execute on function public.decrement_stock(text, integer) from public, anon, authenticated;

insert into public.products (id, name, kind, price_cents, bags_per_unit, stock, sort) values
  ('sea-salt', 'Sea Salt', 'bag', 1099, 1, 500, 1),
  ('nashville-hot', 'Nashville Hot', 'bag', 1099, 1, 500, 2),
  ('rosemary-garlic', 'Rosemary Garlic', 'bag', 1099, 1, 500, 3),
  ('sampler-3', 'The Sampler (one of each)', 'bundle', 2999, 3, 0, 4),
  ('pack-6', '6-Pack (two of each)', 'bundle', 5499, 6, 0, 5)
on conflict (id) do nothing;
