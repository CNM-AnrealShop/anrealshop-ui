import React from 'react';
import {
    Avatar,
    Badge,
    Button,
    Drawer,
    Group,
    Image,
    Paper,
    Text
} from '@mantine/core';
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiClock
} from 'react-icons/fi';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Conversation } from '../../../types/MessageTypes';

interface ModalInforCustomerProps {
    opened: boolean;
    onClose: () => void;
    conversation: Conversation | null;
    getStatusColor: (status: string) => string;
}

const ModalInforCustomer: React.FC<ModalInforCustomerProps> = ({
    opened,
    onClose,
    conversation,
    getStatusColor
}) => {
    if (!conversation) return null;

    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            title={
                <Text fw={600} size="lg">Thông tin khách hàng</Text>
            }
            padding="lg"
            size="md"
            position="right"
            classNames={{
                header: 'pb-xs border-b mb-md',
                title: 'flex-1'
            }}
        >
            <div className="flex flex-col items-center mb-6">
                <Avatar
                    src={conversation.customer.avatar}
                    size={80}
                    radius="xl"
                    color={conversation.type === 'customer' ? 'blue' : 
                          conversation.type === 'support' ? 'green' : 'purple'}
                    mb="sm"
                >
                    {conversation.customer.name.charAt(0).toUpperCase()}
                </Avatar>
                <Text size="lg" fw={600}>{conversation.customer.name}</Text>
                <Badge 
                    size="sm" 
                    mt={6}
                    color={conversation.type === 'customer' ? 'blue' : 
                          conversation.type === 'support' ? 'green' : 'purple'}
                >
                    {conversation.type === 'customer' ? 'Khách hàng' : 
                     conversation.type === 'support' ? 'Hỗ trợ' : 'Chat box'}
                </Badge>
            </div>

            <Paper withBorder p="md" radius="md" mb="md" className="bg-gray-50">
                <Text fw={600} mb="xs" color="blue">Thông tin liên hệ</Text>
                <div className="space-y-3">
                    {conversation.customer.phone && (
                        <Group wrap="nowrap">
                            <Avatar color="blue" size="sm" radius="xl">
                                <FiPhone size={14} />
                            </Avatar>
                            <div>
                                <Text size="sm" fw={500}>Điện thoại</Text>
                                <Text size="sm">{conversation.customer.phone}</Text>
                            </div>
                        </Group>
                    )}

                    {conversation.customer.email && (
                        <Group wrap="nowrap">
                            <Avatar color="teal" size="sm" radius="xl">
                                <FiMail size={14} />
                            </Avatar>
                            <div>
                                <Text size="sm" fw={500}>Email</Text>
                                <Text size="sm">{conversation.customer.email}</Text>
                            </div>
                        </Group>
                    )}

                    {conversation.customer.location && (
                        <Group wrap="nowrap" align="flex-start">
                            <Avatar color="grape" size="sm" radius="xl">
                                <FiMapPin size={14} />
                            </Avatar>
                            <div>
                                <Text size="sm" fw={500}>Địa chỉ</Text>
                                <Text size="sm">{conversation.customer.location}</Text>
                            </div>
                        </Group>
                    )}
                </div>
            </Paper>

            {conversation.orderInfo && (
                <Paper withBorder p="md" radius="md" mb="md" className="bg-gray-50">
                    <Group justify="space-between" mb="xs">
                        <Text fw={600} color="blue">Đơn hàng gần nhất</Text>
                        <Badge color={getStatusColor(conversation.orderInfo.status)}>
                            {conversation.orderInfo.status === 'pending' && 'Chờ xác nhận'}
                            {conversation.orderInfo.status === 'processing' && 'Đang xử lý'}
                            {conversation.orderInfo.status === 'shipping' && 'Đang giao hàng'}
                            {conversation.orderInfo.status === 'completed' && 'Hoàn thành'}
                            {conversation.orderInfo.status === 'cancelled' && 'Đã hủy'}
                        </Badge>
                    </Group>

                    <Text size="sm" fw={600} mb="sm" color="dimmed">
                        {conversation.orderInfo.orderNumber}
                    </Text>

                    <div className="rounded-md overflow-hidden border mb-3">
                        {conversation.orderInfo.items.map((item, index) => (
                            <Group 
                                key={item.id} 
                                wrap="nowrap" 
                                p="xs"
                                className={index < conversation.orderInfo!.items.length - 1 ? "border-b" : ""}
                                bg={index % 2 === 0 ? 'white' : 'gray.50'}
                            >
                                <Image src={item.image} width={50} height={50} radius="md" className="border" />
                                <div className="flex-1">
                                    <Text size="sm" fw={500} lineClamp={1}>{item.name}</Text>
                                    <Group justify="apart" wrap="nowrap" mt={4}>
                                        <Text size="xs" c="dimmed">SL: {item.quantity}</Text>
                                        <Text size="sm" fw={600} color="blue">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </Text>
                                    </Group>
                                </div>
                            </Group>
                        ))}
                    </div>

                    <Button variant="light" color="blue" fullWidth mt="xs">
                        Xem chi tiết đơn hàng
                    </Button>
                </Paper>
            )}

            <Paper withBorder p="md" radius="md" className="bg-gray-50">
                <Text fw={600} mb="xs" color="blue">Hoạt động</Text>
                <div className="space-y-3">
                    <Group wrap="nowrap">
                        <Avatar color="orange" size="sm" radius="xl">
                            <FiClock size={14} />
                        </Avatar>
                        <div>
                            <Text size="sm" fw={500}>Trò chuyện lần cuối</Text>
                            <Text size="sm">{format(conversation.lastMessage.timestamp, 'HH:mm, dd/MM/yyyy', { locale: vi })}</Text>
                        </div>
                    </Group>
                </div>
            </Paper>
        </Drawer>
    );
};

export default ModalInforCustomer;