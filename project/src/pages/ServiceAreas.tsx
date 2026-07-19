import { Link, useParams } from 'react-router-dom';
import { MapPin, ArrowRight, Check } from 'lucide-react';
import { useReveal } from '../lib/hooks';
import { useSEO, buildBreadcrumbs, buildServiceSchema } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';
import PhoneNumber from '../components/PhoneNumber';
import { services } from '../lib/content';
import { serviceAreas as areas, serviceAreaCounties as counties, serviceCalcMap } from '../lib/locations';

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export default function ServiceAreas() {
  const { location: locationSlug } = useParams();

  if (locationSlug) {
    const area = areas.find((a) => a.slug === locationSlug);
    if (area) {
      return <LocationPage areaName={area.name} slug={area.slug} desc={area.desc} />;
    }
  }

  const meta = getPageMeta('service-areas');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
  ]);
  useSEO(meta, 'service-areas', [breadcrumbs]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-900">
        <div className="container-wide relative z-10 pt-32 pb-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li><Link to="/" className="transition-colors hover:text-orange-400">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-200">Service Areas</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-600 tracking-tight text-white text-balance sm:text-5xl">
            Where We Work
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 text-pretty">
            RL Solutions is based in Wilmington, Delaware and proudly serves
            homeowners across all of Delaware — New Castle, Kent, and Sussex
            counties — as well as neighboring communities in Pennsylvania. If
            you&apos;re not sure whether we cover your area, just call — we go
            where the work is.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          {counties.map((county) => {
            const countyAreas = areas.filter((a) => a.county === county);
            const countyLabel = county === 'Pennsylvania' ? 'Pennsylvania' : `${county}, DE`;
            return (
              <div key={county} className="mb-14 last:mb-0">
                <h2 className="mb-6 font-display text-2xl font-600 tracking-tight text-slate-900">
                  {countyLabel}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {countyAreas.map((area, i) => (
                    <RevealSection key={area.slug} delay={i * 60}>
                      <Link
                        to={`/service-areas/${area.slug}`}
                        className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 transition-all duration-500 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-900/5"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900 transition-all duration-500 group-hover:bg-orange-500 group-hover:text-white">
                          <MapPin size={24} strokeWidth={1.6} />
                        </div>
                        <h3 className="mt-5 font-display text-xl font-600 text-slate-900">
                          {area.name}
                        </h3>
                        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
                          {area.desc}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-600 text-orange-600">
                          View services in {area.name}
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </RevealSection>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-600 tracking-tight text-slate-900 text-balance">
                Don&apos;t see your town?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 text-pretty">
                We serve homeowners throughout all of Delaware — from
                Wilmington down to the Sussex County beaches — and into
                neighboring Pennsylvania communities in Chester and Delaware
                Counties. Don&apos;t see your town listed? Give us a call and
                we&apos;ll let you know.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <PhoneNumber
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-600 text-white shadow-sm transition-all duration-300 hover:bg-slate-800 active:scale-95"
                  showIcon
                  iconSize={18}
                  iconClassName="text-orange-400"
                  showCallPrefix
                />
                <Link
                  to="/estimate"
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-600 text-slate-900 ring-1 ring-slate-300 transition-all duration-300 hover:bg-white active:scale-95"
                >
                  Request an Estimate
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

function LocationPage({ areaName, slug, desc }: { areaName: string; slug: string; desc: string }) {
  const locationMeta = {
    title: `${areaName} Contractor | RL Solutions — Decks, Kitchens, Baths`,
    description: `RL Solutions serves ${areaName} with deck building, fencing, kitchen and bath remodels, accessibility ramps, and repairs. Licensed and insured. Get a free estimate.`,
    path: `/service-areas/${slug}`,
    type: 'website' as const,
  };
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: areaName, path: `/service-areas/${slug}` },
  ]);
  const serviceSchemas = services.map((s) =>
    buildServiceSchema({
      name: `${s.title} in ${areaName}`,
      description: s.blurb,
      path: `/service-areas/${slug}`,
    }),
  );
  useSEO(locationMeta, `service-areas-${slug}`, [breadcrumbs, ...serviceSchemas]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-900">
        <div className="container-wide relative z-10 pt-32 pb-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li><Link to="/" className="transition-colors hover:text-orange-400">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/service-areas" className="transition-colors hover:text-orange-400">Service Areas</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-200">{areaName}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-600 tracking-tight text-white text-balance sm:text-5xl">
            Contractor in {areaName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 text-pretty">
            {desc} RL Solutions provides decks, fencing, kitchen and bathroom
            remodels, accessibility modifications, and general repairs to
            homeowners in {areaName} and throughout Delaware and southeastern
            Pennsylvania.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <RevealSection key={service.id} delay={i * 60}>
                <Link
                  to={`/estimate?calc=${serviceCalcMap[service.id] ?? 'repair'}`}
                  className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 transition-all duration-500 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900 transition-all duration-500 group-hover:bg-orange-500 group-hover:text-white">
                    <service.icon size={24} strokeWidth={1.6} />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-600 text-slate-900">
                    {service.title} in {areaName}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
                    {service.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-600 text-orange-600">
                    Get an estimate
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-600 tracking-tight text-slate-900 text-balance">
                Why {areaName} homeowners choose RL Solutions
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  'Licensed and insured contractor serving all of Delaware and southeastern Pennsylvania',
                  'Written quotes after an on-site evaluation — no surprises',
                  'One crew for everything from decks to drywall repairs',
                  'Clean job sites and on-time delivery',
                  'Accessibility expertise for ADA-compliant ramps and modifications',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-orange-500 text-white">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/estimate"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-600 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:bg-orange-600 active:scale-95"
                >
                  Request an Estimate
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
