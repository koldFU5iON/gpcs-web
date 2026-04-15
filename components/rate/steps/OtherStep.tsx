"use client";

import type { FormAnswers, IPOwnership, CreativeControlMatrix } from "@/lib/gpcs/types";
import { cn } from "@/lib/utils";

interface OtherStepProps {
  answers: FormAnswers;
  onChange: (updates: Partial<FormAnswers>) => void;
}

const ipOwnershipOptions: { value: IPOwnership; label: string; description: string }[] = [
  { value: "studio_owns", label: "Studio retains full IP", description: "All intellectual property belongs to the studio" },
  { value: "co_owned", label: "Co-owned", description: "IP shared between studio and publisher/funder" },
  { value: "publisher_owns", label: "Publisher owns IP", description: "Publisher holds the IP rights" },
  { value: "platform_owns", label: "Platform or parent company owns IP", description: "First-party or subsidiary arrangement" },
];

type CreativeArea = keyof CreativeControlMatrix;
type ControlOwner = "studio" | "publisher" | "shared";

const creativeAreas: { key: CreativeArea; label: string }[] = [
  { key: "coreDesign", label: "Core design direction" },
  { key: "scopeFeatures", label: "Scope & features" },
  { key: "monetisation", label: "Monetisation & pricing" },
  { key: "releaseTiming", label: "Release timing & platform" },
];

const controlOptions: ControlOwner[] = ["studio", "publisher", "shared"];

export default function OtherStep({ answers, onChange }: OtherStepProps) {
  const updateCreativeControl = (key: CreativeArea, value: ControlOwner) => {
    onChange({
      q14_creativeControl: { ...answers.q14_creativeControl, [key]: value },
    });
  };

  const toggleOtherSource = (type: string) => {
    const updated = answers.q15_otherSources.map((s) =>
      s.type === type ? { ...s, checked: !s.checked } : s
    );
    onChange({ q15_otherSources: updated });
  };

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-semibold text-gpcs-text">
        Independence & Other Sources
      </h2>
      <p className="mb-6 text-sm text-gpcs-muted">
        These questions determine your independence marker and whether platform grants or community
        funding affect your overall rating.
      </p>

      {/* Q13: IP Ownership */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gpcs-text">
          Q13. Who owns the intellectual property for this project?
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ipOwnershipOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ q13_ipOwnership: opt.value })}
              className={cn(
                "rounded-lg border p-3 text-left transition-all cursor-pointer",
                answers.q13_ipOwnership === opt.value
                  ? "border-gpcs-gold/60 bg-gpcs-gold/10"
                  : "border-white/10 bg-gpcs-slate/30 text-gpcs-silver hover:border-white/20"
              )}
            >
              <p className={cn("text-sm font-medium", answers.q13_ipOwnership === opt.value ? "text-gpcs-gold" : "text-gpcs-text")}>
                {opt.label}
              </p>
              <p className="mt-0.5 text-xs text-gpcs-muted">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Q14: Creative Control Matrix */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gpcs-text">
          Q14. Who controls key creative decisions?
        </p>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 bg-gpcs-slate/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gpcs-muted">
            <span className="col-span-1">Decision area</span>
            <span className="text-center">Studio</span>
            <span className="text-center">Publisher</span>
            <span className="text-center">Shared</span>
          </div>
          {/* Rows */}
          {creativeAreas.map((area, i) => (
            <div
              key={area.key}
              className={cn(
                "grid grid-cols-4 items-center px-4 py-3",
                i % 2 === 0 ? "bg-gpcs-slate/20" : "bg-transparent"
              )}
            >
              <span className="text-sm text-gpcs-silver">{area.label}</span>
              {controlOptions.map((owner) => (
                <div key={owner} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => updateCreativeControl(area.key, owner)}
                    className={cn(
                      "h-5 w-5 rounded-full border-2 transition-all cursor-pointer",
                      answers.q14_creativeControl[area.key] === owner
                        ? "border-gpcs-gold bg-gpcs-gold scale-110"
                        : "border-white/20 bg-transparent hover:border-white/40"
                    )}
                    aria-label={`${area.label}: ${owner}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Q15: Other Sources */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gpcs-text">
          Q15. Does the project have any other significant funding or support sources?
        </p>
        <p className="mb-3 text-xs text-gpcs-muted">
          Select all that apply. These are weighted at 10% and can modestly elevate your rating.
        </p>
        <div className="space-y-2">
          {answers.q15_otherSources.map((source) => (
            <button
              key={source.type}
              type="button"
              onClick={() => toggleOtherSource(source.type)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all cursor-pointer",
                source.checked
                  ? "border-gpcs-gold/30 bg-gpcs-gold/5"
                  : "border-white/10 bg-gpcs-slate/20 hover:border-white/20"
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                  source.checked
                    ? "border-gpcs-gold bg-gpcs-gold"
                    : "border-white/30 bg-transparent"
                )}
              >
                {source.checked && (
                  <svg className="h-3 w-3 text-gpcs-navy" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={cn("text-sm", source.checked ? "text-gpcs-text" : "text-gpcs-silver")}>
                {source.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
