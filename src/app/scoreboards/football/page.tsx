import TableComponent from '@/shared/components/TableComponent'
import TeamCell from '@/shared/components/TeamCell'
import { Team } from '@/shared/utils/team'
import { Icon } from '@iconify/react/dist/iconify.js'
import MatchList from './components/MatchList'

const Page = () => {
  const header = ['อันดับ', 'TEAM', 'WIN_LOSE', 'POINT', 'POINT DIFF']
  const tableData = [
    [1, <TeamCell team={Team.KMUTT} />, '2-0', '55-36', 15],
    [2, <TeamCell team={Team.KMITL} />, '2-0', '55-36', 15],
    [3, <TeamCell team={Team.KMUTNB} />, '2-0', '55-36', 15],
    [4, <TeamCell team={Team.KMUTNBPR} />, '2-0', '55-36', 15]
  ]
  const getColumnstyle = (colIndex: number) => {
    if (colIndex === 0) return 'font-bold'
    if (colIndex === 1) return 'w-1/3'
    return ''
  }

  return (
    <div className="flex flex-col text-white w-full min-h-[calc(100dvh-102px)] items-center space-y-2 sm:space-y-4 lg:space-y-8 bg-black-300">
      <div className="w-[90%]">
        <div className="mt-2 mb-2 md:mb-8 md:mt-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1">
          <button>
            <Icon
              icon={'solar:alt-arrow-left-bold'}
              className="text-3xl p-0 cursor-pointer"
            />
          </button>
          <h1 className="text-2xl font-bold">Football</h1>
        </div>
        <TableComponent
          highlighted={true}
          edgeBorder={true}
          header={header}
          data={tableData}
          columnStyles={getColumnstyle}
        />

        <div className="flex flex-col w-full items-center lg:-ml-4 md:-ml-2 -ml-1">
          <h1 className="mt-4 mb-4 md:mb-8 md:mt-8 text-2xl font-bold">
            Opening Match
          </h1>
          <div className="w-[100%] md:max-w-[550px] mb-8">
            <MatchList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
