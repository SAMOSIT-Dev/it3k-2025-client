interface TableComponentProps<T = React.ReactNode> {
  highlighted: boolean
  header: string[]
  data: T[][]
  edgeBorder?: boolean
  renderCell?: (cell: T, rowIndex: number, cellIndex: number) => React.ReactNode
  columnStyles?: (columnIndex: number) => string
  rowStyles?: (rowIndex: number) => string
}

const TableComponent = <T,>({
  highlighted,
  header,
  data,
  edgeBorder,
  renderCell = (cell) => cell as React.ReactNode,
  columnStyles,
  rowStyles
}: TableComponentProps<T>) => {
  return (
    <table className={`w-full text-white text-center`}>
      <thead
        className={`bg-gradient-to-r from-red-500 to-orange-100 ${edgeBorder ? 'border border-red-500' : 'border-b border-red-500'} uppercase`}
      >
        <tr>
          {header.map((title, index) => (
            <th
              key={index}
              className={`text-xs md:text-xl p-2 relative ${
                !edgeBorder &&
                (index === 0
                  ? 'border-l-0'
                  : index === header.length - 1
                    ? 'border-r-0'
                    : '')
              }`}
            >
              <span className="drop-shadow-2xl">{title}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${rowStyles ? rowStyles(rowIndex) : ''}`}
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={`${columnStyles ? columnStyles(cellIndex) : ''} p-2 lg:h-[80px] text-xs sm:text-sm lg:text-xl border border-red-500 text-center relative overflow-hidden
                  ${
                    !edgeBorder
                      ? `${cellIndex === 0 ? 'border-l-0' : ''} 
                        ${cellIndex === row.length - 1 ? 'border-r-0' : ''} 
                       ${rowIndex === data.length - 1 ? 'border-b-0' : ''}
                    `
                      : ''
                  }`}
              >
                <div
                  className={`absolute inset-0 m-auto h-[60%] w-[80%] 
                    blur-lg rounded-sm z-[1] ${
                      highlighted
                        ? rowIndex == 0
                          ? 'bg-yellow-300 opacity-40'
                          : 'bg-orange-100 opacity-20'
                        : ''
                    }`}
                ></div>
                <span className="relative z-10">
                  {renderCell(cell, rowIndex, cellIndex)}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableComponent
