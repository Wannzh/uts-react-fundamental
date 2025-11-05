import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ cartCount, onToggleCart, onCategoryChange, onClearFilters, onSearchChange }) => {
    const navItems = ["Store", "Mac", "iPad", "iPhone", "Watch", "Support"];
    const [showSearch, setShowSearch] = useState(false);
    const [localQuery, setLocalQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (showSearch && inputRef.current) inputRef.current.focus();
    }, [showSearch]);

    const handleNavClick = (item, e) => {
        e.preventDefault();
        if (item === 'Store') {
            onClearFilters && onClearFilters();
        } else {
            onCategoryChange && onCategoryChange(item);
        }
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        onClearFilters && onClearFilters();
    };

    const handleSearchToggle = (e) => {
        e.preventDefault();
        setShowSearch(s => !s);
        if (showSearch) {
            setLocalQuery('');
            onSearchChange && onSearchChange('');
        }
    };

    const handleInputChange = (e) => {
        setLocalQuery(e.target.value);
    };

    // debounce localQuery -> onSearchChange
    useEffect(() => {
        const id = setTimeout(() => {
            onSearchChange && onSearchChange(localQuery);
        }, 250);
        return () => clearTimeout(id);
    }, [localQuery, onSearchChange]);

    return (
        <header className="bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <nav className="container mx-auto px-6 h-12 flex justify-between items-center">

                {/* Kiri: Logo & Nama Toko */}
                <div className="flex items-center space-x-3">
                    <a href="#" onClick={handleLogoClick} className="flex items-center space-x-3">
                        <svg
                            className="w-5 h-5 text-gray-200"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.65 14.64C19.83 14.15 20 13.58 20 13C20 10.24 17.76 8 15 8C12.24 8 10 10.24 10 13C10 15.76 12.24 18 15 18C15.58 18 16.15 17.83 16.64 17.65C16.89 19.12 15.82 20.5 14.33 20.5C12.45 20.5 11.5 19 11.5 17.5C11.5 15.59 13.09 14 15 14C16.18 14 17.11 14.61 17.58 15.5H17.59C18.06 15.11 18.94 14.34 19.65 14.64Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M12 12H4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <h1 className="text-lg font-semibold text-gray-200 hidden md:block">
                            Mobile Store
                        </h1>
                    </a>
                </div>

                {/* Tengah: Menu Navigasi */}
                <div className="hidden md:flex items-center space-x-6 text-xs text-gray-300">
                    {navItems.map(item => (
                        <a key={item} href="#" onClick={(e) => handleNavClick(item, e)} className="hover:text-white transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Kanan: Ikon Aksi */}
                <div className="flex items-center space-x-5 relative">
                    <div className="relative flex items-center">
                        <button onClick={handleSearchToggle} aria-label="Toggle search" className="text-gray-300 hover:text-white z-30 p-1">
                            {showSearch ? <X size={16} /> : <Search size={16} />}
                        </button>

                        {/* Animated expanding input - absolute overlay to avoid layout shift */}
                        <AnimatePresence>
                            {showSearch && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 220, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20"
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div className="bg-white/95 border border-gray-200 rounded-md px-2 py-1 shadow-sm">
                                        <input
                                            ref={inputRef}
                                            value={localQuery}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent outline-none text-sm text-slate-900"
                                            placeholder="Search products..."
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="relative">
                        <button onClick={() => onToggleCart && onToggleCart(true)} className="text-gray-300 hover:text-white">
                            <ShoppingBag size={16} />
                        </button>
                        {cartCount > 0 && (
                            <motion.span
                                className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-semibold rounded-full h-3.5 w-3.5 flex items-center justify-center"
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;