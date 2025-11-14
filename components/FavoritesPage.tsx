import React, { useEffect, useMemo } from 'react';
import type { Product } from '../types';
import { useFavorites } from './FavoritesContext';
import { Breadcrumb } from './Breadcrumb';
import { ProductCard } from './ProductCard';
import { HeartIcon } from './IconComponents';

interface FavoritesPageProps {
    onNavigateHome: () => void;
    onPreview: (product: Product) => void;
    allProducts: Product[];
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigateHome, onPreview, allProducts }) => {
    const { favoriteIds } = useFavorites();

    useEffect(() => {
        document.title = `Mes Favoris - Electro Shop`;
    }, []);

    const favoriteProducts = useMemo(() => {
        return allProducts.filter(p => favoriteIds.includes(p.id));
    }, [allProducts, favoriteIds]);

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Breadcrumb items={[{ name: 'Accueil', onClick: onNavigateHome }, { name: 'Mes Favoris' }]} />
                </div>
                
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ma Liste de Favoris</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Les produits que vous aimez, tous au même endroit.</p>
                </header>

                {favoriteProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {favoriteProducts.map(product => (
                            <ProductCard key={product.id} product={product} onPreview={onPreview} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <HeartIcon className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Votre liste de favoris est vide.</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Cliquez sur le cœur sur un produit pour l'ajouter ici.</p>
                        <button onClick={onNavigateHome} className="mt-6 bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors duration-300">
                            Découvrir les produits
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
