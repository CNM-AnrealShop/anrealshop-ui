import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Skeleton,
  Text,
  Title
} from '@mantine/core';
import React, { useMemo } from 'react';
import { FiAlertCircle, FiArrowRight, FiTruck } from 'react-icons/fi';
import type { ItemsCheckoutRequest } from '../../../service/CheckoutService';
import type { CartDto } from '../../../types/CartType';
import type { CartShippingFee } from '../../../types/ShipmentType';
import { formatPrice } from '../../../untils/Untils';
import { APP_ROUTES, LOCAL_STORAGE_KEYS } from '../../../constant';
import showErrorNotification from '../../Toast/NotificationError';

interface SummerProps {
  cartItems: CartDto[];
  shippingFees: CartShippingFee[];
  freeShippingThreshold?: number;
  loadingShop: boolean;
  addressSupported?: boolean;
}

const Summer: React.FC<SummerProps> = ({
  cartItems,
  shippingFees,
  freeShippingThreshold = 500000,
  loadingShop = false,
  addressSupported = true
}) => {
  const { selectedItemsCount, subtotal, discount, shippingCost, total, hasSelectedItems, freeShippingAmount } = useMemo(() => {
    const selectedItems = cartItems.flatMap(shop => shop.items.filter(i => i.isSelected));
    const selectedItemsCount = selectedItems.length;
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const selectedShopIds = new Set(cartItems.filter(s => s.items.some(i => i.isSelected)).map(s => s.shop.id));
    const shippingCost = Array.from(selectedShopIds).reduce((sum, shopId) => {
      const feeObj = shippingFees.find(f => f.shopId === shopId);
      return sum + (feeObj ? feeObj.fee : 0);
    }, 0);
    const total = subtotal + shippingCost - discount;
    const hasSelectedItems = selectedItemsCount > 0;
    const freeShippingAmount = Math.max(0, freeShippingThreshold - subtotal);
    return { selectedItemsCount, subtotal, discount, shippingCost, total, hasSelectedItems, freeShippingAmount };
  }, [cartItems, shippingFees, freeShippingThreshold]);

  const handlePayment = () => {
    if (!hasSelectedItems) {
      showErrorNotification('Thông báo','Vui lòng chọn sản phẩm để tiến hành thanh toán');
      return;
    }
    const idItemsSelected: ItemsCheckoutRequest = cartItems
      .flatMap(cart => cart.items) 
      .filter(item => item.isSelected) 
      .reduce((acc, item) => {
        acc[item.productSkuId] = item.quantity; 
        return acc;
      }, {} as ItemsCheckoutRequest);

    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDER_ITEM_IDS, JSON.stringify(idItemsSelected));

    window.location.href = APP_ROUTES.CHECKOUT; 
  }

  return (
    <Paper radius="md" shadow="sm" p="md" className="bg-white mb-6">
      <Title order={4} className="mb-4 text-slate-800">
        Tóm tắt đơn hàng
      </Title>

      <Box className="space-y-3 mb-3">
        <Group justify="space-between">
          <Text size="sm" className="text-contentText">Tạm tính ({selectedItemsCount} sản phẩm):</Text>
          <Text size="sm" fw={500}>{subtotal.toLocaleString()}₫</Text>
        </Group>

        {discount > 0 && (
          <Group justify="space-between">
            <Text size="sm" className="text-contentText">Giảm giá:</Text>
            <Text size="sm" fw={500} className="text-green-600">-{formatPrice(discount)}</Text>
          </Group>
        )}

        <Group justify="space-between">
          <Text size="sm" className="text-contentText">Phí vận chuyển:</Text>
          {hasSelectedItems ? (
            subtotal >= freeShippingThreshold ? (
              loadingShop ? (
                <Skeleton height={14} width={70} radius="sm" />
              ) : (
                <Text size="sm" fw={500} className="text-green-600">Miễn phí</Text>
              )
            ) : (
              loadingShop ? (
                <Skeleton height={14} width={70} radius="sm" />
              ) : (
                <Text size="sm" fw={500}>{formatPrice(shippingCost)}</Text>
              )
            )
          ) : (
            <Text size="sm" fw={500}>0₫</Text>
          )}
        </Group>
      </Box>

      {hasSelectedItems && subtotal < freeShippingThreshold && subtotal > 0 && (
        <Alert className="mb-4 bg-amber-50 border-amber-100 text-amber-900" p="xs">
          <Group gap={6}>
            <FiTruck className="text-amber-600" />
            <Text size="xs">
              Mua thêm <strong>{freeShippingAmount.toLocaleString()}₫</strong> để được <strong>miễn phí vận chuyển</strong>!
            </Text>
          </Group>
        </Alert>
      )}

      {!hasSelectedItems && (
        <Alert className="mb-4 bg-blue-50 border-blue-100 text-blue-800" p="xs">
          <Group gap={6}>
            <FiAlertCircle className="text-blue-600" />
            <Text size="xs">
              Vui lòng chọn sản phẩm để tiến hành thanh toán
            </Text>
          </Group>
        </Alert>
      )}

      <Divider className="my-4" />

      <Group justify="space-between" className="mb-6">
        <Text fw={600} className="text-slate-900">Tổng cộng:</Text>
        <Text fw={700} size="lg" className="text-primary">{total.toLocaleString()}₫</Text>
      </Group>

      <Button
        size="md"
        color="blue"
        radius="md"
        fullWidth
        // className={`${hasSelectedItems ? "bg-primary hover:bg-picton-blue-600" : "bg-gray-300 cursor-not-allowed"}`}
        rightSection={<FiArrowRight size={16} />}
        disabled={!hasSelectedItems || !addressSupported}
        onClick={handlePayment}
      >
        Tiến hành thanh toán
      </Button>
    </Paper>
  );
};

export default Summer;