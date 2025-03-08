export interface MultiTypeSchedule {
  title: string
  items: Schedule[]
}

export interface Result<T> {
  success: boolean
  message: string
  data: T
}

export interface Schedule {
  id: number
  sportTitle: string
  type: string
  location: 'Gymnasium' | 'Football Field'
  place: number
  teamA: {
    id: number
    name: string
    logo: string
  }
  teamB: {
    id: number
    name: string
    logo: string
  }
  period: {
    start: string
    end: string
  }
}

export type ScheduleResponse = Result<Schedule[]>

export enum Sport {
  athletics = 'athletics',
  football = 'football',
  pingpong = 'pingpong',
  badminton = 'badminton',
  basketball = 'basketball',
  tradition = 'tradition'
}

export enum Place {
  court = 'court',
  stadium = 'stadium',
  table = 'table'
}

export type PlaceType = Place.court | Place.stadium | Place.table
