const WHITEPAPER_URL =
  "https://raw.githubusercontent.com/koldfu5ion/gpcs/main/GPCS-White-Paper.md";

export const WHITEPAPER_DOWNLOAD_URL =
  "https://raw.githubusercontent.com/koldfu5ion/gpcs/main/GPCS-White-Paper.md";

// Exported as a static fallback for client components that can't use async fetch
export const GPCS_FALLBACK_VERSION = "0.6";

export interface WhitepaperData {
  markdown: string;
  version: string;      // e.g. "0.6.0"
  versionShort: string; // e.g. "0.6"
  author: string;
  date: string;
}

function parseMetadata(markdown: string): Pick<WhitepaperData, "version" | "versionShort" | "author" | "date"> {
  const versionMatch = markdown.match(/^\*\*Version:\*\*\s*([\d.]+)/m);
  const authorMatch  = markdown.match(/^\*\*Author:\*\*\s*(.+)$/m);
  const dateMatch    = markdown.match(/^\*\*Date:\*\*\s*(.+)$/m);

  const version = versionMatch?.[1] ?? "0.5.0";
  return {
    version,
    versionShort: version.split(".").slice(0, 2).join("."),
    author: authorMatch?.[1]?.trim() ?? "Devon Stanton",
    date:   dateMatch?.[1]?.trim()   ?? "",
  };
}

export async function fetchWhitepaper(): Promise<WhitepaperData> {
  const res = await fetch(WHITEPAPER_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch whitepaper: ${res.status}`);
  }
  const markdown = await res.text();
  return { markdown, ...parseMetadata(markdown) };
}

// Version-only fetch — lighter call used by pages that don't need the full markdown
export async function fetchWhitepaperVersion(): Promise<Pick<WhitepaperData, "version" | "versionShort">> {
  const { version, versionShort } = await fetchWhitepaper();
  return { version, versionShort };
}
