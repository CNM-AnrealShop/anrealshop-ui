import { Box, Group, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { FiBox, FiShoppingBag } from 'react-icons/fi';

export const ListProductSkeleton = ({ shopCount = 2 }: { shopCount?: number }) => {
  return (
    <Paper radius="md" shadow="sm" p="md" className="bg-white mb-6">
      <Group justify="space-between" className="mb-4">
        <Text fw={600} size="md" className="text-slate-800 flex items-center">
          <FiShoppingBag className="inline-block mr-2" size={16} />
          Sản phẩm (...)
        </Text>
      </Group>

      <Stack gap="lg">
        {Array(shopCount).fill(0).map((_, shopIndex) => (
          <Box key={`shop-skeleton-${shopIndex}`}>
            <Paper withBorder radius="md" className="overflow-hidden">
              {/* Shop Header */}
              <Group className="p-3 bg-gray-50 border-b border-gray-200" gap="sm">
                <Skeleton height={32} circle />
                <Box>
                  <Group gap={4} align="center">
                    <Skeleton height={16} width={120} />
                  </Group>
                </Box>
              </Group>

              {/* Products List */}
              <Box className="p-4">
                <Stack gap="md">
                  {Array(3).fill(0).map((_, itemIndex) => (
                    <Box key={`product-skeleton-${shopIndex}-${itemIndex}`}>
                      <ProductItemSkeleton />
                      {itemIndex < 2 && (
                        <div className="mt-3 border-t border-gray-100"></div>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Shipping Info */}
              <Box className="py-2 pl-3 pr-4 bg-gray-50 border-t border-gray-200">
                <Group justify="space-between" align="flex-start">
                  {/* Shipping Method */}
                  <Box p={4} style={{ flex: 1 }}>
                    <Group gap={4} mb={6}>
                      <Skeleton height={14} width={14} />
                      <Skeleton height={14} width={140} />
                    </Group>
                    
                    <Skeleton height={10} width="80%" mb={8} />
                    <Skeleton height={10} width="90%" mb={8} />
                    <Skeleton height={10} width="70%" />
                  </Box>

                  {/* Shipping Fee */}
                  <Box>
                    <Skeleton height={16} width={80} />
                  </Box>
                </Group>
              </Box>
              
              {/* Shop Total Amount Section */}
              <Box className="px-4 py-3 border-t border-gray-200">
                <Group justify="flex-end" align="center">
                  <Skeleton height={16} width={150} />
                  <Skeleton height={18} width={100} />
                </Group>
              </Box>
            </Paper>

            {/* Divider between shops */}
            {shopIndex < shopCount - 1 && (
              <div className="mt-4 border-t border-gray-300"></div>
            )}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

const ProductItemSkeleton = () => {
  return (
    <Group wrap="nowrap" gap="sm" align="flex-start">
      <Skeleton height={64} width={64} radius="md" />

      <Box style={{ flex: 1 }} className="min-w-0">
        <Group justify="apart" align="flex-start" className="mb-1">
          <Skeleton height={16} width="70%" />
          <Skeleton height={14} width={20} />
        </Group>

        <Skeleton height={12} mt={8} width="40%" />

        <Box className="flex justify-end mt-2">
          <Skeleton height={16} width={80} />
        </Box>
      </Box>
    </Group>
  );
};

export const CheckoutReviewSkeleton = () => {
  return (
    <Paper radius="lg" withBorder shadow="sm" p="md" className="bg-white mb-6">
      <Group gap="sm" className="mb-4">
        <FiBox size={18} />
        <Skeleton height={20} width={150} />
      </Group>
      
      <Box>
        <Skeleton height={18} width={120} className="mb-3" />
        
        <Box className="space-y-3 mb-3">
          <Group justify="space-between">
            <Skeleton height={16} width={70} />
            <Skeleton height={16} width={80} />
          </Group>
          
          <Group justify="space-between">
            <Skeleton height={16} width={100} />
            <Skeleton height={16} width={80} />
          </Group>
        </Box>
        
        <Skeleton height={1} width="100%" className="my-4" />
        
        <Group justify="space-between" className="mb-4">
          <Skeleton height={18} width={80} />
          <Skeleton height={20} width={100} />
        </Group>

        <Skeleton height={1} width="100%" className="my-4" />

        <Box>
          <Skeleton height={42} width="100%" radius="md" className="mb-3" />
          <Skeleton height={10} width="80%" className="mx-auto" />
        </Box>
      </Box>
    </Paper>
  );
};
