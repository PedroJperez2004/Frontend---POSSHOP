import Sidebar from './Sidebar.jsx'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#12121B] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {/* Eliminamos p-8 y overflow-auto para que Sales.jsx controle su propio espacio */}
        <div className="flex-1 relative">
          <Outlet /> 
        </div>
      </main>
    </div>
  )
}