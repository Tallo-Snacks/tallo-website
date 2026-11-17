-- Rename flavors: Smoked Chipotle -> Nashville Hot, "Rosemary & Garlic" -> "Rosemary Garlic".
-- Run once in the Supabase SQL editor (or via Claude) when the database is awake.
insert into public.products (id, name, kind, price_cents, bags_per_unit, stock, sort)
  select 'nashville-hot', 'Nashville Hot', kind, price_cents, bags_per_unit, stock, sort
  from public.products where id = 'smoked-chipotle'
on conflict (id) do nothing;
update public.products set active = false where id = 'smoked-chipotle';
update public.products set name = 'Rosemary Garlic' where id = 'rosemary-garlic';
update public.waitlist set flavor = 'nashville-hot' where flavor = 'smoked-chipotle';
