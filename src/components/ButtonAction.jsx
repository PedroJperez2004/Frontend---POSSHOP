
function ButtonAction({action, text}) {
    return (
        <button
            onClick={action} className="bg-[#FFC857] hover:bg-[#e6b44e] text-[#12121B] px-4 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap">
            {text}
        </button>
    )
}

export default ButtonAction