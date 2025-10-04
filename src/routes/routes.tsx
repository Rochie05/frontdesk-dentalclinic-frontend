import { Routes, Route } from "react-router-dom"

import Login from "@/pages/Login"
import NotFound from "@/pages/NotFound"

import Receptionist from "@/pages/receptionist/ReceptionistDashboard"
import AppointmentsList from "@/pages/receptionist/AppointmentsList"
import FollowUpAppointments from "@/pages/receptionist/FollowUpAppointments"
import CancelRequests from "@/pages/receptionist/CancelRequests"


import Cashier from "@/pages/cashier/CashierDashboard"
import PaymentsList from "@/pages/cashier/PaymentsList"
import PaymentDetail from "@/pages/cashier/PaymentDetail"
import AppointmentRefunds from "@/pages/cashier/AppointmentRefunds"
import RefundDetail from "@/pages/cashier/RefundDetail"

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
      
      {/* Appointments List - accessible by receptionist */}
      <Route 
        path="/appointments-list" 
        element={
          <ProtectedRoute requiredRole="receptionist">
            <AppointmentsList />
          </ProtectedRoute>
        }
      />
      
      {/* Follow Up Appointments - accessible by receptionist */}
      <Route 
        path="/follow-up" 
        element={
          <ProtectedRoute requiredRole="receptionist">
            <FollowUpAppointments />
          </ProtectedRoute>
        }
      />
      
      {/* Cancel Requests - accessible by receptionist */}
      <Route 
        path="/cancel-requests" 
        element={
          <ProtectedRoute requiredRole="receptionist">
            <CancelRequests />
          </ProtectedRoute>
        }
      />
      
      {/* Payments List - accessible by cashier */}
      <Route 
        path="/payments-list" 
        element={
          <ProtectedRoute requiredRole="cashier">
            <PaymentsList />
          </ProtectedRoute>
        }
      />
      
      {/* Payment Detail - accessible by cashier */}
      <Route 
        path="/payments-list/:id" 
        element={
          <ProtectedRoute requiredRole="cashier">
            <PaymentDetail />
          </ProtectedRoute>
        }
      />
      
      {/* Appointment Refunds - accessible by cashier */}
      <Route 
        path="/appointment-refunds" 
        element={
          <ProtectedRoute requiredRole="cashier">
            <AppointmentRefunds />
          </ProtectedRoute>
        }
      />
      
      {/* Refund Detail - accessible by cashier */}
      <Route 
        path="/appointment-refunds/:id" 
        element={
          <ProtectedRoute requiredRole="cashier">
            <RefundDetail />
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