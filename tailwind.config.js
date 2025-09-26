/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Ensure commonly used utility classes are always included
    'text-sm',
    'text-xs',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'font-bold',
    'font-semibold',
    'text-center',
    'text-white',
    'text-gray-700',
    'text-gray-900',
    'bg-white',
    'bg-gray-100',
    'bg-gray-900',
    'rounded-lg',
    'rounded-full',
    'shadow-lg',
    'mx-auto',
    'mb-4',
    'mb-6',
    'mt-6',
    'p-4',
    'p-6',
    'p-8',
    'px-4',
    'py-2',
    'py-4',
    'max-w-md',
    'max-w-2xl',
    'max-w-7xl',
    'w-full',
    'h-auto',
  ],
  theme: {
    extend: {
      colors: {
        'globe-green': {
          100: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        'globe-blue': {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}