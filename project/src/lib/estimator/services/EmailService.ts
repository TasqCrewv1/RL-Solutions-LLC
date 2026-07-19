import type { Answers, EstimateResult, ProjectSummary, ProcessedFile, SubmissionPayload, SubmissionResult } from '../types';
import { emailConfig } from '../config/upload';

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function fileList(files: ProcessedFile[]): string {
  if (files.length === 0) return '<p><em>No files uploaded.</em></p>';
  return files
    .map((f) =>
      f.isImage && f.previewUrl
        ? `<div style="margin:8px 0"><img src="${f.previewUrl}" alt="${escapeHtml(f.name)}" style="max-width:200px;border-radius:8px"/><br/><small>${escapeHtml(f.name)}</small></div>`
        : `<div style="margin:8px 0"><small>${escapeHtml(f.name)} (${Math.round(f.size / 1024)} KB)</small></div>`,
    )
    .join('');
}

export function buildHtmlReport(
  answers: Answers,
  estimate: EstimateResult | null,
  summary: ProjectSummary | null,
  files: ProcessedFile[],
): string {
  const rows = Object.entries(answers)
    .filter(([k]) => !k.startsWith('photos'))
    .map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #eee;font-weight:600">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #eee">${escapeHtml(Array.isArray(v) ? v.join(', ') : String(v))}</td></tr>`)
    .join('');

  const estimateBlock = estimate && estimate.costRange.low > 0
    ? `<h3>Estimate</h3><p><strong>$${estimate.costRange.low} – $${estimate.costRange.high}</strong> (midpoint $${estimate.costRange.mid})</p>
       <p>Labor: $${estimate.breakdown.labor} | Materials: $${estimate.breakdown.materials} | Other: $${estimate.breakdown.other}</p>
       <p>Timeline: ${estimate.timeline.lowWeeks}–${estimate.timeline.highWeeks} weeks</p>`
    : '<h3>Estimate</h3><p><em>Custom quote needed.</em></p>';

  const summaryBlock = summary
    ? `<h3>Project Summary</h3><p>${escapeHtml(summary.summary)}</p>
       <h4>Next Steps</h4><ul>${summary.nextSteps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
       <h4>Concerns</h4><ul>${summary.concerns.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>`
    : '';

  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:680px;margin:auto;color:#1e293b">
    <h1 style="color:#ea580c">New Project Estimate Request</h1>
    <h2>Answers</h2>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    ${estimateBlock}
    ${summaryBlock}
    <h3>Uploaded Files</h3>
    ${fileList(files)}
    <hr/><p style="color:#64748b;font-size:12px">Sent from the project estimator.</p>
  </body></html>`;
}

export async function sendReport(
  payload: SubmissionPayload,
): Promise<SubmissionResult> {
  const html = buildHtmlReport(payload.answers, payload.estimate, payload.summary, payload.files);
  // Mock: log to console in place of an email API call.
  // eslint-disable-next-line no-console
  console.log(`[EmailService] To: ${emailConfig.contractorEmail}`, { subject: `New estimate: ${payload.projectTitle}`, html });

  if (payload.sendCopyToCustomer) {
    // eslint-disable-next-line no-console
    console.log(`[EmailService] To: ${payload.customerEmail}`, { subject: 'Your project estimate', html });
  }

  await new Promise((r) => setTimeout(r, 600));
  return { success: true };
}

export const emailService = { sendReport, buildHtmlReport };
