"use client"

import type React from "react"
import {  useState } from "react"
// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/app/login/hooks/useAuth"

interface ScoreData {
  score_A_Q1: number
  score_B_Q1: number
  score_A_Q2: number
  score_B_Q2: number
  score_A_OT: number
  score_B_OT: number
}

interface ToastMessage {
  type: "success" | "error"
  message: string
}

export default function ScoreUpdateForm() {
  const [loading, setLoading] = useState(false)
  const [gameId, setGameId] = useState("")
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [scores, setScores] = useState<ScoreData>({
    score_A_Q1: 0,
    score_B_Q1: 0,
    score_A_Q2: 0,
    score_B_Q2: 0,
    score_A_OT: 0,
    score_B_OT: 0,
  })

  const handleInputChange = (field: keyof ScoreData, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setScores((prev) => ({
      ...prev,
      [field]: numValue,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!gameId) {
      setToast({
        type: "error",
        message: "Please enter a game ID",
      })
      setTimeout(() => setToast(null), 3000)
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/update-score?id=${gameId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scores),
      })

      if (!response.ok) {
        throw new Error("Failed to update scores")
      }

      await response.json()

      setToast({
        type: "success",
        message: "Scores updated successfully",
      })
    } catch (error) {
      setToast({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to update scores",
      })
    } finally {
      setLoading(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const totalScoreA = scores.score_A_Q1 + scores.score_A_Q2 + scores.score_A_OT
  const totalScoreB = scores.score_B_Q1 + scores.score_B_Q2 + scores.score_B_OT

  // const { accessToken } = useAuth()
  // const router = useRouter();

  // useEffect(() => {
  //     if (!accessToken) {
  //         router.push("/login"); 
  //     }
  // }, [accessToken, router]);

  // if (!accessToken) return null; 


  return (
    <div className="mt-40 mx-auto max-w-[80%] p-4 bg-white rounded-lg shadow-lg">
    <form onSubmit={handleSubmit}>
      {toast && (
        <div
          className={`mb-4 rounded-md p-4 ${
            toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="gameId" className="mb-1 block text-sm font-medium">
          Game ID
        </label>
        <input
          id="gameId"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter game ID"
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Team A</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="score_A_Q1" className="mb-1 block text-sm font-medium">
                Quarter 1
              </label>
              <input
                id="score_A_Q1"
                type="number"
                min="0"
                value={scores.score_A_Q1}
                onChange={(e) => handleInputChange("score_A_Q1", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="score_A_Q2" className="mb-1 block text-sm font-medium">
                Quarter 2
              </label>
              <input
                id="score_A_Q2"
                type="number"
                min="0"
                value={scores.score_A_Q2}
                onChange={(e) => handleInputChange("score_A_Q2", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="score_A_OT" className="mb-1 block text-sm font-medium">
                Overtime
              </label>
              <input
                id="score_A_OT"
                type="number"
                min="0"
                value={scores.score_A_OT}
                onChange={(e) => handleInputChange("score_A_OT", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="pt-2">
              <p className="font-semibold">
                Total: <span className="text-xl">{totalScoreA}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Team B</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="score_B_Q1" className="mb-1 block text-sm font-medium">
                Quarter 1
              </label>
              <input
                id="score_B_Q1"
                type="number"
                min="0"
                value={scores.score_B_Q1}
                onChange={(e) => handleInputChange("score_B_Q1", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="score_B_Q2" className="mb-1 block text-sm font-medium">
                Quarter 2
              </label>
              <input
                id="score_B_Q2"
                type="number"
                min="0"
                value={scores.score_B_Q2}
                onChange={(e) => handleInputChange("score_B_Q2", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="score_B_OT" className="mb-1 block text-sm font-medium">
                Overtime
              </label>
              <input
                id="score_B_OT"
                type="number"
                min="0"
                value={scores.score_B_OT}
                onChange={(e) => handleInputChange("score_B_OT", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="pt-2">
              <p className="font-semibold">
                Total: <span className="text-xl">{totalScoreB}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 md:w-auto"
        >
          {loading ? "Updating..." : "Update Scores"}
        </button>
      </div>
    </form>
    </div>
  )
}

