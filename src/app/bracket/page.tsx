"use client"
import Script from 'next/script'
import React, { useEffect } from 'react'
import './style.css' 


const URL = 'https://raw.githubusercontent.com/Drarig29/brackets-viewer.js/master/demo/db.json'
function importCdn() {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.js'
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.css'
  document.head.appendChild(link)
  document.body.appendChild(script)
}

function injectCustomStyles() {
  const style = document.createElement('style')
  style.innerHTML = `
    .brackets-viewer {
      background-color: black !important;
      color: white !important;
      border: solid 2px red !important;
      padding: 20px 40px !important;
    }
    .brackets-viewer .match {
      background-color: black !important;
      
      padding: 15px !important;
    }
    .brackets-viewer .participant {
      background-color: black !important;
      color: white !important;
      padding: 10px 20px !important;
      border: solid 2px red !important;
    }
    .brackets-viewer .btn-choice {
     
      color: white !important;
      padding: 10px 20px !important;
      border-radius: 5px;
      margin: 5px;
    }
      //เเก้ไม่หาย
    .brackets-viewer .btn-choice:hover {
      background-color: black 
      color: white; 
    }
    .brackets-viewer .match:hover {
      background-color: #333 ;
    }
  `
  document.head.appendChild(style)
}


async function render() {
  const data = await fetch(URL).then((res) => res.json())

  window.bracketsViewer.render({
    stages: data.stage,
    matches: data.match,
    matchGames: data.match_game,
    participants: data.participant
  })
}

const sortingChoice = ["คู่ผสม", "ชายคู่", "ชายเดี่ยว", "หญิงเดี่ยว", "หญิงคู่"]

const BracketPage = () => {
  useEffect(() => {
    importCdn()
    injectCustomStyles()  
    render()
  }, [])

  return (
    <div className="brackets-viewer">
      <h1>ปิงปอง</h1>
      <div className='bracket-sorted'>
        {sortingChoice.map((index, key) => (
          <button key={key} className='btn-choice'>{index}</button> 
        ))}
      </div>
    </div>
  )
}

export default BracketPage
