import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Portfolio' },
  { path: '/testimonials', label: 'Reviews' },
  { path: '/faq', label: 'FAQ' },
  { path: '/service-areas', label: 'Service Areas' },
];

function isActive(currentPath: string, linkPath: string) {
  if (linkPath === '/') return currentPath === '/';
  return currentPath === linkPath || currentPath.startsWith(linkPath + '/');
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(31,35,40,0.08)]'
          : 'bg-white/0'
      }`}
    >
      <nav className="container-wide flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="RL Solutions home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-orange-500 transition-transform duration-300 group-hover:scale-105">
            <span className="font-display text-xl font-700">R</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-600 tracking-tight text-slate-900">
              RL Solutions
            </span>
            <span className="text-[11px] font-400 tracking-wide text-slate-500">
              A Problem Solving Company
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(location.pathname, link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-lg px-4 py-2 text-sm font-500 transition-colors ${
                  active ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-orange-500 transition-all duration-300 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            );
          })}
          <Link
            to="/estimate"
            className="ml-2 whitespace-nowrap rounded-full bg-orange-500 px-5 py-2.5 text-sm font-600 text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md active:scale-95"
          >
            Request an Estimate
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-900 transition-colors hover:bg-slate-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden" id="mobile-menu">
          <div className="container-wide pb-6 pt-2">
            <div className="flex flex-col gap-1 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-slate-900/5">
              {links.map((link) => {
                const active = isActive(location.pathname, link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-xl px-4 py-3 text-left text-base font-500 transition-colors ${
                      active ? 'bg-slate-50 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/service-areas"
                className={`rounded-xl px-4 py-3 text-left text-base font-500 transition-colors ${
                  isActive(location.pathname, '/service-areas')
                    ? 'bg-slate-50 text-slate-900'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Service Areas
              </Link>
              <Link
                to="/estimate"
                className="mt-2 rounded-xl bg-orange-500 px-4 py-3 text-center text-base font-600 text-white transition-colors hover:bg-orange-600"
              >
                Request an Estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
