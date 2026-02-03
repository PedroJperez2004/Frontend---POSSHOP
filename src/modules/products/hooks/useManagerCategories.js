import { useState, useMemo } from 'react';
import { useListCategories } from './useListCategories.js';
import useUpdateCategories from './useUpdateCategories.js';
import useCreateCategory from './useCreateCategories.js';
import useUpdateStatusCategories from './useUpdateStatusCategories.js';
import useDeleteCategories from './useDeleteCategories.js';

export const useManagerCategories = () => {
    // 📋 Lista principal
    const { categories, loading, error, list } = useListCategories();
    const [searchTerm, setSearchTerm] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);

    // 🗑️ Hook de Eliminación
    const {
        deleteCategory,
        error: deleteError,
        setError: setDeleteError,
        // loading: deleteLoading  //No se usó
    } = useDeleteCategories();

    // 🔄 Hook de cambio de Estado
    const { updateStatus, error: statusError, setError: setStatusError } = useUpdateStatusCategories();

    // ➕ Hook de Creación y 📝 Edición
    const { createCategory, error: createError, setError: setCreateError } = useCreateCategory();
    const { update, error: updateError, setError: setUpdateError } = useUpdateCategories();

    // 🪟 Estados de UI
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // Extendemos confirmConfig para manejar el tipo de acción
    const [confirmConfig, setConfirmConfig] = useState({
        isOpen: false,
        category: null,
        mode: 'status' // 'status' o 'delete'
    });

    const [categoryToEdit, setCategoryToEdit] = useState(null);

    // 🖱️ Manejadores de Modal de Formulario
    const handleEditClick = (category) => {
        setCategoryToEdit(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSuccessMessage(null);
        setCategoryToEdit(null);
        if (setCreateError) setCreateError(null);
        if (setUpdateError) setUpdateError(null);
    };

    // 🖱️ Manejadores de Modal de Confirmación
    const handleToggleStatus = (category) => {
        setConfirmConfig({ isOpen: true, category, mode: 'status' });
    };

    const handleDeleteClick = (category) => {
        setConfirmConfig({ isOpen: true, category, mode: 'delete' });
    };

    const handleCancelConfirm = () => {
        setConfirmConfig({ isOpen: false, category: null, mode: 'status' });
        if (setStatusError) setStatusError(null);
        if (setDeleteError) setDeleteError(null);
    };

    // 🔍 Lógica de filtrado
    const filteredCategories = useMemo(() => {
        const words = searchTerm.toLowerCase().trim().split(/\s+/);
        if (!words[0]) return categories;

        return categories.filter(cat => {
            const name = (cat.name || "").toLowerCase();
            const description = (cat.description || "").toLowerCase();
            const id = String(cat.id || "").toLowerCase();
            const content = `${id}${name} ${description}`;
            return words.every(word => content.includes(word));
        });
    }, [searchTerm, categories]);

    // 🚀 Acción: Confirmar (Status o Delete)
    const onConfirmAction = async () => {
        const { category, mode } = confirmConfig;
        if (!category) return;

        setActionLoading(true);
        try {
            let response;
            if (mode === 'delete') {
                response = await deleteCategory(category.id);
            } else {
                response = await updateStatus(category.id, category.active);
            }

            if (response !== false) {
                await list();
                setConfirmConfig({ isOpen: false, category: null, mode: 'status' });
                if (mode === 'delete') {
                    // Opcional: Mostrar mensaje de éxito tras borrar
                    console.log("Categoría eliminada");
                }
            }
        } finally {
            setActionLoading(false);
        }
    };

    // 🚀 Acción: Enviar Formulario
    const onSubmitCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setActionLoading(true);
        setSuccessMessage(null);
        try {
            const response = categoryToEdit
                ? await update(categoryToEdit.id, data)
                : await createCategory(data);

            if (response !== false) {
                await list();
                setSuccessMessage("¡Operación realizada con éxito!");
            }
        } finally {
            setActionLoading(false);
        }
    };

    return {
        categories: filteredCategories,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refresh: list,

        isModalOpen,
        setIsModalOpen,
        categoryToEdit,
        handleEditClick,
        handleCloseModal,
        onSubmitCategory,

        confirmConfig,
        handleToggleStatus,
        handleDeleteClick, // Nueva función expuesta
        handleCancelConfirm,
        onConfirmToggle: onConfirmAction, // Renombrado internamente pero mantenemos el nombre de salida

        actionLoading,
        successMessage,
        formError: createError || updateError,
        statusError: statusError || deleteError // Combinamos errores de confirmación
    };
};