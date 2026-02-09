import { useManagerCategories } from '../hooks/useManagerCategories';
import CategoriesList from './CategoriesList';
import InputSearch from '../../../components/InputSearch.jsx';
import CategoryFormModal from './CategoryFormModal.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';
import DynamicCounter from '../../../components/DynamicCounter.jsx';
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

                {/* --- ENCABEZADO Y ACCIONES --- */}
                <div className="shrink-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                        {/* Título + Contador (Siempre en la misma línea) */}
                        <div className="flex items-center gap-3 flex-nowrap">
                            <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] leading-none truncate">
                                Gestión de <span className="text-[#FFC857]">Categorías</span>
                            </h2>

                            <div className="flex-shrink-0 mt-0.5">
                                <DynamicCounter
                                    count={categories.length}
                                    label="Tipos"
                                    variant="warning"
                                    loading={loading}
                                />
                            </div>
                        </div>

                        <p className="text-[#A0A0B0] text-xs md:text-sm leading-relaxed truncate">
                            Administra las categorías de productos de tu tienda
                        </p>
                    </div>

                    {/* Bloque de Herramientas */}
                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                        {/* Buscador: Flexible en móvil */}
                        <div className="relative flex-1 md:flex-none md:w-64">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar categorías..."
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex items-center gap-2">
                            <ButtonAction
                                action={() => setIsModalOpen(true)}
                                text={
                                    <span>
                                        + Nueva <span className="hidden md:inline">Categoría</span>
                                    </span>
                                }
                                className="text-[11px] md:text-sm font-black px-4 py-2.5"
                            />

                            <ButtonRefresh
                                onClick={refresh}
                                isLoading={loading}
                            />
                        </div>
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