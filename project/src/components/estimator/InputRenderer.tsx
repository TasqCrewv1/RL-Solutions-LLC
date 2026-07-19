import { Check } from 'lucide-react';
import type { AnswerValue, Question, DimensionsValue } from '../../lib/estimator/types';
import { FileUploadInput } from './FileUploadInput';
import type { ProcessedFile } from '../../lib/estimator/types';

interface InputRendererProps {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  files: ProcessedFile[];
}

const FIELD_CLS =
  'w-full rounded-xl border-2 border-slate-100 bg-white px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2';

const DIM_INPUT_CLS =
  'w-20 rounded-xl border-2 border-slate-100 bg-white px-3 py-3 text-lg font-600 text-slate-900 text-center placeholder:text-slate-300 focus:border-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500';

const DIM_LABEL_CLS = 'text-sm font-600 text-slate-500';

function dimensionsToSqFt(d: DimensionsValue): number {
  const lengthFt = d.lengthFt + d.lengthIn / 12;
  const widthFt = d.widthFt + d.widthIn / 12;
  return Math.round(lengthFt * widthFt * 100) / 100;
}

function isDimensions(v: unknown): v is DimensionsValue {
  return typeof v === 'object' && v !== null && 'lengthFt' in v && 'widthFt' in v;
}

export function InputRenderer({ question, value, onChange, onAddFiles, onRemoveFile, files }: InputRendererProps) {
  if (question.inputType === 'select' && question.options) {
    return (
      <select
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        aria-label={question.title}
        className="w-full max-w-md rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 text-lg font-display font-600 text-slate-900 focus:border-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      >
        <option value="">Choose one...</option>
        {question.options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }

  if (question.inputType === 'radio' && question.options) {
    return (
      <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label={question.title}>
        {question.options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              role="radio"
              aria-checked={selected}
              className={`rounded-2xl border-2 p-5 text-left transition-all duration-300 ${selected ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
            >
              <span className="block font-display text-lg font-600 text-slate-900">{opt.label}</span>
              {opt.description && <span className="mt-1 block text-sm text-slate-500">{opt.description}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.inputType === 'checkbox' && question.options) {
    const current = Array.isArray(value) ? (value as string[]) : [];
    const toggle = (v: string) =>
      onChange(current.includes(v) ? current.filter((x) => x !== v) : [...current, v]);
    return (
      <div className="grid gap-4 sm:grid-cols-2" role="group" aria-label={question.title}>
        {question.options.map((opt) => {
          const selected = current.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              role="checkbox"
              aria-checked={selected}
              className={`flex items-center gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${selected ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
            >
              <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-lg transition-colors ${selected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-transparent'}`}>
                <Check size={14} />
              </span>
              <span className="font-600 text-slate-900">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (question.inputType === 'boolean') {
    return (
      <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label={question.title}>
        <button onClick={() => onChange(true)} role="radio" aria-checked={value === true} className={`rounded-2xl border-2 p-6 text-center transition-all ${value === true ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}>
          <span className="block font-display text-xl font-600 text-slate-900">Yes</span>
        </button>
        <button onClick={() => onChange(false)} role="radio" aria-checked={value === false} className={`rounded-2xl border-2 p-6 text-center transition-all ${value === false ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}>
          <span className="block font-display text-xl font-600 text-slate-900">No</span>
        </button>
      </div>
    );
  }

  if (question.inputType === 'dimensions') {
    const d = isDimensions(value)
      ? value
      : { lengthFt: 0, lengthIn: 0, widthFt: 0, widthIn: 0 };
    const update = (patch: Partial<DimensionsValue>) =>
      onChange({ ...d, ...patch });
    const sqft = dimensionsToSqFt(d);
    return (
      <div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <span className={DIM_LABEL_CLS}>Length</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={d.lengthFt || ''}
                onChange={(e) => update({ lengthFt: parseInt(e.target.value) || 0 })}
                aria-label="Length feet"
                placeholder="0"
                className={DIM_INPUT_CLS}
              />
              <span className="text-sm font-500 text-slate-500">ft</span>
              <input
                type="number"
                min={0}
                max={11}
                value={d.lengthIn || ''}
                onChange={(e) => update({ lengthIn: parseInt(e.target.value) || 0 })}
                aria-label="Length inches"
                placeholder="0"
                className={DIM_INPUT_CLS}
              />
              <span className="text-sm font-500 text-slate-500">in</span>
            </div>
          </div>
          <div>
            <span className={DIM_LABEL_CLS}>Width</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={d.widthFt || ''}
                onChange={(e) => update({ widthFt: parseInt(e.target.value) || 0 })}
                aria-label="Width feet"
                placeholder="0"
                className={DIM_INPUT_CLS}
              />
              <span className="text-sm font-500 text-slate-500">ft</span>
              <input
                type="number"
                min={0}
                max={11}
                value={d.widthIn || ''}
                onChange={(e) => update({ widthIn: parseInt(e.target.value) || 0 })}
                aria-label="Width inches"
                placeholder="0"
                className={DIM_INPUT_CLS}
              />
              <span className="text-sm font-500 text-slate-500">in</span>
            </div>
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="font-600">Calculated area: </span>
          {sqft > 0 ? (
            <span className="font-display text-base font-700 text-orange-600">{sqft.toLocaleString('en-US')} sq ft</span>
          ) : (
            <span className="text-slate-400">Enter measurements to calculate</span>
          )}
        </p>
      </div>
    );
  }

  if (question.inputType === 'number') {
    const numVal = typeof value === 'number' ? value : typeof value === 'string' ? value : '';
    return (
      <div>
        <div className="flex items-end gap-3">
          <input
            type="number"
            value={numVal as number | string}
            onChange={(e) => {
              if (e.target.value === '') { onChange(''); return; }
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) onChange(v);
            }}
            placeholder={question.placeholder}
            min={question.validation?.min}
            max={question.validation?.max}
            aria-label={`${question.title}${question.unit ? ` in ${question.unit}` : ''}`}
            className="w-40 rounded-xl border-2 border-slate-100 bg-white px-4 py-3.5 text-2xl font-display font-600 text-slate-900 placeholder:text-slate-300 focus:border-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          />
          {question.unit && <span className="pb-3 text-lg font-500 text-slate-500">{question.unit}</span>}
        </div>
        {question.validation?.min !== undefined && question.validation?.max !== undefined && (
          <p className="mt-2 text-sm text-slate-400">Typical range: {question.validation.min}–{question.validation.max} {question.unit}</p>
        )}
      </div>
    );
  }

  if (question.inputType === 'text') {
    return (
      <input
        type="text"
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        aria-label={question.title}
        className={FIELD_CLS}
      />
    );
  }

  if (question.inputType === 'textarea') {
    return (
      <textarea
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        aria-label={question.title}
        rows={5}
        className={`${FIELD_CLS} resize-y`}
      />
    );
  }

  if (question.inputType === 'date') {
    return (
      <input
        type="date"
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        aria-label={question.title}
        className={FIELD_CLS}
      />
    );
  }

  if (question.inputType === 'file') {
    return <FileUploadInput files={files} onAdd={onAddFiles} onRemove={onRemoveFile} />;
  }

  return null;
}
