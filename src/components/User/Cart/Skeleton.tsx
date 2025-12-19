import React from 'react';
import { Box, Group, Skeleton, Divider, Paper, Title } from '@mantine/core';

const ListProductSkeleton: React.FC = () => {
  // Generate 2 shop groups with 2 items each
  return (
    <Box>
      <Group justify="space-between" className="mb-3">
        <Skeleton height={20} width={150} radius="sm" />
        <Skeleton height={20} width={100} radius="sm" />
      </Group>

      <Divider className="mb-3" />
      
      {[1, 2].map((shop) => (
        <Box key={shop} className="mb-6">
          <Group className="mb-3 bg-gray-50 p-3 rounded">
            <Skeleton height={32} circle />
            <Skeleton height={20} width={150} radius="sm" />
          </Group>

          {[1, 2].map((item) => (
            <Box key={item} className="mb-4">
              <Group wrap="nowrap" align="flex-start">
                <Box className="flex items-center h-full pt-2">
                  <Skeleton height={16} width={16} radius="sm" />
                </Box>
                
                <Box className="w-28 h-28 flex-shrink-0">
                  <Skeleton height={112} width={112} radius="md" />
                </Box>
                
                <Box style={{ flex: 1 }}>
                  <Group justify="space-between" align="flex-start">
                    <Box style={{ flex: 1 }}>
                      <Skeleton height={20} width="90%" radius="sm" mb={8} />
                      <Skeleton height={14} width="70%" radius="sm" mb={8} />
                      
                      <Box className="md:hidden mt-3">
                        <Skeleton height={18} width={80} radius="sm" />
                      </Box>
                    </Box>
                    
                    <Box className="hidden md:block text-right min-w-[120px]">
                      <Skeleton height={18} width={80} radius="sm" />
                    </Box>
                  </Group>
                  
                  <Group justify="space-between" className="mt-1 md:mt-2" align="flex-end">
                    <Skeleton height={32} width={120} radius="sm" />

                    <Group className="hidden md:flex">
                      <Skeleton height={24} width={60} radius="sm" />
                    </Group>
                  </Group>
                </Box>
              </Group>
              <Divider className="mt-4" />
            </Box>
          ))} 
        </Box>
      ))}
    </Box>
  );
};

export const SummerSkeleton: React.FC = () => {
  return (
    <Paper radius="md" shadow="sm" p="md" className="bg-white mb-6">
      {/* Tiêu đề */}
      <Title order={4} className="mb-4 text-slate-800">
        Tóm tắt đơn hàng
      </Title>
      
      {/* Thông tin thanh toán skeleton */}
      <Box className="space-y-3 mb-3">
        <Group justify="space-between">
          <Skeleton height={16} width={120} radius="sm" />
          <Skeleton height={16} width={70} radius="sm" />
        </Group>
        
        <Group justify="space-between">
          <Skeleton height={16} width={80} radius="sm" />
          <Skeleton height={16} width={70} radius="sm" />
        </Group>
        
        <Group justify="space-between">
          <Skeleton height={16} width={100} radius="sm" />
          <Skeleton height={16} width={60} radius="sm" />
        </Group>
      </Box>
      
      {/* Thông báo skeleton */}
      <Skeleton height={40} radius="sm" className="mb-4" />
      
      <Divider className="my-4" />
      
      {/* Tổng cộng - skeleton */}
      <Group justify="space-between" className="mb-6">
        <Skeleton height={18} width={80} radius="sm" />
        <Skeleton height={24} width={100} radius="sm" />
      </Group>
      
      {/* Nút thanh toán - skeleton */}
      <Skeleton height={42} radius="md" width="100%" />
    </Paper>
  );
};

export default ListProductSkeleton;


