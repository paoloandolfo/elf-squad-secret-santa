-- Secret Santa 2026 · backend
-- Paste into Supabase → SQL Editor → Run. Safe to re-run.
-- The browser only ever calls the santa_* functions below; the tables themselves are closed to the anon key.

create extension if not exists pgcrypto with schema extensions;

-- ─────────────────────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────────────────────

create table if not exists public.santa_events (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  budget        text not null default '€20',
  exchange_date date,
  drawn_at      timestamptz,
  access_code   text,
  created_at    timestamptz not null default now()
);

alter table public.santa_events add column if not exists access_code text;

create table if not exists public.santa_members (
  id              uuid primary key default gen_random_uuid(),
  event_id        uuid not null references public.santa_events(id) on delete cascade,
  name            text not null,
  avatar_url      text,
  is_admin        boolean not null default false,
  pin_hash        text,
  failed_attempts int not null default 0,
  locked_until    timestamptz,
  target_id       uuid references public.santa_members(id) on delete set null,
  joined_at       timestamptz,
  created_at      timestamptz not null default now(),
  unique (event_id, name)
);

create table if not exists public.santa_wishes (
  id         uuid primary key default gen_random_uuid(),
  member_id  uuid not null references public.santa_members(id) on delete cascade,
  body       text not null check (char_length(body) between 1 and 200),
  link       text check (link is null or link ~* '^https?://'),
  created_at timestamptz not null default now()
);

create table if not exists public.santa_sessions (
  token      uuid primary key default gen_random_uuid(),
  member_id  uuid not null references public.santa_members(id) on delete cascade,
  expires_at timestamptz not null default now() + interval '30 days'
);

-- Pairs that must never be matched, in either direction (couples, siblings, housemates…).
create table if not exists public.santa_exclusions (
  event_id   uuid not null references public.santa_events(id) on delete cascade,
  member_a   uuid not null references public.santa_members(id) on delete cascade,
  member_b   uuid not null references public.santa_members(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (member_a, member_b),
  check (member_a < member_b)
);

create index if not exists santa_members_event_idx  on public.santa_members (event_id);
create index if not exists santa_wishes_member_idx  on public.santa_wishes (member_id);
create index if not exists santa_sessions_member_idx on public.santa_sessions (member_id);

alter table public.santa_events   enable row level security;
alter table public.santa_members  enable row level security;
alter table public.santa_wishes   enable row level security;
alter table public.santa_sessions enable row level security;
alter table public.santa_exclusions enable row level security;

revoke all on public.santa_events, public.santa_members, public.santa_wishes, public.santa_sessions, public.santa_exclusions
  from anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- Internal helpers (not callable from the browser)
-- ─────────────────────────────────────────────────────────────

create or replace function public.santa_session_member(p_token uuid)
returns public.santa_members
language plpgsql stable security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  select mem.* into m
  from public.santa_sessions s
  join public.santa_members mem on mem.id = s.member_id
  where s.token = p_token and s.expires_at > now();

  if not found then
    raise exception 'session_expired';
  end if;
  return m;
end $$;

create or replace function public.santa_admin_member(p_token uuid)
returns public.santa_members
language plpgsql stable security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_session_member(p_token);
  if not m.is_admin then
    raise exception 'not_admin';
  end if;
  return m;
end $$;

create or replace function public.santa_event_json(p_event_id uuid)
returns jsonb
language sql stable security definer set search_path = public
as $$
  select jsonb_build_object(
    'id', e.id,
    'slug', e.slug,
    'title', e.title,
    'budget', e.budget,
    'exchange_date', e.exchange_date,
    'drawn_at', e.drawn_at
  )
  from public.santa_events e
  where e.id = p_event_id
$$;

create or replace function public.santa_wishes_json(p_member_id uuid)
returns jsonb
language sql stable security definer set search_path = public
as $$
  select coalesce(
    jsonb_agg(jsonb_build_object('id', w.id, 'body', w.body, 'link', w.link) order by w.created_at),
    '[]'::jsonb
  )
  from public.santa_wishes w
  where w.member_id = p_member_id
$$;

create or replace function public.santa_roster_json(p_event_id uuid)
returns jsonb
language sql stable security definer set search_path = public
as $$
  select jsonb_build_object(
    'event', public.santa_event_json(p_event_id),
    'members', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', m.id,
        'name', m.name,
        'avatar_url', m.avatar_url,
        'joined', m.pin_hash is not null,
        'in_draw', m.target_id is not null,
        'wish_count', (select count(*) from public.santa_wishes w where w.member_id = m.id)
      ) order by m.name)
      from public.santa_members m
      where m.event_id = p_event_id
    ), '[]'::jsonb),
    'exclusions', coalesce((
      select jsonb_agg(jsonb_build_object('a', x.member_a, 'b', x.member_b) order by x.created_at)
      from public.santa_exclusions x
      where x.event_id = p_event_id
    ), '[]'::jsonb)
  )
