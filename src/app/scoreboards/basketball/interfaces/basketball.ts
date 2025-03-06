import { Team, TeamLogos } from '@/shared/utils/team'

export interface BasketballTeam {
  uniName: Team
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
  rank: number
  university: string
  wins: number
  losses: number
  totalPointsScored: number
  totalPointsConceded: number
  pointDiff: number
}

export const mockBasketBallMatches: BasketballMatch[] = [
  {
    id: 1,
    team_A: {
      uniName: Team.KMUTT,
      image: TeamLogos[Team.KMUTT],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: Team.KMUTNB,
      image: TeamLogos[Team.KMUTNB],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '2025-03-09T02:00:00.000Z',
    timeEnd: '2025-03-09T02:25:00.000Z'
  },
  {
    id: 2,
    team_A: {
      uniName: Team.KMUTNB_PR,
      image: TeamLogos[Team.KMUTNB_PR],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: Team.KMITL,
      image: TeamLogos[Team.KMITL],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '2025-03-09T02:35:00.000Z',
    timeEnd: '2025-03-09T03:00:00.000Z'
  },
  {
    id: 3,
    team_A: {
      uniName: Team.KMUTT,
      image: TeamLogos[Team.KMUTT],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: Team.KMITL,
      image: TeamLogos[Team.KMITL],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '2025-03-09T03:10:00.000Z',
    timeEnd: '2025-03-09T03:35:00.000Z'
  },
  {
    id: 4,
    team_A: {
      uniName: Team.KMUTNB,
      image: TeamLogos[Team.KMUTNB],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: Team.KMUTNB_PR,
      image: TeamLogos[Team.KMUTNB_PR],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '2025-03-09T03:45:00.000Z',
    timeEnd: '2025-03-09T04:10:00.000Z'
  },
  {
    id: 5,
    team_A: {
      uniName: Team.KMUTT,
      image: TeamLogos[Team.KMUTT],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: Team.KMUTNB_PR,
      image: TeamLogos[Team.KMUTNB_PR],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '2025-03-09T04:20:00.000Z',
    timeEnd: '2025-03-09T04:45:00.000Z'
  },
  {
    id: 6,
    team_A: {
      uniName: Team.KMUTNB,
      image: TeamLogos[Team.KMUTNB],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    team_B: {
      uniName: Team.KMITL,
      image: TeamLogos[Team.KMITL],
      color_code: '',
      score_Q1: 0,
      score_Q2: 0,
      score_OT: 0,
      totalScore: 0
    },
    status: 'upcoming',
    timeStart: '2025-03-09T04:55:00.000Z',
    timeEnd: '2025-03-09T05:20:00.000Z'
  }
]
