import { useState } from 'react';

export default function TaxFormModal({
    onClose,
    onSubmit,
    loading,
    error,
    successMessage,
    initialData
}) {
    // Estado para manejar la selección del tipo
    const [selectedType, setSelectedType] = useState(initialData?.type || "iva");
    const isEditing = !!initialData;

    // Determinar si el tipo inicial es uno de los predefinidos o es "otro"
    const isCustomType = !["iva", "exento", "retencion"].includes(selectedType) && isEditing;
    const [showCustomInput, setShowCustomInput] = useState(isCustomType);

    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setSelectedType(value);
        setShowCustomInput(value === "otro");
    };

    if (successMessage) {
        // ... (Mantiene el mismo bloque de éxito que ya tienes)
        return (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-md" />
                <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col items-center justify-center p-10 text-center animate-in slide-in-from-right duration-300">
                    <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-[#F5F5F5] mb-2">¡Listo!</h3>
                    <p className="text-[#A0A0B0] text-lg mb-10">{String(successMessage)}</p>
                    <button onClick={onClose} className="w-full py-4 bg-[#27AE60] text-[#F5F5F5] rounded-xl font-bold hover:bg-[#219150] transition-all">Entendido</button>
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
                        <h3 className="text-xl font-bold text-[#F5F5F5]">{isEditing ? "Editar Impuesto" : "Nuevo Impuesto"}</h3>
                        {isEditing && <p className="text-[#FFC857] text-[10px] uppercase font-bold tracking-tighter">ID: {initialData.id}</p>}
                    </div>
                    <button onClick={onClose} disabled={loading} className="text-[#A0A0B0] hover:text-[#F5F5F5]">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6 flex-1 overflow-y-auto space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold">{error}</div>
                    )}

                    {/* Nombre */}
                    <div>
                        <label className={labelStyle}>Nombre del Impuesto</label>
                        <input name="name" defaultValue={initialData?.name || ""} type="text" placeholder="Ej: IVA 19%(Incluido)" className={inputStyle} required disabled={loading} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Porcentaje */}
                        <div>
                            <label className={labelStyle}>Porcentaje (%)</label>
                            <input name="percentage" defaultValue={initialData?.percentage || ""} type="number" step="0.01" placeholder="10" className={inputStyle} required disabled={loading} />
                        </div>

                        {/* Tipo Select */}
                        <div>
                            <label className={labelStyle}>Tipo</label>
                            <select
                                name={showCustomInput ? "select_type_ignore" : "type"}
                                value={showCustomInput ? "otro" : selectedType}
                                onChange={handleTypeChange}
                                className={inputStyle}
                                disabled={loading}
                            >
                                <option value="iva">IVA</option>
                                <option value="exento">Exento</option>
                                <option value="retencion">Retención</option>
                                <option value="otro">Otro...</option>
                            </select>
                        </div>
                    </div>

                    {/* Input condicional para "Otro" */}
                    {showCustomInput && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                            <label className={labelStyle}>Especificar Tipo</label>
                            <input
                                name="type"
                                defaultValue={isCustomType ? initialData.type : ""}
                                type="text"
                                placeholder="Escribe el tipo de impuesto..."
                                className={`${inputStyle} border-[#FFC857]/50`}
                                required
                                autoFocus
                                disabled={loading}
                            />
                        </div>
                    )}

                    {/* Incluido en el precio */}
                    <div className="bg-[#12121B] border border-[#2C2C3E] rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <span className="text-[#F5F5F5] text-sm font-bold block">¿Incluido en el precio?</span>
                            <span className="text-[#A0A0B0] text-[10px] uppercase tracking-wider">¿El impuesto ya está en el PVP?</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="included_in_price" defaultChecked={initialData?.included_in_price || false} className="sr-only peer" disabled={loading} />
                            <div className="w-11 h-6 bg-[#2C2C3E] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#27AE60] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#A0A0B0] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-white"></div>
                        </label>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${isEditing ? "bg-[#27AE60] text-white" : "bg-[#FFC857] text-[#12121B]"}`}>
                            {loading ? "Procesando..." : (isEditing ? "Actualizar Impuesto" : "Crear Impuesto")}
                        </button>
                    </div>
                </form>

                <div className="p-6 border-t border-[#2C2C3E]">
                    <button onClick={onClose} disabled={loading} className="w-full py-3 text-[#A0A0B0] font-bold">Cancelar</button>
                </div>
            </div>
        </div>
    );
}