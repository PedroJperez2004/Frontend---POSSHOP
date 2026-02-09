import Sidebar from './Sidebar.jsx'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="flex h-[100dvh] w-full bg-[#12121B] overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Añadimos px-4 (o px-6) para que el contenido no choque con los bordes,
            y mantenemos el pt-10 para que no esté tan pegado al techo, 
            pero con aire suficiente para la hamburguesa.
        */}
        <div className="flex-1 min-h-0 relative h-full pt-14 px-4 sm:px-6 lg:pt-0 lg:px-0">
          <Outlet /> 
        </div>
      </main>
    </div>
  )
}