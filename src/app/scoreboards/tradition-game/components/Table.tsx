import style from '@/app/styles/scoreboards/athletics/table.module.css'
import { Team, TeamLogos } from '@/shared/utils/team'
import Image from 'next/image'

interface UniversityDataProps {
  rank: number
  team: Team
}

interface TableProps {
  categoryId: number
}

const Table: React.FC<TableProps> = ({ categoryId }) => {
  const universityData: Record<number, UniversityDataProps[]> = {
    1: [ // ชักเย่อ
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD }
    ],
    2: [ // กินวิบาก
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD }
    ],
    3: [ // วิ่งเปรี้ยว
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD },
      { rank: 1, team: Team.TBD }
    ]
  }

  // Ensure valid category selection
  const selectedData = universityData[categoryId] || []

  // Sort data by rank (if not already sorted)
  const sortedData = [...selectedData].sort((a, b) => a.rank - b.rank)

  return (
    <div className="overflow-x-auto mt-6 md:mt-10">
      <table className="md:w-4/5 lg:w-3/4 w-full border-collapse md:text-xl text-xs bg-gradient-to-r from-[#E80100] to-[#F68D12] bg-origin-border border-spacing-1 md:border-spacing-4 border md:border-4 border-transparent">
        <thead>
          <tr className="text-white">
            <th className="px-1 lg:px-3 py-2">ลำดับที่</th>
            <th className="px-1 lg:px-3 py-2">มหาวิทยาลัย</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td
                className={`${index === 0 ? style['glow-cell'] : ''} bg-black-300 text-center text-md md:text-xl lg:text-2xl font-bold lg:py-4 py-2 border-2 md:border-4 border-x-[#E80100] border-y-[#E80100]`}>
                <span>{item.rank}</span>
              </td>
              <td
                className={`${index === 0 ? style['glow-cell'] : ''} bg-black-300 text-center lg:py-4 py-2 border-2 md:border-4 border-[#E80100]`}>
                <div className="flex flex-row items-center justify-center">
                  <Image
                    src={TeamLogos[item.team]}
                    alt={item.team}
                    width={24}
                    height={24}
                    className="mr-2 sm:mr-4 rounded-full w-6 h-6 sm:w-12 sm:h-12"
                  />
                  <span>{item.team}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
