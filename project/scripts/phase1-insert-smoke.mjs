/**
 * Phase 1 smoke test: insert into estimate_submissions, then confirm
 * notify-business can load the row (same path the DB trigger uses).
 * Does not modify application source beyond this script.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv() {
  const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2];
  }
}

loadEnv();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);
const id = crypto.randomUUID();

const row = {
  id,
  calculator_type: 'deck',
  project_title: 'Deck',
  selections: {
    projectType: 'deck',
    region: 'DE',
    zipCode: '19801',
    contactName: 'Phase1 Test',
    contactEmail: 'phase1-test@example.com',
    contactPhone: '302-555-0100',
    timeline: '1-3-months',
    budgetRange: '10k-25k',
    _test: true,
    _milestone: 'estimator-supabase-submit',
  },
  pricing_breakdown: {
    low: 8000,
    high: 14000,
    components: [
      { label: 'Labor', amount: 5000 },
      { label: 'Materials', amount: 6000 },
      { label: 'Other', amount: 1000 },
    ],
    disclaimer: 'Phase 1 integration test — approximate range.',
  },
  photo_urls: [],
  customer_name: 'Phase1 Test',
  customer_email: 'phase1-test@example.com',
  customer_phone: '302-555-0100',
  property_location: 'single-family · 19801 · DE',
  timeline: '1-3-months',
  budget_range: '10k-25k',
  notes: 'Automated Phase 1 insert test. Safe to mark closed.',
  status: 'new',
};

console.log('1) Inserting estimate_submissions id=', id);
const { error: insertError } = await supabase.from('estimate_submissions').insert(row);
if (insertError) {
  console.error('INSERT FAILED:', insertError.message);
  process.exit(1);
}
console.log('   INSERT OK');

console.log('2) Anon SELECT by id (expect empty under RLS)...');
const { data: anonRows, error: selErr } = await supabase
  .from('estimate_submissions')
  .select('id,project_title,customer_name')
  .eq('id', id);
console.log('   select error:', selErr?.message ?? null, 'rows:', anonRows);

console.log('3) Calling notify-business (proves row exists for service role)...');
const res = await fetch(`${url}/functions/v1/notify-business`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${key}`,
    apikey: key,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ type: 'estimate', recordId: id }),
});
const body = await res.text();
console.log('   HTTP', res.status, body);

if (!res.ok) {
  console.error('notify-business failed — row may be missing or email path errored');
  process.exit(1);
}

console.log('4) Waiting 2s for any DB trigger-driven call to settle...');
await new Promise((r) => setTimeout(r, 2000));

console.log('DONE. Row id for Admin verification:', id);
console.log('If Resend is configured, hello@rlsolutions.com should have a "New Estimate" email.');
