import { ContactCta } from "@/components/home/contact-cta";
import { EstimatorCta } from "@/components/home/estimator-cta";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { TrustStats } from "@/components/home/trust-stats";
import { WhyChoose } from "@/components/home/why-choose";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getFaqs,
  getFeaturedGalleryItems,
  getFeaturedTestimonials,
  getHomepageContent,
} from "@/lib/content";
import {
  breadcrumbSchema,
  createMetadata,
  faqSchema,
  reviewSchema,
} from "@/lib/seo";

export const metadata = createMetadata({
  title:
    "RL Solutions | General Contractor in Delaware & Southeastern Pennsylvania",
  description:
    "RL Solutions is a trusted general contractor providing kitchen remodels, bathroom remodels, home additions, roofing, decks, garages, concrete, and complete renovation services throughout Delaware and Southeastern Pennsylvania.",
  path: "/",
});

export default function HomePage() {
  const homepage = getHomepageContent();
  const testimonials = getFeaturedTestimonials();
  const projects = getFeaturedGalleryItems();
  const faqs = getFaqs();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(faqs),
          ...reviewSchema(testimonials),
        ]}
      />
      <Hero
        headline={homepage.hero.headline}
        subheadline={homepage.hero.subheadline}
        primaryCta={homepage.hero.primaryCta}
        secondaryCta={homepage.hero.secondaryCta}
      />
      <TrustStats stats={homepage.trustStats} />
      <ServicesPreview />
      <WhyChoose items={homepage.whyChoose} />
      <FeaturedProjects items={projects} />
      <TestimonialsCarousel testimonials={testimonials} />
      <EstimatorCta
        headline={homepage.estimator.headline}
        body={homepage.estimator.body}
      />
      <ContactCta />
    </>
  );
}
