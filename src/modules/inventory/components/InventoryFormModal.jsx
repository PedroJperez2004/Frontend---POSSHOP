import { useState, useMemo, useRef } from 'react';

export default function InventoryFormModal({
    products = [],
    onClose,
    onSubmit,
    loading,
    formError,
    successMessage
}) {
    const [formData, setFormData] = useState({
        product_id: '',
        quantity: '',
        type: 'in',
        note: ''
    });


    const [searchProduct, setSearchProduct] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Referencia para saltar el foco automáticamente
    const quantityInputRef = useRef(null);

    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

    const filteredProducts = useMemo(() => {
        if (!products || formData.product_id) return [];

        const term = searchProduct.toLowerCase().trim();

        // Si no hay término, mostrar todos (o una cantidad mayor) para que haya scroll
        if (!term) return products;

        return products.filter(p =>
            p.name?.toLowerCase().includes(term) ||
            p.id?.toString().includes(term)
        );
        // Quitamos el .slice() o lo aumentamos a 25-30 para que el scroll funcione
    }, [products, searchProduct, formData.product_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.product_id || !formData.quantity || formData.quantity <= 0) return;

        onSubmit({
            ...formData,
            quantity: Number(formData.quantity)
        });
    };

    // VISTA DE ÉXITO (Con feedback de sincronización)
    if (successMessage) {
        return (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-md" />
                <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col items-center justify-center p-10 text-center animate-in slide-in-from-right duration-300">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#FFC857] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                            <svg className="w-4 h-4 text-[#12121B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-[#F5F5F5] mb-2">¡Sincronizado!</h3>
                    <p className="text-[#A0A0B0] text-lg mb-10">El movimiento fue registrado y el inventario se ha actualizado.</p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-[#27AE60] text-[#F5F5F5] rounded-xl font-bold hover:bg-[#219150] transition-all shadow-lg shadow-[#27AE60]/20"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-[#12121B]/70 backdrop-blur-sm" onClick={!loading ? onClose : null} />

            <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20">
                    <div>
                        <h3 className="text-xl font-bold text-[#F5F5F5]">Nuevo Movimiento</h3>
                        <p className="text-[#FFC857] text-[10px] uppercase font-bold tracking-widest">Ajuste de Stock</p>
                    </div>
                    <button onClick={onClose} disabled={loading} className="text-[#A0A0B0] hover:text-[#F5F5F5] transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                    {formError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold animate-pulse">
                            {typeof formError === 'string' ? formError : "Error en el servidor"}
                        </div>
                    )}

                    {/* Buscador de Producto con Dropdown */}
                    <div className="relative">
                        <label className={labelStyle}>Producto</label>
                        <div className="relative">
                            <input
                                type="text"
                                autoComplete="off"
                                value={searchProduct}
                                onFocus={() => setIsSearching(true)}
                                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                                onChange={(e) => {
                                    setSearchProduct(e.target.value);
                                    if (formData.product_id) setFormData(prev => ({ ...prev, product_id: '' }));
                                }}
                                placeholder="Buscar por nombre o ID..."
                                className={`${inputStyle} ${formData.product_id ? 'border-[#27AE60] bg-[#27AE60]/5' : ''}`}
                                disabled={loading}
                            />
                            <div className="absolute right-3 top-3.5 text-[#A0A0B0] pointer-events-none">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Dropdown de Resultados */}
                        {isSearching && !formData.product_id && (
                            <div className="absolute z-[100] w-full mt-1 bg-[#2C2C3E] border border-[#3A3A55] rounded-xl shadow-2xl p-1 animate-in fade-in slide-in-from-top-2 duration-200 
                            max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar">

                                {/* Cabecera pegajosa */}
                                <div className="sticky top-0 z-30 bg-[#2C2C3E] px-3 py-2 border-b border-[#3A3A55] mb-1">
                                    <span className="text-[9px] font-black text-[#FFC857] uppercase">Resultados sugeridos</span>
                                </div>

                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map(p => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, product_id: p.id }));
                                                setSearchProduct(p.name);
                                                setIsSearching(false);
                                                setTimeout(() => quantityInputRef.current?.focus(), 100);
                                            }}
                                            className="w-full px-4 py-3 hover:bg-[#FFC857] hover:text-[#12121B] text-left text-sm text-[#F5F5F5] flex justify-between items-center rounded-lg transition-all group mb-1 last:mb-0"
                                        >
                                            <div className="flex flex-col pr-4">
                                                <span className="font-bold truncate max-w-[200px]">{p.name}</span>
                                                <span className="text-[10px] opacity-60 group-hover:text-[#12121B]">ID: {p.id}</span>
                                            </div>
                                            <div className="bg-[#12121B]/40 px-2 py-1 rounded text-[10px] font-black group-hover:bg-[#12121B]/20 shrink-0">
                                                STOCK: {p.stock || 0}
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-[#A0A0B0] text-xs italic">
                                        No se encontraron productos
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Confirmación de Selección */}
                        {formData.product_id && (
                            <div className="mt-2 flex items-center justify-between bg-[#27AE60]/10 border border-[#27AE60]/20 p-2.5 rounded-lg animate-in zoom-in-95">
                                <div className="flex items-center gap-2 text-[#27AE60] text-[10px] font-black uppercase tracking-tighter">
                                    <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
                                    Producto Vinculado Correctamente
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, product_id: '' }));
                                        setSearchProduct('');
                                    }}
                                    className="text-[9px] font-bold text-[#E74C3C] uppercase hover:underline"
                                >
                                    Cambiar
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Selector Tipo Movimiento */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type: 'in' }))}
                            className={`py-4 rounded-xl border-2 font-black text-[10px] uppercase transition-all flex flex-col items-center gap-1 ${formData.type === 'in'
                                ? 'border-[#27AE60] bg-[#27AE60]/10 text-[#27AE60]'
                                : 'border-[#2C2C3E] text-[#A0A0B0] hover:border-[#3A3A55]'
                                }`}
                        >
                            <span className="text-lg">↑</span>
                            Entrada (+)
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type: 'out' }))}
                            className={`py-4 rounded-xl border-2 font-black text-[10px] uppercase transition-all flex flex-col items-center gap-1 ${formData.type === 'out'
                                ? 'border-[#E74C3C] bg-[#E74C3C]/10 text-[#E74C3C]'
                                : 'border-[#2C2C3E] text-[#A0A0B0] hover:border-[#3A3A55]'
                                }`}
                        >
                            <span className="text-lg">↓</span>
                            Salida (-)
                        </button>
                    </div>

                    {/* Cantidad */}
                    <div>
                        <label className={labelStyle}>Cantidad a mover</label>
                        <input
                            ref={quantityInputRef}
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                            className={inputStyle}
                            placeholder="Ej: 10"
                            required
                        />
                    </div>

                    {/* Nota */}
                    <div>
                        <label className={labelStyle}>Nota o Motivo</label>
                        <textarea
                            rows="3"
                            value={formData.note}
                            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="¿Por qué realizas este ajuste?"
                            className={`${inputStyle} resize-none`}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading || !formData.product_id || !formData.quantity}
                            className="w-full py-4 bg-[#FFC857] text-[#12121B] rounded-xl font-black text-xs uppercase hover:bg-[#FFD57A] shadow-lg shadow-[#FFC857]/10 transition-all disabled:opacity-50 disabled:grayscale flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-[#12121B] border-t-transparent rounded-full animate-spin" />
                            ) : "Confirmar Movimiento"}
                        </button>
                    </div>
                </form>

                <div className="p-6 border-t border-[#2C2C3E] bg-[#12121B]/20">
                    <button onClick={onClose} className="w-full py-3 text-[#A0A0B0] font-bold hover:text-[#F5F5F5] transition-colors text-sm">
                        Cancelar y cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}