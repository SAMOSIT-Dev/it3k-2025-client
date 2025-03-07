'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import Table from './components/Table'
import Category from './components/Category'
import { useRouter } from 'next/navigation'

export type TCategory = {
  id: number
  name: string
}

const categories: TCategory[] = [
  { id: 1, name: 'ชักเย่อ' },
  { id: 2, name: 'กินวิบาก' },
  { id: 3, name: 'วิ่งเปรี้ยว' }
]

const TraditionScoreboardPage = () => {
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState<TCategory>(categories[0])
  return (
    <div className="font-Prompt min-h-screen w-full bg-black-300 p-10 md:p-16 lg:px-24 text-white">
      <div className="mb-2 md:mb-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1">
        <button onClick={() => router.back()}>
          <Icon
            icon={'solar:alt-arrow-left-bold'}
            className="lg:text-6xl md:5xl text-3xl p-0 cursor-pointer"
          />
        </button>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          กีฬาพื้นบ้าน
        </h1>
      </div>
      <Category categories={categories} categoryState={currentCategory} setCategoryStateAction={setCurrentCategory} />
      <Table categoryId={currentCategory.id}/>
    </div>
  )
}

export default TraditionScoreboardPage
