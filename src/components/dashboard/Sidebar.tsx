

import { Box, VStack, HStack, Text, Icon, Card, Button, Input, Field } from '@chakra-ui/react'
import { IoIosPeople } from 'react-icons/io'
import { IoHome, IoCard, IoCalendar, IoClose } from 'react-icons/io5'
import { BiSolidUserCircle } from 'react-icons/bi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { useState } from 'react'
import { toaster } from '@/components/ui/toaster'
import { loginWithSupabase } from '@/apis/authService'

interface MenuItem {
  label: string
  icon: typeof IoHome
  path: string
}

interface MenuSection {
  title?: string
  items: MenuItem[]
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useUser()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  // Define menu items based on user role
  const getDashboardPath = () => {
    return user?.role === 'receptionist' ? '/dashboard/receptionist' : '/dashboard/cashier'
  }

  const getMenuSections = (): MenuSection[] => {
    if (user?.role === 'cashier') {
      return [
        {
          items: [
            {
              label: 'Dashboard',
              icon: IoHome,
              path: getDashboardPath()
            },
            {
              label: 'Payments List',
              icon: IoCard,
              path: '/payments-list'
            },
            {
              label: 'Appointment Refunds',
              icon: IoCard,
              path: '/appointment-refunds'
            }
          ]
        }
      ]
    }

    // Receptionist menu items
    return [
      {
        items: [
          {
            label: 'Dashboard',
            icon: IoHome,
            path: getDashboardPath()
          },
          {
            label: 'Appointments List',
            icon: IoCard,
            path: '/appointments-list'
          },
          {
            label: 'Follow Up Appointments',
            icon: IoCalendar,
            path: '/follow-up'
          },
          {
            label: 'Cancel Requests',
            icon: IoClose,
            path: '/cancel-requests'
          }
        ]
      }
    ]
  }

  const menuSections = getMenuSections()

  const isActive = (path: string) => {
    // For dashboard, check if current path includes 'dashboard'
    if (path.includes('/dashboard')) {
      return location.pathname.includes('/dashboard')
    }
    // For other paths, exact match
    return location.pathname === path
  }

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path)
    navigate(path)
  }

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
      setIsLogoutOpen(false)
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

  const handleCancelLogout = () => {
    setIsLogoutOpen(false)
    setPassword('')
    setError('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isVerifying) {
      handleVerifyAndLogout()
    }
  }

  return (
    <Box
      w="250px"
      h="100vh"
      bg="bg.muted"
      borderRightWidth="1px"
      borderRightColor="border.subtle"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Top Section */}
      <VStack gap={6} align="stretch">
        {/* Logo */}
        <HStack gap={1} justify="center">
          <Icon as={IoIosPeople} boxSize={'6'} color="fg.muted" />
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="fg.subtle"
            letterSpacing="wide"
          >
            {user?.role?.toUpperCase() || 'RECEPTIONIST'}
          </Text>
        </HStack>

        {/* Menu Sections */}
        <VStack gap={6} align="stretch">
          {menuSections.map((section, sectionIndex) => (
            <VStack key={sectionIndex} gap={2} align="stretch">
              {/* Section Title */}
              {section.title && (
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="fg"
                  px={2}
                  mb={1}
                >
                  {section.title}
                </Text>
              )}
              
              {/* Section Items */}
              {section.items.map((item, itemIndex) => {
                const active = isActive(item.path)
                return (
                  <Card.Root
                    key={itemIndex}
                    bg={active ? 'bg.panel' : 'transparent'}
                    shadow={active ? 'sm' : 'none'}
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => handleNavigation(item.path)}
                    _hover={{ bg: active ? 'bg.panel' : 'bg.subtle' }}
                    transition="all 0.2s"
                  >
                    <HStack p={3} gap={3}>
                      <Box
                        bg={active ? 'teal.solid' : 'bg.panel'}
                        p={2}
                        borderRadius="12px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon
                          as={item.icon}
                          boxSize={4}
                          color={active ? 'fg.inverted' : 'fg'}
                        />
                      </Box>
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        color={active ? 'fg' : 'fg.muted'}
                      >
                        {item.label}
                      </Text>
                    </HStack>
                  </Card.Root>
                )
              })}
            </VStack>
          ))}
        </VStack>
      </VStack>

      {/* Bottom Section - User Card */}
      <Card.Root
        bg="teal.solid"
        borderRadius="15px"
        overflow="hidden"
        position="relative"
      >
        <VStack p={4} gap={3} align="stretch">
          {!isLogoutOpen ? (
            <>
              {/* User Icon */}
              <Box
                bg="bg.panel"
                p={2}
                borderRadius="12px"
                w="fit-content"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={BiSolidUserCircle} boxSize={7} color="teal.solid" />
              </Box>

              {/* User Info */}
              <VStack gap={0} align="start">
                <Text fontSize="sm" fontWeight="bold" color="fg.inverted">
                  {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </Text>
                <Text fontSize="xs" color="fg.inverted">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Receptionist'}
                </Text>
              </VStack>

              {/* Logout Button */}
              <Box w="full">
                <Button
                  size="sm"
                  variant="solid"
                  colorPalette="red"
                  width="full"
                  bg="white"
                  color="gray.700"
                  _hover={{ bg: "gray.50" }}
                  onClick={() => setIsLogoutOpen(true)}
                >
                  Log Out
                </Button>
              </Box>
            </>
          ) : (
            <>
              {/* Verify Identity Header */}
              <Text fontSize="sm" fontWeight="bold" color="fg.inverted" textAlign="center">
                Verify Your Identity
              </Text>

              {/* Password Input */}
              <Field.Root invalid={!!error} required>
                <Field.Label color="fg.inverted" fontSize="xs">Password</Field.Label>
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
                  bg="white"
                  size="sm"
                />
                {error && <Field.ErrorText color="red.200">{error}</Field.ErrorText>}
              </Field.Root>

              {/* Action Buttons */}
              <HStack gap={2} w="full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelLogout}
                  disabled={isVerifying}
                  flex={1}
                  bg="white"
                  color="gray.700"
                  borderColor="white"
                  _hover={{ bg: "gray.50" }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  colorPalette="red"
                  onClick={handleVerifyAndLogout}
                  loading={isVerifying}
                  disabled={!password.trim()}
                  flex={1}
                  bg="red.500"
                  color="white"
                  _hover={{ bg: "red.600" }}
                >
                  Logout
                </Button>
              </HStack>
            </>
          )}
        </VStack>
      </Card.Root>
    </Box>
  )
}
