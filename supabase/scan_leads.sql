create extension if not exists pgcrypto;

create table if not exists public.scan_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  scan_type text not null default 'it-health',
  lead_type text not null,
  first_name text not null,
  company text not null,
  industry text not null,
  company_size text not null,
  m365_users text not null,
  email text not null,
  phone text,
  total_score integer not null,
  category_scores jsonb not null,
  weakest_categories jsonb not null,
  top_priorities jsonb not null,
  package_advice jsonb not null,
  report_status text not null default 'download_started',
  source text not null default 'cloud1-it-scan'
);

alter table public.scan_leads enable row level security;
