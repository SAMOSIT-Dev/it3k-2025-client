"use client";

import Category from './components/Category'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

export default function Athletics() {
  const router = useRouter()
  return (
    <div className="min-h-screen w-full bg-black-300 p-10 lg:p-20 text-white">
      <button
        className="mb-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1"
        onClick={() => router.push('/scoreboards')}>
        <Icon
          icon={'solar:alt-arrow-left-bold'}
          className="lg:text-6xl md:5xl text-4xl p-0 cursor-pointer"
        />
        <h1 className="text-3xl lg:text-4xl font-bold">กรีฑา</h1>
      </button>
      <Category />
    </div>
  )
}
