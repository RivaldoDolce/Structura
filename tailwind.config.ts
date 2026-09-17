import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/frontend/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Blueprint palette
        base: "#070B14",
        surface: "#0C1220",
        elevated: "#121A2C",
        steel: "#3B82F6",
        "steel-deep": "#1D4ED8",
        blueprint: "#22D3EE",
        safety: "#F59E0B",
        ink: "#F1F5F9",
        "ink-soft": "#94A3B8",
        "ink-muted": "#64748B",
        ok: "#10B981",
        danger: "#EF4444",
        whatsapp: "#25D366",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59, 130, 246, 0.15)",
        "glow-blueprint": "0 0 40px rgba(34, 211, 238, 0.15)",
        "glow-safety": "0 0 40px rgba(245, 158, 11, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        counter: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
