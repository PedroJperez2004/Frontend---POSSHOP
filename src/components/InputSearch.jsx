function InputSearch({ searchTerm, setSearchTerm, textPlaceholder }) {
    return (
        <input
            type="text"
            placeholder={textPlaceholder || 'Buscar...'}
            className="w-full bg-[#1E1E2F] border border-[#2C2C3E] rounded-lg py-2 pl-10 pr-4 text-[#F5F5F5] focus:border-[#FFC857] outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}

export default InputSearch