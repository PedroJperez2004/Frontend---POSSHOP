import React, { useState, useMemo } from 'react';
import { usePagination } from '../../../shared/hooks/usePagination';
import PaginationControls from '../../../components/PaginationControls';

const InventoryList = ({ 
    movements = [], 
    products = [], 
    selectedProduct, 
    setSelectedProduct, 
    loading, 
    error, 
    handleCopy, 
    copiedId 
}) => {
    // El ordenamiento visual sí lo mantenemos local para rapidez de la UI
    const [sortOrder, setSortOrder] = useState('desc');

    // 1. Lógica de Ordenamiento (sobre lo que ya filtró el manager)
    const sortedMovements = useMemo(() => {
        return [...movements].sort((a, b) => {
            return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
        });
    }, [movements, sortOrder]);

    // 2. Paginación
    const { 
        currentPage, 
        setCurrentPage, 
        paginatedItems, 
        totalPages 
    } = usePagination(sortedMovements, 12);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('es-ES', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (error) return (
        <div className="p-4 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] font-sans text-sm font-bold">
            ERROR: {error}
        </div>
    );

    // Componente interno para IDs copiables
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
            
            {/* Header Interno de la Tabla */}
            <div className="mb-4 flex flex-wrap justify-between items-center gap-4 px-2">
                <h3 className="text-[#FFC857] text-[10px] font-black tracking-widest uppercase italic">Kardex de Inventario</h3>
                
                <div className="flex items-center gap-3">
                    {/* SELECT DE PRODUCTOS (Conectado al Manager) */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-tight">Producto:</span>
                        <select
                            value={selectedProduct}
                            onChange={(e) => {
                                setSelectedProduct(e.target.value);
                                setCurrentPage(1); // Reset de página al filtrar
                            }}
                            className="bg-[#2C2C3E] text-[#F5F5F5] text-[10px] font-bold border border-[#3E3E52] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FFC857] transition-colors cursor-pointer outline-none"
                        >
                            <option value="all">TODOS LOS PRODUCTOS</option>
                            {products.map(prod => (
                                <option key={prod.id} value={prod.id}>
                                    {prod.name.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* BOTÓN ORDENAR */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-tight">Ordenar:</span>
                        <button
                            onClick={() => {
                                setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                                setCurrentPage(1);
                            }}
                            className="bg-[#2C2C3E] hover:bg-[#FFC857] hover:text-[#1E1E2F] px-3 py-1.5 rounded-lg text-[10px] font-black border border-[#3E3E52] transition-all flex items-center gap-2"
                        >
                            {sortOrder === 'desc' ? <>MÁS RECIENTES ↓</> : <>MÁS ANTIGUOS ↑</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl shadow-2xl overflow-hidden flex flex-col flex-1 relative">
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#12121B]/40 backdrop-blur-[1px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC857]"></div>
                    </div>
                )}

                <div className="overflow-x-auto custom-scrollbar flex-1">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-[#2C2C3E] text-[#F5F5F5] uppercase text-[9px] md:text-[10px] tracking-widest font-bold">
                                <th className="px-6 py-4 text-[#FFC857] w-[60px]">#</th>
                                <th className="px-6 py-4 text-[#FFC857]">ID Movimiento</th>
                                <th className="px-6 py-4">ID Producto</th>
                                <th className="px-6 py-4 text-center">Tipo</th>
                                <th className="px-6 py-4 text-right">Cantidad</th>
                                <th className="px-6 py-4">Fecha / Hora</th>
                                <th className="px-6 py-4">Nota</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-[#2C2C3E] ${loading ? 'opacity-30' : 'opacity-100'}`}>
                            {paginatedItems.length > 0 ? (
                                paginatedItems.map((mov, index) => {
                                    const isEntry = mov.type === 'in';
                                    return (
                                        <tr key={mov.id} className="hover:bg-[#2C2C3E]/40 transition-colors group">
                                            <td className="px-6 py-4 text-xs font-bold text-[#A0A0B0]">
                                                {((currentPage - 1) * 12) + index + 1}
                                            </td>
                                            <td className="px-6 py-4"><CopyableId value={mov.id} prefix="#" /></td>
                                            <td className="px-6 py-4"><CopyableId value={mov.product_id} prefix="ID:" color="text-[#FFC857]/80" /></td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${isEntry ? 'bg-[#27AE60] shadow-[0_0_8px_#27AE60]' : 'bg-[#E74C3C] shadow-[0_0_8px_#E74C3C]'}`}></span>
                                                    <span className={`text-[10px] font-black uppercase ${isEntry ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                                                        {isEntry ? 'Entrada' : 'Salida'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 text-right font-black text-sm ${isEntry ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                                                {isEntry ? '+' : '-'}{mov.quantity}
                                            </td>
                                            <td className="px-6 py-4"><span className="text-[10px] text-[#A0A0B0] font-medium uppercase">{formatDate(mov.createdAt)}</span></td>
                                            <td className="px-6 py-4">
                                                <p className="text-[#A0A0B0] text-[10px] italic line-clamp-1 max-w-[200px] group-hover:text-[#F5F5F5]">
                                                    {mov.note || "--"}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-[#A0A0B0] text-xs italic">
                                        No hay movimientos que coincidan con los filtros seleccionados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer de Paginación */}
                <div className="shrink-0 border-t border-[#2C2C3E] bg-[#1a1a2e]/50">
                    <PaginationControls 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={setCurrentPage} 
                    />
                </div>
            </div>
        </div>
    );
};

export default InventoryList;