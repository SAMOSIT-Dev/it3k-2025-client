import Image from 'next/image'
import { BasketballTeam } from '../interfaces/basketball'
import { TeamLogos } from '@/shared/utils/team';

const BasketballTeamScore = ({
  data
}: {
  data: { team: BasketballTeam; status: boolean; side: string }
}) => {
  return (
    <div
      className={`flex justify-center items-center ${data.side == 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="relative w-[45px] h-[45px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px] rounded-full bg-black  overflow-hidden flex-shrink-0 ">
        <Image
          src={TeamLogos[data.team.uniName]}
          alt={`${data.team.uniName} logo`}
          sizes="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px]"
          fill
        />
      </div>
      <div className="relative flex flex-col text-[#E9E9E9] font-semibold text-center w-[32px] sm:w-[75px] lg:w-[120px] mx-2">
        <h3 className="text-[9px] sm:text-[15px] lg:text-[24px] z-10">
          {data.team.uniName}
        </h3>
        <h1 className="text-[14px] sm:text-[32px] lg:text-[48px] z-10">
          {data.team.totalScore}
        </h1>
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-[40px] h-[50px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] 
                  bg-[#173D03] blur-md sm:blur-lg lg:blur-xl ${data.status == false ? 'hidden' : ''}`}></div>
      </div>
    </div>
  )
}
export default BasketballTeamScore
