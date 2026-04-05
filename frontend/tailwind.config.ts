import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          deep: "#020617", // Slate 950 base
          video: "#081429", // Exact video edge match
        },
        legal: {
          gold: "#D4AF37", // Professional Brass/Old Gold
          "gold-light": "#F1D279",
        },
        slate: {
          950: "#020617",
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-libre)', 'serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
    },
  },
  plugins: [],
};
export default config;
