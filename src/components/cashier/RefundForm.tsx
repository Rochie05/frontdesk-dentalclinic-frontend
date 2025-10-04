import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Field,
  Select,
  Portal,
  createListCollection,
} from '@chakra-ui/react'

const refundReasons = createListCollection({
  items: [
    { label: "Duplicate", value: "duplicate" },
    { label: "Fraudulent", value: "fraudulent" },
    { label: "Requested By Customer", value: "requested_by_client" },
    { label: "Others", value: "others" },
  ],
})

export default function RefundForm() {
  return (
    <Flex gap="2.5" w="full" h="full">
      {/* Patient Information Card */}
      <Box
        bg="white"
        borderRadius="xl"
        p="16px 21px"
        w="591px"
        h="815px"
      >
        <VStack align="stretch" gap="4">
          <Text
       
            fontWeight="bold"
           
       
          >
            Patient Information
          </Text>

          {/* First Name & Middle Name */}
          <HStack gap="4" align="flex-end">
            <Field.Root flex="1">
              <Field.Label fontSize="sm" >
                First Name
              </Field.Label>
              <Input
                value="Juan"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
            <Field.Root flex="1">
              <Field.Label fontSize="sm" >
                Middle Name
              </Field.Label>
              <Input
                value="Pedro"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
             <Field.Root flex="1">
              <Field.Label fontSize="sm" >
                Last Name
              </Field.Label>
              <Input
                value="Dela Cruz"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
            <Field.Root w="24">
              <Field.Label fontSize="sm" >
                Suffix
              </Field.Label>
              <Input
                value="Jr."
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
          </HStack>

 
          {/* Birthday & Gender */}
          <HStack gap="7" align="flex-end">
            <Field.Root>
              <Field.Label fontSize="sm" >
                Birthday
              </Field.Label>
              <Input
                value="May 9, 2005"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
            <Field.Root>
              <Field.Label fontSize="sm" >
                Gender
              </Field.Label>
              <Input
                value="Male"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
          </HStack>

          {/* Contact Information */}
          <VStack align="stretch" mt="2">

            <Field.Root>
              <Field.Label fontSize="sm" >
                Contact Number
              </Field.Label>
              <Input
                value="(63) 9123 456 789"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
          </VStack>

          {/* Address */}
          <Field.Root>
            <Field.Label fontSize="sm" >
              Address
            </Field.Label>
            <Input
              value="123 Mangga St., Project 8, Quezon City, Philippines"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="12"
              px="5"
              fontSize="sm"
              readOnly
            />
          </Field.Root>

          {/* Emergency Contact */}
          <VStack align="stretch" mt="2">
      
            <Field.Root>
              <Field.Label fontSize="sm" >
                Emergency Contact Name:
              </Field.Label>
              <Input
                value="Juanna P. Dela Cruz"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                h="12"
                px="5"
                fontSize="sm"
                readOnly
              />
            </Field.Root>
          </VStack>

          {/* Relationship */}
          <Field.Root>
            <Field.Label fontSize="sm" >
              Relationship with Patient
            </Field.Label>
            <Input
              value="Mother"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="12"
              px="5"
              fontSize="sm"
              readOnly
            />
          </Field.Root>

          {/* Emergency Contact Number */}
          <Field.Root>
            <Field.Label fontSize="sm" >
              Contact Number:
            </Field.Label>
            <Input
              value="(63) 9123 456 789"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="12"
              px="5"
              fontSize="sm"
              readOnly
            />
          </Field.Root>
        </VStack>
      </Box>

      {/* Reasons Card */}
      <Box
        bg="white"
        borderRadius="xl"
        p="16px 21px"
        w="591px"
        h="815px"
      >
        <VStack align="stretch" gap="4">
          <Box>
            <Text fontSize="lg" fontWeight="bold" >
              Reasons
            </Text>
            <Text fontSize="sm"  mt="2">
              Reason for Refund / Cancellation
            </Text>
          </Box>

          {/* Select Reason */}
          <Select.Root collection={refundReasons} mt="4">
            <Select.HiddenSelect />
            <Select.Label>Reason for Refund / Cancellation</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Reason" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {refundReasons.items.map((reason) => (
                    <Select.Item item={reason} key={reason.value}>
                      {reason.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          {/* Notes */}
          <Field.Root mt="8">
            <Field.Label fontSize="sm"  mb="1">
              Notes
            </Field.Label>
            <Textarea
              
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="32"
              p="3.75 5"
              fontSize="sm"
              resize="none"
            />
          </Field.Root>
        </VStack>
      </Box>

      {/* Refund Information Card */}
      <Box
        bg="white"
        borderRadius="xl"
         p="16px 21px"
        flex="1"
        h="815px"
      >
        <VStack align="stretch" gap="6">
          <Text fontSize="lg" fontWeight="bold" >
            Refund Information
          </Text>

          {/* Payment ID */}
          <Field.Root>
            <Field.Label fontSize="sm"  mb="1">
              Payment ID
            </Field.Label>
            <Input
              value="pay_go7TLuyS3TKN7x8F4CGt8Bcc"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="12"
              px="5"
              fontSize="sm"
              readOnly
            />
          </Field.Root>

          {/* Amount */}
          <Field.Root>
            <Field.Label fontSize="sm"  mb="1">
              Amount
            </Field.Label>
            <Input
              value="150"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="12"
              px="5"
              fontSize="sm"
              readOnly
            />
          </Field.Root>

          {/* Total Amount */}
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" >
              Total Amount :
            </Text>
            <Text fontSize="md" fontWeight="bold" >
              Php 150
            </Text>
          </Flex>

          {/* Process Refund Button */}
          <Flex justify="flex-end" mt="auto">
            <Button
              
              
              borderRadius="lg"
              
              fontSize="md"
              fontWeight="bold"
              _hover={{ bg: 'teal.400' }}
            >
              Process Refund
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  )
}
