import {
  Alert,
  Box,
  Button,
  Container,
  Group,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { FiAlertTriangle, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { PaymentResultData } from '../../../types/PaymentResultType';
import { formatPrice } from '../../../untils/Untils';
import { getPaymentMethodIcon, getPaymentMethodName } from './utils';

interface PaymentFailureProps {
  paymentResult: PaymentResultData;
}

const PaymentFailureView = ({ paymentResult }: PaymentFailureProps) => {
  return (
    <Container size="md" className="py-12">
      <Paper radius="md" shadow="md" p="xl">
        <Box className="text-center mb-8">
          <FiAlertTriangle size={64} className="mx-auto mb-4 text-red-500" />
          <Title order={2} className="text-red-600">Thanh toán không thành công!</Title>
          <Text size="lg" className="mt-2 text-slate-600">
            Đã xảy ra lỗi trong quá trình xử lý thanh toán của bạn
          </Text>
        </Box>

        <Alert 
          icon={<FiAlertTriangle size={20} />} 
          title="Lý do thanh toán thất bại" 
          color="red" 
          variant="outline" 
          className="mb-6"
        >
          {/* <Text size="sm">{paymentResult.errorMessage || "Không xác định được nguyên nhân, vui lòng thử lại sau."}</Text> */}
        </Alert>

        <Paper withBorder p="md" radius="md" className="bg-gray-50 mb-6">
          <Title order={4} className="mb-4 text-slate-800">Chi tiết đơn hàng</Title>
          
          <Text fw={500} className="text-slate-700">Mã đơn hàng:</Text>
          <Text className="text-slate-600 mb-3">{paymentResult.orderId.substring(0, 8)}...</Text>
          
          <Text fw={500} className="text-slate-700">Phương thức thanh toán:</Text>
          <Group gap="xs" className="mb-3">
            {getPaymentMethodIcon(paymentResult.paymentMethod)}
            <Text className="text-slate-600">{getPaymentMethodName(paymentResult.paymentMethod)}</Text>
          </Group>
          
          <Text fw={500} className="text-slate-700">Tổng thanh toán:</Text>
          <Text fw={700} className="text-primary text-lg">{formatPrice(paymentResult.amount)}</Text>
        </Paper>

        <Box className="text-center mt-8">
          <Text className="mb-4 text-slate-600">
            Bạn có thể thử lại hoặc chọn phương thức thanh toán khác.
          </Text>
          
          <Group justify="center">
            <Button 
              component={Link} 
              to="/checkout"
              leftSection={<FiArrowLeft size={16} />} 
              variant="outline" 
              color="gray"
            >
              Quay lại thanh toán
            </Button>
            <Button 
              component={Link} 
              to="/carts"
              leftSection={<FiShoppingBag size={16} />}
              color="blue" 
              className="bg-primary"
            >
              Xem giỏ hàng
            </Button>
          </Group>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentFailureView;
