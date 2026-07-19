import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { ContactCta } from "@/components/home/contact-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { getGalleryItems } from "@/lib/content";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Project Gallery",
  description:
    "Browse RL Solutions project gallery featuring kitchens, bathrooms, decks, additions, garages, and remodeling work across Delaware and Southeastern Pennsylvania.",
  path: "/gallery",
});

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <section className="surface-dark section-padding text-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Gallery"
            title="Craftsmanship you can see in every finished detail"
            description="Explore before-and-after project placeholders ready for your photography. Click any project to open a lightbox view."
            light
          />
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <GalleryGrid items={items} />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
