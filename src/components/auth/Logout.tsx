import { useState } from 'react'
import { 
  Button, 
  Input,
  Portal,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogBackdrop,
  Field
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { toaster } from '@/components/ui/toaster'
import { loginWithSupabase } from '@/apis/authService'

interface LogoutProps {
  size?: "sm" | "md" | "lg"
  variant?: "outline" | "solid" | "ghost"
  fullWidth?: boolean
}

export default function Logout({ size = "sm", variant = "outline", fullWidth = false }: LogoutProps) {
  const navigate = useNavigate()
  const { logout, user } = useUser()
  const [password, setPassword] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')

  const handleVerifyAndLogout = async () => {
    if (!password.trim()) {
      setError('Password is required')
      return
    }

    if (!user?.email) {
      setError('User email not found')
      return
    }

    setIsVerifying(true)
    setError('')

    try {
      // Verify password by attempting to login with the provided credentials
      await loginWithSupabase({ 
        email: user.email, 
        password: password 
      })

      // If login successful, password is correct - proceed with logout
      await logout()

      // Show success message
      toaster.create({
        title: "Logged Out",
        description: `Goodbye, ${user?.email || 'user'}!`,
        type: "success",
        duration: 3000
      })

      // Close dialog and clear state
      setIsOpen(false)
      setPassword('')
      
      // Navigate to login page
      navigate('/')
    } catch (error) {
      console.error('Password verification failed:', error)
      setError('Invalid password. Please try again.')
      toaster.create({
        title: "Verification Failed",
        description: "The password you entered is incorrect.",
        type: "error",
        duration: 3000
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    setPassword('')
    setError('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isVerifying) {
      handleVerifyAndLogout()
    }
  }

  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={(e) => setIsOpen(e.open)}
      placement="top"
      motionPreset="slide-in-top"
    >
      <DialogTrigger asChild>
        <Button
          size={size}
          variant={variant}
          colorPalette="red"
          width={fullWidth ? "full" : "auto"}
          bg="white"
          color="gray.700"
          _hover={{ bg: "gray.50" }}
        >
          Log Out
        </Button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop />
        <DialogContent
          mt={4}
          maxW="md"
        >
          <DialogHeader>
            <DialogTitle>Verify Your Identity</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>

          <DialogBody>
            <Field.Root invalid={!!error} required>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
                disabled={isVerifying}
                autoFocus
              />
              {error && <Field.ErrorText>{error}</Field.ErrorText>}
            </Field.Root>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button 
                variant="outline"
                onClick={handleCancel}
                disabled={isVerifying}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              colorPalette="red"
              onClick={handleVerifyAndLogout}
              loading={isVerifying}
              disabled={!password.trim()}
            >
              Confirm Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Portal>
    </DialogRoot>
  )
}

