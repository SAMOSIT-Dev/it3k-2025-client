import { Team} from '@/shared/utils/team'

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
