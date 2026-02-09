const SaleDetailsModal = ({ 
    isOpen, 
    onClose, 
    items = [], 
    sale, 
    loading, 
    allProducts = [] 
}) => {
    if (!isOpen) return null;

    const getProductName = (productId) => {
        if (!allProducts || allProducts.length === 0) return `Producto #${productId}`;
        const product = allProducts.find(p => p.id == productId);
        return product ? product.name : `Producto #${productId}`;
    };

    const isReversed = sale?.status === 'reversed' || sale?.status !== 'completed';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-[#0F0F1A]/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#1E1E2F] border border-[#3E3E52] w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
                
                {/* --- HEADER --- */}
                <div className="p-4 sm:p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="flex flex-col items-center justify-center bg-[#FFC857] text-[#1E1E2F] px-3 py-1 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl font-black shadow-lg">
                            <span className="text-[8px] sm:text-[10px] leading-none opacity-70">ID</span>
                            <span className="text-sm sm:text-lg leading-none">{sale?.id}</span>
                        </div>
                        <div>
                            <h3 className="text-white font-black text-base sm:text-xl italic tracking-tight uppercase">
                                Detalle de <span className="text-[#FFC857]">Movimiento</span>
                            </h3>
                            <p className="text-[8px] sm:text-[10px] text-[#A0A0B0] uppercase tracking-[2px] sm:tracking-[3px] font-bold flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isReversed ? 'bg-orange-500' : 'bg-green-500'} animate-pulse`}></span>
                                TICKET: {sale?.sale_number || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#2C2C3E] text-[#A0A0B0] hover:text-white hover:bg-[#E74C3C] transition-all duration-300"
                    >
                        <span className="text-xl sm:text-2xl font-light">&times;</span>
                    </button>
                </div>

                {/* --- BODY --- */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-[#161625]/50">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 sm:py-32 gap-5">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 border-4 border-[#FFC857]/10 border-t-[#FFC857] rounded-full animate-spin"></div>
                            <p className="text-[#A0A0B0] text-[8px] sm:text-[10px] font-black tracking-[3px] sm:tracking-[5px] animate-pulse uppercase">Sincronizando...</p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-[#2C2C3E] overflow-hidden">
                            {/* Vista de Tabla (Escritorio) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-[10px] text-[#A0A0B0] uppercase bg-[#1E1E2F] italic">
                                            <th className="py-4 px-5 text-left font-black tracking-widest">Cant.</th>
                                            <th className="py-4 px-5 text-left font-black tracking-widest">Descripción</th>
                                            <th className="py-4 px-5 text-right font-black tracking-widest">P. Unitario</th>
                                            <th className="py-4 px-5 text-right font-black tracking-widest">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#2C2C3E]">
                                        {items.map((item) => (
                                            <tr key={item.id} className="group hover:bg-[#FFC857]/5 transition-colors">
                                                <td className="py-4 px-5 text-[#FFC857] font-black italic">{item.quantity}</td>
                                                <td className="py-4 px-5 text-white font-bold text-sm uppercase tracking-tight">
                                                    {getProductName(item.product_id)}
                                                </td>
                                                <td className="py-4 px-5 text-right text-[#A0A0B0] font-mono text-xs">
                                                    ${Number(item.price).toLocaleString('es-CO')}
                                                </td>
                                                <td className="py-4 px-5 text-right text-white font-black font-mono">
                                                    ${Number(item.subtotal).toLocaleString('es-CO')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Vista de Tarjetas (Móvil) */}
                            <div className="md:hidden divide-y divide-[#2C2C3E]">
                                {items.map((item) => (
                                    <div key={item.id} className="p-4 flex flex-col gap-2 hover:bg-[#FFC857]/5">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[#FFC857] font-black italic text-sm">{item.quantity}x</span>
                                            <span className="text-white font-black font-mono text-sm">${Number(item.subtotal).toLocaleString('es-CO')}</span>
                                        </div>
                                        <p className="text-white font-bold text-xs uppercase tracking-tight">
                                            {getProductName(item.product_id)}
                                        </p>
                                        <p className="text-[10px] text-[#A0A0B0] font-mono">
                                            Unit: ${Number(item.price).toLocaleString('es-CO')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* --- FOOTER --- */}
                <div className="p-4 sm:p-8 bg-[#1E1E2F] border-t border-[#2C2C3E] flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                    <div className="flex flex-col gap-3 w-full md:w-auto items-center md:items-start">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-[#A0A0B0] font-black uppercase tracking-tighter">Estado:</span>
                            <span className={`px-4 py-1 rounded-full text-[9px] font-black border tracking-widest ${
                                !isReversed 
                                ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                            }`}>
                                {!isReversed ? '✓ VENTA EXITOSA' : '↺ VENTA REVERSADA'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#2C2C3E]/30 p-4 rounded-2xl border border-[#3E3E52] w-full md:min-w-[200px] md:w-auto text-center md:text-right">
                        <p className="text-[10px] text-[#FFC857] font-black uppercase tracking-widest mb-1 italic">Total del Movimiento</p>
                        <p className="text-3xl sm:text-4xl font-black text-white font-mono leading-none tracking-tighter">
                            ${Number(sale?.total || 0).toLocaleString('es-CO')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleDetailsModal;