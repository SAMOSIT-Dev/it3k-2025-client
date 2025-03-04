import TableComponent from '@/shared/components/TableComponent'
import TeamCell from '@/shared/components/TeamCell'
import { Team } from '@/shared/utils/team'
import MatchList from './components/MatchList'
import BackButton from '@/shared/components/BackButton'
import Category from './components/Category'
import Background from '@/shared/components/Background'

const Page = () => {
  const header = ['อันดับ', 'TEAM', 'WIN_LOSE', 'POINT', 'POINT DIFF']
  const tableData = [
    [1, <TeamCell key="team-kmutt" team={Team.KMUTT} />, '0-0', '0-0', 0],
    [2, <TeamCell key="team-kmitl" team={Team.KMITL} />, '0-0', '0-0', 0],
    [3, <TeamCell key="team-kmutnb" team={Team.KMUTNB} />, '0-0', '0-0', 0],
    [
      4,
      <TeamCell key="team-kmutnbpr" team={Team.KMUTNBPR} />,
      '0-0',
      '0-0',
      0
    ]
  ]
  const getColumnstyle = (colIndex: number) => {
    if (colIndex === 0) return 'font-black'
    if (colIndex === 1) return 'w-1/3'
    return ''
  }

  return (
    <div className="flex flex-col text-white w-full min-h-[calc(100dvh-102px)] items-center space-y-2 sm:space-y-4 lg:space-y-8">
      <div className="w-[90%]">
        <div className="flex flex-row items-center mt-8 mb-4 -ml-1 md:-ml-2 lg:-ml-4 md:mb-4">
          <BackButton />
          <h1 className="text-2xl font-bold">Esports</h1>
        </div>
        <Category />
        <TableComponent
          highlighted={true}
          edgeBorder={true}
          header={header}
          data={tableData}
          columnStyles={getColumnstyle}
        />

        <div className="flex flex-col w-full items-center lg:-ml-4 md:ml-2 ml-1 mt-8 md:mt-16">
          <div className="w-[100%] md:max-w-[550px] mb-8">
            <MatchList />
          </div>
        </div>
      </div>

      <Background />
    </div>
  )
}

export default Page
