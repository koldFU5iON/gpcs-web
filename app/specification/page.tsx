import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import sanitizeHtml from "sanitize-html";
import { Download } from "lucide-react";
import SpecNav from "@/components/specification/SpecNav";

export const metadata: Metadata = {
  title: "Specification",
  description:
    "The full Game Project Classification Standard white paper — methodology, tier definitions, scoring algorithm, and governance.",
};

function extractSections(markdown: string) {
  const lines = markdown.split("\n");
  const sections: { id: string; title: string; level: number }[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim().replace(/\*\*/g, "");
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      sections.push({ id, title, level });
    }
  }

  return sections;
}

function addHeadingIds(html: string): string {
  return html.replace(
    /<(h[123])>(.+?)<\/h[123]>/g,
    (_, tag, inner) => {
      const text = inner.replace(/<[^>]+>/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return `<${tag} id="${id}">${inner}</${tag}>`;
    }
  );
}

async function renderMarkdown(content: string): Promise<string> {
  const remarkResult = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: true })
    .process(content);

  const rawHtml = addHeadingIds(String(remarkResult));

  // Sanitize with an allowlist that preserves all standard markdown output elements
  const clean = sanitizeHtml(rawHtml, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "ul", "ol", "li",
      "strong", "em", "code", "pre",
      "blockquote",
      "table", "thead", "tbody", "tr", "th", "td",
      "a",
      "del", "s",
    ],
    allowedAttributes: {
      "h1": ["id"],
      "h2": ["id"],
      "h3": ["id"],
      "h4": ["id"],
      "a": ["href", "title", "target", "rel"],
      "td": ["align"],
      "th": ["align"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return clean;
}

export default async function SpecificationPage() {
  const whitepaperPath = join(process.cwd(), "src", "GPCS-White-Paper.md");
  const content = readFileSync(whitepaperPath, "utf-8");
  const sections = extractSections(content);
  const htmlContent = await renderMarkdown(content);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-1">
            Full Specification
          </p>
          <h1 className="font-display text-3xl font-bold text-gpcs-text">
            Game Project Classification Standard
          </h1>
          <div className="mt-2 flex items-center gap-3 text-xs text-gpcs-muted">
            <span>v0.5.0</span>
            <span>&bull;</span>
            <span>Devon Stanton</span>
            <span>&bull;</span>
            <span>December 2025</span>
            <span>&bull;</span>
            <span>CC BY 4.0</span>
          </div>
        </div>
        <a
          href="/GPCS-White-Paper.md"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-gpcs-silver hover:border-white/30 hover:text-gpcs-text transition-colors shrink-0"
        >
          <Download size={14} />
          Download Markdown
        </a>
      </div>

      <div className="flex gap-8">
        {/* Sidebar TOC */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <SpecNav sections={sections} />
        </aside>

        {/* White paper content — rendered from sanitized markdown */}
        <article className="min-w-0 flex-1 rounded-xl border border-white/5 bg-gpcs-slate/10 p-6 sm:p-8 lg:p-10">
          <WhitePaperContent html={htmlContent} />
        </article>
      </div>
    </div>
  );
}

// Isolated component to contain the sanitized HTML rendering
function WhitePaperContent({ html }: { html: string }) {
  return (
    // Content is sanitized server-side via sanitize-html before this point
    // eslint-disable-next-line react/no-danger
    <div
      className="prose prose-gpcs max-w-none prose-headings:font-display prose-headings:text-gpcs-text prose-p:text-gpcs-silver prose-li:text-gpcs-silver prose-strong:text-gpcs-text prose-code:text-gpcs-gold prose-code:bg-gpcs-slate/60 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-a:text-gpcs-gold hover:prose-a:underline prose-blockquote:border-gpcs-gold/40 prose-blockquote:text-gpcs-muted prose-hr:border-gpcs-slate-light prose-table:text-sm prose-th:text-gpcs-muted prose-td:text-gpcs-silver"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
