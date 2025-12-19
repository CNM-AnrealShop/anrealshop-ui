import type { PaymentGatewayType, PaymentMethodType } from "./CheckoutType";

export type PaymentStatus = 'PENDING' | 'COD' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED' | 'REFUNDED';

export interface PaymentResultData {
  orderId: string;
  orderDate: string;
  orderDateExpiration: string;
  amount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethodType;
  paymentGateway: PaymentGatewayType;

  isTransfer: boolean;
}
