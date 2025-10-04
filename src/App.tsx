import { BrowserRouter } from "react-router-dom"
import { useEffect } from "react"
import AppRoutes from "./routes/routes"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/contexts/UserContext"
import { migrateFromLocalStorage } from "@/utils/storageMigration"

export default function App() {
  // Run storage migration on app initialization
  useEffect(() => {
    migrateFromLocalStorage()
  }, [])

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