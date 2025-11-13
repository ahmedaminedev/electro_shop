export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  discount?: number;
  category: string;
  promo?: boolean;
  material?: string;
  description?: string;
  quantity: number;
}

export interface SubCategoryItem {
    name: string;
}

export interface SubCategoryGroup {
    title: string;
    items: SubCategoryItem[];
}

export interface Category {
  name: string;
  subCategories?: string[];
  megaMenu?: SubCategoryGroup[];
}

export interface Brand {
    name: string;
    productCount: number;
    logoUrl: string;
}

export interface Pack {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  imageUrl: string;
  includedItems: string[];
  includedProductIds: number[];
  includedPackIds?: number[];
  discount?: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  authorImageUrl: string;
  date: string;
  category: string;
  featured?: boolean;
}

export type Cartable = Product | Pack;

export interface CartItem {
  id: string; // e.g., 'product-1' or 'pack-2'
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  originalItem: Cartable;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'En attente' | 'Expédiée' | 'Livrée' | 'Annulée';
  itemCount: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

// Advertisement Types
export interface HeroSlide {
  id: number;
  bgImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface DestockageAd {
  id: number;
  mainTitle: string;
  subTitle: string;
  price: string;
  oldPrice: string;
  images: { src: string; alt: string }[];
  chefImage: string;
  duration: number; // Duration in seconds
}

export interface AudioPromoAd {
  id: number;
  title: string;
  subtitle1: string;
  subtitle2: string;
  image: string;
  background: string;
  duration: number;
}

export interface MediumPromoAd {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
}

export interface ImagePromoAd {
  id: number;
  imageUrl: string;
  altText: string;
  link: string;
}

// FIX: Add missing 'SmallPromoAd' type definition to fix an import error in components/SmallPromoBanner.tsx.
interface BaseSmallPromoAd {
  id: number;
  bgGradient: string;
  image: string;
}

interface DiscountPromoAd extends BaseSmallPromoAd {
  type: 'discount';
  promoText: string;
  title: string;
  discount: string;
}

interface PriceStartPromoAd extends BaseSmallPromoAd {
  type: 'price_start';
  title: string;
  features: string[];
  priceStartText: string;
  price: string;
  priceUnit: string;
}

interface FlashSalePromoAd extends BaseSmallPromoAd {
  type: 'flash_sale';
  flashTitle: string;
  title?: string;
  discountText?: string;
  flashSubtitle: string;
  notice: string;
}

export type SmallPromoAd = DiscountPromoAd | PriceStartPromoAd | FlashSalePromoAd;

export interface Advertisements {
  heroSlides: HeroSlide[];
  destockage: DestockageAd[];
  audioPromo: AudioPromoAd[];
  promoBanners: [MediumPromoAd, MediumPromoAd];
  smallPromoBanners: ImagePromoAd[];
}