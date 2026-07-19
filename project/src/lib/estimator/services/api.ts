import type { SubmissionPayload, SubmissionResult } from '../types';
import { supabase } from '../../supabase';
import { mapSubmissionToRow } from './mapSubmissionToRow';

/**
 * Persist an estimate to Supabase. Email delivery is handled by the existing
 * `notify_new_estimate` DB trigger → `notify-business` edge function (same
 * pattern as ContactModal → contact_messages).
 *
 * Phase 1: no Storage uploads; photos remain client-side only.
 */
export async function submitEstimate(payload: SubmissionPayload): Promise<SubmissionResult> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
  }

  const name = payload.customerName?.trim() ?? '';
  const email = payload.customerEmail?.trim() ?? '';
  if (!name || !email) {
    return { success: false, error: 'Please provide your name and email before submitting.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  const row = mapSubmissionToRow({
    ...payload,
    customerName: name,
    customerEmail: email,
  });

  // Mirror ContactModal: insert without .select() so INSERT-only RLS is enough.
  const { error } = await supabase.from('estimate_submissions').insert(row);

  if (error) {
    return { success: false, error: error.message || 'Failed to save your estimate. Please try again.' };
  }

  return { success: true };
}
