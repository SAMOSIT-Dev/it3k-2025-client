import { JSX, ReactElement, ReactNode } from 'react'

type UniversityTeamName = 'KMUTT' | 'KMITL' | 'KMUTNB'
type SportName =
  | 'แบดบินตัน'
  | 'ฟุตบอล'
  | 'กีฬาพื้นบ้าน'
  | 'บาสเกตบอล'
  | 'ปิงปอง'

export interface ScheduleData {
  sportName: SportName
  icon?: string | JSX.Element
  homeTeam: {
    name: UniversityTeamName
    logo: string
  }
  awayTeam: {
    name: UniversityTeamName
    logo: string
  }
  preiod: {
    start: string
    end: string
  }
}

const iconList: { [key: string]: JSX.Element } = {
  badminton: (
    <svg
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.7703 14.6656L27.8342 13.6076L13.2785 24.3179L11.7891 22.8919L26.7166 11.9095L26.2696 8.13539C26.2152 7.67137 25.833 7.30536 25.3504 7.25536L21.1371 6.79735L9.9195 21.1038L8.4301 19.6758L19.7646 5.21729L19.2842 1.13516C19.2549 0.861146 19.1024 0.611138 18.8727 0.447132C18.6429 0.283127 18.3504 0.215124 18.0663 0.263126L12.1588 1.26316C11.7807 1.32716 11.4716 1.58117 11.3483 1.92918L5.51813 18.6357L3.78223 20.2978L12.6435 28.7821L14.3773 27.122L31.8261 21.5398C32.1812 21.4258 32.4465 21.1398 32.5196 20.7878L33.5641 15.8396C33.679 15.3076 33.326 14.7856 32.7703 14.6656Z"
        fill="white"
      />
      <path
        d="M2.3054 21.7129L2.00042 22.0049C-0.441545 24.345 -0.441545 28.1491 2.00042 30.4892C3.18275 31.6232 4.7578 32.2472 6.43104 32.2472C8.10427 32.2472 9.67932 31.6212 10.8617 30.4892L11.1666 30.1972L2.3054 21.7129Z"
        fill="white"
      />
    </svg>
  )
}

export const scheduleData: ScheduleData[] = [
  {
    sportName: 'แบดบินตัน',
    icon: iconList.badminton,
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '13:00',
      end: '16:00'
    }
  },
  {
    sportName: 'แบดบินตัน',
    icon: iconList.badminton,
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '13:00',
      end: '16:00'
    }
  }
]
