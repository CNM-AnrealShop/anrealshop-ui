import { ActionIcon, Avatar, Badge, Box, Card, Checkbox, Group, Text, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { FiClock, FiMessageSquare, FiTrash2, FiUser } from 'react-icons/fi';
import { getRejectReasons } from '../../../../../data/RejectData';
import type { PreparingStatus } from '../../../../../hooks/useOrder';
import { useOrderStatus } from '../../../../../hooks/useOrderStatus';
import type { OrderItemDto } from '../../../../../types/OrderType';
import { formatDate } from '../../../../../untils/Untils';
import RejectModal from '../../../../RejectModal/RejectModal';
import Header from './HeaderListView';
import { SkeletonOrderShip } from './SkeletonOrderShip';

interface OrderShippingProductListProps {
    orders: OrderItemDto[];
    selectedOrder: string[];
    preparingStatus?: PreparingStatus;
    selectAll: boolean;
    isLoading: boolean;
    onSelectAll: () => void;
    onSelectOrder: (id: string) => void;
    onCancelOrder?: (orderItemId: string, reason: string) => void;
}

const OrderShippingProductList = ({
    orders,
    selectedOrder,
    preparingStatus,
    selectAll,
    isLoading,
    onSelectAll,
    onSelectOrder,
    onCancelOrder
}: OrderShippingProductListProps) => {

    const { getStatusLabel, getStatusColor } = useOrderStatus();
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState('');
    const [currentRejectType, setCurrentRejectType] = useState<'order' | 'shipping'>('order');

    const handleRejectConfirm = (reason: string) => {
        if (onCancelOrder && currentOrderId) {
            onCancelOrder(currentOrderId, reason);
        }
    }

    const openRejectModal = (shippingId: string, rejectType: 'order' | 'shipping') => {
        setCurrentOrderId(shippingId);
        setCurrentRejectType(rejectType);
        setRejectModalOpen(true);
    };

    return (
        <>
            <Card shadow="xs" p="md" radius="md">
                {isLoading ? (
                    <SkeletonOrderShip />
                ) : (
                    <>
                        <Header
                            selectAll={selectAll}
                            onSelectAll={onSelectAll}
                        />
                        <div className="space-y-3 min-h-[60vh]">
                            {orders.map((order) => {
                                return (
                                    <Card
                                        key={order.shopOrderId}
                                        withBorder
                                        p={0}
                                        className="order-card"
                                        shadow="xs"
                                    >
                                        <Box className="bg-gray-50 border-b border-gray-100" px="md" py="xs">
                                            <Group justify="space-between" align="center">
                                                <Group gap="sm">
                                                    <Checkbox
                                                        checked={selectAll || selectedOrder.includes(order.shopOrderId)}
                                                        onChange={() => {
                                                            onSelectOrder(order.shopOrderId);
                                                        }}
                                                        disabled={order.orderStatus === 'PREPARING' && preparingStatus === 'all'}
                                                    />
                                                    <Avatar
                                                        radius="xl"
                                                        size="sm"
                                                        src={order.customerImage || undefined}
                                                        color="blue"
                                                    >
                                                        {order.customerName?.charAt(0) || <FiUser size={14} />}
                                                    </Avatar>
                                                    <div>
                                                        <Text size="sm" fw={500}>
                                                            {order.customerName}
                                                        </Text>
                                                    </div>
                                                    <Tooltip label="Nhắn tin cho khách hàng">
                                                        <ActionIcon variant="subtle" color="gray">
                                                            <FiMessageSquare size={16} />
                                                        </ActionIcon>
                                                    </Tooltip>
                                                </Group>

                                                <Group>
                                                    {order.orderStatus === 'PREPARING' && (
                                                        <>
                                                            <div className="col-span-1 text-center">
                                                                <Tooltip label={"Hủy đơn vận"}>
                                                                    <ActionIcon
                                                                        color="red"
                                                                        variant="subtle"
                                                                        onClick={() => openRejectModal(order.shippingId, order.orderStatus !== 'PREPARING' ? 'shipping' : 'order')}
                                                                    >
                                                                        <FiTrash2 size={16} />
                                                                    </ActionIcon>
                                                                </Tooltip>
                                                            </div>
                                                            <Text size="sm" c="dimmed">|</Text>
                                                        </>
                                                    )}

                                                    <Text size="sm" c="dimmed">
                                                        Mã đơn hàng:
                                                        <Text component="span" fw={500} className='ml-1 hover:text-primary cursor-pointer !underline'>
                                                            #{order.shopOrderId?.substring(0, 15)}...
                                                        </Text>
                                                    </Text>
                                                </Group>
                                            </Group>
                                        </Box>

                                        {order.productOrderItemDtoSet.map((product, index) => (
                                            <Box
                                                key={product.orderItemId}
                                                className={`${index !== order.productOrderItemDtoSet.length - 1 ? 'border-b border-gray-100' : ''}`}
                                            >
                                                <Box className="px-4 py-3">
                                                    <div className="grid grid-cols-12 gap-4 items-center">
                                                        <div className="col-span-5">
                                                            <div className="flex gap-3">
                                                                <img
                                                                    src={product.productImage}
                                                                    alt={product.productName}
                                                                    className="w-[60px] h-[60px] object-cover rounded border border-gray-100"
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="text-sm font-medium mb-1 line-clamp-2 overflow-hidden">
                                                                        {product.productName}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">
                                                                        Phiên bản: {product.variant}
                                                                    </div>
                                                                </div>
                                                                <div className="text-sm">
                                                                    x{product.quantity}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-span-3">
                                                            <div className="h-full flex flex-col">
                                                                <div className="text-sm font-medium mb-1">
                                                                    {order.shippingMethod || 'Nhanh'}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {order.shippingId ? `Mã: ${order.shippingId}` : 'Lưu ý: Tạo đơn để lấy mã'}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-span-2">
                                                            <Text size="xs">
                                                                <FiClock size={12} className="inline-block mr-1" />
                                                                {product.submitConfirmDate ? formatDate(product.submitConfirmDate) : '-'}
                                                            </Text>
                                                        </div>

                                                        <div className="col-span-2 flex items-center justify-center" >
                                                            <Badge
                                                                color={getStatusColor(product.orderStatus)}
                                                                variant="light"
                                                            >
                                                                {getStatusLabel(order.orderStatus)}
                                                            </Badge>
                                                        </div>
                                                        {/* {product.orderStatus !== "SHIPPING" && (
                                                            <div className="col-span-1 text-center">
                                                                <Tooltip label={product.orderStatus === 'PREPARING' ? "Hủy đơn" : "Hủy đơn vận"}>
                                                                    <ActionIcon
                                                                        color="red"
                                                                        variant="subtle"
                                                                        onClick={() => openRejectModal(product.orderItemId, product.orderStatus !== 'PREPARING' ? 'shipping' : 'order')}
                                                                    >
                                                                        <FiTrash2 size={16} />
                                                                    </ActionIcon>
                                                                </Tooltip>
                                                            </div>
                                                        )} */}
                                                    </div>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Card>
                                )
                            })}
                        </div>
                    </>
                )}

            </Card>
            <RejectModal
                data={getRejectReasons(currentRejectType)}
                opened={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                onConfirm={handleRejectConfirm}
                orderId={currentOrderId}
            />
        </>
    );
};

export default OrderShippingProductList;