import { ActionIcon, Avatar, Box, Button, Card, Checkbox, Group, Text, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { FiAlertCircle, FiChevronDown, FiChevronUp, FiMessageSquare, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getRejectReasons } from '../../../../../data/RejectData';
import { paymentMethods } from '../../../../../data/ShippingData';
import { useOrderStatus } from '../../../../../hooks/useOrderStatus';
import type { OrderItemDto, OrderRejectRequest, ProductOrderItemDto, ShopOrderStatus } from '../../../../../types/OrderType';
import { formatPrice } from '../../../../../untils/Untils';
import RejectModal from '../../../../RejectModal/RejectModal';
import ModalCreateOrderShip from '../Modal/ModalCreateOrderShip';

interface OrderViewProps {
    items: OrderItemDto[];
    onApproveOrder?: (shopOrderId: string) => void;
    onRejectItem?: (orderId: string, reason: string, rejectType: 'order' | 'shipping') => void;
    onRejectOrders?: (orderRejectRequest: OrderRejectRequest) => void;
    onViewDetail?: (orderId: string) => void;
    onCreateShipOrder?: (orderId: string, pickupDate: string, note: string) => void;
    currentStatus: ShopOrderStatus | 'all';
    selectAll: boolean;
    onSelectOrder: (orderId: string) => void;
    selectedOrder: string[];
}

const OrderView = ({
    items,
    onApproveOrder,
    onRejectItem,
    onCreateShipOrder,
    currentStatus,
    selectAll,
    onSelectOrder,
    selectedOrder
}: OrderViewProps) => {
    const { getStatusLabel } = useOrderStatus();
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [shipModalOpen, setShipModalOpen] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState('');
    const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentRejectType, setCurrentRejectType] = useState<'order' | 'shipping'>('order');


    const calculateOrderTotal = (item: ProductOrderItemDto) => {
        return item.quantity * item.price;
    };

    const handleApprove = (orderShopId: string) => {
        if (onApproveOrder) {
            onApproveOrder(orderShopId);
        }
    };


    const openRejectModal = (shippingId: string, rejectType: 'order' | 'shipping') => {
        setCurrentOrderId(shippingId);
        setCurrentRejectType(rejectType);
        setRejectModalOpen(true);
    };

    const handleRejectConfirm = (reason: string) => {
        if (onRejectItem && currentOrderId) {
            onRejectItem(currentOrderId, reason, currentRejectType);
        }
    }

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    const handleAvailableShip = (orderShopId: string) => {
        setCurrentOrderId(orderShopId);
        setShipModalOpen(true);
    };

    const handleCreateShipOrder = async (orderId: string, pickupDate: string, note: string) => {
        setIsSubmitting(true);
        if (onCreateShipOrder) {
            await onCreateShipOrder(orderId, pickupDate, note);
            setIsSubmitting(false);
            setShipModalOpen(false);
        }
    };

    return (
        <div className="space-y-4">

            {items.map((order) => {
                const isPendingConfirmation = order.orderStatus.includes('PENDING_CONFIRMATION');
                const isAvailableShip = order.orderStatus.includes("CONFIRMED");
                const hasMultipleItems = order.productOrderItemDtoSet.length > 2;
                const isExpanded = expandedOrders[order.shopOrderId] !== false;
                const itemsToShow = isExpanded ? order.productOrderItemDtoSet : order.productOrderItemDtoSet.slice(0, 1);
                const hiddenItemsCount = order.productOrderItemDtoSet.length - itemsToShow.length;

                return (
                    <Card
                        key={order.shopOrderId}
                        withBorder
                        p={0}
                        className="order-card"
                        shadow="xs"
                        mt={"md"}
                    >
                        <Box className="bg-gray-50 border-b-2 border-gray-100" px="md" py="xs">
                            <Group justify="space-between" align="center">
                                <Group gap="sm">
                                    {currentStatus === 'PENDING_CONFIRMATION' && (
                                        <Checkbox
                                            checked={selectAll || selectedOrder.includes(order.shopOrderId)}
                                            onChange={() => {
                                                onSelectOrder(order.shopOrderId);
                                            }}
                                        />
                                    )}
                                    <Avatar
                                        src={order.customerImage}
                                        size="sm"
                                        radius="xl"
                                    />
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

                                <Group >
                                    {order.orderStatus === 'PREPARING' && (
                                        <>
                                            <div className="col-span-1 text-center">
                                                <Tooltip label={"Hủy đơn vận"}>
                                                    <Button
                                                        color="red"
                                                        variant="light"
                                                        size='xs'
                                                        onClick={() => openRejectModal(order.shippingId, order.orderStatus !== 'PREPARING' ? 'shipping' : 'order')}
                                                    >
                                                        Xóa đơn vận
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            <Text size="sm" c="dimmed">|</Text>
                                        </>
                                    )}
                                    {isPendingConfirmation && currentStatus !== 'CLOSED' && (
                                        <>

                                            <Button
                                                variant="light"
                                                onClick={() => handleApprove(order.shopOrderId)}
                                                size="xs"
                                            >
                                                Duyệt đơn
                                            </Button>|</>
                                    )}
                                    {isAvailableShip && currentStatus !== 'CLOSED' && (
                                        <>

                                            <Button
                                                variant="light"
                                                onClick={() => handleAvailableShip(order.shopOrderId)}
                                                size="xs"
                                            >
                                                Hẹn giao hàng
                                            </Button>|</>
                                    )}
                                    <Text size="sm" c="dimmed">
                                        Mã đơn hàng:
                                        <Link to={`/myshop/orders/${order.shopOrderId}`} >
                                            <Text component="span" fw={500} className='hover:text-primary cursor-pointer !underline'> #{order.shopOrderId.substring(0, 15)}</Text>
                                        </Link>
                                    </Text>
                                </Group>
                            </Group>
                        </Box>

                        <Box className={`p-4 ${hasMultipleItems ? 'pb-2' : 'pb-4'}`}>
                            {itemsToShow.map((item, index) => {
                                const totalPrice = calculateOrderTotal(item);
                                const paymentMethod = paymentMethods.filter(pm => pm.key === order.paymentMethod)[0]?.value || order.paymentMethod;
                                return (
                                    <div key={item.orderItemId}>
                                        <div key={`${order.shopOrderId}-${item.productSkuId}`} className={`grid grid-cols-12 gap-4 `}>

                                            <div className="col-span-4">
                                                <div className="flex gap-3">
                                                    <img
                                                        className="w-[60px] h-[60px] object-cover rounded border border-gray-100"
                                                        src={item.productImage}
                                                        alt={item.productName}
                                                    />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium mb-1 line-clamp-2 overflow-hidden">
                                                            {item.productName}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Phiên bản: {item.variant}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm">
                                                        x{item.quantity}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <div className="h-full flex flex-col ">
                                                    <div className="text-sm font-semibold text-gray-800 mb-1">
                                                        {formatPrice(totalPrice)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {paymentMethod}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <div className="h-full flex flex-col ">
                                                    <div className="text-sm font-medium mb-1 flex items-center gap-1">
                                                        {getStatusLabel(item.orderStatus)}
                                                        {item.cancelReason && (
                                                            <Tooltip label={`Lý do hủy: ${item.cancelReason}`} withArrow position="top">
                                                                <ActionIcon size="xs" color="red" radius="xl" variant="transparent">
                                                                    <FiAlertCircle size={16} className="text-red-500" />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {item.isReviewed ? "Đã đánh giá" : "Chưa có đánh giá"}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <div className="h-full flex flex-col ">
                                                    <div className="text-sm font-medium mb-1">
                                                        Nhanh
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {order.shippingMethod}
                                                    </div>
                                                    <div className="text-xs text-gray-600 mt-1">
                                                        #{order.shippingId}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <div className="h-full flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="subtle"
                                                        leftSection={<FiTrash size={14} />}
                                                        onClick={() => openRejectModal(item.orderItemId, 'order')}
                                                        color='black'
                                                        disabled={!isPendingConfirmation || item.cancelReason ? true : false}
                                                        size="sm"
                                                    >
                                                        Từ chối
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        {index < itemsToShow.length - 1 && <hr className="my-2 border-gray-100" />}
                                    </div>
                                );
                            })}

                            {hasMultipleItems && (
                                <div className="mt-4 border-t border-gray-100 flex justify-center">
                                    <Text size="sm" fw={500} className="flex items-center gap-1 !text-gray-400 cursor-pointer hover:!text-gray-900 !pt-2"
                                        onClick={() => toggleOrderExpansion(order.shopOrderId)}
                                    >
                                        {isExpanded
                                            ? 'Thu gọn danh sách'
                                            : `Hiển thị thêm ${hiddenItemsCount} sản phẩm khác`
                                        }
                                        {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                    </Text>
                                </div>
                            )}
                        </Box>
                    </Card>
                );
            })}

            {/* Reject Order Modal */}
            <RejectModal
                data={getRejectReasons(currentRejectType)}
                opened={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                onConfirm={handleRejectConfirm}
                orderId={currentOrderId}
            />

            {/* Create Ship Order Modal */}
            <ModalCreateOrderShip
                opened={shipModalOpen}
                orderId={currentOrderId}
                onClose={() => setShipModalOpen(false)}
                onSubmit={handleCreateShipOrder}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default OrderView;