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
        products,
        categories,
        taxes,
        activeCategories,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        refresh,
        isModalOpen,
        setIsModalOpen,
        actionLoading,
        formError,
        onSubmitProduct,
        successMessage,
        handleCloseModal,
        handleEditClick,
        productToEdit,
        statusError,
        handleToggleStatus,
        handleDeleteClick,
        handleCancelConfirm,
        onConfirmToggle,
        confirmConfig
    } = useManagerProducts();

    const { handleCopy, copiedId } = useHandleCopy();

    const isDeleteMode = confirmConfig.mode === 'delete';
    const productName = confirmConfig.product?.name || '';
    const isActive = confirmConfig.product?.active;

    return (
        <div className="flex flex-col h-screen w-full p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">

            <div className="flex flex-col h-full min-h-0 w-full">

                {/* --- ENCABEZADO Y ACCIONES --- */}
                <div className="shrink-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                        {/* Título + Contador: Siempre juntos con flex-nowrap */}
                        <div className="flex items-center gap-3 flex-nowrap">
                            <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] leading-none truncate">
                                Gestión de <span className="text-[#FFC857]">Productos</span>
                            </h2>

                            <div className="flex-shrink-0 mt-0.5">
                                <DynamicCounter
                                    count={products.length}
                                    label="Items"
                                    variant="warning"
                                    loading={loading}
                                />
                            </div>
                        </div>

                        <p className="text-[#A0A0B0] text-xs md:text-sm leading-relaxed truncate">
                            Administra el catálogo y stock de tu inventario
                        </p>
                    </div>

                    {/* Bloque de Herramientas */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        {/* Buscador adaptable */}
                        <div className="relative flex-1 min-w-[150px] md:flex-none md:w-64">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar..."
                            />
                        </div>

                        {/* Grupo de filtros y botones */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="flex-1 sm:w-40 bg-[#1E1E2F] border border-[#2C2C3E] text-[#F5F5F5] text-[11px] font-bold rounded-lg px-2 py-2.5 outline-none focus:border-[#FFC857] appearance-none uppercase"
                            >
                                <option value="">CATEGORÍAS</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            <ButtonAction
                                action={() => setIsModalOpen(true)}
                                text={
                                    <span>
                                        + Nuevo <span className="hidden md:inline">Producto</span>
                                    </span>
                                }
                                className="flex-none text-[11px] font-black px-3"
                            />

                            <ButtonRefresh
                                onClick={refresh}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>
                {/* Contenedor de la Lista */}
                <div className="flex-1 min-h-0 min-w-0">
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

            {/* Modales */}
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
                title={isDeleteMode ? "Eliminar Producto" : (isActive ? "Desactivar Producto" : "Activar Producto")}
                message={isDeleteMode
                    ? `¿Estás seguro de que deseas eliminar "${productName}" permanentemente? Esta acción no se puede deshacer.`
                    : `¿Deseas cambiar el estado del producto "${productName}"?`
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