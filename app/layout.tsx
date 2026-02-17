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
  title: "LNNK - Shorten the long",
  description: "Turn long URLs into short, shareable links.",
  url: "https://lnnk.click",
  image: "https://lnnk.click/lnnk-wide.png",
};

export const metadata: Metadata = {
  title: SITE_INFO.title,
  description: SITE_INFO.description,
  icons: {
    icon: "/favicon.ico",
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
        alt: "LNNK - Link Shortener",
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
