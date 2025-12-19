export type PaymentMethodType = "cash_on_delivery" | "bank_transfer";
export type PaymentGatewayType = "vnpay" | "cash_on_delivery" | "momo" | "credit_card" ;

export interface ItemProductCheckoutDto {
    productSkuId: string;
    quantity: number;
}

export interface CheckoutRequestDto {
    addressId: string;
    paymentMethod: PaymentMethodType;
    paymentGateway: PaymentGatewayType;
    items: ItemProductCheckoutDto[];
}

export interface CheckoutResponseDto {
    orderId: string;
    message: string;
    urlRedirect: string;
    bankTransfer: boolean;
}