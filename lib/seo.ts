import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const defaultOgImage = "/images/og-default.svg";

export function createMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/og-default.svg`,
    priceRange: "$$",
    areaServed: siteConfig.serviceArea.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    openingHours: "Mo-Sa 07:00-18:00",
    slogan: siteConfig.tagline,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.google,
    ],
  };
}

export function serviceSchema(service: {
  title: string;
  summary: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@type": "GeneralContractor",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.serviceArea,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function reviewSchema(
  testimonials: {
    name: string;
    quote: string;
    rating: number;
    projectType: string;
  }[]
) {
  return testimonials.map((testimonial) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: testimonial.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    itemReviewed: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
    name: `${testimonial.projectType} review`,
  }));
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
