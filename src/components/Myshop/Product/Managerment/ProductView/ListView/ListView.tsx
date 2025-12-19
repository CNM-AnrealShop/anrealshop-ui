import {
  Checkbox,
  Table
} from '@mantine/core';
import type { MyShopProductDto } from '../../../../../../types/ProductType';
import ProductTableRow from './ProductTableRow';
import ListViewSkeleton from './Skeleton';



interface ListViewProps {
  products: MyShopProductDto[];
  isLoading: boolean;
  selectedProducts: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectProduct: (id: string, checked: boolean) => void;
  onToggleStatus: (id: string, visible: boolean) => void;
  onRefresh?: () => void;
}

const ListView = ({
  products,
  isLoading,
  selectedProducts,
  onSelectAll,
  onSelectProduct,
  onToggleStatus,
  onRefresh,
}: ListViewProps) => {

  if (isLoading) {
    return <ListViewSkeleton rowCount={10} />;
  }

  return (
    <div className="p-4 bg-white rounded-md overflow-hidden">
      <Table highlightOnHover horizontalSpacing="md" verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={40}>
              <Checkbox
                checked={selectedProducts.length === products.length && products.length > 0}
                indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
                onChange={(e) => onSelectAll(e.currentTarget.checked)}
              />
            </Table.Th>
            <Table.Th>Sản phẩm</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Giá</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Tồn kho</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Đã bán</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Trạng thái</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Hoạt động</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={onSelectProduct}
              onToggleStatus={onToggleStatus}
              onRefresh={onRefresh}
            />
          ))}
        </Table.Tbody>
      </Table>


    </div>
  );
};

export default ListView;