'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useSWR from 'swr';
import { JSX } from 'react';
import './style.css';
import kmitlLogo from '../../../public/images/KMITL_logo.png';
import kmuttLogo from '../../../public/images/KMUTT_logo.png';
import kmutnbLogo from '../../../public/images/KMUTNB_logo.png';
import gooseLogo from '../../../public/images/pop_goose/default_goose.png';
import Image from 'next/image';

// Interfaces
interface Match {
  matchId: number;
  team1: string | null;
  team2: string | null;
  score1: number;
  score2: number;
  type?: string;
}

type TeamKey = 'team1' | 'team2';

const TEAM_OPTIONS = ['KMUTT', 'KMUTNB', 'KMITL', 'KMUTNB BKK', 'BLANK', 'Null'] as const;

interface ApiResponse {
  success: boolean;
  message: string;
  data: SportMatch[];
}

interface SportMatch {
  matchId: number;
  type: string;
  team_A_id: number;
  team_B_id: number;
  locationId: number;
  locationName?: string;
  time: string;
  team_A_details?: { id: number; uniName: string; image: string; color_code: string };
  team_B_details?: { id: number; uniName: string; image: string; color_code: string };
  pingpong_sets?: Array<{ id: number; pingpong_match_id: number; round: number; score_A: number; score_B: number }>;
}

interface BracketProps {
  sport?: string;
}

// Constants
const SPORT_NAMES: Record<string, string> = {
  badminton: 'แบดมินตัน',
  pingpong: 'ปิงปอง',
  football: 'ฟุตบอล',
};

const BUTTON_TYPES: Record<string, readonly string[]> = {
  badminton: ['mix', 'single_male', 'single_female', 'pair_male', 'pair_female'],
  pingpong: ['mix', 'single_male', 'single_female', 'pair_male', 'pair_female'],
  football: ['matches'],
};

const TEAM_LOGOS: Record<string, string> = {
  KMITL: kmitlLogo.src,
  KMUTNB: kmutnbLogo.src,
  KMUTT: kmuttLogo.src,
  KMUTNBPR: kmutnbLogo.src,
  Null: gooseLogo.src,
  BLANK: gooseLogo.src,
};

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const checkAdminStatus = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    if (adminParam === 'true') {
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return localStorage.getItem('isAdmin') === 'true';
  }
  return false;
};

