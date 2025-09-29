import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate('/rdashboard') // or wherever you want to go
  }
  return (<>
    <div>Login</div>
      <Button onClick={handleNavigation}>
      Log In
    </Button>
    </>
  )
}
