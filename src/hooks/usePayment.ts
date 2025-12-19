import type { PaymentMethodId } from "../types/ShipmentType";

export const convertToTextPaymentMethod = (methodId: PaymentMethodId): string => {
    switch (methodId) {
        case 'cash_on_delivery':
            return 'Thanh toán khi nhận hàng';
        case 'bank_transfer':
            return 'Chuyển khoản ngân hàng';
        case 'zalopay':
            return 'ZaloPay';
        case 'momo':
            return 'MoMo';
        case 'vnpay':
            return 'VNPay';
        default:
            return 'Unknown Payment Method';
    }
}