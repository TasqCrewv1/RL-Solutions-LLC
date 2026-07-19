import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const featuredServices = services.slice(0, 8);

  return (
    <footer className="surface-dark text-white">
      <div className="container-wide section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-semibold tracking-tight">
                {siteConfig.name}
              </p>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-brand-gold">
                {siteConfig.tagline}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              Premium general contracting and remodeling for homeowners across
              Delaware and Southeastern Pennsylvania. Practical solutions.
              Dependable craftsmanship.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
              Explore
            </h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
              Services
            </h2>
            <ul className="mt-4 space-y-2">
              {featuredServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/80 transition-colors hover:text-white focus-ring rounded"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <a href={siteConfig.phoneHref} className="hover:text-white focus-ring rounded">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white focus-ring rounded"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <span>{siteConfig.address.region}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-white focus-ring rounded">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white focus-ring rounded">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
