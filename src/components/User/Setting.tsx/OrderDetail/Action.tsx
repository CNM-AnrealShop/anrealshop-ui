import { Box, Button, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import { FiShoppingBag, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getRejectReasons } from '../../../../data/RejectData';
import RejectModal from '../../../RejectModal/RejectModal';
import type { UserOrderDetailDto } from '../../../../types/OrderType';

interface ActionProps {
    status: string;
    statusLabel: string;
    isReviewed: boolean;
    handleCancelOrder: (orderItemId: string, reason: string) => void;
    orderDetail: UserOrderDetailDto | null;
}

const Action: React.FC<ActionProps> = ({ status, statusLabel, isReviewed, handleCancelOrder, orderDetail }) => {
    const navigate = useNavigate();
    const [rejectModalOpen, setRejectModalOpen] = useState(false);

    const handleRejectConfirm = (reason: string) => {
        if (handleCancelOrder && orderDetail) {
            handleCancelOrder(orderDetail?.shopOrderId || '', reason);
        }
    }

    const getStatusDescription = () => {
        switch (status) {
            case 'PENDING_CONFIRMATION':
                return '(Shop sẽ xác nhận đơn hàng trong vòng 24 giờ)';
            case 'PREPARING':
                return '(Shop đang chuẩn bị hàng)';
            case 'SHIPPING':
            case 'IN_TRANSIT':
                return '(Đơn hàng đang được giao đến bạn)';
            case 'DELIVERED':
                return !isReviewed ? '(Đánh giá sản phẩm để nhận thêm điểm thưởng)' : '';
            default:
                return '';
        }
    };

    return (
        <Box className="mt-8 bg-gray-50 p-4 rounded-md">
            <Group justify="space-between" align="center">
                <div>
                    <Group gap="xs">
                        <Text size="sm" fw={600}>
                            {statusLabel}
                        </Text>
                        <Text size="xs" color="dimmed">
                            {getStatusDescription()}
                        </Text>
                    </Group>
                </div>
                <Group>
                    <Button
                        variant="light"
                        size="sm"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                        Liên hệ người bán
                    </Button>

                    {/* Buy again button - visible for completed orders */}
                    {status === 'DELIVERED' && (
                        <Button
                            variant="outline"
                            size="sm"
                            leftSection={<FiShoppingBag size={14} />}
                            onClick={() => navigate('/products')}
                        >
                            Mua lại
                        </Button>
                    )}

                    {/* Review button - visible for delivered orders that haven't been reviewed */}
                    {status === 'DELIVERED' && !isReviewed && (
                        <Button
                            variant="filled"
                            size="sm"
                            leftSection={<FiStar size={14} />}
                        >
                            Đánh giá sản phẩm
                        </Button>
                    )}

                    {/* Cancel button - visible for pending orders */}
                    {status === 'PENDING_CONFIRMATION' && (
                        <Button
                            variant="outline"
                            color="red"
                            size="sm"
                            onClick={() => setRejectModalOpen(true)}
                        >
                            Hủy đơn hàng
                        </Button>
                    )}
                </Group>
            </Group>
            <RejectModal
                data={getRejectReasons('order-user')}
                opened={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                onConfirm={handleRejectConfirm}
                orderId={orderDetail?.shopOrderId || ''}
            />
        </Box>
    );
};

export default Action;
