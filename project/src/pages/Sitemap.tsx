import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/hooks';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta, pageMeta, fullUrl } from '../lib/seo';
import { calculators } from '../lib/estimators';
import { serviceAreas } from '../lib/locations';

function RevealSection({
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

function SitemapLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-2 text-[15px] text-slate-600 transition-colors hover:text-orange-600"
      >
        <ArrowRight
          size={14}
          className="text-slate-300 transition-colors group-hover:text-orange-500"
        />
        {children}
      </Link>
    </li>
  );
}

export default function Sitemap() {
  const meta = getPageMeta('sitemap');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Sitemap', path: '/sitemap' },
  ]);
  useSEO(meta, 'sitemap', [breadcrumbs]);

  const publicPages = Object.entries(pageMeta).filter(
    ([key]) => !['admin', 'sitemap'].includes(key),
  );

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50 pt-32 pb-16">
        <div className="container-wide">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><Link to="/" className="transition-colors hover:text-orange-600">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-700">Sitemap</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-600 tracking-tight text-slate-900 text-balance sm:text-5xl">
            Sitemap
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 text-pretty">
            A complete map of every page on the RL Solutions website.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection>
              <div>
                <h2 className="font-display text-xl font-600 text-slate-900">Main Pages</h2>
                <ul className="mt-5 space-y-3">
                  {publicPages.map(([key, pm]) => (
                    <SitemapLink key={key} to={pm.path}>
                      {key === 'home' ? 'Home' : key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </SitemapLink>
                  ))}
                </ul>
              </div>
            </RevealSection>

            <RevealSection delay={80}>
              <div>
                <h2 className="font-display text-xl font-600 text-slate-900">Project Estimators</h2>
                <ul className="mt-5 space-y-3">
                  {calculators.map((calc) => (
                    <SitemapLink key={calc.id} to={`/estimate?calc=${calc.id}`}>
                      {calc.name}
                    </SitemapLink>
                  ))}
                </ul>
              </div>
            </RevealSection>

            <RevealSection delay={160}>
              <div>
                <h2 className="font-display text-xl font-600 text-slate-900">Service Areas</h2>
                <ul className="mt-5 space-y-3">
                  {serviceAreas.map((area) => (
                    <SitemapLink key={area.slug} to={`/service-areas/${area.slug}`}>
                      {area.name}, {area.state}
                    </SitemapLink>
                  ))}
                </ul>
              </div>
            </RevealSection>
          </div>

          <RevealSection delay={240}>
            <div className="mt-16 rounded-2xl bg-slate-50 p-8">
              <h2 className="font-display text-xl font-600 text-slate-900">XML Sitemap</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                For search engines, our XML sitemap is available at{' '}
                <a
                  href={fullUrl('/sitemap.xml')}
                  className="font-600 text-orange-600 underline underline-offset-2"
                >
                  /sitemap.xml
                </a>
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
