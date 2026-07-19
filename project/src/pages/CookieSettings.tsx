import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Check, ShieldCheck, BarChart3, Settings2 } from 'lucide-react';
import { useReveal } from '../lib/hooks';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const STORAGE_KEY = 'rl_cookie_consent';
type Consent = 'accepted' | 'rejected' | null;

export default function CookieSettings() {
  const [consent, setConsent] = useState<Consent>(null);
  const [saved, setSaved] = useState(false);

  const meta = getPageMeta('cookie-settings');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Cookie Settings', path: '/cookie-settings' },
  ]);
  useSEO(meta, 'cookie-settings', [breadcrumbs]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(stored);
  }, []);

  const save = (value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const categories = [
    {
      icon: ShieldCheck,
      title: 'Strictly Necessary',
      description:
        'Essential cookies that enable core site functionality like navigation, forms, and security. These cannot be disabled — the site will not work without them.',
      required: true,
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description:
        'Anonymous usage statistics that help us understand how visitors use the site so we can improve it. Only active if you accept.',
      required: false,
    },
    {
      icon: Settings2,
      title: 'Preferences',
      description:
        'Remember your settings and choices (such as this cookie preference itself) to provide a smoother experience.',
      required: false,
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50 pt-32 pb-16">
        <div className="container-wide">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Cookie size={26} strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                Preferences
              </p>
              <h1 className="font-display text-4xl font-600 tracking-tight text-slate-900 text-balance sm:text-5xl">
                Cookie Settings
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 text-pretty">
            Control which cookies RL Solutions can set on your device. Your
            choice is stored locally and applies across visits. See our{' '}
            <Link to="/cookie-policy" className="text-orange-600 underline underline-offset-2 hover:text-orange-700">
              Cookie Policy
            </Link>{' '}
            for full details.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="space-y-5">
                {categories.map((cat) => (
                  <div
                    key={cat.title}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                          <cat.icon size={22} strokeWidth={1.6} />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="font-display text-lg font-600 text-slate-900">
                              {cat.title}
                            </h2>
                            {cat.required && (
                              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-600 uppercase tracking-wider text-slate-500">
                                Always on
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex-none">
                        {cat.required ? (
                          <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-600 text-green-700">
                            <Check size={14} /> On
                          </span>
                        ) : (
                          <span
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-600 ${
                              consent === 'accepted'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {consent === 'accepted' ? (
                              <>
                                <Check size={14} /> On
                              </>
                            ) : (
                              'Off'
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => save('accepted')}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-600 transition-all duration-300 active:scale-95 ${
                    consent === 'accepted'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md'
                  }`}
                >
                  Accept all cookies
                </button>
                <button
                  onClick={() => save('rejected')}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-600 ring-1 transition-all duration-300 active:scale-95 ${
                    consent === 'rejected'
                      ? 'bg-slate-100 text-slate-900 ring-slate-300'
                      : 'bg-white text-slate-700 ring-slate-200 hover:ring-slate-300'
                  }`}
                >
                  Reject non-essential
                </button>
                {saved && (
                  <span className="flex items-center gap-1.5 text-sm font-600 text-green-700">
                    <Check size={16} /> Preference saved
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-10 rounded-2xl bg-slate-50 p-6">
                <h3 className="font-600 text-slate-900">Current status</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {consent === null
                    ? 'You have not made a choice yet. Non-essential cookies are not set until you decide.'
                    : consent === 'accepted'
                    ? 'You have accepted all cookies. Analytics and preference cookies are active.'
                    : 'You have rejected non-essential cookies. Only strictly necessary cookies are active.'}
                </p>
                <p className="mt-3 text-xs text-slate-400">
                  Your preference is stored on this device only. Clearing your
                  browser data will reset it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
