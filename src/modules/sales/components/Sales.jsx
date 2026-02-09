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

    const isCartMobile = m.view === 'cart_mobile';

    return (
        <div className={`grid h-[100dvh] w-full gap-2 lg:gap-6 p-2 lg:p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B] transition-all duration-500 ${(m.view === 'products' || isCartMobile) ? 'lg:grid-cols-[1fr_420px]' : 'grid-cols-1'
            }`}>

            {/* --- MODALES --- */}
            <SaleDetailsModal
                isOpen={m.isDetailsOpen}
                onClose={() => m.setIsDetailsOpen(false)}
                items={m.salesItems || []}
                sale={m.selectedSale}
                loading={m.itemsLoading}
                allProducts={m.products}
            />

            {m.saleResult && (
                <SaleReceiptModal
                    data={m.saleResult}
                    onClose={m.handleCloseReceipt}
                    allProducts={m.products}
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

            {/* --- COLUMNA IZQUIERDA --- */}
            <div className={`flex flex-col h-full min-h-0 overflow-hidden ${isCartMobile ? 'hidden lg:flex' : 'flex'}`}>

                {/* 1. HEADER Y FILTROS */}
                <div className="shrink-0 mb-2">
                    <SalesHeader m={m} />
                    {m.view === 'products' && (
                        <div className="mt-2">
                            <CategoryFilter
                                categories={m.categories}
                                selectedCategory={m.selectedCategory}
                                onSelect={m.setSelectedCategory}
                            />
                        </div>
                    )}
                </div>

                {/* 2. CUERPO (CATÁLOGO O HISTORIAL) */}
                <div className="flex-1 min-h-0 overflow-hidden bg-[#161625]/30 rounded-2xl">
                    {(m.view === 'products' || isCartMobile) ? (
                        <CatalogSection
                            products={m.products} // Pasamos la lista completa
                            loading={m.loading}
                            addToCart={m.addToCart}
                            m={m}
                        />
                    ) : (
                        <div className="h-full overflow-y-auto custom-scrollbar p-2">
                            <SalesHistory
                                sales={m.sales}
                                loading={m.loading}
                                onViewDetails={m.openDetails}
                                onReverse={(id) => m.setConfirmReverse({ isOpen: true, saleId: id })}
                                handleCopy={handleCopy}
                                copiedId={copiedId}
                            />
                        </div>
                    )}
                </div>

                {/* 3. PIE DE PÁGINA (Botón de carrito subido y estilizado) */}
                {/* 3. PIE DE PÁGINA: Botón tipo "Flotante Compacto" */}
                {m.view === 'products' && m.cart.length > 0 && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center px-6 z-40 lg:hidden pointer-events-none">
                        <button
                            onClick={() => m.setView('cart_mobile')}
                            className="pointer-events-auto flex items-center gap-4 bg-[#27AE60] hover:bg-[#2ecc71] text-white pl-5 pr-2 py-2 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.4),0_5px_15px_rgba(39,174,96,0.4)] border border-white/20 active:scale-90 transition-all duration-300 group"
                        >
                            {/* Texto y Icono */}
                            <div className="flex items-center gap-2">
                                <span className="text-lg group-active:rotate-12 transition-transform">🛒</span>
                                <span className="text-xs font-black uppercase tracking-tighter">Ver Carrito</span>
                            </div>

                            {/* El Precio: Un círculo dentro del botón para que se vea compacto */}
                            <div className="bg-[#1a7a43] text-white h-10 min-w-[80px] px-3 flex items-center justify-center rounded-full font-bold text-sm border border-white/10">
                                ${m.totals.total.toLocaleString()}
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* --- COLUMNA DERECHA --- */}
            {(m.view === 'products' || isCartMobile) && (
                <aside className={`h-full min-h-0 animate-in fade-in slide-in-from-right duration-300 ${isCartMobile ? 'flex' : 'hidden lg:flex'
                    }`}>
                    <CartSidebar m={m} />
                </aside>
            )}
        </div>
    );
};

export default Sales;