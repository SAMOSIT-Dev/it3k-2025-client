import TableComponent from '@/shared/components/TableComponent'
import TeamCell from '@/shared/components/TeamCell'
import { Team } from '@/shared/utils/team'
import BackButton from '@/shared/components/BackButton'
import Background from '@/shared/components/Background'
import Category from '../components/Category'
import MatchList from '../components/MatchList'

const Page = () => {
  const game = 'rov'
  const header = ['RANK', 'TEAM', 'WIN_LOSE']
  const tableData = [
    [1, <TeamCell key="team-kmitl" team={Team.KMITL} />, '2-0'],
    [2, <TeamCell key="team-kmutt" team={Team.KMUTT} />, '1-1'],
    [3, <TeamCell key="team-kmutnbpr" team={Team.KMUTNB_PR} />, '0-2']
  ]
  const matcheData = [
    {
      time: 'เวลา : 20:00 - 22:00',
      match: 'MATCH 1',
      teamA: Team.KMUTT,
      teamB: Team.KMUTNB_PR,
      scoreA: 1,
      scoreB: 0
    },
    {
      time: 'เวลา : 20:00 - 22:00',
      match: 'MATCH 2',
      teamA: Team.KMUTNB_PR,
      teamB: Team.KMITL,
      scoreA: 0,
      scoreB: 1
    },
    {
      time: 'เวลา : 21:00 - 23:00',
      match: 'ชิงชนะเลิศ',
      teamA: Team.KMUTT,
      teamB: Team.KMITL,
      scoreA: 0,
      scoreB: 1
    }
  ]
  const getColumnstyle = (colIndex: number) => {
    if (colIndex === 0) return 'font-black'
    if (colIndex === 1) return 'w-1/3'
    return ''
  }

  return (
    <div className="pt-[100px] flex flex-col text-white w-full min-h-[calc(100dvh-102px)] items-center space-y-2 sm:space-y-4 lg:space-y-8">
      <div className="w-[90%]">
        <div className="flex flex-row items-center mt-8 mb-4 -ml-1 md:-ml-2 lg:-ml-4 md:mb-4">
          <BackButton />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Esports
          </h1>
        </div>
        <Category activeCategory={game} />
        <TableComponent
          highlighted={true}
          edgeBorder={true}
          header={header}
          data={tableData}
          columnStyles={getColumnstyle}
        />

        <div className="flex flex-col w-full items-center lg:-ml-4 md:ml-2 ml-1 mt-8 md:mt-16">
          <div className="w-[100%] md:max-w-[550px] mb-8">
            <MatchList matches={matcheData} />
          </div>
        </div>
      </div>

      <Background />
    </div>
  )
}

export default Page
