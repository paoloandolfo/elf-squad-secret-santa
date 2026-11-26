-- Secret Santa 2026 · The Friends Edition · starting data
-- Run AFTER 01_schema.sql: Supabase → SQL Editor → paste → Run. Safe to re-run.
-- Paolo is the head elf (admin). Everything else (budget, date, access code, keep-apart pairs)
-- can be changed later from the Elf HQ tab in the app.

insert into public.santa_events (slug, title, budget, exchange_date)
values ('friends-2026', 'The Elf Squad', '€20', '2026-12-11')
on conflict (slug) do nothing;

insert into public.santa_members (event_id, name, avatar_url, is_admin)
select e.id, v.name, v.avatar_url, v.is_admin
from public.santa_events e
cross join (values
  ('Paolo',    '/avatars/paolo.jpg',    true),
  ('Francien', '/avatars/francien.jpg', false),
  ('Andrea',   '/avatars/andrea.jpg',   false),
  ('Lily',     '/avatars/lily.jpg',     false),
  ('Bart',     '/avatars/bart.jpg',     false),
  ('Jessie',   '/avatars/jessie.jpg',   false),
  ('Pien',     '/avatars/pien.jpg',     false),
  ('Yorda',    '/avatars/yorda.jpg',    false),
  ('Gigi',     '/avatars/gigi.jpg',     false),
  ('Keith',    '/avatars/keith.jpg',    false)
) as v(name, avatar_url, is_admin)
where e.slug = 'friends-2026'
on conflict (event_id, name) do update set avatar_url = excluded.avatar_url, is_admin = excluded.is_admin;

-- Couples: these pairs never draw each other (in either direction).
-- More can be added or removed later in Elf HQ → "Keep apart".
insert into public.santa_exclusions (event_id, member_a, member_b)
select e.id, least(a.id, b.id), greatest(a.id, b.id)
from public.santa_events e
join (values ('Andrea', 'Lily'), ('Paolo', 'Francien'), ('Bart', 'Jessie')) as c(name_a, name_b) on true
join public.santa_members a on a.event_id = e.id and a.name = c.name_a
join public.santa_members b on b.event_id = e.id and b.name = c.name_b
where e.slug = 'friends-2026'
on conflict do nothing;
