/**
 * JSON-LD structured data builders for GPCS.
 * Used for both SEO (rich results) and AEO (AI answer engine context).
 */

const SITE_URL = "https://gpcstandard.org";
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Game Project Classification Standard",
  alternateName: "GPCS",
  url: SITE_URL,
  description:
    "A structured, bond-style rating framework for classifying game projects by production capacity and resource backing. Transparent, voluntary, and project-centric.",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#devon-stanton`,
    name: "Devon Stanton",
    url: "https://devonstanton.com",
    sameAs: [
      "https://linkedin.com/in/devonstanton",
      "https://github.com/koldFU5iON",
      "https://substack.com/@devonstanton",
    ],
  },
  license: "https://creativecommons.org/licenses/by/4.0/",
  sameAs: ["https://github.com/koldFU5iON/gpcs"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "GPCS — Game Project Classification Standard",
  description:
    "The official home of the Game Project Classification Standard.",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/specification#{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is GPCS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPCS (Game Project Classification Standard) is a structured, bond-style rating framework for classifying game projects by production capacity and resource backing. It replaces vague labels like 'indie' and 'AAA' with seven verifiable capacity tiers (C through AAA), an independence marker, and a verification level.",
      },
    },
    {
      "@type": "Question",
      name: "What does a GPCS rating look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A GPC rating takes the form 'A / I1 — Verified'. The first element (A) is the capacity tier (AAA, AA, A, BBB, BB, B, or C). The second element (I1) is the independence marker indicating IP ownership and creative control. The third element is the verification level: Unverified (self-reported), Verified (publicly checked), or Audited (third-party CPA).",
      },
    },
    {
      "@type": "Question",
      name: "What are the GPCS capacity tiers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPCS uses seven capacity tiers: AAA (200+ staff, major publisher, multiple shipped AAA titles), AA (80–200 staff, full departmental structure), A (30–80 staff, departmental structure emerging), BBB (15–30 staff, formal processes), BB (10–15 staff, ad-hoc processes), B (5–10 staff, minimal formal process), and C (1–4 staff, no commercial releases). Tiers reflect production capacity, not quality.",
      },
    },
    {
      "@type": "Question",
      name: "Is GPCS an official industry standard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPCS is currently a proposal under active testing, not yet a ratified standard. It is being piloted through the Unity Awards programme. The goal is a ratified v1.0 by 2026, requiring at least 200 classified projects and 2 implementation cycles. It is voluntary and open-source under CC BY 4.0.",
      },
    },
    {
      "@type": "Question",
      name: "Who is GPCS designed for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPCS is designed for awards bodies (to structure fair, capacity-tiered competition), grant programmes (to set auditable eligibility criteria), platforms and publishers (to segment and support incoming projects), and game developers (to communicate their project's scale credibly and transparently).",
      },
    },
    {
      "@type": "Question",
      name: "How is a GPCS rating calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A GPCS rating is calculated by scoring three source types: studio capacity (55% weight), publisher or funder (35% weight), and other sources such as grants and platform programmes (10% weight). Two constraints prevent gaming: a floor constraint limits how far a project can exceed the studio's tier, and a ceiling constraint prevents a project from falling too far below a major publisher's tier.",
      },
    },
  ],
};

export function webPageSchema({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    ...(breadcrumbs && {
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    }),
  };
}

export function specificationSchema(version: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/specification#article`,
    name: `Game Project Classification Standard — v${version}`,
    headline: "Game Project Classification Standard White Paper",
    description:
      "The full GPCS specification — methodology, tier definitions, scoring algorithm, independence markers, verification levels, and governance.",
    url: `${SITE_URL}/specification`,
    version,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#devon-stanton`,
      name: "Devon Stanton",
    },
    publisher: { "@id": ORG_ID },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "DefinedTermSet",
      name: "GPCS Capacity Tiers",
      hasDefinedTerm: [
        { "@type": "DefinedTerm", name: "AAA", description: "200+ staff, multiple departments, major publisher, multiple shipped AAA titles." },
        { "@type": "DefinedTerm", name: "AA", description: "80–200 staff, full departmental structure, multiple mid-to-large scope titles." },
        { "@type": "DefinedTerm", name: "A", description: "30–80 staff, departmental structure emerging, 1–2 shipped commercial titles." },
        { "@type": "DefinedTerm", name: "BBB", description: "15–30 staff, small departments with formal processes, first title shipped or experienced leads." },
        { "@type": "DefinedTerm", name: "BB", description: "10–15 staff, ad-hoc processes, no shipped title or single small release." },
        { "@type": "DefinedTerm", name: "B", description: "5–10 staff, minimal formal process, hobbyist projects only." },
        { "@type": "DefinedTerm", name: "C", description: "1–4 staff, no infrastructure, no commercial releases." },
      ],
    },
  };
}

export const howItWorksSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to classify a game project using GPCS",
  description:
    "A step-by-step guide to obtaining a Game Project Classification Standard (GPCS) rating for your game project.",
  url: `${SITE_URL}/how-it-works`,
  publisher: { "@id": ORG_ID },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Describe your project",
      text: "Answer 15 questions about your studio, funding sources, IP ownership, and creative control. No subjective self-assessment — just verifiable structural data.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Sources are scored and weighted",
      text: "Studio capacity (55%), publisher or funder (35%), and other sources (10%) are scored independently and combined. Two constraints — a floor and a ceiling — prevent gaming the result.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Receive your GPC classification",
      text: "Your result is a GPC code: capacity tier (AAA–C), independence marker (I0–I3), and verification level (Unverified, Verified, or Audited). Upgrade to Verified or Audited for formal recognition.",
    },
  ],
};

export const ratingToolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/rate#app`,
  name: "GPCS Rating Tool",
  url: `${SITE_URL}/rate`,
  description:
    "An interactive tool that calculates a Game Project Classification Standard rating from 15 questions about studio capacity, publisher backing, and funding sources.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: { "@id": ORG_ID },
  featureList: [
    "Calculates GPCS capacity tier (AAA–C)",
    "Determines independence marker (I0–I3)",
    "Applies floor and ceiling constraints",
    "No account required",
    "Results stay in browser",
  ],
};

export const authorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#devon-stanton`,
  name: "Devon Stanton",
  url: "https://devonstanton.com",
  jobTitle: "Creator, Game Project Classification Standard",
  description:
    "Senior operations and communications leader with 15+ years in the games industry. Former roles at Unity, Blizzard Entertainment, and 2K Games. Creator of the Game Project Classification Standard (GPCS).",
  sameAs: [
    "https://devonstanton.com",
    "https://linkedin.com/in/devonstanton",
    "https://github.com/koldFU5iON",
    "https://substack.com/@devonstanton",
    "https://ko-fi.com/devonstanton",
  ],
  worksFor: { "@id": ORG_ID },
};
