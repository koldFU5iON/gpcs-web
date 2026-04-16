import type { Metadata } from "next";
import RatingForm from "@/components/rate/RatingForm";
import JsonLd from "@/components/seo/JsonLd";
import { ratingToolSchema, webPageSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Rate Your Project",
  description:
    "Classify your game project in ~10 minutes. Answer 15 questions about your studio, publisher, and funding sources — the GPCS algorithm returns your capacity tier (AAA–C), independence marker, and verification level.",
  alternates: { canonical: "https://gpcstandard.org/rate" },
  openGraph: {
    url: "https://gpcstandard.org/rate",
    title: "Rate Your Game Project — GPCS Classification Tool",
    description:
      "Free, anonymous, no account required. 15 questions. Get your GPC capacity rating in ~10 minutes.",
  },
};

export default function RatePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <JsonLd data={[
        webPageSchema({
          name: "Rate Your Game Project — GPCS Classification Tool",
          description: "Free interactive tool. Answer 15 questions to receive a GPC capacity rating for your game project.",
          url: "https://gpcstandard.org/rate",
          breadcrumbs: [
            { name: "Home", url: "https://gpcstandard.org" },
            { name: "Rate Your Project", url: "https://gpcstandard.org/rate" },
          ],
        }),
        ratingToolSchema,
      ]} />
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gpcs-gold/30 bg-gpcs-gold/10 px-3 py-1 text-xs font-medium text-gpcs-gold">
          Demo — Unverified Self-Assessment
        </div>
        <h1 className="font-display text-3xl font-bold text-gpcs-text sm:text-4xl">
          Rate Your Project
        </h1>
        <p className="mt-3 text-gpcs-silver max-w-lg mx-auto">
          Answer 15 questions about your studio, publisher, and funding sources.
          The algorithm calculates your GPC rating using the methodology from the{" "}
          <a href="/specification" className="text-gpcs-gold hover:underline">
            full specification
          </a>
          .
        </p>
        <p className="mt-2 text-xs text-gpcs-muted">
          ~10 minutes &bull; No account required &bull; Results stay in your browser
        </p>
      </div>

      {/* Form */}
      <RatingForm />
    </div>
  );
}
