import React from 'react';
import { useManagerSales } from '../hooks/useManagerSales';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';
import SalesHeader from './SalesHeader';
import CategoryFilter from './CategoryFilter';
import CartSidebar from './CartSidebar';
import SalesHistory from './SalesHistory';
import CatalogSection from './CatalogSection';
import SaleReceiptModal from './SaleReceiptModal';
import SaleDetailsModal from './SaleDetailsModal';
import ConfirmModal from '../../../components/ConfirmModal.jsx';

const Sales = () => {
    const m = useManagerSales();
    const { handleCopy, copiedId } = useHandleCopy();

    return (
        /* CAMBIO CLAVE: 
           Si la vista es 'products', usamos 2 columnas (1fr y 420px).
           Si la vista es 'history', usamos 1 sola columna (1fr).
        */
        <div className={`grid h-screen gap-6 p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B] transition-all duration-500 ${
            m.view === 'products' ? 'lg:grid-cols-[1fr_420px]' : 'grid-cols-1'
        }`}>

            {/* --- MODALES --- */}
            <SaleDetailsModal
                isOpen={m.isDetailsOpen}
                onClose={() => m.setIsDetailsOpen(false)}
                items={m.salesItems || []}
                sale={m.selectedSale}
                loading={m.itemsLoading}
                allProducts={m.allProducts}
            />

            {m.saleResult && (
                <SaleReceiptModal
                    data={m.saleResult}
                    onClose={m.handleCloseReceipt}
                    allProducts={m.allProducts}
                />
            )}

            <ConfirmModal
                isOpen={m.confirmReverse?.isOpen}
                onClose={m.closeReverseModal}
                onConfirm={m.executeReverseSale}
                title="Reversar Venta"
                message="¿Estás seguro de que deseas reversar esta venta? Recuerda que 'reversed' no es lo mismo que anulado."
                loading={m.isReversing}
                error={m.errors}
            />

            {/* --- COLUMNA IZQUIERDA: CATÁLOGO / HISTORIAL --- */}
            <div className="flex flex-col h-full min-h-0 min-w-0">
                
                <div className="shrink-0 space-y-4 mb-4">
                    <SalesHeader m={m} />
                    
                    {m.view === 'products' && (
                        <CategoryFilter
                            categories={m.categories}
                            selectedCategory={m.selectedCategory}
                            onSelect={m.setSelectedCategory}
                        />
                    )}
                </div>

                {/* Este div se expandirá automáticamente gracias al Grid */}
                <div className="flex-1 min-h-0">
                    {m.view === 'products' ? (
                        <CatalogSection
                            products={m.products}
                            loading={m.loading}
                            addToCart={m.addToCart}
                        />
                    ) : (
                        <SalesHistory
                            sales={m.sales}
                            loading={m.loading}
                            onViewDetails={m.openDetails}
                            onReverse={(id) => m.setConfirmReverse({ isOpen: true, saleId: id })}
                            handleCopy={handleCopy}
                            copiedId={copiedId}
                        />
                    )}
                </div>
            </div>

            {/* --- COLUMNA DERECHA: CARRITO (Solo si es vista de productos) --- */}
            {m.view === 'products' && (
                <aside className="h-full min-h-0 hidden lg:block animate-in fade-in slide-in-from-right duration-300">
                    <CartSidebar m={m} />
                </aside>
            )}
        </div>
    );
};

export default Sales;