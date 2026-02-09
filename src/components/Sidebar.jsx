import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userRole = storedUser?.role;

  const menuItems = [
    { path: '/usuarios', label: 'Usuarios', roles: ['admin'] },
    { path: '/categorias', label: 'Categorias', roles: ['admin'] },
    { path: '/products', label: 'Productos', roles: ['admin'] },
    { path: '/impuestos', label: 'Impuestos', roles: ['admin'] },
    { path: '/ventas', label: 'Ventas', roles: ['admin', 'employee'] },
    { path: '/inventario', label: 'Inventario', roles: ['admin'] },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium mb-1 ${isActive
      ? 'bg-[#FFC857] text-[#12121B] font-bold shadow-lg shadow-[#FFC857]/20'
      : 'text-[#A0A0B0] hover:bg-[#2C2C3E] hover:text-[#F5F5F5]'
    }`;

  return (
    <>
      {/* --- BOTÓN ABRIR (Solo visible en móvil cuando el menú está CERRADO) --- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-[#1E1E2F] border border-[#2C2C3E] rounded-lg text-[#FFC857] shadow-lg active:scale-95 transition-transform"
        >
          <Menu size={24} />
        </button>
      )}

      {/* --- OVERLAY (Oscurece el fondo al abrir) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-72 bg-[#1E1E2F] border-r border-[#2C2C3E] p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0 lg:flex
      `}>

        {/* SECCIÓN SUPERIOR */}
        <div>
          {/* Cabecera: Logo + Botón Cerrar */}
          <div className="flex items-center justify-between mb-10 pl-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC857] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,200,87,0.3)] overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dyagpb22p/image/upload/v1770209609/posshop_ljwrl8.png"
                  alt="Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <h2 translate="no" className="text-xl font-bold text-[#F5F5F5] tracking-tight notranslate">
                POS<span className="text-[#FFC857]">SHOP</span>
              </h2>
            </div>

            {/* Botón X: Solo visible en móvil dentro del sidebar */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-[#A0A0B0] hover:text-[#FFC857] transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col">
            {menuItems
              .filter(item => item.roles.includes(userRole))
              .map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))
            }
          </nav>
        </div>

        {/* SECCIÓN INFERIOR */}
        <div className="pt-6 border-t border-[#2C2C3E] space-y-4">
          <div className="px-2 mb-2 bg-[#2C2C3E]/30 p-3 rounded-xl border border-[#2C2C3E] group transition-all hover:bg-[#2C2C3E]/50">
            <div className="flex justify-between items-start mb-1">
              <p className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-wider">Sesión activa</p>
              <span className="text-[9px] bg-[#FFC857] text-[#12121B] px-1.5 py-0.5 rounded font-black uppercase shadow-sm">
                {userRole}
              </span>
            </div>

            {/* Cambio aquí: Usamos userName en lugar de name */}
            <p className="text-sm text-[#F5F5F5] font-bold truncate tracking-tight">
              @{storedUser?.userName || 'usuario_anonimo'}
            </p>

            {/* Opcional: Si quieres mostrar el nombre real abajo en pequeño */}
            {storedUser?.name && (
              <p className="text-[10px] text-[#A0A0B0] truncate italic mt-0.5">
                {storedUser.name}
              </p>
            )}
          </div>

          <LogoutButton />

          <div className="text-center">
            <p className="text-[10px] text-[#A0A0B0]/40 uppercase tracking-widest font-semibold">
              POSSHOP v1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}