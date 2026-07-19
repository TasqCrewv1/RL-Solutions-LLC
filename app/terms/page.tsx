import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Review the terms of service for using the RL Solutions website and requesting project information online.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Legal"
            title="Terms of Service"
            description={`Last updated: July 19, 2026. By using the ${siteConfig.name} website, you agree to these terms.`}
          />
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                Website Use
              </h2>
              <p className="mt-3">
                Content on this website is provided for general informational
                purposes about {siteConfig.name} services in Delaware and
                Southeastern Pennsylvania. Submitting a form or using the
                project estimator does not create a binding construction
                contract.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                Estimates and Project Scope
              </h2>
              <p className="mt-3">
                Any estimate discussion based on website inquiries is preliminary
                until a written agreement defines scope, pricing, schedule, and
                responsibilities. Final project terms are established only in a
                signed contract.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                Accuracy of Information
              </h2>
              <p className="mt-3">
                We strive to keep website information current and accurate, but
                service details, availability, and processes may change. Contact
                us directly for the most up-to-date guidance on your project.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                Contact
              </h2>
              <p className="mt-3">
                Questions about these terms can be directed to{" "}
                <a
                  className="text-primary underline-offset-2 hover:underline"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
