import { Badge, Box, Image, Table, Text } from '@mantine/core';
import React from 'react';
import type { ProductDetailDto } from '../../../../types/ProductType';
import { formatPrice } from '../../../../untils/Untils';

interface VariantTabProps {
  product: ProductDetailDto;
}

const VariantTab: React.FC<VariantTabProps> = ({ product }) => {
  return (
    <Box>
      {product.productSkus && product.productSkus.length > 0 ? (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Hình</Table.Th>
              <Table.Th>SKU</Table.Th>
              <Table.Th>Thuộc tính</Table.Th>
              <Table.Th>Giá</Table.Th>
              <Table.Th>SL tồn</Table.Th>
              <Table.Th>SL Bán</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {product.productSkus.map((variant) => (
              <Table.Tr key={variant.id}>
                <Table.Td style={{ width: 80 }}>
                  <div className="w-16 h-16 flex-shrink-0 object-cover rounded-md overflow-hidden">
                    <Image
                      src={variant.imageUrl || product.thumbnailUrl}
                      height={50}
                      width={50}
                      radius="sm9"
                      fit="cover"
                    // placeholder={<Text size="xs" ta="center">No image</Text>}
                    />
                  </div>
                </Table.Td>
                <Table.Td>{variant.sku}</Table.Td>
                <Table.Td>
                  <Badge color='blue' variant='light' size='sm'>
                    {variant.keyAttributes?.join(', ') || 'Không có thuộc tính'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size='sm' fw={500}>
                    {formatPrice(variant.price)}
                  </Text>
                </Table.Td>
                <Table.Td>{variant.quantity}</Table.Td>
                <Table.Td>{variant.sold || 0}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <Box p="lg" ta="center">
          <Text c="dimmed">Sản phẩm không có phiên bản</Text>
        </Box>
      )}

      <Box mt="md">
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th style={{ width: 200 }}>Tổng số lượng</Table.Th>
              <Table.Td>{product.quantity}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Đã bán</Table.Th>
              <Table.Td>{product.sold || 0}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default VariantTab;