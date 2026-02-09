// export default function LoginForm({ onSubmit, loading, error }) {
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-[#12121B] font-sans">
//             {/* FONDO PRINCIPAL: #12121B */}

//             <form
//                 onSubmit={onSubmit}
//                 className="w-full max-w-sm p-8 rounded-xl shadow-2xl flex flex-col gap-6
//                            bg-[#2C2C3E] border border-[#1E1E2F]"
//             >
//                 {/* TARJETA (SECUNDARIO): #2C2C3E 
//                     Borde sutil con el primario (#1E1E2F) para definición
//                 */}

//                 <div className="mb-2">
//                     <h2 className="text-2xl font-bold text-[#F5F5F5] text-center">
//                         Iniciar Sesión
//                     </h2>
//                     <p className="text-sm text-[#A0A0B0] text-center mt-1">
//                         Accede a tu panel de control
//                     </p>
//                 </div>

//                 <div className="space-y-5">
//                     {/* Input Email */}
//                     <div className="group">
//                         <label className="block text-xs font-bold text-[#A0A0B0] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#FFC857] transition-colors">
//                             Correo electrónico
//                         </label>
//                         <input
//                             name="email"
//                             placeholder="usuario@ejemplo.com"
//                             className="w-full px-4 py-3 rounded-lg bg-[#1E1E2F] text-[#F5F5F5] 
//                                        placeholder-[#A0A0B0]/50 border-2 border-transparent outline-none
//                                        transition-all duration-200
//                                        focus:border-[#FFC857] focus:shadow-[0_0_10px_rgba(255,200,87,0.1)]"
//                         />
//                         {/* INPUT:
//                            - Fondo: #1E1E2F (Principal) para contraste dentro de la tarjeta
//                            - Foco: Borde #FFC857 (Amarillo)
//                         */}
//                     </div>

//                     {/* Input Password */}
//                     <div className="group">
//                         <label className="block text-xs font-bold text-[#A0A0B0] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#FFC857] transition-colors">
//                             Contraseña
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="••••••••"
//                             className="w-full px-4 py-3 rounded-lg bg-[#1E1E2F] text-[#F5F5F5] 
//                                        placeholder-[#A0A0B0]/50 border-2 border-transparent outline-none
//                                        transition-all duration-200
//                                        focus:border-[#FFC857] focus:shadow-[0_0_10px_rgba(255,200,87,0.1)]"
//                         />
//                     </div>
//                 </div>

//                 {/* Mensaje de Error */}
//                 {/* LoginForm.jsx */}
//                 {error && (
//                     <div className="p-3 text-sm font-medium text-center rounded bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]/20 animate-in fade-in duration-300">
//                         {error}
//                     </div>
//                 )}
//                 {/* Botón Principal (Acento) */}
//                 <button
//                     disabled={loading}
//                     className={`w-full py-3.5 px-4 rounded-lg font-bold text-base transition-all duration-200 shadow-lg
//                         ${loading
//                             ? 'bg-[#A0A0B0] text-[#2C2C3E] cursor-not-allowed opacity-70'
//                             : 'bg-[#FFC857] text-[#12121B] hover:bg-[#FFD57A] hover:shadow-[0_4px_14px_rgba(255,200,87,0.3)] hover:-translate-y-0.5 active:translate-y-0'
//                         }
//                     `}
//                 >
//                     {/* BOTÓN:
//                        - bg-[#FFC857] (Amarillo)
//                        - text-[#12121B] (Negro) -> IMPORTANTE: Texto oscuro sobre amarillo para contraste accesible.
//                     */}
//                     {loading ? (
//                         <div className="flex items-center justify-center gap-2">
//                             <svg className="animate-spin h-5 w-5 text-[#12121B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
//                             </svg>
//                             <span>Procesando...</span>
//                         </div>
//                     ) : (
//                         'Acceder'
//                     )}
//                 </button>
//             </form>
//         </div>
//     )
// }

export default function LoginForm({ onSubmit, loading, error }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#12121B] font-sans p-4 sm:p-8">
            {/* Aumentamos el padding del fondo en pantallas medianas */}

            <form
                onSubmit={onSubmit}
                className="w-full max-w-sm md:max-w-lg p-8 md:p-14 rounded-xl shadow-2xl flex flex-col gap-8
                           bg-[#2C2C3E] border border-[#1E1E2F] transition-all duration-300"
            >
                {/* md:max-w-lg es el cambio clave para que sea notablemente más grande
                    md:p-14 y gap-8 separan más los elementos para un look premium */}

                <div className="mb-2">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#F5F5F5] text-center">
                        Iniciar Sesión
                    </h2>
                    <p className="text-sm md:text-lg text-[#A0A0B0] text-center mt-2">
                        Accede a tu panel de control
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Input Email */}
                    <div className="group">
                        <label className="block text-xs md:text-base font-bold text-[#A0A0B0] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#FFC857] transition-colors">
                            Correo electrónico
                        </label>
                        <input
                            name="email"
                            placeholder="usuario@ejemplo.com"
                            className="w-full px-5 py-3 md:py-5 rounded-lg bg-[#1E1E2F] text-[#F5F5F5] 
                                       placeholder-[#A0A0B0]/50 border-2 border-transparent outline-none
                                       transition-all duration-200 text-base md:text-lg
                                       focus:border-[#FFC857] focus:shadow-[0_0_15px_rgba(255,200,87,0.1)]"
                        />
                    </div>

                    {/* Input Password */}
                    <div className="group">
                        <label className="block text-xs md:text-base font-bold text-[#A0A0B0] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#FFC857] transition-colors">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-5 py-3 md:py-5 rounded-lg bg-[#1E1E2F] text-[#F5F5F5] 
                                       placeholder-[#A0A0B0]/50 border-2 border-transparent outline-none
                                       transition-all duration-200 text-base md:text-lg
                                       focus:border-[#FFC857] focus:shadow-[0_0_15px_rgba(255,200,87,0.1)]"
                        />
                    </div>
                </div>

                {/* Mensaje de Error */}
                {error && (
                    <div className="p-4 text-sm md:text-base font-medium text-center rounded bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]/20 animate-in fade-in duration-300">
                        {error}
                    </div>
                )}

                {/* Botón Principal */}
                <button
                    disabled={loading}
                    className={`w-full py-4 md:py-5 px-6 rounded-lg font-bold text-base md:text-xl transition-all duration-200 shadow-lg
                        ${loading
                            ? 'bg-[#A0A0B0] text-[#2C2C3E] cursor-not-allowed opacity-70'
                            : 'bg-[#FFC857] text-[#12121B] hover:bg-[#FFD57A] hover:shadow-[0_6px_20px_rgba(255,200,87,0.3)] hover:-translate-y-1 active:translate-y-0'
                        }
                    `}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-6 w-6 text-[#12121B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span>Procesando...</span>
                        </div>
                    ) : (
                        'Acceder'
                    )}
                </button>
            </form>
        </div>
    )
}