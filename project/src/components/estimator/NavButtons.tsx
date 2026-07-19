import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';

interface NavButtonsProps {
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
  canProceed: boolean;
  submitting?: boolean;
  isSummary?: boolean;
}

export function NavButtons({ onBack, onNext, isLastStep, canProceed, submitting, isSummary }: NavButtonsProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-5 py-3 text-sm font-600 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
      >
        <ArrowLeft size={18} /> Back
      </button>
      <button
        onClick={onNext}
        disabled={!canProceed || submitting}
        className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-700 text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? (
          <><Loader2 size={18} className="animate-spin" /> Submitting...</>
        ) : isSummary ? (
          <>Submit <Check size={18} /></>
        ) : isLastStep ? (
          <>Submit <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></>
        ) : (
          <>Next <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></>
        )}
      </button>
    </div>
  );
}
