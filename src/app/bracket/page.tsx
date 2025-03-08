'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useSWR from 'swr';
import Image from 'next/image';
import axios from 'axios';
import './style.css';
import kmitlLogo from '../../../public/images/KMITL_logo.png';
import kmuttLogo from '../../../public/images/KMUTT_logo.png';
import kmutnbLogo from '../../../public/images/KMUTNB_logo.png';
import kmutnbprLogo from '../../../public/images/KMUTNB_PR_logo.png';
import gooseLogo from '../../../public/images/pop_goose/default_goose.png';
import { useAuth } from '../login/hooks/useAuth';

// Interfaces
interface Match {
  id: number;
  team1: string | null;
  team2: string | null;
  score1: number;
  score2: number;
  type: string;
}

type TeamKey = 'team1' | 'team2';

interface ApiResponse {
  success: boolean;
  message: string;
  data: SportMatch[];
}

interface SportMatch {
  id: number;
  type: string;
  team_A_id: number | null;
  team_B_id: number | null;
  locationId: number;
  court?: number | null;
  team_A_number?: number | null;
  team_B_number?: number | null;
  score_A: number;
  score_B: number;
  timeStart: string | null;
  timeEnd: string | null;
  team_A_details?: { id: number; uniName: string; image: string; color_code: string };
  team_B_details?: { id: number; uniName: string; image: string; color_code: string };
}

interface BracketProps {
  sport?: string;
}

// Constants
const TEAM_OPTIONS = ['KMUTT', 'KMUTNB', 'KMITL', 'KMUTNB BKK', 'BLANK', 'Null'] as const;
const SPORT_NAMES: Record<string, string> = {
  badminton: 'แบดมินตัน',
  pingpong: 'ปิงปอง',
};
const BUTTON_TYPES: Record<string, readonly string[]> = {
  badminton: ['mix', 'single_male', 'single_female', 'pair_male', 'pair_female'],
  pingpong: ['mix', 'single_male', 'single_female', 'pair_male', 'pair_female'],
};
const TEAM_LOGOS: Record<string, string> = {
  KMITL: kmitlLogo.src,
  KMUTNB: kmutnbLogo.src,
  'KMUTNB BKK': kmutnbLogo.src,
  KMUTT: kmuttLogo.src,
  KMUTNB_PR: kmutnbprLogo.src,
  Null: gooseLogo.src,
  BLANK: gooseLogo.src,
};

const fetcher = async (url: string, token: string | null) => {
  console.log(`Fetching from: ${url}`);
  console.log(`Received Token:`, token);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  console.log(`Headers before request:`, headers);

  try {
    const response = await axios.get(url, { headers });
    console.log(`✅ Response status: ${response.status}`);
    console.log(`✅ Response data:`, response.data);

    const dataArray = Array.isArray(response.data)
      ? response.data.flat()
      : response.data?.data || [];

    return { success: true, message: 'Fetched successfully', data: dataArray };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`❌ Fetch error: ${error.message}`);
      console.error(`❌ Error response:`, error.response?.data);
      throw error;
    }
    console.error('❌ Unexpected error:', error);
    throw error;
  }
};

