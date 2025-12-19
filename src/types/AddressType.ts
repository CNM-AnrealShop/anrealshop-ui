export interface SingleAddressDto {
  id: string;
  nameDisplay: string;
}

export interface SimpleAddressDto {
  id: string;
  receiverOrSenderName: string;
  phoneNumber: string;
  detailAddress: string;
  isDefault: boolean;
}

export interface AddressDto {
  id: string;
  receiverOrSenderName: string;
  phoneNumber: string; 
  detailAddress: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  primary: boolean;
}

export interface AddressRequestDto {
  receiverOrSenderName: string;
  phoneNumber: string;
  detailAddress: string;
  wardId: string;
  isPrimary: boolean;
}