$$;

-- The team code gates the roster and login. No code set means the app is open. Case and spacing don't matter.
create or replace function public.santa_code_error(p_event_id uuid, p_code text)
returns text
language sql stable security definer set search_path = public
as $$
  select case
    when e.access_code is null then null
    when nullif(btrim(coalesce(p_code, '')), '') is null then 'code_required'
    when lower(btrim(p_code)) <> lower(e.access_code) then 'bad_access_code'
  end
  from public.santa_events e
  where e.id = p_event_id
$$;

revoke execute on function
  public.santa_session_member(uuid),
  public.santa_admin_member(uuid),
  public.santa_event_json(uuid),
  public.santa_wishes_json(uuid),
  public.santa_roster_json(uuid),
  public.santa_code_error(uuid, text)
from public, anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- Public API
-- ─────────────────────────────────────────────────────────────

drop function if exists public.santa_roster(text);
drop function if exists public.santa_login(uuid, text);

-- Roster for the "who are you?" screen. No PINs, no matches.
create or replace function public.santa_roster(p_slug text, p_code text default null)
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  v_event_id uuid;
  v_error    text;
begin
  select id into v_event_id from public.santa_events where slug = p_slug;
  if v_event_id is null then
    raise exception 'event_not_found';
  end if;
  v_error := public.santa_code_error(v_event_id, p_code);
  if v_error is not null then
    raise exception '%', v_error;
  end if;
  return public.santa_roster_json(v_event_id);
end $$;

-- First visit sets the PIN, later visits check it. Five misses lock the member for two minutes.
-- Returns {ok:false,...} instead of raising so the miss counter is not rolled back.
create or replace function public.santa_login(p_member_id uuid, p_pin text, p_code text default null)
returns jsonb
language plpgsql volatile security definer set search_path = public, extensions
as $$
declare
  m        public.santa_members;
  v_misses int;
  v_token  uuid;
  v_error  text;
begin
  if p_pin is null or p_pin !~ '^\d{4}$' then
    return jsonb_build_object('ok', false, 'error', 'invalid_pin');
  end if;

  select * into m from public.santa_members where id = p_member_id for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'unknown_member');
  end if;

  v_error := public.santa_code_error(m.event_id, p_code);
  if v_error is not null then
    return jsonb_build_object('ok', false, 'error', v_error);
  end if;

  if m.locked_until > now() then
    return jsonb_build_object('ok', false, 'error', 'locked',
      'retry_in', ceil(extract(epoch from m.locked_until - now())));
  end if;

  if m.pin_hash is null then
    update public.santa_members
       set pin_hash = crypt(p_pin, gen_salt('bf')), joined_at = now(), failed_attempts = 0, locked_until = null
     where id = m.id;
  elsif m.pin_hash = crypt(p_pin, m.pin_hash) then
    update public.santa_members set failed_attempts = 0, locked_until = null where id = m.id;
  else
    v_misses := m.failed_attempts + 1;
    if v_misses >= 5 then
      update public.santa_members
         set failed_attempts = 0, locked_until = now() + interval '2 minutes'
       where id = m.id;
      return jsonb_build_object('ok', false, 'error', 'locked', 'retry_in', 120);
    end if;
    update public.santa_members set failed_attempts = v_misses where id = m.id;
    return jsonb_build_object('ok', false, 'error', 'wrong_pin', 'attempts_left', 5 - v_misses);
  end if;

  delete from public.santa_sessions where expires_at < now();
  insert into public.santa_sessions (member_id) values (m.id) returning token into v_token;
  return jsonb_build_object('ok', true, 'token', v_token, 'created', m.pin_hash is null);
end $$;

create or replace function public.santa_logout(p_token uuid)
returns void
language sql volatile security definer set search_path = public
as $$
  delete from public.santa_sessions where token = p_token
$$;

-- Everything the signed-in home screen needs: me, the event, my wishes, and my match (once drawn).
create or replace function public.santa_me(p_token uuid)
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  m public.santa_members;
  t public.santa_members;
