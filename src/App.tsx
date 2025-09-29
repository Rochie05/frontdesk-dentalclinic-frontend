import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/routes"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/contexts/UserContext"

export default function App() {
  return (
    <BrowserRouter>
      <Provider>
        <UserProvider>
          <AppRoutes />
          <Toaster /> 
        </UserProvider>
      </Provider>
    </BrowserRouter>
  )
}