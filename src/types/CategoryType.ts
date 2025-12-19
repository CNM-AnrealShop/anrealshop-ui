import type { MediaType } from "./CommonType";

export interface BaseCategoryDto {
    id: string;
    name: string;
    urlSlug?: string;
    parentId?: string | null;
    level?: number;
    urlPath?: string;
    hasChildren?: boolean;
}

export interface FullCategoryDto extends BaseCategoryDto {
    slug: string;
    description?: string;
    imageUrl?: string;
    productCount?: number;
}

export interface AdminCategoryDto {
    id: string;
    name: string;
    slug: string;
    parentId?: string | null;
    description?: string;
    level: number;
    hasChildren: boolean;
    productCount: number;
    visible: boolean;
}

export interface CategoryRequestDto {
    name: string;
    slug: string;
    parentId?: string | null;
    description?: string;
    level?: number;
    visible: boolean;
}


export interface CategoryDisplayDto {
    id: string;
    categoryId: string;
    categoryName: string;
    position: 'HOMEPAGE' | 'SIDEBAR';
    order: number;
    slug: string;
    parentId?: string | null;
    level: number;
    thumbnailUrl?: string;
    mediaType?: MediaType;
}



export interface CategoryDisplayRequestDto {
    id?: string;
    categoryId: string;
    position: 'HOMEPAGE' | 'SIDEBAR';
    order: number;
    thumbnailUrl?: string;
    mediaType?: MediaType;
}