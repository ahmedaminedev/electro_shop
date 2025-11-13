import React from 'react';
import type { MediumPromoAd } from '../types';
import { MediumPromoBanner } from './MediumPromoBanner';

interface PromoBannersProps {
    banners: [MediumPromoAd, MediumPromoAd];
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ banners }) => {
    return (
        <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {banners.map(banner => (
                <MediumPromoBanner key={banner.id} banner={banner} />
            ))}
        </section>
    );
};
