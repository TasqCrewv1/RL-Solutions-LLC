import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact RL Solutions",
  description:
    "Contact RL Solutions for a free project estimate. Call, email, or send project details for general contracting services in Delaware and Southeastern Pennsylvania.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="surface-dark section-padding text-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Contact"
            title="Request your free project estimate"
            description="Share a few details about your project and preferred contact method. We’ll follow up with next steps for a personalized consultation."
            light
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl bg-brand-mist p-6 ring-1 ring-primary/10">
              <h2 className="text-xl font-semibold text-brand-dark">
                Talk with RL Solutions
              </h2>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 text-primary" />
                  <a
                    href={siteConfig.phoneHref}
                    className="font-medium text-brand-dark hover:text-primary focus-ring rounded"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 text-primary" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-brand-dark hover:text-primary focus-ring rounded"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-primary" />
                  <span>{siteConfig.address.region}</span>
                </li>
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Hours: {siteConfig.hours}
              </p>
            </div>

            <div
              className="flex min-h-[240px] items-center justify-center rounded-2xl bg-brand-dark p-6 text-center text-white"
              role="img"
              aria-label="Google Map placeholder"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                  Map Placeholder
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Delaware & Southeastern PA
                </p>
              </div>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
