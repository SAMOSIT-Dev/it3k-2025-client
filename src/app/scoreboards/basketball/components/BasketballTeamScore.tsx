import { BasketballTeam } from "../interfaces/basketball"

const BasketballTeamScore = ({
  data
}: {
  data: { team: BasketballTeam; status: boolean; side: string }
}) => {
  return (
    <div
      className={`flex justify-center items-center ${data.side == 'right' ? 'flex-row-reverse' : ''}`}>
      <div className=" w-[50px] h-[50px] min-w-[30px] min-h-[30px]  sm:size-[90px] lg:size-[120px] rounded-full bg-white">
        <img src={`/images/${data.team.image}`} alt={`${data.team.uniName} logo`}></img>
      </div>
      <div className="relative flex flex-col text-[#E9E9E9] font-semibold text-center mx-1 lg:mx-10 sm:mx-3 ">
        <h3 className="text-[9px] sm:text-[15px] lg:text-[24px] z-10">KMUTT</h3>
        <h1 className="text-[14px] sm:text-[32px] lg:text-[48px] z-10">102</h1>
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-[40px] h-[50px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] 
                  bg-[#173D03] blur-md sm:blur-lg lg:blur-xl ${data.status == false ? 'hidden' : ''}`}></div>
      </div>
    </div>
  )
}
export default BasketballTeamScore
