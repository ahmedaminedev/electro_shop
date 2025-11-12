
import React, { useEffect } from 'react';
import { packs } from '../constants';
import type { Pack } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { CartIcon, PlusIcon } from './IconComponents';

interface PacksPageProps {
    onNavigateHome: () => void;
}

const PackCard: React.FC<{ pack: Pack }> = ({ pack }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg group overflow-hidden transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1">
            <div className="relative overflow-hidden">
                <img 
                    src={pack.imageUrl} 
                    alt={pack.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{pack.name}</h3>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{pack.description}</p>

                <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Inclus dans ce pack :</h4>
                    <ul className="space-y-2">
                        {pack.includedItems.map((item, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <span className="w-1 h-1 bg-red-500 rounded-full mr-3"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                         <div className="text-right">
                            <p className="text-3xl font-bold text-red-600">{pack.price.toFixed(0)} DT</p>
                            <p className="text-md text-gray-400 line-through -mt-1">{pack.oldPrice.toFixed(0)} DT</p>
                        </div>
                         <div className="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-md">
                            Économisez {pack.oldPrice - pack.price} DT
                        </div>
                    </div>

                    <button className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">
                        <CartIcon className="w-5 h-5" />
                        <span>Ajouter le pack au panier</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


export const PacksPage: React.FC<PacksPageProps> = ({ onNavigateHome }) => {
     useEffect(() => {
        document.title = `Nos Packs - Electro Shop`;
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div 
                className="h-64 bg-cover bg-center flex items-center justify-center text-white" 
                style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://picsum.photos/seed/packs-hero/1600/400')"}}
            >
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Nos Packs Exclusifs</h1>
                    <p className="mt-4 text-lg text-gray-200">Les meilleures offres pour équiper votre maison</p>
                </div>
            </div>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Breadcrumb items={[{ name: 'Accueil', onClick: onNavigateHome }, { name: 'Les packs' }]} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {packs.map(pack => (
                        <PackCard key={pack.id} pack={pack} />
                    ))}
                </div>
            </div>
        </div>
    );
};
