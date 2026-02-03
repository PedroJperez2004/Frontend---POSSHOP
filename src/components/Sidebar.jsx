import { NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton' // Asegúrate que la ruta sea correcta

export default function Sidebar() {
  // Clase dinámica para los enlaces
  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium mb-1 ${isActive
      ? 'bg-[#FFC857] text-[#12121B] font-bold shadow-lg shadow-[#FFC857]/20'
      : 'text-[#A0A0B0] hover:bg-[#2C2C3E] hover:text-[#F5F5F5]'
    }`

  return (
    <aside className="w-64 h-screen bg-[#1E1E2F] border-r border-[#2C2C3E] p-6 flex flex-col justify-between">

      {/* SECCIÓN SUPERIOR: Logo y Navegación */}
      <div>
        {/* Logo / Título */}
        {/* <div className="flex items-center gap-3 mb-10 pl-2">
            <div className="w-8 h-8 bg-[#FFC857] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,200,87,0.3)]">
                <span className="text-[#12121B] font-black text-xs">PS</span>
            </div>
            <h2 className="text-xl font-bold text-[#F5F5F5] tracking-tight">POS<span className="text-[#FFC857]">SHOP</span></h2>
        </div> */}

        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 bg-[#FFC857] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,200,87,0.3)] overflow-hidden">
            {/* Sustituimos el span por la imagen */}
            <img
              src="../../posshop.png"
              alt="Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <h2 className="text-xl font-bold text-[#F5F5F5] tracking-tight">
            POS<span className="text-[#FFC857]">SHOP</span>
          </h2>
        </div>
        <nav className="flex flex-col">
          <NavLink to="/usuarios" className={linkClass}>Usuarios</NavLink>
          <NavLink to="/categorias" className={linkClass}>Categorias</NavLink>
          <NavLink to="/products" className={linkClass}>Productos</NavLink>
          <NavLink to="/impuestos" className={linkClass}>Impuestos</NavLink>
          <NavLink to="/ventas" className={linkClass}>Ventas</NavLink>
          <NavLink to="/inventario" className={linkClass}>Inventario</NavLink>

        </nav>
      </div>

      {/* SECCIÓN INFERIOR: Logout y Footer */}
      <div className="pt-6 border-t border-[#2C2C3E] space-y-4">

        {/* Aquí insertamos el LogoutButton */}
        <LogoutButton />

        <div className="text-center">
          <p className="text-[10px] text-[#A0A0B0]/60 uppercase tracking-widest font-semibold">
            POSSHOP v1.0.0
          </p>
        </div>
      </div>

    </aside>
  )
}