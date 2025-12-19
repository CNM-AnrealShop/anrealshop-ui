import { Badge, Box, Divider, Group, Image, Text } from '@mantine/core';
import React from 'react';
import { useOrderStatus } from '../../../../hooks/useOrderStatus';
import type { ShippingOrderItemDto } from '../../../../types/OrderType';

interface OrderItemProps {
    item: ShippingOrderItemDto;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
    const { getStatusLabel, getStatusColor } = useOrderStatus();
    const latestStatus = item.shippingHistory.length > 0 ? item.shippingHistory[item.shippingHistory.length - 1].status : '';

    return (
        <Box mb="md">
            <Group align="flex-start" gap="md">
                <Image
                    src={item.productImage}
                    className="h-20 w-20 object-cover"
                    radius="sm"
                    alt={item.productName}
                />

                <Box style={{ flex: 1 }}>
                    <Text fw={500} lineClamp={2}>{item.productName}</Text>
                    <Text size="sm" color="dimmed">
                        Số lượng: {item.productQuantity}
                    </Text>
                    <Group mt="xs">
                        <Badge color={getStatusColor(latestStatus)}>
                            {getStatusLabel(latestStatus)}
                        </Badge>
                        <Badge color="blue" variant="light">
                            {item.shippingMethod}
                        </Badge>
                    </Group>
                </Box>
            </Group>

            {item.shippingHistory && item.shippingHistory.length > 0 && (
                <Box mt="md" pl="md" className="border-l-2 border-gray-200">
                    <Text size="sm" fw={500} mb="xs">Trạng thái vận chuyển:</Text>
                    {item.shippingHistory.map((history, idx) => (
                        <Text key={idx} size="xs" color="dimmed" mb={4}>
                            {/* {formatDate(history.timestamp.toString())}: {history.title} */}
                            fix nhe hai {history.id}
                        </Text>
                    ))}
                </Box>
            )}

            <Divider my="md" />
        </Box>
    );
};

export default OrderItem;
