export default function UserFormModal({ 
    onClose, 
    onSubmitRegister, 
    loading, 
    error, 
    successMessage, 
    initialData 
}) {
    const isEditing = !!initialData;
    
    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

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
            <div className="absolute inset-0 bg-[#12121B]/70 backdrop-blur-sm" onClick={!loading ? onClose : null} />

            {/* Cambiamos el <div> por <form> para que todo el contenido sea parte de la misma petición */}
            <form 
                onSubmit={onSubmitRegister} 
                className="relative w-full lg:max-w-md bg-[#1E1E2F] h-[92vh] lg:h-screen shadow-2xl border-t lg:border-t-0 lg:border-l border-[#2C2C3E] flex flex-col overflow-hidden transition-all duration-300"
            >
                
                {/* Header */}
                <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-[#F5F5F5]">
                            {isEditing ? "Editar Usuario" : "Registrar Usuario"}
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
                <div className="p-6 flex-1 overflow-y-auto space-y-5">
                    {error && (
                        <div className="p-3 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] text-xs font-medium animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Nombre</label>
                            <input name="firstName" defaultValue={initialData?.firstName || ""} type="text" className={inputStyle} required disabled={loading} />
                        </div>
                        <div>
                            <label className={labelStyle}>Apellido</label>
                            <input name="lastName" defaultValue={initialData?.lastName || ""} type="text" className={inputStyle} required disabled={loading} />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Nombre de Usuario</label>
                        <input name="userName" defaultValue={initialData?.userName || ""} type="text" className={inputStyle} required disabled={loading || isEditing} />
                        {isEditing && <span className="text-[9px] text-[#A0A0B0] ml-1 italic">* No modificable</span>}
                    </div>

                    <div>
                        <label className={labelStyle}>Email</label>
                        <input name="email" defaultValue={initialData?.email || ""} type="email" className={inputStyle} required disabled={loading} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Teléfono</label>
                            <input name="phone" defaultValue={initialData?.phone || ""} type="text" className={inputStyle} disabled={loading} />
                        </div>
                        <div>
                            <label className={labelStyle}>Rol de Usuario</label>
                            <select name="role" defaultValue={initialData?.role || "employee"} className={inputStyle} disabled={loading}>
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    {!isEditing && (
                        <div>
                            <label className={labelStyle}>Contraseña</label>
                            <input name="password" type="password" className={inputStyle} required={!isEditing} disabled={loading} />
                        </div>
                    )}
                </div>

                {/* Footer - Con el botón type="submit" dentro del <form> */}
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
                            <span>{isEditing ? "Guardar Cambios" : "Registrar Usuario"}</span>
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