import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Base surfaces ──────────────────────────────────────────────
        "gpcs-navy":        "#0A0A0F",  // near-black body bg
        "gpcs-slate":       "#131320",  // card / panel surface
        "gpcs-slate-light": "#1C1C2C",  // elevated / nav surface
        // ── Primary accent — electric cyan ─────────────────────────────
        "gpcs-gold":        "#00C8FF",  // primary accent (cyan)
        "gpcs-gold-light":  "#3DD8FF",  // hover state
        // ── Text scale ─────────────────────────────────────────────────
        "gpcs-text":        "#F0F0FA",  // primary text
        "gpcs-silver":      "#8888AA",  // secondary / supporting
        "gpcs-muted":       "#55557A",  // muted / placeholder
        // ── Tier colors — vivid and distinct ───────────────────────────
        "tier-aaa": "#FFD700",  // bright gold  — legendary
        "tier-aa":  "#FF6600",  // vivid orange — elite
        "tier-a":   "#00C8FF",  // electric cyan — strong (matches primary)
        "tier-bbb": "#00E676",  // neon green   — solid
        "tier-bb":  "#CF40FF",  // vivid purple — mid
        "tier-b":   "#FF4081",  // vivid pink   — rising
        "tier-c":   "#607080",  // muted slate  — entry
      },
      fontFamily: {
        display: ["var(--font-display)", "'Russo One'", "sans-serif"],
        sans:    ["var(--font-body)",    "'Inter'", "system-ui", "sans-serif"],
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
            "--tw-prose-body":          "#B8B8D0",
            "--tw-prose-headings":      "#F0F0FA",
            "--tw-prose-links":         "#00C8FF",
            "--tw-prose-bold":          "#F0F0FA",
            "--tw-prose-counters":      "#8888AA",
            "--tw-prose-bullets":       "#8888AA",
            "--tw-prose-hr":            "#1C1C2C",
            "--tw-prose-quotes":        "#00C8FF",
            "--tw-prose-quote-borders": "#00C8FF",
            "--tw-prose-captions":      "#8888AA",
            "--tw-prose-code":          "#F0F0FA",
            "--tw-prose-pre-code":      "#B8B8D0",
            "--tw-prose-pre-bg":        "#131320",
            "--tw-prose-th-borders":    "#1C1C2C",
            "--tw-prose-td-borders":    "#131320",
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
