
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        glass: "2rem"
      },
      colors: {
        glass: "rgba(255,255,255,0.48)"
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.14)",
      },
      backdropBlur: {
        glass: "16px",
      },
      backgroundImage: {
        // cozy/hygge gradients
        'hygge-1': "linear-gradient(135deg, #f8fafc 0%, #fde7f9 40%, #dbeafe 100%)",
        'hygge-2': "linear-gradient(120deg, #fff7e2 0%, #e0c3fc 70%, #8ec5fc 100%)",
        'hygge-3': "linear-gradient(120deg, #f9e7fd 0%, #c2e9fb 100%)",
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-in-out',
        'pop': 'scale-in 0.15s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
