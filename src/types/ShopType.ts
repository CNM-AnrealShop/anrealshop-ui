export interface BaseShopDto {
  id: string;
  name: string;
  avatarUrl: string; 
} 


export interface ShopDto extends BaseShopDto {
  shopUrl: string;
}

export interface ShopCreateRequest {
  name: string;
}