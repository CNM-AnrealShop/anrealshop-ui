import { Box, Card, Group, Skeleton } from '@mantine/core';

export const SkeletonOrderPrint = () => {
    // Create a skeleton header
    const SkeletonHeader = () => (
        <Card withBorder p={0} className="!bg-gray-50 mb-3" radius="md">
            <Box className="px-4 py-3">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                        <Group gap="sm">
                            <Skeleton height={18} width={18} radius="sm" />
                            <Skeleton height={16} width={100} radius="sm" />
                        </Group>
                    </div>
                    <div className="col-span-2">
                        <Skeleton height={16} width={80} radius="sm" />
                    </div>
                    <div className="col-span-2">
                        <Skeleton height={16} width={120} radius="sm" />
                    </div>
                    <div className="col-span-2">
                        <Skeleton height={16} width={80} radius="sm" />
                    </div>
                    <div className="col-span-2">
                        <Skeleton height={16} width={120} radius="sm" />
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <Skeleton height={16} width={60} radius="sm" />
                    </div>
                </div>
            </Box>
        </Card>
    );

    const SkeletonOrderCard = () => (
        <Card withBorder p="xs" className="order-card mb-3" shadow="xs">
            <div className="grid grid-cols-12 gap-3 items-start py-1">
                <div className="col-span-3">
                    <div className="flex gap-2 items-start">
                        <Skeleton height={18} width={18} circle className="mt-2" />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <Skeleton height={40} width={40} radius="sm" />
                                <div>
                                    <Skeleton height={12} width={80} radius="sm" mb={4} />
                                    <Skeleton height={12} width={60} radius="sm" />
                                </div>
                            </div>
                            <Skeleton height={12} width={120} radius="sm" />
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex flex-col">
                        <Group gap="xs" mb={4}>
                            <Skeleton height={24} width={24} circle />
                            <Skeleton height={12} width={80} radius="sm" />
                        </Group>
                        <Skeleton height={12} width={90} radius="sm" mb={4} />
                        <Skeleton height={12} width={60} radius="sm" />
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex flex-col">
                        <Skeleton height={12} width={100} radius="sm" mb={4} />
                        <Skeleton height={12} width={120} radius="sm" mb={4} />
                        <Skeleton height={12} width={80} radius="sm" />
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex flex-col">
                        <Skeleton height={12} width={70} radius="sm" mb={4} />
                        <Skeleton height={12} width={90} radius="sm" />
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex flex-col">
                        <Skeleton height={12} width={100} radius="sm" mb={4} />
                        <Skeleton height={12} width={120} radius="sm" />
                    </div>
                </div>

                <div className="col-span-1 flex justify-center">
                    <Skeleton height={22} width={60} radius="xl" />
                </div>
            </div>
        </Card>
    );

    return (
        <>
            <SkeletonHeader />
            <div className="space-y-3 min-h-[60vh]">
                {Array(5).fill(0).map((_, index) => (
                    <SkeletonOrderCard key={index} />
                ))}
            </div>
        </>
    );
}