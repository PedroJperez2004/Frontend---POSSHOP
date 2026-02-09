
import React from 'react';
import ProductCard from './ProductCard';

const CatalogSection = ({ products = [], loading, addToCart, }) => {
    return (
        /* h-full min-h-0 es vital para que el scroll interno funcione */
        <div className="flex flex-col h-full min-h-0 overflow-hidden">

            {/* ÁREA DE PRODUCTOS: 
                - flex-1: Ocupa todo el espacio disponible.
                - overflow-y-auto: Permite el scroll solo aquí.
            */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                
                {/* GRID DE PRODUCTOS */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pt-2 pb-20">
                    {products.map(p => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onAdd={() => addToCart(p)}
                            loading={loading}
                        />
                    ))}
                </div>

                {/* Feedback si no hay resultados */}
                {products.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-64 opacity-40">
                        <span className="text-4xl mb-2">🔍</span>
                        <p className="text-xs uppercase tracking-widest text-[#A0A0B0]">
                            No se encontraron productos
                        </p>
                    </div>
                )}
            </div>
            
            {/* NOTA: Eliminamos el bloque del "ANCLA" de aquí, 
                ya que ahora reside en Sales.jsx para ser siempre visible.
            */}
        </div>
    );
};

export default CatalogSection;