"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryItem } from "@/lib/content";

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(item)}
            className="mb-5 block w-full break-inside-avoid overflow-hidden rounded-xl text-left ring-1 ring-foreground/10 transition hover:-translate-y-0.5 hover:ring-primary/40 focus-ring"
            aria-label={`Open lightbox for ${item.title}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.afterImage}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {item.category}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-brand-dark">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.location}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Dialog
        open={!!active}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent className="max-w-4xl">
          {active ? (
            <>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>
                  {active.location} · {active.category}. {active.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={active.beforeImage}
                    alt={`Before: ${active.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <span className="absolute left-3 top-3 rounded bg-brand-dark/80 px-2 py-1 text-xs font-medium text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={active.afterImage}
                    alt={`After: ${active.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <span className="absolute left-3 top-3 rounded bg-primary/90 px-2 py-1 text-xs font-medium text-white">
                    After
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
