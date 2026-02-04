import { useState, useMemo, useCallback } from 'react';
import useCreateSales from "./useCreateSales";
import { useManagerProducts } from "../../products/hooks/useManagerProducts";
import { useManagerTaxes } from '../../products/hooks/useManagerTaxes';
import { useListSales } from './useListSales';
import { useListSalesItemsId } from './uselistSalesDetailsId';
import { useReverseSale } from './useReverseSale';

export const useManagerSales = () => {
    // 1. FUENTES DE DATOS (HOOKS EXTERNOS)
    const {
        allProductsRaw,
        loading: productsLoading,
        categories,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        refresh: refreshProducts
    } = useManagerProducts();

    const { allTaxes } = useManagerTaxes();



    const { sales: rawSales, loading: salesLoading, error: salesError, list: refreshSales } = useListSales();
    const { salesItems, loading: itemsLoading, list: listItems } = useListSalesItemsId();
    const { reverse, loading: isReversing, error: reverseError, setError: setReverseError } = useReverseSale();
    const { createSale, loading: isSubmitting, errors: createErrors, setErrors: setCreateError } = useCreateSales();

    // 2. ESTADOS LOCALES DE UI
    const [view, setView] = useState('products');
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [saleResult, setSaleResult] = useState(null);
    const [showConfirmPayment, setShowConfirmPayment] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [confirmReverse, setConfirmReverse] = useState({ isOpen: false, saleId: null });
    const [showOnlyReversed, setShowOnlyReversed] = useState(false);

    // --- 3. CAMBIO DE VISTA CON LIMPIEZA (FIX PARA EL ERROR DE REACT) ---
    const handleViewChange = (newView) => {
        setView(newView);
        setSearchTerm("");          // Limpia el input de búsqueda
        setShowOnlyReversed(false); // Resetea el filtro de solo reversas
    };

    // --- 4. LÓGICA DE FILTRADO DE PRODUCTOS ---
    const products = useMemo(() => {
        const data = allProductsRaw || [];
        return data.filter(p => {
            const matchesCategory = selectedCategory === "" || selectedCategory === "all" || String(p.id_category) === String(selectedCategory);
            const hasStock = Number(p.stock) > 0;

            if (view === 'products' && searchTerm) {
                const term = searchTerm.toLowerCase().trim();
                return matchesCategory && hasStock &&
                    (p.name.toLowerCase().includes(term) || p.categoryName?.toLowerCase().includes(term));
            }
            return matchesCategory && hasStock;
        });
    }, [allProductsRaw, selectedCategory, searchTerm, view]);

    // --- 5. LÓGICA DE FILTRADO DE VENTAS (MULTICRITERIO) ---
    const filteredSales = useMemo(() => {
        let data = rawSales || [];

        // Filtro rápido de reversas (botón)
        if (showOnlyReversed) {
            data = data.filter(s => s.status?.toLowerCase() === 'reversed');
        }

        // Filtro de búsqueda (ID, Número, Empleado, Fecha, Status)
        if (!searchTerm || searchTerm.trim() === "" || view !== 'history') {
            return data;
        }

        const term = searchTerm.toLowerCase().trim().replace('#', '');

        return data.filter(sale => {
            return (
                sale.id?.toString().includes(term) ||
                sale.sale_number?.toLowerCase().includes(term) ||
                sale.user_id?.toString().includes(term) ||
                sale.status?.toLowerCase().includes(term) || // 'reversed' != 'anulado'
                sale.createdAt?.toLowerCase().includes(term) ||
                sale.user?.name?.toLowerCase().includes(term)
            );
        });
    }, [rawSales, searchTerm, view, showOnlyReversed]);

    // --- 6. TOTALES Y CARRITO ---
    // const totals = useMemo(() => ({
    //     total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    //     itemsCount: cart.reduce((acc, item) => acc + item.quantity, 0)
    // }), [cart]);


    const totals = useMemo(() => {
        return cart.reduce((acc, item) => {
            // 1. Buscamos el producto original para obtener su id_tax
            const productData = allProductsRaw?.find(p => p.id === item.id);
            const taxId = productData?.id_tax;

            // 2. Buscamos el impuesto correspondiente
            const tax = allTaxes?.find(t => t.id === taxId);

            // 3. Extraemos valores (con fallback a 0 o false)
            const percentage = Number(tax?.percentage || 0);
            const isIncluded = tax?.included_in_price; // asumimos que viene como booleano

            const itemSubtotal = item.price * item.quantity;

            // 4. Calculamos el impuesto de este item
            // Si NO está incluido, calculamos cuánto hay que sumar
            const itemTaxTotal = !isIncluded
                ? (itemSubtotal * (percentage / 100))
                : 0;

            return {
                subtotal: acc.subtotal + itemSubtotal, // Suma de precios base
                totalTax: acc.totalTax + itemTaxTotal, // Suma de impuestos extra
                total: acc.total + itemSubtotal + itemTaxTotal, // Gran total
                itemsCount: acc.itemsCount + item.quantity
            };
        }, { subtotal: 0, totalTax: 0, total: 0, itemsCount: 0 });
    }, [cart, allProductsRaw, allTaxes]);


    const addToCart = useCallback((product) => {
        if (product.stock <= 0) return;
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) return prev;
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, {
                id: product.id, name: product.name, price: Number(product.price || 0), quantity: 1, stock: Number(product.stock)
            }];
        });
    }, []);

    // --- 7. OPERACIONES ---
    const executeSale = async () => {
        if (cart.length === 0) return;
        const res = await createSale({
            payment_method: paymentMethod,
            products: cart.map(i => ({ product_id: i.id, quantity: i.quantity }))
        });
        if (res?.ok) {
            setSaleResult(res);
            setCart([]);
            setShowConfirmPayment(false);
            await Promise.all([refreshProducts(), refreshSales()]);
        }
        return res;
    };

    const executeReverseSale = async () => {
        if (!confirmReverse.saleId) return;
        const res = await reverse(confirmReverse.saleId);
        if (res) {
            setConfirmReverse({ isOpen: false, saleId: null });
            await Promise.all([refreshProducts(), refreshSales()]);
        }
        return res;
    };

    return {
        // Data
        products,
        sales: filteredSales,
        categories: categories?.filter(cat => cat.active) || [],
        salesItems,

        // UI & Navigation (Usa handleViewChange para limpiar inputs)
        view,
        setView: handleViewChange,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        showOnlyReversed,
        setShowOnlyReversed,

        // Status
        loading: productsLoading || salesLoading,
        itemsLoading, isSubmitting, isReversing,
        errors: createErrors || salesError || reverseError,

        // Cart & Payment
        cart, totals, paymentMethod, setPaymentMethod,
        saleResult, showConfirmPayment, setShowConfirmPayment,
        isDetailsOpen, setIsDetailsOpen, selectedSale, confirmReverse, setConfirmReverse,

        // Handlers
        addToCart,
        updateQuantity: (id, delta) => {
            setCart(prev => prev.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)) } : item
            ));
        },
        removeFromCart: (id) => setCart(prev => prev.filter(i => i.id !== id)),
        clearCart: () => { setCart([]); setCreateError(null); },
        executeSale,
        executeReverseSale,
        openDetails: async (sale) => {
            setSelectedSale(sale);
            setIsDetailsOpen(true);
            await listItems(sale.id);
        },
        closeReverseModal: () => {
            setConfirmReverse({ isOpen: false, saleId: null });
            setReverseError(null);
        },
        handleCloseReceipt: () => {
            setSaleResult(null);
            setCreateError(null);
        },
        refresh: refreshProducts,
        refreshSales
    };
}
