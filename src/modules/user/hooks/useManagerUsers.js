import { useState, useMemo } from "react";
import { useListUsers } from "./useListUsers.js";
import useRegisterUsers from "./useRegisterUsers.js";
import { useUpdateStatusUser } from "./useUpdateStatusUser.js";
import { useUpdateUser } from "./useUpdateUser.js";

export function useManagerUsers() {
    // 1. Hooks de Datos con desestructuración y alias 🖇️
    const { list, loading: listLoading, error: listError, users } = useListUsers();

    const {
        registerUser,
        loading: registerLoading,
        error: registerError,
        setError: setRegisterError
    } = useRegisterUsers();

    const {
        updateStatus,
        loading: statusLoading,
        error: statusError,
        setError: setStatusError
    } = useUpdateStatusUser();

    const {
        update,
        loading: updateLoading,
        error: updateError,
        setError: setUpdateError
    } = useUpdateUser();

    // 2. Estados de UI 🪟
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, user: null });

    // 3. Lógica de Filtrado 🔍
    const filteredUsers = useMemo(() => {
        const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
        if (searchWords.length === 0 || searchWords[0] === "") return users;

        return users.filter(user => {
            const fullInfo = `
                ${user.firstName || ""} 
                ${user.lastName || ""} 
                ${user.userName || ""} 
                ${user.id || ""}
                ${user.email || ""} 
                ${user.phone || ""}
            `.toLowerCase();
            return searchWords.every(word => fullInfo.includes(word));
        });
    }, [searchTerm, users]);

    // 4. Handlers de Modales 🖱️
    const handleEditClick = (user) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSuccessMessage(null);
        setUserToEdit(null);
        // Limpiamos errores al cerrar para que el modal abra "limpio" 🧹
        if (setRegisterError) setRegisterError(null);
        if (setUpdateError) setUpdateError(null);
    };

    const handleToggleStatus = (user) => {
        setConfirmConfig({ isOpen: true, user });
    };

    const handleCancelConfirm = () => {
        setConfirmConfig({ isOpen: false, user: null });
        if (setStatusError) setStatusError(null);
    };

    // 5. Acciones Asíncronas 🚀
    const onConfirmToggle = async () => {
        const { user } = confirmConfig;
        if (!user) return;

        const response = await updateStatus(user.id, user.active);
        if (response !== false) {
            await list();
            setConfirmConfig({ isOpen: false, user: null });
        }
    };

    const onSubmitRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setSuccessMessage(null);

        const response = userToEdit
            ? await update(userToEdit.id, data)
            : await registerUser(data);

        if (response !== false) {
            await list();
            setSuccessMessage("¡Operación realizada con éxito!");
        }
    };

    return {
        // Datos
        users: filteredUsers,
        list,

        // Estados de Carga Unificados ⏳
        listLoading,
        actionLoading: registerLoading || updateLoading || statusLoading,

        // Errores Unificados ⚠️
        listError,
        formError: registerError || updateError,
        statusError,

        // Búsqueda y Mensajes
        searchTerm,
        setSearchTerm,
        successMessage,

        // UI Control
        isModalOpen,
        userToEdit,
        confirmConfig,

        // Funciones
        handleEditClick,
        handleCloseModal,
        handleToggleStatus,
        handleCancelConfirm,
        onConfirmToggle,
        onSubmitRegister,
        setIsModalOpen
    };
}