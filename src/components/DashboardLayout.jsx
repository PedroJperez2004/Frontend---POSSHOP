import Sidebar from './Sidebar.jsx'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="flex h-[100dvh] w-full bg-[#12121B] overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Reducimos pt-16 a pt-10 (40px) para que el contenido suba un poco 
            y no se vea tan separado del borde superior o del botón.
        */}
        <div className="flex-1 min-h-0 relative h-full pt-10 lg:pt-0">
          <Outlet /> 
        </div>
      </main>
    </div>
  )
}