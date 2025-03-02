'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className="flex items-center">
      <span className="inline-block w-7 h-7">
        <Icon
          icon="solar:alt-arrow-left-bold"
          className="text-3xl p-0 cursor-pointer"
        />
      </span>
    </button>
  )
}
