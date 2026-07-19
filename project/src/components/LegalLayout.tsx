import { Link } from 'react-router-dom';
import { useReveal } from '../lib/hooks';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}

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

export default function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50 pt-32 pb-16">
        <div className="container-wide">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li>
                <Link to="/" className="transition-colors hover:text-orange-600">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-700">{title}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-600 tracking-tight text-slate-900 text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 text-pretty">
            {subtitle}
          </p>
          <p className="mt-6 text-sm text-slate-400">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="space-y-8 text-slate-700 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-600 [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-600 [&_h3]:text-lg [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:text-slate-600 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-slate-600 [&_a]:text-orange-600 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-orange-700 [&_strong]:text-slate-900 [&_strong]:font-600">
                {children}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
