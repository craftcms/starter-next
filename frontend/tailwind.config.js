/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./backend/templates/**/*.twig",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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
    'aspect-w-16',
    'aspect-h-9'
  ]
};
