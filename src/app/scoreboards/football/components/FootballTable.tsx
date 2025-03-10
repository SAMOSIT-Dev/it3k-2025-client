'use client'

import TableComponent from '@/shared/components/TableComponent'
import TeamCell from '@/shared/components/TeamCell'
import { Team, TeamMapping } from '@/shared/utils/team'

interface DashboardEntry {
  rank: number
  university: string
  wins: number
  draws: number
  losses: number
  totalPointsScored: number
  totalPointsConceded: number
  pointDiff: number
}

interface FootballTableProps {
  liveData: DashboardEntry[]
}

const FootballTable: React.FC<FootballTableProps> = ({ liveData }) => {
  const header = ['RANK', 'TEAM', 'WIN_DRAW_LOSE', 'GOAL', 'GOAL DIFF']

  const tableData = liveData.filter(data => data.university !== 'KMUTNB').map((entry, index) => {
    

    const team= TeamMapping[entry.university] || Team.TBD; 

    return [
      index + 1,
      <TeamCell
        key={`team-${team.toLowerCase()}`}
        team={team}
      />,
      `${entry.wins}-${entry.draws}-${entry.losses}`,
      `${entry.totalPointsScored}-${entry.totalPointsConceded}`,
      entry.pointDiff
    ];
  });

  const getColumnStyle = (colIndex: number) => {
    if (colIndex === 0) return 'font-bold'
    if (colIndex === 1) return 'w-1/3'
    return ''
  }

  return (
    <TableComponent
      highlighted={true}
      edgeBorder={true}
      header={header}
      data={tableData}
      columnStyles={getColumnStyle}
    />
  )
}

export default FootballTable
