do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fortune_tellers'
      and column_name = 'style_notes'
  ) then
    alter table public.fortune_tellers
      rename column style_notes to style;
  end if;
exception when undefined_column then
  null;
end;
$$;

alter table public.fortune_tellers
  add column if not exists gender text,
  add column if not exists age integer,
  add column if not exists specialties text[] default '{}'::text[],
  add column if not exists bio text,
  add column if not exists prompt_instructions text;
