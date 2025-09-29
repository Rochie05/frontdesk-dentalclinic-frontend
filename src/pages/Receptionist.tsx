import Sidebar from '@/components/dashboard/Sidebar'
import ReceptionistHeader from '@/components/receptionist/ReceptionistHeader'
import ReceptionistTable from '@/components/receptionist/ReceptionistTable'
import React from 'react'

export default function Receptionist() {
  return (<>
    <Sidebar/>
    <ReceptionistHeader/>
    <ReceptionistTable/>
    </>
  )
}
