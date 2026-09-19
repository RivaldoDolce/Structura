import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/frontend/components/providers";
import { THEME_COLOR } from "@/frontend/lib/tokens";
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
  title: {
    default: "STRUCTURA — L'ingénierie qui construit en confiance",
    template: "%s | STRUCTURA",
  },
  description:
    "Plateforme digitale intégrée pour l'ingénierie structure, l'ébénisterie d'art et l'immobilier à Yaoundé, Cameroun. Plans de construction, suivi de chantier, mobilier sur-mesure.",
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
    url: "https://structura-cm.com",
    siteName: "STRUCTURA",
    title: "STRUCTURA — L'ingénierie qui construit en confiance",
    description:
      "De la rigueur du calcul de structure à la noblesse de la finition sur-mesure. Votre projet immobilier de A à Z à Yaoundé.",
    images: [
      {
        url: "/og/default-og.png",
        width: 1200,
        height: 630,
        alt: "STRUCTURA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STRUCTURA — L'ingénierie qui construit en confiance",
    description:
      "Plateforme digitale intégrée pour l'ingénierie, l'ébénisterie et l'immobilier.",
    images: ["/og/default-og.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-base font-sans text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
