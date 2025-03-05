// type TAthleticServicePUTBody = {

import axios from "axios"

// }

export type TAthleticTeam = {
  id: number
  uniName: string
  image: string
  colorCode: string
  ranking: number
}

export type TAthleticServiceGET = {
  event: string;
  time: string;
  location: string;
  teams: TAthleticTeam[]
}

const AthleticService = {
  getScores: async (): Promise<TAthleticServiceGET[]> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DEFAULT_API_BASE_URL}/api/athletics`
      const response = await axios.get(url)
      return response.data.data
    } catch (err) {
      console.log(err)
    }
    return []
  },
  updateScoreByEventName: (event: string) => {

  }
}

export default AthleticService