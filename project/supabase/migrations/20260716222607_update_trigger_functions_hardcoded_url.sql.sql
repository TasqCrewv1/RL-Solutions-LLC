/*
# Update trigger functions with hardcoded project URL

The ALTER DATABASE SET approach was denied due to permissions. Instead,
the project URL and anon key are embedded directly in the trigger
functions. The anon key is already public (embedded in the frontend
bundle) and the edge function uses the service role key internally for
its database access, so this is safe.

The triggers use pg_net to HTTP-POST to the notify-business edge
function whenever a new row is inserted into estimate_submissions or
contact_messages. The HTTP call is asynchronous and non-blocking.
*/

-- Drop and recreate with hardcoded URL
DROP TRIGGER IF EXISTS trg_notify_new_estimate ON estimate_submissions;
DROP TRIGGER IF EXISTS trg_notify_new_contact ON contact_messages;
DROP FUNCTION IF EXISTS notify_new_estimate();
DROP FUNCTION IF EXISTS notify_new_contact();

CREATE OR REPLACE FUNCTION notify_new_estimate()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE TRIGGER trg_notify_new_estimate
  AFTER INSERT ON estimate_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_estimate();

CREATE TRIGGER trg_notify_new_contact
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
