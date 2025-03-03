'use client'
import styles from '@/app/styles/game/game.module.css'
import { useState } from 'react'

interface UniversitySelectModalProps {
  onSubmit: (selectedUni: string) => void
}

const UniversitySelectModal = ({ onSubmit }: UniversitySelectModalProps) => {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    null
  )
  const [error, setError] = useState(false)
  const universityLists = [
    { name: 'KMUTT', color: '#E90000' },
    { name: 'KMITL', color: '#F16322' },
    { name: 'KMUTNB BKK', color: '#AC3520' },
    { name: 'KMUTNB PR', color: '#AC3520' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUniversity(e.target.value)
    setError(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUniversity) {
      setError(true)
      return
    }
    onSubmit(selectedUniversity)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#59595990] z-50">
      <div className="z-20 w-[320px] h-[220px] sm:w-[550px] sm:h-[350px] flex flex-col items-start justify-start gap-5 sm:gap-8 p-6 sm:py-8 sm:px-16  bg-[#fff] font-PressStart2P rounded-[30px] sm:rounded-[50px]">
        <h1
          className={`mx-auto text-[11px] sm:text-base ${error ? 'text-red-500' : ''}`}>
          Select your institution<span className="text-xx sm:text-2xl">🌟</span>
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2 sm:gap-6">
            {universityLists.map((uni) => (
              <span
                key={uni.name}
                className="flex flex-row items-center justify-start gap-2 sm:gap-4">
                <input
                  type="radio"
                  name="university"
                  value={uni.name}
                  checked={selectedUniversity === uni.name}
                  onChange={handleChange}
                  className={`${styles['custom-radio']}`}
                />
                <span
                  style={{ color: uni.color }}
                  className="text-[14px] sm:text-xl">
                  {uni.name}
                </span>
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="p-2 bg-[#ffc02e] rounded-md float-right transition-all hover:bg-[#ffb300] text-[10px] sm:text-base">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UniversitySelectModal
