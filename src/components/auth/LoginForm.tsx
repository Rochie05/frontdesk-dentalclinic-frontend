import React, { useState } from 'react'
import {
  Button,
  Input,
  VStack,
  Text,
  Field,
  Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { toaster } from '@/components/ui/toaster'
import { AuthenticationError } from '@/apis/authService'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useUser()
  const navigate = useNavigate()


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
    <Box

      p={8}
      borderRadius="xl"
      boxShadow="sm"
      w="full"
    >
      <VStack gap={8} align="stretch" w="full">
        {/* Title */}
        <VStack gap={2} align="start">
          <Text
            fontSize="32px"
            fontWeight="bold"
            color="teal.300"
            lineHeight="1.3"
          >
            Front Desk Login
          </Text>
          <Text
            fontSize="14px"
            color="gray.400"
            lineHeight="1.4"
          >
            Enter your email and password to sign in
          </Text>
        </VStack>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <VStack gap={6} align="stretch">
            {/* Email Field */}
            <Field.Root>
              <Field.Label fontSize="14px" color="gray.700">
                Email
              </Field.Label>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                h="50px"
                borderRadius="15px"
    
                borderWidth="1px"
      
                _placeholder={{ color: "gray.400" }}
              />
            </Field.Root>

            {/* Password Field */}
            <Field.Root>
              <Field.Label fontSize="14px" color="gray.700">
                Password
              </Field.Label>
              <Input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                h="50px"
                borderRadius="15px"
       
                borderWidth="1px"
 
                _placeholder={{ color: "gray.400" }}
              />
            </Field.Root>

 

            {/* Sign In Button */}
            <Button
              type="submit"
              width="full"
              h="45px"
              color="white"
              borderRadius="12px"
              fontSize="10px"
              fontWeight="bold"
              letterSpacing="wide"
              loading={isLoading}
              loadingText="SIGNING IN..."
 
            >
              SIGN IN
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}
