import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BUSINESS_EMAIL,
} from '../lib/seo';
import PhoneNumber from './PhoneNumber';

interface FooterProps {
  onContact: () => void;
}

const infoLinks: { label: string; path: string }[] = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Cookie Settings', path: '/cookie-settings' },
  { label: 'Cookie Policy', path: '/cookie-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Sitemap', path: '/sitemap' },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-600 uppercase tracking-widest text-slate-400">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export default function Footer({ onContact }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300" role="contentinfo">
      <div className="container-wide py-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-orange-500 ring-1 ring-white/10">
              <span className="font-display text-xl font-700">R</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-600 text-white">
                RL Solutions
              </span>
            </span>
          </div>
          <p className="mt-2 text-[12px] font-500 tracking-[0.18em] uppercase text-slate-400">
            A Problem Solving Company
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 flex-none text-orange-500" />
                <PhoneNumber className="text-slate-300" />
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 flex-none text-orange-500" />
                <button
                  onClick={onContact}
                  className="text-left text-slate-300 transition-colors hover:text-white"
                >
                  {BUSINESS_EMAIL}
                </button>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-none text-orange-500" />
                <span className="text-slate-300">
                  Wilmington, Delaware<br />
                  <span className="text-slate-400">Serving Delaware and Pennsylvania</span>
                </span>
              </li>
            </ul>
          </div>

          <Col title="Customer Support">
            <li>
              <Link
                to="/faq"
                className="text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                FAQ
              </Link>
            </li>
            <li>
              <button
                onClick={onContact}
                className="text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                Contact Us
              </button>
            </li>
            <li>
              <Link
                to="/estimate"
                className="text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                Get an Estimate
              </Link>
            </li>
          </Col>

          <Col title="Our Company">
            <li>
              <Link
                to="/about"
                className="text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                About RL Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/testimonials"
                className="text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/service-areas"
                className="text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                Service Areas
              </Link>
            </li>
          </Col>

          <div className="lg:col-span-1">
            <h3 className="text-xs font-600 uppercase tracking-widest text-slate-400">
              Get Started
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/estimate"
                  className="text-left text-sm text-slate-300 transition-colors hover:text-orange-400"
                >
                  Free Project Estimate
                </Link>
              </li>
            </ul>
          </div>

          <Col title="More Information">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-left text-sm text-slate-300 transition-colors hover:text-orange-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </Col>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} RL Solutions LLC. A Problem Solving Company. All rights reserved.
          </p>
          <p className="mt-3 text-center text-xs text-slate-600">
            Licensed &amp; Insured &middot; Serving Delaware &amp; Pennsylvania &middot; Wilmington, DE
          </p>
        </div>
      </div>
    </footer>
  );
}
