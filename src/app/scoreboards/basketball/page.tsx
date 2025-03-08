'use client'

import BasketBallCard from './components/BastketballCard'
import TableComponent from '@/shared/components/TableComponent'
import BackButton from '@/shared/components/BackButton'
import { transformDashboardData } from './utils/transformTableData'
import { useFetchBasketball } from './hooks/useFetchBasketball'

const BasketBall = () => {
  const { matches, entries } = useFetchBasketball()

  const header = ['RANK', 'TEAM', 'WIN_LOSE', 'POINT', 'POINT DIFF']

  const getColumnstyle = (colIndex: number) => {
    if (colIndex === 0) return 'font-bold'
    if (colIndex === 1) return 'w-1/3'
    return ''
  }

  return (
    <div
      className="pt-[100px] flex flex-col w-full min-h-[calc(100vh-100px)] flex-1  items-center pb-12  bg-black-300 font-Prompt bg-cover bg-bottom"
      style={{
        backgroundImage: "url('/images/backgrounds/basketballBackground.png')"
      }}>
      <div className=" w-[90%] mt-8 mb-4 md:mb-8 md:mt-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1 text-white ">
        <BackButton />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ">
          Basketball
        </h1>
      </div>
      <div className="w-[90%]">
        {entries && entries.length > 0 ? (
          <TableComponent
            highlighted={true}
            edgeBorder={true}
            header={header}
            data={transformDashboardData(entries)}
            columnStyles={getColumnstyle}
          />
        ) : (
          <p className="text-white text-sm text-center py-10">
            Loading ranking...
          </p>
        )}
      </div>
      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white my-4 sm:my-8">
        Opening Match
      </p>
      <div className="flex flex-col items-center w-full h-full space-y-4 sm:space-y-6 lg:space-y-8">
        {matches && matches.length > 0 ? (
          matches
            .slice()
            .sort(
              (a, b) =>
                new Date(a.timeStart).getTime() -
                new Date(b.timeStart).getTime()
            )
            .map((match, index) => <BasketBallCard data={match} key={index} />)
        ) : (
          <p className="text-white text-sm py-10">Loading matches...</p>
        )}
      </div>
    </div>
  )
}
export default BasketBall
