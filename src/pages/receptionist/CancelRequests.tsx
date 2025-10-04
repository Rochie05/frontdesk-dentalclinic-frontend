import { Box, Flex, VStack, Text } from '@chakra-ui/react'
import Sidebar from '@/components/dashboard/Sidebar'
import { useUser } from '@/contexts/UserContext'

// Import role-specific headers
import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import CashierHeader from '@/components/cashier/CashierHeader'

export default function CancelRequests() {
  const { user } = useUser()
  const isReceptionist = user?.role === 'receptionist'

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Content Area */}
      <Box flex="1" overflow="auto" bg="bg.muted">
        <VStack align="stretch" gap={0} h="full">
          {/* Header - Role specific */}
          <Box position="sticky" top={0} zIndex={10} bg="bg.muted">
            {isReceptionist ? (
              <ReceptionistHeader/>
            ) : (
              <CashierHeader/>
            )}
          </Box>

          {/* Content Area with Padding */}
          <Box p={6} flex="1">
            <VStack align="stretch" gap={6}>
              {/* Placeholder content for Cancel Requests */}
              <Box 
                bg="bg.panel" 
                p={6} 
                borderRadius="15px" 
                minH="600px"
              >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                  Cancel Requests
                </Text>
                <Text color="fg.muted">
                  Table component will be rendered here
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Flex>
  )
}
