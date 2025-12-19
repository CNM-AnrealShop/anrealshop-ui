import { Badge, Group, Text } from '@mantine/core';
import type { MyShopProductSkuDto } from '../../../../types/ProductType';
import { formatPrice } from '../../../../untils/Untils';

interface ProductPriceAndAttributesProps {
  price: number;
  selectedSku: MyShopProductSkuDto | null;
}

const ProductPriceAndAttributes = ({ price, selectedSku }: ProductPriceAndAttributesProps) => {
  const currentPrice = selectedSku?.price || price || 0;
  
  return (
    <>
      <Group className="mb-4">
        <Text size="lg" fw={600} className="!text-red-600">
          {formatPrice(currentPrice)}
        </Text>
        {selectedSku && selectedSku.price !== price && (
          <Text td="line-through" c="dimmed" size="lg">
            {formatPrice(price)}
          </Text>
        )}
        {selectedSku && selectedSku.price !== price && (
          <Badge color="red">
            -{Math.round((1 - selectedSku.price / price) * 100)}%
          </Badge>
        )}
      </Group> 
    </>
  );
};

export default ProductPriceAndAttributes;