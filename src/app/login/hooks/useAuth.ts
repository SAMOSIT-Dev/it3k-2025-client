import { useState } from 'react'
import axios from 'axios'

const API_URL = 'https://it3k-in.sit.kmutt.ac.th'

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [admin, setAdmin] = useState<{
    id: number
    username: string
    role: string
  } | null>(null)

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/auth/login/`, {
        username,
        password
      })

      setAccessToken(res.data.accessToken)
      localStorage.setItem('accessToken', res.data.accessToken)
      setAdmin(() => res.data.admin)

      document.cookie = `refreshToken=${res.data.refreshToken}; path=/;`

      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message)
      }
      return false
    }
  }

  const refreshAccessToken = async () => {
    try {
      const refreshToken = getCookie('refreshToken')
      if (!refreshToken) return

      const res = await axios.post(`${API_URL}/api/auth/refresh`, {
        refreshToken
      })

      setAccessToken(res.data.accessToken)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Failed to refresh token:',
          error.response?.data || error.message
        )
      }
    }
  }

  const logout = async () => {
    try {
      const refreshToken = getCookie('refreshToken')
      if (!refreshToken) return

      await axios.post(`${API_URL}/api/auth/logout`, { refreshToken })

      setAccessToken(null)
      setAdmin(null)

      document.cookie = 'refreshToken=; path=/; max-age=0;'
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Logout failed:', error.response?.data || error.message)
      }
    }
  }

  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? match[2] : null
  }

  return { accessToken, admin, login, refreshAccessToken, logout }
}
