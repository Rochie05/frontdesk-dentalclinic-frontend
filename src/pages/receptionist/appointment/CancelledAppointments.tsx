import {
  Flex,
  Box,
  VStack,
  Text,
  Badge,
  Button,
  Input,
  Grid,
  GridItem,
  Text as ChakraText,
  HStack,
} from '@chakra-ui/react'
// no react hooks needed
import { useLocation } from 'react-router-dom'
import Sidebar from '@/components/dashboard/Sidebar'
import CashierHeader from '@/components/cashier/CashierHeader'
import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import { useUser } from '@/contexts/UserContext'

export default function CancelledAppointments() {
  const { user } = useUser()
  const isReceptionist = user?.role === 'receptionist'
  const location = useLocation()
  const appt = (location.state ?? {}) as any
  const _parts = (appt.name ?? '').split(' ')
  const firstName = appt.firstName ?? _parts.shift() ?? ''
  const lastName = appt.lastName ?? _parts.join(' ') ?? ''
  const middleName = appt.middleName ?? ''
  const suffix = appt.suffix ?? ''
  const birthday = appt.birthday ?? ''
  const gender = appt.gender ?? ''
  const contactNumber = appt.contactNumber ?? ''
  const address = appt.address ?? ''
  const email = appt.email ?? appt.emailAddress ?? ''
  const emergencyContactName = appt.emergencyContactName ?? ''
  const emergencyRelationship = appt.emergencyRelationship ?? ''
  const emergencyContactNumber = appt.emergencyContactNumber ?? ''
  const appointmentDate = appt.appointmentDate ?? appt.time ?? ''
  const appointmentTime = appt.appointmentTime ?? appt.slot ?? ''
  const doctor = appt.doctor ?? ''
  const services = Array.isArray(appt.services) ? appt.services : (appt.services ? [appt.services] : [])

  // no dropdown on this details page; actions are shown directly

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />

      <Box flex="1" overflow="auto" bg="bg.muted">
        <VStack align="stretch" gap={0} h="full">
          {/* Header */}
          <Box position="sticky" top={0} zIndex={10}>
            {isReceptionist ? <ReceptionistHeader /> : <CashierHeader />}
          </Box>

          <Box p={6} flex="1">
            <VStack align="stretch" gap={4}>
              <Text fontSize="lg" fontWeight="bold">Cancelled Appointment</Text>

              <Flex gap={6}>
                {/* Left Column */}
                <VStack flex="1" bg="white" p={6} borderRadius="md" align="stretch" gap={4} borderWidth="1px" borderColor="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600' }}>
                  <Text fontSize="lg" fontWeight="bold">Patient Information</Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>

                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">First Name</ChakraText>
                      <Input value={firstName} readOnly />
                    </GridItem>
                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Middle Name</ChakraText>
                      <Input value={middleName} readOnly />
                    </GridItem>

                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Last Name</ChakraText>
                      <Input value={lastName} readOnly />
                    </GridItem>
                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Suffix</ChakraText>
                      <Input value={suffix} readOnly />
                    </GridItem>

                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Birthday</ChakraText>
                      <Input value={birthday} readOnly />
                    </GridItem>
                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Gender</ChakraText>
                      <Input value={gender} readOnly />
                    </GridItem>

                    <GridItem colSpan={2}>
                      <Text fontSize="sm" fontWeight="bold" mt={2}>CONTACT INFORMATION AND ADDRESS</Text>
                    </GridItem>

                    <GridItem colSpan={2}>
                      <ChakraText fontSize="sm" fontWeight="semibold">Contact Number</ChakraText>
                      <Input value={contactNumber} readOnly />
                    </GridItem>

                    <GridItem colSpan={2}>
                      <ChakraText fontSize="sm" fontWeight="semibold">Address</ChakraText>
                      <Input value={address} readOnly />
                    </GridItem>

                    <GridItem colSpan={2}>
                      <ChakraText fontSize="sm" fontWeight="semibold">E-Mail</ChakraText>
                      <Input value={email} readOnly />
                    </GridItem>

                    <GridItem colSpan={2}>
                      <Text fontSize="sm" fontWeight="bold" mt={2}>EMERGENCY CONTACT</Text>
                    </GridItem>

                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Emergency Contact Name</ChakraText>
                      <Input value={emergencyContactName} readOnly />
                    </GridItem>
                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Relationship with Patient</ChakraText>
                      <Input value={emergencyRelationship} readOnly />
                    </GridItem>

                    <GridItem colSpan={2}>
                      <ChakraText fontSize="sm" fontWeight="semibold">Contact Number</ChakraText>
                      <Input value={emergencyContactNumber} readOnly />
                    </GridItem>
                  </Grid>
                </VStack>

                {/* Middle Column */}
                <VStack flex="1" bg="white" p={6} borderRadius="md" align="stretch" gap={4} borderWidth="1px" borderColor="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600' }}>
                  <Text fontSize="lg" fontWeight="bold">Appointment Details & Services</Text>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Appointment Date</ChakraText>
                      <Input value={appointmentDate} readOnly />
                    </GridItem>
                    <GridItem>
                      <ChakraText fontSize="sm" fontWeight="semibold">Time</ChakraText>
                      <Input value={appointmentTime} readOnly />
                    </GridItem>

                    <GridItem colSpan={2}>
                      <ChakraText fontSize="sm" fontWeight="semibold">Doctor</ChakraText>
                      <Input value={doctor} readOnly />
                    </GridItem>
                  </Grid>

                  <ChakraText fontSize="sm" fontWeight="bold" mt={2}>SERVICES</ChakraText>

                  {/* Service groups — render checkboxes checked if the service label exists in appt.services */}
                  <VStack align="start" gap={3}>
                    <Box>
                      <ChakraText fontWeight="semibold">Diagnostic and Preventative Services</ChakraText>
                      <VStack align="start" pl={4} gap={1} mt={2}>
                        <HStack>
                          <label>
                            <input type="checkbox" checked={services.includes('Consultation and Examination')} disabled aria-label="Consultation and Examination" />
                          </label>
                          <ChakraText fontSize="sm">Consultation and Examination</ChakraText>
                        </HStack>
                        <HStack>
                          <label>
                            <input type="checkbox" checked={services.includes('Dental cleaning')} disabled aria-label="Dental cleaning" />
                          </label>
                          <ChakraText fontSize="sm">Dental cleaning</ChakraText>
                        </HStack>
                        <HStack>
                          <label>
                            <input type="checkbox" checked={services.includes('Dental x-ray')} disabled aria-label="Dental x-ray" />
                          </label>
                          <ChakraText fontSize="sm">Dental x-ray</ChakraText>
                        </HStack>
                      </VStack>
                    </Box>

                    <Box>
                      <ChakraText fontWeight="semibold">Oral Surgery</ChakraText>
                      <VStack align="start" pl={4} gap={1} mt={2}>
                        <HStack>
                          <label>
                            <input type="checkbox" checked={services.includes('Tooth extraction')} disabled aria-label="Tooth extraction" />
                          </label>
                          <ChakraText fontSize="sm">Tooth extraction</ChakraText>
                        </HStack>
                      </VStack>
                    </Box>

                    <Box>
                      <ChakraText fontWeight="semibold">Restorative Services</ChakraText>
                      <VStack align="start" pl={4} gap={1} mt={2}>
                        <HStack>
                          <label>
                            <input type="checkbox" checked={services.includes('Tooth Filling')} disabled aria-label="Tooth Filling" />
                          </label>
                          <ChakraText fontSize="sm">Tooth Filling</ChakraText>
                        </HStack>
                      </VStack>
                    </Box>
                  </VStack>

                </VStack>

                {/* Right Column: Status & Actions */}
                <Box w={{ base: '100%', md: '360px' }}>
                  <Box bg="white" p={6} borderRadius="md" boxShadow="sm" borderWidth="1px" borderColor="blue.300" _dark={{ bg: 'gray.900', borderColor: 'blue.600', boxShadow: 'none' }}>
                    <VStack align="stretch" gap={4}>
                      <Text fontSize="lg" fontWeight="bold">Appointment Status</Text>
                      <Badge colorScheme="green" px={3} py={1} borderRadius="full" width="fit-content">{appt.status ?? 'Pending'}</Badge>

                      <Box display="flex" justifyContent="center" mt={6}>
                        <Button bg="#dff8f4" color="teal.700" _hover={{ bg: '#d7f6f0' }} width="80%" height="56px" borderRadius="8px">
                          Cancel Appointment
                        </Button>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Flex>
  )
}
