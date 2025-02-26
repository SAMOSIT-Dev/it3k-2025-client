import { Team, TeamLogos } from '../utils/team'

interface MatchCardProps {
  time: string
  match: string
  teamA: Team
  teamB: Team
  scoreA: number
  scoreB: number
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
    <div className="flex text-white items-center justify-around w-full h-[77px] p-3 rounded-md border-[#E90000] border-[1px] bg-gradient-to-r from-red-500 to-orange-100">
      <div className="flex items-center justify-between w-full h-[75px] rounded-md bg-black-300 px-3">
        <div className="flex items-center justify-between w-full h-full">
          <div className="relative text-center w-1/4 h-3/5 flex justify-center items-center border-r">
            {winner == teamA && (
              <div className="absolute bg-[#7bb835] h-full w-full z-0 bg-opacity-40 rounded-none blur-xl"></div>
            )}
            <p className="z-10 font-bold md:text-2xl">{teamA}</p>
          </div>

          <div className="match-info w-2/4 h-full flex px-3 pt-1">
            <div className="w-1/4 flex justify-center items-center">
              <img
                src={TeamLogos[teamA]}
                alt="team"
                className="md:w-10 md:h-10 rounded-full aspect-square"
              />
            </div>

            <div className="match-details w-1/2 flex flex-col items-center justify-between pb-2 sm:pb-4">
              <p className="text-xs md:text-sm font-black">{match}</p>
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
                className="md:w-10 md:h-10 rounded-full aspect-square"
              />
            </div>
          </div>

          <div className="relative text-center w-1/4 h-3/5 flex justify-center items-center border-l">
            {winner == teamB && (
              <div className="absolute bg-[#7bb835] h-full w-full z-0 bg-opacity-40 rounded-none blur-xl"></div>
            )}
            <p className="z-10 font-bold md:text-2xl">{teamB}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchCard
