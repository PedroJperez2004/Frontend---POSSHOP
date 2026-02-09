import React from 'react';

export default function DynamicCounter({
    count = 0,
    label = "Registros",
    loading = false,
    variant = "warning", // 'warning', 'success', 'danger', 'info'
    showPing = true
}) {
    // Diccionario de estilos por variante para no repetir código
    const variants = {
        warning: { bg: 'bg-[#FFC857]/10', border: 'border-[#FFC857]/20', text: 'text-[#FFC857]', dot: 'bg-[#FFC857]' },
        success: { bg: 'bg-[#27AE60]/10', border: 'border-[#27AE60]/20', text: 'text-[#27AE60]', dot: 'bg-[#27AE60]' },
        danger: { bg: 'bg-[#E74C3C]/10', border: 'border-[#E74C3C]/20', text: 'text-[#E74C3C]', dot: 'bg-[#E74C3C]' },
        info: { bg: 'bg-[#3498DB]/10', border: 'border-[#3498DB]/20', text: 'text-[#3498DB]', dot: 'bg-[#3498DB]' },
    };

    const style = variants[variant] || variants.warning;

    if (loading) {
        return (
            <div className="flex items-center gap-2 bg-[#2C2C3E]/30 border border-[#2C2C3E] px-2.5 py-1 rounded-full animate-pulse">
                <div className="h-1.5 w-1.5 rounded-full bg-[#A0A0B0]/40"></div>
                <div className="h-2.5 w-8 bg-[#A0A0B0]/20 rounded"></div>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all duration-300 ${style.bg} ${style.border}`}>
            {/* Punto de estado con Ping opcional */}
            <span className="relative flex h-1.5 w-1.5">
                {showPing && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`}></span>
                )}
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${style.dot}`}></span>
            </span>

            {/* Texto dinámico */}
            <div className="flex items-center gap-1.5 leading-none">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${style.text}`}>
                    {count}
                </span>
                <span className="text-[#A0A0B0] text-[9px] font-bold uppercase tracking-widest opacity-80">
                    {label}
                </span>
            </div>
        </div>
    );
}