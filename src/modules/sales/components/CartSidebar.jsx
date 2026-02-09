import React from 'react';
import CartItem from './CartItem';

const CartSidebar = ({ m }) => (
    <div className="flex flex-col h-full w-full bg-[#1E1E2F] rounded-3xl border border-[#2C2C3E] shadow-xl overflow-hidden relative animate-in slide-in-from-right duration-500">

        {/* Overlay de Confirmación */}
        {m.showConfirmPayment && (
            <div className="absolute inset-0 z-50 bg-[#1E1E2F]/95 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center">
                <div className="mb-6 w-16 h-16 bg-[#FFC857]/10 rounded-full flex items-center justify-center text-[#FFC857] text-3xl font-black italic">!</div>
                <h3 className="text-xl font-black text-white mb-2">¿PROCESAR PAGO?</h3>
                <div className="flex flex-col w-full gap-3 mt-4">
                    <button onClick={m.executeSale} disabled={m.isSubmitting} className="w-full py-4 bg-[#27AE60] text-white font-black rounded-2xl hover:bg-[#219150] transition-colors">
                        {m.isSubmitting ? 'PROCESANDO...' : 'SÍ, FINALIZAR'}
                    </button>
                    <button onClick={() => m.setShowConfirmPayment(false)} className="w-full py-3 text-[#A0A0B0] text-[10px] font-black hover:text-white transition-colors">
                        CANCELAR
                    </button>
                </div>
            </div>
        )}

        {/* Header */}
        <div className="shrink-0 p-6 border-b border-[#2C2C3E] flex justify-between items-center bg-[#2C2C3E]/20">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => m.setView('products')}
                    className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#2C2C3E] text-[#FFC857] border border-[#3E3E52]"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span className="font-black tracking-[0.2em] text-[10px] text-[#FFC857]">CARRITO</span>
            </div>
            <span className="bg-[#2C2C3E] text-white px-3 py-1 rounded-lg text-[10px] font-bold italic">{m.cart.length} ITEMS</span>
        </div>

        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {m.cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                    <span className="text-5xl mb-4">🛒</span>
                    <p className="text-[10px] font-black uppercase tracking-[4px]">Vacío</p>
                </div>
            ) : (
                m.cart.map(item => (
                    <CartItem key={item.id} item={item} onUpdate={m.updateQuantity} onRemove={m.removeFromCart} />
                ))
            )}
        </div>

        {/* Footer - AJUSTE DE ALTURA AQUÍ (pb-12 para móvil, pb-6 para PC) */}
        <div className="shrink-0 p-6 pb-12 lg:pb-6 bg-[#161625] border-t border-[#2C2C3E] space-y-6">
            <div className="space-y-3">
                <span className="text-[10px] font-black text-[#A0A0B0] tracking-widest uppercase text-center block">Método de Pago</span>
                <div className="grid grid-cols-3 gap-2">
                    {['cash', 'card', 'transfer'].map(method => (
                        <button
                            key={method}
                            onClick={() => m.setPaymentMethod(method)}
                            className={`py-3 rounded-xl text-[9px] font-black border transition-all ${m.paymentMethod === method ? 'bg-[#FFC857] text-[#1E1E2F] border-[#FFC857]' : 'bg-[#1E1E2F] text-[#A0A0B0] border-[#3E3E52]'}`}
                        >
                            {method === 'cash' ? 'EFECTIVO' : method === 'card' ? 'TARJETA' : 'TRANSF.'}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="flex justify-between items-end border-t border-[#3E3E52] pt-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#A0A0B0] uppercase">Total Neto</span>
                    <span className="text-3xl font-black text-[#FFC857] leading-none">${m.totals.total.toLocaleString()}</span>
                </div>
            </div>

            <button 
                onClick={() => m.setShowConfirmPayment(true)} 
                disabled={m.cart.length === 0} 
                className="w-full py-5 rounded-2xl bg-[#27AE60] text-white font-black uppercase tracking-widest shadow-xl disabled:opacity-20 hover:bg-[#219150] transition-all active:scale-[0.98]"
            >
                PROCESAR COBRO
            </button>
        </div>
    </div>
);

export default CartSidebar;