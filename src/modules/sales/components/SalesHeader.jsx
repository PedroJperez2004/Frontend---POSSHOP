// import React from 'react';

// const SalesHeader = ({ m }) => {
//     return (
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1E1E2F] p-4 rounded-xl border border-[#2C2C3E] shadow-lg">
            
//             {/* Switche de Vista: Tienda / Historial */}
//             <div className="flex bg-[#12121B] p-1 rounded-lg border border-[#2C2C3E]">
//                 <button
//                     onClick={() => m.setView('products')}
//                     className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${
//                         m.view === 'products' ? 'bg-[#FFC857] text-[#12121B]' : 'text-[#A0A0B0] hover:text-white'
//                     }`}
//                 >
//                     Tienda
//                 </button>
//                 <button
//                     onClick={() => m.setView('history')}
//                     className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${
//                         m.view === 'history' ? 'bg-[#FFC857] text-[#12121B]' : 'text-[#A0A0B0] hover:text-white'
//                     }`}
//                 >
//                     Historial
//                 </button>
//             </div>

//             {/* Buscador y Controles */}
//             <div className="flex flex-1 w-full gap-3 items-center">
                
//                 {/* BOTÓN SOLO REVERSAS: Solo visible en Historial */}
//                 {m.view === 'history' && (
//                     <button
//                         onClick={() => m.setShowOnlyReversed(!m.showOnlyReversed)}
//                         className={`whitespace-nowrap px-4 py-2 rounded-lg text-[10px] font-black uppercase border transition-all duration-200 ${
//                             m.showOnlyReversed 
//                             ? 'bg-[#E74C3C] text-white border-[#E74C3C] shadow-[0_0_15px_rgba(231,76,60,0.3)]' 
//                             : 'bg-[#12121B] text-[#E74C3C] border-[#E74C3C]/30 hover:bg-[#E74C3C]/10'
//                         }`}
//                     >
//                         {m.showOnlyReversed ? '✕ Ver Todas' : 'Ver Reversas'}
//                     </button>
//                 )}

//                 {/* Buscador Principal */}
//                 <div className="relative flex-1">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0B0]">
//                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                     </span>
//                     <input
//                         type="text"
//                         value={m.searchTerm}
//                         onChange={(e) => m.setSearchTerm(e.target.value)}
//                         placeholder={m.view === 'products' ? "Buscar productos..." : "Buscar ticket, empleado, fecha..."}
//                         className="w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg pl-10 pr-4 py-2 text-xs focus:border-[#FFC857] focus:outline-none transition-colors text-[#F5F5F5]"
//                     />
//                 </div>

//                 {/* BOTÓN DE REFRESH: Siempre disponible */}
//                 <button
//                     onClick={() => {
//                         m.refresh(); // Actualiza productos
//                         if (m.refreshSales) m.refreshSales(); // Actualiza historial
//                     }}
//                     disabled={m.loading}
//                     className="p-2.5 bg-[#12121B] border border-[#2C2C3E] rounded-lg text-[#FFC857] hover:bg-[#FFC857] hover:text-[#12121B] transition-all disabled:opacity-50 disabled:animate-pulse"
//                     title="Sincronizar Datos"
//                 >
//                     <svg className={`w-4 h-4 ${m.loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                     </svg>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SalesHeader;


import React from 'react';

const SalesHeader = ({ m }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#1E1E2F]/80 backdrop-blur-md p-2.5 px-4 rounded-xl border border-[#2C2C3E] shadow-lg">
            
            {/* Switche de Vista: Más pequeño y compacto */}
            <div className="flex bg-[#12121B] p-0.5 rounded-lg border border-[#2C2C3E] shrink-0">
                <button
                    onClick={() => m.setView('products')}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${
                        m.view === 'products' ? 'bg-[#FFC857] text-[#12121B]' : 'text-[#A0A0B0] hover:text-white'
                    }`}
                >
                    Tienda
                </button>
                <button
                    onClick={() => m.setView('history')}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${
                        m.view === 'history' ? 'bg-[#FFC857] text-[#12121B]' : 'text-[#A0A0B0] hover:text-white'
                    }`}
                >
                    Historial
                </button>
            </div>

            {/* Controles: Buscador y Filtros */}
            <div className="flex flex-1 w-full sm:w-auto gap-2 items-center">
                
                {/* BOTÓN SOLO REVERSAS: Compactado con icono para ahorrar espacio */}
                {m.view === 'history' && (
                    <button
                        onClick={() => m.setShowOnlyReversed(!m.showOnlyReversed)}
                        className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg text-[9px] font-black uppercase border transition-all duration-200 ${
                            m.showOnlyReversed 
                            ? 'bg-[#E74C3C] text-white border-[#E74C3C]' 
                            : 'bg-[#12121B] text-[#E74C3C] border-[#E74C3C]/30 hover:bg-[#E74C3C]/10'
                        }`}
                        title={m.showOnlyReversed ? 'Ver Todas' : 'Filtrar Reversas'}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${m.showOnlyReversed ? 'bg-white animate-pulse' : 'bg-[#E74C3C]'}`}></span>
                        <span className="hidden xs:inline">{m.showOnlyReversed ? 'Ver Todas' : 'Reversas'}</span>
                    </button>
                )}

                {/* Buscador: Altura reducida */}
                <div className="relative flex-1 group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0B0] group-focus-within:text-[#FFC857] transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={m.searchTerm}
                        onChange={(e) => m.setSearchTerm(e.target.value)}
                        placeholder={m.view === 'products' ? "Buscar..." : "Ticket, fecha..."}
                        className="w-full bg-[#12121B] border border-[#2C2C3E] rounded-lg pl-9 pr-3 py-1.5 text-[11px] focus:border-[#FFC857]/50 focus:outline-none transition-all text-[#F5F5F5] placeholder:text-[#A0A0B0]/50"
                    />
                </div>

                {/* REFRESH: Botón más pequeño */}
                <button
                    onClick={() => {
                        m.refresh();
                        if (m.refreshSales) m.refreshSales();
                    }}
                    disabled={m.loading}
                    className="p-2 bg-[#12121B] border border-[#2C2C3E] rounded-lg text-[#FFC857] hover:border-[#FFC857]/50 active:scale-90 transition-all disabled:opacity-50"
                >
                    <svg className={`w-3.5 h-3.5 ${m.loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SalesHeader;