import type { Config } from "tailwindcss";

const config = {
  //darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./public/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /*
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          "050": "hsl(var(--neutral-050) / <alpha-value>)",
          "100": "hsl(var(--neutral-100) / <alpha-value>)",
          "200": "hsl(var(--neutral-200) / <alpha-value>)",
          "300": "hsl(var(--neutral-300) / <alpha-value>)",
          "400": "hsl(var(--neutral-400) / <alpha-value>)",
          "500": "hsl(var(--neutral-500) / <alpha-value>)",
          "600": "hsl(var(--neutral-600) / <alpha-value>)",
          "700": "hsl(var(--neutral-700) / <alpha-value>)",
          "800": "hsl(var(--neutral-800) / <alpha-value>)",
          "900": "hsl(var(--neutral-900) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          "050": "hsl(var(--secondary-050) / <alpha-value>)",
          "100": "hsl(var(--secondary-100) / <alpha-value>)",
          "200": "hsl(var(--secondary-200) / <alpha-value>)",
          "300": "hsl(var(--secondary-300) / <alpha-value>)",
          "400": "hsl(var(--secondary-400) / <alpha-value>)",
          "500": "hsl(var(--secondary-500) / <alpha-value>)",
          "600": "hsl(var(--secondary-600) / <alpha-value>)",
          "700": "hsl(var(--secondary-700) / <alpha-value>)",
          "800": "hsl(var(--secondary-800) / <alpha-value>)",
          "900": "hsl(var(--secondary-900) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral: {
          "050": "hsl(var(--neutral-050) / <alpha-value>)",
          "100": "hsl(var(--neutral-100) / <alpha-value>)",
          "200": "hsl(var(--neutral-200) / <alpha-value>)",
          "300": "hsl(var(--neutral-300) / <alpha-value>)",
          "400": "hsl(var(--neutral-400) / <alpha-value>)",
          "500": "hsl(var(--neutral-500) / <alpha-value>)",
          "600": "hsl(var(--neutral-600) / <alpha-value>)",
          "700": "hsl(var(--neutral-700) / <alpha-value>)",
          "800": "hsl(var(--neutral-800) / <alpha-value>)",
          "900": "hsl(var(--neutral-900) / <alpha-value>)",
        },
        success: {
          "050": "hsl(var(--success-050) / <alpha-value>)",
          "100": "hsl(var(--success-100) / <alpha-value>)",
          "200": "hsl(var(--success-200) / <alpha-value>)",
          "300": "hsl(var(--success-300) / <alpha-value>)",
          "400": "hsl(var(--success-400) / <alpha-value>)",
          "500": "hsl(var(--success-500) / <alpha-value>)",
          "600": "hsl(var(--success-600) / <alpha-value>)",
          "700": "hsl(var(--success-700) / <alpha-value>)",
          "800": "hsl(var(--success-800) / <alpha-value>)",
          "900": "hsl(var(--success-900) / <alpha-value>)",
        },
        error: {
          "050": "hsl(var(--error-050) / <alpha-value>)",
          "100": "hsl(var(--error-100) / <alpha-value>)",
          "200": "hsl(var(--error-200) / <alpha-value>)",
          "300": "hsl(var(--error-300) / <alpha-value>)",
          "400": "hsl(var(--error-400) / <alpha-value>)",
          "500": "hsl(var(--error-500) / <alpha-value>)",
          "600": "hsl(var(--error-600) / <alpha-value>)",
          "700": "hsl(var(--error-700) / <alpha-value>)",
          "800": "hsl(var(--error-800) / <alpha-value>)",
          "900": "hsl(var(--error-900) / <alpha-value>)",
        },
        warning: {
          "050": "hsl(var(--warning-050) / <alpha-value>)",
          "100": "hsl(var(--warning-100) / <alpha-value>)",
          "200": "hsl(var(--warning-200) / <alpha-value>)",
          "300": "hsl(var(--warning-300) / <alpha-value>)",
          "400": "hsl(var(--warning-400) / <alpha-value>)",
          "500": "hsl(var(--warning-500) / <alpha-value>)",
          "600": "hsl(var(--warning-600) / <alpha-value>)",
          "700": "hsl(var(--warning-700) / <alpha-value>)",
          "800": "hsl(var(--warning-800) / <alpha-value>)",
          "900": "hsl(var(--warning-900) / <alpha-value>)",
        },
      },
      */
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
