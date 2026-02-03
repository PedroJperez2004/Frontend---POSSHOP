import { useManagerCategories } from '../hooks/useManagerCategories';
import CategoriesList from './CategoriesList';
import InputSearch from '../../../components/InputSearch.jsx';
import CategoryFormModal from './CategoryFormModal.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';

const Categories = () => {
    const {
        categories,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refresh,
        isModalOpen,
        setIsModalOpen,
        actionLoading,
        formError,
        onSubmitCategory,
        successMessage,
        handleCloseModal,
        handleEditClick,
        categoryToEdit,
        confirmConfig,
        onConfirmToggle,
        handleToggleStatus,
        handleDeleteClick,
        statusError,
        handleCancelConfirm
    } = useManagerCategories();

    const { handleCopy, copiedId } = useHandleCopy();

    const isDeleteMode = confirmConfig.mode === 'delete';
    const categoryName = confirmConfig.category?.name || '';
    const isActive = confirmConfig.category?.active;

    return (
        /* Estructura coherente con Sales: Grid, Padding y h-screen */
        <div className="grid grid-cols-1 h-screen gap-6 p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">
            
            <div className="flex flex-col h-full min-h-0 min-w-0">
                
                {/* Encabezado Principal (Shrink-0 para que no se achique) */}
                <div className="shrink-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#F5F5F5]">
                            Gestión de <span className="text-[#FFC857]">Categorías</span>
                        </h2>
                        <p className="text-[#A0A0B0] text-sm">Administra las categorías de productos de tu tienda</p>
                    </div>

                    {/* Bloque de Acciones */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <InputSearch 
                                searchTerm={searchTerm} 
                                setSearchTerm={setSearchTerm} 
                                textPlaceholder={"Buscar por ID, Nombre..."} 
                            />
                        </div>

                        <ButtonRefresh
                            onClick={refresh}
                            isLoading={loading}
                        />

                        <ButtonAction
                            action={() => setIsModalOpen(true)}
                            text={'+ Nueva categoría'}
                        />
                    </div>
                </div>

                {/* Tabla de Categorías (Flex-1 para ocupar el resto de la pantalla) */}
                <div className="flex-1 min-h-0">
                    <CategoriesList
                        categories={categories}
                        loading={loading}
                        error={error}
                        onEdit={handleEditClick}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteClick}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                    />
                </div>
            </div>

            {/* --- MODALES --- */}
            {isModalOpen && (
                <CategoryFormModal
                    key={categoryToEdit?.id || 'new-category'}
                    initialData={categoryToEdit}
                    onClose={handleCloseModal}
                    onSubmit={onSubmitCategory}
                    loading={actionLoading}
                    formError={formError}
                    successMessage={successMessage}
                />
            )}

            <ConfirmModal
                isOpen={confirmConfig.isOpen}
                title={
                    isDeleteMode 
                    ? "Eliminar Categoría" 
                    : (isActive ? "Desactivar Categoría" : "Activar Categoría")
                }
                message={
                    isDeleteMode
                    ? `¿Estás seguro de que deseas eliminar permanentemente "${categoryName}"? Esta acción no se puede deshacer.`
                    : `¿Deseas cambiar el estado de la categoría "${categoryName}"?`
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

export default Categories;