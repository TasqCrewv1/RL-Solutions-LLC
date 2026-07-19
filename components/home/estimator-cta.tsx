import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EstimatorCtaProps = {
  headline: string;
  body: string;
};

export function EstimatorCta({ headline, body }: EstimatorCtaProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-white sm:px-10 md:px-14">
            <div
              className="absolute -right-16 -top-16 size-56 rounded-full bg-brand-gold/20"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 left-10 size-64 rounded-full bg-white/5"
              aria-hidden="true"
            />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Project Estimator
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                {body}
              </p>
              <Link
                href="/project-estimator"
                className={cn(
                  buttonVariants(),
                  "mt-8 h-12 bg-brand-gold px-6 text-base text-brand-dark hover:bg-brand-gold/90"
                )}
              >
                Start My Estimate
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
