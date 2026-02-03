const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-[#2C2C3E]/20 border-t border-[#2C2C3E]">
            <span className="text-[10px] text-[#A0A0B0] font-medium uppercase tracking-widest">
                Página {currentPage} de {totalPages}
            </span>
            <div className="flex gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-3 py-1.5 rounded-md bg-[#1E1E2F] text-[#FFC857] border border-[#2C2C3E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFC857] hover:text-[#1E1E2F] transition-all text-[10px] font-bold"
                >
                    ANTERIOR
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-3 py-1.5 rounded-md bg-[#1E1E2F] text-[#FFC857] border border-[#2C2C3E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFC857] hover:text-[#1E1E2F] transition-all text-[10px] font-bold"
                >
                    SIGUIENTE
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;