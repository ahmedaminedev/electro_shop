
import React from 'react';

export const SmallPromoBanners: React.FC = () => {
    return (
        <section className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promo 1: Air Conditioner */}
            <a href="#" className="relative rounded-lg overflow-hidden group block bg-gradient-to-br from-blue-700 to-blue-900 p-6 flex flex-col justify-between h-64 md:h-auto md:aspect-square shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative z-10">
                    <div className="bg-yellow-400 text-blue-900 font-bold px-4 py-1 inline-block rounded-md shadow">PROMO</div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mt-2">9000 BTU Froid</h3>
                    <p className="text-5xl lg:text-6xl font-extrabold text-white leading-none mt-1">-20%</p>
                </div>
                <img
                    src="https://picsum.photos/seed/aircon/300/200"
                    alt="Climatiseur Midea"
                    className="absolute bottom-0 right-0 w-3/4 object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 drop-shadow-2xl"
                />
            </a>

            {/* Promo 2: Freezer */}
            <a href="#" className="relative rounded-lg overflow-hidden group block bg-gradient-to-br from-blue-800 to-indigo-900 p-6 flex flex-col justify-between h-64 md:h-auto md:aspect-square shadow-lg hover:shadow-2xl transition-shadow duration-300">
                 <div className="relative z-10">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">Congélateur</h3>
                    <ul className="text-white mt-2 list-disc list-inside space-y-1">
                        <li>Horizontal</li>
                        <li>Vertical</li>
                    </ul>
                </div>
                <img
                    src="https://picsum.photos/seed/freezer/300/300"
                    alt="Congélateur"
                    className="absolute -bottom-4 right-0 w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 drop-shadow-2xl"
                />
                 <div className="relative z-10 mt-auto self-start">
                    <p className="text-lg text-white">A PARTIR DE</p>
                    <div className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 inline-block rounded-md text-2xl shadow">850<sup className="text-sm align-super">DT</sup></div>
                 </div>
            </a>
            
            {/* Promo 3: Smartwatch */}
            <a href="#" className="relative rounded-lg overflow-hidden group block bg-gradient-to-br from-yellow-400 to-orange-400 p-6 flex flex-col justify-end h-64 md:h-auto md:aspect-square shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                    src="https://picsum.photos/seed/watch/300/300"
                    alt="Smartwatch"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-3/4 object-contain transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-6 drop-shadow-2xl"
                />
                 <div className="relative z-10 text-gray-900 text-center">
                     <h3 className="text-xl font-bold">VENTE FLASH</h3>
                     <p className="text-4xl lg:text-5xl font-extrabold my-1">jusqu'à <span className="text-red-600">-30%</span></p>
                     <p className="font-semibold text-sm">Sur notre sélection SMARTWATCH</p>
                     <div className="mt-2 inline-block bg-red-600 text-white font-bold px-3 py-1 text-xs rounded-full shadow-md">
                         Stock limité
                     </div>
                 </div>
            </a>
        </section>
    );
};
