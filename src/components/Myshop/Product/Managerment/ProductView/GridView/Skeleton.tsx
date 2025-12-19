import { Card, Grid, Group, Skeleton as MantineSkeleton, Stack } from '@mantine/core';

interface GridViewSkeletonProps {
  itemCount?: number;
}

const GridViewSkeleton = ({ itemCount = 12 }: GridViewSkeletonProps) => {
  // Create an array based on itemCount for mapping
  const items = Array(itemCount).fill(0);

  return (
    <div className="bg-white rounded-md overflow-hidden p-4">
     
      <Grid gutter="md">
        {items.map((_, index) => (
          <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={index}>
            <Card padding="md" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              
              
              {/* Product Image */}
              <Card.Section>
                <MantineSkeleton height={180} width="100%" />
              </Card.Section>
              
              {/* Product Info */}
              <Stack gap="xs" mt="md" mb="xs" style={{ flexGrow: 1 }}>
                <MantineSkeleton height={18} width="90%" />
                <MantineSkeleton height={18} width="70%" />
                
                <Group justify="space-between" mt="auto">
                  <MantineSkeleton height={24} width="40%" />
                  <Group gap="xs">
                    <MantineSkeleton height={14} width={40} />
                    <MantineSkeleton height={16} width={20} />
                  </Group>
                </Group>
                
                <Group justify="space-between">
                  <MantineSkeleton height={16} width="50%" />
                </Group>
              </Stack>
              
              {/* Actions */}
              <Group justify="space-between" mt="sm" pt="xs" style={{ borderTop: '1px solid #f0f0f0' }}>
                <MantineSkeleton height={20} width={80} />
                <MantineSkeleton height={20} width={30} circle />
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default GridViewSkeleton;