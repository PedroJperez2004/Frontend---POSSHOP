import UsersList from "./UsersList.jsx";
import UserFormModal from "./UserFormModal.jsx";
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import { useManagerUsers } from "../hooks/useManagerUsers.js";
import InputSearch from "../../../components/InputSearch.jsx";
import ButtonRefresh from "../../../components/ButtonRefresh.jsx";
import useHandleCopy from "../../../shared/hooks/useHandleCopy.js";
import ButtonAction from "../../../components/ButtonAction.jsx";

export default function Users() {
    const {
        list, users, listError, formError, searchTerm, setSearchTerm, actionLoading,
        listLoading, isModalOpen, setIsModalOpen, userToEdit, successMessage,
        confirmConfig, handleEditClick,
        handleCloseModal, handleToggleStatus, onConfirmToggle, onSubmitRegister, handleCancelConfirm
    } = useManagerUsers();

    const { handleCopy, copiedId } = useHandleCopy();

    return (
        /* Estructura Base: Grid de 1 columna, h-screen para control total y p-6 */
        <div className="grid grid-cols-1 h-screen gap-6 p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">

            <div className="flex flex-col h-full min-h-0 min-w-0">

                {/* Encabezado Principal */}
                <div className="shrink-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#F5F5F5]">
                            Gestión de <span className="text-[#FFC857]">Usuarios</span>
                        </h2>
                        <p className="text-[#A0A0B0] text-sm">Administra los accesos y roles de tu personal</p>
                    </div>

                    {/* Bloque de Acciones */}
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 md:flex-none">
                            {/* InputSearch ya suele incluir su icono, limpiamos el SVG manual para evitar duplicados */}
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar usuarios..."
                            />
                        </div>

                        <ButtonRefresh
                            onClick={list}
                            isLoading={listLoading}
                        />


                        <ButtonAction
                            action={() => setIsModalOpen(true)}
                            text="+ Nuevo Usuario" />
                    </div>
                </div>

                {/* Listado de Usuarios: flex-1 y min-h-0 para habilitar el scroll interno de UsersList */}
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

            <ConfirmModal
                isOpen={confirmConfig.isOpen}
                onClose={() => handleCancelConfirm()}
                onConfirm={onConfirmToggle}
                title={confirmConfig.user?.active ? "Desactivar Usuario" : "Activar Usuario"}
                message={`¿Estás seguro de que deseas cambiar el estado de "${confirmConfig.user?.userName}"?`}
                loading={actionLoading}
                variant="warning" // Para mantener la consistencia visual
            />
        </div>
    );
}