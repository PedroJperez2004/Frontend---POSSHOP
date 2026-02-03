export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, loading, error }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#12121B]/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-[#1E1E2F] border border-[#2C2C3E] rounded-2xl p-6 shadow-2xl scale-in-center">
                <div className="text-center">
                    {/* Icono de advertencia */}
                    <div className="w-16 h-16 bg-[#FFC857]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[#FFC857]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{title}</h3>
                    <p className="text-[#A0A0B0] text-sm mb-6">{message}</p>

                    {/* SECCIÓN DE ERROR: Fuera de los botones para no romper el layout */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-red-500 text-xs font-semibold leading-tight">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-[#A0A0B0] hover:bg-[#2C2C3E] transition-all disabled:opacity-30"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 py-3 px-4 rounded-xl font-bold bg-[#E74C3C] text-white hover:bg-[#C0392B] shadow-lg shadow-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Procesando...
                                </span>
                            ) : (
                                "Confirmar"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}