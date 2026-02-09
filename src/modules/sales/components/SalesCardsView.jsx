import React from 'react';
import PaginationControls from '../../../components/PaginationControls';

export default function SalesCardsView({
    sales = [],
    paginatedItems = [],
    currentPage,
    totalPages,
    setCurrentPage,
    handleCopy,
    copiedId,
    onViewDetails,
    onReverse,
    loading
}) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('es-ES', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="lg:hidden p-4 font-sans">
            
            {/* Grid de Tarjetas */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                {paginatedItems.map((sale) => {
                    const idStr = String(sale.id);
                    const isCompleted = sale.status === 'completed';
                    // Convertimos a String para evitar el error del .slice()
                    const revIdStr = sale.reverse_sale_id ? String(sale.reverse_sale_id) : null;

                    return (
                        <div 
                            key={sale.id} 
                            className="bg-[#2C2C3E]/40 border border-[#2C2C3E] rounded-xl p-5 flex flex-col gap-4 hover:border-[#FFC857]/30 transition-all shadow-lg relative group"
                        >
                            {/* Badge de Método de Pago */}
                            <div className="absolute top-4 right-4">
                                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase border bg-[#12121B] text-white border-[#2C2C3E]">
                                    {sale.payment_method === 'cash' ? '💵 Efectivo' : sale.payment_method === 'card' ? '💳 Tarjeta' : '🏦 Transf.'}
                                </span>
                            </div>

                            {/* Header: ID Venta y Fecha */}
                            <div className="space-y-1 pr-16">
                                <h3 className="text-[#F5F5F5] font-bold text-sm uppercase truncate tracking-tight">
                                    VENTA #{idStr.length > 8 ? idStr.slice(-8) : idStr}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] bg-[#1a1a2e] text-[#A0A0B0] px-2 py-0.5 rounded border border-[#2C2C3E] font-medium uppercase tracking-wider">
                                        {formatDate(sale.createdAt)}
                                    </span>
                                    <button 
                                        onClick={() => handleCopy?.(idStr)}
                                        className="p-1 hover:text-[#FFC857] transition-colors"
                                    >
                                        {copiedId === idStr ? (
                                            <span className="text-[9px] text-[#27AE60] font-bold">¡OK!</span>
                                        ) : (
                                            <svg className="w-3 h-3 text-[#A0A0B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Info Principal: Monto y Estado */}
                            <div className="flex items-end justify-between py-2 border-y border-[#2C2C3E]/50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-tighter">Monto Total</span>
                                    <span className="text-[#FFC857] text-xl font-black">${Number(sale.total).toLocaleString()}</span>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <span className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-tighter">Estado</span>
                                    <span className={`text-[10px] font-black uppercase ${isCompleted ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                                        {isCompleted ? '● Completada' : '● Reversada'}
                                    </span>
                                </div>
                            </div>

                            {/* Info Adicional */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-[#A0A0B0] font-bold uppercase">Empleado</span>
                                    <span className="text-[10px] text-white truncate opacity-80">ID: {sale.user_id}</span>
                                </div>
                                {revIdStr && (
                                    <div className="flex flex-col text-right">
                                        <span className="text-[9px] text-[#E74C3C] font-bold uppercase">ID Reversión</span>
                                        <span className="text-[10px] text-[#E74C3C]/80 truncate">#{revIdStr.length > 6 ? revIdStr.slice(-6) : revIdStr}</span>
                                    </div>
                                )}
                            </div>

                            {/* Acciones */}
                            <div className="flex gap-2 pt-1">
                                <button 
                                    onClick={() => onViewDetails?.(sale)} 
                                    className="flex-1 py-2 rounded-lg text-[10px] font-black uppercase border transition-all active:scale-95 bg-[#FFC857]/10 border-[#FFC857]/20 text-[#FFC857] hover:bg-[#FFC857] hover:text-[#1E1E2F]"
                                >
                                    Ver Detalles
                                </button>
                                
                                {isCompleted && (
                                    <button 
                                        onClick={() => onReverse?.(sale.id)} 
                                        className="p-2.5 bg-[#2C2C3E] text-[#A0A0B0] hover:text-[#E74C3C] rounded-lg border border-[#3A3A55] transition-all active:scale-95"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Paginación */}
            {sales.length > 0 && (
                <div className="mt-8 mb-4 border-t border-[#2C2C3E] pt-6 flex justify-center">
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