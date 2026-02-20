import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { HeroProvider } from "@/context/HeroContext";
import BrownianParticles from "@/components/animations/brownian-particles";
import Preloader from "@/components/shared/preloader";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

const SITE_INFO = {
  title: "LNNK | Professional URL Shortener & Link Management",
  description:
    "Create short, branded, and secure links with LNNK. A minimal professional URL shortener for individuals and businesses. Track clicks, manage links, and grow your reach.",
  url: "https://lnnk.click",
  image: "https://lnnk.click/lnnk-wide.png",
};

export const metadata: Metadata = {
  title: {
    default: SITE_INFO.title,
    template: `%s | LNNK`,
  },
  description: SITE_INFO.description,
  keywords: [
    "URL shortener",
    "link shortener",
    "branded links",
    "LNNK",
    "lnnk.click",
    "short links",
    "link management",
    "marketing tools",
  ],
  authors: [{ name: "LNNK Team" }],
  creator: "LNNK",
  publisher: "LNNK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    siteName: "LNNK",
    images: [
      {
        url: SITE_INFO.image,
        width: 1200,
        height: 630,
        alt: "LNNK - Professional Link Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    images: [SITE_INFO.image],
    // creator: "@lnnk_click",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <HeroProvider>
          <Preloader />
          <BrownianParticles />
          {children}
        </HeroProvider>
      </body>
    </html>
  );
}
