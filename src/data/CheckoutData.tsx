import { Image } from "@mantine/core";
import { BsBank, BsCashCoin, BsCreditCard2Front } from "react-icons/bs";
import type { PaymentGatewayType } from "../types/CheckoutType";

export interface PaymentMethodInfo {
  id: PaymentGatewayType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const VNPayLogo = ({ size = 24 }: { size?: number }) => (
  <Image
    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png"
    alt="VNPAY"
    width={size}
    height={size}
    fit="contain"
  />
);

export const paymentMethodsDataDefault: PaymentMethodInfo[] = [
  {
    id: "cash_on_delivery",
    name: 'Thanh toán khi nhận hàng',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng',
    icon: <BsCashCoin size={24} />
  },
  {
    id: "momo",
    name: 'Chuyển khoản ngân hàng',
    description: 'Chuyển khoản trực tiếp đến tài khoản ngân hàng của chúng tôi',
    icon: <BsBank size={24} />
  },
  {
    id: 'vnpay',
    name: 'VNPAY',
    description: 'Thanh toán qua cổng VNPAY',
    icon: <VNPayLogo size={24} />
  },
  {
    id: 'credit_card',
    name: 'Thẻ tín dụng / Ghi nợ',
    description: 'Thanh toán qua thẻ tín dụng hoặc ghi nợ',
    icon: <BsCreditCard2Front size={24} />
  }
];