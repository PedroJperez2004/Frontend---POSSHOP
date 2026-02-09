import React from 'react';
import PaginationControls from '../../../components/PaginationControls';
import { usePagination } from '../../../shared/hooks/usePagination';

export default function CategoryCardsView({
    categories = [],
    loading,
    error,
    onToggleStatus,
    onEdit,
    onDelete,
    handleCopy,
    copiedId
}) {
    // Usamos el hook de paginación igual que en la tabla
    const {
        currentPage,
        setCurrentPage,
        paginatedItems,
        totalPages
    } = usePagination(categories, 10); // 10 por página para que no sea eterno en móvil

    if (error) return (
        <div className="p-4 m-4 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] font-sans text-sm">
            Error: {error}
        </div>
    );

    return (
        <div className="lg:hidden p-4">
            {/* Estado de carga */}
            {loading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC857]"></div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!loading && paginatedItems.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-[#2C2C3E]/40 border border-[#2C2C3E] rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[#FFC857]/30 transition-colors shadow-lg"
                    >
                        {/* Header: Iniciales y Nombre */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#3A3A55] flex items-center justify-center text-[#FFC857] font-black border border-[#FFC857]/20 uppercase">
                                    {cat.name.substring(0, 2)}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[#F5F5F5] font-bold text-sm uppercase truncate">
                                        {cat.name}
                                    </div>
                                    <div className="text-[#A0A0B0] text-[10px] uppercase font-semibold truncate">
                                        Shop ID: {cat.id_shop || 'N/A'}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#1E1E2F] px-2 py-1 rounded-md border border-[#2C2C3E]">
                                <span className={`w-1.5 h-1.5 rounded-full ${cat.active ? 'bg-[#27AE60] shadow-[0_0_8px_#27AE60]' : 'bg-[#A0A0B0]'}`}></span>
                                <span className={`text-[9px] font-black uppercase ${cat.active ? 'text-[#27AE60]' : 'text-[#A0A0B0]'}`}>
                                    {cat.active ? 'Activa' : 'Inactiva'}
                                </span>
                            </div>
                        </div>

                        {/* Cuerpo: ID y Descripción */}
                        <div className="space-y-3 py-3 border-y border-[#2C2C3E]/50">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#A0A0B0]">ID Categoría:</span>
                                <button
                                    onClick={() => handleCopy?.(cat.id)}
                                    className={`font-mono text-[10px] font-bold transition-all hover:scale-105 active:scale-95 ${copiedId === cat.id ? 'text-[#27AE60]' : 'text-[#FFC857]'
                                        }`}
                                >
                                    {copiedId === cat.id ? '¡COPIADO!' : `...${String(cat.id).slice(-8).toUpperCase()}`}
                                </button>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[#A0A0B0] text-[11px]">Descripción:</span>
                                <p className="text-[#F5F5F5]/70 text-[11px] italic leading-relaxed line-clamp-2">
                                    {cat.description || "Sin descripción detallada"}
                                </p>
                            </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex gap-2 pt-1">
                            <button
                                onClick={() => onToggleStatus?.(cat)}
                                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase border transition-all active:scale-95 ${cat.active
                                        ? 'bg-[#E74C3C]/10 border-[#E74C3C]/20 text-[#E74C3C] hover:bg-[#E74C3C]/20'
                                        : 'bg-[#27AE60]/10 border-[#27AE60]/20 text-[#27AE60] hover:bg-[#27AE60]/20'
                                    }`}
                            >
                                {cat.active ? "Desactivar" : "Activar"}
                            </button>

                            <button
                                onClick={() => onEdit?.(cat)}
                                className="flex-1 py-2.5 bg-[#FFC857] hover:bg-[#e6b44e] text-[#1E1E2F] rounded-lg font-black text-[10px] uppercase transition-all active:scale-95"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => onDelete?.(cat)}
                                className="shrink-0 p-2 text-[#A0A0B0] bg-transparent border border-transparent hover:bg-[#E74C3C]/10 hover:border-[#E74C3C]/20 hover:text-[#E74C3C] rounded-lg transition-all active:scale-95 group/del"
                                title="Eliminar"
                            >
                                <svg
                                    className="w-4 h-4 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            {!loading && categories.length > 0 && (
                <div className="mt-8 mb-4 border-t border-[#2C2C3E] pt-6">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {!loading && categories.length === 0 && (
                <div className="text-center py-12 text-[#A0A0B0] font-sans italic text-sm">
                    No se encontraron categorías.
                </div>
            )}
        </div>
    );
}