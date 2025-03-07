'use server'

import axios from 'axios'

import * as endpoints from '../utils/endpoints'

export interface Result<T> {
  success: boolean
  message: string
  data: T
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

export const getUpComingEvents = async (): Promise<
  Result<UpComingEvent[]>
> => {
  try {
    const response = await axios.get(endpoints.schedule.events)
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
