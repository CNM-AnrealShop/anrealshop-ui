import { Alert, Avatar, Box, Divider, Group, Image, Loader, Paper, Stack, Text } from '@mantine/core';
import { FiAlertTriangle, FiShoppingBag, FiTruck } from 'react-icons/fi';
import type { CartItemDto } from '../../../types/CartType';
import type { CartShippingFee, CheckoutInfoDto } from '../../../types/ShipmentType';
import { formatPrice, getMessageDate } from '../../../untils/Untils';
import { ListProductSkeleton } from './Sekeleton';

interface ListProductProps {
  cartItems: CheckoutInfoDto[];
  feeUpdate?: CartShippingFee[] | [];
  feeLoading?: boolean;
  isLoading?: boolean;
}

const ListProduct = ({
  cartItems = [],
  feeUpdate = [],
  feeLoading = false,
  isLoading = false
}: ListProductProps) => {
  if (isLoading) {
    return <ListProductSkeleton />;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Paper radius="md" shadow="sm" p="md" className="bg-white mb-6">
        <Group justify="space-between" className="mb-3">
          <Text fw={600} size="md" className="text-slate-800 flex items-center">
            <FiShoppingBag className="inline-block mr-2" size={16} />
            Sản phẩm
          </Text>
        </Group>
        <Text color="dimmed" className="text-center py-6">
          Không có sản phẩm nào trong đơn hàng
        </Text>
      </Paper>
    );
  }

  const totalItems = cartItems.reduce((acc, shopGroup) =>
    acc + shopGroup.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0), 0);

  return (
    <Paper radius="md" shadow="sm" p="md" className="bg-white mb-6">
      <Group justify="space-between" className="mb-4">
        <Text fw={600} size="md" className="text-slate-800 flex items-center">
          <FiShoppingBag className="inline-block mr-2" size={16} />
          Sản phẩm ({totalItems})
        </Text>
      </Group>

      <Stack gap="lg">
        {cartItems.map((shopGroup, shopIndex) => {
          const updatedFeeInfo = feeUpdate.find(fee => fee.shopId === shopGroup.shop.id);
          const currentFee = updatedFeeInfo ? updatedFeeInfo.fee : shopGroup.fee;
          const currentLeadTime = updatedFeeInfo ? updatedFeeInfo.leadTime : shopGroup.leadTime;
          const isSuccessShipping = updatedFeeInfo ? updatedFeeInfo.isSuccess : shopGroup.isSuccess;

          return (
            <Box key={shopGroup.shop.id}>
              {/* Shop Header with Products */}
              <Paper withBorder radius="md" className="overflow-hidden">
                {/* Shop Header */}
                <Group className="p-3 bg-gray-50 border-b border-gray-200" gap="sm">
                  <Avatar src={shopGroup.shop.avatarUrl} size="sm" radius="xl" />
                  <Box>
                    <Group gap={4} align="center">
                      <Text fw={600} size="sm" className="text-slate-800">
                        {shopGroup.shop.name}
                      </Text>
                      <FiShoppingBag size={14} className="text-primary" />
                    </Group>
                  </Box>
                </Group>

                {/* Products List */}
                <Box className="p-4">
                  <Stack gap="md">
                    {shopGroup.items.map((item, index) => (
                      <Box key={item.id}>
                        <ProductItem item={item} />
                        {index < shopGroup.items.length - 1 && (
                          <Divider className="mt-3" />
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>

                {/* Shipping Info */}
                <Box className="py-2 pl-3 pr-4 bg-gray-50 border-t border-gray-200">
                  <Group justify="space-between" align="flex-start">
                    {/* Shipping Method */}
                    <Box p={4}>
                      {isSuccessShipping === false ? (
                        <Alert
                          icon={<FiAlertTriangle size={16} />}
                          color="red"
                          title="Không có đơn vị vận chuyển phù hợp"
                          variant="light"
                          className="mb-2"
                        >
                          <Text size="xs">
                            Không tìm thấy đơn vị vận chuyển phù hợp cho địa chỉ này. Vui lòng chọn địa chỉ khác hoặc liên hệ với shop.
                          </Text>
                        </Alert>
                      ) : (
                        <>
                          <Group gap={4} mb={6}>
                            <FiTruck size={14} className="text-blue-600" />
                            <Text size="sm" fw={500} className="text-slate-800">
                              Phương thức vận chuyển:
                            </Text>
                            <Text size="sm" className="text-slate-800">
                              {shopGroup.serviceName || 'Tiêu chuẩn'}
                            </Text>
                          </Group>

                          <Text size="xs" c="dimmed" mb={4}>
                            Đảm bảo nhận hàng từ <span className='text-primary'>{getMessageDate(currentLeadTime).toLocaleLowerCase()}</span>
                          </Text>
                          <Text size="xs" c="dimmed" mb={4}>
                            Nhận Voucher trị giá ₫15.000 nếu đơn hàng được giao đến bạn sau {getMessageDate(currentLeadTime).toLocaleLowerCase()}.
                          </Text>
                          <Text size="xs" c="dimmed" fw={500}>
                            Lưu ý: Sử dụng địa chỉ mua hàng trước sáp nhập
                          </Text>
                        </>
                      )}
                    </Box>

                    {/* Shipping Fee with loading state */}
                    <Box>
                      {feeLoading ? (
                        <Group gap={8}>
                          <Loader size="xs" />
                          <Text size="xs" fw={700} className="text-gray-500">
                            Đang tính...
                          </Text>
                        </Group>
                      ) : isSuccessShipping === false ? (
                        <Text size="sm" fw={700} className="text-red-500">
                          Không khả dụng
                        </Text>
                      ) : (
                        <Text size="sm" fw={700} className="text-primary">
                          {formatPrice(currentFee)}
                        </Text>
                      )}
                    </Box>
                  </Group>
                </Box>

                {/* Shop Total Amount Section */}
                <Box className="px-4 py-3 border-t border-gray-200">
                  <Group justify="flex-end" align="center">
                    <Text size="sm" className="text-slate-700">
                      Tổng số tiền ({shopGroup.items.length} sản phẩm):
                    </Text>
                    {feeLoading ? (
                      <Group gap={8}>
                        <Loader size="xs" />
                        <Text size="xs" fw={700} className="text-gray-500">
                          Đang tính...
                        </Text>
                      </Group>
                    ) : isSuccessShipping === false ? (
                      <Text size="sm" fw={700} className="!text-red-500">
                        Không thể giao hàng
                      </Text>
                    ) : (
                      <Text size="sm" fw={700} className="!text-primary">
                        {formatPrice(
                          shopGroup.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + currentFee
                        )}
                      </Text>
                    )}
                  </Group>
                </Box>
              </Paper>

              {/* Divider between shops */}
              {shopIndex < cartItems.length - 1 && (
                <Divider mt="lg" className="border-gray-300" />
              )}
            </Box>
          )
        })}
      </Stack>
    </Paper>
  );
};

const ProductItem = ({ item }: { item: CartItemDto }) => {
  if (!item) return null;

  try {
    return (
      <Group wrap="nowrap" gap="sm" align="flex-start">
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={item.thumbnailUrl}
            alt={item.name}
            radius="md"
            className="w-full h-full object-cover border border-gray-200 flex-shrink-0"
          />
        </div>

        <Box style={{ flex: 1 }} className="min-w-0">
          <Group justify="apart" align="flex-start" className="mb-1">
            <Box style={{ flex: 1 }}>
              <Text lineClamp={1} size="sm" fw={500} className="text-slate-800 leading-tight">
                {item.name}
              </Text>
            </Box>

            <Text size="xs" color="dimmed" className="flex-shrink-0 ml-4 mt-1">
              x{item.quantity}
            </Text>
          </Group>

          {item.attributeString && (
            <Text size="xs" color="dimmed" mt={1} lineClamp={1}>
              {item.attributeString}
            </Text>
          )}


          <Text size="sm" fw={600} w="100%" ta={"end"} className="text-primary mt-2">
            {formatPrice(item.price)}
          </Text>
        </Box>
      </Group>
    );
  } catch (error) {
    console.error("Error rendering ProductItem:", error);
    return (
      <Text color="red" size="sm">Lỗi hiển thị sản phẩm</Text>
    );
  }
};

export default ListProduct;