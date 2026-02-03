import React from 'react';

const CartItem = ({ item, onUpdate, onRemove }) => {
    return (
        <div className="bg-[#2C2C3E]/40 border border-[#3E3E52] p-3 rounded-xl flex items-center gap-3 group animate-in fade-in slide-in-from-right-4 duration-200">
            {/* Cantidad y Controles */}
            <div className="flex flex-col items-center bg-[#1E1E2F] rounded-lg border border-[#3E3E52] overflow-hidden">
                <button 
                    onClick={() => onUpdate(item.id, 1)}
                    className="p-1 hover:bg-[#FFC857] hover:text-[#1E1E2F] text-[#A0A0B0] transition-colors"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                </button>
                
                <span className="text-xs font-black text-[#FFC857] py-0.5">
                    {item.quantity}
                </span>
                
                <button 
                    onClick={() => onUpdate(item.id, -1)}
                    className="p-1 hover:bg-[#E74C3C] hover:text-white text-[#A0A0B0] transition-colors"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>

            {/* Info del Item */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#F5F5F5] truncate leading-none">
                    {item.name}
                </h4>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-[#A0A0B0] font-medium">
                        ${Number(item.price).toLocaleString()} c/u
                    </span>
                    <span className="text-sm font-black text-[#F5F5F5]">
                        ${(item.price * item.quantity).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Botón Eliminar */}
            <button 
                onClick={() => onRemove(item.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-[#A0A0B0] hover:text-[#E74C3C] transition-all"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};

export default CartItem;