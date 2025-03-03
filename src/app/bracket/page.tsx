'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useSWR from 'swr'; // Import useSWR for data fetching
import './style.css';
import kmitlLogo from '../../../public/images/KMITL_logo.png';
import kmuttLogo from '../../../public/images/KMUTT_logo.png';
import kmutnbLogo from '../../../public/images/KMUTNB_logo.png';

interface Match {
  id: number;
  team1: string | null;
  team2: string | null;
  score1: number;
  score2: number;
  type?: string;
}

type Round = 'round1' | 'round2' | 'final' | 'thirdPlace';
type TeamKey = 'team1' | 'team2';
const TEAM_OPTIONS = ['KMUTT', 'KMUTNB', 'KMITL', 'KMUTNB BKK', 'BLANK', 'Null'] as const;
type TeamName = typeof TEAM_OPTIONS[number];

interface ApiResponse {
  success: boolean;
  message: string;
  data: SportMatch[] | SportMatch | FootballMatch[] | FootballScoreBoard[];
}

interface SportMatch {
  id: number;
  type: string;
  team_A_id: number;
  team_B_id: number;
  locationId: number;
  locationName?: string;
  time: string;
  team_A_details?: {
    id: number;
    image: string;
    color_code: string;
  };
  team_B_details?: {
    id: number;
    image: string;
    color_code: string;
  };
  pingpong_sets?: Array<{
    id: number;
    pingpong_match_id: number;
    round: number;
    score_A: number;
    score_B: number;
  }>;
  badminton_sets?: Array<{
    id: number;
    badminton_match_id: number;
    round: number;
    score_A: number;
    score_B: number;
  }>;
}

interface FootballMatch {
  id: number;
  team_A: { image: string; score: number; name?: string };
  team_B: { image: string; score: number; name?: string };
  status: string;
  timeStart: string;
  timeEnd: string;
}

interface FootballScoreBoard {
  id: number;
  university: string;
  winLose: string;
  point: string;
  pointDiff: number;
}

interface BracketProps {
  sport?: string; // Make sport optional to handle undefined cases
}

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data; // Return the full API response
};

const checkAdminStatus = () => {
  return localStorage.getItem('isAdmin') === 'true'; // Example implementation
};

