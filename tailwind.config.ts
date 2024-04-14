import type { Config } from 'tailwindcss';

const config: Config = {
  important: false,
  content: [
    './src/ui/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,scss}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/5': '4 / 5',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
        screens: {
          sm: '100%',
          md: '728px',
          lg: '984px',
          xl: '1240px',
        },
      },
      fontFamily: {
        dmSans: ['DMSans', 'sans'],
      },
      colors: {
        primary: '#fecf00',
        dark: '#262626',
      },
    },
  },
  plugins: [],
};

export default config;
