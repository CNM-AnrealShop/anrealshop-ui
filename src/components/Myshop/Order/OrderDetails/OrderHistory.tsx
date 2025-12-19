import { Card, Group, Text, Timeline } from '@mantine/core';
import { FiClock } from 'react-icons/fi';

interface HistoryItem {
  id: string;
  status: string;
  title: string;
  timestamp: Date;
}

interface OrderHistoryProps {
  orderHistory?: HistoryItem[];
}

const OrderHistory = ({ orderHistory = [] }: OrderHistoryProps) => {

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(date));
  };

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <Card withBorder p="md">
        <Text fw={700} size="lg" mb="md">Lịch sử đơn hàng</Text>
        <Text c="dimmed" fs="italic" ta="center" py="md">
          Chưa có lịch sử đơn hàng nào
        </Text>
      </Card>
    );
  }

  return (
    <Card withBorder p="md">
      <Text fw={700} size="lg" mb="md">Lịch sử đơn hàng</Text>
      <Timeline active={orderHistory.length - 1} bulletSize={24} lineWidth={2}>
        {orderHistory.map((event, index) => (
          <Timeline.Item
            key={index}
            bullet={<FiClock size={12} />}
            title={
              <Group gap="xs">
                <Text fw={500} size='sm'>{event.title}</Text>
              </Group>
            }
          >
            <Text size="xs" mt={2} c="dimmed">{formatDateTime(event.timestamp)}</Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default OrderHistory;
