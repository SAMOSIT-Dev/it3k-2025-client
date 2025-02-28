import BasketballTable from './BasketballTable'
import BasketballTeamScore from './BasketballTeamScore'

interface IBasketballCard {
  teamA: string
  teamB: string
  scoreAQ1: number
  scoreAQ2: number
  scoreAT: number
  scoreBQ1: number
  scoreBQ2: number
  scoreBT: number
}

const BasketBallCard = ({ data }: { data: IBasketballCard }) => {
  return (
    <div className="relative  max-w-[375px] w-[90%] h-[70px] sm:max-w-[600px] sm:h-[120px] lg:max-w-[1000px] lg:h-[200px]">
      <div className="absolute  left-[-15px] right-[-15px] h-full rounded-md border-[#E90000] border-[1px] bg-gradient-to-r from-[#E90000] to-[#F16322]"></div>
      <div className="absolute flex items-center justify-around w-full h-full p-3 rounded-md border-[#E90000] border-[1px] bg-black-300">
        <div className="flex flex-col text-[#E9E9E9] text-center text-[10px] sm:text-[16px] lg:text-[24px]">
          <p>9.00</p>
          <p>-</p>
          <p>9.25</p>
        </div>
        <div className="h-[50px] sm:h-[100px] lg:h-[150px]  w-[0.5px] sm:w-[1px] mx-1 sm:mx-3  bg-[#E9E9E9]"></div>
        <BasketballTeamScore data={{ side: 'left', status: true }} />
        <BasketballTable scoreData={data} />
        <BasketballTeamScore data={{ side: 'right', status: false }} />
      </div>
    </div>
  )
}

export default BasketBallCard
