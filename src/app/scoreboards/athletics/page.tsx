"use client";

import Category from './components/Category'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import Table from '../components/Table'

export default function Athletics() {
  const router = useRouter()
  return (
    <div className="font-Prompt min-h-screen w-full bg-black-300 p-10 md:p-16 lg:px-24 text-white">
      <div
        className="mb-2 md:mb-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1">
          <button onClick={() => router.push('/scoreboards')}>
        <Icon
          icon={'solar:alt-arrow-left-bold'}
          className="lg:text-6xl md:5xl text-3xl p-0 cursor-pointer"
        />
        </button>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">กรีฑา</h1>
      </div>
      <Category />
      <Table/>
    </div>
  )
}
