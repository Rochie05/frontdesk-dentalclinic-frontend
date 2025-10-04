import { Box, HStack, Text, Icon, Badge } from '@chakra-ui/react'
import { AiFillBell } from 'react-icons/ai'
import { ColorModeButton } from '@/components/ui/color-mode'
import { useLocation } from 'react-router-dom'




// Helper function to get page name from path
const getPageName = (pathname: string): string => {
  if (pathname.includes('/dashboard')) return 'Dashboard'
  if (pathname.includes('/appointments-list')) return 'Appointments List'
  if (pathname.includes('/follow-up')) return 'Follow Up Appointments'
  if (pathname.includes('/cancel-requests')) return 'Cancel Requests'
  if (pathname.includes('/payments-list')) return 'Payments List'
  if (pathname.includes('/appointment-refunds')) return 'Appointment Refunds'
  return 'Dashboard'
}

export default function CashierHeader() {
  const location = useLocation()
  const pageName = getPageName(location.pathname)

  return (
    <HStack 
      w="full" 
      justify="space-between" 
      align="center"
      px={6}
      py={4}
    >
      {/* Breadcrumb Navigation */}
      <Text fontSize="md" fontWeight="medium">
        <Text as="span" color="gray.400">Pages </Text>
        <Text as="span" color="gray.700"> / {pageName}</Text>
      </Text>

      {/* Right Section: Notification Toast + Bell Icon + Dark Mode */}
      <HStack gap={6} align="center">
   

        {/* Bell Icon for Notifications */}
        <Box position="relative" cursor="pointer">
          <Icon as={AiFillBell} boxSize={7} color="gray.600" />
          {/* Optional notification badge */}
          <Badge
            position="absolute"
            top={-1}
            right={-1}
            bg="red.500"
            color="white"
            borderRadius="full"
            fontSize="xs"
            px={1.5}
            py={0.5}
          >
            0
          </Badge>
        </Box>

        {/* Dark Mode Toggle */}
        <ColorModeButton />
      </HStack>
    </HStack>
  )
}
