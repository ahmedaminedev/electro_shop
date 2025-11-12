
import React from 'react';
import type { Product } from '../types';
import { VerticalNav } from './VerticalNav';
import { HeroSection } from './HeroSection';
import { TrustBadges } from './TrustBadges';
import { DestockageBanner } from './DestockageBanner';
import { ProductCarousel } from './ProductCarousel';
import { AudioPromoBanner } from './AudioPromoBanner';
import { PromoBanners } from './PromoBanners';
import { SmallPromoBanners } from './SmallPromoBanners';
import { ProductGridSection } from './ProductGridSection';
import { BrandCarousel } from './BrandCarousel';
import { categories, newArrivals, summerSelection, allProducts, brands } from '../constants';

interface HomePageProps {
    onNavigate: (categoryName: string) => void;
    isNavCollapsed: boolean;
    onToggleNav: () => void;
    onPreview: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, isNavCollapsed, onToggleNav, onPreview }) => {
    return (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className={`relative z-20 shrink-0 transition-all duration-300 ${isNavCollapsed ? 'lg:w-20' : 'lg:w-1/4 xl:w-1/5'}`}>
                    <VerticalNav
                        categories={categories}
                        isCollapsed={isNavCollapsed}
                        onToggleCollapse={onToggleNav}
                        onCategoryClick={onNavigate}
                    />
                </aside>
                <main className="flex-1 min-w-0 relative z-10">
                    <HeroSection />
                    <TrustBadges />
                    <DestockageBanner />
                    <ProductCarousel title="Nouvelles Arrivées" products={newArrivals} onPreview={onPreview} />
                    <AudioPromoBanner />
                    <PromoBanners />
                    <SmallPromoBanners />
                    <ProductCarousel title="Sélection d'été" products={summerSelection} onPreview={onPreview} />
                    <ProductGridSection allProducts={allProducts} onPreview={onPreview} />
                    <BrandCarousel brands={brands} />
                </main>
            </div>
        </div>
    );
};