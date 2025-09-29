import CashierHeader from '@/components/cashier/CashierHeader'
import CashierTable from '@/components/cashier/CashierTable'
import Sidebar from '@/components/dashboard/Sidebar'

export default function Cashier() {
  return (<>
    <Sidebar/>
    <CashierHeader/>
    <CashierTable/>
</>
  )
}
