import {
  CheckCircle2,
  ClipboardClock,
  Handshake,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Wrench,
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomepageContent } from "@/lib/content";

const icons = [
  Wrench,
  Handshake,
  ShieldCheck,
  ClipboardClock,
  Sparkles,
  SprayCan,
  CheckCircle2,
];

type WhyChooseProps = {
  items: HomepageContent["whyChoose"];
};

export function WhyChoose({ items }: WhyChooseProps) {
  return (
    <section className="section-padding surface-mist">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Why Choose RL Solutions"
          title="A problem-solving partner for every phase of the project"
          description="Homeowners choose RL Solutions because we combine professional craftsmanship with honest communication and a customer-first approach."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <FadeIn key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-xl bg-white p-6 ring-1 ring-foreground/10 transition hover:ring-primary/30">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
