import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { services, values, galleryItems } from '../lib/content';
import { useReveal } from '../lib/hooks';
import { useSEO, buildServiceSchema, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta, BUSINESS_PHONE, BUSINESS_PHONE_RAW, BUSINESS_EMAIL, BUSINESS_FOUNDED } from '../lib/seo';
import PhoneNumber from '../components/PhoneNumber';


const heroImage =
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&fm=webp';

const serviceCalcMap: Record<string, string> = {
  decks: 'deck',
  fencing: 'fence',
  bathrooms: 'bathroom',
  kitchens: 'kitchen',
  accessibility: 'ramp',
  repairs: 'repair',
};

function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const meta = getPageMeta('home');
  const serviceSchema = useMemo(() => services.map((s) =>
    buildServiceSchema({
      name: s.title,
      description: s.blurb,
      path: `/estimate?calc=${serviceCalcMap[s.id] ?? 'repair'}`,
    }),
  ), [services]);
  useSEO(meta, 'home', [...serviceSchema, buildBreadcrumbs([{ name: 'Home', path: '/' }])]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Custom deck construction on a modern home"
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1280"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        </div>

        <div className="container-wide relative z-10 pt-28">
          <div className="max-w-2xl">
            <h1
              className="animate-fade-up mt-6 font-display text-4xl font-600 leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '80ms' }}
            >
              Delaware / Pennsylvania
              <br />
              <span className="text-orange-400">General Contractor</span>
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-slate-200 text-pretty"
              style={{ animationDelay: '160ms' }}
            >
              We do decks, kitchens, bathrooms, fencing, accessibility ramps,
              and the repairs you&apos;ve been putting off. One crew, clear
              quotes, and work that holds up.
            </p>
            <div
              className="animate-fade-up mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ animationDelay: '240ms' }}
            >
              <Link
                to="/estimate"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-orange-500 px-6 py-4 text-base font-600 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl active:scale-95"
              >
                Request an Estimate
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/gallery"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-600 text-white ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                View Our Work
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div
              className="animate-fade-up mt-12 flex flex-wrap items-center gap-x-4 gap-y-3"
              style={{ animationDelay: '320ms' }}
            >
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <MapPin size={18} className="text-orange-400" />
                <span>Wilmington, Delaware</span>
              </div>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <PhoneNumber
                className="text-sm text-slate-200"
                showIcon
                iconSize={18}
                iconClassName="text-orange-400"
              />
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <Link
                to="/testimonials"
                className="text-sm text-slate-200 transition-opacity hover:opacity-80"
              >
                Customer reviews
              </Link>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span className="flex items-center gap-1.5 text-sm text-slate-200">
                <ShieldCheck size={16} className="text-orange-400" />
                In Business since {BUSINESS_FOUNDED} · Licensed &amp; Insured
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-white"
              >
                <Mail size={18} className="text-orange-400" />
                <span>{BUSINESS_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 sm:py-32" aria-labelledby="services-heading">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                What We Do
              </p>
              <h2
                id="services-heading"
                className="mt-3 font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-5xl"
              >
                One crew for the work your house needs
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 text-pretty">
                You shouldn&apos;t have to chase down three different contractors
                to get things done. We handle the big remodels and the small
                fixes — so you make one call and move on.
              </p>
            </div>
          </RevealSection>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <RevealSection key={service.id} delay={i * 80}>
                <Link
                  to={`/estimate?calc=${serviceCalcMap[service.id] ?? 'repair'}`}
                  className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-500 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-all duration-500 group-hover:bg-orange-500 group-hover:text-white">
                    <service.icon size={26} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-600 text-slate-900">
                    {service.title}
                  </h3>
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

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-24 sm:py-32" aria-labelledby="why-heading">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                Why RL Solutions
              </p>
              <h2
                id="why-heading"
                className="mt-3 font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-5xl"
              >
                What you get working with us
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 text-pretty">
                No fancy promises. Just clear quotes, clean job sites, and work
                we&apos;re willing to put our name on.
              </p>
            </div>
          </RevealSection>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-slate-200/60 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <RevealSection key={value.title} delay={i * 60}>
                <div className="h-full bg-white p-8 transition-colors duration-300 hover:bg-slate-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <value.icon size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 text-lg font-600 text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                    {value.blurb}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 sm:py-32" aria-labelledby="recent-heading">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                Recent Work
              </p>
              <h2
                id="recent-heading"
                className="mt-3 font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl"
              >
                Projects we&apos;re proud of
              </h2>
            </div>
          </RevealSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.slice(0, 6).map((item, i) => (
              <RevealSection key={item.id} delay={i * 80}>
                <Link to="/gallery" className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      width="800"
                      height="600"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-600 text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500">{item.location}</p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-600"
                    />
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-slate-900 py-24 sm:py-32" aria-labelledby="testimonial-heading">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-3xl text-center">
              <Quote size={40} className="mx-auto fill-orange-500/20 text-orange-500" />
              <p className="mt-6 font-display text-2xl font-500 leading-relaxed text-white text-balance sm:text-3xl">
                &quot;We had a list of problems no other contractor wanted to
                touch. RL Solutions came out, walked us through what made sense,
                and got it done. No drama, no surprises on the invoice.&quot;
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-600 text-white">
                  M
                </div>
                <div className="text-left">
                  <p className="font-600 text-white">Margaret &amp; David</p>
                  <p className="text-sm text-slate-400">Greenville, DE</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/testimonials"
                  className="inline-flex items-center gap-2 text-sm font-600 text-orange-400 transition-colors hover:text-orange-300"
                >
                  Read more reviews
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="container-wide">
          <RevealSection>
            <div className="relative overflow-hidden rounded-[2rem] bg-orange-500 px-8 py-16 text-center sm:px-16 sm:py-20">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white" />
                <div className="absolute -bottom-16 -right-8 h-72 w-72 rounded-full bg-white" />
              </div>
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="font-display text-3xl font-600 tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                  Let&apos;s talk about your project
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-orange-50 text-pretty">
                  Use our estimator to get a rough price range in a few minutes.
                  We&apos;ll come out, take a look, and give you a real quote — no
                  pressure.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    to="/estimate"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-600 text-slate-900 shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
                  >
                    Request an Estimate
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/about"
                    className="text-base font-600 text-white underline-offset-4 transition-colors hover:underline"
                  >
                    Learn about us
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
