import { useCallback, useEffect, useState } from 'react';
import showErrorNotification from '../components/Toast/NotificationError';
import showSuccessNotification from '../components/Toast/NotificationSuccess';
import { OrderStatusDefaultDataAdmin } from '../data/OrderData';
import { OrderService } from '../service/OrderService';
import { getErrorMessage } from '../untils/ErrorUntils';
import type { 
  OrderRejectRequest, 
  OrderStatusDto, 
  ShopOrderStatus 
} from '../types/OrderType';
import type { TypeMode } from '../constant';

export interface UseOrderParams {
  page?: number;
  limit?: number;
  mode?: ModeType;
  status?: ShopOrderStatus | 'all';
  search?: string;
  searchType?: SearchType;
  confirmSD?: string | null;
  confirmED?: string | null;
  orderType?: OrderCountType;
  preparingStatus?: PreparingStatus;
  sortBy?: string | null;
}

interface UseOrderOptions {
  mode?: TypeMode;
  autoFetch?: boolean;
  initialParams?: UseOrderParams;
}

interface UseOrderState {
  orders: any[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  isLoadingOrders: boolean;
  isLoadingMetadata: boolean;
  error: string | null;
  isEmpty: boolean;
} 

export type SearchType = 'order_code' | 'customer_name' | 'product_name' | 'shipping_code';
export type ModeType = 'home' | 'shipping';
export type OrderCountType = 'all' | 'one' | 'more';
export type PreparingStatus = 'all' | 'preparing' | 'confirmed';

export const useOrder = (options: UseOrderOptions = {}) => {
  const { autoFetch = false, initialParams, mode = 'myshop' } = options;

  const [state, setState] = useState<UseOrderState>({
    orders: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    isLoadingOrders: false,
    isLoadingMetadata: false,
    error: null,
    isEmpty: true,
  });

  const [orderMetadata, setOrderMetadata] = useState<OrderStatusDto[]>(OrderStatusDefaultDataAdmin);

  // === FETCH ORDERS ===
  const fetchOrders = useCallback(async (params?: UseOrderParams) => {
    setState(prev => ({ ...prev, isLoadingOrders: true, error: null }));
    try {

      console.log('Fetching orders with params:', params, 'in mode:', mode);
      const response = mode === 'user'
        ? await OrderService.getUserOrders(params)
        : await OrderService.getMyShopOrders(params);

      console.log('Fetched orders:', response);
      const orderItems =
        Array.isArray(response.orderItemDtoSet) &&
        response.orderItemDtoSet.length === 1 &&
        response.orderItemDtoSet[0] === null
          ? []
          : response.orderItemDtoSet;

      setState(prev => ({
        ...prev,
        orders: orderItems,
        totalCount: response.totalCount ?? 0,
        totalPages: response.totalPages ?? 0,
        currentPage: (params?.page || 0) + 1,
        isLoadingOrders: false,
        isEmpty: !orderItems || orderItems.length === 0,
      }));

      return response;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setState(prev => ({
        ...prev,
        isLoadingOrders: false,
        error: message,
        orders: [],
        totalCount: 0,
        totalPages: 0,
        isEmpty: true,
      }));
      showErrorNotification('Lỗi tải đơn hàng', message);
      throw err;
    }
  }, [mode]);

  // === FETCH ORDER METADATA ===
  const fetchOrderMetadata = useCallback(async () => {
    setState(prev => ({ ...prev, isLoadingMetadata: true }));
    try {
      const metadata = await OrderService.getOrderMetaData();
      setOrderMetadata(metadata);
      setState(prev => ({ ...prev, isLoadingMetadata: false }));
      return metadata;
    } catch (err: any) {
      const message = getErrorMessage(err);
      showErrorNotification('Lỗi tải thông tin đơn hàng', message);
      setState(prev => ({ ...prev, isLoadingMetadata: false }));
      return orderMetadata; // fallback
    }
  }, [orderMetadata]);

  // === ACTIONS ===
  const approveOrder = useCallback(async (shopOrderId: string) => {
    try {
      await OrderService.approveOrder(shopOrderId);
      showSuccessNotification('Duyệt đơn hàng', 'Đơn hàng đã được duyệt thành công.');
      return true;
    } catch (err: any) {
      showErrorNotification('Lỗi duyệt đơn hàng', getErrorMessage(err));
      return false;
    }
  }, []);

  const approveOrders = useCallback(async (shopOrderIds: string[]) => {
    try {
      await OrderService.approveOrders(shopOrderIds);
      showSuccessNotification('Duyệt đơn hàng', 'Các đơn hàng đã được duyệt thành công.');
      return true;
    } catch (err: any) {
      showErrorNotification('Lỗi duyệt đơn hàng', getErrorMessage(err));
      return false;
    }
  }, []);

  const rejectOrder = useCallback(async (orderItemId: string, reason: string) => {
    try {
      await OrderService.rejectOrder(orderItemId, reason);
      showSuccessNotification('Từ chối đơn hàng', 'Đơn hàng đã được từ chối thành công.');
      return true;
    } catch (err: any) {
      showErrorNotification('Lỗi từ chối đơn hàng', getErrorMessage(err));
      return false;
    }
  }, []);

  const rejectOrders = useCallback(async (orderRejectRequest: OrderRejectRequest) => {
    try {
      await OrderService.rejectOrders(orderRejectRequest);
      showSuccessNotification('Từ chối đơn hàng', 'Các đơn hàng đã được từ chối thành công.');
      return true;
    } catch (err: any) {
      showErrorNotification('Lỗi từ chối đơn hàng', getErrorMessage(err));
      return false;
    }
  }, []);

  const rejectShopOrder = useCallback(async (shopOrderId: string, reason: string) => {
    try {
      await OrderService.rejectShopOrder(shopOrderId, reason);
      showSuccessNotification('Từ chối đơn hàng', 'Đơn hàng đã được từ chối thành công.');
      return true;
    } catch (err: any) {
      showErrorNotification('Lỗi từ chối đơn hàng', getErrorMessage(err));
      return false;
    }
  }, []);

  // === UTILITIES ===
  const refresh = useCallback(async (params?: UseOrderParams) => {
    return Promise.allSettled([
      fetchOrders(params || initialParams),
      fetchOrderMetadata(),
    ]);
  }, [fetchOrders, fetchOrderMetadata, initialParams]);

  const reset = useCallback(() => {
    setState({
      orders: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      isLoadingOrders: false,
      isLoadingMetadata: false,
      error: null,
      isEmpty: true,
    });
  }, []);

  // === AUTO FETCH (nếu được cấu hình) ===
  useEffect(() => {
    if (autoFetch) {
      Promise.allSettled([
        fetchOrderMetadata(),
        fetchOrders(initialParams),
      ]);
    }
  }, [autoFetch, fetchOrders, fetchOrderMetadata, initialParams]);

  return {
    ...state,
    orderMetadata,

    // Actions
    fetchOrders,
    fetchOrderMetadata,
    refresh,
    reset,
    approveOrder,
    approveOrders,
    rejectOrder,
    rejectOrders,
    rejectShopOrder,

    // Flags tiện lợi
    hasOrders: state.orders.length > 0,
    hasError: !!state.error,
    isLoadingOrders: state.isLoadingOrders,
    isLoadingMetadata: state.isLoadingMetadata,
  };
};
