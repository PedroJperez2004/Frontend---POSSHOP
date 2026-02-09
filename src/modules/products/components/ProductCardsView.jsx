import React, { useState } from 'react';
import PaginationControls from '../../../components/PaginationControls';
import ImageModal from '../../../components/ImageModal';
import { getFullImageUrl } from '../../../shared/hooks/imageHelper';

export default function ProductCardsView({
    products,
    paginatedItems,
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
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="lg:hidden p-4 font-sans">
            {/* Modal de Imagen */}
            {selectedImage && (
                <ImageModal
                    imageUrl={selectedImage.url}
                    altText={selectedImage.name}
                    onClose={() => setSelectedImage(null)}
                />
            )}

            {/* Grid de Tarjetas */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                {paginatedItems.map((product) => {
                    const rawImage = product.images?.find(img => img.isMain) || product.images?.[0];
                    const mainImage = rawImage ? { ...rawImage, url: getFullImageUrl(rawImage.url) } : null;

                    return (
                        <div 
                            key={product.id} 
                            className="bg-[#2C2C3E]/40 border border-[#2C2C3E] rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[#FFC857]/30 transition-colors shadow-lg"
                        >
                            {/* Header: Imagen, Nombre y Categoría */}
                            <div className="flex justify-between items-start gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div 
                                        onClick={() => mainImage && setSelectedImage({ url: mainImage.url, name: product.name })}
                                        className="shrink-0 w-12 h-12 rounded-lg bg-[#12121B] border border-[#3A3A55] overflow-hidden flex items-center justify-center cursor-zoom-in"
                                    >
                                        {mainImage ? (
                                            <img src={mainImage.url} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xl">📦</span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[#F5F5F5] font-bold text-sm uppercase truncate tracking-tight">
                                            {product.name}
                                        </div>
                                        <div className="text-[#FFC857] text-[10px] uppercase font-black tracking-widest">
                                            {product.categoryName}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[#F5F5F5] font-black text-sm">${Number(product.price).toLocaleString()}</span>
                                    <span className="text-[#27AE60] text-[9px] font-bold">+{product.taxRate}% {product.taxName}</span>
                                </div>
                            </div>

                            {/* Descripción corta */}
                            <p className="text-[#A0A0B0] text-xs line-clamp-2 italic">
                                {product.description || "Sin descripción disponible"}
                            </p>

                            {/* Info de Stock e ID */}
                            <div className="space-y-2 py-3 border-y border-[#2C2C3E]/50">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#A0A0B0] font-bold uppercase tracking-tighter">ID Producto:</span>
                                    <button 
                                        onClick={() => handleCopy(product.id)} 
                                        className={`font-mono text-[10px] font-bold transition-all ${
                                            copiedId === product.id ? 'text-[#27AE60]' : 'text-[#A0A0B0]'
                                        }`}
                                    >
                                        {copiedId === product.id ? '¡COPIADO!' : `...${String(product.id).slice(-8).toUpperCase()}`}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#A0A0B0] font-bold uppercase tracking-tighter">Disponibilidad:</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                                            product.stock <= 5 ? 'bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20' : 'text-[#F5F5F5] border-transparent'
                                        }`}>
                                            Stock: {product.stock}
                                        </span>
                                        <div className="flex items-center gap-1 ml-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${product.active ? 'bg-[#27AE60]' : 'bg-[#A0A0B0]'}`}></span>
                                            <span className={`font-black uppercase text-[9px] ${product.active ? 'text-[#27AE60]' : 'text-[#A0A0B0]'}`}>
                                                {product.active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex gap-2 pt-1">
                                <button 
                                    onClick={() => onToggleStatus?.(product)} 
                                    className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase border transition-all active:scale-95 ${
                                        product.active 
                                        ? 'bg-[#E74C3C]/10 border-[#E74C3C]/20 text-[#E74C3C]' 
                                        : 'bg-[#27AE60]/10 border-[#27AE60]/20 text-[#27AE60]'
                                    }`}
                                >
                                    {product.active ? "Desactivar" : "Activar"}
                                </button>
                                <button 
                                    onClick={() => onEdit?.(product)} 
                                    className="flex-1 py-2.5 bg-[#FFC857] text-[#1E1E2F] rounded-lg font-black text-[10px] uppercase transition-all active:scale-95"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDelete?.(product)} 
                                    className="px-3 py-2.5 bg-[#2C2C3E] text-[#A0A0B0] hover:text-[#E74C3C] rounded-lg border border-[#3A3A55] transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Paginación */}
            {products.length > 0 && (
                <div className="mt-8 mb-4 border-t border-[#2C2C3E] pt-6">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {!loading && products.length === 0 && (
                <div className="text-center py-12 text-[#A0A0B0] italic text-sm">
                    No hay productos en el inventario.
                </div>
            )}
        </div>
    );
}