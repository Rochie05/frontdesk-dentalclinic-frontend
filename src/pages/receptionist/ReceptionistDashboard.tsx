import { Box, Flex, VStack, HStack, SimpleGrid, Text} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import Sidebar from '@/components/dashboard/Sidebar'
import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import ReceptionistTable from '@/components/receptionist/ReceptionistTable'
import type { Column } from '@/components/receptionist/ReceptionistTable'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale' // ✅ fixed import
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Locales setup for react-big-calendar
const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Example events
const events = [
  {
    title: 'Dental Check-up',
    start: new Date(),
    end: new Date(),
  },
]

interface Appointment {
  name: string;
  email: string;
  service: string;
  time: string;
  doctor: string;
  specialty: string;
  avatar: string;
}

const appointments: Appointment[] = [
  {
    name: 'Esthera Jackson',
    email: 'esthera@simmmpple.com',
    service: 'Extraction',
    time: '14/06/21',
    doctor: 'Dr. Juan Dela Cruz',
    specialty: 'Dentist',
    avatar: '/sample.png',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    service: 'Tooth Filling',
    time: '15/06/21',
    doctor: 'Dr. Maria Santos',
    specialty: 'Dentist',
    avatar: '/sample.png',
  },
];

const columns: Column<Appointment>[] = [
  {
    key: 'name',
    label: 'Patient Name',
    render: (appt: Appointment) => (
      <HStack>
        <Image src={appt.avatar} boxSize="40px" as="img" borderRadius="full"/>
        <VStack align="start" as="div">
          <Text fontWeight="bold">{appt.name}</Text>
          <Text fontSize="sm" color="gray.500">{appt.email}</Text>
        </VStack>
      </HStack>
    ),
  },
  {
    key: 'service',
    label: 'Service',
    render: (appt: Appointment) => <Text fontWeight="bold">{appt.service}</Text>,
  },
  { key: 'time', label: 'Time' },
  {
    key: 'doctor',
    label: 'Doctor',
    render: (appt: Appointment) => (
      <VStack align="start" as="div">
        <Text fontWeight="bold">{appt.doctor}</Text>
        <Text fontSize="sm" color="gray.500">{appt.specialty}</Text>
      </VStack>
    ),
  },
];

function GreenCheckCircle({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#38A169" />
      <path
        d="M16.5 9L10.75 14.75L7.5 11.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function Receptionist() {
  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Content Area */}
      <Box flex="1" overflow="auto" bg="bg.muted">
        <VStack align="stretch" gap={0} h="full">
          {/* Header */}
          <Box position="sticky" top={0} zIndex={10}>
            <ReceptionistHeader />
          </Box>

          {/* Content Area */}
          <Box p={6 } flex="1">
            <VStack align="stretch" gap={6}>
              {/* Stats Cards */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                <Box bg="bg" p="16px 16px" flex-direction="column" align-items="flex-start" borderRadius="15px" h="153px" width="300px">
                  <Text color="#2D3748" fontWeight="700" fontSize="16px" lineHeight="140%" fontFamily="Inter" >Total Appointments</Text>
                  
                  <Flex align-center gap="1">
                  <Text color="#48bb78" mt="5px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="700" lineHeight="140%">(+5)more</Text>
                  <Text color="#A0AEC0" mt="4px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="400">today</Text>
                  </Flex>
                </Box>
                <Box bg="bg" p="16px 16px" flex-direction="column" align-items="flex-start" borderRadius="15px" h="153px" width="300px">
                  <Text color="#2D3748" fontWeight="700" fontSize="16px" lineHeight="140%" fontFamily="Inter" >Total Appointments Completed</Text>
                  
                  <Flex align-center gap="1">
                  <Text color="#48bb78" mt="5px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="700" lineHeight="140%">(+5)more</Text>
                  <Text color="#A0AEC0" mt="4px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="400">today</Text>
                  </Flex>
                </Box>
                <Box bg="bg" p="16px 16px" flex-direction="column" align-items="flex-start" borderRadius="15px" h="153px" width="300px">
                  <Text color="#2D3748" fontWeight="700" fontSize="16px" lineHeight="140%" fontFamily="Inter" >Total Appointments For Approval</Text>
                  
                  <Flex align-center gap="1">
                  <Text color="#48bb78" mt="5px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="700" lineHeight="140%">(+5)more</Text>
                  <Text color="#A0AEC0" mt="4px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="400">today</Text>
                  </Flex>
                </Box>
                <Box bg="bg" p="16px 16px" flex-direction="column" align-items="flex-start" borderRadius="15px" h="153px" width="300px">
                  <Text color="#2D3748" fontWeight="700" fontSize="16px" lineHeight="140%" fontFamily="Inter" >Cancelled Appointments</Text>
                  
                  <Flex align-center gap="1">
                  <Text color="#48bb78" mt="5px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="700" lineHeight="140%">(+5)more</Text>
                  <Text color="#A0AEC0" mt="4px" fontFamily="Inter" fontSize="12" fontStyle="normal" fontWeight="400">today</Text>
                  </Flex>
                </Box>
              </SimpleGrid>

              {/* Calendar + Table */}
              <Flex gap={6} direction={{ base: 'column', xl: 'row' }}>
                {/* Calendar */}
                <Box
                  bg="bg"
                  p={6}
                  borderRadius="15px"
                  flex="1 1 50%"
                  minH={{ base: '400px', xl: '600px' }}
                >
                  <Text mb={5} fontWeight="bold">Calendar</Text>

                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '90%' }}
                  />
                </Box>

                {/* Appointments Table */}
                <Box
                  bg="bg"
                 p={6}
                  borderRadius="15px"
                  flex={{ base: '1 1 100%', xl: '1 1 65%' }} // same as above
                  minH={{ base: '400px', xl: '600px' }}
                >
                  <Text fontSize="lg" fontFamily="Inter" fontWeight="bold">Appointments Today</Text>

{/* Green Checkmark on top */}
                  <HStack mb={2} ml={0}>
                    <GreenCheckCircle size={20} />
                    <Text fontSize="sm" fontFamily="Inter" fontWeight="700" color="gray.400">30 done</Text>
                    <Text fontSize="sm" fontFamily="Inter" fontWeight="400" color="gray.400">this month</Text>
                  </HStack>

                  <ReceptionistTable data={appointments} columns={columns}/>
                </Box>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Flex>
  )
}
