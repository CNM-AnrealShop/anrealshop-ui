import { useCallback, useEffect, useState } from 'react';
import { useMemo } from "react";
import type { PreparingShippingStatus } from '../components/Myshop/Order/Data';
import showErrorNotification from '../components/Toast/NotificationError';
import showSuccessNotification from '../components/Toast/NotificationSuccess';
import type { TypeMode } from '../constant';
import { ShipmentService } from '../service/ShipmentService';
import type { CreateShipmentRequest, MyShopShippingListResponse, ShippingItems } from '../types/ShipmentType';
import { getErrorMessage } from '../untils/ErrorUntils';
import type { SearchType } from './useOrder';

export type shipParams = {
    page?: number;
    limit?: number;
    search?: string;
    searchType?: SearchType;
    preparingStatus?: PreparingShippingStatus;
    sortBy?: string | null;
}

interface UseOptions {
    mode?: TypeMode;
    autoFetch?: boolean;
    initialParams?: shipParams;
}

interface UseState {
    data: ShippingItems[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
    isEmpty: boolean;
}

export const useShipping = (options: UseOptions = {}) => {
    const { autoFetch = false, initialParams, mode = 'myshop' } = options;

    const [state, setState] = useState<UseState>({
        data: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        isLoading: false,
        error: null,
        isEmpty: true
    });

    const fetchData = useCallback(async (params?: shipParams) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            error: null
        }));
        try {
            console.log('Fetching shipping data with params:', mode, params);
            const response: MyShopShippingListResponse = await ShipmentService.getMyShopShipping(params);
            const orderItems = Array.isArray(response.orderItemDtoSet) && response.orderItemDtoSet.length === 1 && response.orderItemDtoSet[0] === null ? [] : response.orderItemDtoSet;
            setState(prev => ({
                ...prev,
                data: orderItems || [],
                totalCount: response.totalCount || 0,
                totalPages: response.totalPages || 0,
                currentPage: (params?.page || 0) + 1,
                isLoading: false,
                error: null,
                isEmpty: !orderItems || orderItems.length === 0
            }));

            return response;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);

            setState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
                orders: [],
                totalCount: 0,
                totalPages: 0,
                isEmpty: true
            }));

            showErrorNotification('Lỗi tải đơn hàng', errorMessage);
            throw err;
        }
    }, []);


    const refresh = useCallback(async (params?: shipParams) => {
        return fetchData(params || initialParams);
    }, [fetchData, initialParams]);

    const reset = useCallback(() => {
        setState({
            data: [],
            totalCount: 0,
            totalPages: 0,
            currentPage: 1,
            isLoading: false,
            error: null,
            isEmpty: true
        });
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchData(initialParams);
        }
    }, [autoFetch, fetchData, initialParams]);

    // ACTION

    const rejectShippingItem = useCallback(async (shippingId: string, reason: string) => {
        return await ShipmentService.rejectMyshopShipping(shippingId, reason)
            .then(() => {
                showSuccessNotification('Hủy đơn hàng thành công', 'Đơn hàng đã được hủy thành công.');
            })
            .catch((error) => {
                showErrorNotification('Lỗi khi hủy đơn hàng', getErrorMessage(error));
            });
    }, [])

    const createShipping = useCallback(async (createShipmentRequest: CreateShipmentRequest) => {
        return await ShipmentService.createShipments(createShipmentRequest)
            .then(() => {
                showSuccessNotification('Tạo đơn giao hàng thành công', 'Đơn giao hàng đã được tạo thành công.');
            })
            .catch((error) => {
                showErrorNotification('Lỗi khi tạo đơn giao hàng', getErrorMessage(error));
            })
    }, [])
    // status
    const { getShippingStatusLabel } = useShippingStatusLabel();

    return {
        // State
        ...state,

        // Actions
        fetchShipping: fetchData,
        refresh,
        reset,
        createShipping,
        rejectShippingItem,
        
        // status
        getShippingStatusLabel,

        // Computed values 
        hasOrders: state.data.length > 0,
        hasError: !!state.error,
        hasNextPage: state.currentPage < state.totalPages,
        hasPrevPage: state.currentPage > 1,
    };
};




export type ShippingStatus = 'ORDER_CREATED' | 'WAITING_FOR_PICKUP' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'DELIVERY_FAILED' | 'RETURNED';

export const useShippingStatusLabel = () => {
    return useMemo(() => ({
        getShippingStatusLabel: (statusId: string) => {
            switch (statusId.toLowerCase()) {
                case 'order_created':
                    return 'Đơn hàng đã được tạo';
                case 'waiting_for_pickup':
                    return 'Chờ lấy hàng';
                case 'picked_up':
                    return 'Đã lấy hàng';
                case 'in_transit':
                    return 'Đang vận chuyển';
                case 'out_for_delivery':
                    return 'Đang giao hàng';
                case 'delivered':
                    return 'Đã giao hàng';
                case 'delivery_failed':
                    return 'Giao hàng thất bại';
                case 'returned':
                    return 'Đã trả hàng';
                default:
                    return 'Không xác định';
            }
        }
    }), []);
};

