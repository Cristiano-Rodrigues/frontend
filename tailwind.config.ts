import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        veryDarkGray: "#1E1E1E",
        lightestGray: "#F1F1F1",
        mediumLightGray: "#E4E4E4",
        darkGray: "#656565",
        "primary-100": "#5EBA24",
        "primary-25": "rgba(108, 231, 31, .25)",
        secondary: "#568ED0"
      }
    },
  },
  plugins: [],
};
export default config;
