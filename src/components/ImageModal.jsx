export default function ImageModal({ imageUrl, altText, onClose }) {
    if (!imageUrl) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12121B]/95 backdrop-blur-md p-2 md:p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div className="relative w-full max-w-4xl flex flex-col items-center">
                
                {/* Botón Cerrar: En desktop arriba, en móvil dentro o flotante */}
                <button 
                    className="absolute -top-10 right-0 md:-top-12 text-white/70 hover:text-[#FFC857] transition-colors flex items-center gap-2 font-bold uppercase text-[10px] md:text-xs bg-[#1E1E2F]/50 md:bg-transparent px-3 py-1 rounded-full md:p-0"
                    onClick={onClose}
                >
                    <span className="hidden xs:inline">Cerrar</span>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Contenedor de Imagen */}
                <div 
                    className="relative w-full flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img 
                        src={imageUrl} 
                        alt={altText} 
                        className="rounded-lg md:rounded-xl shadow-2xl border border-[#2C2C3E] object-contain max-h-[75vh] md:max-h-[80vh] w-auto animate-in zoom-in-95 duration-300"
                    />
                    
                    {/* Texto del pie de imagen */}
                    {altText && (
                        <p className="mt-4 px-4 text-center text-[#A0A0B0] text-[10px] md:text-sm font-medium italic uppercase tracking-widest line-clamp-2">
                            {altText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}