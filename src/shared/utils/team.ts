export enum Team {
  KMUTT = 'KMUTT',
  KMITL = 'KMITL',
  KMUTNB = 'KMUTNB',
  KMUTNBPR = 'KMUTNB PR'
}

export const TeamLogos: Record<Team, string> = {
  [Team.KMUTT]: '/images/KMUTT_logo.png',
  [Team.KMITL]: '/images/KMITL_logo.png',
  [Team.KMUTNB]: '/images/KMUTNB_logo.png',
  [Team.KMUTNBPR]: '/images/KMUTNB_logo.png'
}

export const TeamName: Record<Team, string> = {
  [Team.KMUTT]: "King Mongkut's Thonburi",
  [Team.KMITL]: "King Mongkut's Ladkrabang",
  [Team.KMUTNB]: "King Mongkut's North Bangkok",
  [Team.KMUTNBPR]: "King Mongkut's North Bangkok"
}

export const TeamMapping: Record<string, Team> = {
  KMUTT: Team.KMUTT,
  KMITL: Team.KMITL,
  KMUTNB: Team.KMUTNB,
  KMUTNB_PR: Team.KMUTNBPR
}
