const Table: React.FC = () => {
  interface universityDataProps {
    name: string
    rank: number
    logo: string
  }
  const universityData: universityDataProps[] = [
    { name: '', rank: 0, logo: '' },
    { name: '', rank: 0, logo: '' },
    { name: '', rank: 0, logo: '' }
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
          {sortedData.map((item) => (
            <tr key={item.rank}>
              <td className="bg-black-300 text-center text-md md:text-xl lg:text-2xl font-bold lg:py-4 py-2 border-2 md:border-4 border-x-[#E80100] border-y-[#E80100]">
                {item.rank}
              </td>
              <td className="bg-black-300 text-center lg:py-4 py-2 border-2 md:border-4 border-x-[#F68D12] border-y-[#F68D12]">
                <div className="flex flex-row items-center justify-center">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="mr-2 sm:mr-4 rounded-full w-6 h-6 sm:w-12 sm:h-12"
                  />
                  <span className="text-center text-xs sm:text-lg lg:text-xl">
                    {item.name}
                  </span>
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
