import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Semantic tokens — resolved via CSS variables ───────────────
        "gpcs-bg":          "var(--gpcs-bg)",
        "gpcs-surface":     "var(--gpcs-surface)",
        "gpcs-surface-alt": "var(--gpcs-surface-alt)",
        "gpcs-border":      "var(--gpcs-border)",
        "gpcs-text":        "var(--gpcs-text)",
        "gpcs-silver":      "var(--gpcs-silver)",
        "gpcs-muted":       "var(--gpcs-muted)",
        // ── Keep legacy aliases for compatibility ──────────────────────
        "gpcs-navy":        "var(--gpcs-bg)",
        "gpcs-slate":       "var(--gpcs-surface)",
        "gpcs-slate-light": "var(--gpcs-surface-alt)",
        // ── Primary accent ─────────────────────────────────────────────
        "gpcs-gold":        "#00C8FF",
        "gpcs-gold-light":  "#3DD8FF",
        // ── Tier colors — vivid, same in both themes ───────────────────
        "tier-aaa": "#FFD700",
        "tier-aa":  "#FF6600",
        "tier-a":   "#00C8FF",
        "tier-bbb": "#00E676",
        "tier-bb":  "#CF40FF",
        "tier-b":   "#FF4081",
        "tier-c":   "#607080",
      },
      fontFamily: {
        display: ["var(--font-display)", "'Lexend'", "sans-serif"],
        sans:    ["var(--font-body)", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in":  "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: {
        gpcs: {
          css: {
            "--tw-prose-body":          "var(--gpcs-silver)",
            "--tw-prose-headings":      "var(--gpcs-text)",
            "--tw-prose-links":         "#00C8FF",
            "--tw-prose-bold":          "var(--gpcs-text)",
            "--tw-prose-counters":      "var(--gpcs-muted)",
            "--tw-prose-bullets":       "var(--gpcs-muted)",
            "--tw-prose-hr":            "var(--gpcs-border)",
            "--tw-prose-quotes":        "#00C8FF",
            "--tw-prose-quote-borders": "#00C8FF",
            "--tw-prose-captions":      "var(--gpcs-muted)",
            "--tw-prose-code":          "var(--gpcs-text)",
            "--tw-prose-pre-code":      "var(--gpcs-silver)",
            "--tw-prose-pre-bg":        "var(--gpcs-surface)",
            "--tw-prose-th-borders":    "var(--gpcs-border)",
            "--tw-prose-td-borders":    "var(--gpcs-surface)",
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
