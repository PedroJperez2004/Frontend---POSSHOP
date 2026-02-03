export default function UserFormModal({ 
    onClose, 
    onSubmitRegister, 
    loading, 
    error, 
    successMessage, 
    initialData 
}) {
    const isEditing = !!initialData; // Si hay datos iniciales, activamos modo edición
    
    const inputStyle = "w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg p-3 text-[#F5F5F5] focus:border-[#FFC857] outline-none transition-all text-sm disabled:opacity-50";
    const labelStyle = "text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest ml-1 mb-1 block";

    // 1. VISTA DE ÉXITO (Cuando la operación termina bien)
    if (successMessage) {
        return (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-md" />
                <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col items-center justify-center p-10 text-center">
                    <div className="w-24 h-24 bg-[#27AE60]/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-[#F5F5F5] mb-2">¡Listo!</h3>
                    <p className="text-[#A0A0B0] text-lg mb-10">{String(successMessage)}</p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-[#27AE60] text-[#F5F5F5] rounded-xl font-bold hover:bg-[#219150] transition-all"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        );
    }

    // 2. VISTA DEL FORMULARIO
    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay: Cierra el modal al hacer click fuera, a menos que esté cargando */}
            <div className="absolute inset-0 bg-[#12121B]/70 backdrop-blur-sm" onClick={!loading ? onClose : null} />

            <div className="relative w-full max-w-md bg-[#1E1E2F] h-screen shadow-2xl border-l border-[#2C2C3E] flex flex-col">
                
                {/* Header Dinámico */}
                <div className="p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20">
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
                    <button onClick={onClose} disabled={loading} className="text-[#A0A0B0] hover:text-[#F5F5F5]">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={onSubmitRegister} className="p-6 flex-1 overflow-y-auto space-y-5">
                    {/* Alerta de Error */}
                    {error && (
                        <div className="p-3 rounded-lg bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] text-xs font-medium animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Nombres y Apellidos */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Nombre</label>
                            <input 
                                name="firstName" 
                                defaultValue={initialData?.firstName || ""} 
                                type="text" 
                                className={inputStyle} 
                                required 
                                disabled={loading} 
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Apellido</label>
                            <input 
                                name="lastName" 
                                defaultValue={initialData?.lastName || ""} 
                                type="text" 
                                className={inputStyle} 
                                required 
                                disabled={loading} 
                            />
                        </div>
                    </div>

                    {/* Username (Deshabilitado en edición) */}
                    <div>
                        <label className={labelStyle}>Nombre de Usuario</label>
                        <input 
                            name="userName" 
                            defaultValue={initialData?.userName || ""} 
                            type="text" 
                            className={inputStyle} 
                            required 
                            disabled={loading || isEditing} 
                        />
                        {isEditing && (
                            <span className="text-[9px] text-[#A0A0B0] ml-1 italic">
                                * El nombre de usuario no es modificable.
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className={labelStyle}>Email</label>
                        <input 
                            name="email" 
                            defaultValue={initialData?.email || ""} 
                            type="email" 
                            className={inputStyle} 
                            required 
                            disabled={loading} 
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className={labelStyle}>Teléfono</label>
                        <input 
                            name="phone" 
                            defaultValue={initialData?.phone || ""} 
                            type="text" 
                            className={inputStyle} 
                            disabled={loading} 
                        />
                    </div>

                    {/* Password: Solo se pide en registros nuevos */}
                    {!isEditing && (
                        <div>
                            <label className={labelStyle}>Contraseña</label>
                            <input 
                                name="password" 
                                type="password" 
                                className={inputStyle} 
                                required={!isEditing} 
                                disabled={loading} 
                            />
                        </div>
                    )}

                    {/* Rol */}
                    <div>
                        <label className={labelStyle}>Rol de Usuario</label>
                        <select 
                            name="role" 
                            defaultValue={initialData?.role || "employee"} 
                            className={inputStyle} 
                            disabled={loading}
                        >
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Botón de Acción Principal */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${
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
                    </div>
                </form>

                {/* Footer / Cancelar */}
                <div className="p-6 border-t border-[#2C2C3E]">
                    <button 
                        onClick={onClose} 
                        disabled={loading} 
                        className="w-full py-3 text-[#A0A0B0] font-bold hover:text-[#F5F5F5] transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}