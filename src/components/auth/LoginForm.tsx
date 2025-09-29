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

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useUser()
  const navigate = useNavigate()

  // Load saved credentials if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail')
    const savedPassword = localStorage.getItem('savedPassword')
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true'

    if (savedRememberMe && savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
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
      // For demo purposes, we'll use 'receptionist' as default role
      // In a real app, you might want to add role selection
      const success = await login(email, password, 'receptionist')

      if (success) {
        // Save credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem('savedEmail', email)
          localStorage.setItem('savedPassword', password)
          localStorage.setItem('rememberMe', 'true')
        } else {
          // Clear saved credentials
          localStorage.removeItem('savedEmail')
          localStorage.removeItem('savedPassword')
          localStorage.removeItem('rememberMe')
        }

        toaster.create({
          title: "Login Successful",
          description: `Welcome back!`,
          type: "success",
          duration: 3000
        })

        navigate('/dashboard/receptionist')
      } else {
        toaster.create({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          type: "error",
          duration: 3000
        })
      }
    } catch (error) {
      toaster.create({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
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
          Demo: email: "receptionist@clinic.com", password: "receptionist123"
        </Text>
      </Card.Footer>
    </Card.Root>
  )
}
