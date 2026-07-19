/*
# Fix trigger function calls to use correct net.http_post schema path

## Summary

The previous migration relocated pg_net's extension metadata to the `extensions` schema.
However, pg_net creates its own `net` schema for its functions regardless of the SCHEMA clause.
The trigger functions were calling `extensions.net.http_post`, which PostgreSQL interprets as
a cross-database reference (extensions.net = database.schema), causing:

  ERROR: cross-database references are not implemented: extensions.net.http_post

## Fix

Updated both `notify_new_contact()` and `notify_new_estimate()` to call `net.http_post`
(schema-qualified to the `net` schema where the function actually lives).

The `search_path` is set to `'public', 'net'` so that both the function's own schema and
the net schema are resolvable. The `net` schema already has USAGE grants for all roles.

No other changes — the extension metadata remains in `extensions` (satisfying the security
advisor), EXECUTE remains revoked from anon/authenticated, and all RLS policies are unchanged.
*/

CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'net'
AS $function$
DECLARE
  response_id int;
  function_url text := 'https://fwcxutlihgsjdswqmazf.supabase.co/functions/v1/notify-business';
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3h1dGxpaGdzamRzd3FtYXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxOTA0NjYsImV4cCI6MjA5OTc2NjQ2Nn0.gPZueOUL6f3drLx1XB4iRIwgOKkcZv3T5SY2oWKCuos';
BEGIN
  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object(
      'type', 'contact',
      'recordId', NEW.id
    )
  ) INTO response_id;

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_new_estimate()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'net'
AS $function$
DECLARE
  response_id int;
  function_url text := 'https://fwcxutlihgsjdswqmazf.supabase.co/functions/v1/notify-business';
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3h1dGxpaGdzamRzd3FtYXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxOTA0NjYsImV4cCI6MjA5OTc2NjQ2Nn0.gPZueOUL6f3drLx1XB4iRIwgOKkcZv3T5SY2oWKCuos';
BEGIN
  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object(
      'type', 'estimate',
      'recordId', NEW.id
    )
  ) INTO response_id;

  RETURN NEW;
END;
$function$;

-- Re-grant EXECUTE revocation (CREATE OR REPLACE resets to default EXECUTE on PUBLIC)
REVOKE EXECUTE ON FUNCTION public.notify_new_contact() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_new_estimate() FROM PUBLIC, anon, authenticated;
