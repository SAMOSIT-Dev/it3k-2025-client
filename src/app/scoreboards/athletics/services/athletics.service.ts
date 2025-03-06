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
  [AthleticsCategory.FEMALE_100M]: 'วิ่ง 100 เมตร หญิง',
  [AthleticsCategory.MALE_100M]: 'วิ่ง 100 เมตร ชาย',
  [AthleticsCategory.FEMALE_400M]: 'วิ่ง 4x100 เมตร หญิง',
  [AthleticsCategory.MALE_400M]: 'วิ่ง 4x100 เมตร ชาย'
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
    { axios: apiClient }
  )
}
