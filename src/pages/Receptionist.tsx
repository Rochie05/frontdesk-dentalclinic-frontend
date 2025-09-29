import Sidebar from '@/components/dashboard/Sidebar'
import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import ReceptionistTable from '@/components/receptionist/ReceptionistTable'

export default function Receptionist() {
  return (<>
    <Sidebar/>
    <ReceptionistHeader/>
    <ReceptionistTable/>
    </>
  )
}
