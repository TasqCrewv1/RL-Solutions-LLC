import { ServiceCard } from "@/components/services/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactCta } from "@/components/home/contact-cta";
import { services } from "@/lib/services";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "General Contracting Services",
  description:
    "Explore RL Solutions services including kitchen remodeling, bathroom remodeling, home additions, roofing, decks, garages, concrete, and complete renovations in Delaware and Southeastern Pennsylvania.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <section className="surface-dark section-padding text-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Services"
            title="Professional contracting services built around real homeowner needs"
            description="Every service page is designed to help you understand the scope, process, and value of working with RL Solutions—then take the next step toward a clear project estimate."
            light
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service.slug} delay={(index % 3) * 0.05}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
