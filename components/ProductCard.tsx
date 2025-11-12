
import React from 'react';
import type { Product } from '../types';
import { CartIcon, EyeIcon } from './IconComponents';

interface ProductCardProps {
    product: Product;
    onPreview: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPreview }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg group overflow-hidden transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700">
            <div className="relative overflow-hidden">
                <a href="#" className="block">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                    />
                </a>
                
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={() => onPreview(product)} 
                        className="flex items-center gap-2 bg-white text-gray-800 font-semibold py-2 px-4 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-red-600 hover:text-white"
                    >
                        <EyeIcon className="w-5 h-5" />
                        <span>Aperçu rapide</span>
                    </button>
                </div>

                {product.discount && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md z-10">
                        -{product.discount}%
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider">{product.brand.toUpperCase()}</p>
                <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200 flex-grow mb-3">
                    <a href="#" className="line-clamp-2 hover:text-red-600 transition-colors duration-200">{product.name}</a>
                </h3>

                <div className="mt-auto pt-2">
                     {/* Stock Status */}
                    <div className="flex items-center mb-3">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-xs font-semibold text-green-700 dark:text-green-400">En stock</span>
                    </div>
                
                    <div className="mb-4">
                        <p className="text-2xl font-bold text-red-600">{product.price.toFixed(3).replace('.',',')} DT</p>
                        {product.oldPrice && (
                            <p className="text-sm text-gray-400 line-through -mt-1">{product.oldPrice.toFixed(3).replace('.',',')} DT</p>
                        )}
                    </div>

                    <button className="w-full bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">
                        <CartIcon className="w-5 h-5" />
                        <span>Ajouter au panier</span>
                    </button>
                </div>
            </div>
        </div>
    );
};