import { Avatar, Box, Button, Checkbox, Divider, Group, Loader, Text, Title } from '@mantine/core';
import React from 'react';
import { FiClock, FiShoppingBag, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { CartDto } from '../../../types/CartType';
import type { CartShippingFee } from '../../../types/ShipmentType';
import CartCard from '../Common/CartCard';

interface ListProductProps {
  cartItems: CartDto[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (itemId: string, checked: boolean) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onRemoveSelected: () => void;
  shippingFees: CartShippingFee[];
  loadingShopIds: string[];
}

const ListProduct: React.FC<ListProductProps> = ({
  cartItems,
  selectAll,
  onSelectAll,
  onSelectItem,
  onUpdateQuantity,
  onRemoveItem,
  onRemoveSelected,
  shippingFees,
  loadingShopIds = []
}) => {
  const totalItems = cartItems.reduce((acc, shop) => acc + shop.items.length, 0);
  const hasSelectedItems = cartItems.some(shop => shop.items.some(i => i.isSelected));
  const isEmpty = cartItems.length === 0;

  const getShippingInfo = (shopId: string) => {
    return shippingFees.find(fee => fee.shopId === shopId);
  };

  const handleChangeSelected = (itemId: string, checked: boolean) => {
    onSelectItem(itemId, checked);
  };

  if (isEmpty) {
    return (
      <Box className="text-center py-28">
        <FiShoppingCart size={64} className="text-gray-300 mx-auto mb-8" />
        <Title order={4} className="text-slate-800 mb-3">Giỏ hàng của bạn đang trống</Title>
        <Text color="dimmed" mb={4}>
          Bạn chưa thêm sản phẩm nào vào giỏ hàng.
        </Text>
        <Button
          component={Link}
          to="/"
          size="sm"
          className="bg-primary hover:bg-picton-blue-600 mt-2"
        >
          Tiếp tục mua sắm
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Group justify="space-between" className="mb-3">
        <Group mih={30}>
          <Checkbox
            checked={selectAll}
            onChange={(event) => onSelectAll(event.currentTarget.checked)}
            label={`Chọn tất cả (${totalItems})`}
            size="sm"
          />
        </Group>
        {hasSelectedItems && (
          <Button
            variant="subtle"
            color="red"
            size="xs"
            onClick={onRemoveSelected}
            leftSection={<FiTrash2 size={14} />}
          >
            Xóa đã chọn
          </Button>
        )}
      </Group>

      <Divider className="mb-3" />

      {cartItems.map((shopGroup) => {
        const shippingInfo = getShippingInfo(shopGroup.shop.id);
        const isShopLoading = loadingShopIds.includes(shopGroup.shop.id);
        const showShippingInfo = shippingInfo && !isShopLoading;

        return (
          <Box key={shopGroup.shop.id} className="mb-6">
            <Link to={`/shops/${shopGroup.shop.id}`} >
              <Group className="mb-3 bg-gray-50 p-3 rounded" justify="space-between">
                <Group>
                  <Avatar
                    src={shopGroup.shop.avatarUrl}
                    size="sm"
                    radius="xl"
                  />
                  <Group gap={4} align="center">
                    <FiShoppingBag size={16} className="text-primary" />
                    <Text fw={600} size="sm">{shopGroup.shop.name}</Text>
                  </Group>
                </Group>

                {showShippingInfo && (
                  <Group gap={6} className="text-primary">
                    <FiClock size={14} />
                    <Text size="xs" fw={500}>Giao hàng dự kiến: {shippingInfo.leadTime}</Text>
                  </Group>
                )}

                {isShopLoading && (
                  <Loader color="blue" size={'xs'} />
                )}
              </Group>
            </Link>

            {shopGroup.items.map((item) => (
              <React.Fragment key={item.id}>
                <CartCard
                  item={item}
                  onSelect={handleChangeSelected}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
                <Divider className="mt-4" />
              </React.Fragment>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default ListProduct;