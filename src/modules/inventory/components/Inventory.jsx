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
                {/* --- SECCIÓN 1: ENCABEZADO Y FILTROS (OPTIMIZADO) --- */}
                <div className="shrink-0 mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">

                    <div className="space-y-0.5 min-w-0">
                        {/* Contenedor Título + Badge: Siempre en la misma línea */}
                        <div className="flex items-center gap-3 flex-nowrap">
                            <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] leading-tight truncate">
                                Control de <span className="text-[#FFC857]">Inventario</span>
                            </h2>

                            {/* Contador blindado con shrink-0 */}
                            <div className="flex-shrink-0 mt-0.5">
                                <DynamicCounter
                                    count={movements.length} // Asegúrate de usar la variable correcta
                                    label="Movs"
                                    variant="warning"
                                    loading={loading}
                                />
                            </div>
                        </div>
                        <p className="text-[#A0A0B0] text-[11px] md:text-xs leading-none truncate">
                            Monitoreo de entradas y salidas de stock
                        </p>
                    </div>

                    {/* Bloque de Herramientas y Acciones */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1 lg:mt-0">

                        {/* Búsqueda flexible */}
                        <div className="relative w-full sm:w-60 lg:w-64">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar ID o nota..."
                            />
                        </div>

                        {/* Grupo de Filtro, Botón Dinámico y Refresh */}
                        <div className="flex items-center gap-2">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="flex-1 sm:w-40 bg-[#1E1E2F] border border-[#2C2C3E] text-[#F5F5F5] text-[11px] font-bold rounded-lg px-2 py-2.5 outline-none focus:border-[#FFC857] appearance-none uppercase"
                            >
                                <option value="all">TODOS</option>
                                <option value="in">ENTRADAS (+)</option>
                                <option value="out">SALIDAS (-)</option>
                            </select>

                            <ButtonAction
                                action={openForm}
                                
                                text={
                                    <span>
                                        + Nuevo <span className="hidden md:inline">Movimiento</span>
                                    </span>
                                }
                                className="flex-none text-[11px] font-black px-3 py-2.5"
                            />

                            <ButtonRefresh
                                onClick={refresh}
                                isLoading={loading}
                            />
                        </div>
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