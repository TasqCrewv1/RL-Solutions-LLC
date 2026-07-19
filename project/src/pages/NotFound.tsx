import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white pt-20">
      <div className="container-wide text-center">
        <p className="font-display text-8xl font-700 text-slate-900">404</p>
        <h1 className="mt-4 font-display text-2xl font-600 text-slate-900">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-600 text-white transition-all duration-300 hover:bg-slate-800 active:scale-95"
          >
            <HomeIcon size={18} />
            Back to Home
          </Link>
          <Link
            to="/estimate"
            className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-600 text-white transition-all duration-300 hover:bg-orange-600 active:scale-95"
          >
            Get an Estimate
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
