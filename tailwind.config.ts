import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
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
