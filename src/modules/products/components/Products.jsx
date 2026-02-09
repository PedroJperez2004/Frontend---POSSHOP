import { useManagerProducts } from '../hooks/useManagerProducts.js';
import ProductList from './ProductList.jsx';
import InputSearch from '../../../components/InputSearch.jsx';
import ProductFormModal from './ProductFormModal.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';
import DynamicCounter from '../../../components/DynamicCounter.jsx';

const Products = () => {
    const {
        products, categories, activeCategories, taxes, loading, error,
        searchTerm, setSearchTerm, selectedCategory, setSelectedCategory,
        refresh, isModalOpen, setIsModalOpen, actionLoading, formError,
        onSubmitProduct, successMessage, handleCloseModal, handleEditClick,
        productToEdit, statusError, handleToggleStatus, handleDeleteClick,
        handleCancelConfirm, onConfirmToggle, confirmConfig
    } = useManagerProducts();

    const { handleCopy, copiedId } = useHandleCopy();

    const isDeleteMode = confirmConfig.mode === 'delete';
    const productName = confirmConfig.product?.name || '';
    const isActive = confirmConfig.product?.active;

    return (
        /* p-4 en móvil para ganar espacio, p-6 en escritorio para elegancia */
        <div className="flex flex-col h-screen w-full p-4 md:p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">

            <div className="flex flex-col h-full min-h-0 w-full">

                {/* --- ENCABEZADO Y ACCIONES --- */}
                <div className="shrink-0 mb-4 md:mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4">
                    <div className="space-y-0.5 md:space-y-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
                            <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] leading-none truncate">
                                Gestión de <span className="text-[#FFC857]">Productos</span>
                            </h2>
                            <div className="shrink-0">
                                <DynamicCounter
                                    count={products.length}
                                    label="Items"
                                    variant="warning"
                                    loading={loading}
                                />
                            </div>
                        </div>
                        <p className="text-[#A0A0B0] text-[11px] md:text-sm leading-relaxed truncate opacity-70">
                            Administra el catálogo y stock de tu inventario
                        </p>
                    </div>

                    {/* Bloque de Herramientas */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 w-full lg:w-auto">
                        
                        {/* Buscador: w-full en móvil, w-64 en escritorio */}
                        <div className="relative w-full sm:w-60 lg:w-72">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar producto..."
                            />
                        </div>

                        {/* Grupo de Filtro y Botones */}
                        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                /* Texto pequeño en móvil, normal en escritorio */
                                className="flex-1 sm:w-44 bg-[#1E1E2F] border border-[#2C2C3E] text-[#F5F5F5] text-[10px] md:text-xs font-bold rounded-lg px-2 py-2.5 outline-none focus:border-[#FFC857] appearance-none uppercase transition-all cursor-pointer"
                            >
                                <option value="">TODAS LAS CATEGORÍAS</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            <ButtonAction
                                action={() => setIsModalOpen(true)}
                                /* Texto inteligente: Corto en móvil, largo en escritorio */
                                text={
                                    <span>
                                        + <span className="hidden md:inline">Nuevo Producto</span>
                                        <span className="inline md:hidden">Nuevo</span>
                                    </span>
                                }
                                className="px-3 md:px-5 shrink-0"
                            />

                            <ButtonRefresh
                                onClick={refresh}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>

                {/* --- CONTENEDOR DE LA LISTA --- */}
                {/* En escritorio quitamos el fondo sutil para que sea igual que antes */}
                <div className="flex-1 min-h-0 min-w-0 bg-[#1E1E2F]/10 md:bg-transparent rounded-t-2xl md:rounded-none overflow-hidden">
                    <ProductList
                        products={products}
                        loading={loading}
                        error={error}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                        onEdit={handleEditClick}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>

            {/* --- MODALES --- */}
            {isModalOpen && (
                <ProductFormModal
                    key={productToEdit?.id || 'new-product'}
                    initialData={productToEdit}
                    categories={activeCategories}
                    onClose={handleCloseModal}
                    onSubmit={onSubmitProduct}
                    loading={actionLoading}
                    error={formError}
                    successMessage={successMessage}
                    taxes={taxes}
                />
            )}

            <ConfirmModal
                isOpen={confirmConfig.isOpen}
                /* Títulos y mensajes adaptativos */
                title={isDeleteMode ? "Eliminar" : (isActive ? "Desactivar" : "Activar")}
                message={isDeleteMode
                    ? `¿Eliminar "${productName}" permanentemente?`
                    : `¿Cambiar estado de "${productName}"?`
                }
                loading={actionLoading}
                onConfirm={onConfirmToggle}
                onClose={handleCancelConfirm}
                error={statusError}
                variant={isDeleteMode ? "danger" : "warning"}
            />
        </div>
    );
};

export default Products;