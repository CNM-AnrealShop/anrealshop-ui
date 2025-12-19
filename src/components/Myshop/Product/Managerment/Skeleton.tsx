import {
  Container,
  Paper,
  Group,
  Box,
  Skeleton as MantineSkeleton,
  SimpleGrid,
  Divider,
  Stack,
} from '@mantine/core';

// Header skeleton component
export const HeaderSkeleton = () => (
  <Paper shadow="xs" p="md" mb="md" radius="md" className="border-b border-gray-200">
    <Box mb="xs">
      <MantineSkeleton height={16} width={180} />
    </Box>

    <Group justify="space-between" align="center">
      <Group>
        <MantineSkeleton height={24} width={24} radius="xl" />
        <MantineSkeleton height={32} width={180} />
      </Group>
      <MantineSkeleton height={16} width={250} />
    </Group>
  </Paper>
);

// Option config skeleton component
export const OptionConfigSkeleton = () => (
  <Paper shadow="xs" p="md" mb="md" radius="md" className="bg-white">
    <Group justify="space-between">
      <Group>
        <MantineSkeleton height={36} width={120} radius="sm" />
        <MantineSkeleton height={36} width={150} radius="sm" />
      </Group>
      <Group>
        <MantineSkeleton height={36} width={36} radius="sm" />
        <MantineSkeleton height={36} width={36} radius="sm" />
      </Group>
    </Group>
  </Paper>
);

// Status filter skeleton component
export const StatusFilterSkeleton = () => (
  <Box p="md" pt={0}>
    <SimpleGrid cols={5} spacing="md">
      {Array(5).fill(0).map((_, index) => (
        <MantineSkeleton key={index} height={48} radius="md" />
      ))}
    </SimpleGrid>
  </Box>
);

// Filter controls skeleton component
export const FilterControlsSkeleton = () => (
  <Box px="md" pb="md">
    <Group gap="md" mb="md">
      <MantineSkeleton height={36} width="30%" radius="sm" />
      <MantineSkeleton height={36} width="20%" radius="sm" />
      <MantineSkeleton height={36} width="20%" radius="sm" />
      <MantineSkeleton height={36} width={100} radius="sm" />
    </Group>
  </Box>
);

// Checkbox selected skeleton component
export const CheckboxSelectedSkeleton = () => (
  <Box px="md" pb="md">
    <Group justify="space-between" gap="md">
      <Group gap="md">
        <MantineSkeleton height={20} width={20} radius="sm" />
        <MantineSkeleton height={20} width={120} radius="sm" />
      </Group>
      <MantineSkeleton height={30} width={90} radius="sm" />
    </Group>
  </Box>
);

// Single product card skeleton component
export const ProductCardSkeleton = () => (
  <Paper shadow="xs" p="md" radius="md" withBorder>
    <Stack gap="sm">
      <MantineSkeleton height={180} />
      <MantineSkeleton height={18} width="80%" />
      <MantineSkeleton height={18} width="40%" />
      <Group justify="space-between" gap="xs">
        <MantineSkeleton height={22} width="50%" />
        <MantineSkeleton height={18} width="25%" />
      </Group>
      <MantineSkeleton height={16} width="40%" />
      <Divider my="sm" />
      <Group justify="space-between">
        <MantineSkeleton height={24} width={90} radius="sm" />
        <MantineSkeleton height={24} width={24} radius="xl" />
      </Group>
    </Stack>
  </Paper>
);

// Product grid skeleton component
export const ProductGridSkeleton = ({ itemCount = 8 }) => (
  <Box p="md">
    <SimpleGrid
      spacing="md" 
      cols={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
    >
      {Array(itemCount).fill(0).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </SimpleGrid>
  </Box>
);

// Product list skeleton component
export const ProductListSkeleton = () => (
  <Box p="md">
    <Paper withBorder p="md" radius="md">
      <Stack gap="md">
        {Array(5).fill(0).map((_, index) => (
          <Group key={index} justify="space-between" align="center">
            <Group gap="md" style={{ flex: 1 }}>
              <MantineSkeleton height={20} width={20} radius="sm" />
              <MantineSkeleton height={60} width={60} />
              <Stack gap="xs" style={{ flex: 1 }}>
                <MantineSkeleton height={18} width="60%" />
                <MantineSkeleton height={14} width="40%" />
              </Stack>
            </Group>
            <Group gap="lg" style={{ width: '50%' }}>
              <MantineSkeleton height={18} width="20%" />
              <MantineSkeleton height={18} width="20%" />
              <MantineSkeleton height={24} width="20%" radius="xl" />
              <Group gap="xs">
                <MantineSkeleton height={20} width={40} />
                <MantineSkeleton height={20} width={20} radius="xl" />
              </Group>
            </Group>
          </Group>
        ))}
      </Stack>
    </Paper>
  </Box>
);

// Pagination skeleton component
export const PaginationSkeleton = () => (
  <Box p="md">
    <Group justify="space-between" gap="md">
      <MantineSkeleton height={16} width={120} />
      <Group gap="xs">
        {Array(5).fill(0).map((_, index) => (
          <MantineSkeleton key={index} height={36} width={36} radius="xl" />
        ))}
      </Group>
    </Group>
  </Box>
);

// Complete product page skeleton component
const ProductPageSkeleton = () => {
  return (
    <Container fluid px="lg" py="md">
      <HeaderSkeleton />
      <OptionConfigSkeleton />
      
      <Paper shadow="xs" mb="md" radius="md" className="bg-white">
        <StatusFilterSkeleton />
        <Divider mb="md" />
        <FilterControlsSkeleton />
        <CheckboxSelectedSkeleton />
        <ProductGridSkeleton itemCount={8} />
        <PaginationSkeleton />
      </Paper>
    </Container>
  );
};

export default ProductPageSkeleton;