'use client'

import React from 'react'
import Image from 'next/image'
import style from '@/app/styles/scoreboards/athletics/table.module.css'
import { IUniversity } from '../services/athletics.service'
import { AxiosError } from 'axios'
import mapUniNameToLogo from '@/shared/utils/mapUniNameToLogo'

interface Props {
  data: IUniversity[] | undefined
  loading: boolean
  error: AxiosError | null
}

const Table: React.FC<Props> = ({ data, loading, error }) => {
  const sortedData = data ? [...data].sort((a, b) => a.ranking - b.ranking) : []

  return (
    <div className="overflow-x-auto mt-6 md:mt-10">
      {loading ? (
        <div>กำลังโหลดข้อมูล...</div>
      ) : error ? (
        <div>เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
      ) : (
        <table className="md:w-4/5 lg:w-3/4 w-full border-collapse md:text-xl text-xs bg-gradient-to-r from-[#E80100] to-[#F68D12] bg-origin-border border-spacing-1 md:border-spacing-4 border md:border-4 border-transparent">
          <thead>
            <tr className="text-white">
              <th className="px-1 lg:px-3 py-2">Rank</th>
              <th className="px-1 lg:px-3 py-2">University/Institute</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              
              item.uniName ? (
              <tr key={item.id}>
                <td
                  className={`${index === 0 && style['glow-cell']} bg-black-300 text-center text-md md:text-xl lg:text-2xl font-bold lg:py-4 py-2 border-2 md:border-4 border-x-[#E80100] border-y-[#E80100]`}>
                  {index + 1}
                </td>
                <td
                  className={`${index === 0 && style['glow-cell']} bg-black-300 text-center lg:py-4 py-2 border-2 md:border-4 border-[#E80100]`}>
                  <div className="flex flex-row items-center justify-center">
                        <Image
                          src={`${mapUniNameToLogo(item.uniName)}`}
                          alt={item.uniName}
                          width={0}
                          height={0}
                          sizes="(max-width: 640px) 20px, (max-width: 1024px) 40px, 56px"
                          className="mr-2 sm:mr-4 w-5 h-5 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-full aspect-square"
                        />
                        {item.uniName}
                  </div>
                </td>
              </tr>) : <></>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Table