begin
  m := public.santa_session_member(p_token);
  select * into t from public.santa_members where id = m.target_id;

  return jsonb_build_object(
    'me', jsonb_build_object('id', m.id, 'name', m.name, 'avatar_url', m.avatar_url, 'is_admin', m.is_admin),
    'event', public.santa_event_json(m.event_id),
    'access_code', case when m.is_admin then (select e.access_code from public.santa_events e where e.id = m.event_id) end,
    'wishes', public.santa_wishes_json(m.id),
    'target', case when t.id is null then null else jsonb_build_object(
      'id', t.id,
      'name', t.name,
      'avatar_url', t.avatar_url,
      'wishes', public.santa_wishes_json(t.id)
    ) end
  );
end $$;

create or replace function public.santa_add_wish(p_token uuid, p_body text, p_link text default null)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m      public.santa_members;
  v_body text := btrim(coalesce(p_body, ''));
  v_link text := nullif(btrim(coalesce(p_link, '')), '');
begin
  m := public.santa_session_member(p_token);

  if v_body = '' or char_length(v_body) > 200 then
    raise exception 'invalid_wish';
  end if;
  if (select count(*) from public.santa_wishes where member_id = m.id) >= 10 then
    raise exception 'too_many_wishes';
  end if;
  if v_link is not null and v_link !~* '^https?://' then
    v_link := 'https://' || v_link;
  end if;

  insert into public.santa_wishes (member_id, body, link) values (m.id, v_body, v_link);
  return public.santa_wishes_json(m.id);
end $$;

