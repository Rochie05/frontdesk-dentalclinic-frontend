import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import type { UserRole } from '@/types/auth'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole: UserRole
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  redirectTo = '/' 
}) => {
  const { canAccess, isAuthenticated, user } = useUser()
  const location = useLocation()

  // If not authenticated and trying to access protected content, redirect to login
  if (!isAuthenticated && requiredRole !== 'guest') {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // If authenticated but doesn't have the required role, redirect appropriately
  if (isAuthenticated && !canAccess(requiredRole)) {
    // Redirect based on user's actual role
    if (user?.role === 'receptionist') {
      return <Navigate to="/dashboard/receptionist" replace />
    } else if (user?.role === 'cashier') {
      return <Navigate to="/dashboard/cashier" replace />
    }
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
