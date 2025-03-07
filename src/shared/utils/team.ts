export enum Team {
  KMUTT = 'KMUTT',
  KMITL = 'KMITL',
  KMUTNB = 'KMUTNB',
  KMUTNB_PR = 'KMUTNB PR',
  TBD = 'TBD'
}

export const TeamLogos: Record<Team, string> = {
  [Team.KMUTT]: '/images/KMUTT_logo.png',
  [Team.KMITL]: '/images/KMITL_logo.png',
  [Team.KMUTNB]: '/images/KMUTNB_logo.png',
  [Team.KMUTNB_PR]: '/images/KMUTNB_PR_logo.png',
  [Team.TBD]: '/images/pop.png'
}

export const TeamName: Record<Team, string> = {
  [Team.KMUTT]: "King Mongkut's Thonburi",
  [Team.KMITL]: "King Mongkut's Ladkrabang",
  [Team.KMUTNB]: "King Mongkut's North Bangkok",
  [Team.KMUTNB_PR]: "King Mongkut's North Bangkok",
  [Team.TBD]: "-"
}

export const TeamMapping: Record<string, Team> = {
  KMUTT: Team.KMUTT,
  KMITL: Team.KMITL,
  KMUTNB: Team.KMUTNB,
  KMUTNB_PR: Team.KMUTNB_PR,
  TBD: Team.TBD
}
