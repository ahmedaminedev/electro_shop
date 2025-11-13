import React from 'react';
import type { Product, Pack, Advertisements } from '../types';
import { VerticalNav } from './VerticalNav';
import { HeroSection } from './HeroSection';
import { TrustBadges } from './TrustBadges';
import { DestockageCarousel } from './DestockageBanner';
import { ProductCarousel } from './ProductCarousel';
import { AudioPromoBanner } from './AudioPromoBanner';
import { PromoBanners } from './PromoBanners';
import { SmallPromoBanners } from './SmallPromoBanners';
import { ProductGridSection } from './ProductGridSection';
import { BrandCarousel } from './BrandCarousel';
import { categories, newArrivals, summerSelection, brands } from '../constants';

interface HomePageProps {
    onNavigate: (categoryName: string) => void;
    isNavCollapsed: boolean;
    onToggleNav: () => void;
    onPreview: (product: Product) => void;
    onNavigateToPacks: () => void;
    products: Product[];
    packs: Pack[];
    advertisements: Advertisements;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, isNavCollapsed, onToggleNav, onPreview, onNavigateToPacks, products, packs, advertisements }) => {
    
    // This logic should be here to ensure it uses up-to-date product quantities
    const getProductById = (id: number) => products.find(p => p.id === id);
    const newArrivalProducts = newArrivals.map(p => getProductById(p.id)).filter((p): p is Product => Boolean(p));
    const summerSelectionProducts = summerSelection.map(p => getProductById(p.id)).filter((p): p is Product => Boolean(p));
    
    return (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className={`relative z-20 shrink-0 transition-all duration-300 ${isNavCollapsed ? 'lg:w-20' : 'lg:w-1/4 xl:w-1/5'}`}>
                    <VerticalNav
                        categories={categories}
                        isCollapsed={isNavCollapsed}
                        onToggleCollapse={onToggleNav}
                        onCategoryClick={onNavigate}
                        onNavigateToPacks={onNavigateToPacks}
                    />
                </aside>
                <main className="flex-1 min-w-0 relative z-10">
                    <HeroSection slides={advertisements.heroSlides} />
                    <TrustBadges />
                    <DestockageCarousel ads={advertisements.destockage} />
                    <ProductCarousel title="Nouvelles Arrivées" products={newArrivalProducts} onPreview={onPreview} />
                    <AudioPromoBanner ads={advertisements.audioPromo} />
                    <PromoBanners 
                        banners={advertisements.promoBanners}
                        allProducts={products}
                        allPacks={packs}
                        onPreview={onPreview}
                    />
                    <SmallPromoBanners ads={advertisements.smallPromoBanners} />
                    <ProductCarousel title="Sélection d'été" products={summerSelectionProducts} onPreview={onPreview} />
                    <ProductGridSection allProducts={products} onPreview={onPreview} />
                    <BrandCarousel brands={brands} />
                </main>
            </div>
        </div>
    );
};