const Bracket: React.FC<BracketProps> = ({ sport: propSport }) => {
  // Default sport to 'pingpong' if not provided
  const [sport, setSport] = useState<string>(propSport || 'pingpong');
  const [isAdmin, setIsAdmin] = useState(false);
  const [round1Matches, setRound1Matches] = useState<Match[]>([]);
  const [round2Matches, setRound2Matches] = useState<Match[]>([]);
  const [finalMatch, setFinalMatch] = useState<Match | null>(null);
  const [thirdPlaceMatch, setThirdPlaceMatch] = useState<Match | null>(null);
  const [editingTeam, setEditingTeam] = useState<{ matchId: number; teamKey: TeamKey; round: Round } | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const sportNames: Record<string, string> = {
    badminton: 'แบดมินตัน',
    pingpong: 'ปิงปอง',
    football: 'ฟุตบอล',
  };

  const buttonTypes = {
    badminton: ['mix', 'single_male', 'single_female', 'pair_male', 'pair_female'],
    pingpong: ['mix', 'single_male', 'single_female', 'pair_male', 'pair_female'],
    football: ['matches'],
  };

  // Set sport name based on sport prop or default
  const [sportName, setSportName] = useState<string>(sportNames[sport] || sport);

  // Use useSWR to fetch data dynamically with fallback data
  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
    sport && selectedType ? `https://it3k.sit.kmutt.ac.th/api/${sport}/${selectedType}` : sport ? `https://it3k.sit.kmutt.ac.th/api/${sport}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: { // Fallback data to prevent errors during loading
        success: false,
        message: 'No data available',
        data: [],
      },
    }
  );

  // Check admin status from localStorage on mount
  useEffect(() => {
    const adminStatus = checkAdminStatus();
    setIsAdmin(adminStatus);
  }, []);

  const [teamLogos] = useState<Record<string, string>>({
    KMITL: kmitlLogo.src,
    'KMUTNB': kmutnbLogo.src,
    KMUTT: kmuttLogo.src,
    KMUTNBPR: kmutnbLogo.src,
    Null: '/images/default.png',
    BLANK: '/images/default.png',
  });

  // Transform API data into Match format and organize into rounds
  useEffect(() => {
    if (data && data.data && data.success) {
      let matches: (SportMatch | FootballMatch)[] = [];
      if (Array.isArray(data.data)) {
        matches = data.data as (SportMatch | FootballMatch)[];
      } else if (data.data) {
        matches = [data.data as SportMatch | FootballMatch];
      }

      const transformedMatches: Match[] = matches.map((item) => {
        if (sport === 'football' && 'team_A' in item) {
          const footballMatch = item as FootballMatch;
          return {
            id: footballMatch.id,
            team1: footballMatch.team_A.name || (footballMatch.team_A.image.split('_')[0]?.toUpperCase() || null),
            team2: footballMatch.team_B.name || (footballMatch.team_B.image.split('_')[0]?.toUpperCase() || null),
            score1: footballMatch.team_A.score || 0,
            score2: footballMatch.team_B.score || 0,
            type: 'football',
          };
        } else {
          const sportMatch = item as SportMatch;
          return {
            id: sportMatch.id,
            team1: sportMatch.team_A_details?.image.split('_')[0]?.toUpperCase() || `Team_${sportMatch.team_A_id}`,
            team2: sportMatch.team_B_details?.image.split('_')[0]?.toUpperCase() || `Team_${sportMatch.team_B_id}`,
            score1: (sportMatch.pingpong_sets || sportMatch.badminton_sets)?.[0]?.score_A || 0,
            score2: (sportMatch.pingpong_sets || sportMatch.badminton_sets)?.[0]?.score_B || 0,
            type: sportMatch.type || 'mix',
          };
        }
      });

      // Ensure all rounds are populated, even if data is missing
      const round1Ids = [1, 2, 3, 4];
      const round2Ids = [5, 6];
      const finalId = 7;
      const thirdPlaceId = 8;

      const round1 = round1Ids.map(id => {
        const match = transformedMatches.find(m => m.id === id) || {
          id,
          team1: null,
          team2: null,
          score1: 0,
          score2: 0,
          type: sport,
        };
        return match;
      });

      const round2 = round2Ids.map(id => {
        const match = transformedMatches.find(m => m.id === id) || {
          id,
          team1: null,
          team2: null,
          score1: 0,
          score2: 0,
          type: sport,
        };
        return match;
      });

      const final = transformedMatches.find(m => m.id === finalId) || {
        id: finalId,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: sport,
      };

      const thirdPlace = transformedMatches.find(m => m.id === thirdPlaceId) || {
        id: thirdPlaceId,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: sport,
      };

      setRound1Matches(round1);
      setRound2Matches(round2);
      setFinalMatch(final);
      setThirdPlaceMatch(thirdPlace);
    } else if (error) {
      console.error('Error fetching data:', error);
      // Fallback to default empty matches if there's an error
      setRound1Matches(Array(4).fill({
        id: 0,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: sport,
      }));
      setRound2Matches(Array(2).fill({
        id: 0,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: sport,
      }));
      setFinalMatch({
        id: 0,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: sport,
      });
      setThirdPlaceMatch({
        id: 0,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: sport,
      });
    }
  }, [data, error, sport]);

  const getTeamLogo = (teamName: string | null): string => {
    if (!teamName) return '/images/default.png';
    return teamLogos[teamName] || '/images/default.png';
  };

  const updateMatchScore = async (match: Match, round: Round): Promise<void> => {
    try {
      await updateMockMatch(sport, match, round);
      // Revalidate data after updating to reflect changes
      mutate();
    } catch (error) {
      console.error(`Error updating match score for ${sport}:`, error);
    }
  };

  const handleScoreChange = async (
    matchId: number,
    team: 'score1' | 'score2',
    delta: number,
    round: Round
  ): Promise<void> => {
    const updateMatch = (match: Match) => ({
      ...match,
      [team]: Math.max(0, match[team] + delta),
    });

    if (round === 'round1') {
      const updatedMatches = round1Matches.map((match) =>
        match.id === matchId ? updateMatch(match) : match
      );
      setRound1Matches(updatedMatches);
      await updateMatchScore(updatedMatches.find((m) => m.id === matchId)!, round);
    } else if (round === 'round2') {
      const updatedMatches = round2Matches.map((match) =>
        match.id === matchId ? updateMatch(match) : match
      );
      setRound2Matches(updatedMatches);
      await updateMatchScore(updatedMatches.find((m) => m.id === matchId)!, round);
    } else if (round === 'final' && finalMatch && matchId === finalMatch.id) {
      const updatedMatch = updateMatch(finalMatch);
      setFinalMatch(updatedMatch);
      await updateMatchScore(updatedMatch, round);
    } else if (round === 'thirdPlace' && thirdPlaceMatch && matchId === thirdPlaceMatch.id) {
      const updatedMatch = updateMatch(thirdPlaceMatch);
      setThirdPlaceMatch(updatedMatch);
      await updateMatchScore(updatedMatch, round);
    }
  };

  const handleTeamNameChange = async (
    oldName: string | null,
    newName: string,
    matchId: number,
    teamKey: TeamKey,
    round: Round
  ): Promise<void> => {
    if (oldName === newName || !newName.trim()) return;

    const updateTeamInMatches = (matches: Match[]) =>
      matches.map((match) => (match.id === matchId ? { ...match, [teamKey]: newName } : match));

    if (round === 'round1') {
      const updatedMatches = updateTeamInMatches(round1Matches);
      setRound1Matches(updatedMatches);
      await updateMatchScore(updatedMatches.find((m) => m.id === matchId)!, round);
    } else if (round === 'round2') {
      const updatedMatches = updateTeamInMatches(round2Matches);
      setRound2Matches(updatedMatches);
      await updateMatchScore(updatedMatches.find((m) => m.id === matchId)!, round);
    } else if (round === 'final' && finalMatch && matchId === finalMatch.id) {
      const updatedMatch = { ...finalMatch, [teamKey]: newName };
      setFinalMatch(updatedMatch);
      await updateMatchScore(updatedMatch, round);
    } else if (round === 'thirdPlace' && thirdPlaceMatch && matchId === thirdPlaceMatch.id) {
      const updatedMatch = { ...thirdPlaceMatch, [teamKey]: newName };
      setThirdPlaceMatch(updatedMatch);
      await updateMatchScore(updatedMatch, round);
    }
    setEditingTeam(null);
  };

  const startEditing = (matchId: number, teamKey: TeamKey, round: Round): void => {
    if (!isAdmin) return;
    setEditingTeam({ matchId, teamKey, round });
  };

  const renderTeamSelector = (match: Match, teamKey: TeamKey, round: Round): JSX.Element => {
    const teamName = match[teamKey];
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
        <button
          className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-200"
          onClick={() => setEditingTeam(null)}
        >
          Cancel
        </button>
      </div>
    ) : (
      <span
        className="text-white font-bold"
        onClick={() => startEditing(match.id, teamKey, round)}
        style={{ cursor: isAdmin ? 'pointer' : 'default' }}
      >
        {teamName || 'TBD'} {isAdmin && '(Edit)'}
      </span>
    );
  };

  const handleFilterClick = (type: string) => {
    setSelectedType(type === selectedType ? null : type);
  };

  if (isLoading) return <div className="text-white text-center p-4">กำลังโหลด...</div>;
  if (error) return <div className="text-white text-center p-4">เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}</div>;

  return (
    <div className="brackets-wrapper-container">
      <div className="sport-section mb-8 flex flex-col">
        <h1 className="text-white text-3xl sm:text-4xl mb-6 font-extrabold">
          <Link href="/">
            <button className="btn-back">◀</button>
          </Link>
          {sportName}
        </h1>
        <div className="flex gap-2 w-full max-w-4xl">
          {buttonTypes[sport as keyof typeof buttonTypes]?.map((type) => (
            <button
              key={type}
              className={`btn-bracket flex-1 min-w-[10px] max-w-[20vw] text-[6px] sm:text-[8px] md:text-xs ${
                selectedType === type ? 'bg-red-700' : 'bg-red-600'
              }`}
              onClick={() => handleFilterClick(type)}
            >
              {type === 'mix' ? 'คู่ผสม' : type === 'single_male' ? 'ชายเดี่ยว' : type === 'single_female' ? 'หญิงเดี่ยว' : type === 'pair_male' ? 'ชายคู่' : 'หญิงคู่'}
            </button>
          ))}
          <button
            className={`btn-bracket flex-1 min-w-[10px] max-w-[20vw] text-[6px] sm:text-[8px] md:text-xs`}
            onClick={() => {
              setIsAdmin(!isAdmin);
              localStorage.setItem('isAdmin', (!isAdmin).toString()); // Persist admin status
            }}
          >
            Admin
          </button>
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
                            <img src={getTeamLogo(match.team1)} alt={match.team1 || 'TBD'} className="w-8 h-8" />
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
                            <img src={getTeamLogo(match.team2)} alt={match.team2 || 'TBD'} className="w-8 h-8" />
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
                            <img src={getTeamLogo(match.team1)} alt={match.team1 || 'TBD'} className="w-8 h-8" />
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
                            <img src={getTeamLogo(match.team2)} alt={match.team2 || 'TBD'} className="w-8 h-8" />
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
                  {finalMatch && (
                    <div className="w-60 bg-black border border-red-600 rounded">
                      <div className="flex justify-between items-center p-3 border-b border-red-600">
                        <div className="flex items-center gap-3 relative">
                          <img src={getTeamLogo(finalMatch.team1)} alt={finalMatch.team1 || 'TBD'} className="w-8 h-8" />
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
                          <img src={getTeamLogo(finalMatch.team2)} alt={finalMatch.team2 || 'TBD'} className="w-8 h-8" />
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
                  )}

                  <div className="w-60 rounded mt-6" id="third">
                    <h2 className="text-white text-center text-xl">Third Place</h2>
                    {thirdPlaceMatch && (
                      <div className="w-60 bg-black border border-red-600 rounded mt-6" id="third">
                        <div className="flex justify-between items-center p-3 border-b border-red-600">
                          <div className="flex items-center gap-3 relative">
                            <img src={getTeamLogo(thirdPlaceMatch.team1)} alt={thirdPlaceMatch.team1 || 'TBD'} className="w-8 h-8" />
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
                            <img src={getTeamLogo(thirdPlaceMatch.team2)} alt={thirdPlaceMatch.team2 || 'TBD'} className="w-8 h-8" />
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