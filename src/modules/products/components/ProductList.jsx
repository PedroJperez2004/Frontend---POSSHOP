import { useState } from 'react';
import { usePagination } from '../../../shared/hooks/usePagination';
import PaginationControls from '../../../components/PaginationControls'; 
import ImageModal from '../../../components/ImageModal'; 

export default function ProductList({ 
    products, 
    loading, 
    error, 
    onToggleStatus, 
    onEdit, 
    onDelete, 
    handleCopy, 
    copiedId 
}) {
    const [selectedImage, setSelectedImage] = useState(null);

    const { 
        currentPage, 
        setCurrentPage, 
        paginatedItems, 
        totalPages 
    } = usePagination(products, 12);

    if (error) return (
        <div className="p-4 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] font-sans text-sm">
            Error: {error}
        </div>
    );

    return (
        <div className="w-full h-full min-h-[600px] flex flex-col font-sans">
            
            {selectedImage && (
                <ImageModal 
                    imageUrl={selectedImage.url} 
                    altText={selectedImage.name} 
                    onClose={() => setSelectedImage(null)} 
                />
            )}
            
            <div className="relative flex flex-col flex-1 bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl shadow-xl overflow-hidden">
                
                {loading && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#12121B]/40 backdrop-blur-[1px] transition-all">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFC857]"></div>
                    </div>
                )}

                <div className="flex-1 overflow-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1100px] table-fixed">
                        <thead>
                            <tr className="sticky top-0 z-20 bg-[#2C2C3E] text-[#F5F5F5] uppercase text-[9px] md:text-[10px] tracking-widest font-bold shadow-sm">
                                <th className="px-4 md:px-6 py-4 text-[#FFC857] w-[60px]">#</th>
                                <th className="px-4 md:px-6 py-4 text-[#FFC857] w-[140px]">ID</th>
                                <th className="px-4 md:px-6 py-4 w-[250px]">Producto</th>
                                <th className="px-4 md:px-6 py-4">Descripción</th> {/* Nueva Columna */}
                                <th className="px-4 md:px-6 py-4 text-center w-[100px]">Stock</th>
                                <th className="px-4 md:px-6 py-4 w-[120px]">Precio</th>
                                <th className="px-4 md:px-6 py-4 w-[110px]">Impuesto</th> 
                                <th className="px-4 md:px-6 py-4 text-center w-[130px]">Estado</th>
                                <th className="px-4 md:px-6 py-4 text-right w-[190px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-[#2C2C3E] transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                            {paginatedItems.map((product, index) => {
                                const mainImage = product.images?.find(img => img.isMain) || product.images?.[0];
                                const idStr = String(product.id);
                                
                                return (
                                    <tr key={product.id} className="hover:bg-[#2C2C3E]/40 transition-colors group">
                                        <td className="px-4 md:px-6 py-4 text-xs font-bold text-[#A0A0B0]">
                                            {((currentPage - 1) * 12) + index + 1}
                                        </td>
                                        <td className="px-4 md:px-6 py-4">
                                            <div className="relative flex items-center group/id w-fit">
                                                <div className="text-[10px] bg-[#1a1a2e] text-[#A0A0B0] px-2 py-1 rounded border border-[#2C2C3E] font-medium tracking-wider cursor-default uppercase">
                                                    <span className="opacity-40">...</span>
                                                    {idStr.length > 6 ? idStr.slice(-6) : idStr}
                                                </div>
                                                <button 
                                                    onClick={() => handleCopy(product.id)}
                                                    className="ml-2 p-1.5 rounded-md bg-[#FFC857] text-[#1E1E2F] opacity-0 group-hover/id:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#FFC857]/20"
                                                >
                                                    {copiedId === product.id ? (
                                                        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                                    ) : (
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div 
                                                    onClick={() => mainImage && setSelectedImage({ url: mainImage.url, name: product.name })}
                                                    className="w-10 h-10 rounded-lg bg-[#12121B] border border-[#3A3A55] overflow-hidden flex items-center justify-center shrink-0 cursor-zoom-in hover:border-[#FFC857] transition-all group/img"
                                                >
                                                    {mainImage ? (
                                                        <img
                                                            src={mainImage.url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover/img:scale-125 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-4 h-4 text-[#3A3A55]">📦</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-[#F5F5F5] font-bold text-sm truncate uppercase tracking-tight">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-[#A0A0B0] text-[10px] truncate uppercase font-semibold">
                                                        {product.categoryName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Celda de Descripción */}
                                        <td className="px-4 md:px-6 py-4">
                                            <div className="text-[#A0A0B0] text-xs line-clamp-2 leading-relaxed">
                                                {product.description || <span className="opacity-30 italic text-[10px]">Sin descripción</span>}
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black border ${
                                                product.stock <= 5 
                                                ? 'bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20 shadow-[0_0_10px_rgba(231,76,60,0.1)]' 
                                                : 'bg-[#3A3A55]/50 text-[#F5F5F5] border-transparent'
                                            }`}>
                                                {product.stock}
                                            </span>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <div className="text-[#FFC857] font-bold text-sm tracking-tighter">
                                                ${Number(product.price).toLocaleString()}
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[#A0A0B0] text-[10px] font-black uppercase tracking-wider">
                                                    {product.taxName || "N/A"}
                                                </span>
                                                {product.taxRate > 0 && (
                                                    <span className="text-[#27AE60] text-[9px] font-bold">
                                                        +{product.taxRate}%
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.active ? 'bg-[#27AE60]' : 'bg-[#A0A0B0]'}`}></span>
                                                <span className={`text-[10px] font-black uppercase ${product.active ? 'text-[#27AE60]' : 'text-[#A0A0B0]'}`}>
                                                    {product.active ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <button
                                                    onClick={() => onToggleStatus?.(product)}
                                                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all border ${product.active
                                                        ? "border-[#E74C3C]/20 bg-[#E74C3C]/10 text-[#E74C3C] hover:bg-[#E74C3C] hover:text-white"
                                                        : "border-[#27AE60]/20 bg-[#27AE60]/10 text-[#27AE60] hover:bg-[#27AE60] hover:text-white"
                                                    }`}
                                                >
                                                    {product.active ? "Desactivar" : "Activar"}
                                                </button>
                                                <button onClick={() => onEdit?.(product)} className="p-2 text-[#A0A0B0] hover:text-[#FFC857]">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button onClick={() => onDelete?.(product)} className="p-2 text-[#A0A0B0] hover:text-[#E74C3C]">
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

                <div className="mt-auto border-t border-[#2C2C3E] bg-[#1E1E2F] z-20">
                    <PaginationControls 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {!loading && products.length === 0 && (
                <div className="text-center py-12 text-[#A0A0B0] italic text-sm">
                    No hay productos en el inventario.
                </div>
            )}
        </div>
    );
}