import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#070E1C",
          900: "#0B1528",
          850: "#0F1E38",
          800: "#142544",
          700: "#1E355D",
          600: "#2B487A",
        },
        teal: {
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
        },
        cyan: {
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
        },
      },
    },
  },
  plugins: [],
};
export default config;
