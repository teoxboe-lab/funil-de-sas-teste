import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBEB',
        'brand-yellow': '#FACC15',
        'brand-red': '#BE123C',
        'brand-green': '#064E3B',
      },
      fontFamily: {
        impact: ['Impact', 'Arial Narrow', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-xl': '8px 8px 0px 0px #000000',
      },
    },
  },
  plugins: [],
}
export default config