// Debounce function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Bracket: React.FC<BracketProps> = ({ sport: propSport }) => {
  const [sport] = useState<string>(propSport || 'badminton');
  const { accessToken, admin, isLoading: authLoading, refreshAccessToken } = useAuth();
  const router = useRouter();
  const [editingTeam, setEditingTeam] = useState<{ matchId: number; teamKey: TeamKey } | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [matchesData, setMatchesData] = useState<ApiResponse | null>(null);

  const isAdmin = !!admin && admin.role === 'super_admin';


  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
    sport
      ? [`https://it3k.sit.kmutt.ac.th/api/${sport}${selectedType ? `/${selectedType}` : ''}`, accessToken || null]
      : null,
    ([url, token]) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: { success: false, message: 'No data available', data: [] },
      onSuccess: (fetchedData) => setMatchesData(fetchedData),
      onError: async (err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401 && accessToken) {
          try {
            await refreshAccessToken();
            mutate();
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            // ไม่ redirect ถ้าไม่มี token
          }
        }
      },
    }
  );

  const computedMatches = useMemo(() => {
    const matches = matchesData || data;
    if (!matches?.success || !matches.data?.length) {
      return {
        round1: [...Array(4)].map((_, i) => ({
          id: i + 1,
          team1: null,
          team2: null,
          score1: 0,
          score2: 0,
          type: selectedType || 'mix',
        })),
        round2: [...Array(2)].map((_, i) => ({
          id: i + 5,
          team1: null,
          team2: null,
          score1: 0,
          score2: 0,
          type: selectedType || 'mix',
        })),
        final: { id: 8, team1: null, team2: null, score1: 0, score2: 0, type: selectedType || 'mix' },
        third: { id: 7, team1: null, team2: null, score1: 0, score2: 0, type: selectedType || 'mix' },
      };
    }

    const filteredMatches = matches.data.filter((item: SportMatch) =>
      selectedType ? item.type === selectedType : true
    );

    const transformedMatches: Match[] = filteredMatches.map((item: SportMatch) => ({
      id: item.id,
      team1: item.team_A_id !== null ? TEAM_OPTIONS[item.team_A_id - 1] : null,
      team2: item.team_B_id !== null ? TEAM_OPTIONS[item.team_B_id - 1] : null,
      score1: item.score_A ?? 0,
      score2: item.score_B ?? 0,
      type: item.type,
    }));

    const round1 = transformedMatches.slice(0, 4); // id: 33-36
    const round2 = transformedMatches.slice(4, 6); // id: 37-38
    const thirdMatch = transformedMatches.find((m) => m.id === 39) || {
      id: 39,
      team1: null,
      team2: null,
      score1: 0,
      score2: 0,
      type: selectedType || 'mix',
    };
    const finalMatch = transformedMatches.find((m) => m.id === 40) || {
      id: 40,
      team1: null,
      team2: null,
      score1: 0,
      score2: 0,
      type: selectedType || 'mix',
    };

    return {
      round1: round1.length ? round1 : [...Array(4)].map((_, i) => ({
        id: filteredMatches[i]?.id || (i + 1),
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: selectedType || 'mix',
      })),
      round2: round2.length ? round2 : [...Array(2)].map((_, i) => ({
        id: filteredMatches[i + 4]?.id || (i + 5),
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        type: selectedType || 'mix',
      })),
      final: finalMatch,
      third: thirdMatch,
    };
  }, [matchesData, data, sport, selectedType]);

  const getTeamLogo = (teamName: string | null): string =>
    teamName && teamName in TEAM_LOGOS ? TEAM_LOGOS[teamName as keyof typeof TEAM_LOGOS] : gooseLogo.src;

  const apiCall = async (url: string, method: string, body?: any): Promise<void> => {
    if (!isAdmin || !accessToken) {
      console.log('Not authorized or no token for update');
      return; // ไม่ redirect แต่หยุดการทำงานถ้าไม่มี token หรือไม่ใช่ admin
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios({
        url,
        method,
        headers,
        data: body,
      });

      console.log('API call status:', response.status);
      if (method !== 'GET') mutate();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          await refreshAccessToken();
          const retryResponse = await axios({
            url,
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            data: body,
          });
          if (method !== 'GET') mutate();
          return retryResponse;
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          // ไม่ redirect
        }
      }
      throw error;
    }
  };

  const updateMatch = async (
    matchId: number,
    updates: { team_A_id?: number; team_B_id?: number; score_A?: number; score_B?: number }
  ) => {
    const body: { team_A_id?: number; team_B_id?: number; score_A?: number; score_B?: number } = {};
    if (updates.team_A_id !== undefined) body.team_A_id = updates.team_A_id;
    if (updates.team_B_id !== undefined) body.team_B_id = updates.team_B_id;
    if (updates.score_A !== undefined) body.score_A = updates.score_A;
    if (updates.score_B !== undefined) body.score_B = updates.score_B;

    if (Object.keys(body).length === 0) return;

    await apiCall(`https://it3k.sit.kmutt.ac.th/api/admin/${sport}/score/${matchId}`, 'PUT', body);
  };

  const handleScoreChange = useCallback(
    debounce(async (matchId: number, team: 'score1' | 'score2', delta: number) => {
      if (!isAdmin) return;

      const match = [...computedMatches.round1, ...computedMatches.round2, computedMatches.final, computedMatches.third].find(
        (m) => m.id === matchId
      );
      if (!match) return;

      const updatedMatch = {
        ...match,
        [team]: Math.max(0, match[team] + delta),
      };

      try {
        await updateMatch(matchId, {
          score_A: team === 'score1' ? updatedMatch.score1 : match.score1,
          score_B: team === 'score2' ? updatedMatch.score2 : match.score2,
        });
      } catch (error) {
        console.error('Error updating score:', error);
      }
    }, 500),
    [isAdmin, computedMatches]
  );

  const handleTeamNameChange = async (oldName: string | null, newName: string, matchId: number, teamKey: TeamKey) => {
    if (!isAdmin || oldName === newName || !newName.trim()) return;

    const teamId = TEAM_OPTIONS.findIndex((tn) => tn === newName) + 1 || null;

    try {
      await updateMatch(matchId, {
        [teamKey === 'team1' ? 'team_A_id' : 'team_B_id']: teamId,
      });
      setEditingTeam(null);
      mutate();
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const startEditing = (matchId: number, teamKey: TeamKey): void => {
    if (!isAdmin) return;
    setEditingTeam({ matchId, teamKey });
  };

  const renderTeamSelector = (match: Match, teamKey: TeamKey): JSX.Element => {
    const teamName = match[teamKey];
    if (isAdmin && editingTeam?.matchId === match.id && editingTeam?.teamKey === teamKey) {
      return (
        <div className="absolute bg-white text-black p-2 rounded shadow-lg" style={{ zIndex: 1000, left: '50px', top: '0' }}>
          {TEAM_OPTIONS.map((team) => (
            <button
              key={team}
              className="block w-full text-left px-2 py-1 hover:bg-gray-200"
              onClick={() => handleTeamNameChange(teamName, team, match.id, teamKey)}
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
      <span
        className="text-white font-bold"
        onClick={() => startEditing(match.id, teamKey)}
        style={{ cursor: isAdmin ? 'pointer' : 'default' }}
      >
        {teamName || 'TBD'} {isAdmin && '(Edit)'}
      </span>
    );
  };

  const handleFilterClick = (type: string): void => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  useEffect(() => {
    console.log('Current Token:', accessToken);
    console.log('Current Admin:', admin);
    console.log('Computed Matches:', computedMatches);
  }, [accessToken, admin, computedMatches]);

  if (authLoading) return <div className="text-white text-center p-4 mt-[100px]">Loading authentication...</div>;
  if (!sport) return <div className="text-white text-center p-4 mt-[100px]">No sport specified</div>;
  if (isLoading && !matchesData) return <div className="text-white text-center p-4 mt-[100px]">Loading data...</div>;
  if (error && !matchesData)
    return <div className="text-white text-center p-4 mt-[100px]">Error loading data: {error.message}</div>;

  return (
    <div className="brackets-wrapper-container">
      <div className="sport-section mb-8 flex flex-col">
        <h1 className="text-white text-3xl sm:text-4xl mb-6 mt-24 font-extrabold">
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
              {type === 'mix'
                ? 'คู่ผสม'
                : type === 'single_male'
                ? 'ชายเดี่ยว'
                : type === 'single_female'
                ? 'หญิงเดี่ยว'
                : type === 'pair_male'
                ? 'ชายคู่'
                : 'หญิงคู่'}
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
            contentStyle={{ transform: 'scale(1)' }}
          >
            <div className="p-8 bg-black min-h-screen bracket-container">
              <div className="relative flex gap-32 ml-48 font-bold">
                <div className="flex flex-col gap-24">
                  {computedMatches.round1.map((match, index) => (
                    <div key={match.id} className="relative match-wrapper">
                      <h2 className="text-white text-center text-xl mb-4">Quarter-Final </h2>
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
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score1}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', 1)}
                            >
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
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{match.score2}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', 1)}
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
                  {computedMatches.round2.map((match, index) => (
                    <div
                      key={match.id}
                      className={`relative match-wrapper ${index === 1 ? 'semifinal-bottom' : ''}`}
                    >
                      <h2 className="text-white text-center text-xl mb-8">Semi Final</h2>
                      <div className="w-72 bg-black border border-red-600 rounded-lg">
                        <div className="flex justify-between items-center p-3 border-b border-red-600">
                          <div className="flex items-center gap-3 relative min-w-0 flex-1">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(match.team1)}
                              alt={match.team1 || 'TBD'}
                              className="w-8 h-8 flex-shrink-0"
                            />
                            {renderTeamSelector(match, 'team1')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center gap-2 min-w-[100px] justify-end">
                            <button
                              className={isAdmin ? 'score-button w-6 h-6' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2 min-w-[20px] text-center">{match.score1}</span>
                            <button
                              className={isAdmin ? 'score-button w-6 h-6' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score1', 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div className="flex items-center gap-3 relative min-w-0 flex-1">
                            <Image
                              width={32}
                              height={32}
                              src={getTeamLogo(match.team2)}
                              alt={match.team2 || 'TBD'}
                              className="w-8 h-8 flex-shrink-0"
                            />
                            {renderTeamSelector(match, 'team2')}
                          </div>
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center gap-2 min-w-[100px] justify-end">
                            <button
                              className={isAdmin ? 'score-button w-6 h-6' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2 min-w-[20px] text-center">{match.score2}</span>
                            <button
                              className={isAdmin ? 'score-button w-6 h-6' : 'hidden'}
                              onClick={() => handleScoreChange(match.id, 'score2', 1)}
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
                        <div className={isAdmin ? 'hidden' : 'score-separator'} />
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(computedMatches.final.id, 'score1', -1)}
                          >
                            -
                          </button>
                          <span className="text-white mx-2">{computedMatches.final.score1}</span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(computedMatches.final.id, 'score1', 1)}
                          >
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
                        <div className={isAdmin ? 'hidden' : 'score-separator'} />
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(computedMatches.final.id, 'score2', -1)}
                          >
                            -
                          </button>
                          <span className="text-white mx-2">{computedMatches.final.score2}</span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() => handleScoreChange(computedMatches.final.id, 'score2', 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-60 rounded mt-6" id="third">
                    <h2 className="text-white text-center text-xl">Third Place</h2>
                    {computedMatches.third && (
                      <div className="w-60 bg-black border border-red-600 rounded mt-6" id="third">
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
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(computedMatches.third.id, 'score1', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{computedMatches.third.score1}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(computedMatches.third.id, 'score1', 1)}
                            >
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
                          <div className={isAdmin ? 'hidden' : 'score-separator'} />
                          <div className="flex items-center">
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(computedMatches.third.id, 'score2', -1)}
                            >
                              -
                            </button>
                            <span className="text-white mx-2">{computedMatches.third.score2}</span>
                            <button
                              className={isAdmin ? 'score-button' : 'hidden'}
                              onClick={() => handleScoreChange(computedMatches.third.id, 'score2', 1)}
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