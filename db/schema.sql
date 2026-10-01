-- Cloveode contact form storage (Supabase / Postgres).
-- Already applied to the `cloveode-web` Supabase project via migrations.
-- Kept here as the source of truth / for re-creating the schema elsewhere.

create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  company     text,
  budget      text,
  message     text        not null,
  created_at  timestamptz not null default now()
);

-- Query recent enquiries newest-first.
create index if not exists contact_submissions_created_at_idx
  on contact_submissions (created_at desc);

-- Row-level security: the public (publishable) key may only INSERT.
-- No select/update/delete policies exist, so stored enquiries can only be
-- read with the service-role key or from the Supabase dashboard.
alter table contact_submissions enable row level security;

create policy "anon can insert enquiries"
  on contact_submissions
  for insert
  to anon
  with check (true);
