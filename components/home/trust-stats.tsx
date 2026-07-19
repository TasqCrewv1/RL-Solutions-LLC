"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { CountUp } from "@/components/motion/count-up";
import type { HomepageContent } from "@/lib/content";

type TrustStatsProps = {
  stats: HomepageContent["trustStats"];
};

export function TrustStats({ stats }: TrustStatsProps) {
  return (
    <section className="border-y border-border bg-white">
      <div className="container-wide grid gap-6 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, index) => (
          <FadeIn key={stat.id} delay={index * 0.08}>
            <div className="rounded-xl bg-brand-mist/70 p-6 ring-1 ring-primary/10">
              <p className="text-3xl font-semibold tracking-tight text-primary">
                {stat.id === "estimates" ? (
                  "Free"
                ) : stat.id === "craftsmanship" ? (
                  "Premium"
                ) : (
                  <CountUp
                    value={Number(stat.value)}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </p>
              <h2 className="mt-3 text-base font-semibold text-brand-dark">
                {stat.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
