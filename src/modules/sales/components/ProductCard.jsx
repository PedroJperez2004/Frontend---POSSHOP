import React from 'react';

const ProductCard = ({ product, onAdd, loading }) => {
    const mainImage = product.images?.find(img => img.isMain) || product.images?.[0];

    // Si está cargando, mostramos una versión "Skeleton" o con efecto de pulso
    if (loading) {
        return (
            <div className="bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl overflow-hidden animate-pulse flex flex-col h-full min-h-[220px]">
                <div className="h-32 bg-[#2C2C3E]" />
                <div className="p-3 space-y-3">
                    <div className="h-2 w-1/2 bg-[#2C2C3E] rounded" />
                    <div className="h-4 w-full bg-[#2C2C3E] rounded" />
                    <div className="flex justify-between items-center pt-2">
                        <div className="h-6 w-1/3 bg-[#2C2C3E] rounded" />
                        <div className="h-8 w-8 bg-[#2C2C3E] rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onAdd}
            className="bg-[#1E1E2F] border border-[#2C2C3E] rounded-xl overflow-hidden hover:border-[#FFC857]/50 transition-all group cursor-pointer active:scale-95 flex flex-col h-full min-h-[220px]"
        >
            {/* Contenedor de Imagen */}
            <div className="h-32 bg-[#2C2C3E] relative flex items-center justify-center overflow-hidden">
                {mainImage?.url ? (
                    <img 
                        src={mainImage.url} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        alt={product.name} 
                    />
                ) : (
                    <div className="flex flex-col items-center gap-1 opacity-20">
                         <svg className="w-8 h-8 text-[#A0A0B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[8px] text-[#A0A0B0] font-bold uppercase tracking-tighter">Sin imagen</span>
                    </div>
                )}
            </div>

            {/* Detalles */}
            <div className="p-3 flex flex-col flex-1">
                <h4 className="text-[9px] font-black text-[#FFC857] uppercase tracking-widest">
                    {product.categoryName || "General"}
                </h4>

                <h3 className="text-sm font-bold text-[#F5F5F5] mt-1 line-clamp-2 leading-tight">
                    {product.name || "Producto sin nombre"}
                </h3>

                <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="text-lg font-black text-white">
                        ${Number(product.price || 0).toLocaleString()}
                    </span>
                    <div className="bg-[#FFC857] p-1.5 rounded-lg text-[#1E1E2F] shadow-lg shadow-[#FFC857]/10 group-hover:bg-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;