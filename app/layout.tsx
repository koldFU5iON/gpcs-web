import type { Metadata } from "next";
import { Lexend, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { fetchWhitepaperVersion } from "@/lib/gpcs/whitepaper";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import ChatWidget from "@/components/chat/ChatWidget";

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
    "GPCS replaces vague labels like 'indie' and 'AAA' with a structured, verifiable classification standard for game projects — seven capacity tiers, an independence marker, and three verification levels.",
  keywords: [
    "game project classification",
    "GPCS",
    "game classification standard",
    "indie game definition",
    "AAA definition",
    "game project rating",
    "game industry standard",
    "game development tiers",
    "game studio classification",
    "indie game standard",
    "game production capacity",
    "gpcstandard",
  ],
  authors: [{ name: "Devon Stanton", url: "https://devonstanton.com" }],
  creator: "Devon Stanton",
  publisher: "Game Project Classification Standard",
  metadataBase: new URL("https://gpcstandard.org"),
  alternates: {
    canonical: "https://gpcstandard.org",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gpcstandard.org",
    siteName: "GPCS — Game Project Classification Standard",
    title: "GPCS — Game Project Classification Standard",
    description:
      "GPCS replaces vague labels like 'indie' and 'AAA' with a structured, verifiable classification — seven capacity tiers, an independence marker, and three verification levels.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GPCS — Game Project Classification Standard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPCS — Game Project Classification Standard",
    description:
      "GPCS replaces vague labels like 'indie' and 'AAA' with a structured, verifiable classification for game projects.",
    images: ["/opengraph-image"],
    creator: "@devonstanton",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { versionShort } = await fetchWhitepaperVersion();

  return (
    <html lang="en" className={`${lexend.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gpcs-bg text-gpcs-text font-sans">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Nav version={versionShort} />
          <main>{children}</main>
          <Footer version={versionShort} />
          {process.env.CHAT_ENABLED !== "false" && <ChatWidget />}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
