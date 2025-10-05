import { Flex, Box, VStack, HStack, Text, Input, Badge, Button } from '@chakra-ui/react'
// removed unused ComponentType import
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '@/components/dashboard/Sidebar'
import CashierHeader from '@/components/cashier/CashierHeader'
import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import { useUser } from '@/contexts/UserContext'

export default function Appointment() {
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
  const contactNumber = appt.contactNumber ?? appt.phone ?? ''
  const address = appt.address ?? ''
  const email = appt.email ?? appt.emailAddress ?? ''
  const emergencyContactName = appt.emergencyContactName ?? ''
  const emergencyRelationship = appt.emergencyRelationship ?? ''
  const emergencyContactNumber = appt.emergencyContactNumber ?? ''
  const appointmentDate = appt.appointmentDate ?? appt.time ?? ''
  const appointmentTime = appt.appointmentTime ?? appt.slot ?? ''
  const doctor = appt.doctor ?? ''
  const services = Array.isArray(appt.services) ? appt.services : (appt.services ? [appt.services] : [])

  // Replace Select with custom dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [appointmentStatus, setAppointmentStatus] = useState<'Pending' | 'Completed' | 'Cancelled'>('Pending')
  // Keep mapping consistent with AppointmentsList
  const statusColorMap: Record<string, string> = { Pending: 'green', Completed: 'gray', Cancelled: 'red' }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            {/* Breadcrumb */}

            {/* Main content */}
            <Flex gap={6}>
            {/* Left Column: Patient Info */}
            <VStack flex="1" bg="white" p={6} borderRadius="md" align="stretch" gap={4} borderWidth="1px" borderColor="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600' }}>
              <Text fontSize="lg" fontWeight="bold">Patient Information</Text>
                  <HStack gap={3}>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">First Name</Text>
                  <Input value={firstName} readOnly />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Middle Name</Text>
                  <Input value={middleName} readOnly />
                </VStack>
              </HStack>

              <HStack gap={3}>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Last Name</Text>
                  <Input value={lastName} readOnly />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Suffix</Text>
                  <Input value={suffix} readOnly />
                </VStack>
              </HStack>

              <HStack gap={3}>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Birthday</Text>
                  <Input value={birthday} readOnly />
                </VStack>
                <VStack align="start" gap={2} flex="1">
                  <Text fontSize="sm">Gender</Text>
                  <Input value={gender} readOnly />
                </VStack>
              </HStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">Contact Number</Text>
                <Input value={contactNumber} readOnly />
              </VStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">Address</Text>
                <Input value={address} readOnly />
              </VStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">E-Mail</Text>
                <Input value={email} readOnly />
              </VStack>

              <Text fontSize="md" fontWeight="bold">Emergency Contact</Text>
              <VStack align="start" gap={2}>
                <Text fontSize="sm">Emergency Contact Name</Text>
                <Input value={emergencyContactName} readOnly />
                <Text fontSize="sm">Relationship with Patient</Text>
                <Input value={emergencyRelationship} readOnly />
                <Text fontSize="sm">Contact Number</Text>
                <Input value={emergencyContactNumber} readOnly />
              </VStack>
            </VStack>

            {/* Middle Column: Appointment Details */}
            <VStack flex="1" bg="white" p={6} borderRadius="md" align="stretch" gap={4} borderWidth="1px" borderColor="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600' }}>
              <Text fontSize="lg" fontWeight="bold">Appointment Details & Services</Text>

              <HStack gap={3} align="start" w="full">
                <VStack align="start" gap={2} flex="2" minW={0}>
                  <Text fontSize="sm">Appointment Date</Text>
                  <Input w="full" value={appointmentDate} readOnly />
                </VStack>
                <VStack align="start" gap={2} flex="1" minW={0}>
                  <Text fontSize="sm">Start Time</Text>
                  <Input w="full" value={appointmentTime} readOnly />
                </VStack>
                <VStack align="start" gap={2} flex="1" minW={0}>
                  <Text fontSize="sm">End Time</Text>
                  <Input w="full" value={appt.endTime ?? ''} readOnly />
                </VStack>
              </HStack>

              <VStack align="start" gap={2}>
                <Text fontSize="sm">Doctor</Text>
                <Input value={doctor} readOnly />
              </VStack>

              <Text fontWeight="bold">SERVICES</Text>

              <Text fontSize="sm" fontWeight="600">Diagnostic and Preventative Services</Text>
              <VStack align="start" gap={3} mt={2}>
                <HStack as="label" align="start" cursor="pointer" gap={3}>
                  <input type="checkbox" aria-label="Consultation and Examination" checked={services.includes('Consultation and Examination')} disabled />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="700">Consultation and Examination</Text>
                    <Text fontSize="sm" color="gray.500">exam, medical history review, discussion of concerns, and treatment planning.</Text>
                  </VStack>
                </HStack>

                <HStack as="label" align="start" cursor="pointer" gap={3}>
                  <input type="checkbox" aria-label="Dental cleaning" checked={services.includes('Dental cleaning')} disabled />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="700">Dental cleaning</Text>
                    <Text fontSize="sm" color="gray.500">fluoride treatment professional cleaning (prophy), and polish.</Text>
                  </VStack>
                </HStack>

                <HStack as="label" align="start" cursor="pointer" gap={3}>
                  <input type="checkbox" aria-label="Dental x-ray" checked={services.includes('Dental x-ray')} disabled />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="700">Dental x-ray</Text>
                    <Text fontSize="sm" color="gray.500">Images of the crown portions of back teeth to check for decay between teeth.</Text>
                  </VStack>
                </HStack>
              </VStack>

              <Text fontSize="md" fontWeight="700" mt={4}>Oral Surgery</Text>
              <VStack align="start" gap={3} mt={2}>
                <HStack as="label" align="start" cursor="pointer" gap={3}>
                  <input type="checkbox" aria-label="Tooth extraction" checked={services.includes('Tooth extraction')} disabled />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="700">Tooth extraction</Text>
                    <Text fontSize="sm" color="gray.500">Removing a visibly intact tooth.</Text>
                  </VStack>
                </HStack>
              </VStack>

              <Text fontSize="md" fontWeight="700" mt={4}>Restorative Services</Text>
              <VStack align="start" gap={3} mt={2}>
                <HStack as="label" align="start" cursor="pointer" gap={3}>
                  <input type="checkbox" aria-label="Tooth Filling" checked={services.includes('Tooth Filling')} disabled />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="700">Tooth Filling</Text>
                    <Text fontSize="sm" color="gray.500">Tooth-colored filling for front or back teeth.</Text>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>

            {/* Right Column: Status & Previous */}
            <Box w={{ base: '100%', md: '320px' }}>
              <VStack align="stretch" gap={6}>
                <Box bg="white" p={6} borderRadius="md" boxShadow="sm" borderWidth="1px" borderColor="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600', boxShadow: 'none' }}>
                  <VStack align="stretch" gap={2}>
                    <Text fontSize="lg" fontWeight="bold">Appointment Status</Text>
                    <Badge colorScheme={statusColorMap[appointmentStatus]} px={3} py={1} borderRadius="full">{appointmentStatus}</Badge>
                    <Box ref={dropdownRef} display="inline-block" position="relative">
                      <Button size="sm" bg="white" color="black" border="1px solid gray" onClick={() => setDropdownOpen(!dropdownOpen)} _dark={{ bg: 'gray.600', color: 'white', borderColor: 'gray.500' }}>
                        {appointmentStatus} ▼
                      </Button>

                      {dropdownOpen && (
                        <VStack
                          position="absolute"
                          top="calc(100% + 6px)"
                          left={0}
                          bg="white"
                          border="1px solid #ccc"
                          borderRadius="md"
                          shadow="md"
                          w="160px"
                          align="stretch"
                          zIndex={30}
                          _dark={{ bg: 'gray.600', borderColor: 'gray.500' }}
                        >
                          {['Pending', 'Completed', 'Cancelled'].map((order) => (
                            <Box
                              key={order}
                              px={3}
                              py={2}
                              w="full"
                              cursor="pointer"
                              _hover={{ bg: 'gray.100' }}
                              _dark={{ _hover: { bg: 'gray.900' } }}
                              onClick={() => {
                                setAppointmentStatus(order as 'Pending' | 'Completed' | 'Cancelled')
                                setDropdownOpen(false)
                              }}
                            >
                              {order}
                            </Box>
                          ))}
                        </VStack>
                      )}
                    </Box>
                  </VStack>
                </Box>

                <Box bg="white" p={6} borderRadius="md" boxShadow="sm" borderWidth="1px" borderColor="gray.50" _dark={{ bg: 'gray.900', borderColor: 'gray.600', boxShadow: 'none' }}>
                  <VStack align="stretch" gap={2}>
                    <Text fontSize="lg" fontWeight="bold">Previous Appointments</Text>
                    <Text fontSize="sm">AppointmentID#00000 - Juan P. Dela Cruz - 05/09/25</Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Box>
        </VStack>
      </Box>
    </Flex>
  )
}
