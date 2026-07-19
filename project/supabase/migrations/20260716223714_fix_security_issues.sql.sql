/*
# Fix Security Issues: pg_net relocation, RLS policy hardening, function execute revocation, email_notifications policies

## Summary

This migration addresses 10 security advisories across 4 categories:

1. **pg_net extension in public schema** — Moved to a dedicated `extensions` schema.
2. **RLS INSERT policies with WITH CHECK (true)** — Replaced with meaningful predicates on 4 tables.
3. **SECURITY DEFINER functions callable by anon/authenticated** — Revoked EXECUTE from anon, authenticated, and PUBLIC on both trigger functions.
4. **email_notifications RLS enabled with no policies** — Added a SELECT policy for authenticated users.

## Changes

### 1. pg_net extension relocation

- Created a new `extensions` schema.
- Dropped the `trg_notify_new_contact` and `trg_notify_new_estimate` triggers.
- Dropped the `notify_new_contact()` and `notify_new_estimate()` functions.
- Dropped the `pg_net` extension from the `public` schema.
- Recreated `pg_net` in the `extensions` schema.
- Recreated both trigger functions with schema-qualified calls to `extensions.net.http_post`.
- Recreated both triggers.
- Granted USAGE on the `extensions` schema to `anon` and `authenticated` so the functions can resolve the `net.http_post` symbol at runtime.

### 2. RLS INSERT policy hardening

Replaced `WITH CHECK (true)` on all four public-form INSERT policies with meaningful predicates that still allow legitimate submissions but prevent abuse:

- **contact_messages**: `WITH CHECK (status = 'new')` — public inserts must enter as 'new'; cannot pre-set a different status.
- **estimate_requests**: `WITH CHECK (email ~ '@')` — basic email sanity check; prevents garbage inserts with non-email values.
- **estimate_submissions**: `WITH CHECK (status = 'new')` — public inserts must enter as 'new'.
- **testimonials**: `WITH CHECK (approved = false)` — public submissions must be unapproved; cannot self-approve.

### 3. SECURITY DEFINER function execute revocation

Both `notify_new_contact()` and `notify_new_estimate()` are trigger functions that use `SECURITY DEFINER` to call `extensions.net.http_post` with elevated privileges. They must NOT be callable directly via the REST API (`/rest/v1/rpc/...`) by `anon` or `authenticated` roles.

- `REVOKE EXECUTE ON FUNCTION ... FROM PUBLIC, anon, authenticated` on both functions.
- Triggers still fire normally — PostgreSQL executes trigger functions via the table's trigger mechanism, not via the function's EXECUTE privilege, so revoking direct-call access does not affect trigger behavior.

### 4. email_notifications RLS policies

The `email_notifications` table had RLS enabled but no policies, making it completely inaccessible to non-service-role clients.

- Added a SELECT policy for `authenticated` users (admin dashboard can view the email notification log).
- No INSERT/UPDATE/DELETE policies for anon or authenticated — the table is written exclusively by the edge function via the service role key (which bypasses RLS), so no client-side write access is needed.

## Security notes

1. The `extensions` schema is granted USAGE to `anon` and `authenticated` so that the `SECURITY DEFINER` trigger functions can resolve `extensions.net.http_post`. This does not expose any sensitive operations — `pg_net`'s `http_post` is only reachable through the trigger functions, which themselves are not directly callable by anon/authenticated after the EXECUTE revocation.
2. The INSERT policy predicates are intentionally minimal — they prevent the most obvious abuse vectors (self-approving testimonials, inserting with a non-'new' status, inserting non-email strings) while preserving the public form submission flow. Rate limiting and deeper validation are handled at the application/edge-function layer.
3. The trigger functions remain `SECURITY DEFINER` because they need elevated privileges to call `extensions.net.http_post`. The security fix is revoking direct-call access, not changing the security context.
*/
-- ============================================================
-- 1. Create extensions schema and relocate pg_net
-- ============================================================
CREATE SCHEMA IF NOT EXISTS extensions;

