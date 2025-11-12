
import React from 'react';

export const DestockageBanner: React.FC = () => {
    return (
        <section className="my-12">
            <a href="#" className="relative rounded-lg overflow-hidden group block bg-red-600 p-8 flex flex-col md:flex-row items-center h-auto md:h-80 shadow-lg hover:shadow-xl transition-shadow duration-300 text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/confetti.png')" }}></div>
                
                <div className="relative z-10 w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider">Destockage</h2>
                    <p className="text-2xl md:text-3xl font-semibold mt-2">Pack encastrable de 3 Pièces</p>
                    <div className="mt-4 inline-flex flex-col items-center bg-white text-red-600 px-4 py-2 rounded-lg shadow-md">
                        <span className="text-5xl font-bold leading-none">765 DT</span>
                        <span className="text-lg font-bold line-through text-gray-500">900 DT</span>
                    </div>
                </div>

                <div className="relative z-10 flex-1 h-64 md:h-full flex items-center justify-around gap-4">
                    <img 
                        src="https://picsum.photos/seed/hotte/200/100"
                        alt="Hotte"
                        className="h-16 md:h-20 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-lg"
                    />
                     <img 
                        src="https://picsum.photos/seed/plaque/200/200"
                        alt="Plaque de cuisson"
                        className="h-28 md:h-36 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-lg"
                    />
                     <img 
                        src="https://picsum.photos/seed/four/250/300"
                        alt="Four"
                        className="h-40 md:h-56 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-lg"
                    />
                </div>
                 <div className="absolute right-0 bottom-0 z-0 hidden lg:block">
                     <img src="https://picsum.photos/seed/chef/250/320" alt="chef" className="h-80 opacity-90 object-contain mix-blend-luminosity"/>
                 </div>
            </a>
        </section>
    );
};
