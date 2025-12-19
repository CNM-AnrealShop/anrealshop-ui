import {
  Badge,
  Checkbox,
  Group,
  Image,
  Switch,
  Table,
  Text
} from '@mantine/core';
import ProductActionMenu from '../ProductActionMenu';
import { useProductStatusIcon, useProductStatusColor, useProductStatusLabel } from '../../../../../../hooks/useProductStatus';
import type { MyShopProductDto } from '../../../../../../types/ProductType';


interface ProductTableRowProps {
  product: MyShopProductDto;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onToggleStatus: (id: string, visible: boolean) => void;
  onRefresh?: () => void;
}


const ProductTableRow = ({
  product,
  isSelected,
  onSelect,
  onToggleStatus,
  onRefresh,
}: ProductTableRowProps) => {
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
    <Table.Tr
      key={product.id}
      style={{
        opacity: 1,
        // opacity: product.isUpdating ? 0.7 : 1,
        transition: 'opacity 0.2s ease'
      }}
    >
      <Table.Td>
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(product.id, e.currentTarget.checked)}
        // disabled={product.isUpdating}
        />
      </Table.Td>
      <Table.Td>
        <Group gap="xs" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
            <Image
              src={product.thumbnailUrl}
              alt={product.name}
              width={40}
              height={40}
              radius="sm"
              fallbackSrc="https://placehold.co/40x40?text=No+Image"
            />
          </div>
          <div style={{
            flex: 1,
            minWidth: 0,
            maxWidth: '500px'
          }}>
            <Text
              size="sm"
              fw={500}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }}
              title={product.name} 
            >
              {product.name}
            </Text>
            <Text size="xs" c="dimmed">
              ID: {product.id}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{formatPrice(product.discountPrice)}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <Text
          size="sm"
          c={product.quantity === 0 ? 'red' : undefined}
          fw={product.quantity === 0 ? 600 : undefined}
        >
          {product.quantity}
        </Text>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{product.sold}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <Badge
          leftSection={<StatusIcon size={16} style={{ color: statusIconColor }} />}
          color={statusColor}
          variant="light"
        >
          {statusLabel}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify='center' align='center'>
          <Switch
            size="sm"
            checked={product.status === 'ACTIVE'}
            onChange={() => onToggleStatus(product.id, product.status !== 'ACTIVE')}
            disabled={product.status === 'VIOLATION' || product.status === 'PENDING'}
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
      </Table.Td>
    </Table.Tr>
  );
};

export default ProductTableRow;