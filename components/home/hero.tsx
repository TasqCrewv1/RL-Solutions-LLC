"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroProps = {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
};

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden text-white">
      <div
        className="absolute inset-0 hero-grid"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11, 18, 32, 0.72), rgba(17, 24, 39, 0.82)),
            url('/images/hero-construction.svg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container-wide relative flex min-h-[88vh] flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-lg uppercase tracking-[0.22em] text-brand-gold/95">
            {siteConfig.tagline}
          </p>
          <p className="mt-8 max-w-3xl text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {headline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/project-estimator"
              className={cn(
                buttonVariants(),
                "h-12 px-6 text-base bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
              )}
            >
              {primaryCta}
            </Link>
            <a
              href={siteConfig.phoneHref}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-white/30 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <Phone className="size-4" />
              {secondaryCta}
            </a>
          </div>
          <p className="mt-6 text-sm text-white/65">
            Serving {siteConfig.address.region}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
