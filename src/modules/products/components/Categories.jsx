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
        categories, loading, error, searchTerm, setSearchTerm, refresh,
        isModalOpen, setIsModalOpen, actionLoading, formError,
        onSubmitCategory, successMessage, handleCloseModal, handleEditClick,
        categoryToEdit, confirmConfig, onConfirmToggle, handleToggleStatus,
        handleDeleteClick, statusError, handleCancelConfirm
    } = useManagerCategories();

    const { handleCopy, copiedId } = useHandleCopy();

    const isDeleteMode = confirmConfig.mode === 'delete';
    const categoryName = confirmConfig.category?.name || '';
    const isActive = confirmConfig.category?.active;

    return (
        /* Reducción de p-6 a p-4 en móvil para ganar ancho de pantalla */
        <div className="flex flex-col h-screen p-4 sm:p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">

            <div className="flex flex-col h-full min-h-0 min-w-0">

                {/* --- ENCABEZADO: Espacios reducidos --- */}
                <div className="shrink-0 mb-4 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                    <div className="space-y-0.5 sm:space-y-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] leading-none truncate">
                                Gestión de <span className="text-[#FFC857]">Categorías</span>
                            </h2>
                            <div className="shrink-0">
                                <DynamicCounter
                                    count={categories.length}
                                    label="Tipos"
                                    variant="warning"
                                    loading={loading}
                                />
                            </div>
                        </div>
                        <p className="text-[#A0A0B0] text-[11px] sm:text-sm leading-relaxed truncate opacity-70">
                            Administra las categorías de productos de tu tienda
                        </p>
                    </div>

                    {/* Bloque de Herramientas: Buscador y Botones en la misma línea en móvil */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="flex-1 md:w-64">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar..."
                            />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <ButtonAction
                                action={() => setIsModalOpen(true)}
                                text="+ Nueva"
                            />
                            <ButtonRefresh
                                onClick={refresh}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>

                {/* --- CONTENEDOR DE LA LISTA: Pegado visualmente al header --- */}
                <div className="flex-1 min-h-0 bg-[#1E1E2F]/20 rounded-t-2xl sm:rounded-none overflow-hidden">
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
                title={isDeleteMode ? "Eliminar" : (isActive ? "Desactivar" : "Activar")}
                message={
                    isDeleteMode
                        ? `¿Eliminar permanentemente "${categoryName}"?`
                        : `¿Cambiar estado de "${categoryName}"?`
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