import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, X } from 'lucide-react';

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setDismissed(false);
  }, [location.pathname]);

  useEffect(() => {
    if (dismissed) return;
    const handler = () => setVisible(window.scrollY > 600);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  if (location.pathname === '/estimate' || location.pathname === '/admin') return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden animate-slide-up">
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-2xl ring-1 ring-slate-900/10 backdrop-blur-md">
        <Link
          to="/estimate"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-base font-600 text-white shadow-sm transition-colors hover:bg-orange-600"
        >
          <Calculator size={20} />
          Get Free Estimate
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss estimate banner"
          className="flex h-11 w-11 flex-none items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
