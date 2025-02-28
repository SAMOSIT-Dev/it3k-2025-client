interface IBasketballTable {
  teamA: string
  teamB: string
  scoreAQ1: number
  scoreAQ2: number
  scoreAT: number
  scoreBQ1: number
  scoreBQ2: number
  scoreBT: number
}

const BasketballTable = ({ scoreData }: { scoreData: IBasketballTable }) => {
  return (
    <table className="w-[30%] text-center text-[8px] sm:text-[12px] lg:text-[16px] mx-1 sm:mx-2 lg:mx-4  border-spacing-x-4  text-white">
      <thead className="border-b border-gray-400">
        <tr>
          <th className="sm:pb-2 lg:pb-4 invisible ">Team</th>
          <th className="sm:pb-2 lg:pb-4 text-gray-400">1</th>
          <th className="sm:pb-2 lg:pb-4 text-gray-400">2</th>
          <th className="sm:pb-2 lg:pb-4">T</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="sm:py-1 pr-6 text-left font-medium">
            {scoreData.teamA}
          </td>
          <td className="sm:py-1 lg:py-2  px-1  text-gray-400">
            {scoreData.scoreAQ1}
          </td>
          <td className="sm:py-1 lg:py-2 px-1  text-gray-400">
            {scoreData.scoreAQ2}
          </td>
          <td className="sm:px-1 lg:py-2 font-bold">{scoreData.scoreAT}</td>
        </tr>
        <tr>
          <td className="sm:py-1 pr-6 text-left font-medium">
            {scoreData.teamB}
          </td>
          <td className="sm:py-1 px-1  text-gray-400">{scoreData.scoreBQ1}</td>
          <td className="sm:py-1 px-1  text-gray-400">{scoreData.scoreBQ2}</td>
          <td className="sm:py-1 px-1 font-bold">{scoreData.scoreBT}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default BasketballTable
