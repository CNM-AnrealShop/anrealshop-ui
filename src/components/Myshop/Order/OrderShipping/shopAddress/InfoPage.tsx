import { Card, Text, ThemeIcon } from '@mantine/core';
import { FiAlertTriangle, FiInfo } from 'react-icons/fi';

export const InfoPage = () => {
    return (
        <Card shadow="xs" p="md" mt="md" radius="md" withBorder>
            <div className="flex items-center gap-2 mb-3">
                <ThemeIcon size="md" radius="xl" color="blue">
                    <FiInfo size={16} />
                </ThemeIcon>
                <Text fw={600} size="sm">Hướng dẫn giao hàng loạt</Text>
            </div>

            <Text size="xs" c="dimmed">
                Tính năng giao hàng loạt giúp bạn tạo nhiều đơn giao hàng cùng lúc, tiết kiệm thời gian xử lý.
            </Text>

            <Text size="xs" mt="md" fw={500} className="flex items-center gap-1">
                <FiAlertTriangle size={12} className="text-amber-500" />
                <span>Lưu ý: Đơn giao hàng sau khi tạo không thể hủy</span>
            </Text>
        </Card>
    );
};

export default InfoPage;