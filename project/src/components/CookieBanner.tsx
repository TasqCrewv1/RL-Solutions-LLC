import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Check } from 'lucide-react';

const STORAGE_KEY = 'rl_cookie_consent';
type Consent = 'accepted' | 'rejected' | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(undefined as unknown as Consent);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(stored);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setClosing(true);
    setTimeout(() => setConsent('rejected'), 300);
  };

  const choose = (value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value);
    setClosing(true);
    setTimeout(() => setConsent(value), 300);
  };

  if (consent !== null || consent === undefined as unknown) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 transition-all duration-300 ${
        closing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-7">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <Cookie size={24} strokeWidth={1.6} />
          </span>
          <div className="flex-1">
            <h2 className="font-display text-lg font-600 text-slate-900">
              We use cookies
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 text-pretty">
              We use strictly necessary cookies to keep the site working, plus
              optional analytics and preference cookies to improve your
              experience. You can accept all or reject non-essential cookies.
              See our{' '}
              <Link
                to="/cookie-policy"
                className="font-600 text-orange-600 underline underline-offset-2 hover:text-orange-700"
              >
                Cookie Policy
              </Link>{' '}
              for details.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => choose('accepted')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-600 text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md active:scale-95"
              >
                <Check size={16} /> Accept all cookies
              </button>
              <button
                onClick={() => choose('rejected')}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-600 text-slate-700 ring-1 ring-slate-200 transition-all duration-300 hover:ring-slate-300 active:scale-95"
              >
                Reject non-essential
              </button>
            </div>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:absolute sm:right-5 sm:top-5"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
