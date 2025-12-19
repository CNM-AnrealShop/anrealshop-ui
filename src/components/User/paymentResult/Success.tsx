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

interface PaymentSuccessProps {
  paymentResult: PaymentResultData;
}

const PaymentSuccessView = ({ paymentResult }: PaymentSuccessProps) => {
  return (
    <Container size="md" className="py-12">
      <Paper radius="md" shadow="md" p="xl">
        <Box className="text-center mb-8">
          <FiCheckCircle size={64} className="mx-auto mb-4 text-green-500" />
          <Title order={2} className="text-green-600">Thanh toán thành công!</Title>
          <Text size="lg" className="mt-2 text-slate-600">
            Cảm ơn bạn đã mua sắm tại ANReal Shop
          </Text>
        </Box>

        <Paper withBorder p="md" radius="md" className="bg-gray-50 mb-6">
          <Title order={4} className="mb-4 text-slate-800">Chi tiết đơn hàng</Title>
          
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text fw={500} className="text-slate-700">Mã đơn hàng:</Text>
              <Text className="text-slate-600">{paymentResult.orderId.substring(0, 8)}...</Text>

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

        {/* {paymentResult.items && paymentResult.items.length > 0 && (
          <Paper withBorder p="md" radius="md" className="mb-6">
            <Title order={4} className="mb-4 text-slate-800">Sản phẩm đã mua</Title>
            <Stack gap="md">
              {paymentResult.items.map((item, index) => (
                <Box key={index}>
                  <Group wrap="nowrap">
                    <Image 
                      src={item.thumbnailUrl} 
                      width={60} 
                      height={60} 
                      radius="md"
                      alt={item.productName}
                      className="border border-gray-200"
                    />
                    <Box style={{ flex: 1 }}>
                      <Text lineClamp={2} size="sm" fw={500}>{item.productName}</Text>
                      <Group justify="apart" mt={4}>
                        <Text size="sm" color="dimmed">x{item.quantity}</Text>
                        <Text size="sm" fw={500}>{formatPrice(item.price)}</Text>
                      </Group>
                    </Box>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Paper>
        )} */}

        {/* {paymentResult.address && (
          <Paper withBorder p="md" radius="md" className="mb-6">
            <Title order={4} className="mb-4 text-slate-800">Thông tin giao hàng</Title>
            <Text fw={500} className="text-slate-700">Người nhận:</Text>
            <Text className="text-slate-600 mb-2">{paymentResult.customerName}</Text>
            
            <Text fw={500} className="text-slate-700">Số điện thoại:</Text>
            <Text className="text-slate-600 mb-2">{paymentResult.phoneNumber}</Text>
            
            <Text fw={500} className="text-slate-700">Địa chỉ:</Text>
            <Text className="text-slate-600">{paymentResult.address}</Text>
          </Paper>
        )} */}

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

export default PaymentSuccessView;
