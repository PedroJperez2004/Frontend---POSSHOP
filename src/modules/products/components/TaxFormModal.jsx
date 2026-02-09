import { useState } from 'react';

export default function TaxFormModal({
    onClose,
    onSubmit,
    loading,
    error,
    successMessage,
    initialData
}) {
    const [selectedType, setSelectedType] = useState(initialData?.type || "iva");
    const isEditing = !!initialData;
    const isCustomType = !["iva", "exento", "retencion"].includes(selectedType) && isEditing;
    const [showCustomInput, setShowCustomInput] = useState(isCustomType);

    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setSelectedType(value);
        setShowCustomInput(value === "otro");
    };

    // --- VISTA DE ÉXITO ---
    if (successMessage) {
        return (
            <div className="fixed inset-0 z-50 flex justify-center lg:justify-end">
                <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-md" />
                <div className="relative w-full lg:max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col items-center justify-center p-10 text-center animate-in slide-in-from-right duration-300">
                    <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-[#F5F5F5] mb-2 uppercase tracking-tighter">¡Listo!</h3>
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
            <div className="relative w-full lg:max-w-md bg-[#1E1E2F] h-[92vh] lg:h-screen shadow-2xl border-t lg:border-t-0 lg:border-l border-[#2C2C3E] flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom lg:slide-in-from-right">
                
                {/* Header */}
                <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-[#F5F5F5]">{isEditing ? "Editar Impuesto" : "Nuevo Impuesto"}</h3>
                        <p className="text-[#FFC857] text-[10px] uppercase font-bold tracking-widest">
                            {isEditing ? `ID: ${initialData.id}` : "Configuración Fiscal"}
                        </p>
                    </div>
                    <button type="button" onClick={onClose} disabled={loading} className="text-[#A0A0B0] hover:text-[#F5F5F5] transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body - Scrollable */}
                <form onSubmit={onSubmit} className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                    {error && (
                        <div className="p-3 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] text-xs font-medium animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Nombre */}
                    <div>
                        <label className={labelStyle}>Nombre del Impuesto</label>
                        <input name="name" defaultValue={initialData?.name || ""} type="text" placeholder="Ej: IVA 19% (Incluido)" className={inputStyle} required disabled={loading} />
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
                    <div className="bg-[#12121B] border border-[#2C2C3E] rounded-xl p-4 flex items-center justify-between group transition-all hover:border-[#2C2C3E]/80">
                        <div className="max-w-[70%]">
                            <span className="text-[#F5F5F5] text-sm font-bold block">¿Incluido en el precio?</span>
                            <span className="text-[#A0A0B0] text-[10px] uppercase tracking-wider leading-tight">Activa si el PVP ya tiene este impuesto</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="included_in_price" defaultChecked={initialData?.included_in_price || false} className="sr-only peer" disabled={loading} />
                            <div className="w-11 h-6 bg-[#2C2C3E] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#27AE60] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#A0A0B0] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-white shadow-inner"></div>
                        </label>
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-[#2C2C3E] bg-[#1E1E2F] shrink-0">
                    <button
                        type="submit"
                        formTarget="_self" // Por si el submit está fuera del scope
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-lg ${
                            isEditing 
                            ? "bg-[#27AE60] text-white hover:bg-[#219150] shadow-[#27AE60]/10" 
                            : "bg-[#FFC857] text-[#12121B] hover:bg-[#FFD57A] shadow-[#FFC857]/10"
                        }`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (isEditing ? "Actualizar Impuesto" : "Crear Impuesto")}
                    </button>
                    
                    <button 
                        onClick={onClose} 
                        disabled={loading} 
                        className="w-full py-3 mt-2 text-[#A0A0B0] font-bold hover:text-[#F5F5F5] transition-colors uppercase text-[10px] tracking-widest"
                    >
                        Cancelar y volver
                    </button>
                </div>
            </div>
        </div>
    );
}