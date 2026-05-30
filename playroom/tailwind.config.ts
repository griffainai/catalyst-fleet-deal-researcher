import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // CATALYST palette — industrial / blueprint / instrument-panel
        steel: {
          DEFAULT: "#1E2D3D", // primary dark — headers, borders, buttons
          ink: "#14202E", //     near-black blue — text primary
          900: "#14202E",
          800: "#1E2D3D",
          700: "#2B3D52",
          muted: "#5C7088", //   text secondary
          soft: "#8194A8", //    text tertiary
        },
        canvas: {
          DEFAULT: "#EAEEF2", //  primary background — cool blueprint paper
          panel: "#F4F7FA", //    panels
          card: "#FFFFFF", //     cards / message bg
          line: "#D3DBE3", //     hairlines
        },
        // The catalyst signal — the spark that makes NOW different
        amber: {
          DEFAULT: "#F2A30F",
          deep: "#C97E08",
          soft: "#FCE8C4",
        },
        // Source-tier "lie detector" colors
        tier: {
          t1: "#1F8A5B", //  Hard — state plainly
          t2: "#D08A0A", //  Decaying — date-stamp + re-check
          t3: "#D14A28", //  Contested — withhold the number
          t4: "#4A6E9E", //  Inferred — label the guess
        },
        signal: {
          hot: "#D14A28", //   HOT band
          warm: "#E8851E", //  WARM band
          watch: "#C7A20A", // WATCH band
          cold: "#5C7088", //  COLD band
          kill: "#B23030", //  kill-condition red
          blueprint: "#2F6BD3",
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "JetBrains Mono", "Consolas", "monospace"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Hard industrial offset shadows — steel
        steel: "4px 4px 0px 0px rgba(20, 32, 46, 0.92)",
        "steel-sm": "2px 2px 0px 0px rgba(20, 32, 46, 0.92)",
        "steel-lift": "6px 6px 0px 0px rgba(20, 32, 46, 0.92)",
        "steel-soft": "0px 6px 18px rgba(20, 32, 46, 0.14)",
        amber: "4px 4px 0px 0px #C97E08",
      },
      borderWidth: {
        "3": "3px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        display: "-0.045em",
      },
    },
  },
  plugins: [],
};

export default config;
