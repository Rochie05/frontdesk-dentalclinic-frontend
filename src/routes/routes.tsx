import { Routes, Route } from "react-router-dom"

import Login from "@/pages/Login"
import NotFound from "@/pages/NotFound"
import Receptionist from "@/pages/Receptionist"
import Cashier from "@/pages/Cashier"

import { ProtectedRoute } from "./ProtectedRoute"
import { PublicRoute } from "./PublicRoute"

export default function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/dashboard/receptionist" 
        element={
          <ProtectedRoute requiredRole="receptionist">
            <Receptionist />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/dashboard/cashier" 
        element={
          <ProtectedRoute requiredRole="cashier">
            <Cashier />
          </ProtectedRoute>
        }
      />
      {/* Legacy route - redirects to role-specific dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="receptionist">
            <Receptionist />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}