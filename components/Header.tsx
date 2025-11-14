

import React, { useState, useEffect } from 'react';
import { SearchIcon, UserIcon, CartIcon, HeartIcon } from './IconComponents';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from './CartContext';
import { useFavorites } from './FavoritesContext';

interface HeaderProps {
    onNavigateToLogin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onNavigateToFavorites: () => void;
    onNavigateToProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToLogin, isLoggedIn, onLogout, onNavigateToFavorites, onNavigateToProfile }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { itemCount, openCart } = useCart();
    const { favoritesCount } = useFavorites();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
                     <button onClick={onNavigateToFavorites} className="relative flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                        <HeartIcon className="w-6 h-6" />
                        <span className="hidden md:block">Favoris</span>
                        {favoritesCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {favoritesCount}
                            </span>
                        )}
                    </button>
                    <div className="relative">
                        {isLoggedIn ? (
                             <button onMouseEnter={() => setIsProfileMenuOpen(true)} onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                                <UserIcon className="w-6 h-6" />
                                <span className="hidden md:block">Mon Compte</span>
                            </button>
                        ) : (
                            <button onClick={onNavigateToLogin} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                                <UserIcon className="w-6 h-6" />
                                <span className="hidden md:block">Compte</span>
                            </button>
                        )}
                         {isLoggedIn && isProfileMenuOpen && (
                             <div 
                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700"
                                onMouseLeave={() => setIsProfileMenuOpen(false)}
                            >
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToProfile(); setIsProfileMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Mon Profil</a>
                                <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsProfileMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Déconnexion</a>
                            </div>
                        )}
                    </div>
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