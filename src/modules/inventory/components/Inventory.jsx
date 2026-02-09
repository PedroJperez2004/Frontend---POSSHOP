import React from 'react';
import { useManagerInventory } from '../hooks/useManagerInventory';
import InventoryList from './InventoryList.jsx';
import InventoryFormModal from './InventoryFormModal.jsx';
import InputSearch from '../../../components/InputSearch.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';
import DynamicCounter from '../../../components/DynamicCounter.jsx';

const Inventory = () => {
    const {
        movements, products, loading, error, searchTerm, setSearchTerm,
        filterType, setFilterType, selectedProduct, setSelectedProduct,
        refresh, isFormOpen, openForm, closeForm, executeMovement,
        successMessage, formError
    } = useManagerInventory();

    const { handleCopy, copiedId } = useHandleCopy();

    return (
        /* p-4 en móvil, p-6 en desktop */
        <div className="flex flex-col h-screen p-4 md:p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">

            <div className="flex flex-col h-full min-h-0 min-w-0">
                
                {/* --- ENCABEZADO --- */}
                {/* mb-4 en móvil, mb-6 en desktop. gap-3 en móvil, gap-4 en desktop */}
                <div className="shrink-0 mb-4 md:mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4">
                    
                    <div className="space-y-0.5 md:space-y-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
                            {/* Texto más pequeño en móvil (text-xl), normal en desktop (text-2xl) */}
                            <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] leading-none truncate">
                                Control de <span className="text-[#FFC857]">Inventario</span>
                            </h2>
                            <div className="shrink-0">
                                <DynamicCounter
                                    count={movements.length}
                                    label="Movs"
                                    variant="warning"
                                    loading={loading}
                                />
                            </div>
                        </div>
                        {/* Ocultamos o achicamos descripción según pantalla */}
                        <p className="text-[#A0A0B0] text-[11px] md:text-sm leading-none truncate opacity-70">
                            Monitoreo de entradas y salidas de stock
                        </p>
                    </div>

                    {/* --- HERRAMIENTAS --- */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 w-full lg:w-auto">
                        
                        {/* Buscador: w-full en móvil, w-64 en desktop */}
                        <div className="relative w-full sm:w-60 lg:w-72">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar ID o nota..."
                            />
                        </div>

                        {/* Grupo de Filtro y Botones */}
                        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                /* text-[10px] en móvil, text-xs en desktop */
                                className="flex-1 sm:w-40 bg-[#1E1E2F] border border-[#2C2C3E] text-[#F5F5F5] text-[10px] md:text-xs font-bold rounded-lg px-2 py-2.5 outline-none focus:border-[#FFC857] appearance-none uppercase transition-all cursor-pointer"
                            >
                                <option value="all">TODOS LOS TIPOS</option>
                                <option value="in">ENTRADAS (+)</option>
                                <option value="out">SALIDAS (-)</option>
                            </select>

                            <ButtonAction
                                action={openForm}
                                /* Texto condicional: corto en móvil, largo en desktop */
                                text={
                                    <span>
                                        + <span className="hidden sm:inline">Nuevo Movimiento</span>
                                        <span className="inline sm:hidden">Nuevo</span>
                                    </span>
                                }
                                className="px-3 md:px-5"
                            />

                            <ButtonRefresh
                                onClick={refresh}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>

                {/* --- LISTADO --- */}
                <div className="flex-1 min-h-0 bg-[#1E1E2F]/10 md:bg-transparent rounded-t-2xl md:rounded-none overflow-hidden">
                    <InventoryList
                        movements={movements}
                        products={products}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        loading={loading}
                        error={error}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                    />
                </div>
            </div>

            {/* MODAL */}
            {isFormOpen && (
                <InventoryFormModal
                    products={products}
                    onClose={closeForm}
                    onSubmit={executeMovement}
                    loading={loading}
                    formError={formError}
                    successMessage={successMessage}
                />
            )}
        </div>
    );
};

export default Inventory;