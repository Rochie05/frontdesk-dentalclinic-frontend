import { Box, HStack, Text, Icon, Badge } from '@chakra-ui/react'
import { AiFillBell } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { ColorModeButton } from '@/components/ui/color-mode'

interface ToastNotification {
  patientName: string
  timeInfo: string
}

interface CashierHeaderProps {
  notification?: ToastNotification
}

export default function CashierHeader({ notification }: CashierHeaderProps) {
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
        <Text as="span" color="gray.700"> / Dashboard</Text>
      </Text>

      {/* Right Section: Notification Toast + Bell Icon + Dark Mode */}
      <HStack gap={6} align="center">
        {/* Toast Notification */}
        {notification && (
          <HStack
            bg="teal.100"
            px={4}
            py={3}
            borderRadius="md"
            shadow="md"
            gap={3}
          >
            <Icon as={BsInfoCircle} boxSize={5} color="gray.700" />
            <HStack gap={1.5}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                {notification.patientName}
              </Text>
              <Text fontSize="sm" fontWeight="normal" color="black">
                {notification.timeInfo}
              </Text>
            </HStack>
          </HStack>
        )}

        {/* Bell Icon for Notifications */}
        <Box position="relative" cursor="pointer">
          <Icon as={AiFillBell} boxSize={9} color="gray.600" />
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
            3
          </Badge>
        </Box>

        {/* Dark Mode Toggle */}
        <ColorModeButton />
      </HStack>
    </HStack>
  )
}
