import type { BaseShopDto } from "./ShopType";

export interface CartDto {
    shop: BaseShopDto; 
    items: CartItemDto[];
}

export interface CartItemDto {
    id: string;
    productId: string;
    urlSlug: string;
    productSkuId: string;
    name: string;
    thumbnailUrl: string;
    quantity: number;
    maxQuantity: number;
    price: number;
    attributeString: string;
    isSelected: boolean;
}

export interface CartItemUpdateDto {
    id: string;
    quantity: number;
}

export interface CartAddItemDto {
    productSkuId: string; 
    quantity: number;
}

export interface CartUpdateSeleted {
    itemIds: string[];
    selected: boolean;
}
