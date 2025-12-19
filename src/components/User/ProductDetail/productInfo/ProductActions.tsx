import { ActionIcon, Box, Button, Group, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { useURLParams } from '../../../../hooks/useURLParams';

interface ProductActionsProps {
  availableQuantity: number;
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
}

const ProductActions = ({ availableQuantity, onAddToCart, onBuyNow }: ProductActionsProps) => {
  const { getParam, updateParams } = useURLParams();
  const [itemQuantity, setItemQuantity] = useState(() => {
    const quantityFromURL = parseInt(getParam('quantity', '1'));
    return quantityFromURL > 0 && quantityFromURL <= availableQuantity ? quantityFromURL : 1;
  });

  useEffect(() => {
    const quantityFromURL = parseInt(getParam('quantity', '1'));
    if (quantityFromURL > 0 && quantityFromURL <= availableQuantity && quantityFromURL !== itemQuantity) {
      setItemQuantity(quantityFromURL);
    }
  }, [getParam, availableQuantity]);

  const incrementQuantity = () => {
    if (itemQuantity < availableQuantity) {
      const newQuantity = itemQuantity + 1;
      setItemQuantity(newQuantity);
      updateParams({ quantity: newQuantity });
    }
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      updateParams({ quantity: newQuantity });
    }
  };

  return (
    <>
      <Box className="mb-6">
        <Group justify='start' align='center' className="mb-2" wrap='nowrap'>
          <Text fw={600} className="mb-3">Số lượng:</Text>
          <Group gap={0} className="!border !border-gray-300 !rounded">
            <motion.div whileTap={{ scale: 0.9 }}>
              <ActionIcon size="sm"
                onClick={decrementQuantity}
                disabled={itemQuantity <= 1}
              >
                <FiMinus size={14} />
              </ActionIcon>
            </motion.div>

            <Box className="px-4 py-1 text-sm font-semibold">{itemQuantity}</Box>

            <motion.div whileTap={{ scale: 0.9 }}>
              <ActionIcon size="sm"
                onClick={incrementQuantity}
                disabled={itemQuantity >= availableQuantity}
              >
                <FiPlus size={14} />
              </ActionIcon>
            </motion.div>
          </Group>
        </Group>
      </Box>

      <Group className="mb-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            size="md"
            leftSection={<FiShoppingCart size={20} />}
            onClick={() => onAddToCart(itemQuantity)}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Thêm vào giỏ
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="md"
            onClick={() => onBuyNow(itemQuantity)}
            className="bg-primary hover:bg-primary/90"
          >
            Mua ngay
          </Button>
        </motion.div>
      </Group>
    </>
  );
};

export default ProductActions;