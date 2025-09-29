import { Routes, Route } from "react-router-dom"

import Login from "@/pages/Login"

import NotFound from "@/pages/NotFound"
import Receptionist from "@/pages/Receptionist"
import Cashier from "@/pages/Cashier"


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/rdashboard" element={<Receptionist/>}/>
      <Route path="/cdashboard" element={<Cashier/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}