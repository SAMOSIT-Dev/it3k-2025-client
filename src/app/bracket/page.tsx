'use client'
import Script from 'next/script'
import React, { useEffect } from 'react'

// Mockup data
const URL = 'https://raw.githubusercontent.com/Drarig29/brackets-viewer.js/master/demo/db.json'

function importCdn () {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.js'
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.css'
  document.head.appendChild(link)
  document.body.appendChild(script)
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

const BracketPage = () => {
  useEffect(() => {
    importCdn()
    render()
  }, [])

  return (
    <>
      <div className="brackets-viewer"></div>
    </>
  )
}

export default BracketPage
