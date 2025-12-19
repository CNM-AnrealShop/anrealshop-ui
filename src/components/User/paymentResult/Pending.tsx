import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Text,
  Title
} from '@mantine/core';
import { FiClock, FiHome, FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { PaymentResultData } from '../../../types/PaymentResultType';
import { formatPrice } from '../../../untils/Untils';
import { getPaymentMethodIcon, getPaymentMethodName } from './utils';
import { ButtonCopy } from '../../common/ButtonCopy';

interface PaymentPendingProps {
  paymentResult: PaymentResultData;
}

const PaymentPendingView = ({ paymentResult }: PaymentPendingProps) => {
  return (
    <Container size="md" className="py-8">
      <Paper radius="md" shadow="md" p="xl">
        <Box className="text-center mb-6">
          <FiClock size={40} className="mx-auto mb-4 text-amber-500" />
          <Title order={3} className="text-amber-600">Đơn hàng đang xử lý!</Title>
          <Text size="md" className="mt-2 text-slate-600">
            Đơn hàng của bạn đã được tiếp nhận và sẽ được thanh toán khi nhận hàng
          </Text>
        </Box>

        <Paper withBorder p="md" radius="md" className="bg-gray-50 mb-6">
          <Title order={4} className="mb-4 text-slate-800">Chi tiết đơn hàng</Title>
          
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text fw={500} className="text-slate-700">Mã đơn hàng:</Text>
              <Group gap="xs">
                <Text className="text-slate-600 underline">{paymentResult.orderId.substring(0, 18)}...</Text>
                <ButtonCopy id={paymentResult.orderId} />
              </Group>

              <Text fw={500} className="text-slate-700 mt-3">Ngày đặt hàng:</Text>
              <Text className="text-slate-600">{new Date(paymentResult.orderDate).toLocaleString('vi-VN')}</Text>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text fw={500} className="text-slate-700">Phương thức thanh toán:</Text>
              <Group gap="xs">
                {getPaymentMethodIcon(paymentResult.paymentMethod)}
                <Text className="text-slate-600">{getPaymentMethodName(paymentResult.paymentMethod)}</Text>
              </Group>
              
              <Text fw={500} className="text-slate-700 mt-3">Tổng thanh toán:</Text>
              <Text fw={700} className="text-primary text-lg">{formatPrice(paymentResult.amount)}</Text>
            </Grid.Col>
          </Grid>
        </Paper>

        <Box className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-6">
          <Group align="space-between"  wrap='nowrap' gap="sm">
            <FiClock size={20} className="text-amber-500 mt-0.5" />
            <Box>
              <Text fw={600} className="text-amber-800">Thanh toán khi nhận hàng</Text>
              <Text size="sm" className="text-amber-700 mt-1">
                Đơn hàng của bạn sẽ được giao trong thời gian sớm nhất. Vui lòng chuẩn bị số tiền tương ứng để thanh toán khi nhận hàng.
              </Text>
            </Box>
          </Group>
        </Box>

        <Box className="text-center mt-8">
          <Text className="mb-4 text-slate-600">
            Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
          </Text>
          
          <Group justify="center">
            <Button 
              component={Link} 
              to="/"
              leftSection={<FiHome size={16} />} 
              variant="outline" 
              color="gray"
            >
              Tiếp tục mua sắm
            </Button>
            <Button 
              component={Link} 
              to={`/settings/orders`}
              leftSection={<FiPackage size={16} />}
              color="blue" 
              className="bg-primary"
            >
              Xem đơn hàng
            </Button>
          </Group>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentPendingView;
