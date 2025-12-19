import { ActionIcon, Avatar, Button, Card, Group, Text } from '@mantine/core';
import { FiBarChart, FiMessageSquare, FiPhone, FiUser } from 'react-icons/fi';

interface CustomerProps {
    customerName?: string;
    customerPhone?: string;
    customerAvatar?: string;
}

const Customer = ({ customerName, customerPhone, customerAvatar }: CustomerProps) => {
    return (
        <Card withBorder p="md">
            <Group justify="apart">
                <Group>
                    <FiUser size={18} />
                    <Text fw={700} size="md">Thông tin khách hàng</Text>
                </Group>
            </Group>

            <Group mt="md" justify="space-between" align="flex-start">
                <Group align="flex-start" >
                    <Avatar src={customerAvatar || "https://randomuser.me/api/portraits/lego/1.jpg"} size="md" radius="xl" />
                    <div>
                        <Text fw={600} size="sm">{customerName || "Khách hàng"}</Text>
                        <Group gap={6} mt={2}>
                            <ActionIcon size="xs" variant="subtle" color="blue">
                                <FiPhone size={12} />
                            </ActionIcon>
                            <Text size="sm">{customerPhone || "Không có thông tin"}</Text>
                        </Group>
                    </div>
                </Group>
                <Group>
                    <Button
                        variant="light"
                        leftSection={<FiMessageSquare size={14} />}
                        size='xs'
                    >
                        Nhắn tin
                    </Button>
                    <Button
                        variant="outline"
                        leftSection={<FiBarChart size={14} />}
                        size='xs'
                    >
                        Lịch sử mua
                    </Button>
                </Group>
            </Group>
        </Card>
    );
};

export default Customer;