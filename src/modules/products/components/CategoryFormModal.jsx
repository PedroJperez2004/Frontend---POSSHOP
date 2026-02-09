// export default function CategoryFormModal({
//     onClose,
//     onSubmit,
//     loading,
//     formError,
//     successMessage,
//     initialData
// }) {
//     const isEditing = !!initialData; // Modo edición si hay datos previos

//     const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
//     const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

//     // 1. VISTA DE ÉXITO (Mismo estilo que Users)
//     if (successMessage) {
//         return (
//             <div className="fixed inset-0 z-50 flex justify-end">
//                 <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-md" />
//                 <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col items-center justify-center p-10 text-center animate-in slide-in-from-right duration-300">
//                     <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center mb-6">
//                         <svg className="w-12 h-12 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                         </svg>
//                     </div>
//                     <h3 className="text-3xl font-black text-[#F5F5F5] mb-2">¡Listo!</h3>
//                     <p className="text-[#A0A0B0] text-lg mb-10">{String(successMessage)}</p>
//                     <button
//                         onClick={onClose}
//                         className="w-full py-4 bg-[#27AE60] text-[#F5F5F5] rounded-xl font-bold hover:bg-[#219150] transition-all"
//                     >
//                         Entendido
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // 2. VISTA DEL FORMULARIO LATERAL
//     return (
//         <div className="fixed inset-0 z-50 flex justify-end">
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-[#12121B]/70 backdrop-blur-sm" onClick={!loading ? onClose : null} />

//             <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col animate-in slide-in-from-right duration-300">

//                 {/* Header Dinámico */}
//                 <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20">
//                     <div>
//                         <h3 className="text-xl font-bold text-[#F5F5F5]">
//                             {isEditing ? "Editar Categoría" : "Nueva Categoría"}
//                         </h3>
//                         {isEditing && (
//                             <p className="text-[#FFC857] text-[10px] uppercase font-bold tracking-tighter">
//                                 Editando ID: {initialData.id}
//                             </p>
//                         )}
//                     </div>
//                     <button onClick={onClose} disabled={loading} className="text-[#A0A0B0] hover:text-[#F5F5F5]">
//                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>

//                 <form onSubmit={onSubmit} className="p-6 flex-1 overflow-y-auto space-y-6">
//                     {/* ALERTAS DE ERROR */}
//                     {formError && (
//                         <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-500">
//                             <span className="text-xs font-bold"> {formError}</span>
//                         </div>
//                     )}

//                     {/* Nombre de la Categoría */}
//                     <div>
//                         <label className={labelStyle}>Nombre de Categoría</label>
//                         <input
//                             name="name"
//                             defaultValue={initialData?.name || ""}
//                             type="text"
//                             placeholder="Ej: CALZADO DEPORTIVO"
//                             className={inputStyle}
//                             required
//                             disabled={loading}
//                         />
//                     </div>

//                     {/* Descripción */}
//                     <div>
//                         <label className={labelStyle}>Descripción</label>
//                         <textarea
//                             name="description"
//                             defaultValue={initialData?.description || ""}
//                             rows="4"
//                             placeholder="Describe los productos de esta categoría..."
//                             className={`${inputStyle} resize-none`}
//                             disabled={loading}
//                         />
//                     </div>

//                     {/* Botón de Acción Principal */}
//                     <div className="pt-4">
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${isEditing
//                                     ? "bg-[#27AE60] text-white hover:bg-[#219150]"
//                                     : "bg-[#FFC857] text-[#12121B] hover:bg-[#FFD57A]"
//                                 }`}
//                         >
//                             {loading ? (
//                                 <>
//                                     <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
//                                     <span>Procesando...</span>
//                                 </>
//                             ) : (
//                                 <span>{isEditing ? "Guardar Cambios" : "Crear Categoría"}</span>
//                             )}
//                         </button>
//                     </div>
//                 </form>

//                 {/* Footer / Cancelar */}
//                 <div className="p-6 border-t border-[#2C2C3E]">
//                     <button
//                         onClick={onClose}
//                         disabled={loading}
//                         className="w-full py-3 text-[#A0A0B0] font-bold hover:text-[#F5F5F5] transition-colors"
//                     >
//                         Cancelar
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


export default function CategoryFormModal({
    onClose,
    onSubmit,
    loading,
    formError,
    successMessage,
    initialData
}) {
    const isEditing = !!initialData;

    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

    // --- VISTA DE ÉXITO (Sincronizada con Users) ---
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
                    <h3 className="text-3xl font-black text-[#F5F5F5] mb-2 uppercase tracking-tighter">¡Listo!</h3>
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

    // --- FORMULARIO PRINCIPAL ---
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:flex-row lg:justify-end">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#12121B]/70 backdrop-blur-sm" onClick={!loading ? onClose : null} />

            <form 
                onSubmit={onSubmit} 
                className="relative w-full lg:max-w-md bg-[#1E1E2F] h-[92vh] lg:h-screen shadow-2xl border-t lg:border-t-0 lg:border-l border-[#2C2C3E] flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom lg:slide-in-from-right"
            >
                
                {/* Header */}
                <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-[#F5F5F5]">
                            {isEditing ? "Editar Categoría" : "Nueva Categoría"}
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
                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {formError && (
                        <div className="p-3 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] text-xs font-medium animate-pulse">
                            {formError}
                        </div>
                    )}

                    {/* Nombre de la Categoría */}
                    <div>
                        <label className={labelStyle}>Nombre de Categoría</label>
                        <input
                            name="name"
                            defaultValue={initialData?.name || ""}
                            type="text"
                            placeholder="Ej: CALZADO DEPORTIVO"
                            className={inputStyle}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className={labelStyle}>Descripción</label>
                        <textarea
                            name="description"
                            defaultValue={initialData?.description || ""}
                            rows="5"
                            placeholder="Describe los productos de esta categoría..."
                            className={`${inputStyle} resize-none`}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Footer - Fijo al final */}
                <div className="p-6 border-t border-[#2C2C3E] bg-[#1E1E2F] shrink-0">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 mb-3 ${
                            isEditing 
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
                            <span>{isEditing ? "Guardar Cambios" : "Crear Categoría"}</span>
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