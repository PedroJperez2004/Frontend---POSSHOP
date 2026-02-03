export default function ImageModal({ imageUrl, altText, onClose }) {
    if (!imageUrl) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12121B]/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={onClose} // Cerrar al hacer clic fuera
        >
            <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
                {/* Botón Cerrar */}
                <button 
                    className="absolute -top-12 right-0 text-white/70 hover:text-[#FFC857] transition-colors flex items-center gap-2 font-bold uppercase text-xs"
                    onClick={onClose}
                >
                    Cerrar
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Imagen Grande */}
                <img 
                    src={`http://localhost:3000${imageUrl}`} 
                    alt={altText} 
                    className="rounded-xl shadow-2xl border border-[#2C2C3E] object-contain max-h-[80vh] w-full animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()} // Evita que cierre al hacer clic en la imagen
                />
                
                <p className="mt-4 text-[#A0A0B0] text-sm font-medium italic uppercase tracking-widest">
                    {altText}
                </p>
            </div>
        </div>
    );
}