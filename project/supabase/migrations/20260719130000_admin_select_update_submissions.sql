/*
  Admin dashboard RLS: allow authenticated users (Jeremiah) to list and update
  estimate_submissions and contact_messages. Public remains INSERT-only.
*/

-- estimate_submissions
DROP POLICY IF EXISTS "auth_select_estimate_submissions" ON public.estimate_submissions;
CREATE POLICY "auth_select_estimate_submissions"
  ON public.estimate_submissions FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "auth_update_estimate_submissions" ON public.estimate_submissions;
CREATE POLICY "auth_update_estimate_submissions"
  ON public.estimate_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- contact_messages
DROP POLICY IF EXISTS "auth_select_contact_messages" ON public.contact_messages;
CREATE POLICY "auth_select_contact_messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "auth_update_contact_messages" ON public.contact_messages;
CREATE POLICY "auth_update_contact_messages"
  ON public.contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
