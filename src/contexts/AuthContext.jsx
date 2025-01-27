import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null) // 'donor', 'hospital', 'admin'

  const login = async (credentials) => {
    try {
      // Implement actual login logic here
      // For now, let's simulate a login
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        role: credentials.role,
        avatar: null
      }
      setUser(mockUser)
      setRole(credentials.role)
      return mockUser
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      // Implement actual registration logic here
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: null
      }
      setUser(mockUser)
      setRole(userData.role)
      return mockUser
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setRole(null)
  }

  const value = {
    user,
    role,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 