import { NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton' // Asegúrate que la ruta sea correcta

export default function Sidebar() {
  // 1. Sacamos el texto del localStorage y lo volvemos a convertir en objeto
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // 2. Extraemos el rol (usamos "?" por si el storage está vacío y no rompa)
  const userRole = storedUser?.role;

  const menuItems = [
    { path: '/usuarios', label: 'Usuarios', roles: ['admin'] },
    { path: '/categorias', label: 'Categorias', roles: ['admin'] },
    { path: '/products', label: 'Productos', roles: ['admin'] },
    { path: '/impuestos', label: 'Impuestos', roles: ['admin'] },
    { path: '/ventas', label: 'Ventas', roles: ['admin', 'employee'] },
    { path: '/inventario', label: 'Inventario', roles: ['admin'] },
  ];

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

        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 bg-[#FFC857] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,200,87,0.3)] overflow-hidden">
            {/* Sustituimos el span por la imagen */}
            <img
              src="https://res.cloudinary.com/dyagpb22p/image/upload/v1770209609/posshop_ljwrl8.png" ///Imagen del logo
              alt="Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <h2
            translate="no"
            className="text-xl font-bold text-[#F5F5F5] tracking-tight notranslate"
          >
            POS<span className="text-[#FFC857]">SHOP</span>
          </h2>
        </div>
        <nav className="flex flex-col">
          {menuItems
            .filter(item => item.roles.includes(userRole))
            .map(item => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                {item.label}
              </NavLink>
            ))
          }
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