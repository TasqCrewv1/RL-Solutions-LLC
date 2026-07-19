import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getRelatedServices,
  getServiceBySlug,
  services,
} from "@/lib/services";
import {
  breadcrumbSchema,
  createMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createMetadata({
    title: `${service.title} in Delaware & SE Pennsylvania`,
    description: `${service.summary} Serving homeowners throughout Delaware and Southeastern Pennsylvania.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.related);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          serviceSchema(service),
          faqSchema(service.faqs),
        ]}
      />

      <section className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-dark/80" />
        </div>
        <div className="container-wide relative section-padding">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            {siteConfig.name} Service
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {service.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/project-estimator"
              className={cn(
                buttonVariants(),
                "h-12 bg-brand-gold px-6 text-brand-dark hover:bg-brand-gold/90"
              )}
            >
              Get My Project Estimate
            </Link>
            <a
              href={siteConfig.phoneHref}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-white/30 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading
              eyebrow="Overview"
              title={`Dependable ${service.title.toLowerCase()} for Delaware & SEPA homeowners`}
              description={service.overview}
            />
          </div>
          <aside className="rounded-2xl bg-brand-mist p-6 ring-1 ring-primary/10">
            <h2 className="text-lg font-semibold text-brand-dark">
              Ready for clarity on scope and cost?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with a free estimate consultation. We’ll review your goals
              and outline a practical path forward.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants(), "mt-5 h-11 w-full")}
            >
              Request Estimate
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-padding surface-mist">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Benefits"
            title="What you can expect from this service"
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-xl bg-white p-5 text-sm leading-relaxed text-brand-dark ring-1 ring-foreground/10"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Process"
            title="A clear path from first conversation to finished work"
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {service.process.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-border bg-brand-mist/40 p-6"
              >
                <span className="text-sm font-semibold text-primary">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-brand-dark">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding surface-mist">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="FAQ"
            title={`Common questions about ${service.title.toLowerCase()}`}
          />
          <Accordion className="mt-8 rounded-xl bg-white px-4 ring-1 ring-foreground/10">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Gallery"
            title="Project visuals for this service category"
            description="Placeholder imagery is ready for your real before-and-after photography."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[0, 1].map((slot) => (
              <div
                key={slot}
                className="relative aspect-[16/10] overflow-hidden rounded-xl bg-brand-mist"
              >
                <Image
                  src={service.image}
                  alt={`${service.title} project placeholder ${slot + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-dark text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Get a personalized estimate for your {service.shortTitle.toLowerCase()} project
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Tell us what you need solved. We’ll respond with a clear next step
            and a consultation focused on your home, budget, and timeline.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/project-estimator"
              className={cn(
                buttonVariants(),
                "h-12 bg-brand-gold px-6 text-brand-dark hover:bg-brand-gold/90"
              )}
            >
              Start My Estimate
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-white/30 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Contact RL Solutions
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Related Services"
            title="Related solutions homeowners often explore together"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
