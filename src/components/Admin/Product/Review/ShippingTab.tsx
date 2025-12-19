import { Box, Group, Table, Text, Title } from '@mantine/core';
import React from 'react';
import { FiPackage } from 'react-icons/fi';
import type { ProductDetailDto } from '../../../../types/ProductType';

interface ShippingTabProps {
  product: ProductDetailDto;
}

const ShippingTab: React.FC<ShippingTabProps> = ({ product }) => {

  const hasPhysicalSpecs =
    (product.weight && product.weight > 0) ||
    (product.height && product.height > 0) ||
    (product.width && product.width > 0) ||
    (product.length && product.length > 0);

  return (
    <Box p="xs">
      {hasPhysicalSpecs ? (
        <>
          <Group mb="xs" align="center">
            <FiPackage size={18} />
            <Title order={5}>Kích thước và trọng lượng</Title>
          </Group>

          <Table striped>
            <Table.Tbody>
              {product.weight && (
                <Table.Tr>
                  <Table.Th style={{ width: 200 }}>
                    <Text size="xs">Trọng lượng</Text>
                  </Table.Th>
                  <Table.Td>
                    <Text size="xs" fw={500}>{product.weight} g</Text>
                  </Table.Td>
                </Table.Tr>
              )}
              {product.length && (
                <Table.Tr>
                  <Table.Th>
                    <Text size="xs">Chiều dài</Text>
                  </Table.Th>
                  <Table.Td>
                    <Text size="xs" fw={500}>{product.length} cm</Text>
                  </Table.Td>
                </Table.Tr>
              )}
              {product.width && (
                <Table.Tr>
                  <Table.Th>
                    <Text size="xs">Chiều rộng</Text>
                  </Table.Th>
                  <Table.Td>
                    <Text size="xs" fw={500}>{product.width} cm</Text>
                  </Table.Td>
                </Table.Tr>
              )}
              {product.height && (
                <Table.Tr>
                  <Table.Th>
                    <Text size="xs">Chiều cao</Text>
                  </Table.Th>
                  <Table.Td>
                    <Text size="xs" fw={500}>{product.height} cm</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </>
      ) : (
        <Box mt="xl" ta="center">
          <Text c="dimmed" size="sm">
            Sản phẩm không có thông tin kích thước và trọng lượng
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ShippingTab;