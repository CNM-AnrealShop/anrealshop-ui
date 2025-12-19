import {
  Container,
  Grid,
  Group,
  Paper,
  Skeleton
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { APP_ROUTES } from '../../../constant';
import { useGetProduct } from '../../../hooks/useProduct';
import { useURLParams } from '../../../hooks/useURLParams';
import type { ProductAttribute } from '../../../types/AttributeType';
import type { MyShopProductSkuDto, ProductDetailDto } from '../../../types/ProductType';
import PageNotFound from '../../common/PageNotFound';
import Breadcrumbs from './Breadcrumbs';
import ImageProduct from './ImageProduct';
import InforProduct from './productInfo/InforProduct';



const ProductDetailPage = () => {

  const { slug } = useParams<{ slug: string }>();
  const { getParam, updateParams } = useURLParams();
  const [product, setProduct] = useState<ProductDetailDto | null>(null);
  const [media, setMedia] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [selectedSku, setSelectedSku] = useState<MyShopProductSkuDto | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const { isLoading, getProductById } = useGetProduct();

  useEffect(() => {
    if (slug) {
      getProductById(slug)
        .then(productData => {
          setProduct(productData);
          const medias = new Set<string>();
          productData.medias?.forEach(media => {
            if (media.url) {
              medias.add(media.url);
            }
          });
          productData.productSkus?.forEach(sku => {
            if (sku.imageUrl) {
              medias.add(sku.imageUrl);
            }
          });
          setMedia(Array.from(medias));

          const attributesFromURL: Record<string, string> = {};
          productData.productSkus?.[0]?.attributeForSku?.forEach(attr => {
            const paramValue = getParam(attr.attributeKeyName);
            if (paramValue) {
              attributesFromURL[attr.attributeKeyName] = paramValue;
            }
          });

          if (Object.keys(attributesFromURL).length > 0) {
            setSelectedAttributes(attributesFromURL);
          }
        })
    }
  }, [slug, getProductById]);

  const getOrderImageActive = useCallback((url: string) => {
    if (!url) return 0;
    const index = media.indexOf(url);
    return index !== -1 ? index : 0;
  }, [media]);


  const groupedAttributes = useMemo(() => {
    if (!product?.productSkus?.length) return [];

    const attributeMap = new Map<string, ProductAttribute>();

    product.productSkus.forEach(sku => {
      if (!sku.attributeForSku) return;

      sku.attributeForSku.forEach(attr => {
        if (!attributeMap.has(attr.attributeKeyName)) {
          attributeMap.set(attr.attributeKeyName, {
            attributeKeyName: attr.attributeKeyName,
            attributeKeyDisplay: attr.attributeKeyDisplay,
            values: new Set<string>(),
          });
        }

        attributeMap.get(attr.attributeKeyName)?.values.add(attr.values);
      });
    });

    return Array.from(attributeMap.values());
  }, [product]);

  const handleAttributeSelect = (attributeId: string, value: string) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [attributeId]: value
    };
    setSelectedAttributes(newSelectedAttributes);

    updateParams(newSelectedAttributes);

    if (product?.productSkus) {
      const matchingSku = product.productSkus.find(sku => {
        if (!sku.attributeForSku) return false;
        if (sku.attributeForSku.length !== Object.keys(newSelectedAttributes).length) return false;
        return sku.attributeForSku.every(attr => {
          const attrKey = attr.attributeKeyName;
          return !newSelectedAttributes[attrKey] || newSelectedAttributes[attrKey] === attr.values;
        });
      });
      setSelectedSku(matchingSku || null);
      setSelectedImage(getOrderImageActive(matchingSku?.imageUrl || product.thumbnailUrl));
    }
  };

  useEffect(() => {
    if (product?.productSkus && Object.keys(selectedAttributes).length > 0) {
      const matchingSku = product.productSkus.find(sku => {
        if (!sku.attributeForSku) return false;
        if (sku.attributeForSku.length !== Object.keys(selectedAttributes).length) return false;
        return sku.attributeForSku.every(attr => {
          const attrKey = attr.attributeKeyName;
          return !selectedAttributes[attrKey] || selectedAttributes[attrKey] === attr.values;
        });
      });

      if (matchingSku) {
        setSelectedSku(matchingSku);
        setSelectedImage(getOrderImageActive(matchingSku?.imageUrl || product.thumbnailUrl));
      }
    }
  }, [product, selectedAttributes, getOrderImageActive]);

  if (isLoading) {
    return (
      <Container size="xl" className="py-8">
        <Skeleton height={30} width="60%" className="mb-8" />

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4.5 }}>
            <Skeleton height={400} className="mb-4" />
            <Group>
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} height={80} width={80} />
              ))}
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7.5 }}>
            <Skeleton height={50} className="mb-4" />
            <Skeleton height={30} width="40%" className="mb-3" />
            <Skeleton height={40} width="30%" className="mb-4" />
            <Skeleton height={100} className="mb-4" />
            <Skeleton height={120} className="mb-4" />
            <Group>
              <Skeleton height={50} width="48%" />
              <Skeleton height={50} width="48%" />
            </Group>
          </Grid.Col>
        </Grid>
        {/* <OverlayLoading visible /> */}
      </Container>
    );
  }

  if (!product) {
    return (
      <PageNotFound
        title="Sản phẩm không tồn tại"
        description="Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
        redirectLink={APP_ROUTES.HOME}
        redirectLabel="Xem sản phẩm khác"
      />
    );
  }

  return (
    <Container size="xl" className="py-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Breadcrumbs
          productName={product.name}
          categoryId={product.categoryId}
          categoryName={product.categoryPath?.split(" > ").pop() || "Danh mục"}
        />
      </motion.div>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4.6 }}>
          <Paper radius="md" className="!mb-8 bg-white shadow-sm sticky top-4">
            <div className="p-4">
              <ImageProduct
                media={media}
                thumbnailUrl={product.thumbnailUrl}
                productName={product.name}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7.4 }}>
          <Paper radius="md" className="!mb-8 !bg-white !shadow-sm">
            <div className="p-4">
              <InforProduct
                product={product}
                selectedAttributes={selectedAttributes}
                selectedSku={selectedSku}
                onAttributeSelect={handleAttributeSelect}
                groupedAttributes={groupedAttributes}
              />
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;