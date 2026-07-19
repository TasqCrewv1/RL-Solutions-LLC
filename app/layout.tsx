import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, organizationSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "RL Solutions | General Contractor in Delaware & Southeastern Pennsylvania",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "general contractor Delaware",
    "general contractor Southeastern Pennsylvania",
    "kitchen remodeling Delaware",
    "bathroom remodeling Pennsylvania",
    "home additions Delaware",
    "roofing contractor",
    "RL Solutions",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "RL Solutions | General Contractor in Delaware & Southeastern Pennsylvania",
    description: siteConfig.description,
    images: [{ url: "/images/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "RL Solutions | General Contractor in Delaware & Southeastern Pennsylvania",
    description: siteConfig.description,
    images: ["/images/og-default.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={[localBusinessSchema(), organizationSchema()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-brand-dark"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
