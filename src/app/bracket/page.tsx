'use client'

import React, { useState, useMemo, JSX } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import useSWR from 'swr'
import Image from 'next/image'
import './style.css'
import kmitlLogo from '../../../public/images/KMITL_logo.png'
import kmuttLogo from '../../../public/images/KMUTT_logo.png'
import kmutnbLogo from '../../../public/images/KMUTNB_logo.png'
import gooseLogo from '../../../public/images/pop_goose/default_goose.png'
import BackButton from '@/shared/components/BackButton'

// Interfaces
interface Match {
  matchId: number
  team1: string | null
  team2: string | null
  score1: number
  score2: number
  type?: string
}

const UniIdToName: Record<number | string, string> = {
  1: 'KMUTT',
  2: 'KMITL',
  3: 'KMUTNB',
  4: 'KMUTNB PR'
}

type TeamKey = 'team1' | 'team2'

const TEAM_OPTIONS = [
  'KMUTT',
  'KMUTNB',
  'KMITL',
  'KMUTNB BKK',
  'BLANK',
  'Null'
] as const

interface ApiResponse {
  success: boolean
  message: string
  data: SportMatch[]
}

interface SportMatch {
  matchId: number
  type: string
  team_A_id: number
  team_B_id: number
  locationId: number
  locationName?: string
  time: string
  team_A_details?: {
    id: number
    uniName: string
    image: string
    color_code: string
  }
  team_B_details?: {
    id: number
    uniName: string
    image: string
    color_code: string
  }
  pingpong_sets?: Array<{
    id: number
    pingpong_match_id: number
    round: number
    score_A: number
    score_B: number
  }>
  badminton_sets?: Array<{
    id: number
    badminton_match_id: number
    round: number
    score_A: number
    score_B: number
  }>
  result_A?: number
  result_B?: number
}

interface BracketProps {
  sport?: string
}

// Constants
const SPORT_NAMES: Record<string, string> = {
  badminton: 'Badminton',
  pingpong: 'Table Tennis'
}

const BUTTON_TYPES: Record<string, readonly string[]> = {
  badminton: [
    'mix',
    'single_male',
    'single_female',
    'pair_male',
    'pair_female'
  ],
  pingpong: ['mix', 'single_male', 'single_female', 'pair_male', 'pair_female']
}

const TEAM_LOGOS: Record<string, string> = {
  KMITL: kmitlLogo.src,
  KMUTNB: kmutnbLogo.src,
  KMUTT: kmuttLogo.src,
  KMUTNB_PR: kmutnbLogo.src,
  Null: gooseLogo.src,
  BLANK: gooseLogo.src
}

const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return await response.json()
}

const checkAdminStatus = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    return !!token
  }
  return false
}

