interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total <= 1 ? 0 : Math.round((current / (total - 1)) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-600 text-slate-600">
        <span>Step {Math.min(current + 1, total)} of {total}</span>
        <span className="text-slate-400">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
