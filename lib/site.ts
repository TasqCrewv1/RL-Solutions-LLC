export const siteConfig = {
  name: "RL Solutions",
  legalName: "RL Solutions LLC",
  tagline: "A Problem Solving Company",
  description:
    "RL Solutions is a trusted general contractor providing kitchen remodels, bathroom remodels, home additions, roofing, decks, garages, concrete, and complete renovation services throughout Delaware and Southeastern Pennsylvania.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rlsolutionsllc.com",
  phone: "(302) 555-0198",
  phoneHref: "tel:+13025550198",
  email: "info@rlsolutionsllc.com",
  address: {
    street: "Serving Delaware & Southeastern Pennsylvania",
    city: "Wilmington",
    state: "DE",
    zip: "19801",
    region: "Delaware and Southeastern Pennsylvania",
  },
  serviceArea: ["Delaware", "Southeastern Pennsylvania"],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    google: "https://www.google.com/maps",
  },
  owner: {
    name: "Jeremiah",
    title: "Founder & Lead Contractor",
  },
  hours: "Monday–Saturday: 7:00 AM – 6:00 PM",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/project-estimator", label: "Project Estimator" },
  { href: "/contact", label: "Contact" },
] as const;

export const primaryCta = {
  href: "/project-estimator",
  label: "Get My Project Estimate",
} as const;
