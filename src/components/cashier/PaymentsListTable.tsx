import { Box, Table, Avatar, Badge, Text, Button, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function PaymentsListTable() {
  const navigate = useNavigate()
  
  // Sample data - single record
  const payment = {
    id: 1,
    patientName: "Esthera Jackson",
    patientEmail: "esthera@simmmple.com",
    doctorName: "Dr. Juan Dela Cruz",
    doctorRole: "Dentist",
    appointmentDate: "14/06/21",
    status: "Pending",
    avatarBg: "teal.300"
  }

  const handleViewPayment = (paymentId: number) => {
    // Navigate to payment detail page with the payment ID
    navigate(`/payments-list/${paymentId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "green.400"
      case "completed":
        return "gray.300"
      case "cancelled":
        return "gray.300"
      default:
        return "gray.300"
    }
  }

  return (
    <Box
      bg="white"
      borderRadius="15px"
      boxShadow="0px 3.5px 5.5px 0px rgba(0,0,0,0.02)"
      p="6"
      w="full"
    >
      {/* Title */}
      <Text
        fontSize="lg"
        fontWeight="bold"
        color="gray.700"
        mb="6"
      >
        Payments List
      </Text>

      {/* Table */}
      <Table.Root size="sm" variant="line">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">
              Patient Name
            </Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">
              Doctor
            </Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">
              Appointment Date
            </Table.ColumnHeader>
            <Table.ColumnHeader />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {/* Patient Name */}
            <Table.Cell py="4">
              <Flex alignItems="center" gap="3">
                <Avatar.Root
                  size="md"
                  bg={payment.avatarBg}
                  borderRadius="12px"
                  shape="rounded"
                >
                  <Avatar.Fallback />
                </Avatar.Root>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">
                    {payment.patientName}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {payment.patientEmail}
                  </Text>
                </Box>
              </Flex>
            </Table.Cell>

            {/* Doctor */}
            <Table.Cell py="4">
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  {payment.doctorName}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {payment.doctorRole}
                </Text>
              </Box>
            </Table.Cell>

            {/* Status */}
            <Table.Cell py="4">
              <Badge
                bg={getStatusColor(payment.status)}
                color="white"
                fontSize="sm"
                fontWeight="bold"
                px="3"
                py="1"
                borderRadius="8px"
              >
                {payment.status}
              </Badge>
            </Table.Cell>

            {/* Appointment Date */}
            <Table.Cell py="4">
              <Text fontSize="sm" fontWeight="bold" color="gray.700" textAlign="center">
                {payment.appointmentDate}
              </Text>
            </Table.Cell>

            {/* Action */}
            <Table.Cell py="4">
              <Button
                variant="ghost"
                size="sm"
                color="gray.500"
                fontWeight="bold"
                fontSize="xs"
                onClick={() => handleViewPayment(payment.id)}
                cursor="pointer"
              >
                View
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
