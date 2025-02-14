import React from 'react';
import "./style.css";

interface Match {
  id: number;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

const Bracket: React.FC = () => {
  const sportname = "ปิงปอง"
  const round1Matches: Match[] = [
    { id: 1, team1: 'KMITL', team2: 'KMUTNB BKK', score1: 1, score2: 2 },
    { id: 2, team1: 'KMUTT', team2: 'KMUTNB', score1: 2, score2: 1 },
    { id: 3, team1: 'KMITL', team2: 'KMUTNB BKK', score1: 1, score2: 2 },
    { id: 4, team1: 'KMUTT', team2: 'KMUTNB', score1: 2, score2: 1 },
    
  ];

  const round2Matches: Match[] = [
    { id: 3, team1: 'KMUTNB BKK', team2: 'KMUTT', score1: 2, score2: 3 },
    { id: 4, team1: 'KMUTNB', team2: 'KMITL', score1: 1, score2: 2 },
  ];

  const finalMatch: Match = { id: 5, team1: 'KMUTT', team2: 'KMUTNB', score1: 3, score2: 1 };

  return (
    <div className="p-8 bg-black min-h-screen bracket-container">
      <div className="sport-section mb-8 d-flex flex-col">
      <h1 className="text-white text-4xl mb-8 font-extrabold">{sportname}</h1>
      <div>
        <button className="btn-bracket"><p>คู่ผสม</p></button>
        <button className="btn-bracket"><p>ชายคู่</p></button>
        <button className="btn-bracket"><p>ชายเดี่ยว</p></button>
        <button className="btn-bracket"><p>หญิงคู่</p></button>
        <button className="btn-bracket"><p>หญิงเดี่ยว</p></button>
      </div>
        
      </div>

      <div className="relative flex gap-32 ml-48 font-bold">
        {/* Round 1 */}
        <div className="flex flex-col gap-24">
          {round1Matches.map((match, index) => (
            <div key={match.id} className="relative match-wrapper">
              <div className="w-60 bg-black border border-red-600 rounded">
                <div className="flex justify-between items-center p-3 border-b border-red-700">
                  <div className="flex items-center gap-3">
                    <img src="/team-logo.png" alt="" className="w-8 h-8" />
                    <span className="text-white font-bold">{match.team1}</span>
                    <div className="score-separator" />
                  </div>
                  
                  <span className="text-white font-bold">{match.score1}</span>
                </div>
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    <img src="/team-logo.png" alt="" className="w-8 h-8" />
                    <span className="text-white font-bold">{match.team2}</span>
                    <div className="score-separator" />
                  </div>
                  <span className="text-white font-bold">{match.score2}</span>
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
                  <div className="flex items-center gap-3">
                    <img src="/team-logo.png" alt="" className="w-8 h-8" />
                    <span className="text-white">{match.team1}</span>
                    <div className="score-separator" />
                  </div>
                  <span className="text-white">{match.score1}</span>
                </div>
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    <img src="/team-logo.png" alt="" className="w-8 h-8" />
                    <span className="text-white">{match.team2}</span>
                    <div className="score-separator" />
                  </div>
                  <span className="text-white">{match.score2}
                    
                  </span>
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
              <div className="flex items-center gap-3">
                <img src="/team-logo.png" alt="" className="w-8 h-8" />
                <span className="text-white">{finalMatch.team1}</span>
                <div className="score-separator" />
              </div>
              <span className="text-white">{finalMatch.score1}</span>
            </div>
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center gap-3">
                <img src="/team-logo.png" alt="" className="w-8 h-8" />
                
                <span className="text-white">{finalMatch.team2}</span>
                <div className="score-separator" />
              </div>
              <span className="text-white">{finalMatch.score2}</span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bracket;
