import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Field,
  Checkbox,
} from '@chakra-ui/react'

export default function BillingForm() {
  return (
    <Flex gap="2.5" w="full" h="full">
      {/* Patient Information Card */}
      <Box
        bg="white"
        borderRadius="15px"
        p="4"
        w="591px"
        h="839px"
      >
        <VStack align="stretch" gap="4">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.700"
          >
            Patient Information
          </Text>          {/* First Name & Middle Name */}
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

      {/* Services Card */}
      <Box
        bg="white"
        borderRadius="15px"
        p="4"
        w="591px"
        h="839px"
      >
        <VStack align="stretch" gap="6">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Services
          </Text>

          {/* Diagnostic and Preventative Services */}
          <Box>
            <Text fontSize="sm" fontWeight="normal" color="gray.900" mb="3">
              Diagnostic and Preventative Services
            </Text>

            <VStack align="stretch" gap="3" ml="4">
              {/* Consultation and Examination */}
              <Box>
                <Checkbox.Root size="sm">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" color="gray.900">
                    Consultation and Examination
                  </Checkbox.Label>
                </Checkbox.Root>
                <Text fontSize="xs" color="gray.600" ml="6" mt="1">
                  exam, medical history review, discussion of concerns, and treatment planning.
                </Text>
              </Box>

              {/* Dental cleaning */}
              <Box>
                <Checkbox.Root size="sm" defaultChecked>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" color="gray.900">
                    Dental cleaning
                  </Checkbox.Label>
                </Checkbox.Root>
                <Text fontSize="xs" color="gray.600" ml="6" mt="1">
                  fluoride treatment professional cleaning (prophy), and polish.
                </Text>
              </Box>

              {/* Dental x-ray */}
              <Box>
                <Checkbox.Root size="sm" defaultChecked>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" color="gray.900">
                    Dental x-ray
                  </Checkbox.Label>
                </Checkbox.Root>
                <Text fontSize="xs" color="gray.600" ml="6" mt="1">
                  Images of the crown portions of back teeth to check for decay between teeth.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Oral Surgery */}
          <Box>
            <Text fontSize="sm" fontWeight="normal" color="gray.900" mb="3">
              Oral Surgery
            </Text>
            
            <VStack align="stretch" gap="3" ml="4">
              {/* Tooth extraction */}
              <Box>
                <Checkbox.Root size="sm">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" color="gray.900">
                    Tooth extraction
                  </Checkbox.Label>
                </Checkbox.Root>
                <Text fontSize="xs" color="gray.600" ml="6" mt="1">
                  Removing a visibly intact tooth.
                </Text>
              </Box>
            </VStack>
          </Box>          {/* Restorative Services */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="black" mb="3">
              Restorative Services
            </Text>

            <VStack align="stretch" gap="3" ml="4">
              {/* Tooth Filling */}
              <Box>
                <Checkbox.Root size="sm">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" color="black">
                    Tooth Filling
                  </Checkbox.Label>
                </Checkbox.Root>
                <Text fontSize="xs" color="gray.600" ml="6" mt="1">
                  Tooth-colored filling for front or back teeth.
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Payment Information Card */}
      <Box
        bg="white"
        borderRadius="15px"
        p="4"
        flex="1"
        h="839px"
      >
        <VStack align="stretch" gap="6">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Payment Information
          </Text>

          {/* Payment Method
          <Box>
            <Text fontSize="md" fontWeight="normal" color="gray.900" mb="3">
              Payment Method
            </Text>
            <RadioGroup.Root defaultValue="cash">
              <RadioGroup.Item value="cash">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText fontSize="sm" color="gray.700">
                  Cash
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </Box> */}

          {/* Services Section */}
          <Box>
            <HStack justify="space-between" mb="4">
              <Text fontSize="lg" fontWeight="normal" color="gray.900">
                Services
              </Text>
              <Text fontSize="lg" fontWeight="normal" color="gray.900">
                Amount
              </Text>
            </HStack>

            {/* Service Items */}
            <VStack align="stretch" gap="2">
              {/* Dental Cleaning */}
              <HStack justify="space-between">
                <VStack align="start" gap="0">
                  <Text fontSize="sm" fontWeight="normal" color="gray.900">
                    Dental Cleaning
                  </Text>
                  <Text fontSize="sm" fontWeight="normal" color="gray.900" ml="6">
                    Dental X-Ray(inc)
                  </Text>
                </VStack>
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  500
                </Text>
              </HStack>

              {/* Appointment Fee */}
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="normal" color="gray.900" ml="6">
                  Appointment Fee
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  300
                </Text>
              </HStack>

              {/* Subtotal */}
              <HStack justify="space-between" pt="2">
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  Subtotal
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  800
                </Text>
              </HStack>

              {/* Reservation Fee */}
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="normal" color="gray.900" ml="6">
                  Reservation Fee
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  -150
                </Text>
              </HStack>

              {/* VAT */}
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="normal" color="gray.900" ml="5">
                  VAT (12%)
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  78
                </Text>
              </HStack>

              {/* Total */}
              <HStack justify="space-between" pt="2">
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  Total
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.900">
                  728
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* Cash Input */}
          <HStack justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="normal" color="gray.900">
              Cash
            </Text>
            <Input         
              borderRadius="15px"
              border="1px solid"
              borderColor="gray.200"
              h="35px"
              w="228px"
              textAlign="right"
              fontSize="sm"
              px="3"
            />
          </HStack>

          {/* Change */}
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight="normal" color="gray.900">
              Change
            </Text>
            <Text fontSize="sm" fontWeight="normal" color="gray.900">
              272
            </Text>
          </HStack>

          {/* Process Payment Button */}
          <Flex justify="center" mt="auto" pt="6">
            <Button
              bg="teal.100"
              borderColor="teal.200"
              borderWidth="1px"
              borderRadius="md"
              color="teal.700"
              fontSize="xl"
              fontWeight="normal"
              h="74px"
              w="309px"
              _hover={{ bg: 'teal.200' }}
            >
              Process Payment
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  )
}
