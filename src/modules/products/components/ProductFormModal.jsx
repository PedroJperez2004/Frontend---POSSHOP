import { useState } from "react";

export default function ProductFormModal({
    onClose,
    onSubmit,
    loading,
    error,
    successMessage,
    initialData,
    categories = [],
    taxes = []
}) {
    const isEditing = !!initialData;
    const [selectedImages, setSelectedImages] = useState([]);

    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    };

    // Pantalla de Éxito Responsiva
    if (successMessage) {
        return (
            <div className="fixed inset-0 z-50 flex justify-center lg:justify-end">
                <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-md" />
                <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col items-center justify-center p-10 text-center">
                    <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-[#F5F5F5] mb-2 uppercase">¡Listo!</h3>
                    <p className="text-[#A0A0B0] text-lg mb-10">{String(successMessage)}</p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-[#27AE60] text-[#F5F5F5] rounded-xl font-bold hover:bg-[#219150] transition-all uppercase tracking-widest"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:flex-row lg:justify-end">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#12121B]/70 backdrop-blur-sm" onClick={!loading ? onClose : null} />

            <form
                onSubmit={onSubmit}
                className="relative w-full lg:max-w-md bg-[#1E1E2F] h-[92vh] lg:h-screen shadow-2xl border-t lg:border-t-0 lg:border-l border-[#2C2C3E] flex flex-col overflow-hidden transition-all duration-300"
            >
                {/* Header */}
                <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-[#F5F5F5]">
                            {isEditing ? "Editar Producto" : "Nuevo Producto"}
                        </h3>
                        {isEditing && (
                            <p className="text-[#FFC857] text-[10px] uppercase font-bold tracking-tighter">
                                Editando ID: {initialData.id}
                            </p>
                        )}
                    </div>
                    <button type="button" onClick={onClose} disabled={loading} className="text-[#A0A0B0] hover:text-[#F5F5F5]">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 flex-1 overflow-y-auto space-y-5 custom-scrollbar">
                    {error && (
                        <div className="p-3 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] text-xs font-medium animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Nombre */}
                    <div>
                        <label className={labelStyle}>Nombre del Producto</label>
                        <input name="name" defaultValue={initialData?.name || ""} type="text" className={inputStyle} required placeholder="Ej. Zapatos Adidas" disabled={loading} />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className={labelStyle}>Descripción</label>
                        <textarea name="description" defaultValue={initialData?.description || ""} className={`${inputStyle} h-24 resize-none`} placeholder="Detalles del producto..." disabled={loading} />
                    </div>

                    {/* Precio y Stock Responsivo */}
                    <div className={`grid ${isEditing ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-4`}>
                        <div>
                            <label className={labelStyle}>Precio</label>
                            <input name="price" defaultValue={initialData?.price || ""} type="number" step="0.01" className={inputStyle} required placeholder="0.00" disabled={loading} />
                        </div>
                        {!isEditing && (
                            <div>
                                <label className={labelStyle}>Stock Inicial</label>
                                <input name="stock" type="number" className={inputStyle} placeholder="0" disabled={loading} />
                            </div>
                        )}
                    </div>

                    {/* Categoría e Impuesto Responsivo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Categoría</label>
                            <select name="id_category" defaultValue={initialData?.id_category || ""} className={inputStyle} required disabled={loading}>
                                <option value="" disabled>Seleccionar...</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>Impuesto</label>
                            <select name="id_tax" defaultValue={initialData?.id_tax || ""} className={inputStyle} required disabled={loading}>
                                <option value="" disabled>Seleccionar...</option>
                                {taxes?.map(tax => (
                                    <option key={tax.id} value={tax.id}>{tax.name} ({Number(tax.percentage)}%)</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Subida de Imágenes */}
                    <div>
                        <label className={labelStyle}>Imágenes del Producto</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#2C2C3E] border-dashed rounded-lg hover:border-[#FFC857]/50 transition-colors">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-10 w-10 text-[#A0A0B0]" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-[#A0A0B0] justify-center">
                                    <label className="relative cursor-pointer bg-transparent rounded-md font-bold text-[#FFC857] hover:text-[#e6b44e]">
                                        <span>Cargar archivos</span>
                                        <input name="images" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                                    </label>
                                </div>
                                <p className="text-[10px] text-[#A0A0B0]">PNG, JPG hasta 10MB</p>
                            </div>
                        </div>
                        {selectedImages.length > 0 && (
                            <div className="mt-2 text-[10px] text-[#27AE60] font-bold uppercase tracking-widest text-center">
                                {selectedImages.length} imágenes seleccionadas
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={labelStyle}>Texto Alternativo</label>
                        <input name="alt_text" defaultValue={initialData?.alt_text || "Imagen de producto"} type="text" className={inputStyle} disabled={loading} />
                    </div>
                </div>

                {/* Footer Responsivo */}
                <div className="p-6 border-t border-[#2C2C3E] bg-[#1E1E2F] shrink-0">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 mb-3 ${isEditing
                                ? "bg-[#27AE60] text-white hover:bg-[#219150]"
                                : "bg-[#FFC857] text-[#12121B] hover:bg-[#FFD57A]"
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                                <span>Procesando...</span>
                            </>
                        ) : (
                            <span>{isEditing ? "Guardar Cambios" : "Crear Producto"}</span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="w-full py-2 text-[#A0A0B0] font-bold hover:text-[#F5F5F5] transition-colors uppercase text-[10px] tracking-widest"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}