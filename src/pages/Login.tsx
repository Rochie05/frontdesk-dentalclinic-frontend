import { Button } from '@chakra-ui/react'
import { toaster } from '@/components/ui/toaster'
import { useSound } from '@/hooks/useSound'
import { ColorModeButton } from '@/components/ui/color-mode'
import { Tooltip } from '@/components/ui/tooltip'
import LoginForm from '@/components/auth/LoginForm'

export default function Login() {
  const { play: playSuccess } = useSound('/sounds/chime.mp3')

  return (
    <>
      <ColorModeButton/>
      <Tooltip content={"Try mo"} showArrow={true}>
      <Button onClick={() => {
        playSuccess()
        toaster.create({
          title: "Testing Toaster",
          description: "Testing Description",
          duration: 5000,
          type: "success"
        })
      }}>
        Toaster Create Test
      </Button>
      </Tooltip>

      <LoginForm/>
    </>
  )
}