create or replace function public.santa_remove_wish(p_token uuid, p_wish_id uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_session_member(p_token);
  delete from public.santa_wishes where id = p_wish_id and member_id = m.id;
  return public.santa_wishes_json(m.id);
end $$;

-- ─────────────────────────────────────────────────────────────
-- Admin API (head elf only). Every call returns the fresh roster.
-- ─────────────────────────────────────────────────────────────

create or replace function public.santa_admin_save_event(
  p_token uuid, p_title text, p_budget text, p_exchange_date date
)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_admin_member(p_token);
  update public.santa_events
     set title = coalesce(nullif(btrim(p_title), ''), title),
         budget = coalesce(nullif(btrim(p_budget), ''), budget),
         exchange_date = p_exchange_date
   where id = m.event_id;
  return public.santa_roster_json(m.event_id);
end $$;

-- An empty code opens the app to anyone with the link.
create or replace function public.santa_admin_set_access_code(p_token uuid, p_code text)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m      public.santa_members;
  v_code text := nullif(btrim(coalesce(p_code, '')), '');
begin
  m := public.santa_admin_member(p_token);
  if v_code is not null and char_length(v_code) not between 4 and 40 then
    raise exception 'invalid_code';
  end if;
  update public.santa_events set access_code = v_code where id = m.event_id;
  return jsonb_build_object('access_code', v_code);
end $$;

create or replace function public.santa_admin_add_member(p_token uuid, p_name text, p_avatar_url text default null)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m      public.santa_members;
  v_name text := btrim(coalesce(p_name, ''));
begin
  m := public.santa_admin_member(p_token);
  if v_name = '' then
    raise exception 'invalid_name';
  end if;
  if exists (select 1 from public.santa_members where event_id = m.event_id and lower(name) = lower(v_name)) then
    raise exception 'name_taken';
  end if;

  insert into public.santa_members (event_id, name, avatar_url)
  values (m.event_id, v_name, nullif(btrim(coalesce(p_avatar_url, '')), ''));
  return public.santa_roster_json(m.event_id);
end $$;

create or replace function public.santa_admin_remove_member(p_token uuid, p_member_id uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_admin_member(p_token);
  if p_member_id = m.id then
    raise exception 'cannot_remove_self';
  end if;
  if exists (select 1 from public.santa_members where id = p_member_id and target_id is not null) then
    raise exception 'in_draw';
  end if;

  delete from public.santa_members where id = p_member_id and event_id = m.event_id;
  return public.santa_roster_json(m.event_id);
end $$;

create or replace function public.santa_admin_reset_pin(p_token uuid, p_member_id uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_admin_member(p_token);
  update public.santa_members
     set pin_hash = null, failed_attempts = 0, locked_until = null
   where id = p_member_id and event_id = m.event_id;
  delete from public.santa_sessions where member_id = p_member_id;
  return public.santa_roster_json(m.event_id);
end $$;

-- Everyone with a PIN goes into one shuffled loop, so nobody can draw themselves.
-- Keep-apart pairs are respected: we reshuffle until no neighbours in the loop are an excluded pair.
create or replace function public.santa_admin_draw(p_token uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m       public.santa_members;
  v_drawn timestamptz;
  v_ids   uuid[];
  v_count int;
  v_ok    boolean := false;
  v_try   int := 0;
  v_giver uuid;
  v_taker uuid;
begin
  m := public.santa_admin_member(p_token);

  select drawn_at into v_drawn from public.santa_events where id = m.event_id for update;
  if v_drawn is not null then
    raise exception 'already_drawn';
  end if;

  select count(*) into v_count
  from public.santa_members
  where event_id = m.event_id and pin_hash is not null;
  if v_count < 3 then
    raise exception 'not_enough_players';
  end if;

  while not v_ok and v_try < 2000 loop
    v_try := v_try + 1;
    select array_agg(id order by random()) into v_ids
    from public.santa_members
    where event_id = m.event_id and pin_hash is not null;

    v_ok := true;
    for i in 1..v_count loop
      v_giver := v_ids[i];
      v_taker := v_ids[(i % v_count) + 1];
      if exists (
        select 1 from public.santa_exclusions x
        where x.member_a = least(v_giver, v_taker) and x.member_b = greatest(v_giver, v_taker)
      ) then
        v_ok := false;
        exit;
      end if;
    end loop;
  end loop;

  if not v_ok then
    raise exception 'no_valid_draw';
  end if;

  update public.santa_members set target_id = null where event_id = m.event_id;
  for i in 1..v_count loop
    update public.santa_members set target_id = v_ids[(i % v_count) + 1] where id = v_ids[i];
  end loop;
  update public.santa_events set drawn_at = now() where id = m.event_id;

  return public.santa_roster_json(m.event_id);
end $$;

create or replace function public.santa_admin_add_exclusion(p_token uuid, p_member_a uuid, p_member_b uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_admin_member(p_token);
  if (select drawn_at from public.santa_events where id = m.event_id) is not null then
    raise exception 'already_drawn';
  end if;
  if p_member_a is null or p_member_b is null or p_member_a = p_member_b then
    raise exception 'invalid_exclusion';
  end if;
  if (select count(*) from public.santa_members
      where event_id = m.event_id and id in (p_member_a, p_member_b)) <> 2 then
    raise exception 'unknown_member';
  end if;
  insert into public.santa_exclusions (event_id, member_a, member_b)
  values (m.event_id, least(p_member_a, p_member_b), greatest(p_member_a, p_member_b))
  on conflict do nothing;
  return public.santa_roster_json(m.event_id);
end $$;

create or replace function public.santa_admin_remove_exclusion(p_token uuid, p_member_a uuid, p_member_b uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_admin_member(p_token);
  if (select drawn_at from public.santa_events where id = m.event_id) is not null then
    raise exception 'already_drawn';
  end if;
  delete from public.santa_exclusions
   where event_id = m.event_id
     and member_a = least(p_member_a, p_member_b)
     and member_b = greatest(p_member_a, p_member_b);
  return public.santa_roster_json(m.event_id);
end $$;

create or replace function public.santa_admin_undo_draw(p_token uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public
as $$
declare
  m public.santa_members;
begin
  m := public.santa_admin_member(p_token);
  update public.santa_members set target_id = null where event_id = m.event_id;
  update public.santa_events set drawn_at = null where id = m.event_id;
  return public.santa_roster_json(m.event_id);
end $$;

grant execute on function
  public.santa_roster(text, text),
  public.santa_login(uuid, text, text),
  public.santa_logout(uuid),
  public.santa_me(uuid),
  public.santa_add_wish(uuid, text, text),
  public.santa_remove_wish(uuid, uuid),
  public.santa_admin_save_event(uuid, text, text, date),
  public.santa_admin_set_access_code(uuid, text),
  public.santa_admin_add_member(uuid, text, text),
  public.santa_admin_remove_member(uuid, uuid),
  public.santa_admin_reset_pin(uuid, uuid),
  public.santa_admin_draw(uuid),
  public.santa_admin_undo_draw(uuid),
  public.santa_admin_add_exclusion(uuid, uuid, uuid),
  public.santa_admin_remove_exclusion(uuid, uuid, uuid)
to anon, authenticated;

notify pgrst, 'reload schema';
