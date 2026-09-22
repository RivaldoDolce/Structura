import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/frontend/components/providers";
import { THEME_COLOR } from "@/frontend/lib/tokens";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NOM, SITE_URL } from "@/shared/constants/site";
import "./globals.css";

// Les variables posées ici sont consommées par le @theme de globals.css
// (--font-display / --font-sans / --font-mono) : next/font reste la seule
// source des polices, auto-hébergées et sans décalage de mise en page.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "STRUCTURA — L'ingénierie qui construit en confiance",
    template: "%s | STRUCTURA",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ingénieur structure",
    "conduite de travaux",
    "ébénisterie",
    "plans de construction",
    "immobilier Yaoundé",
    "diaspora camerounaise",
    "suivi de chantier",
    "Mobile Money",
  ],
  authors: [{ name: "STRUCTURA" }],
  creator: "STRUCTURA",
  openGraph: {
    type: "website",
    locale: "fr_CM",
    url: SITE_URL,
    siteName: SITE_NOM,
    title: "STRUCTURA — L'ingénierie qui construit en confiance",
    description:
      "De la rigueur du calcul de structure à la noblesse de la finition sur-mesure. Votre projet immobilier de A à Z à Yaoundé.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "STRUCTURA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STRUCTURA — L'ingénierie qui construit en confiance",
    description: "Plateforme digitale intégrée pour l'ingénierie, l'ébénisterie et l'immobilier.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const donneesStructurees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organisation`,
        name: SITE_NOM,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Yaoundé",
          addressCountry: "CM",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#site`,
        url: SITE_URL,
        name: SITE_NOM,
        publisher: { "@id": `${SITE_URL}#organisation` },
      },
    ],
  };

  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-fond text-ink min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
