import type { CartItemDto } from "./CartType";
import type { BaseShopDto } from "./ShopType";


export type ShippingStatus = 'ORDER_CREATED' | 'WAITING_FOR_PICKUP' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'DELIVERY_FAILED' | 'RETURNED';



export interface CartShippingFee {
    shopId: string;
    fee: number;
    leadTime: string;
    isSuccess: boolean;
    serviceName: string;
}

export interface CheckoutInfoDto {
    shop: BaseShopDto;
    items: CartItemDto[];
    fee: number;
    leadTime: string;
    isSuccess: boolean;
    serviceName: string;
}

export type PaymentMethodId = 'cash_on_delivery' | 'bank_transfer' | 'zalopay' | 'momo' | 'vnpay';


export interface CreateShipmentRequest {
    shopOrderIds: string[],
    addressId: string,
    note: string,
    pickupDate: string,
}

export interface BaseCreateShipmentRequest {
    note: string,
    pickupDate: string,
}

// myshop get list shipping


export interface MyShopShippingListResponse {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    orderItemDtoSet: ShippingItems[];
}


export type ShippingItems = {
    shopOrderId: string;
    countOrderItems: number;
    createdAt?: string;

    customerId: string;
    customerName: string;
    customerPhone: string;

    shippingId: string;
    shippingMethod: string;
    shippingStatus: string;
    dayPickup?: string;

    confirmationTime: string;
    isPrinted: boolean;
}

// history

export type HistoryShipping = {
    id: string;
    status: ShippingStatus;
    notes: HistoryShippingNote[];
}

export type HistoryShippingNote = {
    content: string;
    timestamp: Date | string;
}


export type CheckoutShippingFee = {
    userAddressId: string;
    checkoutItems: Record<string, number>;
}

