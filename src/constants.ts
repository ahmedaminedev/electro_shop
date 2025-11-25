
import type { Product, Category, Brand, Pack, BlogPost, Order, ContactMessage, Advertisements, User, Promotion, Store } from './types';

// Toutes les données sont désormais gérées dynamiquement via le backend (MongoDB).
// Ce fichier sert uniquement de fallback vide ou pour des configurations purement statiques si nécessaire à l'avenir.

export const allProducts: Product[] = [];
export const categories: Category[] = [];
export const packs: Pack[] = [];
export const brands: Brand[] = [];
export const blogPosts: BlogPost[] = [];
export const contactMessages: ContactMessage[] = [];
export const orders: Order[] = [];
export const mockPromotions: Promotion[] = [];
export const initialAdvertisements: Advertisements = {
    heroSlides: [],
    destockage: [],
    audioPromo: [],
    promoBanners: [
        {id:0, title:'', subtitle:'', buttonText:'', image:'', linkType:'category', linkTarget:''}, 
        {id:1, title:'', subtitle:'', buttonText:'', image:'', linkType:'category', linkTarget:''}
    ],
    smallPromoBanners: []
};
export const initialStores: Store[] = [];
export const mockUser: User | null = null;

export const newArrivals: Product[] = [];
export const summerSelection: Product[] = [];
