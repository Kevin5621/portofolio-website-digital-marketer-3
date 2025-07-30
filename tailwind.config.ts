import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    /* =======================================
       DESIGN SYSTEM INTEGRATION
       Base scales from CSS custom properties
       ======================================= */
    
    /* === SPACING SCALE === */
    spacing: {
      0: "var(--spacing-0)",
      1: "var(--spacing-1)",
      2: "var(--spacing-2)",
      3: "var(--spacing-3)",
      4: "var(--spacing-4)",
      5: "var(--spacing-5)",
      6: "var(--spacing-6)",
      7: "var(--spacing-7)",
      8: "var(--spacing-8)",
      9: "var(--spacing-9)",
      10: "var(--spacing-10)",
      11: "var(--spacing-11)",
      12: "var(--spacing-12)",
      14: "var(--spacing-14)",
      16: "var(--spacing-16)",
      20: "var(--spacing-20)",
      24: "var(--spacing-24)",
      28: "var(--spacing-28)",
      32: "var(--spacing-32)",
      36: "var(--spacing-36)",
      40: "var(--spacing-40)",
      44: "var(--spacing-44)",
      48: "var(--spacing-48)",
      52: "var(--spacing-52)",
      56: "var(--spacing-56)",
      60: "var(--spacing-60)",
      64: "var(--spacing-64)",
      72: "var(--spacing-72)",
      80: "var(--spacing-80)",
      96: "var(--spacing-96)",
    },

    /* === TYPOGRAPHY SCALE === */
    fontSize: {
      xs: ["var(--font-size-xs)", { lineHeight: "var(--line-height-normal)" }],
      sm: ["var(--font-size-sm)", { lineHeight: "var(--line-height-normal)" }],
      base: ["var(--font-size-base)", { lineHeight: "var(--line-height-normal)" }],
      lg: ["var(--font-size-lg)", { lineHeight: "var(--line-height-normal)" }],
      xl: ["var(--font-size-xl)", { lineHeight: "var(--line-height-snug)" }],
      "2xl": ["var(--font-size-2xl)", { lineHeight: "var(--line-height-snug)" }],
      "3xl": ["var(--font-size-3xl)", { lineHeight: "var(--line-height-tight)" }],
      "4xl": ["var(--font-size-4xl)", { lineHeight: "var(--line-height-tight)" }],
      "5xl": ["var(--font-size-5xl)", { lineHeight: "var(--line-height-tight)" }],
      "6xl": ["var(--font-size-6xl)", { lineHeight: "var(--line-height-tight)" }],
      "7xl": ["var(--font-size-7xl)", { lineHeight: "var(--line-height-tight)" }],
      "8xl": ["var(--font-size-8xl)", { lineHeight: "var(--line-height-none)" }],
      "9xl": ["var(--font-size-9xl)", { lineHeight: "var(--line-height-none)" }],
    },

    fontWeight: {
      thin: "var(--font-weight-thin)",
      extralight: "var(--font-weight-extralight)",
      light: "var(--font-weight-light)",
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
      bold: "var(--font-weight-bold)",
      extrabold: "var(--font-weight-extrabold)",
      black: "var(--font-weight-black)",
    },

    lineHeight: {
      none: "var(--line-height-none)",
      tight: "var(--line-height-tight)",
      snug: "var(--line-height-snug)",
      normal: "var(--line-height-normal)",
      relaxed: "var(--line-height-relaxed)",
      loose: "var(--line-height-loose)",
    },

    /* === FONT FAMILY === */
    fontFamily: {
      'poppins': ['var(--font-poppins)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      'sans': ['var(--font-poppins)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
    },

    /* === BORDER RADIUS SCALE === */
    borderRadius: {
      none: "var(--radius-none)",
      xs: "var(--radius-xs)",
      sm: "var(--radius-sm)",
      DEFAULT: "var(--radius-base)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      "2xl": "var(--radius-2xl)",
      "3xl": "var(--radius-3xl)",
      full: "var(--radius-full)",
    },

    /* === SHADOW SCALE === */
    boxShadow: {
      xs: "var(--shadow-xs)",
      sm: "var(--shadow-sm)",
      DEFAULT: "var(--shadow-base)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
      xl: "var(--shadow-xl)",
      "2xl": "var(--shadow-2xl)",
      inner: "var(--shadow-inner)",
      none: "none",
    },

    /* === Z-INDEX SCALE === */
    zIndex: {
      hide: "var(--z-index-hide)",
      auto: "var(--z-index-auto)",
      base: "var(--z-index-base)",
      docked: "var(--z-index-docked)",
      dropdown: "var(--z-index-dropdown)",
      sticky: "var(--z-index-sticky)",
      banner: "var(--z-index-banner)",
      overlay: "var(--z-index-overlay)",
      modal: "var(--z-index-modal)",
      popover: "var(--z-index-popover)",
      skiplink: "var(--z-index-skiplink)",
      toast: "var(--z-index-toast)",
      tooltip: "var(--z-index-tooltip)",
      max: "var(--z-index-max)",
    },

    extend: {
      /* =======================================
         SEMANTIC COLOR SYSTEM
         Professional semantic naming for maintainability
         ======================================= */
      colors: {
        /* === BRAND COLORS === */
        brand: {
          50: "hsl(220 100% 97%)",      // Ultra light brand
          100: "hsl(220 95% 93%)",      // Very light brand
          200: "hsl(221 87% 86%)",      // Light brand
          300: "hsl(222 78% 77%)",      // Soft brand
          400: "hsl(223 69% 67%)",      // Medium light brand
          500: "hsl(224 60% 57%)",      // Base brand
          600: "hsl(225 57% 47%)",      // Medium dark brand
          700: "hsl(226 54% 37%)",      // Dark brand
          800: "hsl(227 51% 27%)",      // Very dark brand
          900: "hsl(228 48% 17%)",      // Ultra dark brand
          950: "hsl(229 45% 12%)",      // Deepest brand
          DEFAULT: "hsl(224 60% 57%)",  // Default brand
        },

        accent: {
          50: "hsl(270 100% 97%)",      // Ultra light accent
          100: "hsl(270 95% 93%)",      // Very light accent
          200: "hsl(271 87% 86%)",      // Light accent
          300: "hsl(272 78% 77%)",      // Soft accent
          400: "hsl(273 69% 67%)",      // Medium light accent
          500: "hsl(274 60% 57%)",      // Base accent
          600: "hsl(275 57% 47%)",      // Medium dark accent
          700: "hsl(276 54% 37%)",      // Dark accent
          800: "hsl(277 51% 27%)",      // Very dark accent
          900: "hsl(278 48% 17%)",      // Ultra dark accent
          950: "hsl(279 45% 12%)",      // Deepest accent
          DEFAULT: "hsl(274 60% 57%)",  // Default accent
        },

        neutral: {
          50: "hsl(210 20% 98%)",       // Ultra light neutral
          100: "hsl(210 15% 95%)",      // Very light neutral
          200: "hsl(210 12% 90%)",      // Light neutral
          300: "hsl(210 10% 82%)",      // Soft neutral
          400: "hsl(210 8% 64%)",       // Medium light neutral
          500: "hsl(210 6% 46%)",       // Base neutral
          600: "hsl(210 8% 34%)",       // Medium dark neutral
          700: "hsl(210 10% 24%)",      // Dark neutral
          800: "hsl(210 12% 16%)",      // Very dark neutral
          900: "hsl(210 15% 10%)",      // Ultra dark neutral
          950: "hsl(210 20% 6%)",       // Deepest neutral
          DEFAULT: "hsl(210 6% 46%)",   // Default neutral
        },

        /* === STATE COLORS === */
        success: {
          50: "hsl(142 76% 96%)",       // Ultra light success
          100: "hsl(142 71% 91%)",      // Very light success
          200: "hsl(143 68% 83%)",      // Light success
          300: "hsl(144 65% 72%)",      // Soft success
          400: "hsl(145 62% 58%)",      // Medium light success
          500: "hsl(146 59% 44%)",      // Base success
          600: "hsl(147 56% 35%)",      // Medium dark success
          700: "hsl(148 53% 27%)",      // Dark success
          800: "hsl(149 50% 20%)",      // Very dark success
          900: "hsl(150 47% 15%)",      // Ultra dark success
          950: "hsl(151 44% 10%)",      // Deepest success
          DEFAULT: "hsl(146 59% 44%)",  // Default success
        },

        warning: {
          50: "hsl(48 100% 96%)",       // Ultra light warning
          100: "hsl(48 96% 89%)",       // Very light warning
          200: "hsl(48 92% 76%)",       // Light warning
          300: "hsl(46 88% 62%)",       // Soft warning
          400: "hsl(43 84% 50%)",       // Medium light warning
          500: "hsl(38 92% 50%)",       // Base warning
          600: "hsl(32 95% 44%)",       // Medium dark warning
          700: "hsl(26 90% 37%)",       // Dark warning
          800: "hsl(23 83% 31%)",       // Very dark warning
          900: "hsl(22 78% 26%)",       // Ultra dark warning
          950: "hsl(21 74% 15%)",       // Deepest warning
          DEFAULT: "hsl(38 92% 50%)",   // Default warning
        },

        error: {
          50: "hsl(0 86% 97%)",         // Ultra light error
          100: "hsl(0 93% 94%)",        // Very light error
          200: "hsl(0 96% 89%)",        // Light error
          300: "hsl(0 94% 82%)",        // Soft error
          400: "hsl(0 91% 71%)",        // Medium light error
          500: "hsl(0 84% 60%)",        // Base error
          600: "hsl(0 72% 51%)",        // Medium dark error
          700: "hsl(0 74% 42%)",        // Dark error
          800: "hsl(0 70% 35%)",        // Very dark error
          900: "hsl(0 63% 31%)",        // Ultra dark error
          950: "hsl(0 75% 18%)",        // Deepest error
          DEFAULT: "hsl(0 84% 60%)",    // Default error
        },

        info: {
          50: "hsl(204 100% 97%)",      // Ultra light info
          100: "hsl(204 94% 94%)",      // Very light info
          200: "hsl(201 94% 86%)",      // Light info
          300: "hsl(199 95% 74%)",      // Soft info
          400: "hsl(198 93% 60%)",      // Medium light info
          500: "hsl(198 100% 46%)",     // Base info
          600: "hsl(200 98% 39%)",      // Medium dark info
          700: "hsl(201 96% 32%)",      // Dark info
          800: "hsl(201 90% 27%)",      // Very dark info
          900: "hsl(202 80% 24%)",      // Ultra dark info
          950: "hsl(202 80% 16%)",      // Deepest info
          DEFAULT: "hsl(198 100% 46%)", // Default info
        },

        /* === SEMANTIC TOKENS === */
        // Surface colors (for backgrounds)
        surface: {
          DEFAULT: "hsl(var(--color-surface-default, 0 0% 100%))",
          background: "hsl(var(--color-surface-background, 0 0% 100%))",
          card: "hsl(var(--color-surface-card, 0 0% 100%))",
          secondary: "hsl(var(--color-surface-secondary, 210 20% 98%))",
          tertiary: "hsl(var(--color-surface-tertiary, 210 15% 95%))",
          inverse: "hsl(var(--color-surface-inverse, 210 15% 10%))",
        },

        // Content colors (for text)
        content: {
          DEFAULT: "hsl(var(--color-content-default, 210 15% 10%))",
          primary: "hsl(var(--color-content-primary, 210 15% 10%))",
          secondary: "hsl(var(--color-content-secondary, 210 8% 34%))",
          tertiary: "hsl(var(--color-content-tertiary, 210 6% 46%))",
          inverse: "hsl(var(--color-content-inverse, 0 0% 100%))",
          disabled: "hsl(var(--color-content-disabled, 210 8% 64%))",
          link: "hsl(var(--color-content-link, 224 60% 57%))",
        },

        // Interactive colors (for buttons, links, etc.)
        interactive: {
          DEFAULT: "hsl(var(--color-interactive-primary, 224 60% 57%))",
          primary: "hsl(var(--color-interactive-primary, 224 60% 57%))",
          secondary: "hsl(var(--color-interactive-secondary, 220 100% 97%))",
          hover: "hsl(var(--color-interactive-hover, 225 57% 47%))",
          active: "hsl(var(--color-interactive-active, 226 54% 37%))",
          disabled: "hsl(var(--color-interactive-disabled, 210 8% 64%))",
          focus: "hsl(var(--color-interactive-primary, 224 60% 57%))",
        },

        // Border colors
        border: {
          DEFAULT: "hsl(var(--color-border-default, 210 12% 90%))",
          primary: "hsl(var(--color-border-primary, 210 12% 90%))",
          secondary: "hsl(var(--color-border-secondary, 210 10% 82%))",
          focus: "hsl(var(--color-interactive-primary, 224 60% 57%))",
          error: "hsl(var(--color-state-error, 0 84% 60%))",
          success: "hsl(var(--color-state-success, 146 59% 44%))",
        },

        // Input colors
        input: {
          DEFAULT: "hsl(var(--color-input-default, 0 0% 100%))",
          border: "hsl(var(--color-input-border, 210 12% 90%))",
          placeholder: "hsl(var(--color-input-placeholder, 210 6% 46%))",
          focus: "hsl(var(--color-interactive-primary, 224 60% 57%))",
        },

        // State colors
        state: {
          success: "hsl(var(--color-state-success, 146 59% 44%))",
          warning: "hsl(var(--color-state-warning, 38 92% 50%))",
          error: "hsl(var(--color-state-error, 0 84% 60%))",
          info: "hsl(var(--color-state-info, 198 100% 46%))",
        },

        // Legacy compatibility mappings (to be gradually migrated)
        background: "hsl(var(--color-surface-background, 0 0% 100%))",
        foreground: "hsl(var(--color-content-primary, 210 15% 10%))",
        card: {
          DEFAULT: "hsl(var(--color-surface-card, 0 0% 100%))",
          foreground: "hsl(var(--color-content-primary, 210 15% 10%))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-surface-card, 0 0% 100%))",
          foreground: "hsl(var(--color-content-primary, 210 15% 10%))",
        },
        primary: {
          DEFAULT: "hsl(var(--color-interactive-primary, 224 60% 57%))",
          foreground: "hsl(var(--color-content-inverse, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-interactive-secondary, 220 100% 97%))",
          foreground: "hsl(var(--color-interactive-primary, 224 60% 57%))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-surface-tertiary, 210 15% 95%))",
          foreground: "hsl(var(--color-content-tertiary, 210 6% 46%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-state-error, 0 84% 60%))",
          foreground: "hsl(var(--color-content-inverse, 0 0% 100%))",
        },
        ring: "hsl(var(--color-interactive-primary, 224 60% 57%))",
      },

      /* === ANIMATION & TRANSITIONS === */
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },

      /* === ADDITIONAL UTILITIES === */
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "ease-in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },

      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
    },
  },
  plugins: [
    // Custom plugin for additional utilities
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function({ addUtilities }: { addUtilities: (utilities: any) => void }) {
      const newUtilities = {
        // Focus utilities
        ".focus-brand": {
          "&:focus": {
            outline: "2px solid hsl(224 60% 57%)",
            "outline-offset": "2px",
          },
        },
        ".focus-visible-brand": {
          "&:focus-visible": {
            outline: "2px solid hsl(224 60% 57%)",
            "outline-offset": "2px",
          },
        },

        // Text utilities
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".text-pretty": {
          "text-wrap": "pretty",
        },

        // Grid utilities
        ".grid-auto-fit": {
          "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
        },
        ".grid-auto-fit-sm": {
          "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))",
        },
        ".grid-auto-fit-lg": {
          "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))",
        },
        ".grid-auto-fill": {
          "grid-template-columns": "repeat(auto-fill, minmax(250px, 1fr))",
        },

        // Layout utilities
        ".safe-area-inset": {
          "padding-top": "env(safe-area-inset-top)",
          "padding-right": "env(safe-area-inset-right)",
          "padding-bottom": "env(safe-area-inset-bottom)",
          "padding-left": "env(safe-area-inset-left)",
        },

        // Scrollbar utilities
        ".scrollbar-none": {
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
