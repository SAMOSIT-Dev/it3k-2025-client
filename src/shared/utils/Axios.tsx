import axios from 'axios'
import { configure } from 'axios-hooks'

export const BASE_URL = 'https://it3k.sit.kmutt.ac.th/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient