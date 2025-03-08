'use client'
import React, { useState } from 'react'
import Table from './components/Table'
import Category from './components/Category'
import BackButton from '@/shared/components/BackButton'

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
  const [currentCategory, setCurrentCategory] = useState<TCategory>(
    categories[0]
  )
  return (
    <div className="mt-[100px] font-Prompt min-h-[calc(100vh-100px)] w-full bg-black-300 px-10 p-1 md:px-20 lg:px-24 text-white">
      <div className=" w-[90%] mt-8 mb-4 md:mb-8 md:mt-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1 text-white ">
        <BackButton />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ">
          กีฬาพื้นบ้าน
        </h1>
      </div>
      <Category
        categories={categories}
        categoryState={currentCategory}
        setCategoryStateAction={setCurrentCategory}
      />
      <Table categoryId={currentCategory.id} />
    </div>
  )
}

export default TraditionScoreboardPage
