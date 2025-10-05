import { Flex, Box } from '@chakra-ui/react'
import Sidebar from '@/components/dashboard/Sidebar'
import CashierHeader from '@/components/cashier/CashierHeader'
import AppointmentrRefundsTable from '@/components/cashier/AppointmentsRefundsTable'

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
        <AppointmentrRefundsTable/>
        </Box>
      </Flex>
    </Flex>
  )
}
