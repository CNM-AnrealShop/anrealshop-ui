import type { ProductAttribute, ProductAttributeSingleValue } from "./AttributeType";
import type { MediaDto } from "./CommonType";
import type { BaseShopDto } from "./ShopType";

export interface ProductCreateRequest {
  name: string;
  description: string;
  sortDescription: string;
  price: number;
  discountPrice: number;
  quantity: number;
  categoryId: string;
  categoryPath: string;
  weight: number;
  height: number;
  length: number;
  width: number;
  attributes: ProductAttribute[];
  productSkus: ProductSkuRequest[];
  media: MediaDto[];
}

export interface ProductSkuRequest {
  sku: string;
  price: number;
  quantity: number;
  imageUrl: string;
  attributes: ProductAttribute[];
}


export interface MyShopProductListResponse {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  products: MyShopProductDto[];
}

export interface MyShopProductDto {
  id: string;
  name: string;
  thumbnailUrl: string;
  urlSlug: string;
  categoryId: string;
  categoryPath?: string;
  discountPrice: number;
  quantity: number;
  sold: number;
  status: ProductStatus;
  visible: boolean;
  createdAt: string;

  restrictedReason?: string;
  restricted?: boolean;

  productSkus?: MyShopProductSkuDto[];
  baseShopDto?: BaseShopDto;
}

export type ProductStatus = 'ALL' | 'ACTIVE' | 'VIOLATION' | 'PENDING' | 'HIDDEN';

export interface ProductStatusDto {
  id: string;
  name: string;
  count: number;
}

export interface MyShopProductSkuDto {
  id: string;
  sku: string;
  imageUrl: string;
  price: number;
  quantity: number;
  sold: number;
  createdAt: string;

  keyAttributes?: string[];
  attributeForSku?: ProductAttributeSingleValue[];
}



export interface ProductDetailDto {
  id: string;
  name: string;
  thumbnailUrl: string;
  urlSlug: string;
  categoryId?: string;
  categoryPath?: string;
  description?: string;
  sortDescription?: string;
  price: number;
  discountPrice: number;
  quantity: number;
  sold: number;
  status: ProductStatus;
  visible: boolean;

  createdAt: string;
  updatedAt?: string;

  restrictedReason?: string;
  isRestricted?: boolean;
  restrictStatus?: string;

  averageRating?: number;
  totalReviews?: number;

  width?: number;
  height?: number;
  length?: number;
  weight?: number;

  baseShopDto?: BaseShopDto;
  medias?: MediaDto[];
  attributes?: ProductAttribute[];
  productSkus?: MyShopProductSkuDto[];
}

export interface UserProductDto {
  id: string;
  name: string;
  thumbnailUrl: string;
  sortDescription: string;
  urlSlug: string;
  discountPrice: number;
  price: number;
  quantity: number;
  sold: number;
  averageRating: number;
  totalReviews: number;

  categoryId: string;
  categoryName: string;

  shopId: string;
  shopName: string;
  shopThumbnailUrl: string;
}
