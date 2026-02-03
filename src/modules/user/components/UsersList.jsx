import { usePagination } from '../../../shared/hooks/usePagination';
import PaginationControls from '../../../components/PaginationControls'; 

export default function UsersList({ 
    users = [], 
    loading, 
    error, 
    onToggleStatus, 
    onEdit, 
    handleCopy, 
    copiedId 
}) {
    const { 
        currentPage, 
        setCurrentPage, 
        paginatedItems, 
        totalPages 
    } = usePagination(users, 10);

    if (error) return (
        <div className="p-4 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] font-sans text-sm">
            Error: {error}
        </div>
    );

    return (
        /* CAMBIO: Se añade h-full y min-h para permitir que el componente llene el espacio disponible */
        <div className="w-full h-full min-h-[600px] relative font-sans flex flex-col">

            {/* Overlay de carga */}
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#12121B]/40 backdrop-blur-[1px] rounded-xl transition-all">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC857]"></div>
                </div>
            )}

            {/* CAMBIO: Se añade flex-1 para que el contenedor oscuro ocupe el alto total del padre */}
            <div className="bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl shadow-xl overflow-hidden flex flex-col flex-1">
                
                {/* CAMBIO: Reemplazamos max-h fijo por flex-1 para que el scroll sea dinámico según el espacio */}
                <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
                    <table className="w-full text-left border-collapse min-w-[800px] md:min-w-[1000px] table-fixed">
                        <thead className="sticky top-0 z-20 bg-[#2C2C3E]">
                            <tr className="text-[#F5F5F5] uppercase text-[9px] md:text-[10px] tracking-widest font-bold">
                                <th className="px-4 md:px-6 py-4 text-[#FFC857] w-[50px]">#</th>
                                <th className="px-4 md:px-6 py-4 text-[#FFC857] w-[120px]">ID</th>
                                <th className="px-4 md:px-6 py-4 min-w-[200px]">Personal</th>
                                <th className="px-4 md:px-6 py-4 min-w-[200px]">Contacto</th>
                                <th className="px-4 md:px-6 py-4 text-center w-[100px]">Rol</th>
                                <th className="px-4 md:px-6 py-4 text-center w-[100px]">Estado</th>
                                <th className="px-4 md:px-6 py-4 text-right w-[150px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-[#2C2C3E] transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                            {paginatedItems.map((user, index) => (
                                <tr key={user.id} className="hover:bg-[#2C2C3E]/40 transition-colors group">
                                    <td className="px-4 md:px-6 py-4 text-xs font-bold text-[#A0A0B0]">
                                        {((currentPage - 1) * 10) + index + 1}
                                    </td>

                                    <td className="px-4 md:px-6 py-4">
                                        <div className="relative flex items-center group/id w-fit">
                                            <div className="text-[10px] bg-[#1a1a2e] text-[#A0A0B0] px-2 py-1 rounded border border-[#2C2C3E] font-medium tracking-wider cursor-default">
                                                <span className="opacity-40">...</span>
                                                {user.id.slice(-6).toUpperCase()}
                                            </div>

                                            <button
                                                onClick={() => handleCopy(user.id)}
                                                className="ml-2 p-1.5 rounded-md bg-[#FFC857] text-[#1E1E2F] opacity-0 group-hover/id:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#FFC857]/20"
                                            >
                                                {copiedId === user.id ? (
                                                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-4 md:px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="shrink-0 w-9 h-9 rounded-lg bg-[#3A3A55] flex items-center justify-center text-[#FFC857] text-[10px] font-black border border-[#FFC857]/20 uppercase">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div className="truncate">
                                                <div className="text-[#F5F5F5] font-bold text-sm truncate uppercase tracking-tight">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-[#A0A0B0] text-[10px] truncate uppercase font-semibold">
                                                    @{user.userName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 md:px-6 py-4">
                                        <div className="text-[#F5F5F5] text-xs truncate mb-0.5 font-semibold tracking-tight">{user.email}</div>
                                        <div className="text-[#A0A0B0] text-[10px] font-bold uppercase tracking-tighter">{user.phone}</div>
                                    </td>

                                    <td className="px-4 md:px-6 py-4 text-center">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${user.role === 'admin'
                                            ? 'bg-[#FFC857]/10 text-[#FFC857] border-[#FFC857]/20'
                                            : 'bg-[#3A3A55]/50 text-[#A0A0B0] border-transparent'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-4 md:px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.active ? 'bg-[#27AE60] shadow-[0_0_8px_#27AE60]' : 'bg-[#A0A0B0]'}`}></span>
                                            <span className={`text-[11px] font-black uppercase ${user.active ? 'text-[#27AE60]' : 'text-[#A0A0B0]'}`}>
                                                {user.active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 md:px-6 py-4">
                                        <div className="flex justify-end items-center gap-2">
                                            {user.email !== "pedro@gmail.com" && (
                                                <button
                                                    onClick={() => onToggleStatus(user)}
                                                    className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all border ${user.active
                                                        ? "border-[#E74C3C]/20 bg-[#E74C3C]/10 text-[#E74C3C] hover:bg-[#E74C3C] hover:text-white"
                                                        : "border-[#27AE60]/20 bg-[#27AE60]/10 text-[#27AE60] hover:bg-[#27AE60] hover:text-white"
                                                    }`}
                                                >
                                                    {user.active ? "Desactivar" : "Activar"}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onEdit(user)}
                                                className="shrink-0 p-2 hover:bg-[#12121B] rounded-lg text-[#A0A0B0] hover:text-[#FFC857] transition-colors border border-transparent hover:border-[#2C2C3E]"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* CAMBIO: Se añade mt-auto para que los controles de página siempre se peguen abajo */}
                {users.length > 0 && (
                    <div className="shrink-0 mt-auto border-t border-[#2C2C3E] bg-[#1E1E2F]">
                        <PaginationControls 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            {!loading && users.length === 0 && (
                <div className="text-center py-12 bg-[#1E1E2F] rounded-b-xl border-x border-b border-[#2C2C3E] text-[#A0A0B0] italic text-sm">
                    No se encontraron usuarios registrados.
                </div>
            )}
        </div>
    );
}