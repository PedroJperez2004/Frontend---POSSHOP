import React from 'react';
import PaginationControls from '../../../components/PaginationControls';

export default function InventoryCardsView({
    paginatedItems,
    currentPage,
    totalPages,
    setCurrentPage,
    handleCopy,
    copiedId,
    loading,
    formatDate
}) {
    return (
        <div className="lg:hidden p-4 font-sans">
            {/* Grid de Tarjetas */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                {paginatedItems.map((mov, index) => {
                    const isEntry = mov.type === 'in';
                    const globalIndex = ((currentPage - 1) * 12) + index + 1;

                    return (
                        <div
                            key={mov.id}
                            className="bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl p-5 flex flex-col gap-4 hover:border-[#FFC857]/40 transition-all shadow-xl relative overflow-hidden group"
                        >
                            {/* Badge de Tipo Flotante */}
                            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-[10px] font-black uppercase tracking-widest shadow-md ${
                                isEntry 
                                    ? 'bg-[#27AE60] text-white' 
                                    : 'bg-[#E74C3C] text-white'
                            }`}>
                                {isEntry ? '↑ Entrada' : '↓ Salida'}
                            </div>

                            {/* Header: Índice y Cantidad Resaltada */}
                            <div className="flex justify-between items-end mt-2">
                                <div className="flex flex-col">
                                    <span className="text-[#FFC857] text-[10px] font-black uppercase tracking-tighter">Movimiento</span>
                                    <span className="text-[#A0A0B0] text-xs font-mono font-bold">#{globalIndex}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[#A0A0B0] text-[9px] font-bold uppercase block mb-1">Cantidad</span>
                                    <div className={`text-2xl font-black leading-none ${isEntry ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                                        {isEntry ? '+' : '-'}{mov.quantity}
                                    </div>
                                </div>
                            </div>

                            {/* IDs Copiables con mejor contraste */}
                            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#2C2C3E]/50">
                                <div className="space-y-1">
                                    <span className="text-[#A0A0B0] text-[9px] font-black uppercase tracking-widest block opacity-70">ID Registro</span>
                                    <button
                                        onClick={() => handleCopy(mov.id)}
                                        className={`w-full text-left font-mono text-[10px] p-1.5 rounded bg-[#12121B] border border-[#2C2C3E] transition-all truncate ${
                                            copiedId === mov.id ? 'text-[#27AE60] border-[#27AE60]/50' : 'text-[#F5F5F5] hover:border-[#FFC857]/50'
                                        }`}
                                    >
                                        {copiedId === mov.id ? '¡COPIADO!' : mov.id.toString().slice(-8).toUpperCase()}
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[#A0A0B0] text-[9px] font-black uppercase tracking-widest block opacity-70">ID Producto</span>
                                    <button
                                        onClick={() => handleCopy(mov.product_id)}
                                        className={`w-full text-left font-mono text-[10px] p-1.5 rounded bg-[#12121B] border border-[#2C2C3E] transition-all truncate ${
                                            copiedId === mov.product_id ? 'text-[#FFC857] border-[#FFC857]/50' : 'text-[#F5F5F5] hover:border-[#FFC857]/50'
                                        }`}
                                    >
                                        {copiedId === mov.product_id ? '¡COPIADO!' : `PROD-${mov.product_id.toString().slice(-6).toUpperCase()}`}
                                    </button>
                                </div>
                            </div>

                            {/* Detalles de Fecha y Nota */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[11px] bg-[#2C2C3E]/20 p-2 rounded-lg">
                                    <span className="text-[#A0A0B0] font-bold uppercase tracking-tight">Fecha del proceso:</span>
                                    <span className="text-[#F5F5F5] font-black">{formatDate(mov.createdAt)}</span>
                                </div>

                                <div className="relative group/note">
                                    <span className="text-[#FFC857] text-[9px] font-black uppercase tracking-tighter block mb-1 ml-1">Observaciones</span>
                                    <div className="bg-[#12121B] rounded-xl p-3 border border-[#2C2C3E] min-h-[60px]">
                                        <p className="text-[#A0A0B0] text-xs italic leading-relaxed">
                                            {mov.note || "Sin descripción adicional..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Paginación */}
            {paginatedItems.length > 0 && (
                <div className="mt-8 mb-6 border-t border-[#2C2C3E] pt-6 flex justify-center">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {/* Empty State Mejorado */}
            {!loading && paginatedItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                    <div className="w-16 h-16 bg-[#2C2C3E]/50 rounded-full flex items-center justify-center mb-4 border border-[#2C2C3E]">
                        <svg className="w-8 h-8 text-[#A0A0B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-[#A0A0B0] font-medium text-sm italic max-w-[200px]">
                        No encontramos movimientos que coincidan con tu búsqueda.
                    </p>
                </div>
            )}
        </div>
    );
}