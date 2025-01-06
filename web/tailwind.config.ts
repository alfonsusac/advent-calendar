import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(15,15,15)",
        background2: "rgba(40,40,45)",
        foreground: "rgba(230,230,240)",
        "code-string": "hsl(164, 100, 80)",
        "code-keyword": "hsl(0, 0, 63)",
        "code-method": "hsl(27, 100, 80)",
        "code-identifier": "hsl(0, 0, 100)",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
