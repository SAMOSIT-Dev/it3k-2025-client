import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        red: {
          100: '#1E0707',
          500: '#E90000'
        },
        orange: {
          100: '#F06221'
        },
        black: {
          300: '#000000',
          500: '#111111'
        },
        white: '#E3E3E3'
      },
      backgroundImage: {
        'default-gradient':
          'linear-gradient(90deg, rgba(160,6,6,1) 0%, rgba(0,0,0,1) 100%)',
        gameBg: "url('/images/pop_goose/game_background.png')",
        gameBgMd: "url('/images/pop_goose/md_game_background.png')",
        gameBgSm: "url('/images/pop_goose/sm_game_background.png')"
      },
      fontFamily: {
        BenguiatITCbyBT: ['BenguiatITCbyBT', 'sans-serif'],
        Prompt: ['Prompt', 'sans-serif'],
        RampartOne: ['Rampart One', 'sans-serif'],
        ReemKufiInk: ['Reem Kufi Ink', 'sans-serif'],
        PressStart2P: ['"Press Start 2P"', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config
