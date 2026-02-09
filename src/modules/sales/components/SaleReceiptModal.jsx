import React from 'react';

const SaleReceiptModal = ({ data, allProducts: products = [], onClose }) => {
    if (!data || !data.ok || !data.result) return null;

    const { sale, items = [] } = data.result;

    const paymentMethodsES = {
        'cash': 'Efectivo',
        'card': 'Tarjeta',
        'transfer': 'Transferencia'
    };

    const getProductName = (productId) => {
        if (!products || products.length === 0) return `Producto #${productId}`;
        const product = products.find(p => p.id == productId);
        return product ? product.name : `Producto #${productId}`;
    };

    const totalIVA = (items || []).reduce((acc, item) => acc + (Number(item.tax_amount) || 0), 0);

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm p-0 sm:p-4">
            {/* Animación de entrada: sube desde el fondo en móvil, escala en desktop */}
            <div className="bg-white text-slate-900 w-full max-w-xl h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 print:h-auto print:shadow-none print:rounded-none">
                
                {/* 1. CABECERA FIJA - Optimizada para pulgares */}
                <div className="shrink-0 flex justify-between items-center px-6 py-4 bg-slate-50 border-b print:hidden">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">Éxito</span>
                    </div>
                    <div className="flex gap-3 sm:gap-4">
                        <button 
                            onClick={onClose} 
                            className="text-[10px] sm:text-xs font-bold text-slate-400 hover:text-black transition-colors uppercase py-2"
                        >
                            Cerrar
                        </button>
                        <button 
                            onClick={() => window.print()} 
                            className="bg-black text-white px-4 sm:px-6 py-2 rounded-xl text-[10px] sm:text-xs font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                        >
                            IMPRIMIR
                        </button>
                    </div>
                </div>

                {/* 2. CUERPO CON SCROLL - Paddings reducidos en móvil */}
                <div id="printable-ticket" className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans print:overflow-visible print:p-0 custom-scrollbar">
                    
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-black">POSSHOP</h1>
                        <p className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Comprobante Oficial</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8 text-[11px] sm:text-[12px] border-y border-slate-100 py-4">
                        <div>
                            <p className="text-slate-400 font-bold uppercase text-[8px] sm:text-[9px]">Factura No.</p>
                            <p className="font-black text-black leading-none">{sale?.sale_number}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 font-bold uppercase text-[8px] sm:text-[9px]">Fecha y Hora</p>
                            <p className="font-black text-black leading-none whitespace-nowrap">
                                {sale?.createdAt ? new Date(sale.createdAt).toLocaleDateString() : ''} <span className="text-[10px] text-slate-400 ml-1 font-medium">{sale?.createdAt ? new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                            </p>
                        </div>
                    </div>

                    {/* Tabla responsiva: ajusta tamaños de texto */}
                    <table className="w-full text-left mb-6 sm:mb-8 border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-900 text-[9px] sm:text-[10px] font-black uppercase text-slate-500">
                                <th className="py-2 pr-2">Descripción</th>
                                <th className="py-2 px-2 text-center">Cant</th>
                                <th className="py-2 pl-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map((item, index) => (
                                <tr key={index} className="text-xs sm:text-sm">
                                    <td className="py-3 sm:py-4 pr-2">
                                        <p className="font-bold text-black uppercase leading-tight text-[12px] sm:text-sm">
                                            {getProductName(item.product_id)}
                                        </p>
                                        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                                            ${Number(item.price).toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="py-3 sm:py-4 px-2 text-center font-bold text-slate-600">
                                        {item.quantity}
                                    </td>
                                    <td className="py-3 sm:py-4 pl-2 text-right font-black text-black">
                                        ${Number(item.subtotal).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Resumen Final */}
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 space-y-3">
                        <div className="flex justify-between text-[11px] sm:text-[12px] font-bold uppercase tracking-tight">
                            <span className="text-slate-400">Pago</span>
                            <span className="text-black">{paymentMethodsES[sale?.payment_method] || sale?.payment_method}</span>
                        </div>
                        <div className="flex justify-between text-[11px] sm:text-[12px] font-bold uppercase tracking-tight">
                            <span className="text-slate-400">IVA</span>
                            <span className="text-black">${totalIVA.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-2">
                            <span className="text-xs sm:text-sm font-black text-black uppercase">Total</span>
                            <span className="text-2xl sm:text-3xl font-black text-black tracking-tighter">
                                ${Number(sale?.total || 0).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 sm:mt-10 text-center pb-4">
                        <p className="text-[10px] sm:text-[11px] font-black italic text-slate-300 uppercase tracking-widest">
                            ¡Gracias por confiar en POSSHOP!
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #printable-ticket, #printable-ticket * { visibility: visible; }
                    #printable-ticket { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default SaleReceiptModal;