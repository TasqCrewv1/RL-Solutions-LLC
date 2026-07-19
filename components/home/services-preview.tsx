import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { ServiceCard } from "@/components/services/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServicesPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Premium contracting solutions for every priority"
            description="From targeted upgrades to full renovations, each service is backed by the same standard of craftsmanship, communication, and accountability."
          />
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
          >
            View all services
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <FadeIn key={service.slug} delay={index * 0.05}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
