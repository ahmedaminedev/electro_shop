import React from 'react';

export const PromoBanners: React.FC = () => {
    return (
        <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/id/101/600/300')"}}>
                 <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-6 text-center">
                     <h3 className="text-2xl font-bold text-white mb-2">Climatiseurs</h3>
                     <p className="text-white mb-4">Restez au frais tout l'été</p>
                     <a href="#" className="bg-white text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300">
                         Acheter
                     </a>
                 </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/id/103/600/300')"}}>
                 <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-6 text-center">
                     <h3 className="text-2xl font-bold text-white mb-2">Smart TVs</h3>
                     <p className="text-white mb-4">Qualité d'image incroyable</p>
                     <a href="#" className="bg-white text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300">
                         Explorer
                     </a>
                 </div>
            </div>
        </section>
    );
};