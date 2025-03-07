'use client'
import React, { useState } from 'react'
import Table from './components/Table'
import Category from './components/Category'
import { AthleticsCategory } from './services/athletics.service'
import { useFetchAthleticsData } from './services/athletics.service'
import BackButton from '@/shared/components/BackButton'

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AthleticsCategory>(
    AthleticsCategory.FEMALE_100M
  )
  const [{ data, loading, error }] = useFetchAthleticsData(selectedCategory)
  const universities = data?.data?.map((match) => match.teams).flat() || []

  return (
    <div className="mt-[100px] font-Prompt min-h-[calc(100vh-100px)] w-full bg-black-300 px-10 md:p-1 lg:px-24 text-white">
      <div className=" w-[90%] mt-8 mb-4 md:mb-8 md:mt-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1 text-white ">
        <BackButton />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ">Athletics</h1>
      </div>
      <Category selected={selectedCategory} onSelect={setSelectedCategory} />
      <Table data={universities} error={error} loading={loading} />
    </div>
  )
}

export default Page
