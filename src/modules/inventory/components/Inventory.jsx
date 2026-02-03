import React from 'react';
import { useManagerInventory } from '../hooks/useManagerInventory';
import InventoryList from './InventoryList.jsx';
import InventoryFormModal from './InventoryFormModal.jsx';
import InputSearch from '../../../components/InputSearch.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';

const Inventory = () => {
    const {
        movements,       // Ya viene filtrado por el manager (Triple filtro)
        products,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        selectedProduct,
        setSelectedProduct,
        refresh,
        isFormOpen,
        openForm,
        closeForm,
        executeMovement,
        successMessage,
        formError
    } = useManagerInventory();

    const { handleCopy, copiedId } = useHandleCopy();

    return (
        <div className="grid grid-cols-1 h-screen gap-6 p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">
            
            <div className="flex flex-col h-full min-h-0 min-w-0">
                
                {/* --- SECCIÓN 1: ENCABEZADO Y FILTROS GLOBALES --- */}
                <div className="shrink-0 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#F5F5F5]">
                            Control de <span className="text-[#FFC857]">Inventario</span>
                        </h2>
                        <p className="text-[#A0A0B0] text-sm">Monitoreo de entradas y salidas de stock</p>
                    </div>

                    {/* Acciones Rápidas y Búsqueda */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 md:flex-none">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder={"Buscar por ID o nota..."}
                            />
                        </div>

                        {/* Filtro por Naturaleza del Movimiento */}
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-[#1E1E2F] border border-[#2C2C3E] text-[#F5F5F5] text-sm rounded-lg px-4 py-2.5 outline-none focus:border-[#FFC857] transition-all cursor-pointer min-w-[160px] font-bold uppercase tracking-tight"
                        >
                            <option value="all">TODOS LOS TIPOS</option>
                            <option value="in">ENTRADAS (+)</option>
                            <option value="out">SALIDAS (-)</option>
                        </select>

                        <ButtonRefresh 
                            onClick={refresh} 
                            isLoading={loading} 
                        />

                        <ButtonAction 
                            action={openForm} 
                            text="+ Nuevo Movimiento" 
                        />
                    </div>
                </div>

                {/* --- SECCIÓN 2: LISTADO / KARDEX --- */}
                {/* Aquí no hay bordes ni fondos porque el componente InventoryList ya trae su propio contenedor */}
                <div className="flex-1 min-h-0 overflow-hidden">
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

            {/* --- SECCIÓN 3: MODAL DE REGISTRO --- */}
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