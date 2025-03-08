import useAxios from 'axios-hooks'
import apiClient from '@/shared/utils/Axios'
import { configure } from 'axios-hooks'

configure({ axios: apiClient })

export interface IUniversity {
  id: number
  uniName: string
  image: string
  colorCode: string
  ranking: number
}

export enum AthleticsCategory {
  FEMALE_100M = '100m_female',
  MALE_100M = '100m_male',
  FEMALE_400M = '400m_female',
  MALE_400M = '400m_male'
}

export const CATEGORY_LABELS: Record<AthleticsCategory, string> = {
  [AthleticsCategory.FEMALE_100M]: '100m women',
  [AthleticsCategory.MALE_100M]: '100m men',
  [AthleticsCategory.FEMALE_400M]: '4x100m women',
  [AthleticsCategory.MALE_400M]: '4x100m men'
}

export interface IMatchData {
  event: string
  time: string
  location: string
  teams: IUniversity[]
}

export interface IAthleticsApiResponse {
  success: boolean
  message: string
  data: IMatchData[]
}

export const useFetchAthleticsData = (type: AthleticsCategory) => {
  return useAxios<IAthleticsApiResponse>(
    {
      url: `/athletics/event/${type}`,
      method: 'GET'
    },
    // { axios: apiClient }
  )
}
