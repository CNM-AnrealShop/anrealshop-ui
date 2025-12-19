import { BsCashCoin, BsBank, BsCreditCard2Front } from 'react-icons/bs';
import { SiZalo } from 'react-icons/si';

export const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'cash_on_delivery':
      return <BsCashCoin size={18} className="text-green-600" />;
    case 'bank_transfer':
      return <BsBank size={18} className="text-blue-600" />;
    case 'zalopay':
      return <SiZalo size={18} className="text-blue-500" />;
    case 'vnpay':
      return <BsCreditCard2Front size={18} className="text-primary" />;
    default:
      return <BsCashCoin size={18} className="text-green-600" />;
  }
};

export const getPaymentMethodName = (method: string) => {
  switch (method) {
    case 'cash_on_delivery':
      return 'Thanh toán khi nhận hàng';
    case 'bank_transfer':
      return 'Chuyển khoản ngân hàng';
    case 'zalopay':
      return 'ZaloPay';
    case 'vnpay':
      return 'VNPay';
    default:
      return 'Thanh toán khi nhận hàng';
  }
};
