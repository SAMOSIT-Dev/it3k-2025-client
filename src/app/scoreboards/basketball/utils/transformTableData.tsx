import TeamCell from '@/shared/components/TeamCell' // Ensure correct import
import { DashboardEntry } from '../interfaces/basketball'
import { Team } from '@/shared/utils/team'

export const transformDashboardData = (entries: DashboardEntry[]) => {
  return entries.map((entry) => [
    entry.rank,
    <TeamCell
      key={`team-${entry.university.toLowerCase()}`}
      team={Team[entry.university as keyof typeof Team]}
    />,
    `${entry.wins}-${entry.losses}`,
    `${entry.totalPointsScored}-${entry.totalPointsConceded}`,
    entry.pointDiff
  ])
}
