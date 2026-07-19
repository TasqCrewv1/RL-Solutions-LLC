/*
# Create estimate_requests table (single-tenant, no auth)

1. New Tables
- `estimate_requests`
  - `id` (uuid, primary key)
  - `project_type` (text) - selected service category
  - `project_details` (text) - what they want to build/renovate
  - `project_size` (text) - approximate size/scale
  - `timeline` (text) - desired timeline
  - `budget_range` (text) - budget band
  - `property_location` (text) - property address/area
  - `has_inspiration` (boolean) - whether user has inspiration photos
  - `name` (text, not null) - full name
  - `email` (text, not null) - contact email
  - `phone` (text) - contact phone
  - `notes` (text) - optional extra notes
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `estimate_requests`.
- Allow anon + authenticated to INSERT (public estimate form, no sign-in).
- No SELECT/UPDATE/DELETE policies for anon — submissions are write-only from the public site (owner views them server-side).
*/

CREATE TABLE IF NOT EXISTS estimate_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_type text,
  project_details text,
  project_size text,
  timeline text,
  budget_range text,
  property_location text,
  has_inspiration boolean DEFAULT false,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE estimate_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_estimate_requests" ON estimate_requests;
CREATE POLICY "anon_insert_estimate_requests"
ON estimate_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
