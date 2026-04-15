import type { Metadata } from "next";
import RatingForm from "@/components/rate/RatingForm";

export const metadata: Metadata = {
  title: "Rate Your Project",
  description:
    "Answer 15 questions about your studio, publisher, and funding sources to receive an unverified GPC capacity rating.",
};

export default function RatePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
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
