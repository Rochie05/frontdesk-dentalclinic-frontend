import { Box, Flex, VStack, SimpleGrid } from '@chakra-ui/react'
import CashierHeader from '@/components/cashier/CashierHeader'
import CashierTable from '@/components/cashier/CashierTable'
import Sidebar from '@/components/dashboard/Sidebar'

export default function Cashier() {
  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Content Area */}
      <Box flex="1" overflow="auto" bg="bg">
        <VStack align="stretch" gap={0} h="full">
          {/* Header */}
          <Box position="sticky" top={0} zIndex={10} bg="bg">
            <CashierHeader 
              notification={{
                patientName: "Patient Yu, Errol",
                timeInfo: "schedule at 15 mins"
              }}
            />
          </Box>

          {/* Content Area with Padding */}
          <Box p={6} flex="1">
            <VStack align="stretch" gap={6}>
              {/* Stats Cards Row */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                {/* Placeholder for stat cards */}
                <Box bg="bg.panel" p={6} borderRadius="15px" h="153px">
                  {/* Total Appointments Card */}
                </Box>
                <Box bg="bg.panel" p={6} borderRadius="15px" h="153px">
                  {/* Total Appointments Completed Card */}
                </Box>
                <Box bg="bg.panel" p={6} borderRadius="15px" h="153px">
                  {/* Total Appointments For Approval Card */}
                </Box>
                <Box bg="bg.panel" p={6} borderRadius="15px" h="153px">
                  {/* Cancelled Appointments Card */}
                </Box>
              </SimpleGrid>

              {/* Calendar and Appointments Table Row */}
              <Flex gap={6} direction={{ base: 'column', xl: 'row' }}>
                {/* Calendar Section - Left */}
                <Box 
                  bg="bg.panel" 
                  p={6} 
                  borderRadius="15px" 
                  flex="0 0 733px"
                  minH="672px"
                >
                  {/* Calendar Component Placeholder */}
                </Box>

                {/* Appointments Today Section - Right */}
                <Box 
                  bg="bg.panel" 
                  p={6} 
                  borderRadius="15px" 
                  flex="1"
                  minH="672px"
                >
                  <CashierTable />
                </Box>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Flex>
  )
}

