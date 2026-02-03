export default function ButtonRefresh({ onClick, isLoading, title = "Actualizar lista" }) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="p-2 bg-[#1E1E2F] border border-[#2C2C3E] rounded-lg text-[#A0A0B0] hover:text-[#FFC857] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            title={title}
        >
            <svg
                className={`w-5 h-5 ${isLoading ? 'animate-spin text-[#FFC857]' : 'group-hover:scale-110 transition-transform'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
            </svg>
        </button>
    );
}