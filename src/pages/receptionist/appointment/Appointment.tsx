
import { Flex, Box, VStack, HStack, Text, Input, Badge } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import Sidebar from '@/components/dashboard/Sidebar'
import CashierHeader from '@/components/cashier/CashierHeader'
import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import { useUser } from '@/contexts/UserContext'

export default function Appointment() {
  const { user } = useUser()
  const isReceptionist = user?.role === 'receptionist'

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />

      <Box flex="1" overflow="auto" bg="bg.muted" p={6}>
        <VStack align="stretch" gap={4}>
          {/* Header */}
          <Box position="sticky" top={0} zIndex={10} bg="bg.muted" p={4}>
            {isReceptionist ? <ReceptionistHeader /> : <CashierHeader />}
          </Box>

          {/* Breadcrumb */}
          <Text fontSize="sm" color="gray.500">Pages / Appointments List / AppointmentID#00001</Text>

          {/* Main content */}
          <Flex gap={6}>
            {/* Left Column: Patient Info */}
            <VStack flex="1" bg="white" p={6} borderRadius="md" align="stretch" gap={4}>
              <Text fontSize="lg" fontWeight="bold">Patient Information</Text>
              <HStack gap={3}>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">First Name</Text>
                  <Input value="Juan" />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Middle Name</Text>
                  <Input value="Pedro" />
                </VStack>
              </HStack>

              <HStack gap={3}>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Last Name</Text>
                  <Input value="Dela Cruz" />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Suffix</Text>
                  <Input value="Jr." />
                </VStack>
              </HStack>

              <HStack gap={3}>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Birthday</Text>
                  <Input value="May 9, 2005" />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Gender</Text>
                  <Input value="Male" />
                </VStack>
              </HStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">Contact Number</Text>
                <Input value="(63) 9123 456 789" />
              </VStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">Address</Text>
                <Input value="123 Mangga St., Project 8, Quezon City, Philippines" />
              </VStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">E-Mail</Text>
                <Input value="delacruz.Juan.Pedro@gmail.com" />
              </VStack>

              <Text fontSize="md" fontWeight="bold">Emergency Contact</Text>
              <VStack align="start" gap={2}>
                <Text fontSize="sm">Emergency Contact Name</Text>
                <Input value="Juanna P. Dela Cruz" />
                <Text fontSize="sm">Relationship with Patient</Text>
                <Input value="Mother" />
                <Text fontSize="sm">Contact Number</Text>
                <Input value="(63) 9123 456 789" />
              </VStack>
            </VStack>

            {/* Middle Column: Appointment Details */}
            <VStack flex="1" bg="white" p={6} borderRadius="md" align="stretch" gap={4}>
              <Text fontSize="lg" fontWeight="bold">Appointment Details & Services</Text>

              <HStack gap={3}>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Appointment Date</Text>
                  <Input value="October 25, 2025" />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Start Time</Text>
                  <Input value="9:00 am" />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">End Time</Text>
                  <Input value="10:00 am" />
                </VStack>
              </HStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">Doctor</Text>
                <Input value="Dr. Juan Dela Cruz" />
              </VStack>

              <Text fontWeight="bold">SERVICES</Text>
              <VStack align="start" gap={1}>
                <Checkbox>Consultation and Examination</Checkbox>
                <Checkbox isChecked>Dental cleaning</Checkbox>
                <Checkbox isChecked>Dental x-ray</Checkbox>
                <Checkbox>Tooth extraction</Checkbox>
                <Checkbox>Tooth Filling</Checkbox>
              </VStack>
            </VStack>

            {/* Right Column: Status & Previous */}
            <VStack flex="0.5" bg="white" p={6} borderRadius="md" align="stretch" gap={6}>
              <VStack align="stretch" gap={2}>
                <Text fontSize="lg" fontWeight="bold">Appointment Status</Text>
                <Badge colorScheme="green" px={3} py={1} borderRadius="full">Pending</Badge>
                <Select placeholder="Change Appointment Status">
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </Select>
              </VStack>

              <VStack align="stretch" gap={2}>
                <Text fontSize="lg" fontWeight="bold">Previous Appointments</Text>
                <Text fontSize="sm">AppointmentID#00000 - Juan P. Dela Cruz - 05/09/25</Text>
              </VStack>
            </VStack>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  )
}
