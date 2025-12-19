export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  estimatedDelivery: string;
  cost: number;
  code: string;
}


export const shippingMethods: ShippingMethod[] = [
  {
    id: 'ghn',
    name: 'Giao hàng nhanh',
    description: 'Giao hàng trong 24h nội thành',
    estimatedDelivery: '1-2 ngày',
    cost: 30000,
    code: 'SPXVN'
  },
  {
    id: 'ghtk',
    name: 'Giao hàng tiết kiệm',
    description: 'Giao hàng tiêu chuẩn',
    estimatedDelivery: '3-5 ngày',
    cost: 15000,
    code: 'GHTK'
  },
  {
    id: 'jt',
    name: 'J&T Express',
    description: 'Giao hàng nhanh chóng',
    estimatedDelivery: '2-3 ngày',
    cost: 25000,
    code: 'JT'
  },
  {
    id: 'viettelpost',
    name: 'Viettel Post',
    description: 'Dịch vụ chuyển phát của Viettel',
    estimatedDelivery: '2-4 ngày',
    cost: 27000,
    code: 'VTP'
  },
  {
    id: 'best',
    name: 'BEST Express',
    description: 'Chuyển phát nhanh BEST',
    estimatedDelivery: '2-3 ngày',
    cost: 28000,
    code: 'BEST'
  },
  {
    id: 'ninja',
    name: 'Ninja Van',
    description: 'Dịch vụ giao hàng chuyên nghiệp',
    estimatedDelivery: '2-4 ngày',
    cost: 29000,
    code: 'NJV'
  },
  {
    id: 'hoatoc',
    name: 'Giao hàng hỏa tốc',
    description: 'Giao hàng trong vòng 2h',
    estimatedDelivery: '2-4 giờ',
    cost: 60000,
    code: 'HT'
  }
];


export const orderTypeOptions = [
  { value: 'all', label: 'Tất cả đơn hàng' },
  { value: 'one', label: 'Đơn hàng đơn lẻ' },
  { value: 'more', label: 'Đơn hàng nhiều sản phẩm' }
];

export const shippingUnitOptions = shippingMethods.map(method => ({
  value: method.id,
  label: method.name
}));

export const searchTypes = [
  { value: 'order_code', label: 'Mã đơn hàng' },
  { value: 'customer_name', label: 'Tên người mua' },
  { value: 'product_name', label: 'Tên sản phẩm' },
];


export const getSearchPlaceholder = (searchTypeValue: string) => {
  switch (searchTypeValue) {
    case 'order_code':
      return 'Nhập mã đơn hàng...';
    case 'customer_name':
      return 'Nhập tên người mua...';
    case 'product_name':
      return 'Nhập tên sản phẩm...';
    default:
      return 'Tìm kiếm...';
  }
};

export const paymentMethods = [
  { key: 'CASH_ON_DELIVERY', value: 'Thanh toán khi nhận hàng' },
  { key: 'BANK_TRANSFER', value: 'Chuyển khoản ngân hàng' },
  { key: 'E_WALLET', value: 'Ví điện tử' },
  { key: 'CREDIT_CARD', value: 'Thẻ tín dụng/ghi nợ' }
];

export const defaultRejectReasons = [
  { key: 'out_of_stock', value: 'Hết hàng' },
  { key: 'pricing_error', value: 'Lỗi giá sản phẩm' },
  { key: 'unable_to_fulfill', value: 'Không thể thực hiện đơn hàng' },
  { key: 'customer_request', value: 'Theo yêu cầu của khách hàng' },
  { key: 'other', value: 'Lý do khác' }
];



// ------------------------------------------------meetj qua may bac oi 

export type PreparingShippingStatus = 'all' | 'waiting_for_pickup' | 'pick_up';


export const preparingShippingMethods = [
  { label: 'Tất cả', value: 'all' as PreparingShippingStatus },
  { label: 'Chờ giao', value: 'waiting_for_pickup' as PreparingShippingStatus },
  { label: 'Đã lấy hàng', value: 'pick_up' as PreparingShippingStatus },
]

export const searchShipTypes = [
  { value: 'order_code', label: 'Mã đơn hàng' },
  { value: 'customer_name', label: 'Tên người mua' },
  { value: 'shipping_code', label: 'Mã vận chuyển' },
];

