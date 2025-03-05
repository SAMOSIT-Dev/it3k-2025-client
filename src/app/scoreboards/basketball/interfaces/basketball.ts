export interface BasketballTeam {
    uniName: string
    image: string
    color_code: string
    score_Q1: number
    score_Q2: number
    score_OT: number
    totalScore: number
  }

export type MatchStatus = 'upcoming' | 'ongoing' | 'break' | 'finished'

export interface BasketballMatch {
    id: number
    team_A: BasketballTeam 
    team_B: BasketballTeam 
    status: MatchStatus
    timeStart: string
    timeEnd: string
  }

 export interface DashboardEntry {
    rank: number;
    university: string;
    wins: number;
    losses: number;
    totalPointsScored: number;
    totalPointsConceded: number;
    pointDiff: number;
  }

export const mockBasketBallMatches: BasketballMatch[] = [
  {
    id: 1,
    team_A: {
      uniName: 'KMUTT',
      image: 'KMUTT_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: 'KMUTNB BKK',
      image: 'KMUTNB_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '09:00',
    timeEnd: '09:25'
  },
  {
    id: 2,
    team_A: {
      uniName: 'KMUTNB PR',
      image: 'KMUTNB_PR_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: 'KMITL',
      image: 'KMITL_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '09:35',
    timeEnd: '10:00'
  },
  {
    id: 3,
    team_A: {
      uniName: 'KMUTT',
      image: 'KMUTT_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: 'KMITL',
      image: 'KMITL_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '10:10',
    timeEnd: '10:35'
  },
  {
    id: 4,
    team_A: {
      uniName: 'KMUTNB BKK',
      image: 'KMUTNB_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: 'KMUTNB PR',
      image: 'KMUTNB_PR_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '10:45',
    timeEnd: '11:10'
  },
  {
    id: 5,
    team_A: {
      uniName: 'KMUTT',
      image: 'KMUTT_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: 'KMUTNB PR',
      image: 'KMUTNB_PR_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '11:20',
    timeEnd: '11:45'
  },
  {
    id: 6,
    team_A: {
      uniName: 'KMUTNB BKK',
      image: 'KMUTNB_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: 'KMITL',
      image: 'KMITL_logo.png',
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '11:55',
    timeEnd: '12:20'
  }
]
