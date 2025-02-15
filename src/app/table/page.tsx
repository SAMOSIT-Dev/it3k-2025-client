import TableComponent from '@/share/components/TableComponent'
import '@/app/globals.css'

const Page = () => {
  const header = ['อันดับ', 'TEAM', 'WIN_LOSE', 'POINT', 'POINT DIFF']
  const tableData = [
    [1, 'KMUTT', '2-0', '55-36', 15],
    [2, 'KMITL', '2-0', '55-36', 15],
    [3, 'KMUTNB', '2-0', '55-36', 15],
    [4, 'KMUTNB PR', '2-0', '55-36', 15]
  ]
  const getColumnstyle = (colIndex: number) => {
    if (colIndex === 0) return 'text-xl'
    if (colIndex === 1) return 'w-1/3'
    return ''
  }

  return (
    <div className="flex justify-center w-full h-screen bg-black-300">
      <div className="w-[600px] h-[400px]">
        <TableComponent
          highlighted={true}
          header={header}
          data={tableData}
          columnStyles={getColumnstyle}
        />
      </div>
    </div>
  )
}

export default Page
