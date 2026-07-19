/*
# Email notifications table + database triggers for new submissions

1. New Tables
- `email_notifications`
  - `id` (uuid, primary key)
  - `recipient` (text, not null) — business email address
  - `reply_to` (text) — customer email for direct reply
  - `subject` (text, not null) — email subject line
  - `body` (text, not null) — full email body
  - `status` (text, default 'pending') — pending / sent / failed
  - `sent_at` (timestamptz) — when the email was successfully sent
  - `error_message` (text) — error details if sending failed
  - `created_at` (timestamptz, default now())

2. Extensions
- Enable `pg_net` for HTTP calls from database triggers

3. Functions
- `notify_new_estimate()` — trigger function that HTTP-POSTs to the
  notify-business edge function when a new row is inserted into
  estimate_submissions
- `notify_new_contact()` — same pattern for contact_messages

4. Triggers
- AFTER INSERT on estimate_submissions → calls notify_new_estimate()
- AFTER INSERT on contact_messages → calls notify_new_contact()

5. Security
- Enable RLS on email_notifications
- No anon/authenticated policies — this table is written to only by the
  service role (edge function) and read by the authenticated admin

6. Notes
- The triggers fire asynchronously using pg_net's http_post, which is
  non-blocking — the INSERT succeeds even if the HTTP call fails
- The edge function handles the actual email sending (via Resend if
  RESEND_API_KEY is configured, otherwise stores to email_notifications
  as a fallback that the admin dashboard surfaces)
*/

CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL,
  reply_to text,
  subject text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  sent_at timestamptz,
  error_message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_email_notifications_status
  ON email_notifications (status);
CREATE INDEX IF NOT EXISTS idx_email_notifications_created_at
  ON email_notifications (created_at DESC);

-- Enable pg_net for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Drop existing triggers/functions if they exist (idempotent re-run safe)
DROP TRIGGER IF EXISTS trg_notify_new_estimate ON estimate_submissions;
DROP TRIGGER IF EXISTS trg_notify_new_contact ON contact_messages;
DROP FUNCTION IF EXISTS notify_new_estimate();
DROP FUNCTION IF EXISTS notify_new_contact();

-- Trigger function for new estimate submissions
CREATE OR REPLACE FUNCTION notify_new_estimate()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  project_url text;
  function_url text;
  response_id int;
BEGIN
  -- Get the Supabase project URL from the auth.users table (available in all Supabase projects)
  -- We use a safer approach: construct from the known project reference
  -- The anon key is safe to use here since the edge function uses the service role internally
  SELECT current_setting('app.supabase_url', true) INTO project_url;
  IF project_url IS NULL THEN
    -- Fallback: no notification if URL is not set
    RETURN NEW;
  END IF;

  function_url := project_url || '/functions/v1/notify-business';

  -- Asynchronous HTTP POST — non-blocking, fire-and-forget
  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_anon_key', true)
    ),
    body := jsonb_build_object(
      'type', 'estimate',
      'recordId', NEW.id
    )
  ) INTO response_id;

  RETURN NEW;
END;
$$;

-- Trigger function for new contact messages
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  project_url text;
  function_url text;
  response_id int;
BEGIN
  SELECT current_setting('app.supabase_url', true) INTO project_url;
  IF project_url IS NULL THEN
    RETURN NEW;
  END IF;

  function_url := project_url || '/functions/v1/notify-business';

  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_anon_key', true)
    ),
    body := jsonb_build_object(
      'type', 'contact',
      'recordId', NEW.id
    )
  ) INTO response_id;

  RETURN NEW;
END;
$$;

-- Create the triggers
CREATE TRIGGER trg_notify_new_estimate
  AFTER INSERT ON estimate_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_estimate();

CREATE TRIGGER trg_notify_new_contact
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
