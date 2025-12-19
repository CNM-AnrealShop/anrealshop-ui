import { Paper, Group, Skeleton, Stack } from '@mantine/core';

interface OrderSkeletonProps {
    count?: number;
}

const OrderSkeleton: React.FC<OrderSkeletonProps> = ({ count = 3 }) => {
    return (
        <Stack gap="md">
            {Array(count).fill(0).map((_, i) => (
                <Paper key={i} withBorder p="md">
                    <Group justify="space-between" mb="sm">
                        <Group>
                            <Skeleton height={16} width={120} radius="xl" />
                            <Skeleton height={14} width={80} radius="xl" />
                        </Group>
                        <Skeleton height={20} width={90} radius="xl" />
                    </Group>

                    <Group>
                        <Skeleton height={96} width={96} radius="md" />
                        <div style={{ flex: 1 }}>
                            <Skeleton height={20} mb="sm" width="60%" />
                            <Group mb="sm">
                                <Skeleton height={15} width="20%" radius="xl" />
                                <Skeleton height={15} width="20%" radius="xl" />
                            </Group>
                            <Skeleton height={15} mb="sm" width="30%" />
                        </div>

                        <div className="text-right" style={{ width: 120 }}>
                            <Skeleton height={15} mb="sm" width={60} className="ml-auto" />
                            <Skeleton height={24} mb="lg" width={90} className="ml-auto" />
                            <Group gap="xs" justify="flex-end">
                                <Skeleton height={26} width={70} radius="sm" />
                                <Skeleton height={26} width={70} radius="sm" />
                            </Group>
                        </div>
                    </Group>
                </Paper>
            ))}
        </Stack>
    );
};

export default OrderSkeleton;
