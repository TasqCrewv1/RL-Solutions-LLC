import { Check, Clock, AlertTriangle, TrendingUp, Info } from 'lucide-react';
import type { EstimateResult, ProjectSummary, Answers } from '../../lib/estimator/types';

interface SummaryStepProps {
  estimate: EstimateResult;
  summary: ProjectSummary;
  answers: Answers;
  sendCopyToCustomer: boolean;
  onToggleCopy: (on: boolean) => void;
}

const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

export function SummaryStep({ estimate, summary, answers, sendCopyToCustomer, onToggleCopy }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-600 tracking-tight text-slate-900 sm:text-3xl">Your project estimate</h2>
        <p className="mt-2 text-base leading-relaxed text-slate-600">Review the breakdown below, then submit to get a detailed report.</p>
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3">
        <Info size={16} className="mt-0.5 flex-none text-slate-400" />
        <p className="text-sm text-slate-600">{estimate.calculationBasis}</p>
      </div>

      {/* AI Summary */}
      <div className="rounded-3xl border-2 border-slate-900/5 bg-white p-7">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-700 text-white">AI</span>
          <h3 className="font-display text-lg font-600 text-slate-900">Project Summary</h3>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{summary.summary}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Next Steps</p>
            <ul className="mt-3 space-y-2">
              {summary.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-50 text-[10px] font-700 text-blue-600">{i + 1}</span>
                  <span className="text-sm leading-relaxed text-slate-600">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Concerns</p>
            <ul className="mt-3 space-y-2">
              {summary.concerns.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <AlertTriangle size={14} className="mt-0.5 flex-none text-amber-500" />
                  <span className="text-sm leading-relaxed text-slate-600">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {summary.missingInfo.length > 0 && (
          <div className="mt-5 rounded-xl bg-amber-50 px-4 py-3">
            <p className="text-xs font-600 uppercase tracking-wide text-amber-700">Missing Information</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {summary.missingInfo.map((info, i) => (
                <li key={i} className="flex items-center gap-1.5 text-sm text-amber-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />{info}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Cost range */}
      <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-7">
        <p className="text-sm font-600 uppercase tracking-widest text-slate-500">Estimated total</p>
        {estimate.costRange.low > 0 ? (
          <>
            <p className="mt-2 font-display text-4xl font-700 tracking-tight text-slate-900 sm:text-5xl">
              {fmt(estimate.costRange.low)} <span className="text-slate-400">–</span> {fmt(estimate.costRange.high)}
            </p>
            <p className="mt-2 text-sm text-slate-500">Midpoint: {fmt(estimate.costRange.mid)}</p>
          </>
        ) : (
          <p className="mt-2 font-display text-2xl font-600 text-slate-400">Custom quote needed</p>
        )}
      </div>

      {/* Breakdown */}
      {estimate.costRange.low > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Labor</p>
            <p className="mt-2 font-display text-xl font-700 text-slate-900">{fmt(estimate.breakdown.labor)}</p>
            <p className="text-xs text-slate-400">{fmt(estimate.labor.low)} – {fmt(estimate.labor.high)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Materials</p>
            <p className="mt-2 font-display text-xl font-700 text-slate-900">{fmt(estimate.breakdown.materials)}</p>
            <p className="text-xs text-slate-400">{fmt(estimate.materials.low)} – {fmt(estimate.materials.high)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Other</p>
            <p className="mt-2 font-display text-xl font-700 text-slate-900">{fmt(estimate.breakdown.other)}</p>
            <p className="text-xs text-slate-400">{fmt(estimate.other.low)} – {fmt(estimate.other.high)}</p>
          </div>
        </div>
      )}

      {/* Timeline + Complexity + Confidence */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-orange-500" />
            <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Timeline</p>
          </div>
          <p className="mt-2 font-display text-lg font-700 text-slate-900">{estimate.timeline.lowWeeks}–{estimate.timeline.highWeeks} weeks</p>
          <p className="text-xs text-slate-400">{estimate.timeline.lowDays}–{estimate.timeline.highDays} working days</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Complexity</p>
          <p className="mt-2 font-display text-lg font-700 capitalize text-slate-900">{estimate.complexity.level.replace('-', ' ')}</p>
          <p className="text-xs text-slate-400">Score: {estimate.complexity.score}/5</p>
        </div>
        <div className={`rounded-2xl border p-5 ${estimate.confidence.level === 'low' ? 'border-orange-200 bg-orange-50' : 'border-slate-200 bg-white'}`}>
          <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Confidence</p>
          <p className="mt-2 font-display text-lg font-700 capitalize text-slate-900">{estimate.confidence.level}</p>
          <p className="text-xs text-slate-400">±{Math.round(estimate.confidence.rangePercent * 100)}% range</p>
        </div>
      </div>

      {estimate.confidence.level === 'low' && (
        <div className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4">
          <TrendingUp size={18} className="mt-0.5 flex-none text-orange-600" />
          <p className="text-sm leading-relaxed text-orange-900">{estimate.confidence.description}</p>
        </div>
      )}

      {/* Unknowns + Assumptions */}
      <div className="rounded-3xl border border-slate-200 bg-white p-7">
        <details>
          <summary className="cursor-pointer text-sm font-600 uppercase tracking-widest text-slate-500">How we calculated this</summary>
          {estimate.unknowns.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-600 uppercase tracking-wide text-orange-600">Missing information</p>
              <ul className="mt-2 space-y-1.5">
                {estimate.unknowns.map((u, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange-400" />{u}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={estimate.unknowns.length > 0 ? 'mt-4' : 'mt-0'}>
            <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Assumptions made</p>
            <ul className="mt-2 space-y-1.5">
              {estimate.assumptions.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={14} className="mt-0.5 flex-none text-green-500" />{a}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>

      {/* Email copy opt-in */}
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4">
        <input
          type="checkbox"
          checked={sendCopyToCustomer}
          onChange={(e) => onToggleCopy(e.target.checked)}
          className="h-5 w-5 rounded accent-orange-500"
        />
        <span className="text-sm font-500 text-slate-700">
          Email me a copy at {typeof answers.contactEmail === 'string' && answers.contactEmail ? answers.contactEmail : '(add your email above)'}
        </span>
      </label>
    </div>
  );
}
