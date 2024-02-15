/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js',
  ],
	theme: {
		extend: {
      fontFamily: {
        sans: ['PT Sans', ...defaultTheme.fontFamily.sans],
        serif: ['PT Serif', ...defaultTheme.fontFamily.serif],
        chaney: ['Chaney', 'Arial', 'sans-serif'],
      },
    },
	},
	plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
}
