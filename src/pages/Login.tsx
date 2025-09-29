import { Box, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { toaster } from '@/components/ui/toaster'
import { useSound } from '@/hooks/useSound'
import { ColorModeButton } from '@/components/ui/color-mode'
import { Tooltip } from '@/components/ui/tooltip'

export default function Login() {
  const navigate = useNavigate()
  const { play: playSuccess } = useSound('/sounds/chime.mp3')

  
  const handleNavigation = () => {
    navigate('/rdashboard')
  }

  return (
    <>
   
    <Box color={'teal.100'} height={'28'} bgColor={'teal.400'}/>
      <ColorModeButton/>
      <div>Login</div>
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
      <Button onClick={handleNavigation}>
        Log In
      </Button>
    </>
  )
}