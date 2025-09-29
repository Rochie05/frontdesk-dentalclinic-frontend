export type UserRole = 'guest' | 'receptionist' | 'cashier'

export interface User {
  id: string
  email: string
  role: UserRole
  isAuthenticated: boolean
}

export interface UserContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isRole: (role: UserRole) => boolean
  canAccess: (requiredRole: UserRole) => boolean
}