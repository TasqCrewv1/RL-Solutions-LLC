export const SITE_URL = 'https://www.rlsolutions.com';
export const SITE_NAME = 'RL Solutions';
export const SITE_TAGLINE = 'A Problem Solving Company';
export const BUSINESS_PHONE = '302-402-3070';
export const BUSINESS_PHONE_RAW = '3024023070';
export const BUSINESS_EMAIL = 'hello@rlsolutions.com';
export const BUSINESS_CITY = 'Wilmington';
export const BUSINESS_STATE = 'Delaware';
export const BUSINESS_STATE_CODE = 'DE';
export const BUSINESS_ADDRESS_REGION = 'DE-PA';
export const BUSINESS_LAT = 39.7390721;
export const BUSINESS_LNG = -75.5397878;
export const BUSINESS_FOUNDED = 2016;

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'RL Solutions | Wilmington DE General Contractor — Decks, Kitchens, Baths',
    description:
      'Delaware & Pennsylvania general contractor specializing in decks, fencing, kitchen and bath remodels, accessibility ramps, and repairs. Licensed, insured, honest pricing. Get a free estimate today.',
    path: '/',
    type: 'website',
  },
  about: {
    title: 'About RL Solutions | Wilmington DE Contractor Since 2016',
    description:
      'A Wilmington-based contractor built on problem-solving, honest pricing, and work that holds up. Licensed and insured in Delaware and Pennsylvania since 2016.',
    path: '/about',
  },
  gallery: {
    title: 'Project Portfolio | RL Solutions — Wilmington DE Contractor',
    description:
      'Browse our gallery of decks, kitchens, bathrooms, fences, accessibility ramps, and repair projects across Wilmington, Newark, Bear, Hockessin, and surrounding Delaware communities.',
    path: '/gallery',
  },
  estimate: {
    title: 'Get a Free Project Estimate | RL Solutions — Wilmington DE',
    description:
      'Use our instant project estimator to get a rough price range for your deck, fence, kitchen, bath, or accessibility project in minutes. Then get a firm quote after a free site visit.',
    path: '/estimate',
  },
  testimonials: {
    title: 'Customer Reviews | RL Solutions — Wilmington DE Contractor',
    description:
      'Read what Delaware and Pennsylvania homeowners say about working with RL Solutions. Real reviews from real projects — decks, remodels, accessibility, and repairs.',
    path: '/testimonials',
  },
  faq: {
    title: 'Frequently Asked Questions | RL Solutions — Wilmington DE',
    description:
      'Answers to common questions about hiring RL Solutions: licensing, insurance, timelines, payment, warranties, service areas, and what to expect during your project.',
    path: '/faq',
  },
  'service-areas': {
    title: 'Service Areas | RL Solutions — Delaware & Pennsylvania',
    description:
      'RL Solutions serves homeowners across all of Delaware — New Castle, Kent, and Sussex counties, from Wilmington to the beaches — and neighboring Pennsylvania communities in Chester and Delaware Counties.',
    path: '/service-areas',
  },
  privacy: {
    title: 'Privacy Policy | RL Solutions',
    description: 'How RL Solutions collects, uses, and protects your personal information.',
    path: '/privacy',
    noindex: true,
  },
  terms: {
    title: 'Terms & Conditions | RL Solutions',
    description: 'Terms and conditions for using the RL Solutions website and services.',
    path: '/terms',
    noindex: true,
  },
  'cookie-policy': {
    title: 'Cookie Policy | RL Solutions',
    description: 'How RL Solutions uses cookies and similar technologies on this website.',
    path: '/cookie-policy',
    noindex: true,
  },
  'cookie-settings': {
    title: 'Cookie Settings | RL Solutions',
    description: 'Manage your cookie preferences for the RL Solutions website.',
    path: '/cookie-settings',
    noindex: true,
  },
  sitemap: {
    title: 'Sitemap | RL Solutions',
    description: 'A complete map of all pages on the RL Solutions website.',
    path: '/sitemap',
    noindex: true,
  },
  admin: {
    title: 'Admin Dashboard | RL Solutions',
    description: 'Lead management dashboard for RL Solutions staff.',
    path: '/admin',
    noindex: true,
  },
};

export function getPageMeta(key: string): PageMeta {
  return (
    pageMeta[key] ?? {
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: 'Professional construction. Practical solutions for your property.',
      path: '/',
    }
  );
}

export function fullUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
