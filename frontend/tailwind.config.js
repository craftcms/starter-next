/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./backend/templates/**/*.twig",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      ringColor: {
        DEFAULT: 'var(--ring-color, #dc2626)',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
  // Add closses used in the Twig templates in /backend/templates/_partials for CKEditor
  safelist: [
    {
      pattern: /bg-slate-.+/,
      variants: ['lg', 'md', 'sm']
    },
    {
      pattern: /rounded-.+/,
      variants: ['lg', 'md', 'sm']
    },
    {
      pattern: /text-.+/,
      variants: ['lg', 'md', 'sm']
    },
    {
      pattern: /my-.+/,
      variants: ['lg', 'md', 'sm']
    },
    {
      pattern: /p-.+/,
      variants: ['lg', 'md', 'sm']
    },
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-red-600',
    'focus:ring-offset-2',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-red-600',
    'focus-visible:ring-offset-2',
    'aspect-w-16',
    'aspect-h-9'
  ]
};
