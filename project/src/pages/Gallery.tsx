import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { galleryItems, galleryFilters } from '../lib/content';
import { useReveal } from '../lib/hooks';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';

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

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('category') ?? 'all';
  const [filter, setFilter] = useState<string>(
    galleryFilters.some((f) => f.id === initialFilter) ? initialFilter : 'all',
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSearchParams(newFilter === 'all' ? {} : { category: newFilter });
  };
  const meta = getPageMeta('gallery');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/gallery' },
  ]);
  useSEO(meta, 'gallery', [breadcrumbs]);

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[50svh] items-end overflow-hidden bg-slate-900 pt-32">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Project gallery"
            className="h-full w-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>
        <div className="container-wide relative z-10 pb-16">
          <div className="max-w-2xl">
            <p className="animate-fade-up text-sm font-600 uppercase tracking-widest text-orange-400">
              Portfolio
            </p>
            <h1
              className="animate-fade-up mt-4 font-display text-4xl font-600 leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '80ms' }}
            >
              Work we’re proud to put our name on
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-slate-200 text-pretty"
              style={{ animationDelay: '160ms' }}
            >
              A selection of recent projects across decks, kitchens, baths,
              fencing, accessibility, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-20 sm:py-28">
        <div className="container-wide">
          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {galleryFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFilterChange(f.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-500 transition-all duration-300 ${
                  filter === f.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <RevealSection
                key={item.id}
                delay={(i % 3) * 80}
                className={item.span ? 'sm:col-span-2' : ''}
              >
                <div className="group relative overflow-hidden rounded-3xl">
                  <div
                    className={`overflow-hidden ${
                      item.span ? 'aspect-[16/10]' : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      width="800"
                      height="600"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-600 uppercase tracking-widest text-orange-400">
                      {item.location}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-600 text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-slate-500">
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-600 tracking-tight text-slate-900 text-balance sm:text-4xl">
                Your project could be next
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 text-pretty">
                Let’s add your home to the gallery. Start with a free, no-pressure
                estimate.
              </p>
              <div className="mt-8">
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
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
