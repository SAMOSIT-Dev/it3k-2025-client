import { Team, TeamLogos } from '@/shared/utils/team'
import { Place, PlaceType, Sport } from './types'

export const universityLogoList = [
  {
    src: TeamLogos['KMUTT'],
    alt: Team.KMUTT
  },
  {
    src: TeamLogos['KMUTNB'],
    alt: Team.KMUTNB
  },
  {
    src: TeamLogos['KMITL'],
    alt: Team.KMITL
  },
  {
    src: TeamLogos['KMUTNB PR'],
    alt: Team.KMUTNB_PR
  }
]

export const SportPlaceMapping: Record<Sport, PlaceType> = {
  [Sport.badminton]: Place.chord,
  [Sport.athletics]: Place.stadium,
  [Sport.basketball]: Place.stadium,
  [Sport.pingpong]: Place.table,
  [Sport.football]: Place.stadium,
  [Sport.tradition]: Place.stadium
}
