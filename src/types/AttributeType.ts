
export interface BaseAttribute {
  attributeKeyName: string;
  attributeKeyDisplay: string;
  displayOrder: number;
  isDefault: boolean;
  isMultiSelect: boolean;
  values: string[];
} 

export interface ProductAttribute {
  attributeKeyName: string;
  attributeKeyDisplay: string;
  values:  Set<string>;
} 

export interface ProductAttributeSingleValue {
  attributeKeyName: string;
  attributeKeyDisplay: string;
  values: string;
}

export interface AttributeForShop {
  attribute: BaseAttribute[];
  attributeForSku: ProductAttribute[];
}