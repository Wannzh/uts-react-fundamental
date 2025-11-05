import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center mt-8 gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors
                    ${currentPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-slate-700 hover:bg-gray-100'}`}
            >
                <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => onPageChange(index + 1)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === index + 1
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-700 hover:bg-gray-100'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors
                    ${currentPage === totalPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-slate-700 hover:bg-gray-100'}`}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default Pagination;
