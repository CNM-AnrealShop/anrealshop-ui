import { Alert, Badge, Box, Group, Text } from '@mantine/core';
import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useProductForAd } from '../../../../hooks/useProductStatus';
import type { ProductDetailDto } from '../../../../types/ProductType';

interface StatusAcceptProps {
  product: ProductDetailDto;
  compact?: boolean; 
}

const StatusAccept: React.FC<StatusAcceptProps> = ({ product, compact = false }) => {
  const { getStatusColor, getStatusLabel, getStatusIcon, convertStatus } = useProductForAd();

  const StatusIcon = getStatusIcon(convertStatus(product.status, product.restrictedReason));

  return (
    <Box>
      {/* Status badges */}
      <Group mb={compact ? 'xs' : 'md'}>
        <Badge 
          size={compact ? 'md' : 'lg'} 
          color={getStatusColor(convertStatus(product.status, product.restrictedReason))} 
          leftSection={<StatusIcon size={compact ? 14 : 16} />}
        >
          {getStatusLabel(convertStatus(product.status, product.restrictedReason))}
        </Badge>
        
      </Group>

      {/* Show alerts in non-compact mode */}
      {!compact && (
        <>
          {/* Rejection alert */}
          {convertStatus(product.status, product.restrictedReason) === 'VIOLATION' && product.restrictedReason && (
            <Alert 
              color="red" 
              title="Sản phẩm bị từ chối" 
              mb="md"
              icon={<FiAlertTriangle size={16} />}
            >
              <Text size="xs">Lý do từ chối: {product.restrictedReason}</Text>
            </Alert>
          )}
          
          {/* Pending approval alert */}
          {convertStatus(product.status, product.restrictedReason) === 'PENDING' && (
            <Alert 
              color="yellow" 
              title="Sản phẩm đang chờ duyệt" 
              mb="md"
              icon={<FiClock size={16} />}
            >
              <Text size="xs">
                Sản phẩm này đang chờ được quản trị viên xét duyệt. 
                Vui lòng chờ đợi hoặc liên hệ hỗ trợ nếu thời gian chờ quá lâu.
              </Text>
            </Alert>
          )}
          
          {/* Active product alert */}
          {convertStatus(product.status, product.restrictedReason) === 'ACTIVE' && (
            <Alert 
              color="green" 
              title="Sản phẩm đã được duyệt" 
              mb="md"
              icon={<FiCheckCircle size={16} />}
            >
              <Text size="xs">
                Sản phẩm này đã được phê duyệt và đang hoạt động trên hệ thống.
              </Text>
            </Alert>
          )}
        </>
      )}
      
      {/* In compact mode, just show rejection reason without alert */}
      {compact && convertStatus(product.status, product.restrictedReason) === 'VIOLATION' && product.restrictedReason && (
        <Text size="xs" c="red" mt="xs">
          Lý do từ chối: {product.restrictedReason}
        </Text>
      )}
    </Box>
  );
};

export default StatusAccept;