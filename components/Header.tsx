
import React, { useState, useEffect } from 'react';
import { SearchIcon, UserIcon, CartIcon } from './IconComponents';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from './CartContext';

interface HeaderProps {
    onNavigateToLogin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToLogin, isLoggedIn, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { itemCount, openCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
                        <Logo />
                    </a>
                </div>
                <div className="flex-1 max-w-2xl mx-8">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Rechercher un produit, une marque ou un conseil..."
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-full py-2 pl-10 pr-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        />
                        <div className="absolute top-0 left-0 flex items-center h-full pl-3">
                            <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <ThemeToggle />
                    {isLoggedIn ? (
                         <button onClick={onLogout} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                            <UserIcon className="w-6 h-6" />
                            <span className="hidden md:block">Déconnexion</span>
                        </button>
                    ) : (
                        <button onClick={onNavigateToLogin} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                            <UserIcon className="w-6 h-6" />
                            <span className="hidden md:block">Compte</span>
                        </button>
                    )}
                    <button onClick={openCart} className="relative flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                        <CartIcon className="w-6 h-6" />
                        <span className="hidden md:block">Panier</span>
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};
