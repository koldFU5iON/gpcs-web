import type { Metadata } from "next";
import { Lexend, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
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
    <html lang="en" className={`${lexend.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gpcs-bg text-gpcs-text font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
