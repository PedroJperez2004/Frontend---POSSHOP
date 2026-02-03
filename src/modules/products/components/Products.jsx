import { useManagerProducts } from '../hooks/useManagerProducts.js';
import ProductList from './ProductList.jsx';
import InputSearch from '../../../components/InputSearch.jsx';
import ProductFormModal from './ProductFormModal.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';

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
                
                {/* Encabezado */}
                <div className="shrink-0 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#F5F5F5]">
                            Gestión de <span className="text-[#FFC857]">Productos</span>
                        </h2>
                        <p className="text-[#A0A0B0] text-sm">Administra los productos de tu tienda</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 md:flex-none">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder={"Buscar productos..."}
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-[#1E1E2F] border border-[#2C2C3E] text-[#F5F5F5] text-sm rounded-lg px-4 py-2.5 outline-none focus:border-[#FFC857] transition-all cursor-pointer min-w-[160px]"
                        >
                            <option value="">Todas las Categorías</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <ButtonRefresh onClick={refresh} isLoading={loading} />

                        <ButtonAction
                            action={() => setIsModalOpen(true)}
                            text="+ Nuevo Producto"
                        />
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