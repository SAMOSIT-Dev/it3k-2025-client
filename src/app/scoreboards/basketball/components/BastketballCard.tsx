import { BasketballMatch } from '../interfaces/basketball'
import BasketballTable from './BasketballTable'
import BasketballTeamScore from './BasketballTeamScore'

const BasketBallCard = ({ data }: { data: BasketballMatch }) => {
  return (
    <div className="relative  max-w-[375px] w-[90%] h-[70px] sm:max-w-[600px] sm:h-[120px] lg:max-w-[1000px] lg:h-[200px]">
      <div className="absolute  left-[-15px] right-[-15px] h-full rounded-xl border-[#E90000] border-[1px] bg-gradient-to-r from-[#E90000] to-[#F16322]"></div>
      <div className="absolute flex items-center justify-around w-full h-full p-3 rounded-xl border-[#E90000] border-[1px] bg-black-300">
        <div className="flex flex-col text-[#E9E9E9] text-center text-[10px] sm:text-[16px] lg:text-[24px]">
          <p>{data.timeStart}</p>
          <p>-</p>
          <p>{data.timeEnd}</p>
        </div>
        <div className="h-[50px] sm:h-[100px] lg:h-[150px]  w-[0.5px] sm:w-[1px] mx-1 sm:mx-3  bg-[#E9E9E9]"></div>
        <BasketballTeamScore
          data={{
            team: data.team_A,
            side: 'left',
            status:
              data.team_A.totalScore > data.team_B.totalScore ? true : false
          }}
        />
        <BasketballTable data={data} />
        <BasketballTeamScore
          data={{
            team: data.team_B,
            side: 'right',
            status:
              data.team_B.totalScore > data.team_A.totalScore ? true : false
          }}
        />
      </div>
    </div>
  )
}

export default BasketBallCard
