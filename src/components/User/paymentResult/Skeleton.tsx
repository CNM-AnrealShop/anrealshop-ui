import { Box, Container, Grid, Group, Paper, Skeleton, Stack } from '@mantine/core';

export const PaymentResultSkeleton = () => {
  return (
    <Container size="md" className="py-12">
      <Paper radius="md" shadow="md" p="xl">
        {/* Header with status icon and title */}
        <Box className="text-center mb-8">
          <Skeleton height={64} width={64} circle className="mx-auto mb-4" />
          <Skeleton height={32} width="60%" className="mx-auto mb-2" />
          <Skeleton height={20} width="80%" className="mx-auto" />
        </Box>

        {/* Order details section */}
        <Paper withBorder p="md" radius="md" className="bg-gray-50 mb-6">
          <Skeleton height={24} width={150} className="mb-4" />
          
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Skeleton height={16} width={100} className="mb-2" />
              <Skeleton height={20} width={150} className="mb-3" />
              
              <Skeleton height={16} width={120} className="mb-2" />
              <Skeleton height={20} width={180} />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Skeleton height={16} width={130} className="mb-2" />
              <Skeleton height={20} width={150} className="mb-3" />
              
              <Skeleton height={16} width={100} className="mb-2" />
              <Skeleton height={24} width={120} />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Products section (optional) */}
        <Paper withBorder p="md" radius="md" className="mb-6">
          <Skeleton height={24} width={150} className="mb-4" />
          
          <Stack gap="md">
            {Array(3).fill(0).map((_, i) => (
              <Group key={i} wrap="nowrap">
                <Skeleton height={60} width={60} radius="md" />
                <Box style={{ flex: 1 }}>
                  <Skeleton height={16} width="90%" className="mb-2" />
                  <Group justify="apart">
                    <Skeleton height={14} width={40} />
                    <Skeleton height={14} width={80} />
                  </Group>
                </Box>
              </Group>
            ))}
          </Stack>
        </Paper>

        {/* Action buttons */}
        <Box className="text-center mt-8">
          <Skeleton height={16} width="70%" className="mx-auto mb-4" />
          
          <Group justify="center" gap="md">
            <Skeleton height={36} width={150} radius="md" />
            <Skeleton height={36} width={150} radius="md" />
          </Group>
        </Box>
      </Paper>
    </Container>
  );
};
