import React, { useEffect } from 'react';
import { usePagination } from '../../../shared/hooks/usePagination';
import PaginationControls from '../../../components/PaginationControls'; 
import ProductCard from './ProductCard';

const CatalogSection = ({ products = [], loading, addToCart }) => {
    
    // Configuramos 12 productos por página
    const { 
        currentPage, 
        setCurrentPage, 
        paginatedItems, 
        totalPages 
    } = usePagination(products, 12);

    // Si la lista de productos cambia (por búsqueda o categoría), volvemos a la página 1
    useEffect(() => {
        setCurrentPage(1);
    }, [products.length, setCurrentPage]);

    return (
        <div className="h-full flex flex-col">
            {/* Contenedor con Scroll para las Cards */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                    {paginatedItems.map(p => (
                        <ProductCard 
                            key={p.id} 
                            product={p} 
                            onAdd={() => addToCart(p)} 
                            loading={loading}
                        />
                    ))}
                </div>

                {products.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-64 opacity-40">
                        <span className="text-4xl mb-2">🔍</span>
                        <p className="text-xs uppercase tracking-widest text-[#A0A0B0]">No se encontraron productos</p>
                    </div>
                )}
            </div>

            {/* Paginación fija al fondo */}
            {products.length > 0 && (
                <div className="shrink-0 pt-4 bg-[#12121B]"> 
                    <div className="bg-[#1E1E2F] rounded-xl border border-[#2C2C3E] shadow-xl">
                        <PaginationControls 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CatalogSection;