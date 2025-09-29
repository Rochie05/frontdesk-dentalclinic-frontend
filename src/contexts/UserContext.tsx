import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User, UserRole, UserContextType } from '@/types/auth'

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        if (parsedUser && parsedUser.isAuthenticated) {
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  // Mock authentication function - replace with real API call
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Mock authentication logic
      // In a real app, this would be an API call
      const mockCredentials = {
        receptionist: { email: 'receptionist@clinic.com', password: 'receptionist123' },
        cashier: { email: 'cashier@clinic.com', password: 'cashier123' }
      }

      if (role === 'guest') {
        return false // Guests cannot login
      }

      const validCredentials = mockCredentials[role]
      if (email === validCredentials.email && password === validCredentials.password) {
        const newUser: User = {
          id: `${role}-${Date.now()}`,
          email,
          role,
          isAuthenticated: true
        }

        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        return true
      }

      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const isAuthenticated = user?.isAuthenticated ?? false

  const isRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  const canAccess = (requiredRole: UserRole): boolean => {
    if (!user || !user.isAuthenticated) {
      return requiredRole === 'guest'
    }

    // Role-based access control
    switch (requiredRole) {
      case 'guest':
        return true // Anyone can access guest content
      case 'receptionist':
        return user.role === 'receptionist'
      case 'cashier':
        return user.role === 'cashier'
      default:
        return false
    }
  }

  const value: UserContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isRole,
    canAccess
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}