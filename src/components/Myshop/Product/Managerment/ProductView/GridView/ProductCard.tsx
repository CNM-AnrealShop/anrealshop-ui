import {
  Badge,
  Box,
  Card,
  Checkbox,
  Group,
  Image,
  Stack,
  Switch,
  Text
} from '@mantine/core';
import { useProductStatusColor, useProductStatusIcon, useProductStatusLabel } from '../../../../../../hooks/useProductStatus';
import type { MyShopProductDto } from '../../../../../../types/ProductType';
import ProductActionMenu from '../ProductActionMenu';

interface ProductCardProps {
  product: MyShopProductDto;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onToggleStatus: (id: string, visible: boolean) => void;
  onRefresh: () => void;
}

const ProductCard = ({
  product,
  isSelected,
  onSelect,
  onToggleStatus,
  onRefresh
}: ProductCardProps) => {
  const { getStatusIcon } = useProductStatusIcon();
  const { getStatusColor, getStatusIconColor } = useProductStatusColor();
  const { getStatusLabel } = useProductStatusLabel();

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const StatusIcon = getStatusIcon(product.status);
  const statusColor = getStatusColor(product.status);
  const statusIconColor = getStatusIconColor(product.status);
  const statusLabel = getStatusLabel(product.status);

  return (
    <Card
      padding="md"
      radius="md"
      withBorder
      style={{
        position: 'relative',
        opacity: 1,
        // opacity: product.isUpdating ? 0.7 : 1,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="hover:shadow-md"
    >
      {/* Overlay loading cho sản phẩm đang cập nhật */}
      {/* {product.isUpdating && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',discountPrice
          zIndex: 2,
          borderRadius: '8px'
        }}>
          <Loader size="sm" />
        </div>
      )} */}

      {/* Checkbox selection */}
      <Box style={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(product.id, e.currentTarget.checked)}
        // disabled={product.isUpdating}
        />
      </Box>

      {/* Status Badge */}
      <Box style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <Badge
          leftSection={<StatusIcon size={16} style={{ color: statusIconColor }} />}
          color={statusColor}
          variant="light"
          size="sm"
        >
          {statusLabel}
        </Badge>
      </Box>

      {/* Product Image */}
      <Card.Section className="" >
        <div style={{
          position: 'relative',
          width: '100%',
          height: 180,
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '-16px',
        }}>
          <Image
            src={product.thumbnailUrl}
            height={160}
            fallbackSrc="https://placehold.co/400x300?text=No+Image"
            alt={product.name}
            style={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              width: '100%',
              height: '100%'
            }}
            className="hover:scale-105"
          />
        </div>
      </Card.Section>

      {/* Product Info */}
      <Stack gap="xs" mt="md" mb="xs" style={{ flexGrow: 1 }}>
        <div >
          <Text fw={500} lineClamp={2} className="hover:text-blue-600">
            {product.name}
          </Text>
        </div>
        <Group justify="space-between" mt="auto">
          <Text fw={700} size="lg" c="red">
            {formatPrice(product.discountPrice)}
          </Text>
          <Group gap="xs">
            <Text size="xs" c="dimmed">Đã bán:</Text>
            <Text size="sm" fw={500}>
              {product.sold}
            </Text>
          </Group>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c={product.quantity === 0 ? 'red' : 'dimmed'} fw={product.quantity === 0 ? 500 : 400}>
            {product.quantity > 0 ? `Còn ${product.quantity}` : 'Hết hàng'}
          </Text>
        </Group>
      </Stack>

      {/* Actions */}
      <Group justify="space-between" mt="sm" pt="xs" style={{ borderTop: '1px solid #f0f0f0' }}>
        <Switch
          size="sm"
          checked={product.status === 'ACTIVE'}
          onChange={() => onToggleStatus(product.id, product.status !== 'ACTIVE')}
          disabled={product.status === 'VIOLATION' || product.status === 'PENDING'}
          label="Hiển thị"
          labelPosition="left"
          classNames={{
            track: product.status === 'VIOLATION' || product.status === 'PENDING'
              ? 'cursor-not-allowed'
              : '!cursor-pointer',
            input: 'cursor-pointer',
            label: 'cursor-pointer'
          }}
        />
        <ProductActionMenu
          productId={product.id}
          // disabled={product.isUpdating}
          productName={product.name}
          onRefresh={onRefresh}
        />
      </Group>
    </Card>
  );
};

export default ProductCard;