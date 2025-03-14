import Image from 'next/image'
import { Team, TeamLogos } from '../utils/team'

interface TeamCellProps {
  team: Team
}

const TeamCell = ({ team }: TeamCellProps) => {
  return (
    <div className="flex items-center w-full h-full px-1 sm:px-2">
      <div className="w-2/5 relative">
        <Image
          src={TeamLogos[team]}
          alt="team"
          width={0}
          height={0}
          sizes="(max-width: 640px) 20px, (max-width: 1024px) 40px, 56px"
          className="w-5 h-5 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-full aspect-square"
        />
      </div>
      <h1 className="text-xs sm:text-sm lg:text-xl text-start w-3/5">{team}</h1>
    </div>
  )
}

export default TeamCell
