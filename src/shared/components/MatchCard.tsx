import { Team, TeamLogos, TeamName } from '../utils/team'

interface MatchCardProps {
  time: string
  match: string
  teamA: Team
  teamB: Team
  scoreA: number
  scoreB: number
}

const TeamDisplay = ({
  team,
  isWinner,
  side = 'left'
}: {
  team: Team
  isWinner: boolean
  side?: 'left' | 'right'
}) => {
  return (
    <div
      className={`relative text-center w-[27%] h-3/5 flex justify-center items-center ${side == 'left' ? 'border-r' : 'border-l'}`}
    >
      {isWinner && (
        <div className="absolute bg-[#7bb835] h-full w-full z-0 bg-opacity-40 rounded-none blur-xl"></div>
      )}
      <div className="z-10">
        <p className="text-sm md:text-xl font-bold">{team}</p>
        <p className="text-[0.2rem] md:text-[0.45rem] font-bold">
          {TeamName[team]}
        </p>
      </div>
    </div>
  )
}

const MatchCard = ({
  time,
  match,
  teamA,
  teamB,
  scoreA,
  scoreB
}: MatchCardProps) => {
  const winner = scoreA > scoreB ? teamA : scoreB > scoreA ? teamB : null
  return (
    <div className="font-Prompt select-none flex text-white items-center justify-around w-full h-[92px] p-3 rounded-md border-[#E90000] border-[1px] bg-gradient-to-r from-red-500 to-orange-100">
      <div className="flex items-center justify-between w-full h-[90px] rounded-md bg-black-300">
        <div className="flex items-center justify-between w-full h-full">
          <TeamDisplay team={teamA} isWinner={winner == teamA} side="left" />

          <div className="match-info w-[46%] h-full flex px-3 pt-1">
            <div className="w-1/4 flex justify-center items-center">
              <img
                src={TeamLogos[teamA]}
                alt="team"
                className="md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full aspect-square"
              />
            </div>

            <div className="match-details w-1/2 flex flex-col items-center justify-between pb-2 sm:pb-4">
              <p className="text-xs md:text-sm font-black text-nowrap">
                {match}
              </p>
              <div className="flex">
                <p className="text-lg sm:text-2xl lg:text-3xl font-black text-nowrap">
                  {scoreA} - {scoreB}
                </p>
              </div>
              <p className="text-[0.5rem] md:text-[0.6rem] text-nowrap">
                {time}
              </p>
            </div>

            <div className="w-1/4 flex justify-center items-center">
              <img
                src={TeamLogos[teamB]}
                alt="team"
                className="md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full aspect-square"
              />
            </div>
          </div>

          <TeamDisplay team={teamB} isWinner={winner == teamB} side="right" />
        </div>
      </div>
    </div>
  )
}

export default MatchCard
