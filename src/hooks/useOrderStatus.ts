import { useCallback, useMemo } from 'react';
import { FiBox, FiCheckCircle, FiClock, FiPackage, FiTruck, FiX } from 'react-icons/fi';
import type { OrderStatus } from '../types/OrderType';

export const useOrderStatusIcon = () => {
    return useMemo(() => ({
        getStatusIcon: (statusId: string) => {
            switch (statusId.toLowerCase()) {
                case 'all':
                    return FiPackage;
                case 'init_processing':
                    return FiBox;
                case 'pending_confirmation':
                    return FiClock;
                case 'confirmed':
                    return FiCheckCircle;
                case 'preparing':
                    return FiPackage;
                case 'shipping':
                    return FiTruck;
                case 'delivered':
                    return FiCheckCircle;
                case 'canceled':
                case 'closed':
                    return FiX;
                default:
                    return FiPackage;
            }
        }
    }), []);
};

export const useOrderStatusColor = () => {
    return useMemo(() => ({
        getStatusColor: (statusId: string) => {
            switch (statusId.toLowerCase()) {
                case 'all':
                    return 'gray';
                case 'init_processing':
                    return 'blue';
                case 'pending_confirmation':
                    return 'yellow';
                case 'confirmed':
                    return 'cyan';
                case 'preparing':
                    return 'teal';
                case 'shipping':
                    return 'indigo';
                case 'delivered':
                    return 'green';
                case 'canceled':
                case 'closed':
                    return 'red';
                default:
                    return 'gray';
            }
        },
        getStatusIconColor: (statusId: string) => {
            switch (statusId.toLowerCase()) {
                case 'all':
                    return '#6b7280'; // gray
                case 'init_processing':
                    return '#3b82f6'; // blue
                case 'pending_confirmation':
                    return '#eab308'; // yellow
                case 'confirmed':
                    return '#06b6d4'; // cyan
                case 'preparing':
                    return '#14b8a6'; // teal
                case 'shipping':
                    return '#4f46e5'; // indigo
                case 'delivered':
                    return '#22c55e'; // green
                case 'canceled':
                case 'closed':
                    return '#ef4444'; // red
                default:
                    return '#6b7280'; // gray
            }
        }
    }), []);
};

export const useOrderStatusLabel = () => {
    return useMemo(() => ({
        getStatusLabel: (statusId: string) => {
            switch (statusId.toLowerCase()) {
                case 'all':
                    return 'Tất cả';
                case 'init_processing':
                    return 'Đang xử lý';
                case 'pending_confirmation':
                    return 'Chờ xác nhận';
                case 'confirmed':
                    return 'Đã xác nhận';
                case 'preparing':
                    return 'Chờ lấy hàng';
                case 'shipping':
                    return 'Đang giao';
                case 'delivered':
                    return 'Đã giao';
                case 'canceled':
                    return 'Đã hủy';
                case 'closed':
                    return 'Hủy/Hoàn/Trả';
                default:
                    return 'Không xác định';
            }
        }
    }), []);
};


export const useOrderStatus = () => {
    const { getStatusIcon } = useOrderStatusIcon();
    const { getStatusColor, getStatusIconColor } = useOrderStatusColor();
    const { getStatusLabel } = useOrderStatusLabel();

    const convertStatus = useCallback((status: string): OrderStatus => {
        const normalizedStatus = status.toUpperCase().replace(/-/g, '_');

        switch (normalizedStatus) {
            case 'ALL':
            case 'INIT_PROCESSING':
            case 'PENDING_CONFIRMATION':
            case 'CONFIRMED':
            case 'PREPARING':
            case 'SHIPPING':
            case 'DELIVERED':
            case 'CANCELED':
            case 'CLOSED':
                return normalizedStatus as OrderStatus;
            default:
                return 'ALL';
        }
    }, []);

    return {
        getStatusIcon,
        getStatusColor,
        getStatusIconColor,
        getStatusLabel,
        convertStatus,
    };
};