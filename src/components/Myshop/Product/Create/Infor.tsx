import { Stack, Skeleton } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import '@mantine/tiptap/styles.css';
import { memo, useEffect, useState } from 'react';
import AttributeService from '../../../../service/AttributeService';
import type { AttributeForShop } from '../../../../types/AttributeType';
import type { ProductCreateRequest } from '../../../../types/ProductType';
import SkuInfor from './AttributeInfo/AttributeInfor';
import BasicInfor from './BasicInfo/BasicInfor';
import Shipping from './Shipping/Shipping';
import SkuDetails from './SkuDetail/SkuDetails';
import MediaUpload from './uploadImage/MediaUpload';

interface InforProps {
  form: UseFormReturnType<ProductCreateRequest>;
  isEditMode?: boolean;
  isLoadingData?: boolean;
}

const ProductFormSkeleton = () => (
  <Stack>
    <Stack gap="xs">
      <Skeleton height={24} width="30%" mb="xs" />
      <Skeleton height={200} radius="md" />
    </Stack>

    <Stack gap="xs">
      <Skeleton height={24} width="40%" mb="xs" />
      <Skeleton height={50} mb="xs" />
      <Skeleton height={100} mb="xs" />
      <Skeleton height={50} mb="xs" />
      <Skeleton height={50} mb="xs" />
      <Skeleton height={50} mb="xs" />
      <Skeleton height={50} mb="xs" />
      <Skeleton height={200} mb="xs" />
    </Stack>

    <Stack gap="xs">
      <Skeleton height={24} width="40%" mb="xs" />
      <Skeleton height={100} mb="xs" />
    </Stack>

    <Stack gap="xs">
      <Skeleton height={24} width="40%" mb="xs" />
      <Skeleton height={150} mb="xs" />
    </Stack>

    <Stack gap="xs">
      <Skeleton height={24} width="40%" mb="xs" />
      <Skeleton height={120} mb="xs" />
    </Stack>
  </Stack>
);

const Infor = memo(({ form, isEditMode = false, isLoadingData = false }: InforProps) => {
  const [attributeData, setAttributeData] = useState<AttributeForShop>();
  const [isShowQuantity, setIsShowQuantity] = useState(true);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const isCategorySelected = form.values.categoryId && form.values.categoryId.trim() !== '';


  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const data = await AttributeService.getAttributeForShop();
        setAttributeData(data);
      } catch (err) {
        console.error("Lỗi lấy attribute:", err);
      }
    };

    if (isCategorySelected) {
      fetchAttributes();
    }
  }, [isCategorySelected]);


  useEffect(() => {
    if (!isLoadingData && isEditMode) { 
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isLoadingData, isEditMode]);


  if (isLoading) {
    return <ProductFormSkeleton />;
  }

  return (
    <Stack>
      <MediaUpload
        media={form.values.media}
        setMedia={(newMedia) => form.setFieldValue('media', newMedia)}
        error={form.errors.media as string | undefined}
      />

      <BasicInfor
        isShowQuantity={isShowQuantity}
        isEditMode={isEditMode}
        nameProps={{ ...form.getInputProps('name') }}
        sortDescriptionProps={{ ...form.getInputProps('sortDescription') }}
        priceProps={{ ...form.getInputProps('price') }}
        discountPriceProps={{ ...form.getInputProps('discountPrice') }}
        categoryIdProps={{ ...form.getInputProps('categoryId') }}
        categoryPathProps={{ ...form.getInputProps('categoryPath') }}
        descriptionProps={{ ...form.getInputProps('description') }}
        quantityProps={{ ...form.getInputProps('quantity') }}
      />

      {isCategorySelected && (
        <>
          <SkuInfor
            attributeDatas={attributeData?.attribute || []}
            attributes={form.values.attributes}
            onAttributesChange={(attributes) => form.setFieldValue('attributes', attributes)}
          />

          <SkuDetails form={form} attributeForSkuData={attributeData?.attributeForSku || []} setIsShowQuantity={setIsShowQuantity} />

          <Shipping
            weightProps={{ ...form.getInputProps("weight") }}
            heightProps={{ ...form.getInputProps("height") }}
            widthProps={{ ...form.getInputProps("width") }}
            lengthProps={{ ...form.getInputProps("length") }}
          />
        </>
      )}
    </Stack>
  );
});

export default Infor;