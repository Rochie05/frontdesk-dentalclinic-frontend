import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { toaster } from '@/components/ui/toaster'

interface LogoutProps {
  size?: "sm" | "md" | "lg"
  variant?: "outline" | "solid" | "ghost"
}

export default function Logout({ size = "sm", variant = "outline" }: LogoutProps) {
  const navigate = useNavigate()
  const { logout, user } = useUser()

  const handleLogout = () => {
    // Call the logout function from UserContext
    logout()

    // Show success message
    toaster.create({
      title: "Logged Out",
      description: `Goodbye, ${user?.email || 'user'}!`,
      type: "info",
      duration: 3000
    })

    // Navigate to login page
    navigate('/')
  }

  return (
    <Button
      onClick={handleLogout}
      size={size}
      variant={variant}
      colorPalette="red"
    >
      Logout
    </Button>
  )
}
