import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
            onClick={() => onSelect('all')}
            className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all border shrink-0 ${selectedCategory === 'all' ? 'bg-[#FFC857] text-[#1E1E2F] border-[#FFC857]' : 'bg-[#1E1E2F] text-[#A0A0B0] border-[#2C2C3E]'}`}
        >
            TODOS
        </button>
        {categories.map(cat => (
            <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all border shrink-0 ${selectedCategory === cat.id ? 'bg-[#FFC857] text-[#1E1E2F] border-[#FFC857]' : 'bg-[#1E1E2F] text-[#A0A0B0] border-[#2C2C3E]'}`}
            >
                {cat.name.toUpperCase()}
            </button>
        ))}
    </div>
);

export default CategoryFilter;