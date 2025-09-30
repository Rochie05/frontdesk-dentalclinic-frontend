export type UserRole = 'guest' | 'receptionist' | 'cashier'

export interface User {
  id: string
  email: string
  role: UserRole
  isAuthenticated: boolean
  accessToken?: string | null
}

export interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isRole: (role: UserRole) => boolean
  canAccess: (requiredRole: UserRole) => boolean
  authToken: string | null
  setAuthToken: (token: string | null, refresh?: string | null) => void
  refreshToken: string | null
  refreshAuthToken: () => Promise<boolean>
}