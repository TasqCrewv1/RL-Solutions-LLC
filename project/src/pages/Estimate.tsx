import { useMemo, useEffect } from 'react';
import { PartyPopper } from 'lucide-react';
import { useEstimatorStore } from '../lib/estimator/store/estimatorStore';
import { questionEngine } from '../lib/estimator/services/QuestionEngine';
import type { AnswerValue } from '../lib/estimator/types';
import { ProgressBar } from '../components/estimator/ProgressBar';
import { NavButtons } from '../components/estimator/NavButtons';
import { InputRenderer } from '../components/estimator/InputRenderer';
import { SummaryStep } from '../components/estimator/SummaryStep';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';

export default function Estimate() {
  const meta = getPageMeta('estimate');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Estimate', path: '/estimate' },
  ]);
  useSEO(meta, 'estimate', [breadcrumbs]);

  const {
    phase, currentStep, totalSteps, answers, files, estimate, summary,
    submitting, submitted, error, sendCopyToCustomer,
    goNext, goBack, setAnswer, addFiles, removeFile, toggleSendCopy, submit, reset,
  } = useEstimatorStore();

  const question = useMemo(
    () => questionEngine.getCurrentQuestion(answers, currentStep),
    [answers, currentStep],
  );

  const isLastStep = questionEngine.isLastStep(answers, currentStep);
  const canProceed = question
    ? questionEngine.validateAnswer(question, answers[question.id] ?? null) === null
    : true;

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentStep, phase]);

  // ── Submitted ──
  if (submitted && phase === 'submitted') {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-xl items-center justify-center py-16 text-center">
          <div className="animate-scale-in">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <PartyPopper size={40} strokeWidth={1.6} />
            </div>
            <h1 className="mt-8 font-display text-3xl font-600 tracking-tight text-slate-900 sm:text-4xl">Your estimate is on the way</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              We've saved your estimate request{sendCopyToCustomer ? ' and will send you a confirmation when email delivery is available' : ''}.
              Jeremiah will review the details and reach out within a business day.
            </p>
            <button
              onClick={reset}
              className="mt-8 text-base font-600 text-orange-600 underline-offset-4 transition-colors hover:underline"
            >
              Start a new estimate
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Summary step ──
  if (phase === 'summary' && estimate && summary) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
          <ProgressBar current={totalSteps - 1} total={totalSteps} />
          <div className="mt-8">
            <SummaryStep
              estimate={estimate}
              summary={summary}
              answers={answers}
              sendCopyToCustomer={sendCopyToCustomer}
              onToggleCopy={toggleSendCopy}
            />
          </div>
          {error && <div className="mt-4 rounded-xl bg-red-50 px-5 py-4 text-sm font-500 text-red-700" role="alert">{error}</div>}
          <NavButtons onBack={goBack} onNext={submit} isLastStep canProceed submitting={submitting} isSummary />
        </div>
      </div>
    );
  }

  // ── Builder (question flow) ──
  if (!question) return null;
  const currentAnswer: AnswerValue | undefined = answers[question.id] ?? undefined;

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:py-14">
        {/* Title + progress */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-600 tracking-tight text-slate-900 sm:text-4xl">Free Project Estimate</h1>
          <p className="mt-2 text-base text-slate-500">Answer a few questions to get a ballpark price range for your project.</p>
        </div>
        <ProgressBar current={currentStep} total={totalSteps} />

        {/* Single-column question area with live estimate card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-600 tracking-tight text-slate-900 text-balance sm:text-3xl">{question.title}</h2>
            {question.description && <p className="mt-2 text-base leading-relaxed text-slate-600 text-pretty">{question.description}</p>}
            <div className="mt-7">
              <InputRenderer
                question={question}
                value={currentAnswer}
                onChange={(v) => setAnswer(question.id, v)}
                onAddFiles={addFiles}
                onRemoveFile={removeFile}
                files={files}
              />
            </div>
            {error && <div className="mt-4 rounded-xl bg-red-50 px-5 py-4 text-sm font-500 text-red-700" role="alert">{error}</div>}

            <NavButtons
              onBack={goBack}
              onNext={goNext}
              isLastStep={isLastStep}
              canProceed={canProceed}
            />
          </div>

          {/* Right: live estimate card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {estimate && estimate.costRange.low > 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-white p-5" aria-live="polite">
                <p className="text-xs font-600 uppercase tracking-wide text-slate-500">Estimated so far</p>
                <p className="mt-1 font-display text-2xl font-700 text-slate-900">
                  ${Math.round(estimate.costRange.low).toLocaleString('en-US')} – ${Math.round(estimate.costRange.high).toLocaleString('en-US')}
                </p>
                {estimate.timeline.lowWeeks > 0 && (
                  <p className="mt-2 text-sm text-slate-500">Timeline: ~{estimate.timeline.lowWeeks}–{estimate.timeline.highWeeks} weeks</p>
                )}
                {estimate.complexity.level !== 'simple' && (
                  <p className="mt-1 text-sm text-slate-500">Complexity: {estimate.complexity.level.replace('-', ' ')}</p>
                )}
                <p className="mt-3 text-xs text-slate-400">Final pricing confirmed after site visit.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-sm font-600 text-slate-500">Your estimate appears here</p>
                <p className="mt-1 text-xs text-slate-400">Answer a few questions to see a price range</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
