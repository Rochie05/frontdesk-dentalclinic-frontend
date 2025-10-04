

import { Box, VStack, HStack, Text, Icon, Card } from '@chakra-ui/react'
import { IoIosPeople } from 'react-icons/io'
import { IoHome, IoCard, IoPerson } from 'react-icons/io5'
import { BiSolidUserCircle } from 'react-icons/bi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import Logout from '../auth/Logout'

interface MenuItem {
  label: string
  icon: typeof IoHome
  path: string
  active?: boolean
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useUser()

  // Define menu items based on user role
  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: IoHome,
      path: user?.role === 'receptionist' ? '/receptionist' : '/cashier',
      active: true
    },
    {
      label: 'Appointments List',
      icon: IoCard,
      path: '/appointments-list',
      active: false
    },
    {
      label: 'Follow Up Appointments',
      icon: IoCard,
      path: '/follow-up',
      active: false
    },
    {
      label: 'Cancel Requests',
      icon: IoCard,
      path: '/cancel-requests',
      active: false
    }
  ]

  const accountMenuItems: MenuItem[] = [
    {
      label: 'System Guide?',
      icon: IoPerson,
      path: '/system-guide',
      active: false
    }
  ]

  const isActive = (path: string) => location.pathname === path

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
          <Icon as={IoIosPeople} boxSize={9} color="fg.muted" />
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="fg.subtle"
            letterSpacing="wide"
          >
            {user?.role?.toUpperCase() || 'RECEPTIONIST'}
          </Text>
        </HStack>

        {/* Menu Items */}
        <VStack gap={0} align="stretch">
          {menuItems.map((item, index) => (
            <Card.Root
              key={index}
              bg={isActive(item.path) ? 'bg.panel' : 'transparent'}
              shadow={isActive(item.path) ? 'sm' : 'none'}
              borderRadius="15px"
              mb={index === 0 ? 4 : 0}
              cursor="pointer"
              onClick={() => navigate(item.path)}
              _hover={{ bg: isActive(item.path) ? 'bg.panel' : 'bg.subtle' }}
              transition="all 0.2s"
            >
              <HStack p={3} gap={3}>
                <Box
                  bg={isActive(item.path) ? 'teal.solid' : 'bg.panel'}
                  p={2}
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    as={item.icon}
                    boxSize={4}
                    color={isActive(item.path) ? 'fg.inverted' : 'fg'}
                  />
                </Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color={isActive(item.path) ? 'fg' : 'fg.muted'}
                >
                  {item.label}
                </Text>
              </HStack>
            </Card.Root>
          ))}

          {/* Account Pages Section */}
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="fg.subtle"
            mt={4}
            mb={2}
            px={4}
          >
            ACCOUNT PAGES
          </Text>

          {accountMenuItems.map((item, index) => (
            <HStack
              key={index}
              p={3}
              gap={3}
              cursor="pointer"
              onClick={() => navigate(item.path)}
              _hover={{ bg: 'bg.subtle' }}
              borderRadius="12px"
              transition="all 0.2s"
            >
              <Box
                bg="bg.panel"
                p={2}
                borderRadius="12px"
                shadow="sm"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={item.icon} boxSize={4} color="fg" />
              </Box>
              <Text fontSize="xs" fontWeight="bold" color="fg.muted">
                {item.label}
              </Text>
            </HStack>
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
            <Logout size="sm" variant="solid" fullWidth={true} />
          </Box>
        </VStack>
      </Card.Root>
    </Box>
  )
}
