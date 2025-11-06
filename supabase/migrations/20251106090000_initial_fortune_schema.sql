create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.fortune_tellers (
  id text primary key,
  name text not null,
  title text not null,
  style_notes text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  teller_id text not null references public.fortune_tellers (id) on delete restrict,
  question text not null,
  result text not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.users enable row level security;
create policy "Users can view their profile" on public.users
  for select using (auth.uid() = id);
create policy "Users can insert their profile" on public.users
  for insert with check (auth.uid() = id);
create policy "Users can update their profile" on public.users
  for update using (auth.uid() = id) with check (auth.uid() = id);

alter table public.readings enable row level security;
create policy "Users can view their readings" on public.readings
  for select using (auth.uid() = user_id);
create policy "Users can insert their readings" on public.readings
  for insert with check (auth.uid() = user_id);
