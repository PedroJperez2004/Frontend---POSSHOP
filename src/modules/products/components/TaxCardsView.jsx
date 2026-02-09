import React from 'react';
import PaginationControls from '../../../components/PaginationControls';

export default function TaxCardsView({
    taxes = [],
    paginatedItems = [],
    currentPage,
    totalPages,
    setCurrentPage,
    handleCopy,
    copiedId,
    onToggleStatus,
    onEdit,
    onDelete,
    loading
}) {
    return (
        <div className="lg:hidden p-4 font-sans">
            
            {/* Grid de Tarjetas */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                {paginatedItems.map((tax) => {
                    const idStr = String(tax.id);
                    return (
                        <div 
                            key={tax.id} 
                            className="bg-[#2C2C3E]/40 border border-[#2C2C3E] rounded-xl p-5 flex flex-col gap-4 hover:border-[#FFC857]/30 transition-all shadow-lg relative group"
                        >
                            {/* Badge de Tipo (Superior Derecha) */}
                            <div className="absolute top-4 right-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                                    tax.included_in_price 
                                    ? 'bg-[#3498DB]/10 text-[#3498DB] border-[#3498DB]/20' 
                                    : 'bg-[#A0A0B0]/10 text-[#A0A0B0] border-[#A0A0B0]/20'
                                }`}>
                                    {tax.included_in_price ? 'Incluido' : 'Adicional'}
                                </span>
                            </div>

                            {/* Header: Nombre e ID */}
                            <div className="space-y-1 pr-16">
                                <h3 className="text-[#F5F5F5] font-bold text-sm uppercase truncate tracking-tight">
                                    {tax.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] bg-[#1a1a2e] text-[#A0A0B0] px-2 py-0.5 rounded border border-[#2C2C3E] font-medium uppercase tracking-wider">
                                        ID: {idStr.length > 6 ? idStr.slice(-6) : idStr}
                                    </span>
                                    <button 
                                        onClick={() => handleCopy?.(tax.id)}
                                        className="p-1 hover:text-[#FFC857] transition-colors"
                                    >
                                        {copiedId === tax.id ? (
                                            <span className="text-[9px] text-[#27AE60] font-bold">¡OK!</span>
                                        ) : (
                                            <svg className="w-3 h-3 text-[#A0A0B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Info Principal: Tasa y Estado */}
                            <div className="flex items-end justify-between py-2 border-y border-[#2C2C3E]/50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-tighter">Tasa Aplicada</span>
                                    <span className="text-[#FFC857] text-xl font-black">{tax.percentage}%</span>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <span className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-tighter">Estado</span>
                                    <span className={`text-[10px] font-black uppercase ${tax.is_active ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                                        {tax.is_active ? '● Activo' : '● Inactivo'}
                                    </span>
                                </div>
                            </div>

                            {/* Acciones - Estilo Botones de Producto */}
                            <div className="flex gap-2 pt-1">
                                <button 
                                    onClick={() => onToggleStatus?.(tax)} 
                                    className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase border transition-all active:scale-95 ${
                                        tax.is_active 
                                        ? 'bg-[#E74C3C]/10 border-[#E74C3C]/20 text-[#E74C3C] hover:bg-[#E74C3C] hover:text-white' 
                                        : 'bg-[#27AE60]/10 border-[#27AE60]/20 text-[#27AE60] hover:bg-[#27AE60] hover:text-white'
                                    }`}
                                >
                                    {tax.is_active ? "Desactivar" : "Activar"}
                                </button>
                                
                                <div className="flex gap-1.5">
                                    <button 
                                        onClick={() => onEdit?.(tax)} 
                                        className="p-2.5 bg-[#FFC857] text-[#1E1E2F] rounded-lg transition-all active:scale-95 shadow-lg shadow-[#FFC857]/10"
                                        title="Editar"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </button>
                                    <button 
                                        onClick={() => onDelete?.(tax)} 
                                        className="p-2.5 bg-[#2C2C3E] text-[#A0A0B0] hover:text-[#E74C3C] rounded-lg border border-[#3A3A55] transition-all active:scale-95"
                                        title="Eliminar"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Paginación */}
            {taxes.length > 0 && (
                <div className="mt-8 mb-4 border-t border-[#2C2C3E] pt-6 flex justify-center">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {!loading && taxes.length === 0 && (
                <div className="text-center py-12 text-[#A0A0B0] italic text-sm">
                    No hay impuestos registrados.
                </div>
            )}
        </div>
    );
}