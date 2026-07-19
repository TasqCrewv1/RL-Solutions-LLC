import fs from "fs";
import path from "path";
import homepage from "@/content/settings/homepage.json";
import faqsFile from "@/content/faqs/general.json";

const contentDirectory = path.join(process.cwd(), "content");

export type Testimonial = {
  name: string;
  location: string;
  projectType: string;
  rating: number;
  quote: string;
  featured?: boolean;
};

export type GalleryItem = {
  title: string;
  category: string;
  location: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  featured?: boolean;
};

export type HomepageContent = typeof homepage;

function readJsonDirectory<T>(relativeDir: string): T[] {
  const dir = path.join(contentDirectory, relativeDir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      return JSON.parse(raw) as T;
    });
}

export function getHomepageContent(): HomepageContent {
  return homepage;
}

export function getTestimonials(): Testimonial[] {
  return readJsonDirectory<Testimonial>("testimonials").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getFeaturedTestimonials(): Testimonial[] {
  return getTestimonials().filter((item) => item.featured !== false);
}

export function getGalleryItems(): GalleryItem[] {
  return readJsonDirectory<GalleryItem>("gallery");
}

export function getFeaturedGalleryItems(): GalleryItem[] {
  return getGalleryItems().filter((item) => item.featured);
}

export function getFaqs() {
  return faqsFile.faqs;
}
