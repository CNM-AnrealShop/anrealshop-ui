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
import { FiCheckCircle, FiHome, FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { PaymentResultData } from '../../../types/PaymentResultType';
import { formatPrice } from '../../../untils/Untils';
import { getPaymentMethodIcon, getPaymentMethodName } from './utils';

interface OrderCreateSuccessViewProps {
  paymentResult: PaymentResultData;
};
const OrderCreateSuccessView = ({ paymentResult }: OrderCreateSuccessViewProps) => {
  return (
    <Container size="md" className="py-12">
      <Paper radius="md" shadow="md" p="xl">
        <Box className="text-center mb-8">
          <FiCheckCircle size={64} className="mx-auto mb-4 text-green-500" />
          <Title order={2} className="text-green-600">Đặt hàng thành công!</Title>
          <Text size="lg" className="mt-2 text-slate-600">
            Cảm ơn bạn đã mua sắm tại ANReal Shop
          </Text>
        </Box>

        <Paper withBorder p="md" radius="md" className="bg-gray-50 mb-6">
          <Title order={4} className="mb-4 text-slate-800">Chi tiết đơn hàng</Title>
          
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text fw={500} className="text-slate-700">Mã đơn hàng:</Text>
              <Text className="text-slate-600">{paymentResult?.orderId.substring(0, 8)}...</Text>

              <Text fw={500} className="text-slate-700 mt-3">Ngày đặt hàng:</Text>
              <Text className="text-slate-600">{new Date(paymentResult?.orderDate as string).toLocaleString('vi-VN')}</Text>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text fw={500} className="text-slate-700">Phương thức thanh toán:</Text>
              <Group gap="xs">
                {getPaymentMethodIcon(paymentResult?.paymentMethod as string)}
                <Text className="text-slate-600">{getPaymentMethodName(paymentResult?.paymentMethod as string)}</Text>
              </Group>
              
              <Text fw={500} className="text-slate-700 mt-3">Tổng thanh toán:</Text>
              <Text fw={700} className="text-primary text-lg">{formatPrice(paymentResult?.amount as number)}</Text>
            </Grid.Col>
          </Grid>
        </Paper>

        <Box className="text-center mt-8">
          <Text className="mb-4 text-slate-600">
            {paymentResult?.paymentMethod as string === 'COD' 
              ? 'Vui lòng chuẩn bị tiền mặt khi nhận hàng. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.'
              : 'Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.'
            }
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
              to="/settings/orders?status=PENDING_CONFIRMATION"
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

export default OrderCreateSuccessView;
