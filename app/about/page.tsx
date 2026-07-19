import Image from "next/image";
import Link from "next/link";
import { Award, BadgeCheck, Shield, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { ContactCta } from "@/components/home/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "About RL Solutions",
  description:
    "Learn about RL Solutions, a problem-solving general contractor serving Delaware and Southeastern Pennsylvania with professional craftsmanship and honest communication.",
  path: "/about",
});

const values = [
  {
    title: "Professionalism",
    description:
      "Clear scopes, respectful job sites, and workmanship that reflects pride in every detail.",
  },
  {
    title: "Reliability",
    description:
      "Dependable scheduling and accountable follow-through from the first conversation to final walkthrough.",
  },
  {
    title: "Honesty",
    description:
      "Straightforward recommendations—even when the best answer is simpler than expected.",
  },
  {
    title: "Craftsmanship",
    description:
      "Quality materials and careful installation that protect both beauty and long-term performance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="surface-dark section-padding text-white">
        <div className="container-wide max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            About {siteConfig.name}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            A problem solving company built on trust and craftsmanship
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">
            RL Solutions helps homeowners across Delaware and Southeastern
            Pennsylvania renovate, expand, and improve with confidence. We
            combine practical planning with premium workmanship so every project
            solves a real need.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Company Story"
              title="Built for homeowners who want clarity, quality, and results"
              description="RL Solutions was founded on a simple belief: home improvement should feel organized, honest, and well-built. Too many projects suffer from vague scopes, poor communication, or rushed finishing. We exist to do the opposite."
            />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Whether the job is a kitchen remodel, a roof replacement, a deck,
              or a full addition, our approach stays the same—understand the
              problem, define a clear plan, and deliver craftsmanship worth
              recommending.
            </p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
            <Image
              src="/images/hero-construction.svg"
              alt="RL Solutions craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section-padding surface-mist">
        <div className="container-wide grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-8 ring-1 ring-foreground/10">
            <Target className="size-8 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-brand-dark">
              Mission
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To deliver dependable general contracting solutions that improve
              how families live—through honest guidance, disciplined execution,
              and lasting craftsmanship.
            </p>
          </article>
          <article className="rounded-2xl bg-white p-8 ring-1 ring-foreground/10">
            <Award className="size-8 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-brand-dark">
              Values
            </h2>
            <ul className="mt-4 space-y-3">
              {values.map((value) => (
                <li key={value.title}>
                  <p className="font-medium text-brand-dark">{value.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-brand-mist">
            <Image
              src="/images/og-default.svg"
              alt="Jeremiah, founder of RL Solutions"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Meet Jeremiah"
              title="Leadership rooted in accountability and problem solving"
              description={`${siteConfig.owner.name}, ${siteConfig.owner.title}, leads RL Solutions with a hands-on commitment to quality and communication. Homeowners know who is responsible for the outcome—and can trust that details will not be overlooked.`}
            />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              From the first walkthrough to the final punch list, Jeremiah’s
              approach emphasizes listening carefully, planning thoroughly, and
              building with pride. That mindset shapes every crew interaction,
              material recommendation, and project decision.
            </p>
            <Link
              href="/project-estimator"
              className={cn(buttonVariants(), "mt-8 h-11 px-5")}
            >
              Start a Project Conversation
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding surface-mist">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Credentials"
            title="Licenses, insurance, and certifications"
            description="Professional protection and accountability are foundational to how RL Solutions operates."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: "Licenses",
                body: "Operating as a professional contracting business prepared to meet local project and permitting requirements across our service area.",
              },
              {
                icon: Shield,
                title: "Insurance",
                body: "Coverage that protects homeowners and the work being performed—because peace of mind matters as much as craftsmanship.",
              },
              {
                icon: Award,
                title: "Certifications",
                body: "Ongoing commitment to quality standards, best practices, and the professional development needed for complex residential work.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-xl bg-white p-6 ring-1 ring-foreground/10"
              >
                <item.icon className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-brand-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <SectionHeading
            align="center"
            eyebrow="Why Customers Choose RL Solutions"
            title="Professionalism you can feel from the first call"
            description="Homeowners choose RL Solutions for clear communication, clean job sites, dependable scheduling, and finished work that looks and performs the way it should."
          />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
