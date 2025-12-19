export type RejectType = 'order' | 'shipping' | 'order-user' | 'user';

export interface ItemList {
  key: string;
  value: string;
}

export const defaultRejectOrderReasons: ItemList[] = [
  { key: 'out_of_stock', value: 'Hết hàng' },
  { key: 'price_incorrect', value: 'Giá sản phẩm không chính xác' },
  { key: 'unable_to_fulfill', value: 'Không thể đáp ứng yêu cầu khách hàng' },
  { key: 'shipping_issue', value: 'Vấn đề về vận chuyển' },
  { key: 'other', value: 'Lý do khác' }
];

export const defaultRejectShippingReasons: ItemList[] = [
  { key: 'delayed_pickup', value: 'Lấy hàng chậm' },
  { key: 'address_issue', value: 'Vấn đề địa chỉ' },
  { key: 'unable_to_contact', value: 'Không thể liên hệ người nhận' },
  { key: 'weather_conditions', value: 'Điều kiện thời tiết xấu' },
  { key: 'other', value: 'Lý do khác' }
];

export const userCancelOrderReasons: ItemList[] = [
  { key: 'changed_mind', value: 'Tôi đổi ý, không muốn mua nữa' },
  { key: 'found_better_price', value: 'Tìm thấy giá tốt hơn ở nơi khác' },
  { key: 'ordered_by_mistake', value: 'Đặt nhầm sản phẩm' },
  { key: 'wrong_size_color', value: 'Chọn sai size/màu/phiên bản' },
  { key: 'payment_issues', value: 'Vấn đề thanh toán' },
  { key: 'other', value: 'Lý do khác' }
];

export const userDisableReasons: ItemList[] = [
  { key: 'spam', value: 'Tài khoản spam hoặc lạm dụng' },
  { key: 'violation', value: 'Vi phạm chính sách cộng đồng' },
  { key: 'fraud', value: 'Hành vi gian lận' },
  { key: 'fake', value: 'Tài khoản giả mạo' },
  { key: 'other', value: 'Lý do khác' }
];

export const getRejectReasons = (type: RejectType): ItemList[] => {
  switch (type) {
    case 'order':
      return defaultRejectOrderReasons;
    case 'shipping':
      return defaultRejectShippingReasons;
    case 'order-user':
      return userCancelOrderReasons;
    case 'user':
      return userDisableReasons;
    default:
      return defaultRejectOrderReasons;
  }
};

export const getReasonValueByKey = (key: string): string | undefined => {
  const allReasons = [
    ...defaultRejectOrderReasons,
    ...defaultRejectShippingReasons,
    ...userCancelOrderReasons,
    ...userDisableReasons
  ];

  const foundItem = allReasons.find(item => item.key === key);
  return foundItem?.value;
};