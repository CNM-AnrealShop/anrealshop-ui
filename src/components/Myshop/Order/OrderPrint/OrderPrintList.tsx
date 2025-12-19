import { ActionIcon, Card, Checkbox, Group, Text, Tooltip } from '@mantine/core';
import { FiCheck, FiClock, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { ShippingItems } from '../../../../types/ShipmentType';
import { formatDate } from '../../../../untils/Untils';

interface OrderPrintListProps {
    shippingData: ShippingItems[];
    selectedShipping: string[];
    selectAll: boolean;
    onSelectShipping: (id: string) => void;
}

const OrderPrintList = ({
    shippingData,
    selectedShipping,
    selectAll,
    onSelectShipping
}: OrderPrintListProps) => {



    return (
        <div className="space-y-3 min-h-[60vh]">
            {shippingData.map((item) => (
                <Card
                    key={item.shopOrderId}
                    withBorder
                    p="xs"
                    className="order-card"
                    shadow="xs"
                >
                    <div className="grid grid-cols-12 gap-3 items-start py-1">
                        <div className="col-span-3">
                            <div className="flex gap-2 items-start">
                                <Checkbox
                                    checked={selectAll || selectedShipping.includes(item.shopOrderId)}
                                    onChange={() => onSelectShipping(item.shopOrderId)}
                                    className="mt-2"
                                />
                                <div className="flex flex-col ml-2">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <Link to={`/orders/${item.shopOrderId}`}>
                                                <Text size="xs" fw={500} className="!underline hover:text-primary cursor-pointer">
                                                    #{item.shopOrderId}
                                                </Text>
                                            </Link>
                                            <Tooltip
                                                label={`Đơn hàng có ${item.countOrderItems} sản phẩm`}
                                                withArrow
                                                position="top"
                                            >
                                                <Text size="xs" c="dimmed">
                                                    {item.countOrderItems} sản phẩm
                                                </Text>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <Tooltip label={`Ngày tạo: ${item.createdAt ? formatDate(item.createdAt) : '-'}`} withArrow position="top">
                                        <Text size="xs" c="dimmed">
                                            Tạo: {item.createdAt ? formatDate(item.createdAt) : '-'}
                                        </Text>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex flex-col">
                                <Group gap="xs" mb={1}>
                                    <Tooltip label={`Khách hàng: ${item.customerName}`} withArrow position="top">
                                        <Text size="xs" fw={500} lineClamp={1}>
                                            {item.customerName}
                                        </Text>
                                    </Tooltip>
                                </Group>
                                <Tooltip label={`Liên hệ: ${item.customerPhone}`} withArrow position="top">
                                    <Text size="xs" c="dimmed">
                                        SĐT: {item.customerPhone}
                                    </Text>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex flex-col">
                                <Text size="xs" fw={500}>
                                    {item.shippingMethod || "Chưa xác định"}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    {/* {item.shippingStatus} */}
                                    {item.shippingStatus === 'WAITING_FOR_PICKUP' ? 'Chờ lấy hàng' : 'Đã lấy hàng'}
                                </Text>
                                {item.dayPickup && (
                                    <Text size="xs" c="dimmed">
                                        Ngày lấy: {item.dayPickup}
                                    </Text>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex flex-col">
                                <Tooltip label="Tra cứu vận đơn" withArrow position="top">
                                    <Link to={`/shipping/${item.shippingId}`}>
                                        <Text size="xs" fw={500} className="!underline hover:text-primary cursor-pointer">
                                            #{item.shippingId || "N/A"}
                                        </Text>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <Tooltip label={`Xác nhận đơn: ${item.confirmationTime ? formatDate(item.confirmationTime) : '-'}`} withArrow position="top">
                                <Text size="xs" fw={500}>
                                    <FiClock size={12} className="inline-block mr-1" />
                                    {item.confirmationTime ? formatDate(item.confirmationTime) : '-'}
                                </Text>
                            </Tooltip>
                        </div>

                        <div className="col-span-1 flex flex-col items-center justify-center">
                            {item.isPrinted ? (
                                <ActionIcon
                                    size="sm"
                                    color="green"
                                    variant="outline"
                                ><FiCheck size={10} />
                                </ActionIcon>
                            ) : (
                                <ActionIcon
                                    size="sm"
                                    color="gray"
                                    variant="outline"
                                ><FiX size={10} />
                                </ActionIcon>
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default OrderPrintList;