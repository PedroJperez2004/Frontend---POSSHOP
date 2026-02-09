import TaxesList from './TaxesList.jsx';
import InputSearch from '../../../components/InputSearch.jsx';
import TaxFormModal from './TaxFormModal.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';
import { useManagerTaxes } from '../hooks/useManagerTaxes.js';
import DynamicCounter from '../../../components/DynamicCounter.jsx';

const Taxes = () => {
    const {
        taxes, loading, error, searchTerm, setSearchTerm, refresh,
        isModalOpen, setIsModalOpen, formError, onSubmitTax,
        successMessage, handleCloseModal, handleEditClick,
        taxToEdit, actionLoading, statusError, handleToggleStatus,
        handleDeleteClick, handleCancelConfirm, onConfirmToggle, confirmConfig
    } = useManagerTaxes();

    const { handleCopy, copiedId } = useHandleCopy();

    const isDeleteMode = confirmConfig.mode === 'delete';
    const taxName = confirmConfig.tax?.name || '';
    const isActive = confirmConfig.tax?.is_active;

    return (
        /* Reducimos padding global en móviles (p-4) */
        <div className="flex flex-col h-screen w-full p-4 sm:p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">
            
            <div className="flex flex-col h-full min-h-0 min-w-0">

                {/* --- ENCABEZADO: Espacios ultra-compactos --- */}
                <div className="shrink-0 mb-4 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                    <div className="space-y-0.5 sm:space-y-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] leading-none truncate">
                                Gestión de <span className="text-[#FFC857]">Impuestos</span>
                            </h2>

                            <div className="shrink-0">
                                <DynamicCounter
                                    count={taxes.length}
                                    label="Tasas"
                                    variant="warning"
                                    loading={loading}
                                />
                            </div>
                        </div>

                        <p className="text-[#A0A0B0] text-[11px] sm:text-xs leading-none truncate opacity-70">
                            Administra las tasas impositivas de tus productos
                        </p>
                    </div>

                    {/* Bloque de Herramientas: Buscador y Botones en una línea */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="flex-1 md:w-56">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar..."
                            />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <ButtonAction
                                action={() => setIsModalOpen(true)}
                                text="+ Nuevo"
                            />

                            <ButtonRefresh
                                onClick={refresh}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>

                {/* --- CONTENEDOR DE LA LISTA: Con fondo sutil para separar --- */}
                <div className="flex-1 min-h-0 bg-[#1E1E2F]/20 rounded-t-2xl sm:rounded-none overflow-hidden">
                    <TaxesList
                        taxes={taxes}
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

            {/* MODALES */}
            {isModalOpen && (
                <TaxFormModal
                    key={taxToEdit?.id || 'new-tax'}
                    initialData={taxToEdit}
                    onClose={handleCloseModal}
                    onSubmit={onSubmitTax}
                    loading={actionLoading}
                    error={formError}
                    successMessage={successMessage}
                />
            )}

            <ConfirmModal
                isOpen={confirmConfig.isOpen}
                title={isDeleteMode ? "Eliminar" : (isActive ? "Desactivar" : "Activar")}
                message={isDeleteMode
                    ? `¿Eliminar "${taxName}" permanentemente?`
                    : `¿Cambiar estado de "${taxName}"?`}
                variant={isDeleteMode ? "danger" : "warning"}
                loading={actionLoading}
                onConfirm={onConfirmToggle}
                onClose={handleCancelConfirm}
                error={statusError}
            />
        </div>
    );
}

export default Taxes;