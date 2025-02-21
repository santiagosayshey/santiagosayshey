import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Add this line
  theme: {
    extend: {
      colors: {
        // Terminal specific colors
        terminal: {
          light: {
            bg: "#f0f0f0",
            button: "#3a3a3a",
            "button-hover": "#444444",
            text: "#4a4a4a",
          },
          dark: {
            bg: "#1e1e1e",
            button: "#2a2a2a",
            "button-hover": "#333333",
            text: "#d1d1d1",
          },
        },
        // Your existing colors
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
