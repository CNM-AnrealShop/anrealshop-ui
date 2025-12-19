import { Box, Divider, Grid, Group, SimpleGrid, Skeleton, Stack, Table } from '@mantine/core';

// Skeleton for OverviewTab
export const OverviewTabSkeleton = () => {
  return (
    <Box p="xs">
      <Grid gutter="md">
        {/* Left column: Image */}
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Skeleton height={200} radius="md" mb="xs" />
          <SimpleGrid cols={4} spacing="xs">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} height={50} radius="sm" />
            ))}
          </SimpleGrid>
        </Grid.Col>
        
        {/* Right column: Product details */}
        <Grid.Col span={{ base: 12, sm: 8 }}>
          <Stack gap="xs">
            <Group justify="space-between" align="flex-start">
              <Box style={{ flex: 1 }}>
                <Skeleton height={24} width="80%" mb={8} />
                <Skeleton height={12} width="40%" />
              </Box>
              <Skeleton height={22} width={80} radius="xl" />
            </Group>

            <Group gap="xs" mt="xs">
              <Skeleton height={20} width={80} radius="xl" />
              <Skeleton height={20} width={60} radius="xl" />
              <Skeleton height={12} width={120} />
            </Group>

            <Divider my="xs" />
            
            <Group justify="apart">
              <Skeleton height={22} width={80} />
              <Group gap="md">
                <Skeleton height={12} width={60} />
                <Skeleton height={12} width={60} />
              </Group>
            </Group>
            
            <Group grow mt="xs">
              <Skeleton height={50} radius="md" />
              <Skeleton height={50} radius="md" />
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Product Attributes */}
      <Box mt="md">
        <Group mb="xs">
          <Skeleton circle height={16} width={16} />
          <Skeleton height={16} width={120} />
        </Group>
        <Skeleton height={100} radius="md" />
      </Box>

      {/* Product description */}
      <Box mt="md">
        <Group mb="xs">
          <Skeleton circle height={16} width={16} />
          <Skeleton height={16} width={120} />
        </Group>
        <Skeleton height={120} radius="md" />
      </Box>
    </Box>
  );
};

// Skeleton for MediaTab
export const MediaTabSkeleton = () => {
  return (
    <Box p="xs">
      <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 6 }} spacing="xs">
        {Array(12).fill(0).map((_, i) => (
          <Stack key={i} gap={5}>
            <Skeleton height={120} radius="sm" />
            <Skeleton height={16} width="70%" mx="auto" />
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

// Skeleton for VariantTab
export const VariantTabSkeleton = () => {
  return (
    <Box>
      <Box mb="md">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th><Skeleton height={16} width="80%" /></Table.Th>
              <Table.Th><Skeleton height={16} width="80%" /></Table.Th>
              <Table.Th><Skeleton height={16} width="80%" /></Table.Th>
              <Table.Th><Skeleton height={16} width="80%" /></Table.Th>
              <Table.Th><Skeleton height={16} width="80%" /></Table.Th>
              <Table.Th><Skeleton height={16} width="80%" /></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Array(5).fill(0).map((_, i) => (
              <Table.Tr key={i}>
                <Table.Td><Skeleton height={50} width={50} radius="sm" /></Table.Td>
                <Table.Td><Skeleton height={16} width="80%" /></Table.Td>
                <Table.Td><Skeleton height={20} width={80} radius="xl" /></Table.Td>
                <Table.Td><Skeleton height={16} width="60%" /></Table.Td>
                <Table.Td><Skeleton height={16} width="40%" /></Table.Td>
                <Table.Td><Skeleton height={16} width="40%" /></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>

      <Box mt="md">
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th style={{ width: 200 }}><Skeleton height={16} width="80%" /></Table.Th>
              <Table.Td><Skeleton height={16} width="40%" /></Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th><Skeleton height={16} width="80%" /></Table.Th>
              <Table.Td><Skeleton height={16} width="40%" /></Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

// Skeleton for ShippingTab
export const ShippingTabSkeleton = () => {
  return (
    <Box p="xs">
      <Divider my="md" />
      <Group mb="xs" align="center">
        <Skeleton circle height={18} width={18} />
        <Skeleton height={18} width={160} />
      </Group>
      
      <Table>
        <Table.Tbody>
          {Array(4).fill(0).map((_, i) => (
            <Table.Tr key={i}>
              <Table.Th style={{ width: 200 }}>
                <Skeleton height={16} width="80%" />
              </Table.Th>
              <Table.Td>
                <Skeleton height={16} width="40%" />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

// Skeleton for StatusAccept tab
export const StatusAcceptSkeleton = () => {
  return (
    <Box>
      <Group mb="md">
        <Skeleton height={28} width={100} radius="xl" />
        <Skeleton height={28} width={120} radius="xl" />
      </Group>
      
      <Skeleton height={90} radius="md" mb="md" />
    </Box>
  );
};

// Combined skeleton for ProductReviewModal
export const ProductReviewTabsSkeleton = ({ activeTab }: { activeTab: string | null }) => {
  switch (activeTab) {
    case 'overview':
      return <OverviewTabSkeleton />;
    case 'media':
      return <MediaTabSkeleton />;
    case 'variants':
      return <VariantTabSkeleton />;
    case 'shipping':
      return <ShippingTabSkeleton />;
    case 'statusActive':
      return <StatusAcceptSkeleton />;
    default:
      return <OverviewTabSkeleton />;
  }
};

export default ProductReviewTabsSkeleton;