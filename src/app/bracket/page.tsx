'use client'
import React, { useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import './style.css'
import kmitl from "/FrontEnd/public/images/KMITL_logo.png"
interface Match {
  id: number
  team1: string
  team2: string
  score1: number
  score2: number
}
interface BracketProps {
  sportName: string
  round1Matches: Match[]
  round2Matches: Match[]
  finalMatch: Match
  thirdPlaceMatch: Match
  teamLogos: { [key: string]: string } 
  buttons: { label: string; onClick: () => void }[] 
}
const Bracket: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  const sportname = 'ปิงปอง'
  const [round1Matches, setRound1Matches] = useState<Match[]>([
    { id: 1, team1: 'KMITL', team2: 'KMUTNB BKK', score1: 1, score2: 2  },
    { id: 2, team1: 'KMUTT', team2: 'KMUTNB', score1: 2, score2: 1 },
    { id: 3, team1: 'KMITL', team2: 'KMUTNB BKK', score1: 1, score2: 2 },
    { id: 4, team1: 'KMUTT', team2: 'KMUTNB', score1: 2, score2: 1 }
  ])

  const [round2Matches, setRound2Matches] = useState<Match[]>([
    { id: 3, team1: 'KMUTNB BKK', team2: 'KMUTT', score1: 2, score2: 3 },
    { id: 4, team1: 'KMUTNB', team2: 'KMITL', score1: 1, score2: 2 }
  ])

  const [finalMatch, setFinalMatch] = useState<Match>({
    id: 5,
    team1: 'KMUTT',
    team2: 'KMUTNB',
    score1: 3,
    score2: 1
  })
  const [thirdPlaceMatch, setThirdPlaceMatch] = useState<Match>({
    id: 6,
    team1: 'Loser Team 1',
    team2: 'Loser Team 2',
    score1: 1,
    score2: 1
  })

  const handleScoreChange = (
    matchId: number,
    team: 'score1' | 'score2',
    delta: number,
    round: 'round1' | 'round2' | 'final'
  ) => {
    if (round === 'round1') {
      setRound1Matches((matches) =>
        matches.map((match) =>
          match.id === matchId
            ? { ...match, [team]: Math.max(0, match[team] + delta) }
            : match
        )
      )
    } else if (round === 'round2') {
      setRound2Matches((matches) =>
        matches.map((match) =>
          match.id === matchId
            ? { ...match, [team]: Math.max(0, match[team] + delta) }
            : match
        )
      )
    } else {
      setFinalMatch((match) => ({
        ...match,
        [team]: Math.max(0, match[team] + delta)
      }))
    }
  }

  return (
    <div className="brackets-wrapper-container">
      <div className="sport-section mb-8 d-flex flex-col">
        <h1 className="text-white text-4xl mb-8 font-extrabold">{sportname}</h1>
        <div>
          <button className="btn-bracket">
            <p>คู่ผสม</p>
          </button>
          <button className="btn-bracket">
            <p>ชายคู่</p>
          </button>
          <button className="btn-bracket">
            <p>ชายเดี่ยว</p>
          </button>
          <button className="btn-bracket">
            <p>หญิงคู่</p>
          </button>
          <button className="btn-bracket">
            <p>หญิงเดี่ยว</p>
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => setIsAdmin(!isAdmin)}>
            {isAdmin ? 'Switch to User' : 'Switch to Admin'}
          </button>
        </div>
      </div>
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={2}>
        <TransformComponent
          wrapperStyle={{ width: '90%', height: '115vh', cursor: 'grab' }}>
          <div className="p-8 bg-black min-h-screen bracket-container">
            <div className="relative flex gap-32 ml-48 font-bold">
              {/* Round 1 */}
              <div className="flex flex-col gap-24">
                {round1Matches.map((match, index) => (
                  <div key={match.id} className="relative match-wrapper">
                    <div className="w-60 bg-black border border-red-600 rounded">
                      <div className="flex justify-between items-center p-3 border-b border-red-700">
                        <div className="flex items-center gap-3">
                          <img
                            src="/team-logo.png"
                            alt=""
                            className="w-8 h-8"
                          />
                          <span className="text-white font-bold">
                            {match.team1}
                          </span>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                        </div>
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                match.id,
                                'score1',
                                -1,
                                'round1'
                              )
                            }>
                            -
                          </button>
                          <span className="text-white mx-2">
                            {match.score1}
                          </span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(match.id, 'score1', 1, 'round1')
                            }>
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src="/team-logo.png"
                            alt=""
                            className="w-8 h-8"
                          />
                          <span className="text-white font-bold">
                            {match.team2}
                          </span>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                        </div>
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                match.id,
                                'score2',
                                -1,
                                'round1'
                              )
                            }>
                            -
                          </button>
                          <span className="text-white mx-2">
                            {match.score2}
                          </span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(match.id, 'score2', 1, 'round1')
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

              {/* Round 2 */}
              <div className="flex flex-col gap-48 mt-24">
                {round2Matches.map((match, index) => (
                  <div
                    key={match.id}
                    className={`relative match-wrapper ${index === 1 ? 'semifinal-bottom' : ''}`}>
                    <div className="w-60 bg-black border border-red-600 rounded-lg">
                      <div className="flex justify-between items-center p-3 border-b border-red-600">
                        <div className="flex items-center gap-3">
                          <img
                            src="/team-logo.png"
                            alt=""
                            className="w-8 h-8"
                          />
                          <span className="text-white">{match.team1}</span>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                        </div>
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                match.id,
                                'score1',
                                -1,
                                'round2'
                              )
                            }>
                            -
                          </button>
                          <span className="text-white mx-2">
                            {match.score1}
                          </span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(match.id, 'score1', 1, 'round2')
                            }>
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src="/team-logo.png"
                            alt=""
                            className="w-8 h-8"
                          />
                          <span className="text-white">{match.team2}</span>
                          <div
                            className={isAdmin ? 'hidden' : 'score-separator'}
                          />
                        </div>
                        <div className="flex items-center">
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(
                                match.id,
                                'score2',
                                -1,
                                'round2'
                              )
                            }>
                            -
                          </button>
                          <span className="text-white mx-2">
                            {match.score2}
                          </span>
                          <button
                            className={isAdmin ? 'score-button' : 'hidden'}
                            onClick={() =>
                              handleScoreChange(match.id, 'score2', 1, 'round2')
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
              {/* Final Round */}
              <div className="flex flex-col justify-center">
                <div className="w-60 bg-black border border-red-600 rounded">
                  <div className="flex justify-between items-center p-3 border-b border-red-600">
                    <div className="flex items-center gap-3">
                      <img src="/team-logo.png" alt="" className="w-8 h-8" />
                      <span className="text-white">{finalMatch.team1}</span>
                      <div className={isAdmin ? 'hidden' : 'score-separator'} />
                    </div>
                    <div className="flex items-center">
                      <button
                        className={isAdmin ? 'score-button' : 'hidden'}
                        onClick={() =>
                          handleScoreChange(
                            finalMatch.id,
                            'score1',
                            -1,
                            'final'
                          )
                        }>
                        -
                      </button>
                      <span className="text-white mx-2">
                        {finalMatch.score1}
                      </span>
                      <button
                        className={isAdmin ? 'score-button' : 'hidden'}
                        onClick={() =>
                          handleScoreChange(finalMatch.id, 'score1', 1, 'final')
                        }>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-3">
                      <img src="/team-logo.png" alt="" className="w-8 h-8" />
                      <span className="text-white">{finalMatch.team2}</span>
                      <div className={isAdmin ? 'hidden' : 'score-separator'} />
                    </div>
                    <div className="flex items-center">
                      <button
                        className={isAdmin ? 'score-button' : 'hidden'}
                        onClick={() =>
                          handleScoreChange(
                            finalMatch.id,
                            'score2',
                            -1,
                            'final'
                          )
                        }>
                        -
                      </button>
                      <span className="text-white mx-2">
                        {finalMatch.score2}
                      </span>
                      <button
                        className={isAdmin ? 'score-button' : 'hidden'}
                        onClick={() =>
                          handleScoreChange(finalMatch.id, 'score2', 1, 'final')
                        }>
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-60  rounded mt-6" id="third">
                  <h2 className="text-white text-center text-xl">
                    Third Place
                  </h2>
                  <div
                    className="w-60 bg-black border border-red-600 rounded mt-6"
                    id="third">
                    <div className="flex justify-between items-center p-3 border-b border-red-600">
                      <div className="flex items-center gap-3">
                        <img src="/team-logo.png" alt="" className="w-8 h-8" />
                        <span className="text-white">
                          {thirdPlaceMatch.team1}
                        </span>
                        <div
                          className={isAdmin ? 'hidden' : 'score-separator'}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() =>
                            handleScoreChange(
                              thirdPlaceMatch.id,
                              'score1',
                              -1,
                              'final'
                            )
                          }>
                          -
                        </button>
                        <span className="text-white mx-2">
                          {thirdPlaceMatch.score1}
                        </span>
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() =>
                            handleScoreChange(
                              thirdPlaceMatch.id,
                              'score1',
                              1,
                              'final'
                            )
                          }>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3">
                      <div className="flex items-center gap-3">
                        <img src="/team-logo.png" alt="" className="w-8 h-8" />
                        <span className="text-white">
                          {thirdPlaceMatch.team2}
                        </span>
                        <div
                          className={isAdmin ? 'hidden' : 'score-separator'}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() =>
                            handleScoreChange(
                              thirdPlaceMatch.id,
                              'score2',
                              -1,
                              'final'
                            )
                          }>
                          -
                        </button>
                        <span className="text-white mx-2">
                          {thirdPlaceMatch.score2}
                        </span>
                        <button
                          className={isAdmin ? 'score-button' : 'hidden'}
                          onClick={() =>
                            handleScoreChange(
                              thirdPlaceMatch.id,
                              'score2',
                              1,
                              'final'
                            )
                          }>
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
  )
}

export default Bracket
