import { useMemo, useState } from 'react';
import { useListTaxes } from './useListTaxes';
import useUpdateStatusTaxes from './useUpdateStatusTaxes';
import useCreateTaxes from './useCreateTaxes';
import useUpdateTaxes from './useUpdateTaxes';
import useDeleteTaxes from './useDeleteTaxes';

export const useManagerTaxes = () => {
    //  Lista principal
    const { list, loading, error, setError, taxes } = useListTaxes();
    const [searchTerm, setSearchTerm] = useState("");

    //  Estados de UI
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [taxToEdit, setTaxToEdit] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    //  Configuración de confirmación con 'mode'
    const [confirmConfig, setConfirmConfig] = useState({
        isOpen: false,
        tax: null,
        mode: null // 'status' o 'delete'
    });

    //  Hook de eliminación
    const { deleteTax, error: deleteError, setError: setDeleteError } = useDeleteTaxes();

    // ➕ Hook de Creación
    const { create, error: createError, setError: setCreateError } = useCreateTaxes();

    //  Hook de Edición
    const { update, error: updateError, setError: setUpdateError } = useUpdateTaxes();

    //  Hook de cambio de Estado
    const { updateStatus, error: statusError, setError: setStatusError } = useUpdateStatusTaxes();

    //  Lógica de filtrado
    const activeTaxes = useMemo(() => taxes?.filter(t => t.is_active) || [], [taxes]);

    const filteredTaxes = useMemo(() => {
        if (!taxes) return [];
        const words = searchTerm.toLowerCase().trim().split(/\s+/);
        if (!words[0]) return taxes;

        return taxes.filter(tax => {
            const content = `${tax.id} ${tax.name} ${tax.percentage} ${tax.type}`.toLowerCase();
            return words.every(word => content.includes(word));
        });
    }, [searchTerm, taxes]);

    //  Manejadores de Modal Formulario
    const handleEditClick = (tax) => {
        setTaxToEdit(tax);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSuccessMessage(null);
        setTaxToEdit(null);
        if (setCreateError) setCreateError(null);
        if (setUpdateError) setUpdateError(null);
    };

    //  Manejadores de Confirmación
    const handleToggleStatus = (tax) => {
        setConfirmConfig({ isOpen: true, tax, mode: 'status' });
    };

    // 2️Nuevo manejador para eliminar
    const handleDeleteClick = (tax) => {
        setConfirmConfig({ isOpen: true, tax, mode: 'delete' });
    };

    const handleCancelConfirm = () => {
        setConfirmConfig({ isOpen: false, tax: null, mode: null });
        if (setStatusError) setStatusError(null);
        if (setDeleteError) setDeleteError(null);
    };

    //  Acción Unificada: Confirmar (Status o Delete)
    const onConfirmAction = async () => {
        const { tax, mode } = confirmConfig;
        if (!tax) return;

        setActionLoading(true);
        if (setStatusError) setStatusError(null);
        if (setDeleteError) setDeleteError(null);

        try {
            let response;
            if (mode === 'delete') {
                response = await deleteTax(tax.id);
            } else {
                response = await updateStatus(tax.id, tax.is_active);
            }

            if (response !== false) {
                await list();
                setConfirmConfig({ isOpen: false, tax: null, mode: null });
            }
        } catch (err) {
            console.error(`Error en acción ${mode}:`, err);
        } finally {
            setActionLoading(false);
        }
    };

    //  Acción: Enviar Formulario (Crear/Editar)
    const onSubmitTax = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const rawData = Object.fromEntries(formData.entries());

        const data = {
            name: rawData.name,
            percentage: Number(rawData.percentage),
            type: rawData.type || rawData.select_type_ignore,
            included_in_price: rawData.included_in_price === "on"
        };

        setActionLoading(true);
        setSuccessMessage(null);
        if (setCreateError) setCreateError(null);
        if (setUpdateError) setUpdateError(null);

        try {
            const response = taxToEdit
                ? await update(taxToEdit.id, data)
                : await create(data);

            if (response !== false) {
                await list();
                setSuccessMessage("¡Impuesto guardado con éxito!");
            }
        } catch (err) {
            console.error("Error crítico en el Manager:", err);
        } finally {
            setActionLoading(false);
        }
    };

    return {
        // Datos y búsqueda
        taxes: filteredTaxes,
        allTaxes: taxes,
        activeTaxes,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refresh: list,
        setError,

        // Modal Formulario
        isModalOpen,
        setIsModalOpen,
        taxToEdit,
        handleEditClick,
        handleCloseModal,
        onSubmitTax,
        formError: createError || updateError,

        // Modal Confirmación
        confirmConfig,
        handleToggleStatus,
        handleDeleteClick, // 👈 Exportado
        handleCancelConfirm,
        onConfirmToggle: onConfirmAction, // 👈 Acción unificada

        // Estado general
        actionLoading,
        successMessage,
        statusError: statusError || deleteError // 👈 Errores unificados
    };
};