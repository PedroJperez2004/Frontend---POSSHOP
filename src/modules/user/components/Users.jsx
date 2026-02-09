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
        list, users, listError, formError, searchTerm, setSearchTerm,
        actionLoading, listLoading, isModalOpen, setIsModalOpen,
        userToEdit, successMessage, confirmConfig, handleEditClick,
        handleCloseModal, handleToggleStatus, onConfirmToggle,
        onSubmitRegister, handleCancelConfirm
    } = useManagerUsers();

    const { handleCopy, copiedId } = useHandleCopy();

    return (
        /* Reducimos el p-6 a p-4 en móvil para ganar ancho */
        <div className="flex flex-col h-screen p-4 sm:p-6 overflow-hidden box-border font-sans text-[#F5F5F5] bg-[#12121B]">

            <div className="flex flex-col h-full min-h-0 min-w-0">

                {/* --- ENCABEZADO: Más apretadito en móvil (gap-2) --- */}
                <div className="shrink-0 mb-4 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                    <div className="space-y-0.5 sm:space-y-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] leading-none">
                                Gestión de <span className="text-[#FFC857]">Usuarios</span>
                            </h2>
                            <div className="flex items-center">
                                <DynamicCounter
                                    count={users.length}
                                    label="Users"
                                    variant="warning"
                                    loading={listLoading}
                                />
                            </div>
                        </div>
                        <p className="text-[#A0A0B0] text-[12px] sm:text-sm leading-relaxed opacity-70">
                            Administra accesos y roles de tu personal
                        </p>
                    </div>

                    {/* Bloque de Herramientas: Grid de 2 columnas en móvil para que el buscador sea ancho */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <InputSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                textPlaceholder="Buscar..."
                            />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            {/* Botón "+" más compacto en móvil si es necesario */}
                            <ButtonAction
                                action={() => setIsModalOpen(true)}
                                text="+ Nuevo"
                            />
                            <ButtonRefresh
                                onClick={list}
                                isLoading={listLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* --- CONTENEDOR DE LA LISTA: Sin margen superior extra para que pegue al header --- */}
                <div className="flex-1 min-h-0 bg-[#1E1E2F]/30 rounded-t-2xl sm:rounded-none">
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

            {/* Modales */}
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
                message={`¿Cambiar estado de "${confirmConfig.user?.userName}"?`}
                loading={actionLoading}
                variant="warning"
            />
        </div>
    );
}