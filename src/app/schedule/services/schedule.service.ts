'use server'

import axios from 'axios'

import * as endpoints from '../utils/endpoints'
import { Team, TeamLogos } from '@/shared/utils/team'

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

export interface UpComingEvent {
  scheduleId: number
  type: string
  time: string
  location: {
    locationId: number
    name: string
  }
  teamA: {
    teamId: number
    name: string
    image: string
    color_code: string
  }
  teamB: {
    teamId: number
    name: string
    image: string
    color_code: string
  }
}

export const getSchedules = async (): Promise<Result<Schedule[]>> => {
  try {
    const signal = AbortSignal.timeout(2000)
    const response = await axios.get(endpoints.schedule.schedules, { signal })
    if (response.status != 200) {
      return {
        success: false,
        message: response.data?.message ?? 'unknow error',
        data: []
      }
    }
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        data: []
      }
    }
    return {
      success: false,
      message: 'unknow error',
      data: []
    }
  }
}
