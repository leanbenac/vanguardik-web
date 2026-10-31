import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Software de Vanguardia, Extensiones B2B & Growth`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "agencia de software",
    "extensiones de navegador corporativas",
    "chrome extensions manifest v3",
    "desarrollo web moderno",
    "growth marketing",
    "diseño ui ux vanguardia",
    "agentes de inteligencia artificial",
    "automatización de procesos b2b",
    siteConfig.name.toLowerCase(),
  ],
  authors: [
    { name: "Leandro Benac" },
    { name: "Facundo Rodriguez Sabia" },
    { name: siteConfig.name },
  ],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.domain),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.domain,
    title: `${siteConfig.name} — Ingeniería de Software, Extensiones & Growth`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software, Extensiones & Growth`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.domain,
    email: siteConfig.contactEmail,
    founder: siteConfig.founders.map((name) => ({
      "@type": "Person",
      name,
    })),
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter,
      siteConfig.socials.instagram,
    ],
  };

  return (
    <html
      lang="es"
      className={`${jakartaSans.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
