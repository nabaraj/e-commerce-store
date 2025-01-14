import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    {
      pattern: /grid-cols-./
    },
    {
      pattern: /border/
    },
    {
      pattern: /gap-/
    },
    {
      pattern: /bg-/
    },
    {
      pattern: /col-end-/
    },
    { pattern: /row-span-/ },
    { pattern: /col-span-/ }
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      }
    }
  },
  plugins: []
} satisfies Config;
