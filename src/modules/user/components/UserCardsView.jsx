import React from 'react';
import PaginationControls from '../../../components/PaginationControls';

export default function UserCardsView({
    users,
    paginatedItems,
    currentPage,
    totalPages,
    setCurrentPage,
    handleCopy,
    copiedId,
    onToggleStatus,
    onEdit
}) {
    return (
        /* Cambiamos el contenedor a Grid: 1 col en móvil, 2 cols en tablets (md) */
        <div className="lg:hidden p-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedItems.map((user) => (
                    <div 
                        key={user.id} 
                        className="bg-[#2C2C3E]/40 border border-[#2C2C3E] rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[#FFC857]/30 transition-colors shadow-lg"
                    >
                        {/* Header: Avatar, Nombre y Rol */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#3A3A55] flex items-center justify-center text-[#FFC857] font-black border border-[#FFC857]/20 uppercase">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[#F5F5F5] font-bold text-sm uppercase truncate">
                                        {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-[#A0A0B0] text-[10px] uppercase font-semibold truncate">
                                        @{user.userName}
                                    </div>
                                </div>
                            </div>
                            <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                                user.role === 'admin' 
                                ? 'border-[#FFC857]/20 text-[#FFC857] bg-[#FFC857]/5' 
                                : 'border-[#A0A0B0]/20 text-[#A0A0B0]'
                            }`}>
                                {user.role}
                            </span>
                        </div>

                        {/* Cuerpo: ID y Estado */}
                        <div className="space-y-2 py-3 border-y border-[#2C2C3E]/50">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#A0A0B0]">ID Acceso:</span>
                                <button 
                                    onClick={() => handleCopy(user.id)} 
                                    className={`font-mono text-[10px] font-bold transition-all hover:scale-105 active:scale-95 ${
                                        copiedId === user.id ? 'text-[#27AE60]' : 'text-[#FFC857]'
                                    }`}
                                >
                                    {copiedId === user.id ? '¡COPIADO!' : user.id.slice(-8).toUpperCase()}
                                </button>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#A0A0B0]">Estado:</span>
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                        user.active ? 'bg-[#27AE60] shadow-[0_0_8px_#27AE60]' : 'bg-[#A0A0B0]'
                                    }`}></span>
                                    <span className={`font-black uppercase ${
                                        user.active ? 'text-[#27AE60]' : 'text-[#A0A0B0]'
                                    }`}>
                                        {user.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex gap-2 pt-2">
                            {user.email !== "admin@gmail.com" && (
                                <button 
                                    onClick={() => onToggleStatus(user)} 
                                    className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase border transition-all active:scale-95 ${
                                        user.active 
                                        ? 'bg-[#E74C3C]/10 border-[#E74C3C]/20 text-[#E74C3C] hover:bg-[#E74C3C]/20' 
                                        : 'bg-[#27AE60]/10 border-[#27AE60]/20 text-[#27AE60] hover:bg-[#27AE60]/20'
                                    }`}
                                >
                                    {user.active ? "Desactivar" : "Activar"}
                                </button>
                            )}
                            <button 
                                onClick={() => onEdit(user)} 
                                className="flex-1 py-2.5 bg-[#FFC857] hover:bg-[#e6b44e] text-[#1E1E2F] rounded-lg font-black text-[10px] uppercase transition-all active:scale-95 shadow-lg shadow-[#FFC857]/10"
                            >
                                EDITAR
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación: Colocada fuera del grid para que ocupe todo el ancho */}
            {users.length > 0 && (
                <div className="mt-8 mb-4 border-t border-[#2C2C3E] pt-6">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
}