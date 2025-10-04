import React, { useState, useEffect } from 'react'
import {
  Button,
  Input,
  VStack,
  Text,
  Card,
  Switch,
  HStack,
  Field
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { toaster } from '@/components/ui/toaster'
import { AuthenticationError } from '@/apis/authService'
import { secureStorage, SecureStorageKeys } from '@/utils/secureStorage'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useUser()
  const navigate = useNavigate()

  // Load saved credentials from secure storage if remember me was checked
  useEffect(() => {
    const loadRememberMe = async () => {
      try {
        const savedRememberMe = await secureStorage.getItem(SecureStorageKeys.REMEMBER_ME)
        
        if (savedRememberMe === 'true') {
          const savedEmail = await secureStorage.getItem(SecureStorageKeys.SAVED_EMAIL)
          const savedPassword = await secureStorage.getItem(SecureStorageKeys.SAVED_PASSWORD)
          
          if (savedEmail && savedPassword) {
            setEmail(savedEmail)
            setPassword(savedPassword)
            setRememberMe(true)
          }
        }
      } catch (error) {
        console.error('Error loading remember me data:', error)
      }
    }

    loadRememberMe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toaster.create({
        title: "Validation Error",
        description: "Please enter both email and password",
        type: "error",
        duration: 3000
      })
      return
    }

    setIsLoading(true)

    try {
      // Call the login function
      const loggedInUser = await login(email, password)

      if (loggedInUser) {
        // Save credentials securely if remember me is checked
        if (rememberMe) {
          await secureStorage.setItem(SecureStorageKeys.SAVED_EMAIL, email)
          await secureStorage.setItem(SecureStorageKeys.SAVED_PASSWORD, password)
          await secureStorage.setItem(SecureStorageKeys.REMEMBER_ME, 'true')
        } else {
          // Clear saved credentials from secure storage
          secureStorage.removeItem(SecureStorageKeys.SAVED_EMAIL)
          secureStorage.removeItem(SecureStorageKeys.SAVED_PASSWORD)
          secureStorage.removeItem(SecureStorageKeys.REMEMBER_ME)
        }

        toaster.create({
          title: "Login Successful",
          description: `Welcome back, ${loggedInUser.displayName || loggedInUser.email}!`,
          type: "success",
          duration: 3000
        })

        // Navigate based on user role from the login response
        // Validate role before navigation
        if (!loggedInUser.role) {
          console.error('User role is undefined after login')
          toaster.create({
            title: "Login Error",
            description: "User role is not properly set. Please try again.",
            type: "error",
            duration: 3000
          })
          return
        }
        
        if (loggedInUser.role === 'receptionist') {
          navigate('/dashboard/receptionist')
        } else if (loggedInUser.role === 'cashier') {
          navigate('/dashboard/cashier')
        } else {
          // Fallback to default dashboard
          navigate('/dashboard')
        }
      } else {
        toaster.create({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          type: "error",
          duration: 3000
        })
      }
    } catch (error) {
      let errorMessage = "An error occurred during login. Please try again."
      
      if (error instanceof AuthenticationError) {
        errorMessage = error.message
      }
      
      toaster.create({
        title: "Login Error",
        description: errorMessage,
        type: "error",
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card.Root maxW="400px" mx="auto" mt={8}>
      <Card.Header>
        <Card.Title>Front Desk Login</Card.Title>
        <Card.Description>
          Enter your email and password to sign in
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete={rememberMe ? "email" : "off"}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={rememberMe ? "current-password" : "off"}
              />
            </Field.Root>

            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Remember me</Text>
              <Switch.Root
                checked={rememberMe}
                onCheckedChange={(e) => setRememberMe(e.checked)}
           
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            </HStack>

            <Button
              type="submit"
           
              width="full"
              loading={isLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </VStack>
        </form>
      </Card.Body>

      <Card.Footer>
        <Text fontSize="xs" color="gray.600">
          Demo: Use your Supabase credentials or create an account
        </Text>
      </Card.Footer>
    </Card.Root>
  )
}
