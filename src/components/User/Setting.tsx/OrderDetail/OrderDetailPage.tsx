import {
    Box,
    Button,
    Divider,
    Group,
    Image,
    Paper,
    Rating,
    Skeleton,
    Stack,
    Text,
    Title
} from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FaStore } from 'react-icons/fa';
import {
    FiArrowLeft,
    FiMessageSquare
} from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderStatus } from '../../../../hooks/useOrderStatus';
import { OrderService } from '../../../../service/OrderService';
import type { UserOrderDetailDto } from '../../../../types/OrderType';
import { formatPrice } from '../../../../untils/Untils';
import { ButtonCopy } from '../../../common/ButtonCopy';
import PageNotFound from '../../../common/PageNotFound';
import Action from './Action';
import AddressInfo from './AddressInfo';
import HistoryStatus from './HistoryStatus';
import LineStatus from './LineStatus';
import PaymentInfo from './PaymentInfo';


export const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const { getStatusLabel, getStatusColor } = useOrderStatus();
    const [loading, setLoading] = useState(true);
    const [orderDetail, setOrderDetail] = useState<UserOrderDetailDto | null>();
    const [activeStep, setActiveStep] = useState(0);

    const { rejectShopOrder } = OrderService;

    const handleLoadOrders = useCallback(() => {
        setLoading(true);

        if (orderId) {
            OrderService.getOrderDetail(orderId)
                .then((data) => {
                    setOrderDetail(data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [orderId]);

    useEffect(() => {
        handleLoadOrders();
    }, [orderId]);

    const handleCancelOrder = useCallback((orderItemId: string, reason: string) => {
        rejectShopOrder(orderItemId, reason)
            .then(() => {
                handleLoadOrders();
            });
    }, [rejectShopOrder, handleLoadOrders]);

    useEffect(() => {
        if (orderDetail) {
            switch (orderDetail.shopOrderStatus) {
                case 'INIT_PROCESSING':
                    setActiveStep(0);
                    break;
                case 'PENDING_CONFIRMATION':
                    setActiveStep(1);
                    break;
                case 'CONFIRMED':
                case 'PREPARING':
                case 'SHIPPING':
                    setActiveStep(2);
                    break;
                case 'DELIVERED':
                    setActiveStep(orderDetail.isReviewed ? 4 : 3);
                    break;
                case 'CLOSED':
                    setActiveStep(5);
                    break;
                default:
                    setActiveStep(0);
            }
        }
    }, [orderDetail]);

    if (loading) {
        return (
            <Box>
                <Skeleton height={30} width={200} mb="lg" />
                <Skeleton height={200} mb="lg" />
                <Skeleton height={300} mb="lg" />
                <Skeleton height={200} />
            </Box>
        );
    }

    if (!orderDetail) {
        return (
            <PageNotFound
                title="Không tìm thấy đơn hàng"
                description="Đơn hàng bạn đang tìm kiếm không tồn tại."
                redirectLink="/settings/orders"
                redirectLabel="Quay lại danh sách đơn hàng"
            />
        );
    }

    return (
        <Box>
            <Group justify="space-between" mb="md" wrap="nowrap">
                <Button
                    variant="subtle"
                    leftSection={<FiArrowLeft size={16} />}
                    onClick={() => navigate('/settings/orders')}
                >
                    Trở về
                </Button>
                <Group gap="md">
                    <Group gap={5}>
                        <Title order={4} fw={400} size={"sm"} className="">
                            Mã đơn: <span className='underline'> #{orderDetail.shopOrderId.substring(0, 13)}</span>
                        </Title>
                        <ButtonCopy id={orderDetail.shopOrderId} />
                    </Group>
                    | <Text size='sm' color={getStatusColor(orderDetail.shopOrderStatus)}>
                        {getStatusLabel(orderDetail.shopOrderStatus).toUpperCase()}
                    </Text>
                </Group>
            </Group>

            <Divider my={0} />

            <Box className='pt-10 pb-6'>
                <LineStatus activeStep={activeStep} />
                <Action
                    status={orderDetail.shopOrderStatus}
                    statusLabel={getStatusLabel(orderDetail.shopOrderStatus)}
                    isReviewed={orderDetail.isReviewed}
                    handleCancelOrder={handleCancelOrder}
                    orderDetail={orderDetail}
                />
            </Box>

            <Divider my="lg" />
            <Box>
                <Group align="flex-start" gap="md" style={{ flexWrap: 'nowrap' }}>
                    <Box style={{ flex: '3' }}>
                        <AddressInfo
                            name={orderDetail.address.receiverOrSenderName}
                            phone={orderDetail.address.phoneNumber}
                            address={orderDetail.address.detailAddress}
                            title="Địa chỉ nhận hàng"
                            shippingCarrier="SPX Express"
                            trackingNumber={orderDetail.shippingId}
                        />
                    </Box>

                    <Box style={{ flex: '7' }}>
                        <HistoryStatus
                            historyItems={orderDetail.orderHistory}
                            title="Lịch sử vận chuyển"
                            initialCollapsed={true}
                            itemsToShowWhenCollapsed={3}
                        />
                    </Box>
                </Group>
            </Box>

            <Divider my="lg" />

            <Box mb="lg">
                <Paper withBorder p="md" radius="md">
                    <Group justify="apart" mb="md">
                        <Group>
                            <FaStore size={16} className="text-primary" />
                            <Title order={5} className='hover:underline cursor-pointer'>{orderDetail.shopName}</Title>
                        </Group>
                        <Group>
                            <Button
                                variant="light"
                                size="xs"
                                leftSection={<FiMessageSquare size={14} />}
                            >
                                Chat
                            </Button>
                            <Button
                                variant="outline"
                                size="xs"
                                leftSection={<FaStore size={14} />}
                                onClick={() => navigate(`/shop/${orderDetail.shopId}`)}
                            >
                                Xem Shop
                            </Button>
                        </Group>
                    </Group>

                    <Divider my="md" />

                    <Stack gap="sm" mb="md">
                        {orderDetail.productItems.map((product, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <Divider />}
                                <Group align="flex-start" gap="md">
                                    <Image
                                        src={product.productImage}
                                        className="h-20 w-20 object-cover"
                                        radius="sm"
                                        alt={product.productName}
                                    />

                                    <div style={{ flex: 1 }}>
                                        <Text fw={500} lineClamp={2} >
                                            {product.productName}
                                        </Text>

                                        <Group gap="md" mt="xs">
                                            {product.variant && (
                                                <Text size="xs" color="dimmed">
                                                    {product.variant}
                                                </Text>
                                            )}
                                        </Group>

                                        {product.isReviewed && (
                                            <Group gap="xs" mb="xs">
                                                <Rating value={5} size="sm" readOnly />
                                                <Text size="xs" color="dimmed">Đã đánh giá</Text>
                                            </Group>
                                        )}
                                    </div>

                                    <div className="text-right">
                                        <Text size="xs" color="dimmed" mb="xs">
                                            SL: <Text component="span" fw={500}>{product.quantity}</Text>
                                        </Text>
                                        <Text size="sm" fw={600} color="primary" mb="xs">
                                            {formatPrice(product.price)}
                                        </Text>
                                    </div>
                                </Group>
                            </React.Fragment>
                        ))}
                    </Stack>

                    <Divider my="md" />

                    <PaymentInfo
                        totalProductCost={orderDetail.totalProductCost}
                        shippingFee={orderDetail.shippingFee}
                        shippingDiscount={orderDetail.shippingDiscount}
                        totalCost={orderDetail.totalCost}
                        paymentMethod={orderDetail.paymentMethod}
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default OrderDetail;
