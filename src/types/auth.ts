export type UserRole = 'guest' | 'receptionist' | 'cashier'

export interface StaffInfo {
  staff_id: number
  last_name: string
  first_name: string
  contact_number: string
  email: string
  staff_image_url: string | null
  role_id: number
  role_name: string
}

export interface User {
  id: string
  email: string
  role: UserRole
  displayName?: string
  isAuthenticated: boolean
  accessToken?: string | null
  tokenExpiry?: number
  tokenType?: string
  staffInfo?: StaffInfo
}

export interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User | null>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isRole: (role: UserRole) => boolean
  canAccess: (requiredRole: UserRole) => boolean
  authToken: string | null
  setAuthToken: (token: string | null, refresh?: string | null) => void
  refreshToken: string | null
  refreshAuthToken: () => Promise<boolean>
}