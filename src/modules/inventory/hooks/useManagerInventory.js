import { useState, useMemo, useCallback } from 'react';
import { useListInventory } from './useListInventory,';
import { useManagerProducts } from "../../products/hooks/useManagerProducts";
import useCreateMovement from './useCreateMovement';

export const useManagerInventory = () => {
    // 1. FUENTES DE DATOS (API)
    const {
        inventory: rawMovements,
        loading: inventoryLoading,
        error: inventoryError,
        list: refreshInventory
    } = useListInventory();

    const { create, loading: creating, errors, setErrors } = useCreateMovement();

    const {
        allProductsRaw,
        loading: productsLoading,
        refresh: refreshProducts
    } = useManagerProducts();

    // 2. ESTADOS DE UI Y FILTRADO
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState('all'); // <--- El que agregamos
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const filteredMovements = useMemo(() => {
        let data = rawMovements || [];

        // 1. Tipo
        if (filterType !== "all") {
            data = data.filter(m => m.type?.toLowerCase() === filterType);
        }

        // 2. Producto (Blindado contra tipos de datos y nulos)
        if (selectedProduct !== "all") {
            data = data.filter(m => {
                const idEnMovimiento = m.product_id || m.product?.id;
                return idEnMovimiento && String(idEnMovimiento) === String(selectedProduct);
            });
        }

        // 3. Búsqueda
        if (!searchTerm || searchTerm.trim() === "") return data;

        const term = searchTerm.toLowerCase().trim();
        return data.filter(m => (
            m.id?.toString().includes(term) ||
            m.product?.name?.toLowerCase().includes(term) ||
            m.note?.toLowerCase().includes(term)
        ));
    }, [rawMovements, searchTerm, filterType, selectedProduct]);

    // 4. PRODUCTOS DISPONIBLES
    const availableProducts = useMemo(() => {
        if (!allProductsRaw) return [];
        return allProductsRaw.filter(p => p.is_active !== false);
    }, [allProductsRaw]);

    // 5. HANDLERS
    const handleRefreshAll = useCallback(async () => {
        await Promise.all([refreshInventory(), refreshProducts()]);
    }, [refreshInventory, refreshProducts]);

    const executeMovement = async (formData) => {
        setErrors(null);
        const result = await create(formData);
        if (result !== false) {
            setSuccessMessage(`Movimiento de stock registrado exitosamente.`);
            handleRefreshAll();
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSuccessMessage(null);
        setErrors(null);
    };

    return {
        // Data & Products
        movements: filteredMovements,
        products: availableProducts,

        // UI State & Filters
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        selectedProduct,       // <--- Retornamos estado
        setSelectedProduct,    // <--- Retornamos setter
        isFormOpen,
        successMessage,

        // Status
        loading: inventoryLoading || productsLoading || creating,
        error: inventoryError,
        formError: errors,

        // Handlers
        refresh: handleRefreshAll,
        openForm: () => setIsFormOpen(true),
        closeForm: handleCloseForm,
        executeMovement
    };
};