// Component
const Bracket: React.FC<BracketProps> = ({ sport: propSport }) => {
  const [sport] = useState<string>(propSport || 'pingpong');
  const [isAdmin, setIsAdmin] = useState(checkAdminStatus());
  const [round1Matches, setRound1Matches] = useState<Match[]>([]);
  const [round2Matches, setRound2Matches] = useState<Match[]>([]);
  const [finalMatch, setFinalMatch] = useState<Match | null>(null);
  const [thirdPlaceMatch, setThirdPlaceMatch] = useState<Match | null>(null);
  const [editingTeam, setEditingTeam] = useState<{ matchId: number; teamKey: TeamKey } | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
    sport && selectedType ? `https://it3k.sit.kmutt.ac.th/api/${sport}/${selectedType}` : sport ? `https://it3k.sit.kmutt.ac.th/api/${sport}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: { success: false, message: 'No data available', data: [] as SportMatch[] },
    }
  );

  useEffect(() => {
    const adminStatus = checkAdminStatus();
    setIsAdmin(adminStatus);
    const handleUrlChange = () => {
      const newAdminStatus = checkAdminStatus();
      setIsAdmin(newAdminStatus);
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  useEffect(() => {
    if (data && data.success && data.data) {
      const transformedMatches: Match[] = data.data.map((item: SportMatch) => {
        return {
          matchId: item.matchId,
          team1: item.team_A_details?.image.split('_')[0]?.toUpperCase() || `Team_${item.team_A_id}`,
          team2: item.team_B_details?.image.split('_')[0]?.toUpperCase() || `Team_${item.team_B_id}`,
          score1: item.pingpong_sets?.reduce((sum, set) => sum + set.score_A, 0) || 0, // Sum scores from pingpong_sets for team A
          score2: item.pingpong_sets?.reduce((sum, set) => sum + set.score_B, 0) || 0, // Sum scores from pingpong_sets for team B
          type: item.type || 'mix',
        };
      });

      // Assign matches to rounds based on matchId
      const round1Ids = [1, 2, 3, 4]; // Round 1 matches
      const round2Ids = [5, 6]; // Round 2 matches
      const finalId = 7; // Final match
      const thirdPlaceId = 8; // Third place match

      setRound1Matches(round1Ids.map(id => transformedMatches.find(m => m.matchId === id) || { matchId: id, team1: null, team2: null, score1: 0, score2: 0, type: sport }));
      setRound2Matches(round2Ids.map(id => transformedMatches.find(m => m.matchId === id) || { matchId: id, team1: null, team2: null, score1: 0, score2: 0, type: sport }));
      setFinalMatch(transformedMatches.find(m => m.matchId === finalId) || { matchId: finalId, team1: null, team2: null, score1: 0, score2: 0, type: sport });
      setThirdPlaceMatch(transformedMatches.find(m => m.matchId === thirdPlaceId) || { matchId: thirdPlaceId, team1: null, team2: null, score1: 0, score2: 0, type: sport });
    } else if (error) {
      console.error('Error fetching data:', error);
      setRound1Matches(Array(4).fill({ matchId: 0, team1: null, team2: null, score1: 0, score2: 0, type: sport }));
      setRound2Matches(Array(2).fill({ matchId: 0, team1: null, team2: null, score1: 0, score2: 0, type: sport }));
      setFinalMatch({ matchId: 0, team1: null, team2: null, score1: 0, score2: 0, type: sport });
      setThirdPlaceMatch({ matchId: 0, team1: null, team2: null, score1: 0, score2: 0, type: sport });
    }
  }, [data, error, sport, isAdmin]);

  const getTeamLogo = (teamName: string | null): string => (teamName && teamName in TEAM_LOGOS ? TEAM_LOGOS[teamName as keyof typeof TEAM_LOGOS] : gooseLogo.src);

  const updateMatchScore = async (sport: string, match: Match): Promise<void> => {
    if (!isAdmin) return;
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No access token available');

    const [teamAId, teamBId] = [match.team1, match.team2].map(t => t ? TEAM_OPTIONS.findIndex(tn => tn === t) + 1 : 0);
    const endpoint = `https://it3k.sit.kmutt.ac.th/api/admin/${sport}/matches${match.matchId ? `/${match.matchId}` : ''}` as const;
    const method: 'POST' | 'PUT' = match.matchId ? 'PUT' : 'POST';
    const body = { team_A_id: teamAId, team_B_id: teamBId, time: new Date().toISOString(), locationId: 1 };

    if (sport === 'pingpong') {
      Object.assign(body, { type: match.type || 'mix' });
    }

    await fetch(endpoint, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(body) });

    if (sport === 'pingpong') {
      // Update pingpong sets with the total scores (you might need to adjust this based on your API requirements)
      await fetch(`https://it3k.sit.kmutt.ac.th/api/admin/${sport}/sets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          pingpong_match_id: match.matchId,
          round: 1, // Assuming we update the first set; adjust as needed
          score_A: match.score1,
          score_B: match.score2,
        }),
      });
    }

    mutate();
  };

  const handleScoreChange = async (matchId: number, team: 'score1' | 'score2', delta: number): Promise<void> => {
    if (!isAdmin) return;
    const updateMatch = (match: Match) => ({ ...match, [team]: Math.max(0, match[team] + delta) });

    if (round1Matches.some(m => m.matchId === matchId)) {
      const updatedMatches = round1Matches.map((match) => match.matchId === matchId ? updateMatch(match) : match);
      setRound1Matches(updatedMatches);
      await updateMatchScore(sport, updatedMatches.find((m) => m.matchId === matchId)!);
    } else if (round2Matches.some(m => m.matchId === matchId)) {
      const updatedMatches = round2Matches.map((match) => match.matchId === matchId ? updateMatch(match) : match);
      setRound2Matches(updatedMatches);
      await updateMatchScore(sport, updatedMatches.find((m) => m.matchId === matchId)!);
    } else if (finalMatch?.matchId === matchId) {
      const updatedMatch = updateMatch(finalMatch);
      setFinalMatch(updatedMatch);
      await updateMatchScore(sport, updatedMatch);
    } else if (thirdPlaceMatch?.matchId === matchId) {
      const updatedMatch = updateMatch(thirdPlaceMatch);
      setThirdPlaceMatch(updatedMatch);
      await updateMatchScore(sport, updatedMatch);
    }
  };

  const handleTeamNameChange = async (oldName: string | null, newName: string, matchId: number, teamKey: TeamKey): Promise<void> => {
    if (!isAdmin || oldName === newName || !newName.trim()) return;
    const updateTeam = (matches: Match[] | Match | null) => {
      if (Array.isArray(matches)) {
        return matches.map(m => m.matchId === matchId ? { ...m, [teamKey]: newName } : m);
      } else if (matches) {
        return { ...matches, [teamKey]: newName };
      }
      return matches;
    };

    if (round1Matches.some(m => m.matchId === matchId)) {
      const updatedMatches = updateTeam(round1Matches) as Match[];
      setRound1Matches(updatedMatches);
      await updateMatchScore(sport, updatedMatches.find(m => m.matchId === matchId)!);
    } else if (round2Matches.some(m => m.matchId === matchId)) {
      const updatedMatches = updateTeam(round2Matches) as Match[];
      setRound2Matches(updatedMatches);
      await updateMatchScore(sport, updatedMatches.find(m => m.matchId === matchId)!);
    } else if (finalMatch?.matchId === matchId) {
      const updatedMatch = updateTeam(finalMatch) as Match;
      setFinalMatch(updatedMatch);
      await updateMatchScore(sport, updatedMatch);
    } else if (thirdPlaceMatch?.matchId === matchId) {
      const updatedMatch = updateTeam(thirdPlaceMatch) as Match;
      setThirdPlaceMatch(updatedMatch);
      await updateMatchScore(sport, updatedMatch);
    }
    setEditingTeam(null);
  };

  const startEditing = (matchId: number, teamKey: TeamKey): void => {
    if (!isAdmin) return;
    setEditingTeam({ matchId, teamKey });
  };

  const renderTeamSelector = (match: Match, teamKey: TeamKey): JSX.Element => {
    const teamName = match[teamKey];
    if (isAdmin && editingTeam?.matchId === match.matchId && editingTeam?.teamKey === teamKey) {
      return (
        <div className="absolute bg-white text-black p-2 rounded shadow-lg" style={{ zIndex: 1000, left: '50px', top: '0' }}>
          {TEAM_OPTIONS.map((team) => (
            <button
              key={team}
              className="block w-full text-left px-2 py-1 hover:bg-gray-200"
              onClick={() => handleTeamNameChange(teamName, team, match.matchId, teamKey)}
            >
              {team}
            </button>
          ))}
          <button className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-200" onClick={() => setEditingTeam(null)}>
            Cancel
          </button>
        </div>
      );
    }
    return (
      <span className="text-white font-bold" onClick={() => startEditing(match.matchId, teamKey)} style={{ cursor: isAdmin ? 'pointer' : 'default' }}>
        {teamName || 'TBD'} {isAdmin && '(Edit)'}
      </span>
    );
  };

  const handleFilterClick = (type: string) => {
    setSelectedType(type === selectedType ? null : type);
  };

  if (!sport) return <div className="text-white text-center p-4">No sport specified</div>;
  if (isLoading) return <div className="text-white text-center p-4">กำลังโหลด...</div>;
  if (error) return <div className="text-white text-center p-4">เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}</div>;

  return (
    <div className="brackets-wrapper-container">
      <div className="sport-section mb-8 flex flex-col">
        <h1 className="text-white text-3xl sm:text-4xl mb-6 font-extrabold">
          <Link href="/">
            <button className="btn-back">◀</button>
          </Link>
          {SPORT_NAMES[sport]}
        </h1>
        <div className="flex gap-2 w-full max-w-4xl">
          {BUTTON_TYPES[sport]?.map((type) => (
            <button
              key={type}
              className={`btn-bracket flex-1 min-w-[10px] max-w-[20vw] text-[6px] sm:text-[8px] md:text-xs ${
                selectedType === type ? 'bg-red-700' : 'bg-transparent border border-red-600'
              }`}
              onClick={() => handleFilterClick(type)}
            >
              {type === 'mix' ? 'คู่ผสม' : type === 'single_male' ? 'ชายเดี่ยว' : type === 'single_female' ? 'หญิงเดี่ยว' : type === 'pair_male' ? 'ชายคู่' : 'หญิงคู่'}
            </button>
          ))}
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
                <div className="flex flex-col gap-24">
                  {round1Matches.map((match, index) => (
                    
                    <div key={match.matchId} className="relative match-wrapper">
                       <h2 className="text-white text-center text-xl mb-4">Quarter-Final</h2>
                      <div className="w-60 bg-black border border-red-600 rounded">
                        <div className="flex justify-between items-center p-3 border-b border-red-700">
                          <div className="flex items-center gap-3 relative">
                            <Image width={32} height={32} src={getTeamLogo(match.team1)} alt={match.team1 || 'TBD'} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team1')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score1', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score1}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score1', 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <Image width={32} height={32} src={getTeamLogo(match.team2)} alt={match.team2 || 'TBD'} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team2')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score2', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score2}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score2', 1)}
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

                <div className="flex flex-col gap-48 mt-24">
               
                  {round2Matches.map((match, index) => (
                    <div key={match.matchId} className={`relative match-wrapper ${index === 1 ? 'semifinal-bottom' : ''}`}>
                          <h2 className="text-white text-center text-xl mb-4">Semi Final</h2>
                      <div className="w-60 bg-black border border-red-600 rounded-lg">
                        <div className="flex justify-between items-center p-3 border-b border-red-600">
                          <div className="flex items-center gap-3 relative">
                            <Image width={32} height={32} src={getTeamLogo(match.team1)} alt={match.team1 || 'TBD'} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team1')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score1', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score1}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score1', 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <Image width={32} height={32} src={getTeamLogo(match.team2)} alt={match.team2 || 'TBD'} className="w-8 h-8" />
                            {renderTeamSelector(match, 'team2')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score2', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score2}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.matchId, 'score2', 1)}
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

                <div className="flex flex-col justify-center">
                <h2 className="text-white text-center text-xl mb-4">Final</h2>
                  {finalMatch && (
                    
                    <div className="w-60 bg-black border border-red-600 rounded">
                      
                      <div className="flex justify-between items-center p-3 border-b border-red-600">
                        <div className="flex items-center gap-3 relative">
                          <Image width={32} height={32} src={getTeamLogo(finalMatch.team1)} alt={finalMatch.team1 || 'TBD'} className="w-8 h-8" />
                          {renderTeamSelector(finalMatch, 'team1')}
                        </div>
                        <div className={isAdmin ? 'hidden' : 'score-separator'} />
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(finalMatch.matchId, 'score1', -1)}
                          >
                            -
                          </button>
                          <span className="text-white mx-2">{finalMatch.score1}</span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(finalMatch.matchId, 'score1', 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3">
                        <div className="flex items-center gap-3 relative">
                          <Image width={32} height={32} src={getTeamLogo(finalMatch.team2)} alt={finalMatch.team2 || 'TBD'} className="w-8 h-8" />
                          {renderTeamSelector(finalMatch, 'team2')}
                        </div>
                        <div className={isAdmin ? 'hidden' : 'score-separator'} />
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(finalMatch.matchId, 'score2', -1)}
                          >
                            -
                          </button>
                          <span className="text-white mx-2">{finalMatch.score2}</span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(finalMatch.matchId, 'score2', 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-60 rounded mt-6" id="third">
                    <h2 className="text-white text-center text-xl ">Third Place</h2>
                    {thirdPlaceMatch && (
                      <div className="w-60 bg-black border border-red-600 rounded mt-6" id="third">
                        <div className="flex justify-between items-center p-3 border-b border-red-600">
                          <div className="flex items-center gap-3 relative">
                            <Image width={32} height={32} src={getTeamLogo(thirdPlaceMatch.team1)} alt={thirdPlaceMatch.team1 || 'TBD'} className="w-8 h-8" />
                            {renderTeamSelector(thirdPlaceMatch, 'team1')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(thirdPlaceMatch.matchId, 'score1', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{thirdPlaceMatch.score1}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(thirdPlaceMatch.matchId, 'score1', 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative">
                            <Image width={32} height={32} src={getTeamLogo(thirdPlaceMatch.team2)} alt={thirdPlaceMatch.team2 || 'TBD'} className="w-8 h-8" />
                            {renderTeamSelector(thirdPlaceMatch, 'team2')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(thirdPlaceMatch.matchId, 'score2', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{thirdPlaceMatch.score2}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(thirdPlaceMatch.matchId, 'score2', 1)}
                            >
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
  );
};

export default Bracket;