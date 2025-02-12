import React from 'react';
import "./style.css"

const Bracket = () => {
  const matches = [
    { team1: 'Team A', team2: 'Team B', score1: 3, score2: 1 },
    { team1: 'Team C', team2: 'Team D', score1: 2, score2: 2 },
    { team1: 'Team E', team2: 'Team F', score1: 1, score2: 0 },
    { team1: 'Team G', team2: 'Team H', score1: 4, score2: 3 },
    { team1: 'Winner 1', team2: 'Winner 2', score1: 2, score2: 1 },
    { team1: 'Winner 3', team2: 'Winner 4', score1: 3, score2: 2 },
    { team1: 'Winner 5', team2: 'Winner 6', score1: 1, score2: 0 },
  ];

  const Match = ({ team1, team2, score1, score2 }) => (
    <div className="flex flex-col bg-black-800 border-2 border-red-500 w-48">
      <div className="flex justify-between items-center p-2 border-b border-red-500">
        <span className="text-white">{team1}</span>
        <span className="text-white ml-2">{score1}</span>
      </div>
      <div className="flex justify-between items-center p-2">
        <span className="text-white">{team2}</span>
        <span className="text-white ml-2">{score2}</span>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-black min-h-screen bracket-container">
      <h1 className="text-white text-2xl mb-8">Tournament Bracket</h1>
      <div className="relative flex">
        {/* Round 1 */}
        <div className="flex flex-col justify-around mr-24">
          {matches.slice(0, 4).map((match, index) => (
            <div key={index} className="mb-16 relative">
              <Match {...match} />
              <div className="connector-container">
                {/* <div className="h-px w-6 bg-red-500 absolute right-0 top-1/4 transform translate-x-full"></div>
                <div className="h-px w-6 bg-red-500 absolute right-0 top-3/4 transform translate-x-full"></div>
                <div className="h-1/2 w-px bg-red-500 absolute right-0 top-1/4 transform translate-x-6"></div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Round 2 */}
        <div className="flex flex-col justify-around mr-24">
          {matches.slice(4, 6).map((match, index) => (
            <div key={index} className={`${index === 0 ? 'mt-24 mb-32' : 'mb-16'} relative`}>
              <Match {...match} />
              <div className="connector-container">
                {/* <div className="h-px w-6 bg-red-500 absolute right-0 top-1/4 transform translate-x-full"></div>
                <div className="h-px w-6 bg-red-500 absolute right-0 top-3/4 transform translate-x-full"></div>
                <div className="h-1/2 w-px bg-red-500 absolute right-0 top-1/4 transform translate-x-6"></div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Final Round */}
        <div className="flex flex-col justify-around">
          <div className="mt-34">
            <Match {...matches[6]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bracket;