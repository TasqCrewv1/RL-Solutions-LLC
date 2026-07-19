/*
# Production schema: estimate submissions + contact messages

1. New Tables
- `estimate_submissions` — replaces the old `estimate_requests` table. Stores
  the full structured output of the guided estimator as JSONB so Jeremiah can
  review every selection (dimensions, materials, features, photos, pricing
  breakdown, timeline, contact info) in one row.
  - `id` uuid PK
  - `calculator_type` text — which estimator was used (deck, fence, kitchen, etc.)
  - `project_title` text — human-readable project label
  - `selections` jsonb — all user answers keyed by step id
  - `pricing_breakdown` jsonb — materials/labor/demo/permits/options + total range
  - `photo_urls` jsonb — array of uploaded photo paths (Supabase Storage)
  - `customer_name` text NOT NULL
  - `customer_email` text NOT NULL
  - `customer_phone` text
  - `property_location` text
  - `timeline` text
  - `budget_range` text
  - `notes` text
  - `status` text DEFAULT 'new' — new / contacted / scheduled / closed
  - `created_at` timestamptz DEFAULT now()

- `contact_messages` — messages submitted through the contact modal.
  - `id` uuid PK
  - `name` text NOT NULL
  - `email` text NOT NULL
  - `phone` text
  - `subject` text
  - `message` text NOT NULL
  - `attachment_urls` jsonb — array of uploaded file paths
  - `status` text DEFAULT 'new'
  - `created_at` timestamptz DEFAULT now()

2. Security
- Enable RLS on both tables.
- INSERT-only for anon/authenticated on both (public forms, no sign-in).
- No SELECT/UPDATE/DELETE for anon — submissions are write-only from the
  public site. The owner reviews them server-side / via dashboard.

3. Indexes
- `estimate_submissions` created_at DESC (dashboard listing)
- `contact_messages` created_at DESC
- Both tables indexed on status for filtering

4. Notes
- The old `estimate_requests` table is left in place (not dropped) to avoid
  data loss. The new `estimate_submissions` table supersedes it.
*/

CREATE TABLE IF NOT EXISTS estimate_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  calculator_type text NOT NULL,
  project_title text,
  selections jsonb NOT NULL DEFAULT '{}'::jsonb,
  pricing_breakdown jsonb,
  photo_urls jsonb DEFAULT '[]'::jsonb,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  property_location text,
  timeline text,
  budget_range text,
  notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE estimate_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_estimate_submissions" ON estimate_submissions;
CREATE POLICY "anon_insert_estimate_submissions"
ON estimate_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_estimate_submissions_created_at
  ON estimate_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_estimate_submissions_status
  ON estimate_submissions (status);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  attachment_urls jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status
  ON contact_messages (status);