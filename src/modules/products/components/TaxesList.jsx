import { usePagination } from '../../../shared/hooks/usePagination';
import PaginationControls from '../../../components/PaginationControls';
import TaxCardsView from './TaxCardsView';

export default function TaxList({
    taxes,
    loading,
    error,
    onToggleStatus,
    onEdit,
    onDelete,
    handleCopy,
    copiedId
}) {
    const {
        currentPage,
        setCurrentPage,
        paginatedItems,
        totalPages
    } = usePagination(taxes, 12);

    if (error) return (
        <div className="p-4 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] font-sans text-sm">
            Error: {error}
        </div>
    );

    return (
        <div className="w-full h-full min-h-[600px] flex flex-col font-sans">
            
            {/* MARCO PRINCIPAL (Igual al de Products) */}
            <div className="relative flex flex-col flex-1 bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl shadow-xl overflow-hidden">
                
                {loading && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#12121B]/40 backdrop-blur-[1px] transition-all">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC857]"></div>
                    </div>
                )}

                <div className="flex-1 overflow-auto custom-scrollbar">
                    
                    {/* VISTA DE TARJETAS (Mobile/Tablet) */}
                    <div className="lg:hidden">
                        <TaxCardsView
                            taxes={taxes}
                            paginatedItems={paginatedItems}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            handleCopy={handleCopy}
                            copiedId={copiedId}
                            onToggleStatus={onToggleStatus}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            loading={loading}
                        />
                    </div>

                    {/* VISTA DE TABLA (Desktop) */}
                    <div className="hidden lg:block">
                        <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
                            <thead>
                                <tr className="sticky top-0 z-20 bg-[#2C2C3E] text-[#F5F5F5] uppercase text-[9px] md:text-[10px] tracking-widest font-bold shadow-sm">
                                    <th className="px-6 py-4 text-[#FFC857] w-[60px]">#</th>
                                    <th className="px-6 py-4 text-[#FFC857] w-[140px]">ID Fiscal</th>
                                    <th className="px-6 py-4 w-[250px]">Nombre del Impuesto</th>
                                    <th className="px-6 py-4 text-center w-[100px]">Tasa</th>
                                    <th className="px-6 py-4 text-center w-[130px]">Tipo</th>
                                    <th className="px-6 py-4 text-center w-[130px]">Estado</th>
                                    <th className="px-6 py-4 text-right w-[190px]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-[#2C2C3E] transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                                {paginatedItems.map((tax, index) => {
                                    const idStr = String(tax.id);
                                    return (
                                        <tr key={tax.id} className="hover:bg-[#2C2C3E]/40 transition-colors group">
                                            {/* Índice */}
                                            <td className="px-6 py-4 text-xs font-bold text-[#A0A0B0]">
                                                {((currentPage - 1) * 12) + index + 1}
                                            </td>

                                            {/* ID con Copiar */}
                                            <td className="px-6 py-4">
                                                <div className="relative flex items-center group/id w-fit">
                                                    <div className="text-[10px] bg-[#1a1a2e] text-[#A0A0B0] px-2 py-1 rounded border border-[#2C2C3E] font-medium tracking-wider cursor-default uppercase">
                                                        <span className="opacity-40">...</span>
                                                        {idStr.length > 6 ? idStr.slice(-6) : idStr}
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopy(tax.id)}
                                                        className="ml-2 p-1.5 rounded-md bg-[#FFC857] text-[#1E1E2F] opacity-0 group-hover/id:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#FFC857]/20"
                                                    >
                                                        {copiedId === tax.id ? (
                                                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                                        ) : (
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Nombre */}
                                            <td className="px-6 py-4 font-bold text-[#F5F5F5] uppercase text-sm tracking-tight">
                                                {tax.name}
                                            </td>

                                            {/* Tasa */}
                                            <td className="px-6 py-4 text-center text-[#FFC857] font-black text-sm">
                                                {tax.percentage}%
                                            </td>

                                            {/* Tipo (Incluido/Adicional) */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase ${
                                                    tax.included_in_price 
                                                    ? 'bg-[#3498DB]/10 text-[#3498DB] border-[#3498DB]/20' 
                                                    : 'bg-[#A0A0B0]/10 text-[#A0A0B0] border-[#A0A0B0]/20'
                                                }`}>
                                                    {tax.included_in_price ? 'Incluido' : 'Adicional'}
                                                </span>
                                            </td>

                                            {/* Estado */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${tax.is_active ? 'bg-[#27AE60]' : 'bg-[#A0A0B0]'}`}></span>
                                                    <span className={`text-[10px] font-black uppercase ${tax.is_active ? 'text-[#27AE60]' : 'text-[#A0A0B0]'}`}>
                                                        {tax.is_active ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Acciones */}
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end items-center gap-2">
                                                    <button
                                                        onClick={() => onToggleStatus?.(tax)}
                                                        className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all border ${tax.is_active
                                                            ? "border-[#E74C3C]/20 bg-[#E74C3C]/10 text-[#E74C3C] hover:bg-[#E74C3C] hover:text-white"
                                                            : "border-[#27AE60]/20 bg-[#27AE60]/10 text-[#27AE60] hover:bg-[#27AE60] hover:text-white"
                                                            }`}
                                                    >
                                                        {tax.is_active ? "Desactivar" : "Activar"}
                                                    </button>
                                                    <button onClick={() => onEdit?.(tax)} className="p-2 text-[#A0A0B0] hover:text-[#FFC857] transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    <button onClick={() => onDelete?.(tax)} className="p-2 text-[#A0A0B0] hover:text-[#E74C3C] transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PIE DE PAGINACIÓN (Fijo al fondo del marco) */}
                <div className="mt-auto border-t border-[#2C2C3E] bg-[#1E1E2F] z-20">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {!loading && taxes.length === 0 && (
                <div className="text-center py-12 text-[#A0A0B0] italic text-sm">
                    No hay impuestos registrados en el sistema.
                </div>
            )}
        </div>
    );
}