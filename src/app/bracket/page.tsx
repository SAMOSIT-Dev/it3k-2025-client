'use client'

import React, { useState, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import './style.css'
import kmitlLogo from '../../../public/images/KMITL_logo.png'
import kmuttLogo from '../../../public/images/KMUTT_logo.png'
import kmutnbLogo from '../../../public/images/KMUTNB_logo.png'

interface Match {
  id: number
  team1: string
  team2: string
  score1: number
  score2: number
}

type Round = 'round1' | 'round2' | 'final' | 'thirdPlace'
type TeamKey = 'team1' | 'team2'
const TEAM_OPTIONS = ['KMUTT', 'KMUTNB', 'KMITL', 'KMUTNB BKK', 'BLANK', 'Null'] as const
type TeamName = typeof TEAM_OPTIONS[number]

const fetchRealData = async (): Promise<{
  round1: Match[];
  round2: Match[];
  final: Match | null;
  thirdPlace: Match | null;
}> => {
  try {
    const response = await fetch('https://678dadbfa64c82aeb11dab32.mockapi.io/api/pages/Learning', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // API 
    const matches: Match[] = data.map((item: any) => ({
      id: item.id,
      team1: item.team_A_details?.image?.split('_')[0]?.toUpperCase() || 'Null',
      team2: item.team_B_details?.image?.split('_')[0]?.toUpperCase() || 'Null',
      score1: item.pingpong_sets?.[0]?.score_A || 0,
      score2: item.pingpong_sets?.[0]?.score_B || 0,
    }));

    // จัดกลุ่มข้อมูลตาม ID โดยระบุ Type ของ match เป็น Match
    const round1 = matches.filter((match: Match) => [1, 2, 3, 4].includes(match.id));
    const round2 = matches.filter((match: Match) => [5, 6].includes(match.id));
    const final = matches.find((match: Match) => match.id === 7) || null;
    const thirdPlace = matches.find((match: Match) => match.id === 8) || null;

    return { round1, round2, final, thirdPlace };
  } catch (error) {
    console.error('Error fetching real API data:', error);
    return {
      round1: [],
      round2: [],
      final: null,
      thirdPlace: null,
    };
  }
};
const updateMockMatch = async (match: Match, round: Round) => {
  // ยังคงไว้สำหรับการอัปเดต mock data แต่สามารถปรับเป็นการเรียก API จริงได้
  return new Promise<Match>((resolve) => {
    setTimeout(() => resolve(match), 200)
  })
}

const Bracket: React.FC<{ sport: string }> = ({ sport }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [round1Matches, setRound1Matches] = useState<Match[]>([]);
  const [round2Matches, setRound2Matches] = useState<Match[]>([]);
  const [sportName, setSportName] = useState('');
  const [finalMatch, setFinalMatch] = useState<Match | null>(null);
  const [thirdPlaceMatch, setThirdPlaceMatch] = useState<Match | null>(null);
  const [editingTeam, setEditingTeam] = useState<{ matchId: number; TeamKey: TeamKey; round: Round } | null>(null);
  const sportNames: Record<string, string> = {
    badminton: "แบดมินตัน",
    pingpong: "ปิงปอง",
  };
  useEffect(() => {
    setSportName(sportNames[sport] || sport); // ถ้าไม่มีใน sportNames ให้ใช้ชื่อเดิม
  }, [sport]);
  const [teamLogos] = useState<Record<string, string>>({
    KMITL: kmitlLogo.src,
    'KMUTNB BKK': kmutnbLogo.src,
    KMUTT: kmuttLogo.src,
    KMUTNB: kmutnbLogo.src,
    Null: '/images/default.png',
    BLANK: '/images/default.png',
  })

  useEffect(() => {
    const loadMatches = async () => {
      const data = await fetchRealData()

      // ตั้งค่า state ตามข้อมูลจาก API
      setRound1Matches(data.round1)
      setRound2Matches(data.round2)
      setFinalMatch(data.final)
      setThirdPlaceMatch(data.thirdPlace)
    }
    
    loadMatches()
  }, [])

  const getTeamLogo = (teamName: string): string => teamLogos[teamName] || '/images/default.png'

  const handleScoreChange = async (matchId: number, team: 'score1' | 'score2', delta: number, round: Round) => {
    const updateMatch = (match: Match) => ({
      ...match,
      [team]: Math.max(0, match[team] + delta),
    })

    if (round === 'round1') {
      const updatedMatches = round1Matches.map((match) => (match.id === matchId ? updateMatch(match) : match))
      setRound1Matches(updatedMatches)
      await updateMockMatch(updatedMatches.find((m) => m.id === matchId)!, round)
    } else if (round === 'round2') {
      const updatedMatches = round2Matches.map((match) => (match.id === matchId ? updateMatch(match) : match))
      setRound2Matches(updatedMatches)
      await updateMockMatch(updatedMatches.find((m) => m.id === matchId)!, round)
    } else if (round === 'final' && finalMatch && matchId === finalMatch.id) {
      const updatedMatch = updateMatch(finalMatch)
      setFinalMatch(updatedMatch)
      await updateMockMatch(updatedMatch, round)
    } else if (round === 'thirdPlace' && thirdPlaceMatch && matchId === thirdPlaceMatch.id) {
      const updatedMatch = updateMatch(thirdPlaceMatch)
      setThirdPlaceMatch(updatedMatch)
      await updateMockMatch(updatedMatch, round)
    }
  }

  const handleTeamNameChange = async (
    oldName: string,
    newName: string,
    matchId: number,
    teamKey: TeamKey,
    round: Round
  ) => {
    if (oldName === newName || !newName.trim()) return

    const updateTeamInMatches = (matches: Match[]) =>
      matches.map((match) => (match.id === matchId ? { ...match, [teamKey]: newName } : match))

    if (round === 'round1') {
      const updatedMatches = updateTeamInMatches(round1Matches)
      setRound1Matches(updatedMatches)
      await updateMockMatch(updatedMatches.find((m) => m.id === matchId)!, round)
    } else if (round === 'round2') {
      const updatedMatches = updateTeamInMatches(round2Matches)
      setRound2Matches(updatedMatches)
      await updateMockMatch(updatedMatches.find((m) => m.id === matchId)!, round)
    } else if (round === 'final' && finalMatch && matchId === finalMatch.id) {
      const updatedMatch = { ...finalMatch, [teamKey]: newName }
      setFinalMatch(updatedMatch)
      await updateMockMatch(updatedMatch, round)
    } else if (round === 'thirdPlace' && thirdPlaceMatch && matchId === thirdPlaceMatch.id) {
      const updatedMatch = { ...thirdPlaceMatch, [teamKey]: newName }
      setThirdPlaceMatch(updatedMatch)
      await updateMockMatch(updatedMatch, round)
    }
    setEditingTeam(null)
  }

  const startEditing = (matchId: number, teamKey: TeamKey, round: Round) => {
    if (!isAdmin) return
    setEditingTeam({ matchId, teamKey, round })
  }

  const renderTeamSelector = (match: Match, teamKey: TeamKey, round: Round) => {
    const teamName = match[teamKey]
    return isAdmin && editingTeam?.matchId === match.id && editingTeam?.teamKey === teamKey ? (
      <div className="absolute bg-white text-black p-2 rounded shadow-lg" style={{ zIndex: 1000, left: '50px', top: '0' }}>
        {TEAM_OPTIONS.map((team) => (
          <button
            key={team}
            className="block w-full text-left px-2 py-1 hover:bg-gray-200"
            onClick={() => handleTeamNameChange(teamName, team, match.id, teamKey, round)}
          >
            {team}
          </button>
        ))}
        <button className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-200" onClick={() => setEditingTeam(null)}>
          Cancel
        </button>
      </div>
    ) : (
      <span
        className="text-white font-bold"
        onClick={() => startEditing(match.id, teamKey, round)}
        style={{ cursor: isAdmin ? 'pointer' : 'default' }}
      >
        {teamName} {isAdmin && '(Edit)'}
      </span>
    )
  }

  if (!finalMatch || !thirdPlaceMatch) return <div className="text-white">Loading matches...</div>

  return (
    <div className="brackets-wrapper-container">
     <div className="sport-section mb-8 flex flex-col">
  <h1 className="text-white text-3xl sm:text-4xl mb-6 font-extrabold">{sportName}</h1>
  <div className="slider-container">
    <div className="slider-content flex">
      <button className="btn-bracket">คู่ผสม</button>
      <button className="btn-bracket">ชายคู่</button>
      <button className="btn-bracket">ชายเดี่ยว</button>
      <button className="btn-bracket">หญิงคู่</button>
      <button className="btn-bracket" onClick={() => setIsAdmin(!isAdmin)}>หญิงเดี่ยว</button>
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
            }}
            contentStyle={{ transform: 'scale(0.8)' }}
          >
            <div className="p-8 bg-black min-h-screen bracket-container">
              <div className="relative flex gap-32 ml-48 font-bold">
                {/* Round 1 */}
                <div className="flex flex-col gap-24">
                  {round1Matches.map((match, index) => (
                    <div key={match.id} className="relative match-wrapper">
                      <div className="w-60 bg-black border border-red-600 rounded">
                        <div className="flex justify-between items-center p-3 border-b border-red-700">
                          <div className="flex items-center gap-3 relative">
                            <img src={getTeamLogo(match.team1)} alt={match.team1} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team1', 'round1')}
                            <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          </div>
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', -1, 'round1')}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score1}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', 1, 'round1')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <img src={getTeamLogo(match.team2)} alt={match.team2} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team2', 'round1')}
                            <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          </div>
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', -1, 'round1')}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score2}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', 1, 'round1')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={`connector-wrapper ${index % 2 === 0 ? 'connector-top' : 'connector-bottom'}`}>
                        <div className="connector-horizontal" />
                        {index % 2 === 0 && <div className="connector-vertical" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Round 2 */}
                <div className="flex flex-col gap-48 mt-24">
                  {round2Matches.map((match, index) => (
                    <div key={match.id} className={`relative match-wrapper ${index === 1 ? 'semifinal-bottom' : ''}`}>
                      <div className="w-60 bg-black border border-red-600 rounded-lg">
                        <div className="flex justify-between items-center p-3 border-b border-red-600">
                          <div className="flex items-center gap-3 relative">
                            <img src={getTeamLogo(match.team1)} alt={match.team1} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team1', 'round2')}
                            <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          </div>
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', -1, 'round2')}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score1}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', 1, 'round2')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <img src={getTeamLogo(match.team2)} alt={match.team2} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team2', 'round2')}
                            <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          </div>
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', -1, 'round2')}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score2}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', 1, 'round2')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={`connector-wrapper ${index === 0 ? 'connector-top' : 'connector-bottom'}`}>
                        <div className="connector-horizontal" />
                        {index === 0 && <div className="connector-vertical1" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final Round */}
                <div className="flex flex-col justify-center">
                  <div className="w-60 bg-black border border-red-600 rounded">
                    <div className="flex justify-between items-center p-3 border-b border-red-600">
                      <div className="flex items-center gap-3 relative">
                        <img src={getTeamLogo(finalMatch.team1)} alt={finalMatch.team1} className="w-8 h-8" />
                        {renderTeamSelector(finalMatch, 'team1', 'final')}
                        <div className={isAdmin ? 'hidden' : 'score-separator'} />
                      </div>
                      <div className="flex items-center">
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() => handleScoreChange(finalMatch.id, 'score1', -1, 'final')}
                        >
                          -
                        </button>
                        <span className="text-white mx-2">{finalMatch.score1}</span>
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() => handleScoreChange(finalMatch.id, 'score1', 1, 'final')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3">
                      <div className="flex items-center gap-3 relative">
                        <img src={getTeamLogo(finalMatch.team2)} alt={finalMatch.team2} className="w-8 h-8" />
                        {renderTeamSelector(finalMatch, 'team2', 'final')}
                        <div className={isAdmin ? 'hidden' : 'score-separator'} />
                      </div>
                      <div className="flex items-center">
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() => handleScoreChange(finalMatch.id, 'score2', -1, 'final')}
                        >
                          -
                        </button>
                        <span className="text-white mx-2">{finalMatch.score2}</span>
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() => handleScoreChange(finalMatch.id, 'score2', 1, 'final')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-60 rounded mt-6" id="third">
                    <h2 className="text-white text-center text-xl">Third Place</h2>
                    <div className="w-60 bg-black border border-red-600 rounded mt-6" id="third">
                      <div className="flex justify-between items-center p-3 border-b border-red-600">
                        <div className="flex items-center gap-3 relative">
                          <img src={getTeamLogo(thirdPlaceMatch.team1)} alt={thirdPlaceMatch.team1} className="w-8 h-8" />
                          {renderTeamSelector(thirdPlaceMatch, 'team1', 'thirdPlace')}
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                        </div>
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(thirdPlaceMatch.id, 'score1', -1, 'thirdPlace')}
                          >
                            -
                          </button>
                          <span className="text-white mx-2">{thirdPlaceMatch.score1}</span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(thirdPlaceMatch.id, 'score1', 1, 'thirdPlace')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3">
                        <div className="flex items-center gap-3 relative">
                          <img src={getTeamLogo(thirdPlaceMatch.team2)} alt={thirdPlaceMatch.team2} className="w-8 h-8" />
                          {renderTeamSelector(thirdPlaceMatch, 'team2', 'thirdPlace')}
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                        </div>
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(thirdPlaceMatch.id, 'score2', -1, 'thirdPlace')}
                          >
                            -
                          </button>
                          <span className="text-white mx-2">{thirdPlaceMatch.score2}</span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(thirdPlaceMatch.id, 'score2', 1, 'thirdPlace')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
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