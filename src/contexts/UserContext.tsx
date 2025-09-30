/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { User, UserRole, UserContextType } from '@/types/auth'
import { loginWithSupabase, logoutFromSupabase, refreshSupabaseToken, AuthenticationError } from '@/apis/authService'

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
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  const persistUser = useCallback((value: User | null) => {
    if (value) {
      localStorage.setItem('user', JSON.stringify(value))
    } else {
      localStorage.removeItem('user')
    }
  }, [])

  const updateAuthToken = useCallback((token: string | null, refresh?: string | null) => {
    setAuthToken(token)
    if (refresh !== undefined) {
      setRefreshToken(refresh)
    }

    setUser((previous) => {
      if (!previous) return previous

      const nextUser: User = {
        ...previous,
        accessToken: token
      }

      persistUser(nextUser)
      return nextUser
    })

    if (token) {
      localStorage.setItem('authToken', token)
    } else {
      localStorage.removeItem('authToken')
    }
    
    if (refresh !== undefined) {
      if (refresh) {
        localStorage.setItem('refreshToken', refresh)
      } else {
        localStorage.removeItem('refreshToken')
      }
    }
  }, [persistUser])

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('authToken')
    const savedRefreshToken = localStorage.getItem('refreshToken')
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        if (parsedUser && parsedUser.isAuthenticated) {
          setUser(parsedUser)
          const token = parsedUser.accessToken ?? savedToken ?? null
          if (token) {
            setAuthToken(token)
          }
          if (savedRefreshToken) {
            setRefreshToken(savedRefreshToken)
          }
        }
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
      }
    } else if (savedToken) {
      setAuthToken(savedToken)
      if (savedRefreshToken) {
        setRefreshToken(savedRefreshToken)
      }
    }
  }, [])

  // Real Supabase authentication
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginWithSupabase({ email, password })
      
      const newUser: User = {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role as UserRole,
        isAuthenticated: true,
        accessToken: response.access_token
      }

      setUser(newUser)
      persistUser(newUser)
      updateAuthToken(response.access_token, response.refresh_token)
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      if (error instanceof AuthenticationError) {
        // Handle specific authentication errors
        console.error('Authentication failed:', error.message)
      }
      return false
    }
  }

  const logout = async () => {
    try {
      if (authToken) {
        await logoutFromSupabase(authToken)
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Continue with local logout even if server logout fails
    } finally {
      setUser(null)
      persistUser(null)
      updateAuthToken(null, null)
    }
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

  // Token refresh function
  const refreshAuthToken = useCallback(async (): Promise<boolean> => {
    if (!refreshToken) {
      return false
    }
    
    try {
      const response = await refreshSupabaseToken({ refresh_token: refreshToken })
      updateAuthToken(response.access_token, response.refresh_token)
      return true
    } catch (error) {
      console.error('Token refresh failed:', error)
      // If refresh fails, logout the user
      logout()
      return false
    }
  }, [refreshToken, updateAuthToken, logout])

  const value: UserContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isRole,
    canAccess,
    authToken,
    setAuthToken: updateAuthToken,
    refreshToken,
    refreshAuthToken
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}