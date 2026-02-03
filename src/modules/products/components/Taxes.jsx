import TaxesList from './TaxesList.jsx';
import InputSearch from '../../../components/InputSearch.jsx';
import TaxFormModal from './TaxFormModal.jsx';
import ButtonRefresh from '../../../components/ButtonRefresh.jsx';
import ConfirmModal from '../../../components/ConfirmModal.jsx'; 
import ButtonAction from '../../../components/ButtonAction.jsx';
import useHandleCopy from '../../../shared/hooks/useHandleCopy.js';
import { useManagerTaxes } from '../hooks/useManagerTaxes.js';


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
        /* CAMBIO VITAL: 
           1. h-screen: obliga al componente a no medir más que la pantalla.
           2. flex flex-col: para que los hijos se repartan el espacio vertical.
           3. overflow-hidden: para que nada se salga del marco principal.
        */
        <div className="flex flex-col h-screen w-full gap-6 p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">
            
            {/* Encabezado: shrink-0 para que no se achique */}
            <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#F5F5F5]">
                        Gestión de <span className="text-[#FFC857]">Impuestos</span>
                    </h2>
                    <p className="text-[#A0A0B0] text-sm">Administra las tasas impositivas de tus productos</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <InputSearch
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            textPlaceholder={"Buscar impuestos..."}
                        />
                    </div>
                    <ButtonRefresh onClick={refresh} isLoading={loading} />
                    <ButtonAction action={() => setIsModalOpen(true)} text="+ Nuevo Impuesto" />
                </div>
            </div>

            {/* CONTENEDOR DE LA LISTA: 
               flex-1: toma todo el espacio sobrante.
               min-h-0: evita que el flexbox se desborde si el contenido es grande.
            */}
            <div className="flex-1 min-h-0">
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
                title={isDeleteMode ? "Eliminar Impuesto" : (isActive ? "Desactivar Impuesto" : "Activar Impuesto")}
                message={isDeleteMode 
                    ? `¿Estás seguro de que deseas eliminar permanentemente el impuesto "${taxName}"?` 
                    : `¿Deseas ${isActive ? 'desactivar' : 'activar'} el impuesto "${taxName}"?`}
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