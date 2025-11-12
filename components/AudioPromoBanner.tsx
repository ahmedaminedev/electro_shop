
import React from 'react';

export const AudioPromoBanner: React.FC = () => {
    return (
        <section className="my-12">
            <a href="#" className="relative rounded-lg overflow-hidden group block bg-gradient-to-r from-teal-400 to-cyan-600 p-8 flex items-center h-60 md:h-72 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative z-10 w-full md:w-1/2 text-white">
                    <p className="text-5xl md:text-6xl font-extrabold leading-tight">jusqu'à -40%</p>
                    <h3 className="text-2xl md:text-3xl font-semibold mt-2">SUR NOTRE SÉLECTION</h3>
                    <p className="text-xl md:text-2xl font-light">Écouteurs, Casque, Enceinte</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-full md:w-3/5">
                    <img 
                        src="https://picsum.photos/seed/audio/800/400"
                        alt="Audio products"
                        className="absolute right-0 bottom-0 h-auto w-full max-w-lg object-contain transition-transform duration-500 group-hover:scale-105 opacity-30 md:opacity-100"
                    />
                </div>
            </a>
        </section>
    );
}
