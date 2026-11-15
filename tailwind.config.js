/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nc: {
          bg: '#17102A',
          'bg-deep': '#0F0A1C',
          surface: '#22183B',
          'surface-raised': '#2B1E4A',
          'surface-subtle': '#1D1433',
          border: '#3A2E5C',
          'border-subtle': '#2B2144',
          'border-focus': '#FFB547',
          text: '#F3EEFF',
          'text-muted': '#A99CCB',
          'text-dim': '#7C6F9B',
          accent: '#FFB547',
          'accent-hover': '#FFA31A',
          'accent-subtle': 'rgba(255, 181, 71, 0.12)',
        },
        role: {
          build: '#38BDF8',
          'build-bg': 'rgba(56, 189, 248, 0.12)',
          'build-border': 'rgba(56, 189, 248, 0.3)',
          design: '#F472B6',
          'design-bg': 'rgba(244, 114, 182, 0.12)',
          'design-border': 'rgba(244, 114, 182, 0.3)',
          business: '#FBBF24',
          'business-bg': 'rgba(251, 191, 36, 0.12)',
          'business-border': 'rgba(251, 191, 36, 0.3)',
          research: '#2DD4BF',
          'research-bg': 'rgba(45, 212, 191, 0.12)',
          'research-border': 'rgba(45, 212, 191, 0.3)',
        }
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        'nc-lg': '16px',
        'nc-xl': '24px',
        'nc-full': '9999px',
      },
      boxShadow: {
        'glow-accent': '0 0 25px -5px rgba(255, 181, 71, 0.3)',
        'glow-card': '0 8px 30px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}
