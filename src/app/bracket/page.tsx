import React from 'react';
import "./style.css"
const Bracket = () => {
  return (
    <div className="p-8 bg-black min-h-screen bracket-container ">
      <h1 className="text-white text-2xl mb-8 ">SportName</h1>
      <div className="sport-section mb-8">
        <button className="btn-bracket"> คู่ผสม</button>
        <button className="btn-bracket"> ชายคู่</button>
        <button className="btn-bracket"> ชายเดี่ยว</button>
        <button className="btn-bracket"> หญิงคู่</button>
        <button className="btn-bracket"> หญิงเดี่ยว</button>
      </div>
      
      <div className="relative flex gap-32 ml-48">
        {/* Round 1 */}
        <div className="flex flex-col gap-24">
          {[1, 2, 3, 4].map((match, index) => (
            <div key={match} className="relative match-wrapper">
              <div className="w-64 bg-black border border-red-600 rounded">
                <div className="flex justify-between items-center p-3 border-b border-red-600">
                  <div className="flex items-center gap-3">
                    <img src="/team-logo.png" alt="" className="w-8 h-8" />
                    <span className="text-white">KMITL</span>
                  </div>
                  <span className="text-white">1</span>
                </div>
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    <img src="/team-logo.png" alt="" className="w-8 h-8" />
                    <span className="text-white">KMUTNB BKK</span>
                  </div>
                  <span className="text-white">2</span>
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
  {[1, 2].map((match, index) => (
    <div 
      key={match} 
      className={`relative match-wrapper ${index === 1 ? 'semifinal-bottom' : ''}`}>
      <div className="w-64 bg-black border border-red-600 rounded">
        <div className="flex justify-between items-center p-3 border-b border-red-600">
          <div className="flex items-center gap-3">
            <img src="/team-logo.png" alt="" className="w-8 h-8" />
            <span className="text-white">KMUTNB BKK</span>
          </div>
          <span className="text-white">1</span>
        </div>
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center gap-3">
            <img src="/team-logo.png" alt="" className="w-8 h-8" />
            <span className="text-white">KMUTT</span>
          </div>
          <span className="text-white">2</span>
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
          <div className="w-64 bg-black border border-red-600 rounded">
            <div className="flex justify-between items-center p-3 border-b border-red-600">
              <div className="flex items-center gap-3">
                <img src="/team-logo.png" alt="" className="w-8 h-8" />
                <span className="text-white">KMUTT</span>
              </div>
              <span className="text-white">2</span>
            </div>
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center gap-3">
                <img src="/team-logo.png" alt="" className="w-8 h-8" />
                <span className="text-white">KMUTNB PR</span>
              </div>
              <span className="text-white">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bracket;