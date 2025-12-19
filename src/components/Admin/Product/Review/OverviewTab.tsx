import { Badge, Box, Divider, Group, Image, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { FiBarChart2, FiCalendar, FiHash, FiList, FiShoppingBag, FiTag } from 'react-icons/fi';
import type { ProductDetailDto } from '../../../../types/ProductType';

interface OverviewTabProps {
  product: ProductDetailDto;
  formatPrice: (price: number) => string;
  formatDate: (date: string) => string;
  getStatusColor: (statusId: string) => string;
  getStatusLabel: (statusId: string) => string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  product,
  formatPrice,
  formatDate,
  getStatusColor,
  getStatusLabel
}) => {
  // Check if product has attributes
  const hasAttributes = product.attributes && product.attributes.length > 0;
  
  return (
    <Box p="xs">
      <div className='flex flex-col sm:flex-row gap-4'>
        {/* Left column: Image */}
        <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginRight: '16px' }}>
          <Image
            src={product.thumbnailUrl || 'https://placehold.co/240x240?text=No+Image'}
            className='w-full h-full object-cover rounded-md'
            radius="md"
          />
        </div>
        
        {/* Right column: Product details */}
        <div className='w-full'>
          <Stack gap="xs">
            {/* Header with name and status */}
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Box style={{ flex: 1 }}>
                <Title order={4} lineClamp={1}>{product.name}</Title>
                <Group gap="xs" align="center">
                  <FiHash size={12} />
                  <Text size="xs" c="dimmed">{product.id}</Text>
                </Group>
              </Box>
              <Badge color={getStatusColor(product.status)} size="md">
                {getStatusLabel(product.status)}
              </Badge>
            </Group>

            {/* Categories and visibility */}
            <Group gap="xs">
              <Badge color="blue" variant="light" size="sm">
                <Group gap={5}>
                  <FiTag size={12} />
                  {product.categoryPath?.split(" > ").pop() || 'Chưa phân loại'}
                </Group>
              </Badge>
              {product.visible ? (
                <Badge color="green" variant="light" size="sm">Hiển thị</Badge>
              ) : (
                <Badge color="gray" variant="light" size="sm">Ẩn</Badge>
              )}
              <Group gap={5} align="center">
                <FiCalendar size={12} />
                <Text size="xs">Ngày tạo: {formatDate(product.createdAt)}</Text>
              </Group>
            </Group>

            <Divider />

            {/* Price and inventory */}
            <Group justify="apart" align="center">
              <Text fw={700} size="lg" c="red">{formatPrice(product.discountPrice)}</Text>
              <Group gap="md">
                <Text size="xs" c="dimmed">Tồn kho: {product.quantity}</Text>
                {product.sold && <Text size="xs" c="dimmed">Đã bán: {product.sold}</Text>}
              </Group>
            </Group>

            {/* Shop and rating in blue boxes */}
            <Group grow mt="xs">
              <Paper p="sm" bg="blue.0" radius="md">
                <Group align="center">
                  <FiShoppingBag size={16} />
                  <Stack gap={0}>
                    <Text size="xs" fw={500}>Cửa hàng</Text>
                    <Text size="xs">{product.baseShopDto?.name}</Text>
                  </Stack>
                </Group>
              </Paper>

              <Paper p="sm" bg="blue.0" radius="md">
                <Group align="center">
                  <FiBarChart2 size={16} />
                  <Stack gap={0}>
                    <Text size="xs" fw={500}>Đánh giá</Text>
                    <Text size="xs">
                      {product.averageRating ? `${product.averageRating}/5 (${product.totalReviews})` : 'Chưa có'}
                    </Text>
                  </Stack>
                </Group>
              </Paper>
            </Group>
          </Stack>
        </div>
      </div>

      {/* Product Attributes */}
      {hasAttributes && (
        <Box mt="md">
          <Group mb="xs" align="center">
            <FiList size={16} />
            <Text fw={500} size="sm">Thuộc tính sản phẩm:</Text>
          </Group>
          <Paper withBorder p="xs" radius="md" bg="gray.0">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xs">
              {product.attributes?.map((attribute, index) => (
                <Box key={index}>
                  <Text size="xs" fw={500}>{attribute.attributeKeyDisplay}:</Text>
                  <Group gap={5} mt={2}>
                    {Array.from(attribute.values).map((value, idx) => (
                      <Badge key={idx} size="sm" variant="light" color="blue">
                        {value}
                      </Badge>
                    ))}
                  </Group>
                </Box>
              ))}
            </SimpleGrid>
          </Paper>
        </Box>
      )}

      {/* Product description */}
      <Box mt="md">
        <Group mb="xs" align="center">
          <FiTag size={16} />
          <Text fw={500} size="sm">Mô tả sản phẩm:</Text>
        </Group>
        <Box
          mt={5}
          style={{
            fontSize: '13px',
            overflow: 'auto',
            padding: '8px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px'
          }}
          dangerouslySetInnerHTML={{
            __html: product.description || product.sortDescription || '<p>Không có mô tả</p>'
          }}
        />
      </Box>
    </Box>
  );
};

export default OverviewTab;