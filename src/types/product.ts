export type Platform = 'ps4' | 'ps5';
export type AccountVariant = 'primary' | 'secondary';
export type ProductType = 'account' | 'digital_key';
export type ProductCategory = 'action' | 'adventure' | 'sports' | 'rpg' | 'shooter' | 'racing' | 'horror' | 'other';

export interface ProductPricing {
  platform: Platform;
  accountVariant: AccountVariant;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ProductType;
  category: ProductCategory;
  coverImage: string;
  platforms: Platform[];
  pricing: ProductPricing[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewRelease: boolean;
  isWeeklyDeal: boolean;
  weeklyDealDiscount?: number;
  releaseYear: number;
}
