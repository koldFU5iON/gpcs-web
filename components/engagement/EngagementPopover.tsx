"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, MessageSquare, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "gpcs_engagement_v1";
const SUPPRESS_DAYS = 30;
const SCROLL_THRESHOLD = 0.6;

const EXCLUDED_PATHS = ["/about", "/rate"];

function isSuppressed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw) as { ts: number };
    return Date.now() - ts < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function suppress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }));
  } catch {
    // localStorage unavailable — silently skip
  }
}

export default function EngagementPopover() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [fired, setFired] = useState(false);

  const maybeShow = useCallback(() => {
    if (fired) return;
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (isSuppressed()) return;
    setFired(true);
    setVisible(true);
  }, [fired, pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      if (scrolled / total >= SCROLL_THRESHOLD) {
        maybeShow();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [maybeShow]);

  function dismiss() {
    suppress();
    setVisible(false);
  }

  function handleCta() {
    suppress();
    setVisible(false);
  }

  const ctaBase =
    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className={cn(
            "fixed bottom-6 left-6 z-50 w-[320px]",
            "rounded-xl overflow-hidden",
            "max-sm:left-3 max-sm:right-3 max-sm:w-auto"
          )}
          style={{
            background: "rgb(10, 14, 28)",
            border: "1px solid rgba(0, 200, 255, 0.35)",
            boxShadow:
              "0 0 0 1px rgba(0, 200, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 200, 255, 0.08)",
          }}
          role="dialog"
          aria-label="Engagement prompt"
        >
          {/* Cyan highlight bar */}
          <div
            className="h-[3px] w-full"
            style={{ background: "linear-gradient(90deg, #00C8FF, #3DD8FF, #00C8FF)" }}
          />

          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <p className="font-display font-semibold text-white text-sm leading-snug pr-2">
                Find GPCS interesting?
              </p>
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="text-white/40 hover:text-white/80 transition-colors shrink-0 -mt-0.5"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-white/55 mb-3 leading-relaxed">
              Here are a few ways to show it:
            </p>

            {/* CTAs */}
            <div className="space-y-1 mb-4">
              <a
                href="https://github.com/koldFU5iON/gpcs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCta}
                className={cn(ctaBase, "text-gpcs-gold hover:bg-gpcs-gold/10")}
              >
                <Star size={15} className="shrink-0" style={{ fill: "#00C8FF", color: "#00C8FF" }} />
                Star the repo
              </a>

              <a
                href="https://github.com/koldFU5iON/gpcs/discussions/new?category=ideas"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCta}
                className={cn(ctaBase, "text-gpcs-gold-light hover:bg-gpcs-gold-light/10")}
              >
                <MessageSquare size={15} className="shrink-0" />
                Suggest something
              </a>

              <a
                href="/about#contact"
                onClick={handleCta}
                className={cn(ctaBase, "text-white/70 hover:bg-white/5 hover:text-white")}
              >
                <Mail size={15} className="shrink-0" />
                Get in touch
              </a>
            </div>

            {/* Dismiss */}
            <div className="flex justify-end">
              <button
                onClick={dismiss}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
