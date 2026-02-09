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
    const quantityInputRef = useRef(null);

    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

    const filteredProducts = useMemo(() => {
        if (!products || formData.product_id) return [];
        const term = searchProduct.toLowerCase().trim();
        if (!term) return products;
        return products.filter(p =>
            p.name?.toLowerCase().includes(term) ||
            p.id?.toString().includes(term)
        );
    }, [products, searchProduct, formData.product_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.product_id || !formData.quantity || formData.quantity <= 0) return;
        onSubmit({
            ...formData,
            quantity: Number(formData.quantity)
        });
    };

    // --- VISTA DE ÉXITO ---
    if (successMessage) {
        return (
            <div className="fixed inset-0 z-50 flex justify-center lg:justify-end">
                <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-md" />
                <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col items-center justify-center p-10 text-center animate-in slide-in-from-right duration-300">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-[#F5F5F5] mb-2 uppercase tracking-tighter">¡Sincronizado!</h3>
                    <p className="text-[#A0A0B0] text-lg mb-10">{String(successMessage)}</p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-[#27AE60] text-[#F5F5F5] rounded-xl font-bold hover:bg-[#219150] transition-all uppercase tracking-widest shadow-lg shadow-[#27AE60]/20"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:flex-row lg:justify-end">
            {/* Overlay con blur */}
            <div className="absolute inset-0 bg-[#12121B]/70 backdrop-blur-sm" onClick={!loading ? onClose : null} />

            {/* Panel Principal Responsivo */}
            <form 
                onSubmit={handleSubmit}
                className="relative w-full lg:max-w-md bg-[#1E1E2F] h-[92vh] lg:h-screen shadow-2xl border-t lg:border-t-0 lg:border-l border-[#2C2C3E] flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom lg:slide-in-from-right"
            >
                {/* Header */}
                <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-[#F5F5F5]">Nuevo Movimiento</h3>
                        <p className="text-[#FFC857] text-[10px] uppercase font-bold tracking-widest">Ajuste de Stock</p>
                    </div>
                    <button type="button" onClick={onClose} disabled={loading} className="text-[#A0A0B0] hover:text-[#F5F5F5] transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                    {formError && (
                        <div className="p-3 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] text-xs font-medium animate-pulse">
                            {typeof formError === 'string' ? formError : "Error en el servidor"}
                        </div>
                    )}

                    {/* Buscador de Producto */}
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
                                required
                            />
                            <div className="absolute right-3 top-3.5 text-[#A0A0B0] pointer-events-none">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Dropdown de Resultados */}
                        {isSearching && !formData.product_id && (
                            <div className="absolute z-[100] w-full mt-1 bg-[#2C2C3E] border border-[#3A3A55] rounded-xl shadow-2xl p-1 max-h-[250px] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95">
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
                                                <span className="font-bold truncate max-w-[180px]">{p.name}</span>
                                                <span className="text-[10px] opacity-60 group-hover:text-[#12121B]">ID: {p.id}</span>
                                            </div>
                                            <div className="bg-[#12121B]/40 px-2 py-1 rounded text-[10px] font-black group-hover:bg-[#12121B]/20 shrink-0 uppercase">
                                                Stock: {p.stock || 0}
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-[#A0A0B0] text-xs italic">No hay resultados</div>
                                )}
                            </div>
                        )}

                        {formData.product_id && (
                            <div className="mt-2 flex items-center justify-between bg-[#27AE60]/10 border border-[#27AE60]/20 p-2.5 rounded-lg animate-in zoom-in-95">
                                <div className="flex items-center gap-2 text-[#27AE60] text-[10px] font-black uppercase tracking-tighter">
                                    <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
                                    Vinculado
                                </div>
                                <button type="button" onClick={() => { setFormData(prev => ({ ...prev, product_id: '' })); setSearchProduct(''); }} className="text-[9px] font-bold text-[#E74C3C] uppercase hover:underline">Cambiar</button>
                            </div>
                        )}
                    </div>

                    {/* Selector Tipo Movimiento */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type: 'in' }))}
                            className={`py-3 rounded-xl border-2 font-black text-[10px] uppercase transition-all flex flex-col items-center gap-1 ${formData.type === 'in' ? 'border-[#27AE60] bg-[#27AE60]/10 text-[#27AE60]' : 'border-[#2C2C3E] text-[#A0A0B0]'}`}
                        >
                            <span className="text-lg">↑</span> Entrada (+)
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type: 'out' }))}
                            className={`py-3 rounded-xl border-2 font-black text-[10px] uppercase transition-all flex flex-col items-center gap-1 ${formData.type === 'out' ? 'border-[#E74C3C] bg-[#E74C3C]/10 text-[#E74C3C]' : 'border-[#2C2C3E] text-[#A0A0B0]'}`}
                        >
                            <span className="text-lg">↓</span> Salida (-)
                        </button>
                    </div>

                    {/* Cantidad y Nota */}
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
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Nota o Motivo</label>
                        <textarea
                            rows="3"
                            value={formData.note}
                            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="¿Por qué realizas este ajuste?"
                            className={`${inputStyle} resize-none`}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Footer - Botón de Acción Principal */}
                <div className="p-6 border-t border-[#2C2C3E] bg-[#1E1E2F] shrink-0">
                    <button
                        type="submit"
                        disabled={loading || !formData.product_id || !formData.quantity}
                        className="w-full py-4 bg-[#FFC857] text-[#12121B] rounded-xl font-bold hover:bg-[#FFD57A] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale mb-3 uppercase tracking-widest text-xs"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-[#12121B] border-t-transparent rounded-full animate-spin" />
                        ) : "Confirmar Movimiento"}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={onClose} 
                        disabled={loading} 
                        className="w-full py-2 text-[#A0A0B0] font-bold hover:text-[#F5F5F5] transition-colors uppercase text-[10px] tracking-widest"
                    >
                        Cancelar y cerrar
                    </button>
                </div>
            </form>
        </div>
    );
}