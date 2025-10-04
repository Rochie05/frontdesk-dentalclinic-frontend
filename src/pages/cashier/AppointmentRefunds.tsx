import { Flex, Box, Text } from '@chakra-ui/react'
import Sidebar from '@/components/dashboard/Sidebar'
import CashierHeader from '@/components/cashier/CashierHeader'

export default function AppointmentRefunds() {
  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <Flex direction="column" flex={1} overflow="hidden">
        {/* Header */}
        <Box position="sticky" top={0} zIndex={10} bg="bg.muted">
          <CashierHeader />
        </Box>
        
        {/* Content Area */}
        <Box flex={1} overflow="auto" p={6} bg="bg.muted">
          <Text fontSize="2xl" fontWeight="bold">
            Appointment Refunds
          </Text>
          <Text mt={4} color="fg.muted">
            This page will show the list of appointment refunds.
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
