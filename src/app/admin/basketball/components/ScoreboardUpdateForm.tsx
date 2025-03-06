"use client"

import { useState, useEffect } from "react"
import { getBasketballMatchById } from "../actions/scoreboard.action"
import { getSocket, initSocket } from "../utils/socket"
import { IBaskballUpdate } from "../types/basketball"

interface IProps {
  id: string
}

export default function ScoreUpdateForm({ id }: IProps) {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [teamAName, setTeamAName] = useState<string>("")
  const [teamBName, setTeamBName] = useState<string>("")
  const [matchStatus, setMatchStatus] = useState<string>("")
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" })
  const [scores, setScores] = useState<IBaskballUpdate>({
    score_A_Q1: 0,
    score_B_Q1: 0,
    score_A_Q2: 0,
    score_B_Q2: 0,
    score_A_OT: 0,
    score_B_OT: 0,
    id: 0
  })

  useEffect(() => {
    const fetchMatchData = async () => {
      if (!id) return

      setLoading(true)
      try {
        const gameData = await getBasketballMatchById(Number(id))

        if (gameData) {
          const { team_A, team_B, status } = gameData
          setTeamAName(team_A.uniName)
          setTeamBName(team_B.uniName)
          setMatchStatus(status)
          setScores({
            score_A_Q1: team_A.score_Q1,
            score_B_Q1: team_B.score_Q1,
            score_A_Q2: team_A.score_Q2,
            score_B_Q2: team_B.score_Q2,
            score_A_OT: team_A.score_OT,
            score_B_OT: team_B.score_OT,
            id: gameData.id
          })
        } else {
          showNotification("error", `Game with ID ${id} was not found`)
        }
      } catch (error) {
        console.error("Error fetching match data:", error)
        showNotification("error", "Failed to fetch match data")
      } finally {
        setLoading(false)
      }
    }

    fetchMatchData()
  }, [id])

  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification({ type: null, message: "" })
    }, 5000)
  }

  const handleInputChange = (field: keyof IBaskballUpdate, value: string) => {
    // Ensure we only accept non-negative numbers
    let numValue = value === "" ? 0 : Math.max(0, parseInt(value, 10))

    // Handle NaN values
    if (isNaN(numValue)) numValue = 0

    setScores((prev) => ({
      ...prev,
      [field]: numValue,
    }))
  }

  useEffect(() => {
    const socket = initSocket()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.emit('requestLeaderboard')

    return () => {
      socket.disconnect()
    }
  }, [])

  const doUpdate = async () => {
    try {
        const socket = getSocket()

        socket?.emit('updateMatchScore', {
          ...scores
        })
    } catch (error) {
      console.error("Error updating scores:", error)
      showNotification("error", "Failed to update scores")
    }
  }

  const totalScoreA = scores.score_A_Q1 + scores.score_A_Q2 + scores.score_A_OT
  const totalScoreB = scores.score_B_Q1 + scores.score_B_Q2 + scores.score_B_OT

  const getWinningTeam = () => {
    if (totalScoreA > totalScoreB) return "A"
    if (totalScoreB > totalScoreA) return "B"
    return null
  }

  const winningTeam = getWinningTeam()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          {/* <Loader2 className="h-12 w-12 animate-spin text-blue-600" /> */}
          <p className="text-lg text-gray-600">Loading match data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Basketball Score Update</h2>
        {matchStatus && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${matchStatus === "FINISHED"
                ? "bg-green-100 text-green-800"
                : matchStatus === "ONGOING"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
              {matchStatus}
            </span>
          </div>
        )}
      </div>

      {notification.type && (
        <div className={`mb-6 p-4 rounded-md ${notification.type === "success"
            ? "bg-green-100 text-green-800 border border-green-200"
            : notification.type === "error"
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}>
          {notification.message}
        </div>
      )}

      <form onSubmit={doUpdate}>
        <div className="mb-8">
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="text-center flex-1">
                <h3 className="text-xl font-bold text-blue-700">{teamAName || "Team A"}</h3>
                <p className={`text-3xl font-bold mt-1 ${winningTeam === "A" ? "text-green-600" : ""}`}>
                  {totalScoreA}
                </p>
              </div>
              <div className="mx-4 text-2xl font-bold text-gray-400">vs</div>
              <div className="text-center flex-1">
                <h3 className="text-xl font-bold text-red-700">{teamBName || "Team B"}</h3>
                <p className={`text-3xl font-bold mt-1 ${winningTeam === "B" ? "text-green-600" : ""}`}>
                  {totalScoreB}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-blue-700">
              {teamAName || "Team A"}
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="score_A_Q1" className="mb-1 block text-sm font-medium text-gray-700">
                  Quarter 1
                </label>
                <input
                  id="score_A_Q1"
                  type="number"
                  min="0"
                  value={scores.score_A_Q1 || ""}
                  onChange={(e) => handleInputChange("score_A_Q1", e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="score_A_Q2" className="mb-1 block text-sm font-medium text-gray-700">
                  Quarter 2
                </label>
                <input
                  id="score_A_Q2"
                  type="number"
                  min="0"
                  value={scores.score_A_Q2 || ""}
                  onChange={(e) => handleInputChange("score_A_Q2", e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="score_A_OT" className="mb-1 block text-sm font-medium text-gray-700">
                  Overtime
                </label>
                <input
                  id="score_A_OT"
                  type="number"
                  min="0"
                  value={scores.score_A_OT || ""}
                  onChange={(e) => handleInputChange("score_A_OT", e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="pt-2">
                <p className="font-semibold">
                  Total: <span className="text-xl text-blue-700">{totalScoreA}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-red-100 bg-red-50 p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-red-700">
              {teamBName || "Team B"}
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="score_B_Q1" className="mb-1 block text-sm font-medium text-gray-700">
                  Quarter 1
                </label>
                <input
                  id="score_B_Q1"
                  type="number"
                  min="0"
                  value={scores.score_B_Q1 || ""}
                  onChange={(e) => handleInputChange("score_B_Q1", e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="score_B_Q2" className="mb-1 block text-sm font-medium text-gray-700">
                  Quarter 2
                </label>
                <input
                  id="score_B_Q2"
                  type="number"
                  min="0"
                  value={scores.score_B_Q2 || ""}
                  onChange={(e) => handleInputChange("score_B_Q2", e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="score_B_OT" className="mb-1 block text-sm font-medium text-gray-700">
                  Overtime
                </label>
                <input
                  id="score_B_OT"
                  type="number"
                  min="0"
                  value={scores.score_B_OT || ""}
                  onChange={(e) => handleInputChange("score_B_OT", e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div className="pt-2">
                <p className="font-semibold">
                  Total: <span className="text-xl text-red-700">{totalScoreB}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 md:w-auto"
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                {/* <IoLoad className="mr-2 h-4 w-4 animate-spin" /> */}
                Updating...
              </span>
            ) : (
              "Update Scores"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}