import React, { useState, useMemo } from 'react';
import { usePagination } from '../../../shared/hooks/usePagination';
import PaginationControls from '../../../components/PaginationControls';

const SalesHistory = ({ sales = [], loading, error, onViewDetails, onReverse, handleCopy, copiedId }) => {
    const [sortOrder, setSortOrder] = useState('desc');

    // Lógica de ordenamiento por ID
    const sortedSales = useMemo(() => {
        return [...sales].sort((a, b) => {
            return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
        });
    }, [sales, sortOrder]);

    // Paginación usando la lista ya ordenada
    const { 
        currentPage, 
        setCurrentPage, 
        paginatedItems, 
        totalPages 
    } = usePagination(sortedSales, 12);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('es-ES', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (error) return (
        <div className="p-4 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] font-sans text-sm">
            Error: {error}
        </div>
    );

    const CopyableId = ({ value, prefix = "", color = "text-[#A0A0B0]" }) => {
        if (!value) return <span className="text-[#A0A0B0] font-normal opacity-10 italic text-[10px]">--</span>;
        const valStr = String(value);
        const displayStr = valStr.length > 12 ? `...${valStr.slice(-8)}` : valStr;

        return (
            <div className="relative flex items-center group/id w-fit">
                <div className={`text-[10px] bg-[#1a1a2e] ${color} px-2 py-1 rounded border border-[#2C2C3E] font-medium tracking-wider cursor-default uppercase`}>
                    <span className="opacity-40">{prefix}</span>{displayStr}
                </div>
                <button 
                    onClick={() => handleCopy?.(valStr)}
                    className="ml-2 p-1.5 rounded-md bg-[#FFC857] text-[#1E1E2F] opacity-0 group-hover/id:opacity-100 transition-all hover:scale-110 shadow-lg"
                >
                    {copiedId === valStr ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>
        );
    };

    return (
        <div className="w-full relative font-sans h-full flex flex-col">
            
            {/* Header con Ordenamiento */}
            <div className="mb-4 flex justify-between items-center px-2">
                <h3 className="text-[#FFC857] text-[10px] font-black tracking-widest uppercase italic">Movimientos Recientes</h3>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-tight">Ordenar por ID:</span>
                    <button
                        onClick={() => {
                            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                            setCurrentPage(1);
                        }}
                        className="bg-[#2C2C3E] hover:bg-[#FFC857] hover:text-[#1E1E2F] px-3 py-1.5 rounded-lg text-[10px] font-black border border-[#3E3E52] transition-all flex items-center gap-2"
                    >
                        {sortOrder === 'desc' ? (
                            <>MÁS RECIENTES <span className="text-xs">↓</span></>
                        ) : (
                            <>MÁS ANTIGUOS <span className="text-xs">↑</span></>
                        )}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#12121B]/40 backdrop-blur-[1px] rounded-xl transition-all">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC857]"></div>
                </div>
            )}

            <div className="bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl shadow-xl overflow-hidden flex flex-col flex-1">
                <div className="overflow-x-auto custom-scrollbar flex-1">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-[#2C2C3E] text-[#F5F5F5] uppercase text-[9px] md:text-[10px] tracking-widest font-bold">
                                <th className="px-6 py-4 text-[#FFC857] w-[60px]">#</th>
                                <th className="px-6 py-4 text-[#FFC857]">ID Venta</th>
                                <th className="px-6 py-4">Comprobante</th>
                                <th className="px-6 py-4">Empleado</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                                <th className="px-6 py-4 text-[#E74C3C]">ID Reversión</th>
                                <th className="px-6 py-4">Método</th>
                                <th className="px-6 py-4 text-right">Total</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-[#2C2C3E] ${loading ? 'opacity-30' : 'opacity-100'}`}>
                            {paginatedItems.map((sale, index) => (
                                <tr key={sale.id} className="hover:bg-[#2C2C3E]/40 transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold text-[#A0A0B0]">
                                        {((currentPage - 1) * 12) + index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <CopyableId value={sale.id} prefix="#" />
                                            <span className="text-[9px] text-[#A0A0B0] font-medium uppercase">{formatDate(sale.createdAt)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><CopyableId value={sale.sale_number} /></td>
                                    <td className="px-6 py-4"><CopyableId value={sale.user_id} /></td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${sale.status === 'completed' ? 'bg-[#27AE60] shadow-[0_0_8px_#27AE60]' : 'bg-[#E74C3C] shadow-[0_0_8px_#E74C3C]'}`}></span>
                                            <span className={`text-[10px] font-black uppercase ${sale.status === 'completed' ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                                                {sale.status === 'completed' ? 'Completada' : 'Reversada'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <CopyableId value={sale.reverse_sale_id} prefix="REV: #" color="text-[#E74C3C]/80" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] text-white font-medium uppercase tracking-wider bg-[#12121B] px-2.5 py-1 rounded border border-[#2C2C3E]">
                                            {sale.payment_method === 'cash' ? '💵 Efectivo' : sale.payment_method === 'card' ? '💳 Tarjeta' : '🏦 Transf.'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="text-[#F5F5F5] font-bold text-sm tracking-tight">
                                            ${Number(sale.total).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end items-center gap-2">
                                            <button onClick={() => onViewDetails(sale)} className="shrink-0 p-2 hover:bg-[#12121B] rounded-lg text-[#A0A0B0] hover:text-[#FFC857] transition-colors border border-transparent hover:border-[#2C2C3E]">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </button>
                                            {sale.status === 'completed' && (
                                                <button onClick={() => onReverse(sale.id)} className="shrink-0 p-2 hover:bg-[#E74C3C]/10 rounded-lg text-[#A0A0B0] hover:text-[#E74C3C] transition-colors border border-transparent hover:border-[#E74C3C]/20">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="shrink-0">
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    );
};

export default SalesHistory;