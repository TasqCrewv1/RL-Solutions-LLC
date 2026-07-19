import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { values } from '../lib/content';
import { useReveal } from '../lib/hooks';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta, BUSINESS_FOUNDED } from '../lib/seo';
import PhoneNumber from '../components/PhoneNumber';

const missionImage =
  'https://images.pexels.com/photos/209266/pexels-photo-209266.jpeg?auto=compress&cs=tinysrgb&w=1000&fm=webp';
const heroImage =
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&fm=webp';

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

export default function About() {
  const meta = getPageMeta('about');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);
  useSEO(meta, 'about', [breadcrumbs]);
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-slate-900 pt-32">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Custom deck construction"
            width="1920"
            height="1080"
            className="h-full w-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>
        <div className="container-wide relative z-10 pb-16">
          <div className="max-w-2xl">
            <p className="animate-fade-up text-sm font-600 uppercase tracking-widest text-orange-400">
              Wilmington, Delaware
            </p>
            <h1
              className="animate-fade-up mt-4 font-display text-4xl font-600 leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '80ms' }}
            >
              We figure out what's wrong, then fix it
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-600 text-slate-200">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                Since {BUSINESS_FOUNDED}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                Licensed &amp; Insured — DE &amp; PA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="container-wide">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <RevealSection className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={missionImage}
                  alt="Homeowners reviewing their renovation plans"
                  width="800"
                  height="600"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </RevealSection>
            <RevealSection delay={120} className="order-1 lg:order-2">
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                What We Do
              </p>
              <h2 className="mt-3 font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl">
                We listen first, then pick up the tools
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 text-pretty">
                Nobody calls a contractor because they want a contractor. They
                call because something in their house isn't working — a deck
                that's rotting, a bathroom that's too tight, a kitchen that
                doesn't fit how they live.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 text-pretty">
                We start by understanding what's actually going on, lay out the
                options honestly, and do the work right. No upselling, no vague
                answers, no callbacks for things we should've handled the first
                time.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Listen to the homeowner before recommending anything',
                  'Quote honestly — written, itemized, no surprises',
                  'Leave the property better than we found it',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-orange-500 text-xs font-700 text-white">
                      ✓
                    </span>
                    <span className="font-500">{item}</span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Why the name */}
      <section className="py-24 sm:py-32">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                The Name
              </p>
              <h2 className="mt-3 font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-5xl">
                Why "Solutions"?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 text-pretty">
                Because that's the whole point. Anyone can swing a hammer. The
                hard part is figuring out what actually needs doing — and being
                straight with you about it.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 text-pretty">
                Most folks call with a problem, not a plan. We help them sort
                through it, give honest options, and build something that lasts.
                That's the name, and that's what we do on every job.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                Core Values
              </p>
              <h2 className="mt-3 font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl">
                What you can count on from us
              </h2>
            </div>
          </RevealSection>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <RevealSection key={value.title} delay={i * 70}>
                <div className="h-full rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-500 hover:shadow-lg hover:shadow-slate-900/5">
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

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl">
                Want to talk through your project?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 text-pretty">
                Use our estimator to get a rough price range, or just call
                302-402-3070. We're happy to talk it through.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/estimate"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-600 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl active:scale-95"
                >
                  Request an Estimate
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <PhoneNumber
                  className="text-base font-600 text-slate-700"
                  showCallPrefix
                />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
