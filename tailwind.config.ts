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
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        text: "hsl(var(--color-text) / <alpha-value>)",
        textInverted: "hsl(var(--color-textInverted) / <alpha-value>)",
        accent: "hsl(var(--color-accent) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
