"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, primaryCta, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-dark/95 text-white backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 flex-col rounded-md focus-ring">
          <span className="text-lg font-semibold tracking-tight sm:text-xl">
            {siteConfig.name}
          </span>
          <span className="truncate text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-ring",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Call ${siteConfig.phone}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Phone className="size-4" />
            {siteConfig.phone}
          </a>
          <Link
            href={primaryCta.href}
            className={cn(
              buttonVariants(),
              "h-10 bg-brand-gold px-4 text-brand-dark hover:bg-brand-gold/90"
            )}
          >
            {primaryCta.label}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Call ${siteConfig.phone}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "text-white hover:bg-white/10"
            )}
          >
            <Phone className="size-5" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "text-white hover:bg-white/10"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,20rem)] bg-brand-dark text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white">
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10 focus-ring"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={primaryCta.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "mt-4 h-11 bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
                  )}
                >
                  {primaryCta.label}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
