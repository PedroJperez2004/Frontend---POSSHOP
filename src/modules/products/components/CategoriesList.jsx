import { usePagination } from '../../../shared/hooks/usePagination';
import PaginationControls from '../../../components/PaginationControls'; 

export default function CategoriesList({ 
    categories = [], 
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
    } = usePagination(categories, 10);

    if (error) return (
        <div className="p-4 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] font-sans text-sm">
            Error: {error}
        </div>
    );

    return (
        /* CAMBIO: Agregamos h-full y min-h para que se expanda */
        <div className="w-full h-full min-h-[600px] relative font-sans flex flex-col">
            
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#12121B]/40 backdrop-blur-[1px] rounded-xl transition-all">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC857]"></div>
                </div>
            )}

            {/* CAMBIO: h-full y flex-1 para que este contenedor crezca */}
            <div className="bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl shadow-xl overflow-hidden flex flex-col flex-1">
                
                {/* CAMBIO: Eliminamos el max-h fijo y usamos flex-1 para que use el espacio del padre */}
                <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
                    <table className="w-full text-left border-collapse min-w-[800px] md:min-w-[1000px] table-fixed">
                        <thead className="sticky top-0 z-20 bg-[#2C2C3E]">
                            <tr className="text-[#F5F5F5] uppercase text-[9px] md:text-[10px] tracking-widest font-bold">
                                <th className="px-4 md:px-6 py-4 text-[#FFC857] w-[50px]">#</th>
                                <th className="px-4 md:px-6 py-4 text-[#FFC857] w-[130px]">ID</th>
                                <th className="px-4 md:px-6 py-4 min-w-[200px]">Nombre / Tienda</th>
                                <th className="px-4 md:px-6 py-4 min-w-[250px]">Descripción</th>
                                <th className="px-4 md:px-6 py-4 text-center w-[120px]">Estado</th>
                                <th className="px-4 md:px-6 py-4 text-right w-[180px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-[#2C2C3E] transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                            {paginatedItems.map((cat, index) => {
                                const idStr = String(cat.id);
                                const displayIndex = ((currentPage - 1) * 10) + index + 1;
                                
                                return (
                                    <tr key={cat.id} className="hover:bg-[#2C2C3E]/40 transition-colors group">
                                        <td className="px-4 md:px-6 py-4 text-xs font-bold text-[#A0A0B0]">
                                            {displayIndex}
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <div className="relative flex items-center group/id w-fit">
                                                <div className="text-[10px] bg-[#1a1a2e] text-[#A0A0B0] px-2 py-1 rounded border border-[#2C2C3E] font-medium tracking-wider cursor-default uppercase">
                                                    <span className="opacity-40">...</span>
                                                    {idStr.length > 6 ? idStr.slice(-6) : idStr}
                                                </div>
                                                <button 
                                                    onClick={() => handleCopy?.(cat.id)}
                                                    className="ml-2 p-1.5 rounded-md bg-[#FFC857] text-[#1E1E2F] opacity-0 group-hover/id:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#FFC857]/20"
                                                >
                                                    {copiedId === cat.id ? (
                                                        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                                    ) : (
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                                    )}
                                                </button>
                                                {copiedId === cat.id && (
                                                    <span className="absolute -top-7 left-0 text-[8px] font-bold text-[#FFC857] animate-bounce">¡COPIADO!</span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="shrink-0 w-9 h-9 rounded-lg bg-[#3A3A55] flex items-center justify-center text-[#FFC857] text-[10px] font-black border border-[#FFC857]/20 uppercase">
                                                    {cat.name.substring(0, 2)}
                                                </div>
                                                <div className="truncate">
                                                    <div className="text-[#F5F5F5] font-bold text-sm truncate uppercase tracking-tight">
                                                        {cat.name}
                                                    </div>
                                                    <div className="text-[#A0A0B0] text-[10px] truncate uppercase font-semibold">
                                                        Shop ID: {cat.id_shop || 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <p className="text-[#A0A0B0] text-xs line-clamp-2 italic leading-relaxed max-w-[300px]">
                                                {cat.description || "Sin descripción detallada"}
                                            </p>
                                        </td>

                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${cat.active ? 'bg-[#27AE60] shadow-[0_0_8px_#27AE60]' : 'bg-[#A0A0B0]'}`}></span>
                                                <span className={`text-[10px] md:text-[11px] font-black uppercase ${cat.active ? 'text-[#27AE60]' : 'text-[#A0A0B0]'}`}>
                                                    {cat.active ? 'Activa' : 'Inactiva'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <button
                                                    onClick={() => onToggleStatus?.(cat)}
                                                    className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all border ${cat.active
                                                        ? "border-[#E74C3C]/20 bg-[#E74C3C]/10 text-[#E74C3C] hover:bg-[#E74C3C] hover:text-white"
                                                        : "border-[#27AE60]/20 bg-[#27AE60]/10 text-[#27AE60] hover:bg-[#27AE60] hover:text-white"
                                                    }`}
                                                >
                                                    {cat.active ? "Desactivar" : "Activar"}
                                                </button>

                                                <button
                                                    onClick={() => onEdit?.(cat)}
                                                    className="shrink-0 p-2 hover:bg-[#12121B] rounded-lg text-[#A0A0B0] hover:text-[#FFC857] transition-colors border border-transparent hover:border-[#2C2C3E]"
                                                    title="Editar"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => onDelete?.(cat)}
                                                    className="shrink-0 p-2 hover:bg-[#E74C3C]/10 rounded-lg text-[#A0A0B0] hover:text-[#E74C3C] transition-colors border border-transparent hover:border-[#E74C3C]/20"
                                                    title="Eliminar"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* CAMBIO: mt-auto asegura que la paginación siempre esté abajo si hay poco contenido */}
                {categories.length > 0 && (
                    <div className="shrink-0 mt-auto border-t border-[#2C2C3E] bg-[#1E1E2F]">
                        <PaginationControls 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            {!loading && categories.length === 0 && (
                <div className="text-center py-12 bg-[#1E1E2F] rounded-b-xl border-x border-b border-[#2C2C3E] text-[#A0A0B0] font-sans italic text-sm">
                    No se encontraron categorías registradas.
                </div>
            )}
        </div>
    );
}