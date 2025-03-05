import TeamCell from '@/shared/components/TeamCell';
import { DashboardEntry } from '../interfaces/basketball';
import { Team, TeamMapping } from '@/shared/utils/team';

export const transformDashboardData = (entries: DashboardEntry[]) => {
  return entries.map((entry) => {
    const team= TeamMapping[entry.university] || Team.KMUTT; 

    return [
      entry.rank,
      <TeamCell
        key={`team-${team.toLowerCase()}`}
        team={team}
      />,
      `${entry.wins}-${entry.losses}`,
      `${entry.totalPointsScored}-${entry.totalPointsConceded}`,
      entry.pointDiff
    ];
  });
};
