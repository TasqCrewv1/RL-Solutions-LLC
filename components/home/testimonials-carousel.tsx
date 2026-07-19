"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/lib/content";

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  return (
    <section className="section-padding surface-dark text-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Testimonials"
          title="Homeowners who trusted RL Solutions with their projects"
          description="Editable review content managed through the CMS—so your strongest customer stories stay front and center."
          light
        />

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mt-12 w-full"
          aria-label="Customer testimonials"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={`${testimonial.name}-${testimonial.projectType}`}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <blockquote className="flex h-full flex-col rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
                  <div
                    className="flex gap-1 text-brand-gold"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/85">
                    “{testimonial.quote}”
                  </p>
                  <footer className="mt-6 border-t border-white/10 pt-4">
                    <cite className="not-italic">
                      <span className="block font-semibold text-white">
                        {testimonial.name}
                      </span>
                      <span className="mt-1 block text-sm text-white/65">
                        {testimonial.location} · {testimonial.projectType}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex gap-2">
            <CarouselPrevious className="static translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
            <CarouselNext className="static translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
