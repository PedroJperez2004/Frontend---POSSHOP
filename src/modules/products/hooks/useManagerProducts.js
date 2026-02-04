import { useState, useMemo } from 'react';
import { useListProducts } from "./useListProducts";
import useUpdateProducts from "./useUpdateProducts";
import useCreateProducts from "./useCreateProducts";
import { useListCategories } from "./useListCategories";
import useUpdateStatusProducts from "./useUpdateStatusProducts";
import { useListTaxes } from "./useListTaxes";
import useDeleteProducts from "./useDeleteProducts";

export const useManagerProducts = () => {
    const { products, loading: productsLoading, error, list } = useListProducts();
    const [searchTerm, setSearchTerm] = useState("");

    const { create, error: createError, setError: setCreateError } = useCreateProducts();
    const { update, error: updateError, setError: setUpdateError } = useUpdateProducts();
    const { deleteProduct, error: deleteError, setError: setDeleteError } = useDeleteProducts();

    const { categories, loading: categoriesLoading } = useListCategories();
    const { taxes, loading: taxesLoading } = useListTaxes();

    const [successMessage, setSuccessMessage] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [confirmConfig, setConfirmConfig] = useState({
        isOpen: false,
        product: null,
        mode: null // 'status' o 'delete'
    });

    const {
        updateStatus,
        error: statusError,
        setError: setStatusError
    } = useUpdateStatusProducts();

    // --- MANEJADORES DE UI ---
    const handleEditClick = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSuccessMessage(null);
        setProductToEdit(null);
        if (setCreateError) setCreateError(null);
        if (setUpdateError) setUpdateError(null);
    };

    const handleToggleStatus = (product) => {
        setConfirmConfig({ isOpen: true, product, mode: 'status' });
    };

    const handleDeleteClick = (product) => {
        setConfirmConfig({ isOpen: true, product, mode: 'delete' });
    };

    const handleCancelConfirm = () => {
        setConfirmConfig({ isOpen: false, product: null, mode: null });
        if (setStatusError) setStatusError(null);
        if (setDeleteError) setDeleteError(null);
    };

    // --- ACCIÓN UNIFICADA (CONFIRMAR STATUS O DELETE) ---
    const onConfirmAction = async () => {
        const { product, mode } = confirmConfig;
        if (!product) return;

        setActionLoading(true);
        if (setStatusError) setStatusError(null);
        if (setDeleteError) setDeleteError(null);

        try {
            let response;
            if (mode === 'delete') {
                response = await deleteProduct(product.id);
            } else {
                response = await updateStatus(product.id, product.active);
            }

            if (response !== false) {
                await list();
                setConfirmConfig({ isOpen: false, product: null, mode: null });
            }
        } catch (err) {
            console.error(`Error en acción ${mode}:`, err);
        } finally {
            setActionLoading(false);
        }
    };

    // 🔄 1. COMBINAR DATOS (CATEGORÍAS E IMPUESTOS)
    // Aquí es donde inyectamos 'taxName' y 'categoryName'
    const productsWithExtraInfo = useMemo(() => {
        if (!products) return [];

        return products.map(prod => {
            // Buscar la categoría correspondiente
            const category = categories?.find(cat => String(cat.id) === String(prod.id_category));

            // Buscar el impuesto correspondiente
            const tax = taxes?.find(t => String(t.id) === String(prod.id_tax));

            return {
                ...prod,
                categoryName: category ? category.name : "Sin Categoría",
                taxName: tax ? tax.name : "Sin Impuesto",
                taxRate: tax ? tax.rate : 0
            };
        });
    }, [products, categories, taxes]); // Dependencias completas

    // --- FILTRADO DE PRODUCTOS ---
    const filteredProducts = useMemo(() => {
        let result = productsWithExtraInfo;

        // Filtro por categoría
        if (selectedCategory && selectedCategory !== 'all') {
            result = result.filter(prod => String(prod.id_category) === String(selectedCategory));
        }

        // Filtro por búsqueda de texto
        const words = searchTerm.toLowerCase().trim().split(/\s+/);
        if (!words[0]) return result;

        return result.filter(prod => {
            // Incluimos taxName en el string de búsqueda
            const content = `${prod.id} ${prod.name} ${prod.description} ${prod.categoryName} ${prod.taxName}`.toLowerCase();
            return words.every(word => content.includes(word));
        });
    }, [searchTerm, productsWithExtraInfo, selectedCategory]);

    // --- SUBMIT FORMULARIO ---
    const onSubmitProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setActionLoading(true);
        setSuccessMessage(null);

        try {
            const response = productToEdit
                ? await update(productToEdit.id, formData)
                : await create(formData);

            if (response !== false) {
                await list();
                setSuccessMessage(productToEdit ? "¡Producto actualizado!" : "¡Producto creado!");
            }
        } catch (err) {
            console.error("Error crítico en el Manager:", err);
        } finally {
            setActionLoading(false);
        }
    };

    // Categorías e Impuestos activos para selectores/filtros
    const activeCategories = categories?.filter(cat => cat.active) || [];
    const activeTaxes = taxes?.filter(t => t.is_active) || [];

    return {
        products: filteredProducts,
        allProductsRaw: productsWithExtraInfo,
        taxes: activeTaxes,
        allTaxes: taxes, // Por si necesitas la lista completa
        categories,
        activeCategories,
        selectedCategory,
        setSelectedCategory,
        loading: productsLoading || categoriesLoading || taxesLoading,
        error,
        searchTerm,
        setSearchTerm,
        refresh: list,
        isModalOpen,
        setIsModalOpen,
        productToEdit,
        handleEditClick,
        handleCloseModal,
        onSubmitProduct,
        actionLoading,
        successMessage,
        formError: createError || updateError,

        // Manejo de Estados y Eliminación
        statusError: statusError || deleteError,
        handleToggleStatus,
        handleDeleteClick,
        handleCancelConfirm,
        onConfirmToggle: onConfirmAction,
        confirmConfig
    };
};