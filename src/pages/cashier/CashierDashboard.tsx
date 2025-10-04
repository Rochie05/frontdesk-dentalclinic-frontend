import { Box, Flex, VStack, SimpleGrid, Text, HStack } from '@chakra-ui/react'
import { Chart, useChart } from '@chakra-ui/charts'
import { Bar, BarChart, XAxis, CartesianGrid } from 'recharts'
import CashierHeader from '@/components/cashier/CashierHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import PaymentsListTable from '@/components/cashier/PaymentsListTable'
import { FaWallet } from 'react-icons/fa'

export default function Cashier() {
  const chart = useChart({
    data: [
      { income: 15000, day: 'Mon' },
      { income: 12000, day: 'Tue' },
      { income: 8000, day: 'Wed' },
      { income: 14000, day: 'Thu' },
      { income: 22000, day: 'Fri' },
      { income: 18000, day: 'Sat' },
      { income: 20000, day: 'Sun' },
    ],
    series: [{ name: 'income', color: 'white' }],
  })

  return (
    <Flex h="100vh" overflow="hidden" bg="bg">
      <Sidebar />

      <Box flex="1" overflow="none" bg="bg.muted">
        <VStack align="stretch" gap={0} h="full">
          <Box position="sticky" top={0} zIndex={10} >
            <CashierHeader />
          </Box>

          <Box p={6} flex="1">
            <VStack align="stretch" gap={6}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                <Box bg="white" p="4" borderRadius="15px" h="153px">
                  <VStack align="stretch" gap="2">
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      Total Reservation Fee Amount
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" color="green.400" fontWeight="bold">(+5) more</Text> today
                    </Text>
                  </VStack>
                </Box>

                <Box bg="white" p="4" borderRadius="15px" h="153px">
                  <VStack align="stretch" gap="2">
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      Total Refunded Reservation Amount
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" color="green.400" fontWeight="bold">(+5) more</Text> today
                    </Text>
                  </VStack>
                </Box>

                <Box bg="white" p="4" borderRadius="15px" h="153px">
                  <VStack align="stretch" gap="2">
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      Total Bills Today
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" color="green.400" fontWeight="bold">(+5) more</Text> today
                    </Text>
                  </VStack>
                </Box>

                <Box bg="white" p="4" borderRadius="15px" h="153px">
                  <VStack align="stretch" gap="2">
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      Total Appointment Refunds Today
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" color="green.400" fontWeight="bold">(+5) more</Text> today
                    </Text>
                  </VStack>
                </Box>
              </SimpleGrid>

     

              <Flex gap={6} direction={{ base: 'column', xl: 'row' }}>
                <Box bg="white" p={6} borderRadius="15px" flex="0 0 733px" h="640px">
                  <VStack align="stretch" gap="5" h="full">

                    <VStack align="stretch" gap="3">
                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Top Services: <Text as="span" color="teal.500">Dental Cleaning</Text>
                      </Text>

                      <HStack gap="10">
                        <VStack align="flex-start" gap="1">
                          <HStack gap="2">
                            <Box bg="teal.300" w="22px" h="25px" borderRadius="6px" display="flex" alignItems="center" justifyContent="center">
                              <FaWallet color="white" size="11px" />
                            </Box>
                            <Text fontSize="xs" fontWeight="bold" color="gray.600">New Patients</Text>
                          </HStack>
                          <Text fontSize="lg" fontWeight="bold" color="gray.700">27</Text>
                        </VStack>

                        <VStack align="flex-start" gap="1">
                          <HStack gap="2">
                            <Box bg="teal.300" w="22px" h="25px" borderRadius="6px" display="flex" alignItems="center" justifyContent="center">
                              <FaWallet color="white" size="11px" />
                            </Box>
                            <Text fontSize="xs" fontWeight="bold" color="gray.600">Patient Visits</Text>
                          </HStack>
                          <Text fontSize="lg" fontWeight="bold" color="gray.700">102</Text>
                        </VStack>

                        <VStack align="flex-start" gap="1">
                          <HStack gap="2">
                            <Box bg="teal.300" w="22px" h="25px" borderRadius="6px" display="flex" alignItems="center" justifyContent="center">
                              <FaWallet color="white" size="11px" />
                            </Box>
                            <Text fontSize="xs" fontWeight="bold" color="gray.600">Today Income</Text>
                          </HStack>
                          <Text fontSize="lg" fontWeight="bold" color="gray.700">₱27,204</Text>
                        </VStack>
                      </HStack>
                    </VStack>
                    <Box  borderRadius="xl" p="6" flex="1">
                      <Chart.Root height="460px" chart={chart}>
                        <BarChart data={chart.data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                          <XAxis 
                            dataKey={chart.key('day')} 
                            axisLine={true}
                            tickLine={true}
                            tick={{ fill: 'white', fontSize: 12, fontWeight: 'bold' }}
                          />
                          {chart.series.map((item) => (
                            <Bar
                              key={item.name}
                              isAnimationActive={true}
                              dataKey={chart.key(item.name)}
                              fill="teal"
                              radius={[15, 15, 0, 0]}
                              barSize={15}
                            />
                          ))}
                        </BarChart>
                      </Chart.Root>
                    </Box>


                  </VStack>
                </Box>

                <Box bg="white" p={6} borderRadius="15px" flex="1" h="640px">
                  <PaymentsListTable />
                </Box>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Flex>
  )
}
