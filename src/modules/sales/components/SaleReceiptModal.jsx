import React from 'react';

const SaleReceiptModal = ({ data, allProducts: products = [], onClose }) => {
    // Protección inicial: verificar que 'data' y 'data.result' existan
    if (!data || !data.ok || !data.result) return null;

    const { sale, items = [] } = data.result;

    const paymentMethodsES = {
        'cash': 'Efectivo',
        'card': 'Tarjeta',
        'transfer': 'Transferencia'
    };
    const getProductName = (productId) => {
        // Protección: Si products es undefined o nulo, o el find no devuelve nada
        if (!products || products.length === 0) return `Producto #${productId}`;
        
        // Usamos == para comparar por si el ID viene como string o número
        const product = products.find(p => p.id == productId);
        return product ? product.name : `Producto #${productId}`;
    };

    // Protección: Asegurar que items sea un arreglo antes del reduce
    const totalIVA = (items || []).reduce((acc, item) => acc + (Number(item.tax_amount) || 0), 0);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-white text-slate-900 w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden print:max-h-none print:shadow-none print:rounded-none">
                
                {/* 1. CABECERA FIJA */}
                <div className="flex justify-between items-center px-8 py-4 bg-slate-50 border-b print:hidden">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Venta Exitosa</span>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={onClose} 
                            className="text-xs font-bold text-slate-400 hover:text-black transition-colors uppercase"
                        >
                            Cerrar
                        </button>
                        <button 
                            onClick={() => window.print()} 
                            className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg"
                        >
                            IMPRIMIR FACTURA
                        </button>
                    </div>
                </div>

                {/* 2. CUERPO CON SCROLL */}
                <div id="printable-ticket" className="flex-1 overflow-y-auto p-10 font-sans print:overflow-visible print:p-0">
                    
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black tracking-tighter text-black">POSSHOP</h1>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Comprobante Oficial</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 text-[12px] border-y border-slate-100 py-4">
                        <div>
                            <p className="text-slate-400 font-bold uppercase text-[9px]">Factura No.</p>
                            <p className="font-black text-black leading-none">{sale?.sale_number}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 font-bold uppercase text-[9px]">Fecha y Hora</p>
                            <p className="font-black text-black leading-none">
                                {sale?.createdAt ? new Date(sale.createdAt).toLocaleDateString() : ''} {sale?.createdAt ? new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </p>
                        </div>
                    </div>

                    <table className="w-full text-left mb-8 border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-900 text-[10px] font-black uppercase text-slate-500">
                                <th className="py-2 pr-2">Descripción</th>
                                <th className="py-2 px-2 text-center">Cant</th>
                                <th className="py-2 pl-2 text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map((item, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="py-4 pr-2">
                                        <p className="font-bold text-black uppercase leading-tight">
                                            {getProductName(item.product_id)}
                                        </p>
                                        <p className="text-[11px] text-slate-400 font-medium">
                                            Unit: ${Number(item.price).toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="py-4 px-2 text-center font-bold text-slate-600">
                                        {item.quantity}
                                    </td>
                                    <td className="py-4 pl-2 text-right font-black text-black">
                                        ${Number(item.subtotal).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
                        <div className="flex justify-between text-[12px] font-bold uppercase tracking-tight">
                            <span className="text-slate-400">Método de Pago</span>
                            <span className="text-black">{paymentMethodsES[sale?.payment_method] || sale?.payment_method}</span>
                        </div>
                        <div className="flex justify-between text-[12px] font-bold uppercase tracking-tight">
                            <span className="text-slate-400">IVA Incluido</span>
                            <span className="text-black">${totalIVA.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-2">
                            <span className="text-sm font-black text-black uppercase">Total Pagado</span>
                            <span className="text-3xl font-black text-black tracking-tighter">
                                ${Number(sale?.total || 0).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-[11px] font-black italic text-slate-300 uppercase tracking-widest underline decoration-slate-200 decoration-2 underline-offset-4">
                            ¡Gracias por su compra en POSSHOP!
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
                        overflow: visible !important;
                    }
                    ::-webkit-scrollbar { display: none; }
                }
            `}</style>
        </div>
    );
};

export default SaleReceiptModal;