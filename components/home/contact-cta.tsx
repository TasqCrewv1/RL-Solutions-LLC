import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactCta() {
  return (
    <section className="section-padding surface-mist">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2">
        <FadeIn>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Ready to start
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
              Let’s solve your next home improvement challenge
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Call now for a direct conversation or request an estimate online.
              RL Solutions is ready to help homeowners across{" "}
              {siteConfig.address.region}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.phoneHref}
                className={cn(buttonVariants(), "h-12 px-6 text-base")}
              >
                <Phone className="size-4" />
                Call Now
              </a>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 px-6 text-base"
                )}
              >
                Request Estimate
              </Link>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              Service Area: {siteConfig.address.region}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="flex min-h-[320px] items-center justify-center rounded-2xl bg-brand-dark p-8 text-center text-white ring-1 ring-foreground/10"
            role="img"
            aria-label="Google Map placeholder for RL Solutions service area"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Google Map Placeholder
              </p>
              <p className="mt-3 text-2xl font-semibold">
                Delaware & Southeastern Pennsylvania
              </p>
              <p className="mt-3 text-sm text-white/70">
                Embed your Google Business Profile map here when ready.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
