import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
  themeColor: "#070B14",
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
      <body className="min-h-screen bg-base font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
