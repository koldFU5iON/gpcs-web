"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FormAnswers, CalculationResult } from "@/lib/gpcs/types";
import { defaultFormAnswers } from "@/lib/gpcs/types";
import { calculateRating } from "@/lib/gpcs/scoring";
import StudioStep from "./steps/StudioStep";
import PublisherStep from "./steps/PublisherStep";
import OtherStep from "./steps/OtherStep";
import RatingResult from "./RatingResult";

const STEPS = [
  { id: "studio", label: "Your Studio", description: "Team size, infrastructure, track record" },
  { id: "publisher", label: "Publisher / Funder", description: "Backing, funding, services" },
  { id: "independence", label: "Independence & Other", description: "IP, creative control, grants" },
];

function isStudioStepComplete(answers: FormAnswers): boolean {
  return !!(
    answers.q1_teamSize &&
    answers.q2_infrastructure &&
    answers.q3_trackRecord &&
    answers.q4_financialHealth &&
    answers.q5_geographicFootprint
  );
}

function isPublisherStepComplete(answers: FormAnswers): boolean {
  if (answers.q6_publisherBacked === null) return false;
  if (answers.q6_publisherBacked === false) return true;
  return !!(
    answers.q7_fundingCommitment &&
    answers.q8_financialScale &&
    answers.q9_marketReach &&
    answers.q11_portfolioScale &&
    answers.q12_disclosureStatus
  );
}

function isOtherStepComplete(answers: FormAnswers): boolean {
  return !!(answers.q13_ipOwnership);
}

export default function RatingForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FormAnswers>(defaultFormAnswers);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [direction, setDirection] = useState(1);

  const updateAnswers = (updates: Partial<FormAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...updates }));
  };

  const canAdvance = [
    isStudioStepComplete(answers),
    isPublisherStepComplete(answers),
    isOtherStepComplete(answers),
  ][step];

  const goNext = () => {
    if (!canAdvance) return;
    if (step === STEPS.length - 1) {
      const rating = calculateRating(answers);
      setResult(rating);
    } else {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setAnswers(defaultFormAnswers);
    setResult(null);
    setStep(0);
  };

  if (result) {
    return <RatingResult result={result} onReset={reset} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className="flex flex-1 flex-col items-center"
            >
              <div className="relative flex items-center w-full">
                {/* Connector line left */}
                {i > 0 && (
                  <div
                    className="h-px flex-1 transition-colors duration-300"
                    style={{
                      background: i <= step ? "#00C8FF60" : "rgba(255,255,255,0.1)",
                    }}
                  />
                )}
                {/* Step dot */}
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300"
                  style={{
                    borderColor: i <= step ? "#00C8FF" : "rgba(255,255,255,0.15)",
                    background: i < step ? "#00C8FF" : i === step ? "#00C8FF20" : "transparent",
                    color: i <= step ? "#00C8FF" : "#55557A",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                {/* Connector line right */}
                {i < STEPS.length - 1 && (
                  <div
                    className="h-px flex-1 transition-colors duration-300"
                    style={{
                      background: i < step ? "#00C8FF60" : "rgba(255,255,255,0.1)",
                    }}
                  />
                )}
              </div>
              <span className={`mt-1.5 text-xs text-center ${i === step ? "text-gpcs-gold" : "text-gpcs-muted"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {step === 0 && <StudioStep answers={answers} onChange={updateAnswers} />}
          {step === 1 && <PublisherStep answers={answers} onChange={updateAnswers} />}
          {step === 2 && <OtherStep answers={answers} onChange={updateAnswers} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-gpcs-silver hover:border-white/30 hover:text-gpcs-text disabled:cursor-not-allowed disabled:opacity-30 transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <span className="text-xs text-gpcs-muted">
          Step {step + 1} of {STEPS.length}
        </span>

        <button
          type="button"
          onClick={goNext}
          disabled={!canAdvance}
          className="flex items-center gap-2 rounded-lg bg-gpcs-gold px-5 py-2.5 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light disabled:cursor-not-allowed disabled:opacity-40 transition-colors cursor-pointer"
        >
          {step === STEPS.length - 1 ? "Calculate Rating" : "Next"}
          {step < STEPS.length - 1 && <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}
