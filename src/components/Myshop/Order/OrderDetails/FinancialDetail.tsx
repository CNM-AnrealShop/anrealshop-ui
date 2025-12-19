import { ActionIcon, Alert, Badge, Card, Divider, Group, Text, Tooltip } from '@mantine/core';
import { FiDollarSign, FiInfo } from 'react-icons/fi';
import { formatPrice } from '../../../../untils/Untils';

interface FinancialDetailProps {
  orderData?: {
    totalProductCost?: number;
    totalShippingCost?: number;
    shippingFee?: number;
    shippingDiscount?: number;
    FixedFeeRate?: number;
    serviceFeeRate?: number;
    PaymentFeeRate?: number;
    revenue?: number;
  };
}

const FinancialDetail = ({ orderData }: FinancialDetailProps) => {
  if (!orderData || !orderData.totalProductCost) {
    return (
      <Card withBorder p="md" style={{ position: 'sticky', top: '20px' }}>
        <Group mb="md">
          <FiDollarSign size={18} />
          <Text fw={700} size="lg">Thông tin thanh toán</Text>
        </Group>
        <Alert color="yellow" title="Thông tin không khả dụng">
          Không có thông tin chi tiết về thanh toán cho đơn hàng này.
        </Alert>
      </Card>
    );
  }

  // Calculate fees based on rates
  const fixedFee = orderData.totalProductCost * (orderData.FixedFeeRate || 3) / 100;
  const serviceFee = orderData.totalProductCost * (orderData.serviceFeeRate || 6) / 100;
  const paymentFee = orderData.totalProductCost * (orderData.PaymentFeeRate || 2.5) / 100;
  const totalFees = fixedFee + serviceFee + paymentFee;

  const calculatedRevenue = orderData.totalProductCost - totalFees - (orderData.totalShippingCost || 0);

  return (
    <Card withBorder p="md" style={{ position: 'sticky', top: '80px' }}>
      <Group mb="md">
        <FiDollarSign size={18} />
        <Text fw={700} size="lg">Thông tin thanh toán</Text>
      </Group>

      <Group justify="apart" mb="xs">
        <Text size="sm">Phương thức:</Text>
        <Text size="sm" fw={500}>Thanh toán khi nhận hàng (COD)</Text>
      </Group>

      <Group justify="apart">
        <Text size="sm">Trạng thái:</Text>
        <Badge color="yellow">
          Chờ xác nhận thanh toán
        </Badge>
      </Group>

      <Divider my="md" label="Chi tiết thanh toán" labelPosition="center" />

      <div className="space-y-2">
        <Group justify="space-between">
          <Text size="sm" fw={500}>Tổng tiền sản phẩm</Text>
          <Text size="sm">{formatPrice(orderData.totalProductCost)}</Text>
        </Group>

        <Divider my="xs" variant="dashed" />

        <Group justify="space-between">
          <Text size="sm" fw={500}>Tổng phí vận chuyển</Text>
          <Text size="sm">{formatPrice(orderData.totalShippingCost || 0)}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm">Phí vận chuyển người mua trả</Text>
          <Text size="sm">{formatPrice(orderData.shippingFee || 0)}</Text>
        </Group>
        {(orderData.shippingDiscount || 0) > 0 && (
          <Group justify="space-between">
            <Text size="sm">Giảm giá vận chuyển</Text>
            <Text size="sm" c="green">-{formatPrice(orderData.shippingDiscount || 0)}</Text>
          </Group>
        )}

        <Divider my="xs" variant="dashed" />

        <Group justify="space-between">
          <Text size="sm" fw={500}>Phí nền tảng</Text>
          <Text size="sm" c="red">-{formatPrice(totalFees)}</Text>
        </Group>

        <Group justify="space-between">
          <Group gap={4}>
            <Text size="sm">Phí cố định</Text>
            <Tooltip label={`${orderData.FixedFeeRate || 3}% tổng giá trị đơn hàng`}>
              <ActionIcon size="xs" variant="subtle" color="gray">
                <FiInfo size={12} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text size="sm" c="red">-{formatPrice(fixedFee)}</Text>
        </Group>

        <Group justify="space-between">
          <Group gap={4}>
            <Text size="sm">Phí dịch vụ</Text>
            <Tooltip label={`${orderData.serviceFeeRate || 6}% tổng giá trị đơn hàng`}>
              <ActionIcon size="xs" variant="subtle" color="gray">
                <FiInfo size={12} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text size="sm" c="red">-{formatPrice(serviceFee)}</Text>
        </Group>

        <Group justify="space-between">
          <Group gap={4}>
            <Text size="sm">Phí thanh toán</Text>
            <Tooltip label={`${orderData.PaymentFeeRate || 2.5}% tổng giá trị đơn hàng`}>
              <ActionIcon size="xs" variant="subtle" color="gray">
                <FiInfo size={12} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text size="sm" c="red">-{formatPrice(paymentFee)}</Text>
        </Group>

        <Divider my="sm" />

        <Group justify="space-between">
          <Text fw={500}>Doanh thu thực tế</Text>
          <Text fw={700} color="green">{formatPrice(orderData.revenue || calculatedRevenue)}</Text>
        </Group>
      </div>
    </Card>
  );
};

export default FinancialDetail;