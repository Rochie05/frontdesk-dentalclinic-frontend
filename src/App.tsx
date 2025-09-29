import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/routes"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <BrowserRouter>
      <Provider>
        <AppRoutes />
        <Toaster /> 
      </Provider>
    </BrowserRouter>
  )
}