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
