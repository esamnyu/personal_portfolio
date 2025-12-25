/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      fontFamily: {
        'display': ['Syne', 'system-ui', 'sans-serif'],
        'body': ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Luxury color palette
        'luxury': {
          'bg': '#0a0a0b',
          'surface': '#111113',
          'elevated': '#18181b',
          'text': '#f5f2eb',
          'muted': '#a8a29e',
          'subtle': '#6b6660',
          'gold': '#c9a962',
          'warm': '#e8d5b7',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shimmer-gold": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "breathe": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer-gold": "shimmer-gold 8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float-subtle": "float-subtle 6s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
