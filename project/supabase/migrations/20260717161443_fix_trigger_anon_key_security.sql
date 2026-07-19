-- Fix: Remove hardcoded anon JWT key from trigger functions
-- The original migrations hardcoded the anon key in function source (visible via pg_get_functiondef).
-- We recreate the functions to use current_setting('app.supabase_anon_key') which reads from
-- a GUC (Grand Unified Configuration) parameter that can be set securely at the project level.

CREATE OR REPLACE FUNCTION public.notify_estimate_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, net, pg_catalog
AS $$
DECLARE
  project_url text;
  anon_key text;
BEGIN
  project_url := current_setting('app.supabase_url', true);
  anon_key := current_setting('app.supabase_anon_key', true);
  
  IF project_url IS NULL OR anon_key IS NULL THEN
    INSERT INTO public.email_notifications (type, record_id, recipient, subject, body, status)
    VALUES ('estimate', NEW.id, 'hello@rlsolutions.com', 'New Estimate Request', 
            'A new estimate request was submitted. Check the admin dashboard.', 'pending');
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url := project_url || '/functions/v1/notify-business',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object(
      'table', 'estimate_submissions',
      'record_id', NEW.id
    )::text
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_contact_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, net, pg_catalog
AS $$
DECLARE
  project_url text;
  anon_key text;
BEGIN
  project_url := current_setting('app.supabase_url', true);
  anon_key := current_setting('app.supabase_anon_key', true);
  
  IF project_url IS NULL OR anon_key IS NULL THEN
    INSERT INTO public.email_notifications (type, record_id, recipient, subject, body, status)
    VALUES ('contact', NEW.id, 'hello@rlsolutions.com', 'New Contact Message',
            'A new contact message was received. Check the admin dashboard.', 'pending');
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url := project_url || '/functions/v1/notify-business',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object(
      'table', 'contact_messages',
      'record_id', NEW.id
    )::text
  );

  RETURN NEW;
END;
$$;
