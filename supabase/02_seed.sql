-- Secret Santa 2026 · The Friends Edition · starting data
-- Run AFTER 01_schema.sql: Supabase → SQL Editor → paste → Run. Safe to re-run.
-- Paolo is the head elf (admin). Everything else (budget, date, access code, keep-apart pairs)
-- can be changed later from the Elf HQ tab in the app.

insert into public.santa_events (slug, title, budget, exchange_date)
values ('friends-2026', 'The Elf Squad', '€20', null)
on conflict (slug) do nothing;

insert into public.santa_members (event_id, name, avatar_url, is_admin)
select e.id, v.name, v.avatar_url, v.is_admin
from public.santa_events e
cross join (values
  ('Paolo',    '/avatars/paolo.svg',    true),
  ('Francien', '/avatars/francien.svg', false),
  ('Andrea',   '/avatars/andrea.svg',   false),
  ('Lily',     '/avatars/lily.svg',     false),
  ('Bart',     '/avatars/bart.svg',     false),
  ('Jessie',   '/avatars/jessie.svg',   false),
  ('Pien',     '/avatars/pien.svg',     false),
  ('Yorda',    '/avatars/yorda.svg',    false),
  ('Gigi',     '/avatars/gigi.svg',     false),
  ('Keith',    '/avatars/keith.svg',    false)
) as v(name, avatar_url, is_admin)
where e.slug = 'friends-2026'
on conflict (event_id, name) do update set avatar_url = excluded.avatar_url, is_admin = excluded.is_admin;

-- Optional: pairs who should never draw each other (couples, housemates…).
-- Uncomment and edit, or add them later in Elf HQ → "Keep apart".
-- insert into public.santa_exclusions (event_id, member_a, member_b)
-- select e.id, least(a.id, b.id), greatest(a.id, b.id)
-- from public.santa_events e
-- join public.santa_members a on a.event_id = e.id and a.name = 'Bart'
-- join public.santa_members b on b.event_id = e.id and b.name = 'Jessie'
-- where e.slug = 'friends-2026'
-- on conflict do nothing;
