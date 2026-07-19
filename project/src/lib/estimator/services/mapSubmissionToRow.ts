import type { Answers, EstimateResult, ProcessedFile, SubmissionPayload } from '../types';
import { questionDatabase } from '../config/questions';

/** Row shape expected by `estimate_submissions` + Admin + notify-business. */
export interface EstimateSubmissionInsert {
  calculator_type: string;
  project_title: string;
  selections: Record<string, unknown>;
  pricing_breakdown: {
    low: number;
    high: number;
    components: { label: string; amount: number }[];
    disclaimer: string;
  } | null;
  photo_urls: string[];
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  property_location: string | null;
  timeline: string | null;
  budget_range: string | null;
  notes: string | null;
  status: 'new';
}

function projectTypeLabel(projectType: string): string {
  const match = questionDatabase.projectTypes.find((t) => t.id === projectType);
  return match?.label ?? projectType;
}

function asString(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}

/** Strip file blobs / base64 from answers so we never write large payloads to JSONB. */
function sanitizeAnswers(answers: Answers): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(answers)) {
    if (key === 'photos') continue;
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && 'base64' in (value[0] as object)) {
      continue;
    }
    out[key] = value;
  }
  return out;
}

function fileMetadata(files: ProcessedFile[]): { name: string; type: string; size: number; isImage: boolean }[] {
  return files.map((f) => ({
    name: f.name,
    type: f.type,
    size: f.size,
    isImage: f.isImage,
  }));
}

function buildPricingBreakdown(estimate: EstimateResult | null) {
  if (!estimate) return null;
  const { low, high } = estimate.costRange;
  return {
    low,
    high,
    components: [
      { label: 'Labor', amount: estimate.breakdown.labor },
      { label: 'Materials', amount: estimate.breakdown.materials },
      { label: 'Other', amount: estimate.breakdown.other },
    ],
    disclaimer: estimate.calculationBasis || 'Approximate range pending on-site evaluation.',
  };
}

function buildPropertyLocation(answers: Answers): string | null {
  const parts = [
    asString(answers.propertyType),
    asString(answers.zipCode),
    asString(answers.region),
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : null;
}

function buildNotes(answers: Answers, summaryText: string | null): string | null {
  const chunks: string[] = [];
  const custom = asString(answers.customDescription) ?? asString(answers.projectDescription);
  if (custom) chunks.push(custom);
  if (summaryText) chunks.push(summaryText);
  return chunks.length > 0 ? chunks.join('\n\n') : null;
}

/**
 * Maps the estimator SubmissionPayload into an `estimate_submissions` insert row.
 * Phase 1: photo_urls stays empty (Storage comes later); file names are noted in selections.
 */
export function mapSubmissionToRow(payload: SubmissionPayload): EstimateSubmissionInsert {
  const projectType = payload.calculatorType || asString(payload.answers.projectType) || 'unknown';
  const selections = sanitizeAnswers(payload.answers);
  const files = fileMetadata(payload.files);
  if (files.length > 0) {
    selections._uploadedFileMeta = files;
    selections._photosPendingStorage = true;
  }

  return {
    calculator_type: projectType,
    project_title: payload.projectTitle?.trim() || projectTypeLabel(projectType),
    selections,
    pricing_breakdown: buildPricingBreakdown(payload.estimate),
    photo_urls: [],
    customer_name: payload.customerName.trim(),
    customer_email: payload.customerEmail.trim(),
    customer_phone: asString(payload.answers.contactPhone),
    property_location: buildPropertyLocation(payload.answers),
    timeline: asString(payload.answers.timeline),
    budget_range: asString(payload.answers.budgetRange),
    notes: buildNotes(payload.answers, payload.summary?.summary ?? null),
    status: 'new',
  };
}
