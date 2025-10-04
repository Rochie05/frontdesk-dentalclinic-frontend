import { Box, Flex, Text, Image } from '@chakra-ui/react'
import LoginForm from '@/components/auth/LoginForm'
import { ColorModeButton } from '@/components/ui/color-mode'

export default function Login() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      position="relative"
      overflow="hidden"
    >
      {/* Left Side - Login Form */}
      <Flex
        flex={1}
        align="center"
        justify="left"
        px={'80'}
        position="relative"
        zIndex={1}
      >
        <Box w="full" maxW="400px">
          <LoginForm />
          
          {/* Footer Text */}
          <Text
            fontSize="xs"
            color="gray.400"
            mt={8}
            textAlign="center"
          >
            If you forgot your password, kindly contact your system admin.
          </Text>
        </Box>
      </Flex>

      {/* Right Side - Background Image */}
      <Box
        position="absolute"
        right={0}        
        w="736px"
        h="956px"
        borderBottomLeftRadius="172px"
        overflow="hidden"
        zIndex={0}
      >
        <Image
          src="/img/login-bg.webp"
          alt="Dental background"
          objectFit="cover"
          objectPosition="center"
          w="full"
          h="full"
        />
      </Box>

      {/* Color Mode Button */}
      <Box
        position="absolute"
        top={4}
        right={4}
        zIndex={10}
      >
        <ColorModeButton />
      </Box>

    </Flex>
  )
}