import type { AddressDto } from "./AddressType";

export type GenderType = 'MALE' | 'FEMALE' | 'OTHER'; 
export type UserRoleType = 'USER' | 'MY_SHOP' | 'ADMIN';

export interface UserDto {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatarUrl: string;
  gender: GenderType;
  dob: string; 
  role: string;
  verified: boolean;
  createdAt: string; 
  updatedAt: string;

  address?: AddressDto;
  cartCount?: number;
  hasShop?: boolean;
  hasPassword: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface ProfileRequest {
  fullName: string;
  phoneNumber?: string;
  gender: GenderType;
  dob: string;
  avatarUrl?: string;
}


export interface forgotPwRequest  {
  email: string;
  password: string;
  otp: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}



// manager 


export interface UserManagerDto {
    id: string;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatarUrl: string;
    role: string;
    verified: boolean;
    createdAt: string; 
}

export interface AdminUserListResponse {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    users: UserManagerDto[];
}