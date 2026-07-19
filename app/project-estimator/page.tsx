import Link from "next/link";
import {
  ClipboardList,
  Home,
  MessagesSquare,
  Ruler,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";
import { JsonLd } from "@/components/seo/json-ld";
import { services } from "@/lib/services";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Project Estimator",
  description:
    "Start your personalized RL Solutions project consultation. Choose your project type and prepare for a customized estimate across Delaware and Southeastern Pennsylvania.",
  path: "/project-estimator",
});

const benefits = [
  {
    icon: ClipboardList,
    title: "Guided questions",
    description:
      "A structured intake that helps us understand scope, priorities, and timeline before we talk numbers.",
  },
  {
    icon: Ruler,
    title: "Customized estimate conversation",
    description:
      "Your responses shape a clearer consultation so recommendations fit your home and goals.",
  },
  {
    icon: MessagesSquare,
    title: "Faster clarity",
    description:
      "Less back-and-forth later because the important project details are captured up front.",
  },
  {
    icon: Home,
    title: "Local expertise",
    description:
      "Planning informed by residential work throughout Delaware and Southeastern Pennsylvania.",
  },
];

export default function ProjectEstimatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Project Estimator", path: "/project-estimator" },
        ])}
      />

      <section className="surface-dark section-padding text-white">
        <div className="container-wide max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Project Estimator
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Start Your Personalized Project Consultation
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">
            Answer guided questions about your project type, goals, and property
            needs. RL Solutions uses your responses to prepare a customized
            estimate conversation—so you move forward with clarity, not guesswork.
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "mt-8 h-12 bg-brand-gold px-6 text-brand-dark hover:bg-brand-gold/90"
            )}
          >
            Start My Estimate
          </Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How it works"
            title="Architecture ready for the full estimator experience"
            description="This page establishes the estimator journey. Interactive question logic, pricing ranges, and submission workflows will plug into the placeholders below."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Future component: Project intake wizard",
              "Future component: Conditional question engine",
              "Future component: Estimate summary & lead capture",
            ].map((label) => (
              <div
                key={label}
                className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-primary/30 bg-brand-mist/50 p-6 text-center text-sm font-medium text-primary"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-mist">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Project Type"
            title="Select the category that best matches your goals"
            description="Each card links to a dedicated service page while the full estimator logic is under development."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Benefits"
            title="Why homeowners start with the estimator"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-xl bg-brand-mist/60 p-6 ring-1 ring-primary/10"
              >
                <benefit.icon
                  className="size-7 text-primary"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold text-brand-dark">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/contact"
              className={cn(buttonVariants(), "h-12 px-6 text-base")}
            >
              Continue to Estimate Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
