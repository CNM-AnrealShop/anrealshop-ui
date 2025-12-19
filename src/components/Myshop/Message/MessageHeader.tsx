import { ActionIcon, Avatar, Badge, Group, Menu, Paper, Text } from '@mantine/core';
import React from 'react';
import { FiChevronDown, FiMoreVertical, FiTrash2, FiUser } from 'react-icons/fi';
import type { Conversation } from '../../../types/MessageTypes';

interface MessageHeaderProps {
    selectedConversation: Conversation;
    isMobileView: boolean;
    getStatusColor: (status: string) => string;
    onBackToList: () => void;
    onOpenCustomerDrawer: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
    selectedConversation,
    isMobileView,
    getStatusColor,
    onBackToList,
    onOpenCustomerDrawer
}) => {
    return (
        <Paper px="md" py="xs" className="border-b" radius={0}>
            <Group justify="space-between" wrap="nowrap">
                <Group wrap="nowrap">
                    {isMobileView && (
                        <ActionIcon variant="subtle" onClick={onBackToList} mr="xs">
                            <FiChevronDown size={20} className="rotate-90" />
                        </ActionIcon>
                    )}
                    <Group wrap="nowrap" onClick={onOpenCustomerDrawer} style={{ cursor: 'pointer' }}>
                        <Avatar
                            src={selectedConversation.customer.avatar}
                            radius="xl"
                            color={selectedConversation.type === 'customer' ? 'blue' :
                                selectedConversation.type === 'support' ? 'green' : 'purple'}
                        >
                            {selectedConversation.customer.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                            <Text size="sm" fw={600}>
                                {selectedConversation.customer.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {selectedConversation.customer.phone || selectedConversation.customer.email || 'Không có thông tin liên hệ'}
                            </Text>
                        </div>
                    </Group>
                </Group>

                <Group wrap="nowrap" gap="xs">
                    {selectedConversation.orderInfo && (
                        <Badge
                            variant="outline"
                            color={getStatusColor(selectedConversation.orderInfo.status)}
                            rightSection={
                                <ActionIcon variant="transparent" size="xs" color="gray">
                                    <FiChevronDown size={12} />
                                </ActionIcon>
                            }
                        >
                            {selectedConversation.orderInfo.orderNumber}
                        </Badge>
                    )}

                    <Menu shadow="md" position="bottom-end">
                        <Menu.Target>
                            <ActionIcon variant="subtle">
                                <FiMoreVertical size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<FiUser size={14} />}
                                onClick={onOpenCustomerDrawer}
                            >
                                Xem thông tin khách hàng
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item leftSection={<FiTrash2 size={14} />} color="red">
                                Xóa cuộc trò chuyện
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </Paper>
    );
};

export default MessageHeader;