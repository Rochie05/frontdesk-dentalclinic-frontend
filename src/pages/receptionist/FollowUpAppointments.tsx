import { Box, Flex, VStack, Text, HStack, Image, Badge, Input, Button } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import ReceptionistTable from '@/components/receptionist/ReceptionistTable'
import type { Column } from '@/components/receptionist/ReceptionistTable'
import Sidebar from '@/components/dashboard/Sidebar'
import { useUser } from '@/contexts/UserContext'

import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import CashierHeader from '@/components/cashier/CashierHeader'

export default function CancelledAppointments() {
  const { user } = useUser()
  const isReceptionist = user?.role === 'receptionist'

  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest' | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  //some errors but it works perfectly fine, problem with appt for action is just not conected
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  interface Appointment {
    name: string
    email: string
    service: string
    time: string
    doctor: string
    specialty: string
    avatar: string
    status: 'Cancelled'
    action?: string
  }

  const appointments: Appointment[] = [
    { name: 'Esthera Jackson', email: 'esthera@simmmpple.com', service: 'Extraction', time: '14/06/21', doctor: 'Dr. Juan Dela Cruz', specialty: 'Dentist', avatar: '/sample.png', status: 'Cancelled' },
    { name: 'John Doe', email: 'john@example.com', service: 'Tooth Filling', time: '15/06/21', doctor: 'Dr. Maria Santos', specialty: 'Dentist', avatar: '/sample.png', status: 'Cancelled' },
  ]

  const statusColors: Record<string, string> = {
    Cancelled: 'red',
  }

  const columns: Column<Appointment>[] = [
    {
      key: 'name',
      label: 'Patient Name',
      render: (appt) => (
        <HStack>
          <Image src={appt.avatar} boxSize="40px" borderRadius="full" />
          <VStack align="start">
            <Text fontWeight="bold">{appt.name}</Text>
            <Text fontSize="sm" color="gray.400">{appt.email}</Text>
          </VStack>
        </HStack>
      ),
    },
    {
      key: 'doctor',
      label: 'Doctor',
      render: (appt) => (
        <VStack align="start">
          <Text fontWeight="bold">{appt.doctor}</Text>
          <Text fontSize="sm" color="gray.400">{appt.specialty}</Text>
        </VStack>
      ),
    },
    {
      key: 'status',
      label: 'STATUS',
      render: (appt) => (
        <Badge colorScheme={statusColors[appt.status]} px={3} py={1} borderRadius="full">
          {appt.status}
        </Badge>
      ),
    },
    {
      key: 'time',
      label: 'Appointment Date',
      render: (appt) => <Text>{appt.time}</Text>,
    },
    {
      key: 'action',
      label: 'Action',
      render: (appt) => (
        <Text color="blue.500" cursor="pointer" fontWeight="bold">
          View
        </Text>
      ),
    },
  ]

  const filteredAppointments = appointments
    .filter((appt) => {
      return (
        appt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (!sortOrder) return 0
      const [dayA, monthA, yearA] = a.time.split('/').map(Number)
      const [dayB, monthB, yearB] = b.time.split('/').map(Number)
      const dateA = new Date(yearA + 2000, monthA - 1, dayA)
      const dateB = new Date(yearB + 2000, monthB - 1, dayB)
      return sortOrder === 'Newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
    })

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />
      <Box flex="1" overflow="auto" bg="bg.muted">
        <VStack align="stretch" gap={0} h="full">
          <Box position="sticky" top={0} zIndex={10} bg="bg.muted">
            {isReceptionist ? <ReceptionistHeader /> : <CashierHeader />}
          </Box>

          <Box bg="bg.panel" p={6} borderRadius="15px" minH="600px">
            <Box position="sticky" top={0} zIndex={20} bg="bg.panel" mb={4} p={4} borderRadius="md">
              <Flex align="center" justify="space-between">
                <Text fontSize="2xl" fontWeight="bold">Cancelled Appointments</Text>

                <HStack>
                  <Input
                    placeholder="Search..."
                    size="sm"
                    bg="white"
                    borderRadius="md"
                    _placeholder={{ color: 'gray.400' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <Box ref={dropdownRef} position="relative">
                    <Button
                      size="sm"
                      bg="white"
                      color="black"
                      border="1px solid gray"
                      shadow="md"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {sortOrder || 'Sort by Date'} ▼
                    </Button>

                    {dropdownOpen && (
                      <VStack
                        position="absolute"
                        top="100%"
                        right={0}
                        bg="white"
                        border="1px solid #ccc"
                        borderRadius="md"
                        shadow="md"
                        w="150px"
                        mt={1}
                        align="stretch"
                      >
                        {['Newest', 'Oldest'].map((order) => (
                          <Box
                            key={order}
                            px={3}
                            py={2}
                            w="full"
                            cursor="pointer"
                            _hover={{ bg: 'gray.100' }}
                            onClick={() => {
                              setSortOrder(order as 'Newest' | 'Oldest')
                              setDropdownOpen(false)
                            }}
                          >
                            {order}
                          </Box>
                        ))}
                        <Box
                          px={3}
                          py={2}
                          w="full"
                          cursor="pointer"
                          _hover={{ bg: 'gray.100' }}
                          onClick={() => {
                            setSortOrder(null)
                            setDropdownOpen(false)
                          }}
                        >
                          Clear Sort
                        </Box>
                      </VStack>
                    )}
                  </Box>
                </HStack>
              </Flex>
            </Box>

            <ReceptionistTable data={filteredAppointments} columns={columns} />
          </Box>
        </VStack>
      </Box>
    </Flex>
  )
}
