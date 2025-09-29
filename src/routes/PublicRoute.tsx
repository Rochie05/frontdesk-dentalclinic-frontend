import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import type { ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  redirectTo 
}) => {
  const { isAuthenticated, user } = useUser()

  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    const dashboardPath = redirectTo || `/dashboard/${user.role}`
    return <Navigate to={dashboardPath} replace />
  }

  // If not authenticated, show the public content (login page)
  return <>{children}</>
}