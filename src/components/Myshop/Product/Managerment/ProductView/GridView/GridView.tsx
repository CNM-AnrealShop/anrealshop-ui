import {
  Grid
} from '@mantine/core';
import type { MyShopProductDto } from '../../../../../../types/ProductType';
import ProductCard from './ProductCard';
import GridViewSkeleton from './Skeleton';


interface GridViewProps {
  products: MyShopProductDto[];
  isLoading: boolean;
  selectedProducts: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectProduct: (id: string, checked: boolean) => void;
  onToggleStatus: (id: string, visible: boolean) => void;
  onRefresh: () => void;
}

const GridView = ({
  products,
  isLoading,
  selectedProducts,
  onSelectProduct,
  onToggleStatus,
  onRefresh
}: GridViewProps) => {
  
  if (isLoading) {
    return <GridViewSkeleton itemCount={12} />;
  }

  return (
    <div className="bg-white rounded-md  overflow-hidden p-4">
      
      <Grid gutter="md">
        {products.map((product) => (
          <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={product.id}>
            <ProductCard
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={onSelectProduct}
              onToggleStatus={onToggleStatus}
              onRefresh={onRefresh}
            />
          </Grid.Col>
        ))}
      </Grid>
      
    </div> 
  );
};

export default GridView;