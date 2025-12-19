import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Rating,
  SimpleGrid,
  Text,
  Title
} from '@mantine/core';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiPackage,
  FiRefreshCw,
  FiShare2,
  FiShield,
  FiTruck
} from 'react-icons/fi';
import { APP_ROUTES, LOCAL_STORAGE_KEYS } from '../../../../constant';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { CartService } from '../../../../service/CartService';
import { addToCart } from '../../../../store/authSlice';
import type { ProductAttribute } from '../../../../types/AttributeType';
import type { CartAddItemDto } from '../../../../types/CartType';
import type { MyShopProductSkuDto, ProductDetailDto } from '../../../../types/ProductType';
import { getErrorMessage } from '../../../../untils/ErrorUntils';
import { formatStringView } from '../../../../untils/Untils';
import showErrorNotification from '../../../Toast/NotificationError';
import showSuccessNotification from '../../../Toast/NotificationSuccess';
import { AttributeInfor } from './AttributeInfor';
import ProductActions from './ProductActions';
import ProductDescription from './ProductDescription';
import ProductPriceAndAttributes from './ProductPriceAndAttributes';
import ProductShippingInfo from './ProductShippingInfo';
import { ShopInfo } from './ShopInfo';
import { useNavigate } from 'react-router-dom';



interface InforProductProps {
  product: ProductDetailDto;
  selectedAttributes: Record<string, string>;
  selectedSku: MyShopProductSkuDto | null;
  onAttributeSelect: (keyId: string, value: string) => void;
  groupedAttributes: ProductAttribute[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const InforProduct = ({
  product,
  selectedAttributes,
  selectedSku,
  onAttributeSelect,
  groupedAttributes,
}: InforProductProps) => {
  const availableQuantity = selectedSku?.quantity || product.quantity;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleAddToCart = (quantity: number) => {
    if (!isAuthenticated) {
      showErrorNotification("Thông báo", "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    if (!selectedSku || Object.keys(selectedAttributes).length !== selectedSku.attributeForSku?.length) {
      showErrorNotification("Thông báo", "Vui lòng chọn đầy đủ thuộc tính sản phẩm trước khi thêm vào giỏ hàng.");
      return;
    }
    if (quantity < 1 || quantity > selectedSku.quantity) {
      showErrorNotification("Thông báo", "Số lượng không hợp lệ hoặc vượt quá số lượng có sẵn.");
      return;
    }

    const cartItemDto: CartAddItemDto = {
      productSkuId: selectedSku.id,
      quantity: quantity,
    }

    CartService.addItemToCart(cartItemDto)
      .then((data) => {
        showSuccessNotification("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng thành công.");
        if (data.isNew)
          dispatch(addToCart());
      })
      .catch((error) => {
        showErrorNotification("Lỗi", getErrorMessage(error));
      });
  }


  const handleBuyNow = (quantity: number) => {
    if (!isAuthenticated) {
      showErrorNotification("Thông báo", "Vui lòng đăng nhập để mua sản phẩm.");
      return;
    }
    if (!selectedSku || Object.keys(selectedAttributes).length !== selectedSku.attributeForSku?.length) {
      showErrorNotification("Thông báo", "Vui lòng chọn đầy đủ thuộc tính sản phẩm trước khi thêm vào giỏ hàng.");
      return;
    }
    if (quantity < 1 || quantity > selectedSku.quantity) {
      showErrorNotification("Thông báo", "Số lượng không hợp lệ hoặc vượt quá số lượng có sẵn.");
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDER_ITEM_IDS, JSON.stringify({ [selectedSku.id]: quantity }));

    navigate(APP_ROUTES.CHECKOUT);
  }


  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
    >
      <motion.div variants={fadeInUp}>
        <Group justify="space-between" align="flex-start" wrap='nowrap' className="mb-4">
          <Title order={2} className="mb-3 text-slate-900">{formatStringView(product.name)}</Title>

          <Group justify="space-between" wrap="nowrap">
            {product.quantity < 10 && (
              <Badge color="orange">Sắp hết hàng</Badge>
            )}
            <Group justify="space-between" wrap="nowrap">
              <ActionIcon variant="subtle" color="gray" radius="xl">
                <FiShare2 size={20} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="pink" radius="xl">
                <FiHeart size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Group className="mb-4">
          {product.totalReviews && product.totalReviews > 0 && (
            <Rating value={product.averageRating} fractions={2} readOnly size="sm" />
          )}
          <Text size="sm" className="text-gray-500">
            {product.totalReviews === 0 ? 'Chưa có' : product.totalReviews} đánh giá
          </Text>
          <Text size="sm" className="text-gray-500">·</Text>
          <Text size="sm" className="text-gray-500">Đã bán: {product.sold}</Text>
          <Text size="sm" className="text-gray-500">·</Text>
          <Text size="sm" className="text-gray-500">Còn lại: {availableQuantity}</Text>
        </Group>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <ProductPriceAndAttributes price={product.price} selectedSku={selectedSku} />
      </motion.div>

      <Divider className="mb-4" />

      {groupedAttributes.length > 0 && (
        <motion.div variants={fadeInUp}>
          <Box className="mb-6">
            {groupedAttributes.map((group, idx) => (
              <div key={idx} className="mb-2">
                <Text fw={500} className="mb-2 ">{group.attributeKeyDisplay}:</Text>
                <Group>
                  {Array.from(group.values).map((attr, valIdx) => (
                    <motion.div
                      key={valIdx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: valIdx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={selectedAttributes[group.attributeKeyName] === attr ? 'filled' : 'outline'}
                        size="xs"
                        onClick={() => onAttributeSelect(group.attributeKeyName, attr)}
                        className={selectedAttributes[group.attributeKeyName] === attr ? '!bg-primary' : '!border-gray-300'}
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {attr}
                      </Button>
                    </motion.div>
                  ))}
                </Group>
              </div>
            ))}
          </Box>
        </motion.div>
      )}

      <motion.div variants={fadeInUp}>
        <ProductActions
          availableQuantity={availableQuantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </motion.div>

      <Divider className="mb-4" />

      <motion.div variants={fadeInUp}>
        <ShopInfo
          id={product.baseShopDto?.id || ''}
          url={product.baseShopDto?.avatarUrl || ''}
          name={product.baseShopDto?.name || 'Shop không rõ'}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <SimpleGrid cols={{ base: 2, md: 4 }} className="mb-6">
          {[
            { icon: FiTruck, text: 'Giao hàng nhanh' },
            { icon: FiShield, text: 'Bảo hành chính hãng' },
            { icon: FiPackage, text: 'Đổi trả trong 7 ngày' },
            { icon: FiRefreshCw, text: 'Hoàn tiền 100%' }
          ].map((item, idx) => (
            <Paper key={idx} withBorder p="md" radius="md" className="!flex !items-center !flex-nowrap">
              <item.icon size={20} className="text-primary mr-3" />
              <Text size="sm">{item.text}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <ProductShippingInfo weight={product.weight || 0} />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <AttributeInfor
          attributes={product.attributes || []}
          selectedAttributes={selectedAttributes}
          groupedAttributes={groupedAttributes}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <ProductDescription
          description={product.description || ''}
          sortDescription={product.sortDescription || ''}
        />
      </motion.div>
    </motion.div>
  );
};

export default InforProduct;