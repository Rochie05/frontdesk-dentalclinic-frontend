/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { User, UserRole, UserContextType } from '@/types/auth'
import { loginWithSupabase, logoutFromSupabase, refreshSupabaseToken, AuthenticationError } from '@/apis/authService'
import { secureStorage, SecureStorageKeys } from '@/utils/secureStorage'

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

// Helper function to map role_name to UserRole
const mapRoleNameToUserRole = (roleName: string): UserRole => {
  const normalizedRole = roleName.toLowerCase()
  if (normalizedRole === 'cashier') return 'cashier'
  if (normalizedRole === 'receptionist') return 'receptionist'
  return 'guest'
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  const persistUser = useCallback(async (value: User | null) => {
    if (value) {
      await secureStorage.setJSON(SecureStorageKeys.USER, value)
    } else {
      secureStorage.removeItem(SecureStorageKeys.USER)
    }
  }, [])

  const updateAuthToken = useCallback(async (token: string | null, refresh?: string | null, expiry?: number, tokenType?: string) => {
    setAuthToken(token)
    if (refresh !== undefined) {
      setRefreshToken(refresh)
    }

    setUser((previous) => {
      if (!previous) return previous

      const nextUser: User = {
        ...previous,
        accessToken: token,
        tokenExpiry: expiry,
        tokenType: tokenType
      }

      // Persist user asynchronously (no need to await in state setter)
      persistUser(nextUser).catch(error => {
        console.error('Failed to persist user:', error)
      })
      return nextUser
    })

    if (token) {
      await secureStorage.setItem(SecureStorageKeys.AUTH_TOKEN, token)
    } else {
      secureStorage.removeItem(SecureStorageKeys.AUTH_TOKEN)
    }
    
    if (refresh !== undefined) {
      if (refresh) {
        await secureStorage.setItem(SecureStorageKeys.REFRESH_TOKEN, refresh)
      } else {
        secureStorage.removeItem(SecureStorageKeys.REFRESH_TOKEN)
      }
    }

    if (expiry !== undefined) {
      await secureStorage.setItem(SecureStorageKeys.TOKEN_EXPIRY, expiry.toString())
    }

    if (tokenType !== undefined) {
      await secureStorage.setItem(SecureStorageKeys.TOKEN_TYPE, tokenType)
    }
  }, [persistUser])

  // Load user from secure storage on mount
  useEffect(() => {
    const loadSecureData = async () => {
      try {
        const savedUser = await secureStorage.getJSON<User>(SecureStorageKeys.USER)
        const savedToken = await secureStorage.getItem(SecureStorageKeys.AUTH_TOKEN)
        const savedRefreshToken = await secureStorage.getItem(SecureStorageKeys.REFRESH_TOKEN)
        
        if (savedUser && savedUser.isAuthenticated) {
          // Validate that the saved user has all required properties
          const validRoles: UserRole[] = ['receptionist', 'cashier', 'guest']
          if (!savedUser.id || !savedUser.email || !savedUser.role || !validRoles.includes(savedUser.role)) {
            console.error('Invalid saved user data:', savedUser)
            throw new Error('Invalid user data')
          }
          
          setUser(savedUser)
          const token = savedUser.accessToken ?? savedToken ?? null
          if (token) {
            setAuthToken(token)
          }
          if (savedRefreshToken) {
            setRefreshToken(savedRefreshToken)
          }
        } else if (savedToken) {
          setAuthToken(savedToken)
          if (savedRefreshToken) {
            setRefreshToken(savedRefreshToken)
          }
        }
      } catch (error) {
        console.error('Error loading saved user:', error)
        // Clear corrupted data
        secureStorage.removeItem(SecureStorageKeys.USER)
        secureStorage.removeItem(SecureStorageKeys.AUTH_TOKEN)
        secureStorage.removeItem(SecureStorageKeys.REFRESH_TOKEN)
        secureStorage.removeItem(SecureStorageKeys.TOKEN_EXPIRY)
        secureStorage.removeItem(SecureStorageKeys.TOKEN_TYPE)
      }
    }

    loadSecureData()
  }, [])

  // Real Supabase authentication
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await loginWithSupabase({ email, password })
      
      // Map role_name from staff_info to UserRole
      const userRole = mapRoleNameToUserRole(response.user.staff_info.role_name)
      
      // Validate role
      const validRoles: UserRole[] = ['receptionist', 'cashier', 'guest']
      if (!validRoles.includes(userRole)) {
        console.error('Invalid user role:', response.user.staff_info.role_name)
        throw new AuthenticationError('Invalid user role', 403)
      }
      
      const newUser: User = {
        id: response.user.id,
        email: response.user.email,
        role: userRole,
        displayName: response.user.display_name,
        isAuthenticated: true,
        accessToken: response.access_token,
        tokenExpiry: response.expires_in,
        tokenType: response.token_type,
        staffInfo: response.user.staff_info
      }

      // Persist user data to secure storage first
      await persistUser(newUser)
      await updateAuthToken(response.access_token, response.refresh_token, response.expires_in, response.token_type)
      
      // Then update state
      setUser(newUser)
      
      return newUser
    } catch (error) {
      console.error('Login error:', error)
      if (error instanceof AuthenticationError) {
        // Handle specific authentication errors
        console.error('Authentication failed:', error.message)
      }
      return null
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
      await persistUser(null)
      await updateAuthToken(null, null)
      // Clear token metadata
      secureStorage.removeItem(SecureStorageKeys.TOKEN_EXPIRY)
      secureStorage.removeItem(SecureStorageKeys.TOKEN_TYPE)
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
      await updateAuthToken(response.access_token, response.refresh_token, response.expires_in, response.token_type)
      return true
    } catch (error) {
      console.error('Token refresh failed:', error)
      // If refresh fails, logout the user
      await logout()
      return false
    }
  }, [refreshToken, updateAuthToken])

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