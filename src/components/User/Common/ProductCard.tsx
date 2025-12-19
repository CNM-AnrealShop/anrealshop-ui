import { ActionIcon, Badge, Card, Group, Image, Rating, Text } from '@mantine/core';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { UserProductDto } from '../../../types/ProductType';
import { formatPrice } from '../../../untils/Untils';

interface ProductCardProps {
  product: UserProductDto;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const discountPercentage = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;

  return (
    <Card
      shadow="sm"
      padding={0}
      radius="lg"
      withBorder
      className="h-full flex flex-col bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group"
      style={{
        width: compact ? '180px' : '100%',
        border: '1px solid #f1f3f4'
      }}
    >
      <div className="flex flex-col h-full">
        <div className="relative overflow-hidden">
          <Link to={`/products/${product.urlSlug}`} className="block no-underline">
            <div className="overflow-hidden bg-gray-50 " style={{ aspectRatio: '4/5' }}>
              <Image
                src={product.thumbnailUrl}
                alt={product.name}
                className="transition-transform duration-500 group-hover:scale-110"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </Link>

          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {/* {product.isNew && (
              <Badge
                color="green"
                variant="filled"
                className="font-medium text-xs shadow-sm"
                radius="md"
              >
                Mới
              </Badge>
            )} */}
            {product.discountPrice && discountPercentage !== 0 && (
              <Badge
                color="red"
                variant="filled"
                className="font-medium text-xs shadow-sm"
                radius="md"
              >
                {discountPercentage}%
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ActionIcon
              variant="filled"
              color="white"
              size="md"
              radius="xl"
              className="shadow-lg hover:scale-110 transition-transform duration-200 !bg-white !text-gray-700 hover:!text-red-500"
            >
              <FiHeart size={16} />
            </ActionIcon>
          </div>

        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Shop name */}
          <Text size="xs" c="dimmed" className="mb-1 font-medium">
            {product.shopName}
          </Text>

          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="no-underline">
            <Text
              fw={500}
              lineClamp={2}
              className="text-slate-900 text-sm !mb-2 hover:text-primary transition-colors duration-200"
              style={{ minHeight: '2.5rem' }}
            >
              {product.name}
            </Text>
          </Link>

          {/* Rating */}
          <div className="mb-3">
            <Group gap={6} wrap="nowrap">
              <Rating
                value={product.averageRating}
                fractions={2}
                readOnly
                size="xs"
                color="orange"
              />
              <Text size="xs" c="dimmed" className="font-medium">
                {product.averageRating} ({product.totalReviews})
              </Text>
            </Group>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            {product.discountPrice ? (
              <Group gap={8} align="center" wrap="nowrap">
                <Text fw={700} className="text-red-500 text-lg">
                  {formatPrice(product.discountPrice)}
                </Text>
                <Text
                  td="line-through"
                  c="dimmed"
                  size="sm"
                  className="font-medium"
                >
                  {formatPrice(product.price)}
                </Text>
              </Group>
            ) : (
              <Text fw={700} className="text-slate-900 text-lg">
                {formatPrice(product.price)}
              </Text>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;