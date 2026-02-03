import { useLogout } from "../modules/user/hooks/useLogout.js";

export default function LogoutButton() {
    const { logOut, loading, error } = useLogout();

    const handleLogout = async () => {
        await logOut();
    };

    return (
        <div className="w-full">
            <button 
                onClick={handleLogout}
                disabled={loading}
                className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group
                    ${loading 
                        ? 'bg-[#2C2C3E] text-[#A0A0B0] cursor-not-allowed' 
                        : 'text-[#A0A0B0] hover:bg-[#E74C3C]/10 hover:text-[#E74C3C] hover:shadow-[0_0_10px_rgba(231,76,60,0.1)]'
                    }
                `}
            >
                {/* Lógica de Iconos */}
                {loading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                ) : (
                    // Icono de Puerta/Salida
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                )}

                <span className="tracking-wide">
                    {loading ? 'Cerrando...' : 'Cerrar sesión'}
                </span>
            </button>

            {/* Manejo de error discreto */}
            {error && (
                <div className="mt-2 text-xs text-[#E74C3C] text-center bg-[#E74C3C]/10 py-1 rounded border border-[#E74C3C]/20">
                    {error}
                </div>
            )}
        </div>
    );
}