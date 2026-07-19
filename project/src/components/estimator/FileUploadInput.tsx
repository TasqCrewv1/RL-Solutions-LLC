import { Upload, X, FileText } from 'lucide-react';
import type { ProcessedFile } from '../../lib/estimator/types';

interface FileUploadInputProps {
  files: ProcessedFile[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUploadInput({ files, onAdd, onRemove, accept = 'image/jpeg,image/png,image/gif,application/pdf', multiple = true }: FileUploadInputProps) {
  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition-colors hover:border-orange-400 hover:bg-orange-50/40">
        <Upload size={28} className="text-slate-400" />
        <span className="mt-3 text-sm font-600 text-slate-700">Click to upload photos or PDFs</span>
        <span className="mt-1 text-xs text-slate-400">JPEG, PNG, GIF, or PDF — max 20MB each, up to 20 files</span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => {
            const incoming = Array.from(e.target.files ?? []);
            if (incoming.length) onAdd(incoming);
            e.currentTarget.value = '';
          }}
        />
      </label>

      {files.length > 0 && (
        <>
          <p className="mt-3 text-sm font-600 text-slate-600">{files.length} file{files.length !== 1 ? 's' : ''} attached</p>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {files.map((f) => (
              <li key={f.id} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                {f.isImage && f.previewUrl ? (
                  <img src={f.previewUrl} alt={f.name} className="h-24 w-full object-cover" />
                ) : (
                  <div className="flex h-24 w-full items-center justify-center bg-slate-50 text-slate-400">
                    <FileText size={28} />
                  </div>
                )}
                <div className="truncate px-2 py-1.5 text-xs font-500 text-slate-600">{f.name}</div>
                <button
                  type="button"
                  onClick={() => onRemove(f.id)}
                  aria-label={`Remove ${f.name}`}
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
