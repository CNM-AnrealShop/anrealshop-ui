import { Box, Card, Group, Skeleton } from '@mantine/core';

const SkeletonOrderView = () => {
  const skeletonOrders = Array(3).fill(null);

  return (
    <div className="space-y-4">
      {skeletonOrders.map((_, index) => (
        <Card
          key={index}
          withBorder
          p={0}
          className="order-card"
          shadow="xs"
          mt={"md"}
        >
          <Box className="bg-gray-50 border-b-2 border-gray-100" px="md" py="xs">
            <Group justify="space-between" align="center">
              <Group gap="sm">
                <Skeleton height={32} circle />
                <Skeleton height={18} width={120} />
                <Skeleton height={24} width={24} circle />
              </Group>
              <Group>
                <Skeleton height={24} width={180} />
              </Group>
            </Group>
          </Box>

          <Box className="p-4">
            {[1, 2].map((item, idx) => (
              <div key={item}>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <div className="flex gap-3">
                      <Skeleton height={60} width={60} />
                      <div className="flex-1">
                        <Skeleton height={16} width="90%" className="mb-2" />
                        <Skeleton height={12} width="60%" />
                      </div>
                      <Skeleton height={16} width={20} />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="h-full flex flex-col">
                      <Skeleton height={16} width="80%" className="mb-2" />
                      <Skeleton height={12} width="60%" />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="h-full flex flex-col">
                      <Skeleton height={16} width="70%" className="mb-2" />
                      <Skeleton height={12} width="50%" />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="h-full flex flex-col">
                      <Skeleton height={16} width="60%" className="mb-2" />
                      <Skeleton height={12} width="80%" />
                      <Skeleton height={12} width="40%" className="mt-1" />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="h-full flex items-center justify-center">
                      <Skeleton height={32} width={100} />
                    </div>
                  </div>
                </div>
                {idx === 0 && <hr className="my-2 border-gray-100" />}
              </div>
            ))}
            
            <div className="mt-4 pt-2 border-t border-gray-100 flex justify-center">
              <Skeleton height={24} width={180} />
            </div>
          </Box>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonOrderView;