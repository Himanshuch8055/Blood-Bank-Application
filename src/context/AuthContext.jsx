import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await api.get('/auth/me')
        setUser(response.data)
      }
    } catch (error) {
      localStorage.removeItem('token')
      setError(error.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 