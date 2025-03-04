import { BasketballMatch } from '../interfaces/basketball'

const BasketballTable = ({ data }: { data: BasketballMatch }) => {
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
            {data.team_A.uniName}
          </td>
          <td className="sm:py-1 lg:py-2  px-1  text-gray-400">
            {data.team_A.score_Q1}
          </td>
          <td className="sm:py-1 lg:py-2 px-1  text-gray-400">
            {data.team_A.score_Q2}
          </td>
          <td className="sm:px-1 lg:py-2 ">{data.team_A.totalScore}</td>
        </tr>
        <tr>
          <td className="sm:py-1 pr-6 text-left font-medium">
            {data.team_B.uniName}
          </td>
          <td className="sm:py-1 px-1  text-gray-400">
            {data.team_B.score_Q1}
          </td>
          <td className="sm:py-1 px-1  text-gray-400">
            {data.team_B.score_Q2}
          </td>

          <td className="sm:py-1 px-1 ">{data.team_B.totalScore}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default BasketballTable
