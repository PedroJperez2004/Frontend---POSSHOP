import UsersList from "./UsersList.jsx";
import UserFormModal from "./UserFormModal.jsx";
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import { useManagerUsers } from "../hooks/useManagerUsers.js";
import InputSearch from "../../../components/InputSearch.jsx";
import ButtonRefresh from "../../../components/ButtonRefresh.jsx";
import useHandleCopy from "../../../shared/hooks/useHandleCopy.js";
import ButtonAction from "../../../components/ButtonAction.jsx";
import DynamicCounter from "../../../components/DynamicCounter.jsx";
export default function Users() {
    const {
        list,
        users,
        listError,
        formError,
        searchTerm,
        setSearchTerm,
        actionLoading,
        listLoading,
        isModalOpen,
        setIsModalOpen,
        userToEdit,
        successMessage,
        confirmConfig,
        handleEditClick,
        handleCloseModal,
        handleToggleStatus,
        onConfirmToggle,
        onSubmitRegister,
        handleCancelConfirm
    } = useManagerUsers();

    const { handleCopy, copiedId } = useHandleCopy();


    return (
        /* Contenedor principal con grid de una columna y h-screen para evitar scroll global */
        <div className="grid grid-cols-1 h-screen gap-6 p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">

            <div className="flex flex-col h-full min-h-0 min-w-0">

                {/* --- ENCABEZADO Y ACCIONES --- */}
                <div className="shrink-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        {/* Contenedor del Título + Badge */}
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-2xl font-bold text-[#F5F5F5] leading-none">
                                Gestión de <span className="text-[#FFC857]">Usuarios</span>
                            </h2>

                            {/* Envolvemos el DynamicCounter en un div para control fino de alineación vertical */}
                            <div className="flex items-center mt-0.5">
                                <DynamicCounter
                                    count={users.length}
                                    label="Usuarios"
                                    variant="warning"
                                    loading={listLoading}
                                />
                            </div>
                        </div>

                        <p className="text-[#A0A0B0] text-sm leading-relaxed">
                            Administra los accesos y roles de tu personal
                        </p>
                    </div>

                    {/* Bloque de Herramientas (Search, Refresh, Add) */}
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 md:flex-none">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar usuarios..."
                            />
                        </div>

                        <ButtonAction
                            action={() => setIsModalOpen(true)}
                            text="+ Nuevo Usuario"
                        />
                        <ButtonRefresh
                            onClick={list}
                            isLoading={listLoading}
                        />
                    </div>
                </div>

                {/* --- CONTENEDOR DE LA LISTA --- */}
                {/* flex-1 y min-h-0 son vitales para que el scroll interno funcione */}
                <div className="flex-1 min-h-0">
                    <UsersList
                        users={users}
                        loading={listLoading}
                        error={listError}
                        onEdit={handleEditClick}
                        onToggleStatus={handleToggleStatus}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                    />
                </div>
            </div>

            {/* --- MODALES --- */}

            {/* Modal de Formulario (Crear/Editar) */}
            {isModalOpen && (
                <UserFormModal
                    key={userToEdit?.id || 'new-user'}
                    initialData={userToEdit}
                    onClose={handleCloseModal}
                    onSubmitRegister={onSubmitRegister}
                    error={formError}
                    loading={actionLoading}
                    successMessage={successMessage}
                />
            )}

            {/* Modal de Confirmación para Cambio de Estado */}
            <ConfirmModal
                isOpen={confirmConfig.isOpen}
                onClose={() => handleCancelConfirm()}
                onConfirm={onConfirmToggle}
                title={confirmConfig.user?.active ? "Desactivar Usuario" : "Activar Usuario"}
                message={`¿Estás seguro de que deseas cambiar el estado de "${confirmConfig.user?.userName}"?`}
                loading={actionLoading}
                variant="warning"
            />
        </div>
    );
}