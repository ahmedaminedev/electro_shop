import React from 'react';
import type { MediumPromoAd } from '../types';

export const MediumPromoBanner: React.FC<{ banner: MediumPromoAd, isPreview?: boolean }> = ({ banner, isPreview }) => {
    const ButtonComponent = isPreview ? 'span' : 'a';
    const buttonProps = isPreview ? {} : { href: "#" };

    return (
        <div className="relative rounded-lg overflow-hidden h-64 bg-cover bg-center" style={{ backgroundImage: `url('${banner.image}')`}}>
             <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-6 text-center">
                 <h3 className="text-2xl font-bold text-white mb-2">{banner.title}</h3>
                 <p className="text-white mb-4">{banner.subtitle}</p>
                 <ButtonComponent 
                    {...buttonProps} 
                    className="bg-white text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                     {banner.buttonText}
                 </ButtonComponent>
             </div>
        </div>
    );
};
