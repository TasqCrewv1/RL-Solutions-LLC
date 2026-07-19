import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read the RL Solutions privacy policy covering how we collect, use, and protect information submitted through our website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <section className="section-padding bg-white">
        <div className="container-narrow prose-none">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            description={`Last updated: July 19, 2026. This policy explains how ${siteConfig.legalName} handles information collected through our website.`}
          />
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                Information We Collect
              </h2>
              <p className="mt-3">
                When you request an estimate or contact us, we may collect your
                name, phone number, email address, project address, project type,
                preferred contact method, and message details.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                How We Use Information
              </h2>
              <p className="mt-3">
                We use submitted information to respond to inquiries, prepare
                estimate consultations, improve our services, and communicate
                about your project. We do not sell personal information.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                Data Protection
              </h2>
              <p className="mt-3">
                We take reasonable measures to protect information submitted
                through our site. No method of transmission over the internet is
                completely secure, and we encourage thoughtful sharing of only
                the details needed for your inquiry.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-brand-dark">
                Contact
              </h2>
              <p className="mt-3">
                For privacy questions, contact {siteConfig.name} at{" "}
                <a
                  className="text-primary underline-offset-2 hover:underline"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>{" "}
                or {siteConfig.phone}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
