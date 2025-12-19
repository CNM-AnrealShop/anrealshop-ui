import type { OrderStatusDto } from "../types/OrderType";

export const OrderStatusDefaultDataAdmin: OrderStatusDto[] = [
  {
    id: 'ALL',
    name: 'Tất cả',
    count: 0
  },
  {
    id: 'PENDING_CONFIRMATION',
    name: 'Chờ xác nhận',
    count: 0
  },
  {
    id: 'PREPARING',
    name: 'Đang chuẩn bị',
    count: 0
  },
  {
    id: 'SHIPPING',
    name: 'Đang vận chuyển',
    count: 0
  },
  {
    id: 'DELIVERED',
    name: 'Đã giao',
    count: 0
  },
  {
    id: 'CLOSED',
    name: 'Hủy/Hoàn/Trả',
    count: 0
  }
];

export const OrderStatusDefaultDataUser: OrderStatusDto[] = [
  {
    id: 'INIT_PROCESSING',
    name: 'Chờ xử lý',
    count: 0
  },
  {
    id: 'PENDING_CONFIRMATION',
    name: 'Chờ xác nhận',
    count: 0
  },
  {
    id: 'CONFIRMED',
    name: 'Đang chuẩn bị',
    count: 0
  },
  {
    id: 'SHIPPING',
    name: 'Đang vận chuyển',
    count: 0
  },
  {
    id: 'DELIVERED',
    name: 'Hoàn thành',
    count: 0
  },
  {
    id: 'CANCELED',
    name: 'Hủy đơn',
    count: 0
  },
  {
    id: 'REFUND',
    name: 'Hoàn/Trả',
    count: 0
  }
];

