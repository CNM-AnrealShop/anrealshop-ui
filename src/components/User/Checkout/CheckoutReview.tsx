import { Box, Title, Group, Text, Divider, Paper, Button, Loader } from '@mantine/core';
import { FiBox } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../untils/Untils';
import type { CartShippingFee, CheckoutInfoDto } from '../../../types/ShipmentType';
import { CheckoutReviewSkeleton } from './Sekeleton';


interface CheckoutReviewProps {
  itemCheckoutInfo: CheckoutInfoDto[];
  feeUpdated: CartShippingFee[];
  feeLoading: boolean;
  onPlaceOrder: () => void;
  loading: boolean;
  isLoading?: boolean;
}

const CheckoutReview = ({ 
  itemCheckoutInfo, 
  feeUpdated, 
  feeLoading, 
  onPlaceOrder, 
  loading,
  isLoading = false
}: CheckoutReviewProps) => {
  if (isLoading || !itemCheckoutInfo || itemCheckoutInfo.length === 0) {
    return <CheckoutReviewSkeleton />;
  }

  const isDisable = itemCheckoutInfo.some(shop => shop.isSuccess === false);

  const subtotal = itemCheckoutInfo.reduce((total, shop) => {
    return total + shop.items.reduce((shopTotal, item) => shopTotal + (item.price * item.quantity), 0);
  }, 0);
  const discount = 0;
  
  const shippingCost = feeUpdated && feeUpdated.length > 0
    ? feeUpdated.reduce((total, item) => total + item.fee, 0)
    : itemCheckoutInfo.reduce((total, shop) => total + shop.fee, 0);
  
  const total = subtotal - discount + shippingCost;

  return (
    <Paper radius="lg" withBorder shadow="sm" p="md" className="bg-white mb-6">
      <Title order={4} className="!mb-4 flex items-center text-slate-900">
        <FiBox className="mr-2" size={18} /> Tổng quan đơn hàng
      </Title>
      
      {/* Tóm tắt đơn hàng */}
      <Box>
        <Text fw={600} className="mb-3 text-slate-900">Tóm tắt đơn hàng</Text>
        
        <Box className="space-y-3 mb-3">
          <Group justify="space-between">
            <Text size="sm" className="text-contentText">Tạm tính:</Text>
            <Text size="sm" fw={500}>{formatPrice(subtotal)}</Text>
          </Group>
          
          {discount > 0 && (
            <Group justify="space-between">
              <Text size="sm" className="text-contentText">Giảm giá:</Text>
              <Text size="sm" fw={500} className="text-green-600">-{formatPrice(discount)}</Text>
            </Group>
          )}
          
          <Group justify="space-between">
            <Text size="sm" className="text-contentText">Phí vận chuyển:</Text>
            {feeLoading ? (
              <Loader size="xs" />
            ) : (
              <Text size="sm" fw={500}>{formatPrice(shippingCost)}</Text>
            )}
          </Group>
        </Box>
        
        <Divider className="my-4" />
        
        <Group justify="space-between">
          <Text fw={600} className="text-slate-900">Tổng cộng:</Text>
          {feeLoading ? (
            <Loader size="xs" />
          ) : (
            <Text fw={700} size="lg" className="text-primary">{formatPrice(total)}</Text>
          )}
        </Group>

        <Divider className="my-4" />

        <Box>
          <Button
            size="md"
            radius="md"
            fullWidth
            color="blue"
            onClick={onPlaceOrder}
            loading={loading}
            disabled={feeLoading || isDisable}
            className="bg-primary hover:bg-picton-blue-600"
          >
            Đặt hàng
          </Button>
          <Text size="xs" color="dimmed" className="text-center !mt-3">
            Bằng việc đặt hàng, bạn đồng ý với <Link to="/terms" className="text-primary hover:underline">Điều khoản sử dụng</Link> và <Link to="/privacy" className="text-primary hover:underline">Chính sách bảo mật</Link> của chúng tôi.
          </Text>
        </Box>
      </Box>
    </Paper>
  );
};

export default CheckoutReview;