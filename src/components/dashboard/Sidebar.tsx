
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


export default function Sidebar() {
  const navigate = useNavigate()
  const logout = () => {
    navigate('/')
  }
  return (<>
    <div>Sidebar</div>
    <Button onClick={logout} >Log out</Button>
    
    </>
  )
}
