import { useEffect } from 'react';
import {
  SITE_URL,
  SITE_NAME,
  BUSINESS_PHONE_RAW,
  BUSINESS_EMAIL,
  BUSINESS_LAT,
  BUSINESS_LNG,
  BUSINESS_FOUNDED,
  type PageMeta,
  fullUrl,
} from './seo';

interface SEOState {
  title: string;
  description: string;
  path: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  jsonLd?: object[];
}

function setOrCreateMeta(attr: string, key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJSONLD(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJSONLD(id: string) {
  document.getElementById(id)?.remove();
}

export const globalJSONLD: object[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    alternateName: 'RL Solutions LLC',
    description:
      'Delaware & Pennsylvania general contractor specializing in decks, fencing, kitchen and bath remodels, accessibility ramps, and repairs.',
    url: SITE_URL,
    telephone: `+1${BUSINESS_PHONE_RAW}`,
    email: BUSINESS_EMAIL,
    image: `${SITE_URL}/og-image.svg`,
    logo: `${SITE_URL}/og-image.svg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wilmington',
      addressRegion: 'DE',
      postalCode: '19801',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_LAT,
      longitude: BUSINESS_LNG,
    },
    areaServed: [
      { '@type': 'City', name: 'Wilmington, DE' },
      { '@type': 'City', name: 'Newark, DE' },
      { '@type': 'City', name: 'Bear, DE' },
      { '@type': 'City', name: 'Hockessin, DE' },
      { '@type': 'City', name: 'Greenville, DE' },
      { '@type': 'City', name: 'Brandywine, DE' },
      { '@type': 'City', name: 'New Castle, DE' },
      { '@type': 'City', name: 'Middletown, DE' },
    ],
    foundingDate: String(BUSINESS_FOUNDED),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '18:00',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.svg`,
    foundingDate: String(BUSINESS_FOUNDED),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+1${BUSINESS_PHONE_RAW}`,
      contactType: 'customer service',
      email: BUSINESS_EMAIL,
      areaServed: 'DE-PA',
      availableLanguage: 'English',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
  },
];

export function useSEO(
  meta: PageMeta,
  pageKey: string,
  extraJSONLD?: object[],
  localBusinessOverride?: object,
) {
  const canonical = fullUrl(meta.path);

  useEffect(() => {
    const state: SEOState = {
      title: meta.title,
      description: meta.description,
      path: meta.path,
      canonical,
      ogImage: meta.ogImage,
      noindex: meta.noindex,
      type: meta.type ?? 'website',
    };

    document.title = state.title;
    setOrCreateMeta('name', 'description', state.description);
    setOrCreateLink('canonical', state.canonical);

    // Robots
    setOrCreateMeta(
      'name',
      'robots',
      state.noindex ? 'noindex, nofollow' : 'index, follow',
    );

    // Open Graph
    setOrCreateMeta('property', 'og:title', state.title);
    setOrCreateMeta('property', 'og:description', state.description);
    setOrCreateMeta('property', 'og:url', state.canonical);
    setOrCreateMeta('property', 'og:type', state.type ?? 'website');
    setOrCreateMeta('property', 'og:site_name', SITE_NAME);
    setOrCreateMeta('property', 'og:image', state.ogImage ?? `${SITE_URL}/og-image.svg`);
    setOrCreateMeta('property', 'og:latitude', String(BUSINESS_LAT));
    setOrCreateMeta('property', 'og:longitude', String(BUSINESS_LNG));

    // Twitter Cards
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', state.title);
    setOrCreateMeta('name', 'twitter:description', state.description);
    setOrCreateMeta('name', 'twitter:image', state.ogImage ?? `${SITE_URL}/og-image.svg`);

    // Global JSON-LD (set once, kept persistent)
    upsertJSONLD('jsonld-localbusiness', localBusinessOverride ?? globalJSONLD[0]);
    upsertJSONLD('jsonld-organization', globalJSONLD[1]);
    upsertJSONLD('jsonld-website', globalJSONLD[2]);

    // Page-specific JSON-LD
    removeJSONLD('jsonld-page');
    if (extraJSONLD && extraJSONLD.length > 0) {
      upsertJSONLD('jsonld-page', extraJSONLD);
    }
  }, [meta, canonical, extraJSONLD, pageKey, localBusinessOverride]);
}

export function buildBreadcrumbs(
  items: { name: string; path: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: fullUrl(item.path),
    })),
  };
}

export function buildFAQSchema(
  faqs: { question: string; answer: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function buildServiceSchema(service: {
  name: string;
  description: string;
  path: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: fullUrl(service.path),
    provider: { '@id': `${SITE_URL}/#localbusiness` },
    areaServed: [
      { '@type': 'State', name: 'Delaware' },
      { '@type': 'State', name: 'Pennsylvania' },
    ],
  };
}

export function buildReviewSchema(reviews: {
  author: string;
  rating: number;
  text?: string;
  date?: string;
  projectType?: string;
}[]): object[] {
  return reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      name: r.author,
    },
    ...(r.text ? { reviewBody: r.text } : {}),
    ...(r.date ? { datePublished: r.date } : {}),
    itemReviewed: { '@id': `${SITE_URL}/#localbusiness` },
  }));
}

export function buildAggregateRatingSchema(rating: number, count: number): object {
  return {
    '@type': 'AggregateRating',
    ratingValue: rating.toFixed(1),
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
  };
}

export function buildLocalBusinessWithRating(
  rating: number,
  count: number,
  reviews: { author: string; rating: number; text?: string; date?: string }[],
): object {
  const base = { ...globalJSONLD[0] } as Record<string, unknown>;
  base.aggregateRating = buildAggregateRatingSchema(rating, count);
  base.review = reviews.slice(0, 5).map((r) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      name: r.author,
    },
    ...(r.text ? { reviewBody: r.text } : {}),
    ...(r.date ? { datePublished: r.date } : {}),
  }));
  return base;
}