-- Drop triggers first (they depend on the functions)
DROP TRIGGER IF EXISTS trg_notify_new_contact ON public.contact_messages;
DROP TRIGGER IF EXISTS trg_notify_new_estimate ON public.estimate_submissions;

-- Drop functions (they depend on pg_net)
DROP FUNCTION IF EXISTS public.notify_new_contact();
DROP FUNCTION IF EXISTS public.notify_new_estimate();

-- Drop pg_net from public and recreate in extensions
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION pg_net SCHEMA extensions;

-- Grant usage on extensions schema so SECURITY DEFINER functions can resolve net.http_post
GRANT USAGE ON SCHEMA extensions TO anon, authenticated;

-- ============================================================
-- 2. Recreate trigger functions with schema-qualified calls
--    and SECURITY DEFINER (needed for net.http_post access)
--    Execute is revoked from anon/authenticated below.
-- ============================================================
CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  response_id int;
  function_url text := 'https://fwcxutlihgsjdswqmazf.supabase.co/functions/v1/notify-business';
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3h1dGxpaGdzamRzd3FtYXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxOTA0NjYsImV4cCI6MjA5OTc2NjQ2Nn0.gPZueOUL6f3drLx1XB4iRIwgOKkcZv3T5SY2oWKCuos';
BEGIN
  SELECT extensions.net.http_post(
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
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  response_id int;
  function_url text := 'https://fwcxutlihgsjdswqmazf.supabase.co/functions/v1/notify-business';
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3h1dGxpaGdzamRzd3FtYXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxOTA0NjYsImV4cCI6MjA5OTc2NjQ2Nn0.gPZueOUL6f3drLx1XB4iRIwgOKkcZv3T5SY2oWKCuos';
BEGIN
  SELECT extensions.net.http_post(
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

-- ============================================================
-- 3. Recreate triggers
-- ============================================================
CREATE TRIGGER trg_notify_new_contact
  AFTER INSERT ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_contact();

CREATE TRIGGER trg_notify_new_estimate
  AFTER INSERT ON public.estimate_submissions
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_estimate();

-- ============================================================
-- 4. Revoke EXECUTE on trigger functions from anon/authenticated/PUBLIC
--    Prevents direct invocation via /rest/v1/rpc/notify_new_contact etc.
--    Triggers still fire normally (trigger execution does not require
--    EXECUTE privilege — it runs through the table's trigger mechanism).
-- ============================================================
REVOKE EXECUTE ON FUNCTION public.notify_new_contact() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_new_estimate() FROM PUBLIC, anon, authenticated;

-- ============================================================
-- 5. Harden INSERT RLS policies (replace WITH CHECK (true))
-- ============================================================

-- contact_messages: public inserts must have status = 'new'
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON public.contact_messages;
CREATE POLICY "anon_insert_contact_messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new');

-- estimate_requests: basic email sanity check
DROP POLICY IF EXISTS "anon_insert_estimate_requests" ON public.estimate_requests;
CREATE POLICY "anon_insert_estimate_requests"
  ON public.estimate_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (email ~ '@');

-- estimate_submissions: public inserts must have status = 'new'
DROP POLICY IF EXISTS "anon_insert_estimate_submissions" ON public.estimate_submissions;
CREATE POLICY "anon_insert_estimate_submissions"
  ON public.estimate_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new');

-- testimonials: public submissions must be unapproved
DROP POLICY IF EXISTS "anon_insert_testimonials" ON public.testimonials;
CREATE POLICY "anon_insert_testimonials"
  ON public.testimonials FOR INSERT
  TO anon, authenticated
  WITH CHECK (approved = false);

-- ============================================================
-- 6. Add RLS policies on email_notifications
--    Written by edge function via service role (bypasses RLS).
--    Readable by authenticated (admin dashboard).
-- ============================================================
DROP POLICY IF EXISTS "auth_select_email_notifications" ON public.email_notifications;
CREATE POLICY "auth_select_email_notifications"
  ON public.email_notifications FOR SELECT
  TO authenticated
  USING (true);
