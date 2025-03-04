'use client'

import TableComponent from '@/shared/components/TableComponent'
import TeamCell from '@/shared/components/TeamCell'
import { Team, TeamMapping } from '@/shared/utils/team'

interface ScoreboardEntry {
  id: number
  university: string
  winLose: string
  point: string
  pointDiff: number
}

interface FootballTableProps {
  liveData: ScoreboardEntry[]
}

const FootballTable: React.FC<FootballTableProps> = ({ liveData }) => {
  const header = ['อันดับ', 'TEAM', 'WIN_LOSE', 'POINT', 'POINT DIFF']

  const tableData = liveData.map((team, index) => [
    index + 1,
    <TeamCell
      key={team.id}
      team={TeamMapping[team.university] || Team.KMUTNB}
    />,
    team.winLose,
    team.point,
    team.pointDiff
  ])

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
