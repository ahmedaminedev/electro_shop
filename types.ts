
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
