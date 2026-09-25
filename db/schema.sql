-- Cloveode contact form storage.
-- Run once against your database:  psql "$DATABASE_URL" -f db/schema.sql

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
