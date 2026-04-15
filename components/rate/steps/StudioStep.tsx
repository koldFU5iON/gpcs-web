"use client";

import type {
  FormAnswers,
  TeamSizeBracket,
  InfrastructureLevel,
  TrackRecordLevel,
  FinancialHealthLevel,
  GeographicFootprint,
} from "@/lib/gpcs/types";
import { cn } from "@/lib/utils";

interface OptionCard<T> {
  value: T;
  label: string;
  description: string;
}

function RadioCardGroup<T extends string>({
  question,
  options,
  value,
  onChange,
}: {
  question: string;
  options: OptionCard<T>[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mb-6">
      <p className="mb-3 text-sm font-semibold text-gpcs-text">{question}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg border p-3 text-left transition-all duration-200 cursor-pointer",
              value === opt.value
                ? "border-gpcs-gold/60 bg-gpcs-gold/10 text-gpcs-text"
                : "border-white/10 bg-gpcs-slate/30 text-gpcs-silver hover:border-white/20 hover:bg-gpcs-slate/50"
            )}
          >
            <p className={cn("text-sm font-medium", value === opt.value ? "text-gpcs-gold" : "")}>
              {opt.label}
            </p>
            <p className="mt-0.5 text-xs text-gpcs-muted leading-snug">{opt.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const teamSizeOptions: OptionCard<TeamSizeBracket>[] = [
  { value: "1-4", label: "1–4 people", description: "Solo dev or micro-team, mostly part-time or volunteers" },
  { value: "5-10", label: "5–10 people", description: "Small team, mix of full-time and contractors" },
  { value: "10-15", label: "10–15 people", description: "Growing team with some dedicated roles" },
  { value: "15-30", label: "15–30 people", description: "Small studio with dedicated departments forming" },
  { value: "30-80", label: "30–80 people", description: "Mid-size studio with clear departmental structure" },
  { value: "80-200", label: "80–200 people", description: "Large studio with multiple full departments" },
  { value: "200+", label: "200+ people", description: "Major studio with multiple projects running simultaneously" },
];

const infrastructureOptions: OptionCard<InfrastructureLevel>[] = [
  { value: "individual", label: "Individual workflows", description: "Everyone uses their own tools, no shared pipelines" },
  { value: "basic", label: "Basic shared tools", description: "Source control and informal processes in place" },
  { value: "developing", label: "Small departments forming", description: "Some formal processes, dedicated leads" },
  { value: "structured", label: "Full departmental structure", description: "Clear pipelines, dedicated QA, production management" },
  { value: "enterprise", label: "Multiple departments + proprietary tech", description: "Internal engine, full studio support infrastructure" },
];

const trackRecordOptions: OptionCard<TrackRecordLevel>[] = [
  { value: "none", label: "No commercial releases", description: "This is the first or an unreleased project" },
  { value: "hobbyist", label: "Hobbyist / jam projects only", description: "Free or jam games, no commercial titles" },
  { value: "one_small", label: "One small commercial title", description: "One shipped game with modest commercial presence" },
  { value: "multiple_mid", label: "Multiple mid-scope titles", description: "Track record of shipped mid-budget or successful indie titles" },
  { value: "aaa_titles", label: "Multiple AAA titles shipped", description: "Established history with large-scale commercial releases" },
];

const financialHealthOptions: OptionCard<FinancialHealthLevel>[] = [
  { value: "self_funded", label: "Self-funded, limited runway", description: "Personal savings or bootstrap, no external funding" },
  { value: "bootstrapped", label: "Bootstrapped, sustainable", description: "Revenue-funded or modest external funding secured" },
  { value: "funded", label: "External funding secured", description: "Series A/B, publisher advance, or significant grants" },
  { value: "established", label: "Established revenue", description: "Strong balance sheet, multiple funding sources" },
  { value: "public_major", label: "Publicly traded or major-owned", description: "Listed company or subsidiary of a major publisher" },
];

const geographicOptions: OptionCard<GeographicFootprint>[] = [
  { value: "home_based", label: "Home-based / remote only", description: "No formal office, fully remote team" },
  { value: "local_office", label: "Local office presence", description: "One small office in a single city" },
  { value: "regional", label: "Regional presence", description: "Offices or hubs in 1–2 countries" },
  { value: "national", label: "National presence", description: "Multiple offices or established national brand" },
  { value: "international", label: "International presence", description: "Offices across multiple countries or global brand recognition" },
];

interface StudioStepProps {
  answers: FormAnswers;
  onChange: (updates: Partial<FormAnswers>) => void;
}

export default function StudioStep({ answers, onChange }: StudioStepProps) {
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-semibold text-gpcs-text">
        Your Studio
      </h2>
      <p className="mb-6 text-sm text-gpcs-muted">
        Tell us about the studio&apos;s production capacity at the time this project was rated.
        Answer based on resources dedicated to this project, not total studio headcount.
      </p>

      <RadioCardGroup
        question="Q1. How large is the team working on this project?"
        options={teamSizeOptions}
        value={answers.q1_teamSize}
        onChange={(v) => onChange({ q1_teamSize: v })}
      />

      <RadioCardGroup
        question="Q2. How would you describe the studio's infrastructure and processes?"
        options={infrastructureOptions}
        value={answers.q2_infrastructure}
        onChange={(v) => onChange({ q2_infrastructure: v })}
      />

      <RadioCardGroup
        question="Q3. What is the studio's shipping track record?"
        options={trackRecordOptions}
        value={answers.q3_trackRecord}
        onChange={(v) => onChange({ q3_trackRecord: v })}
      />

      <RadioCardGroup
        question="Q4. What best describes the studio's financial health?"
        options={financialHealthOptions}
        value={answers.q4_financialHealth}
        onChange={(v) => onChange({ q4_financialHealth: v })}
      />

      <RadioCardGroup
        question="Q5. What is the studio's geographic footprint?"
        options={geographicOptions}
        value={answers.q5_geographicFootprint}
        onChange={(v) => onChange({ q5_geographicFootprint: v })}
      />
    </div>
  );
}
