import { Group, NumberInput, Text } from '@mantine/core';
import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface ProductQuantityProps {
  quantity: number;
  setQuantity?: (quantity: number) => void;
  maxQuantity: number;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({ quantity, setQuantity, maxQuantity }) => {
  const handleQuantityChange = (value: number | string) => {
    const newValue = Number(value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= maxQuantity && setQuantity) {
      setQuantity(newValue);
    }
  };

  return (
    <Group className="py-4">
      <Text className="w-32 text-gray-600">Số lượng</Text>
      <div className="flex items-center">
        <NumberInput
          size="md"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={maxQuantity}
          hideControls
          styles={{ input: { width: '4rem', textAlign: 'center' } }}
          leftSection={
            <div
              onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded"
            >
              <FiMinus size={16} />
            </div>
          }
          rightSection={
            <div
              onClick={() => handleQuantityChange(Math.min(maxQuantity, quantity + 1))}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded"
            >
              <FiPlus size={16} />
            </div>
          }
        />
        <Text size="sm" ml="sm" color="dimmed">
          {maxQuantity} sản phẩm có sẵn
        </Text>
      </div>
    </Group>
  );
};

export default ProductQuantity;
