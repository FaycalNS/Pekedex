import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const colors = {
  pokemon: {
    normal: "#A8A87B",
    water: "#559EDF",
    fire: "#EE803B",
    grass: "#88BE5D",
    electric: "#F7CF43",
    ice: "#9AD8D8",
    fighting: "#BE322E",
    poison: "#B563CE",
    ground: "#DFBF6E",
    flying: "#A893ED",
    psychic: "#EC5C89",
    bug: "#A8B732",
    rock: "#B89F41",
    ghost: "#705A97",
    dark: "#705849",
    dragon: "#7043F4",
    steel: "#B8B9CF",
    fairy: "#EFB7BD",
  },
};
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern:
        /^bg-pokemon-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)$/,
    },
    {
      pattern:
        /^text-pokemon-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)$/,
    },
    {
      pattern:
        /^stroke-pokemon-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)$/,
    },
    {
      pattern: /^border-(themeMainColor)$/,
    },
    {
      pattern: /^w-/,
    },
    {
      pattern: /^h-/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        themeMainColor: "#FE5858",
        themeBgColor: "#ff5754",
        themeBorder: "#585858",
        themeTextColor: "#767676",
        themeeTitleColor: "#4F4F4F",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        pokemon: colors.pokemon,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        DEFAULT: "1px",
        "0": "0",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "6": "6px",
        "8": "8px",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
    plugin(function ({ addBase }) {
      addBase({
        ":root": Object.fromEntries(
          Object.entries(colors.pokemon).map(([type, color]) => [
            `--pokemon-${type}`,
            color,
          ])
        ),
      });
      addBase({
        '[data-state="active"]': {
          "background-color": "var(--pokemon-color)",
          color: "white",
        },
      });
    }),
  ],
};
export default config;