// Component
const Bracket: React.FC<BracketProps> = ({ sport: propSport }) => {
  const [sport] = useState<string>(propSport || 'pingpong')
  const [isAdmin] = useState<boolean>(() => checkAdminStatus())
  const [editingTeam, setEditingTeam] = useState<{
    matchId: number
    teamKey: TeamKey
  } | null>(null)
  const [selectedType, setSelectedType] = useState<string>('mix')

  const { data, error, mutate } = useSWR<ApiResponse>(
    sport && selectedType
      ? `https://it3k.sit.kmutt.ac.th/api/${sport}/${selectedType}`
      : sport
        ? `https://it3k.sit.kmutt.ac.th/api/${sport}`
        : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
      fallbackData: { success: false, message: 'No data available', data: [] }
    }
  )

  const computedMatches = useMemo(() => {
    if (!data || !data.data.length) {
      return {
        round1: [],
        round2: [],
        final: null,
        third: null
      }
      // return {
      //   round1: [...Array(4)].map((_, i) => ({ matchId: i + 1, team1: null, team2: null, score1: 0, score2: 0, type: 'mix' })),
      //   round2: [...Array(2)].map((_, i) => ({ matchId: i + 5, team1: null, team2: null, score1: 0, score2: 0, type: 'mix' })),
      //   final: { matchId: 7, team1: null, team2: null, score1: 0, score2: 0, type: 'mix' },
      //   third: { matchId: 8, team1: null, team2: null, score1: 0, score2: 0, type: 'mix' },
      // };
    }

    const transformedMatches: Match[] = data.data.map((item: SportMatch) => ({
      matchId: item.matchId,
      team1: UniIdToName[item.team_A_id] || `TBD`,
      team2: UniIdToName[item.team_B_id] || `TBD`,
      score1:
        item.result_A ??
        (sport === 'pingpong'
          ? item.pingpong_sets?.reduce((sum, set) => sum + set.score_A, 0) || 0
          : item.badminton_sets?.reduce((sum, set) => sum + set.score_A, 0) ||
            0),
      score2:
        item.result_B ??
        (sport === 'pingpong'
          ? item.pingpong_sets?.reduce((sum, set) => sum + set.score_B, 0) || 0
          : item.badminton_sets?.reduce((sum, set) => sum + set.score_B, 0) ||
            0),
      type: item.type || 'mix'
    }))

    const round1Ids = [1, 2, 3, 4]
    const round2Ids = [5, 6]
    const finalId = 8
    const thirdPlaceId = 7

    return {
      round1: round1Ids.map(
        (id) =>
          transformedMatches.find((m) => m.matchId === id) || {
            matchId: id,
            team1: null,
            team2: null,
            score1: 0,
            score2: 0,
            type: 'mix'
          }
      ),
      round2: round2Ids.map(
        (id) =>
          transformedMatches.find((m) => m.matchId === id) || {
            matchId: id,
            team1: null,
            team2: null,
            score1: 0,
            score2: 0,
            type: 'mix'
          }
      ),
      final: transformedMatches.find((m) => m.matchId === finalId) || {
        matchId: finalId,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: 'mix'
      },
      third: transformedMatches.find((m) => m.matchId === thirdPlaceId) || {
        matchId: thirdPlaceId,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: 'mix'
      }
    }
  }, [data, sport])

  const getTeamLogo = (teamName: string | null): string =>
    teamName && teamName in TEAM_LOGOS ? TEAM_LOGOS[teamName] : gooseLogo.src

  const apiCall = async (
    url: string,
    method: string,
    body?: unknown
  ): Promise<void> => {
    const token = localStorage.getItem('accessToken')
    if (!token || !isAdmin) return

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: body ? JSON.stringify(body) : undefined
    })

    if (!response.ok) throw new Error(`Failed API call: ${response.status}`)
    if (method !== 'GET') mutate() // เรียก mutate เฉพาะเมื่อมีการเปลี่ยนแปลงข้อมูล
  }

  // const createMatch = async (match: Match) => {
  //   const [teamAId, teamBId] = [match.team1, match.team2].map((t) => (t ? TEAM_OPTIONS.findIndex((tn) => tn === t) + 1 : 0));
  //   await apiCall(`https://it3k.sit.kmutt.ac.th/api/admin/${sport}/matches`, 'POST', {
  //     type: match.type || 'mix',
  //     team_A_id: teamAId,
  //     team_B_id: teamBId,
  //     time: new Date().toISOString(),
  //     locationId: 2,
  //   });
  // };

  const updateMatch = async (match: Match) => {
    const [teamAId, teamBId] = [match.team1, match.team2].map((t) =>
      t ? TEAM_OPTIONS.findIndex((tn) => tn === t) + 1 : 0
    )
    await apiCall(
      `https://it3k.sit.kmutt.ac.th/api/admin/${sport}/matches/${match.matchId}`,
      'PUT',
      {
        type: match.type || 'mix',
        team_A_id: teamAId,
        team_B_id: teamBId,
        time: new Date().toISOString(),
        locationId: 2
      }
    )
  }

  const createSet = async (matchId: number, score1: number, score2: number) => {
    await apiCall(
      `https://it3k.sit.kmutt.ac.th/api/admin/${sport}/sets`,
      'POST',
      {
        [`${sport}_match_id`]: matchId,
        round: 1,
        score_A: score1,
        score_B: score2
      }
    )
  }

  const handleScoreChange = async (
    matchId: number,
    team: 'score1' | 'score2',
    delta: number
  ): Promise<void> => {
    if (!isAdmin) return

    // อัปเดตข้อมูลใน API โดยตรงและเรียก mutate เพื่อรีเฟรชข้อมูล
    const match = [
      ...computedMatches.round1,
      ...computedMatches.round2,
      computedMatches.final,
      computedMatches.third
    ].find((m) => m.matchId === matchId)
    if (!match) return

    const updatedMatch = { ...match, [team]: Math.max(0, match[team] + delta) }
    await updateMatch(updatedMatch)
    await createSet(matchId, updatedMatch.score1, updatedMatch.score2)
  }

  const handleTeamNameChange = async (
    oldName: string | null,
    newName: string,
    matchId: number,
    teamKey: TeamKey
  ): Promise<void> => {
    if (!isAdmin || oldName === newName || !newName.trim()) return

    const match = [
      ...computedMatches.round1,
      ...computedMatches.round2,
      computedMatches.final,
      computedMatches.third
    ].find((m) => m.matchId === matchId)
    if (!match) return

    const updatedMatch = { ...match, [teamKey]: newName }
    await updateMatch(updatedMatch)
    setEditingTeam(null)
  }

  const startEditing = (matchId: number, teamKey: TeamKey): void => {
    if (!isAdmin) return
    setEditingTeam({ matchId, teamKey })
  }

  const renderTeamSelector = (match: Match, teamKey: TeamKey): JSX.Element => {
    const teamName = match[teamKey]
    if (
      isAdmin &&
      editingTeam?.matchId === match.matchId &&
      editingTeam?.teamKey === teamKey
    ) {
      return (
        <div
          className="absolute bg-white text-black p-2 rounded shadow-lg"
          style={{ zIndex: 1000, left: '50px', top: '0' }}>
          {TEAM_OPTIONS.map((team) => (
            <button
              key={team}
              className="block w-full text-left px-2 py-1 hover:bg-gray-200"
              onClick={() =>
                handleTeamNameChange(teamName, team, match.matchId, teamKey)
              }>
              {team}
            </button>
          ))}
          <button
            className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-200"
            onClick={() => setEditingTeam(null)}>
            Cancel
          </button>
        </div>
      )
    }
    return (
      <span
        className="text-white font-bold"
        onClick={() => startEditing(match.matchId, teamKey)}
        style={{ cursor: isAdmin ? 'pointer' : 'default' }}>
        {teamName || 'TBD'} {isAdmin && '(Edit)'}
      </span>
    )
  }

  const handleFilterClick = (type: string): void => {
    setSelectedType(type);
  }

  if (!sport)
    return <div className="text-white text-center p-4">No sport specified</div>
  // if (isLoading)
  //   return <div className="text-white text-center p-4">Loading...</div>
  if (error)
    return (
      <div className="text-white text-center p-4">
        Error Loading Data: {error.message}
      </div>
    )

  return (
    <div className="brackets-wrapper-container mt-[100px]">
      <div className="sport-section mb-8 flex flex-col">
        <h1 className="text-white text-3xl sm:text-4xl mb-6 font-extrabold flex">
          <BackButton />
          {SPORT_NAMES[sport]}
        </h1>
        <div
          className="font-Prompt flex overflow-x-scroll h-[65px] justify-center items-center mb-3"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
          <div className="relative w-full whitespace-nowrap mb-4 scrollbar-hide md:flex md:justify-center md:space-x-2">
            <div className="w-full flex space-x-2 px-2 md:px-0">
              {BUTTON_TYPES[sport]?.map((type) => (
                <button
                  key={type}
                  className={`rounded-lg px-4 py-2 transition-all duration-300 ${
                    selectedType == type
                      ? 'bg-red-500 text-white shadow-[0_0_5px_4px_rgba(255,0,0,0.4)]'
                      : 'border border-red-500 text-white hover:shadow-[0_0_5px_4px_rgba(255,0,0,0.4)] hover:border-red-500'
                  }`}
                  onClick={() => handleFilterClick(type)}>
                  {type === 'mix'
                    ? 'Mixed Doubles'
                    : type === 'single_male'
                      ? "Men's Singles"
                      : type === 'single_female'
                        ? "Women's Singles"
                        : type === 'pair_male'
                          ? "Men's Doubles"
                          : "Women's Doubles"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <TransformWrapper initialScale={1} minScale={0.5} maxScale={5}>
          <TransformComponent
            wrapperStyle={{
              border: '2px solid #ff0000',
              background: '#000',
              padding: '10px',
              overflow: 'hidden',
              cursor: 'grab',
              boxShadow: '0 4px 8px rgba(255, 0, 0, 0.5)',
              width: '80%',
              maxWidth: '1200px',
              height: 'fit-content'
            }}
            contentStyle={{ transform: 'scale(1)' }}>
            <div className="p-8 bg-black min-h-screen bracket-container">
              <div className="relative flex gap-32 ml-0 md:ml-48 font-bold">
                <div className="flex flex-col gap-24">
                  {computedMatches.round1.map((match, index) => (
                    <div key={match.matchId} className="relative match-wrapper">
                      <h2 className="text-white text-center text-xl mb-4">
                        Quarter-Final
                      </h2>
                      <div className="w-60 bg-black border border-red-600 rounded">
                        <div className="flex justify-between items-center p-3 border-b border-red-700">
                          <div className="flex items-center gap-3 relative">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(match.team1)}
                              alt={match.team1 || 'TBD'}
                              className="w-8 h-8"
                            />
                            {renderTeamSelector(match, 'team1')}
                          </div>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score1', -1)
                              }>
                              -
                            </button>
                            <span className="text-white mx-2">
                              {match.score1}
                            </span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score1', 1)
                              }>
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(match.team2)}
                              alt={match.team2 || 'TBD'}
                              className="w-8 h-8"
                            />
                            {renderTeamSelector(match, 'team2')}
                          </div>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score2', -1)
                              }>
                              -
                            </button>
                            <span className="text-white mx-2">
                              {match.score2}
                            </span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score2', 1)
                              }>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`connector-wrapper ${index % 2 === 0 ? 'connector-top' : 'connector-bottom'}`}>
                        <div className="connector-horizontal" />
                        {index % 2 === 0 && (
                          <div className="connector-vertical" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-48 mt-24">
                  {computedMatches.round2.map((match, index) => (
                    <div
                      key={match.matchId}
                      className={`relative match-wrapper ${index === 1 ? 'semifinal-bottom' : ''}`}>
                      <h2 className="text-white text-center text-xl mb-4">
                        Semi Final
                      </h2>
                      <div className="w-60 bg-black border border-red-600 rounded-lg">
                        <div className="flex justify-between items-center p-3 border-b border-red-600">
                          <div className="flex items-center gap-3 relative">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(match.team1)}
                              alt={match.team1 || 'TBD'}
                              className="w-8 h-8"
                            />
                            {renderTeamSelector(match, 'team1')}
                          </div>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score1', -1)
                              }>
                              -
                            </button>
                            <span className="text-white mx-2">
                              {match.score1}
                            </span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score1', 1)
                              }>
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(match.team2)}
                              alt={match.team2 || 'TBD'}
                              className="w-8 h-8"
                            />
                            {renderTeamSelector(match, 'team2')}
                          </div>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score2', -1)
                              }>
                              -
                            </button>
                            <span className="text-white mx-2">
                              {match.score2}
                            </span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(match.matchId, 'score2', 1)
                              }>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`connector-wrapper ${index === 0 ? 'connector-top' : 'connector-bottom'}`}>
                        <div className="connector-horizontal" />
                        {index === 0 && <div className="connector-vertical1" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-center">
                  <h2 className="text-white text-center text-xl mb-4">Final</h2>
                  {computedMatches.final && (
                    <div className="w-60 bg-black border border-red-600 rounded">
                      <div className="flex justify-between items-center p-3 border-b border-red-600">
                        <div className="flex items-center gap-3 relative">
                          <Image
                            width={32}
                            height={32}
                            src={getTeamLogo(computedMatches.final.team1)}
                            alt={computedMatches.final.team1 || 'TBD'}
                            className="w-8 h-8"
                          />
                          {renderTeamSelector(computedMatches.final, 'team1')}
                        </div>
                        <div
                          className={isAdmin ? 'hidden' : 'score-separator'}
                        />
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                computedMatches.final.matchId,
                                'score1',
                                -1
                              )
                            }>
                            -
                          </button>
                          <span className="text-white mx-2">
                            {computedMatches.final.score1}
                          </span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                computedMatches.final.matchId,
                                'score1',
                                1
                              )
                            }>
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3">
                        <div className="flex items-center gap-3 relative">
                          <Image
                            width={32}
                            height={32}
                            src={getTeamLogo(computedMatches.final.team2)}
                            alt={computedMatches.final.team2 || 'TBD'}
                            className="w-8 h-8"
                          />
                          {renderTeamSelector(computedMatches.final, 'team2')}
                        </div>
                        <div
                          className={isAdmin ? 'hidden' : 'score-separator'}
                        />
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                computedMatches.final.matchId,
                                'score2',
                                -1
                              )
                            }>
                            -
                          </button>
                          <span className="text-white mx-2">
                            {computedMatches.final.score2}
                          </span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                computedMatches.final.matchId,
                                'score2',
                                1
                              )
                            }>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-60 rounded mt-6" id="third">
                    <h2 className="text-white text-center text-xl ">
                      Third Place
                    </h2>
                    {computedMatches.third && (
                      <div
                        className="w-60 bg-black border border-red-600 rounded mt-6"
                        id="third">
                        <div className="flex justify-between items-center p-3 border-b border-red-600">
                          <div className="flex items-center gap-3 relative">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(computedMatches.third.team1)}
                              alt={computedMatches.third.team1 || 'TBD'}
                              className="w-8 h-8"
                            />
                            {renderTeamSelector(computedMatches.third, 'team1')}
                          </div>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(
                                  computedMatches.third.matchId,
                                  'score1',
                                  -1
                                )
                              }>
                              -
                            </button>
                            <span className="text-white mx-2">
                              {computedMatches.third.score1}
                            </span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(
                                  computedMatches.third.matchId,
                                  'score1',
                                  1
                                )
                              }>
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(computedMatches.third.team2)}
                              alt={computedMatches.third.team2 || 'TBD'}
                              className="w-8 h-8"
                            />
                            {renderTeamSelector(computedMatches.third, 'team2')}
                          </div>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(
                                  computedMatches.third.matchId,
                                  'score2',
                                  -1
                                )
                              }>
                              -
                            </button>
                            <span className="text-white mx-2">
                              {computedMatches.third.score2}
                            </span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() =>
                                handleScoreChange(
                                  computedMatches.third.matchId,
                                  'score2',
                                  1
                                )
                              }>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  )
}

export default Bracket
