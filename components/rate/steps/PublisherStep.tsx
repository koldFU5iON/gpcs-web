"use client";

import type {
  FormAnswers,
  FundingCommitment,
  PublisherFinancialScale,
  MarketReachLevel,
  PortfolioScale,
  DisclosureStatus,
  ServiceScope,
} from "@/lib/gpcs/types";
import { cn } from "@/lib/utils";

function RadioCardGroup<T extends string>({
  question,
  options,
  value,
  onChange,
  cols = 2,
}: {
  question: string;
  options: { value: T; label: string; description?: string }[];
  value: T | null;
  onChange: (v: T) => void;
  cols?: 1 | 2 | 3;
}) {
  const gridClass = { 1: "grid-cols-1", 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-3" }[cols];

  return (
    <div className="mb-6">
      <p className="mb-3 text-sm font-semibold text-gpcs-text">{question}</p>
      <div className={cn("grid gap-2", gridClass)}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg border p-3 text-left transition-all duration-200 cursor-pointer",
              value === opt.value
                ? "border-gpcs-gold/60 bg-gpcs-gold/10"
                : "border-white/10 bg-gpcs-slate/30 text-gpcs-silver hover:border-white/20"
            )}
          >
            <p className={cn("text-sm font-medium", value === opt.value ? "text-gpcs-gold" : "text-gpcs-text")}>
              {opt.label}
            </p>
            {opt.description && (
              <p className="mt-0.5 text-xs text-gpcs-muted leading-snug">{opt.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

interface PublisherStepProps {
  answers: FormAnswers;
  onChange: (updates: Partial<FormAnswers>) => void;
}

const fundingOptions: { value: FundingCommitment; label: string; description: string }[] = [
  { value: "full", label: "Full development funding", description: "Publisher covers most or all development costs" },
  { value: "partial", label: "Partial funding / advance", description: "Publisher provides advance or co-funds with studio" },
  { value: "none", label: "No development funding", description: "Publisher provides services only, no cash funding" },
];

const financialScaleOptions: { value: PublisherFinancialScale; label: string; description: string }[] = [
  { value: "under_10k", label: "Under $10K", description: "Friends/family, micro-grants" },
  { value: "10k_50k", label: "$10K – $50K", description: "Small community funding or micro-publishers" },
  { value: "50k_250k", label: "$50K – $250K", description: "Regional publishers, angel investors" },
  { value: "250k_1m", label: "$250K – $1M", description: "Digital-focused indie publishers" },
  { value: "1m_5m", label: "$1M – $5M", description: "Established indie publishers (Raw Fury, Fellow Traveller)" },
  { value: "5m_30m", label: "$5M – $30M", description: "Mid-tier publishers (Devolver, Annapurna, Paradox)" },
  { value: "over_50m", label: "$50M+", description: "Major publishers (Sony, Microsoft, EA, Take-Two)" },
];

const marketReachOptions: { value: MarketReachLevel; label: string; description: string }[] = [
  { value: "none", label: "None / self-distribution", description: "No publisher distribution support" },
  { value: "digital_limited", label: "Limited digital", description: "Steam or one platform, minimal marketing" },
  { value: "digital_strong", label: "Strong digital presence", description: "Multi-platform digital + regional retail support" },
  { value: "strong_digital_retail", label: "Digital + selective retail", description: "Strong digital and selective retail partnerships" },
  { value: "global", label: "Global distribution", description: "Worldwide retail + digital + platform co-marketing deals" },
];

const portfolioOptions: { value: PortfolioScale; label: string }[] = [
  { value: "1_2", label: "1–2 concurrent projects" },
  { value: "3_5", label: "3–5 concurrent projects" },
  { value: "6_10", label: "6–10 concurrent projects" },
  { value: "over_10", label: "10+ concurrent projects" },
];

const disclosureOptions: { value: DisclosureStatus; label: string; description: string }[] = [
  { value: "named", label: "Named publisher", description: "Publisher relationship is publicly disclosed" },
  { value: "confidential", label: "Confidential", description: "Publisher exists but is under NDA / not yet announced" },
  { value: "self_published", label: "Self-published", description: "No external publisher" },
];

const scopeLabels: Record<ServiceScope, string> = {
  basic: "Basic",
  standard: "Standard",
  extensive: "Extensive",
};

export default function PublisherStep({ answers, onChange }: PublisherStepProps) {
  const publisherBacked = answers.q6_publisherBacked;

  const updateService = (id: string, field: "checked" | "scope", value: boolean | ServiceScope) => {
    const updated = answers.q10_services.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    onChange({ q10_services: updated });
  };

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-semibold text-gpcs-text">
        Publisher / Funder
      </h2>
      <p className="mb-6 text-sm text-gpcs-muted">
        Include all external parties providing funding or production support. If there&apos;s no
        external publisher or funder, select No below.
      </p>

      {/* Q6: Publisher gate */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gpcs-text">
          Q6. Is this project backed by an external publisher or funder?
        </p>
        <div className="flex gap-3">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => onChange({ q6_publisherBacked: val })}
              className={cn(
                "flex-1 rounded-lg border px-4 py-3 text-sm font-semibold transition-all cursor-pointer",
                publisherBacked === val
                  ? "border-gpcs-gold/60 bg-gpcs-gold/10 text-gpcs-gold"
                  : "border-white/10 bg-gpcs-slate/30 text-gpcs-silver hover:border-white/20"
              )}
            >
              {val ? "Yes" : "No — Self-published"}
            </button>
          ))}
        </div>
      </div>

      {/* Show remaining questions only if publisher-backed */}
      {publisherBacked === true && (
        <>
          <RadioCardGroup
            question="Q7. What is the publisher's development funding commitment?"
            options={fundingOptions}
            value={answers.q7_fundingCommitment}
            onChange={(v) => onChange({ q7_fundingCommitment: v })}
          />

          <RadioCardGroup
            question="Q8. What is the publisher's financial scale for this type of project?"
            options={financialScaleOptions}
            value={answers.q8_financialScale}
            onChange={(v) => onChange({ q8_financialScale: v })}
          />

          <RadioCardGroup
            question="Q9. What is the publisher's market reach?"
            options={marketReachOptions}
            value={answers.q9_marketReach}
            onChange={(v) => onChange({ q9_marketReach: v })}
          />

          {/* Q10: Services */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold text-gpcs-text">
              Q10. Which services does the publisher provide? (check all that apply)
            </p>
            <div className="space-y-2">
              {answers.q10_services.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "rounded-lg border p-3 transition-all",
                    service.checked
                      ? "border-gpcs-gold/30 bg-gpcs-gold/5"
                      : "border-white/10 bg-gpcs-slate/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`service-${service.id}`}
                      checked={service.checked}
                      onChange={(e) => updateService(service.id, "checked", e.target.checked)}
                      className="h-4 w-4 rounded border-gpcs-gold/40 bg-gpcs-slate accent-gpcs-gold cursor-pointer"
                    />
                    <label
                      htmlFor={`service-${service.id}`}
                      className="flex-1 text-sm text-gpcs-text cursor-pointer"
                    >
                      {service.label}
                    </label>
                    {service.checked && (
                      <div className="flex rounded overflow-hidden border border-white/10">
                        {(["basic", "standard", "extensive"] as ServiceScope[]).map((scope) => (
                          <button
                            key={scope}
                            type="button"
                            onClick={() => updateService(service.id, "scope", scope)}
                            className={cn(
                              "px-2 py-1 text-xs transition-colors cursor-pointer",
                              service.scope === scope
                                ? "bg-gpcs-gold/30 text-gpcs-gold"
                                : "bg-gpcs-slate/50 text-gpcs-muted hover:text-gpcs-silver"
                            )}
                          >
                            {scopeLabels[scope]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RadioCardGroup
            question="Q11. How many projects does the publisher manage concurrently?"
            options={portfolioOptions}
            value={answers.q11_portfolioScale}
            onChange={(v) => onChange({ q11_portfolioScale: v })}
            cols={2}
          />

          <RadioCardGroup
            question="Q12. Publisher disclosure status"
            options={disclosureOptions}
            value={answers.q12_disclosureStatus}
            onChange={(v) => onChange({ q12_disclosureStatus: v })}
            cols={3}
          />
        </>
      )}

      {publisherBacked === false && (
        <div className="rounded-lg border border-gpcs-gold/20 bg-gpcs-gold/5 p-4 text-sm text-gpcs-muted">
          <p className="font-medium text-gpcs-gold mb-1">Self-published path selected</p>
          <p>Your independence marker will be I0 (Fully Independent). Continue to the next step to confirm IP ownership and creative control.</p>
        </div>
      )}
    </div>
  );
}
