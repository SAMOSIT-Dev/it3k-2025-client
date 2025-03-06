'use client'
import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import Category from './components/Category'
import { AthleticsCategory } from './services/athletics.service'
import { useFetchAthleticsData } from './services/athletics.service'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation'

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AthleticsCategory>(
    AthleticsCategory.FEMALE_100M
  )
  const [{ data, loading, error }] = useFetchAthleticsData(selectedCategory)
  const router = useRouter()
  const universities = data?.data?.map((match) => match.teams).flat() || []

  return (
    <div className="font-Prompt min-h-screen w-full bg-black-300 p-10 md:p-16 lg:px-24 text-white">
      <div className="mb-2 md:mb-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1">
        <button onClick={() => router.back()}>
          <Icon
            icon={'solar:alt-arrow-left-bold'}
            className="lg:text-6xl md:5xl text-3xl p-0 cursor-pointer"
          />
        </button>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">กรีฑา</h1>
      </div>
      <Category selected={selectedCategory} onSelect={setSelectedCategory} />
      <Table data={universities} error={error} loading={loading} />
    </div>
  )
}

export default Page
