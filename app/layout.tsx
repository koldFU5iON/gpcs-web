import type { Metadata } from "next";
import { Russo_One, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const russoOne = Russo_One({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GPCS — Game Project Classification Standard",
    template: "%s | GPCS",
  },
  description:
    "A bond-style rating system for classifying game projects by production capacity and resource backing. Transparent, voluntary, and project-centric.",
  keywords: [
    "game development",
    "indie games",
    "game classification",
    "GPCS",
    "game project rating",
    "game industry standard",
  ],
  authors: [{ name: "Devon Stanton" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gpcstandard.org",
    siteName: "GPCS",
    title: "GPCS — Game Project Classification Standard",
    description:
      "A bond-style rating system for classifying game projects by production capacity and resource backing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPCS — Game Project Classification Standard",
    description:
      "A bond-style rating system for classifying game projects by production capacity and resource backing.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${russoOne.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-gpcs-navy text-gpcs-text font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
