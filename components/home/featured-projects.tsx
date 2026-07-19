import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type FeaturedProjectsProps = {
  items: GalleryItem[];
};

export function FeaturedProjects({ items }: FeaturedProjectsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Recent work across Delaware and Southeastern Pennsylvania"
            description="A look at the craftsmanship, problem-solving, and finish quality homeowners can expect from RL Solutions."
          />
          <Link
            href="/gallery"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
          >
            View full gallery
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {items.slice(0, 4).map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <article className="overflow-hidden rounded-xl bg-brand-mist/40 ring-1 ring-foreground/10">
                <div className="grid sm:grid-cols-2">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.beforeImage}
                      alt={`Before: ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <span className="absolute left-3 top-3 rounded bg-brand-dark/80 px-2 py-1 text-xs font-medium text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.afterImage}
                      alt={`After: ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <span className="absolute left-3 top-3 rounded bg-primary/90 px-2 py-1 text-xs font-medium text-white">
                      After
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-brand-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.location} — {item.description}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Filtering by project type coming soon.
        </p>
      </div>
    </section>
  );
}
