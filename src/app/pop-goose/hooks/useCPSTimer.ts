import { useRef } from 'react'

const useCPSTimer = () => {
  const startTimeRef = useRef(0)
  const endTimeRef = useRef(0)
  

  const startCPSTimer = () => {
    if (startTimeRef.current) return // Prevent starting if already started
    startTimeRef.current = performance.now()
    endTimeRef.current = 0
  }

  const endCPSTimer = () => {
    endTimeRef.current = performance.now()
  }

  const resetTimer = () => {
    startTimeRef.current = 0
  }

  const calculateCPS = (totalClicks: number) => {
    endCPSTimer()
    if (!startTimeRef.current || !endTimeRef.current) return 0
    const totalTime = (endTimeRef.current - startTimeRef.current) / 1000 // convert ms to seconds
    resetTimer()
    return totalTime > 0 ? totalClicks / totalTime : 0
  }

  return { startCPSTimer, endCPSTimer, resetTimer, calculateCPS }
}

export default useCPSTimer
