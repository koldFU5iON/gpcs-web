"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface RatingStartModalProps {
  onDismiss: (gameName: string) => void;
}

export default function RatingStartModal({ onDismiss }: RatingStartModalProps) {
  const [gameName, setGameName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const gameNameRef = useRef<string>(gameName);
  useEffect(() => { gameNameRef.current = gameName; }, [gameName]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss(gameNameRef.current.trim());
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onDismiss]);

  const handleDismiss = () => onDismiss(gameName.trim());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-modal-title"
        className="w-full max-w-md rounded-2xl border border-gpcs-gold/25 bg-gpcs-surface p-8 shadow-2xl"
      >
        {/* Icon */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-gpcs-gold/30 bg-gpcs-gold/10">
          <Clock size={20} className="text-gpcs-gold" />
        </div>

        {/* Heading */}
        <h2
          id="rating-modal-title"
          className="font-display text-xl font-bold text-gpcs-text mb-3"
        >
          Rate as of launch day, not today
        </h2>

        {/* Body */}
        <p className="text-sm text-gpcs-silver leading-relaxed mb-5">
          GPCS measures the resources a project had available <em>before</em> it shipped — not
          what the studio looks like now. Every question should be answered as it was true on
          the day the game launched its 1.0 release.
        </p>

        {/* Key points */}
        <ul className="space-y-3 mb-6">
          {[
            {
              label: "Already released?",
              body: "Answer based on team size, track record, and backing at 1.0 launch — ignore commercial results and growth that came after.",
            },
            {
              label: "Not yet released?",
              body: "Answer based on your current situation — that's your launch-day snapshot.",
            },
          ].map(({ label, body }) => (
            <li key={label} className="flex gap-3 text-sm">
              <span className="mt-0.5 text-gpcs-gold shrink-0">→</span>
              <span className="text-gpcs-silver">
                <span className="font-semibold text-gpcs-text">{label} </span>
                {body}
              </span>
            </li>
          ))}
        </ul>

        {/* Game name input */}
        <div className="mb-6">
          <label
            htmlFor="game-name-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gpcs-muted"
          >
            Game name <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            ref={inputRef}
            id="game-name-input"
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleDismiss(); }}
            placeholder="e.g. Hollow Knight"
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-sm text-gpcs-text placeholder:text-gpcs-muted focus:border-gpcs-gold/40 focus:outline-none transition-colors"
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleDismiss}
          className="w-full rounded-lg bg-gpcs-gold px-5 py-3 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors cursor-pointer"
        >
          Got it — start rating
        </button>
      </motion.div>
    </motion.div>
  );
}
