const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      transitionProperty: {
        width: 'width'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'slide-fwd-center': {
          '0%': {
              transform: 'translateZ(0)'
          },
          to: {
              transform: 'translateZ(160px)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in': 'slideIn 0.35s ease-in-out 0.5s forwards',
        'slide-in-sec': 'slideInSec 0.35s ease-in-out 0.5s forwards',
        'typing': 'typing-pulse 1.35s steps(1, end) infinite',
        'gradient-dynamic': 'gradient 10s ease infinite',
        'tracking-in-expand': 'trackingInExpand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both',
        'scale-up-center': 'scaleUpCenter 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both'
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideInSec: {
          '0%': {
            opacity: 0,
            transform: 'translate(-50%, calc(-50% - 20px))'
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%, -50%)'
          }
        },
        dashedLine: {
          '0%': {
            opacirty: 1
          },
          '100%': {
            opacity: 0
          }
        },
        trackingInExpand: {
          '0%': {
              'letter-spacing': '-.5em',
              opacity: '0'
          },
          '40%': {
              opacity: '.6'
          },
          to: {
              opacity: '1'
          }
        },
        scaleUpCenter: {
          '0%': {
              transform: 'scale(.5)'
          },
          to: {
              transform: 'scale(1)'
          }
        }
      },
    },
    plugins: [
      require('tailwindcss-animation-delay'),
      require('tailwindcss-elevation')(
        {
          color: '77,192,181',
          opacityBoost: '0.23'
        }
      )
    ],
  }
}
