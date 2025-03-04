import style from '@/app/styles/scoreboards/athletics/table.module.css'
import Image from 'next/image'
const Table: React.FC = () => {
  interface universityDataProps {
    name: string
    rank: number
    logo: string
  }
  const universityData: universityDataProps[] = [
    { name: 'Dummy', rank: 1, logo: '/images/pop.png' },
    { name: 'Dummy', rank: 2, logo: '/images/pop.png' },
    { name: 'Dummy', rank: 3, logo: '/images/pop.png' },
    { name: 'Dummy', rank: 4, logo: '/images/pop.png' }
  ]
  const sortedData = universityData.sort((a, b) => a.rank - b.rank)

  return (
    <div className="overflow-x-auto mt-6 md:mt-10">
      <table className="md:w-4/5 lg:w-3/4 w-full border-collapse md:text-xl text-xs bg-gradient-to-r from-[#E80100] to-[#F68D12] bg-origin-border border-spacing-1 md:border-spacing-4 border md:border-4 border-transparent">
        <thead>
          <tr className="text-white">
            <th className="px-1 lg:px-3 py-2">ลำดับที่</th>
            <th className="px-1 lg:px-3 py-2">มหาวิทยาลัย</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td
                className={`${index === 0 && style['glow-cell']} bg-black-300 text-center text-md md:text-xl lg:text-2xl font-bold lg:py-4 py-2 border-2 md:border-4 border-x-[#E80100] border-y-[#E80100]`}>
                <span>{item.rank}</span>
              </td>
              <td
                className={`${index === 0 && style['glow-cell']} bg-black-300 text-center lg:py-4 py-2 border-2 md:border-4 border-[#E80100]`}>
                <div className="flex flex-row items-center justify-center">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="mr-2 sm:mr-4 rounded-full w-6 h-6 sm:w-12 sm:h-12"
                  />
                  <span>{item.name}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
