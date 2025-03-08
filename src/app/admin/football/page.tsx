'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  getFootballSocket,
  initFootballSocket
} from './utils/initFootballSocket'
import { useRouter } from 'next/navigation'
// import { useAuth } from '@/app/login/hooks/useAuth'

interface Team {
  name: string
  score: number
}

interface TeamData {
  rank: number
  university: string
  wins: number
  losses: number
  draws: number
  totalPointsScored: number
  totalPointsConceded: number
  pointDiff: number
}

interface Match {
  id: number
  team_A: Team
  team_B: Team
  status: string
  timeStart: string
  timeEnd: string
}

const AdminFootballScores = () => {
  // const { accessToken } = useAuth()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [headers, setHeaders] = useState({})
  const [teams, setTeams] = useState<TeamData[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [scores, setScores] = useState<
    Record<number, { team_A: number; team_B: number }>
  >({})
  const [updates, setUpdates] = useState<
    Record<
      number,
      {
        team_A_id: number
        team_B_id: number
        status: string
        timeStart: string
        timeEnd: string
        locationId: number
      }
    >
  >({})

  const [newMatch, setNewMatch] = useState({
    team_A_id: '',
    team_B_id: '',
    timeStart: '',
    timeEnd: '',
    locationId: 2
  })

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setAccessToken(token)
      setHeaders({ Authorization: `Bearer ${token}` })
    }

    const fetchTeams = async () => {
      await axios
        .get('https://it3k.sit.kmutt.ac.th/api/football/dashboard')
        .then((response) => {
          setTeams(response.data.data)
        })
        .catch((error) => console.error('Error fetching teams:', error))
    }

    const fetchMatches = async () => {
      await axios
        .get('https://it3k.sit.kmutt.ac.th/api/football/matches')
        .then((response) => {
          setMatches(response.data.data)
        })
        .catch((error) => console.error('Error fetching matches:', error))
    }
    fetchTeams()
    fetchMatches()
  }, [accessToken])

  const handleScoreChange = (
    matchId: number,
    team: 'team_A' | 'team_B',
    value: number
  ) => {
    setScores((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: value
      }
    }))
  }

  const handleInputChange = (field: string, value: string | number) => {
    setNewMatch((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdateChange = (
    matchId: number,
    field: string,
    value: string | number
  ) => {
    setUpdates((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: value
      }
    }))
  }

  const updateScore = (matchId: number) => {
    const updatedScore = scores[matchId]
    if (!updatedScore) return

    if (updatedScore.team_A === undefined) {
      updatedScore.team_A = 0
    } else if (updatedScore.team_B === undefined) {
      updatedScore.team_B = 0
    }

    // const socket = getFootballSocket()
    // if (socket) {
    //   console.log('update')
    //   console.log(typeof updatedScore.team_A)
    //   console.log(typeof updatedScore.team_B)
    //   console.log(matchId)
    //   if (socket.connected) {
    //     socket.emit('updateMatchScore', {
    //       id: matchId,
    //       score_A: updatedScore.team_A,
    //       score_B: updatedScore.team_B
    //     })
    //   } else {
    //     console.error('Socket is not connected, cannot emit event')
    //   }
    // }

    axios
      .put(
        `https://it3k.sit.kmutt.ac.th/api/admin/football/score/${matchId}`,
        {
          id: matchId,
          score_A: updatedScore.team_A,
          score_B: updatedScore.team_B
        },
        { headers: headers }
      )
      .then(() => {
        setMatches((prev) =>
          prev.map((match) =>
            match.id === matchId
              ? {
                  ...match,
                  team_A: { ...match.team_A, score: updatedScore.team_A },
                  team_B: { ...match.team_B, score: updatedScore.team_B }
                }
              : match
          )
        )
        alert(`Update score on match id ${matchId} successful`)
        router.refresh()
      })
      .catch((error) => console.error('Error updating score:', error))
  }

  const createNewMatch = () => {
    axios
      .post(
        'https://it3k.sit.kmutt.ac.th/api/admin/football',
        {
          team_A_id: newMatch.team_A_id,
          team_B_id: newMatch.team_B_id,
          timeStart: newMatch.timeStart,
          timeEnd: newMatch.timeEnd,
          locationId: newMatch.locationId
        },
        { headers: headers }
      )
      .then(() => {
        alert(`Create new match successful`)
        router.refresh()
      })
      .catch((error) => {
        console.error('Error creating match:', error)
      })
  }

  const updateMatch = (matchId: number) => {
    const updatedMatch = updates[matchId] || {}

    updatedMatch.locationId = 2

    // const socket = getFootballSocket()
    // if (socket) {
    //   console.log('update status')
    //   console.log(matchId)
    //   if (socket.connected) {
    //     socket.emit('updateMatchStatus', {
    //       id: matchId,
    //       status: updatedMatch.status
    //     })
    //   } else {
    //     console.error('Socket is not connected, cannot emit event')
    //   }
    // }

    axios
      .put(
        `https://it3k.sit.kmutt.ac.th/api/admin/football/status/${matchId}`,
        {
          status: updatedMatch.status
        },
        { headers: headers }
      )
      .then(() => {
        setMatches((prev) =>
          prev.map((match) =>
            match.id === matchId ? { ...match, ...updatedMatch } : match
          )
        )
        alert(`Update match id ${matchId} successful`)
        router.refresh()
      })
      .catch((error) => console.error('Error updating match:', error))
  }

  const deleteMatch = (matchId: number) => {
    axios
      .delete(`https://it3k.sit.kmutt.ac.th/api/admin/football/${matchId}`, {
        headers: headers
      })
      .then(() => {
        alert(`Delete match id ${matchId} successful`)
        router.refresh()
      })
      .catch((error) => console.error('Error deleting match:', error))
  }

  return (
    <div className="p-4 mt-28">
      <h1 className="text-xl font-bold mb-4">Admin Football Match Control</h1>

      <table className="w-full border-collapse mb-6 overflow-x-auto">
        <thead>
          <tr className="bg-gray-100 text-left sm:text-center">
            <th className="border p-2">University</th>
            <th className="border p-2">Wins-Draws-Losses</th>
            <th className="border p-2">Goals Scored-Lost</th>
            <th className="border p-2">Point Difference</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            return (
              <tr key={team.rank} className="hover:bg-gray-50">
                <td className="border p-2 text-center sm:text-left">
                  {team.university}
                </td>
                <td className="border p-2">
                  <div className="flex justify-center flex-wrap sm:flex-nowrap">
                    <span className="w-16 text-center border rounded p-1 mr-1">
                      {team.wins}
                    </span>
                    <span className="w-16 text-center border rounded p-1 mr-1">
                      {team.draws}
                    </span>
                    <span className="w-16 text-center border rounded p-1 mr-1">
                      {team.losses}
                    </span>
                  </div>
                </td>
                <td className="border p-2">
                  <div className="flex justify-center flex-wrap sm:flex-nowrap">
                    <span className="w-16 text-center border rounded p-1 mr-1">
                      {team.totalPointsScored}
                    </span>
                    <span className="w-16 text-center border rounded p-1 mr-1">
                      {team.totalPointsConceded}
                    </span>
                  </div>
                </td>
                <td className="border p-2 text-center">{team.pointDiff}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Form for creating a new match */}
      <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-2">
          Create New Match (1: KMUTT, 2: KMITL, 3: KMUTNB, 4: KMUTNB_PR)
        </h2>

        <div className="flex gap-4 mb-2">
          <input
            type="number"
            placeholder="Team A ID"
            className="border p-2"
            min={1}
            max={4}
            value={newMatch.team_A_id}
            onChange={(e) => handleInputChange('team_A_id', e.target.value)}
          />
          <input
            type="number"
            placeholder="Team B ID"
            className="border p-2"
            min={1}
            max={4}
            value={newMatch.team_B_id}
            onChange={(e) => handleInputChange('team_B_id', e.target.value)}
          />
        </div>

        <div className="flex gap-4 mb-2">
          <input
            type="datetime-local"
            placeholder="Start Time"
            className="border p-2"
            value={newMatch.timeStart}
            onChange={(e) => handleInputChange('timeStart', e.target.value)}
          />
          <input
            type="datetime-local"
            placeholder="End Time"
            className="border p-2"
            value={newMatch.timeEnd}
            onChange={(e) => handleInputChange('timeEnd', e.target.value)}
          />
        </div>

        {/* Create Match Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={createNewMatch}>
          Create Match
        </button>
      </div>

      {matches.map((match) => (
        <div
          key={match.id}
          className="p-4 border border-gray-300 rounded-lg mb-4 shadow">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{match.team_A.name}</span>
              <input
                type="number"
                className="w-12 text-center border border-gray-400 rounded p-1"
                min={0}
                value={scores[match.id]?.team_A ?? match.team_A.score ?? 0}
                onChange={(e) =>
                  handleScoreChange(match.id, 'team_A', Number(e.target.value))
                }
              />
            </div>
            <span className="text-lg font-bold">vs</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-12 text-center border border-gray-400 rounded p-1"
                min={0}
                value={scores[match.id]?.team_B ?? match.team_B.score ?? 0}
                onChange={(e) =>
                  handleScoreChange(match.id, 'team_B', Number(e.target.value))
                }
              />
              <span className="text-lg font-medium">{match.team_B.name}</span>
            </div>
          </div>
          <p className="text-sm mt-2">
            Status: {match.status} | Start: {match.timeStart} | End:{' '}
            {match.timeEnd}
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => updateScore(match.id)}>
            Update Score
          </button>

          <div className="mt-4 flex flex-col gap-2">
            {/* <div className="flex justify-start gap-4">
              <input
                type="number"
                placeholder="Team A id"
                className="border p-2"
                min={1}
                max={4}
                onChange={(e) =>
                  handleUpdateChange(match.id, 'team_A_id', e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Team B id"
                className="border p-2"
                min={1}
                max={4}
                onChange={(e) =>
                  handleUpdateChange(match.id, 'team_B_id', e.target.value)
                }
              />
            </div> */}

            <select
              className="border p-2"
              onChange={(e) =>
                handleUpdateChange(match.id, 'status', e.target.value)
              }>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="break">Break</option>
              <option value="finished">Finished</option>
            </select>
            {/* <input
              type="datetime-local"
              placeholder="Start Time"
              className="border p-2"
              onChange={(e) =>
                handleUpdateChange(match.id, 'timeStart', e.target.value)
              }
            />
            <input
              type="datetime-local"
              placeholder="End Time"
              className="border p-2"
              onChange={(e) =>
                handleUpdateChange(match.id, 'timeEnd', e.target.value)
              }
            /> */}
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => updateMatch(match.id)}>
              Update Match
            </button>
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => deleteMatch(match.id)}>
              Delete Match
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminFootballScores
