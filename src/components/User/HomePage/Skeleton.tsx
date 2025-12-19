import { Group, Paper, SimpleGrid, Skeleton, Stack } from '@mantine/core';

const HeroBannerSkeleton = () => (
  <Skeleton height={400} radius="md" animate />
);

const CategorySkeleton = () => (
  <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 6 }} spacing="md">
    {Array(6).fill(0).map((_, i) => (
      <Stack key={i} align="center" gap="sm">
        <Skeleton height={80} width={80} radius={100} animate />
        <Skeleton height={16} width="80%" radius="sm" animate />
      </Stack>
    ))}
  </SimpleGrid>
);

const SearchTopSkeleton = () => (
  <Stack>
    <Group justify="space-between">
      <Skeleton height={24} width={150} radius="sm" animate />
      <Skeleton height={24} width={100} radius="sm" animate />
    </Group>
    <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 6 }} spacing="md">
      {Array(6).fill(0).map((_, i) => (
        <Skeleton key={i} height={40} radius="sm" animate />
      ))}
    </SimpleGrid>
  </Stack>
);

const ProductGridSkeleton = () => (
  <Stack>
    <Group justify="space-between" mb="md">
      <Skeleton height={24} width={180} radius="sm" animate />
      <Skeleton height={24} width={100} radius="sm" animate />
    </Group>
    <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
      {Array(5).fill(0).map((_, i) => (
        <Stack key={i} gap="xs">
          <Skeleton height={200} radius="md" animate />
          <Skeleton height={16} width="70%" radius="sm" animate />
          <Skeleton height={14} width="50%" radius="sm" animate />
          <Skeleton height={20} width="40%" radius="sm" animate />
          <Group justify="space-between">
            <Skeleton height={14} width={60} radius="sm" animate />
            <Skeleton height={14} width={40} radius="sm" animate />
          </Group>
        </Stack>
      ))}
    </SimpleGrid>
  </Stack>
);

const PromotionBannerSkeleton = () => (
  <Skeleton height={200} radius="md" animate />
);

const NewsletterSkeleton = () => (
  <Paper p="xl" radius="md">
    <Stack align="center" gap="md">
      <Skeleton height={30} width="60%" radius="sm" animate />
      <Skeleton height={16} width="80%" radius="sm" animate />
      <Group justify="center" style={{ width: '100%' }}>
        <Skeleton height={42} width="60%" radius="sm" animate />
        <Skeleton height={42} width="20%" radius="sm" animate />
      </Group>
    </Stack>
  </Paper>
);


export { CategorySkeleton, HeroBannerSkeleton, NewsletterSkeleton, ProductGridSkeleton, PromotionBannerSkeleton, SearchTopSkeleton };
