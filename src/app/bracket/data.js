// data.js
const teams = [
    { id: 0, name: 'KMITL', logo: '/team-logo.png' },
    { id: 1, name: 'KMUTNB BKK', logo: '/team-logo.png' },
    { id: 2, name: 'KMUTT', logo: '/team-logo.png' },
    { id: 3, name: 'KMUTNB PR', logo: '/team-logo.png' }
  ];
  
  const matches = [
    // Round 1
    [
      { id: 1, team1: 0, team2: 1, score1: 1, score2: 2 },
      { id: 2, team1: 2, team2: 3, score1: 2, score2: 1 }
    ],
    // Round 2
    [
      { id: 3, team1: 1, team2: 2, score1: 2, score2: 3 },
      { id: 4, team1: 3, team2: 0, score1: 1, score2: 2 }
    ],
    // Final
    [
      { id: 5, team1: 2, team2: 0, score1: 3, score2: 1 }
    ]
  ];
  
  // export data to be used in the application
  export { teams, matches };
  