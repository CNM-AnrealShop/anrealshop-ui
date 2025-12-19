import { Box, Card, Group, Skeleton } from '@mantine/core';

export const SkeletonOrderShip = () => {
  // Create a skeleton header
  const SkeletonHeader = () => (
    <Card withBorder p={0} className="!bg-gray-50 mb-3" radius="md">
      <Box className="px-4 py-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <Group gap="sm">
              <Skeleton height={18} width={18} radius="sm" />
              <Skeleton height={16} width={80} radius="sm" />
            </Group>
          </div>
          <div className="col-span-2">
            <Skeleton height={16} width={100} radius="sm" />
          </div>
          <div className="col-span-2">
            <Skeleton height={16} width={120} radius="sm" />
          </div>
          <div className="col-span-2">
            <Skeleton height={16} width={80} radius="sm" />
          </div>
          <div className="col-span-1">
            <Skeleton height={16} width={60} radius="sm" />
          </div>
        </div>
      </Box>
    </Card>
  );

  // Create a skeleton order card
  const SkeletonOrderCard = () => (
    <Card withBorder p={0} className="order-card mb-3" shadow="xs">
      <Box className="bg-gray-50 border-b border-gray-100" px="md" py="xs">
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <Skeleton height={18} width={18} circle />
            <Skeleton height={34} width={34} circle />
            <Skeleton height={16} width={120} radius="sm" />
          </Group>
          <Skeleton height={16} width={150} radius="sm" />
        </Group>
      </Box>

      {Array(2).fill(0).map((_, index) => (
        <Box key={index} className={index !== 1 ? 'border-b border-gray-100' : ''}>
          <Box className="px-4 py-3">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5">
                <div className="flex gap-3">
                  <Skeleton height={60} width={60} radius="sm" />
                  <div className="flex-1">
                    <Skeleton height={16} width="90%" radius="sm" mb={8} />
                    <Skeleton height={12} width="60%" radius="sm" />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="h-full flex flex-col">
                  <Skeleton height={16} width="80%" radius="sm" mb={4} />
                  <Skeleton height={12} width="60%" radius="sm" />
                </div>
              </div>

              <div className="col-span-2">
                <Skeleton height={14} width="70%" radius="sm" />
              </div>

              <div className="col-span-2">
                <Skeleton height={22} width={80} radius="xl" />
              </div>

              <div className="col-span-1 text-center">
                <Skeleton height={24} width={24} radius="sm" mx="auto" />
              </div>
            </div>
          </Box>
        </Box>
      ))}
    </Card>
  );

  return (
    <>
      <SkeletonHeader />
      <div className="space-y-3 min-h-[60vh]">
        {Array(3).fill(0).map((_, index) => (
          <SkeletonOrderCard key={index} />
        ))}
      </div>
    </>
  );
}
