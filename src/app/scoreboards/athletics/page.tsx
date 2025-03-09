'use client'
import React, { useState } from 'react'
import Table from './components/Table'
import Category from './components/Category'
import { AthleticsCategory, IUniversity } from './services/athletics.service'
import { useFetchAthleticsData } from './services/athletics.service'
import BackButton from '@/shared/components/BackButton'

const universityFilterByMatchCategory = (category: string, data: IUniversity[]) => {
  switch (category) {
    case '100m_male':
      return data
    case '100m_female':
      return data?.filter(d => d.id !== 3)
    case '400m_male':
      return data?.filter(d => d.id !== 3)
    case '400m_female':
      return data?.filter(d => d.id !== 3)
  }
}

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AthleticsCategory>(
    AthleticsCategory.FEMALE_100M
  )
  const [{ data, loading, error }] = useFetchAthleticsData(selectedCategory)
  const universities = data?.data?.map((match) => match.teams).flat() || []

  return (
    <div className="pt-[100px] font-Prompt min-h-screen w-full bg-black-300 px-10 p-1 md:px-20 lg:px-24 text-white">
      <div className="w-[90%]">
        <div className=" mt-8 mb-4 md:mb-8 md:mt-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1 ">
          <BackButton />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ">
            Athletics
          </h1>
        </div>
        <Category selected={selectedCategory} onSelect={setSelectedCategory} />
        {
          universities ? (<Table
          data={universityFilterByMatchCategory(selectedCategory || '100m_female',  universities || []
          )}
          error={error}
          loading={loading}
        />) : <></> 
        }
        
      </div>
    </div>
  )
}

export default Page
