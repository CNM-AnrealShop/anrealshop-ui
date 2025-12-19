import type { SimpleAddressDto } from "./AddressType";
import type { HistoryShipping, PaymentMethodId } from "./ShipmentType";

// export type OrderStatus = 'ALL'| 'COMPLETED' | 'PROCESSING' | 'PENDING_CONFIRMATION' | 'PREPARING' | 'AWAITING_SHIPMENT' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'REFUND' | 'CANCELED';
export type OrderStatus = 'ALL'| 'INIT_PROCESSING' | 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'PREPARING' | 'SHIPPING' | 'IN_TRANSIT' | 'DELIVERED' | 'CLOSED';


export type ShopOrderStatus = 'INIT_PROCESSING' | 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'CLOSED';

export interface OrderStatusDto {
  id: string;
  name: string;
  count: number;
}

export interface ProductOrderItemDto {
    orderItemId: string;
    productId: string;
    productSkuId: string;
    productName: string;
    productImage: string;
    variant: string;
    quantity: number;
    price: number;
    orderStatus: string;

    submitConfirmDate?: string;
 
    cancelReason: string;
    isReviewed: boolean;
} 

export interface OrderItemDto {
  shopOrderId: string;
  orderStatus: ShopOrderStatus;
  paymentMethod: string;
  customerName: string;
  customerImage: string;
  shippingMethod: string;
  shippingId: string;

  productOrderItemDtoSet: ProductOrderItemDto[];


}



export interface MyShopOrderListResponse {
    totalCount: number;
    totalPages: number; 
    currentPage: number;
    orderItemDtoSet: OrderItemDto[];
}


// approve / reject
export interface OrderRejectRequest {
  ids: string[];
  reason: string;
}


// orderDetails
export interface HistoryTrackDto {
  id: string;
  status: OrderStatus;
  notes: HistoryTrackNote[];
}

export interface HistoryTrackNote {
  content: string;
  timestamp: Date|string;
}


export interface ShippingOrderItemDto {
  id: string;
  shippingId: string;
  shippingMethod: string;
  shippingBrand: string;

  shipperName: string;
  shipperPhone: string;


  productImage: string;
  productName: string;
  productQuantity: number;

  shippingHistory: HistoryTrackDto[];

}

export interface OrderDetailDto {
  orderId: string;
  orderStatus: OrderStatus;
  orderHistory: HistoryTrackDto[];
  items: ShippingOrderItemDto[];

  totalProductCost: number;
  totalShippingCost: number;
  shippingFee: number;
  shippingDiscount: number;

  FixedFeeRate: number;
  serviceFeeRate: number;
  PaymentFeeRate: number;

  revenue: number;

  customerName: string;
  customerPhone: string;
  customerAddress: string;

  isReviewed: boolean;

}



// ------------------- cho maays thang cha giau co hay di mua sam -------------------

export interface UserProductOrderItemDto {
    productId: string;
    productSkuId: string;
    productName: string;
    productImage: string;
    variant: string;
    quantity: number;
    price: number;
    orderStatus: string;
 
    cancelReason: string;
    isReviewed: boolean;

    orderItemId: string;
} 

export interface UserOrderItemDto {
  shopOrderId: string;
  shopOrderName: string;
  shopOrderImage: string;
  orderStatus: ShopOrderStatus[];
  paymentMethod: string;
  totalPrice: number;
  updateAt: string;

  productOrderItemDtoSet: UserProductOrderItemDto[];

} 

export interface UserOrderListResponse {
    totalCount: number;
    totalPages: number; 
    currentPage: number;
    orderItemDtoSet: UserOrderItemDto[];
}

export interface UserOrderDetailDto {
  shopOrderId: string;
  shopOrderStatus: OrderStatus;

  shopId: string;
  shopName: string;
  shopImage: string;

  orderHistory: HistoryShipping[];
  productItems: ProductOrderItemDto[];

  totalProductCost: number;
  totalShippingCost: number;
  shippingId?: string;
  shippingFee: number;
  shippingDiscount: number;
  paymentMethod: PaymentMethodId;

  totalCost: number;

  isReviewed: boolean;

  address: SimpleAddressDto;
}