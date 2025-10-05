import { Routes, Route } from "react-router-dom"

import Login from "@/pages/Login"
import NotFound from "@/pages/NotFound"

import Receptionist from "@/pages/receptionist/ReceptionistDashboard"
import AppointmentsList from "@/pages/receptionist/AppointmentsList"
import FollowUpAppointments from "@/pages/receptionist/FollowUpAppointments"
import CancelRequests from "@/pages/receptionist/CancelRequests"

import Appointment from "@/pages/receptionist/appointment/Appointment"

import Cashier from "@/pages/cashier/CashierDashboard"
import PaymentsList from "@/pages/cashier/PaymentsList"
import AppointmentRefunds from "@/pages/cashier/AppointmentRefunds"

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
          //<ProtectedRoute requiredRole="receptionists">
            <Receptionist />
          //</ProtectedRoute>
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
          //<ProtectedRoute requiredRole="receptionist">
            <AppointmentsList />
          //</ProtectedRoute>
        }
      />

      <Route 
        path="/appointments-list/appointment" 
        element={
          //<ProtectedRoute requiredRole="receptionist">
            <Appointment />
          //</ProtectedRoute>
        }
      />
      
      {/* Follow Up Appointments - accessible by receptionist */}
      <Route 
        path="/follow-up" 
        element={
          //<ProtectedRoute requiredRole="receptionist">
            <FollowUpAppointments />
          //</ProtectedRoute>
        }
      />
      
      {/* Cancel Requests - accessible by receptionist */}
      <Route 
        path="/cancel-requests" 
        element={
          //<ProtectedRoute requiredRole="receptionist">
            <CancelRequests />
          //</ProtectedRoute>
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
      
      {/* Appointment Refunds - accessible by cashier */}
      <Route 
        path="/appointment-refunds" 
        element={
          <ProtectedRoute requiredRole="cashier">
            <AppointmentRefunds />
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