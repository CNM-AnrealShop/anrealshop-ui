import { Badge, Button, Divider, Group, Paper, Table, Text } from '@mantine/core';
import { FiCheckCircle, FiClock, FiDollarSign, FiMapPin, FiTruck } from 'react-icons/fi';

interface ProductShippingInfoProps {
  weight: number;
}

const ProductShippingInfo = ({ weight }: ProductShippingInfoProps) => {
  // Tính phí vận chuyển dựa vào weight
  const getShippingFee = () => {
    if (!weight) return "30.000₫ - 45.000₫";
    if (weight < 1) return "20.000₫ - 35.000₫";
    if (weight < 2) return "30.000₫ - 45.000₫";
    if (weight < 5) return "45.000₫ - 70.000₫";
    return "70.000₫ - 120.000₫";
  };

  // Ước tính thời gian giao hàng
  const getEstimatedDelivery = () => {
    return "Dự kiến giao hàng vào 10 - 15 Th06";
  };

  return (
    <Paper withBorder p="md" radius="md" className="mb-6">
      <Group className="mb-3" align="center">
        <FiTruck size={18} className="text-primary" />
        <Text fw={600} size="md">Thông tin vận chuyển</Text>
      </Group>
      
      <Divider className="mb-3" />
      
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className="w-1/3">
              <Group gap="xs" className="flex-nowrap">
                <FiMapPin size={16} className="text-primary" />
                <Text size="sm">Vận chuyển tới</Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Group justify="apart">
                <Text size="sm">Hồ Chí Minh, Phường 4, Quận 3</Text>
                <Button variant="subtle" size="xs">
                  Thay đổi
                </Button>
              </Group>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Group gap="xs" className="flex-nowrap">
                <FiDollarSign size={16} className="text-primary" />
                <Text size="sm">Phí vận chuyển</Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{getShippingFee()}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Group gap="xs" className="flex-nowrap">
                <FiClock size={16} className="text-primary" />
                <Text size="sm">Thời gian giao hàng</Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{getEstimatedDelivery()}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Group gap="xs" className="flex-nowrap">
                <FiCheckCircle size={16} className="text-green-500" />
                <Text size="sm">Chính sách</Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Group gap={8}>
                <Badge variant="outline" color="green" size="sm">Đổi trả trong 7 ngày</Badge>
                <Badge variant="outline" color="blue" size="sm">Hàng chính hãng</Badge>
              </Group>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default ProductShippingInfo;