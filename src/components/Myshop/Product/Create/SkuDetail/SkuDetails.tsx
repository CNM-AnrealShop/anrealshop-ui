import {
    ActionIcon,
    Divider,
    Group,
    Paper,
    Stack,
    Title
} from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { uploadToCloudinary } from '../../../../../service/Cloundinary';
import type { ProductAttribute } from '../../../../../types/AttributeType';
import type { ProductCreateRequest } from '../../../../../types/ProductType';
import showErrorNotification from '../../../../Toast/NotificationError';
import AttributeSelecter from './AttributeSelecter';
import SkuBulkAction from './SkuBlukAction';
import SkuTable from './SkuTable';
import { formatSkuPart } from '../../../../../untils/Untils';


interface SkuDetailsProps {
    form: UseFormReturnType<ProductCreateRequest>;
    attributeForSkuData: ProductAttribute[];
    setIsShowQuantity?: (value: boolean) => void;
}

const SkuDetails = ({ form, attributeForSkuData, setIsShowQuantity }: SkuDetailsProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
    const [selectedClassificationType, setSelectedClassificationType] = useState<string | null>(null);

    const [attributesReady, setAttributesReady] = useState(false);

    useEffect(() => {
        if (form.values.productSkus && form.values.productSkus.length > 0 && attributes.length === 0) {
            const uniqueAttributes: ProductAttribute[] = [];
            form.values.productSkus.forEach(sku => {
                sku.attributes.forEach(attr => {
                    const existingAttr = uniqueAttributes.find(ua => ua.attributeKeyName === attr.attributeKeyName);
                    if (!existingAttr) {
                        uniqueAttributes.push({
                            attributeKeyName: attr.attributeKeyName,
                            attributeKeyDisplay: attr.attributeKeyDisplay,
                            values: new Set(attr.values),
                        });
                    } else {
                        if (!existingAttr.values.has(Array.from(attr.values)[0])) {
                            existingAttr.values.add(Array.from(attr.values)[0]);
                        }
                    }
                });
            });
            setAttributes(uniqueAttributes);
            setAttributesReady(true);
        }
        if (form.values.productSkus.length === 0 && attributes.length > 0) {
            setAttributesReady(true);
        }
    }, [form.values.productSkus, attributes.length]);

    const formValues = useMemo(() => ({
        name: form.values.name,
        categoryPath: form.values.categoryPath,
        price: form.values.price,
        quantity: form.values.quantity
    }), [form.values.name, form.values.categoryPath, form.values.price, form.values.quantity]);

    const generateSkuCombinations = useCallback(() => {
        const activeAttributes = attributes.filter(attr => attr.values.size > 0);
        if (activeAttributes.length === 0) return [];

        const keyNameToDisplayMap = new Map(
            activeAttributes.map(attr => [attr.attributeKeyName, attr.attributeKeyDisplay])
        );

        
        const combinations = (index = 0, current: Record<string, string> = {}): Record<string, string>[] => {
            if (index >= activeAttributes.length) return [current];
            const attr = activeAttributes[index];
            return Array.from(attr.values).flatMap(value =>
                combinations(index + 1, { ...current, [attr.attributeKeyName]: value })
            );
        };

        const skuBase = "SKU";
        const currentSkus = form.values.productSkus || [];
        return combinations().map(combo => {
            const skuSuffix = Object.values(combo)
                .map(value => formatSkuPart(value, value.split(' ')?.[0]?.length))
                .join('_');

                
            const skuCode = `${skuBase}_${skuSuffix}`;
            const existingSku = currentSkus.find(s => s.sku === skuCode);
            const attributesArray: ProductAttribute[] = Object.entries(combo).map(([key, value]) => ({
                attributeKeyDisplay: keyNameToDisplayMap.get(key) || key,
                attributeKeyName: key,
                values: new Set([value])
            }));
            return {
                sku: skuCode,
                price: existingSku?.price ?? formValues.price ?? 0,
                quantity: existingSku?.quantity ?? formValues.quantity ?? 0,
                imageUrl: existingSku?.imageUrl ?? '',
                attributes: attributesArray
            };
        });
    }, [attributes, formValues, form.values.productSkus]);

    useEffect(() => {
        if (!attributesReady) return;
        const skus = generateSkuCombinations();
        const currentSkus = form.values.productSkus || [];
        const skusChanged = skus.length !== currentSkus.length ||
            skus.some((sku, index) => sku.sku !== currentSkus[index]?.sku);
        if (skusChanged) {
            form.setFieldValue('productSkus', skus);
        }
    }, [generateSkuCombinations, attributes]);

    const updateSku = useCallback((skuId: string, field: string, value: any) => {
        const updatedSkus = form.values.productSkus.map(sku =>
            sku.sku === skuId ? { ...sku, [field]: value } : sku
        );
        form.setFieldValue('productSkus', updatedSkus);
    }, [form]);

    const handleBulkApply = useCallback((price: number | null, quantity: number | null, imageUrl?: string | null) => {
        const updatedSkus = form.values.productSkus.map(sku => ({
            ...sku,
            ...(price && { price }),
            ...(quantity && { quantity }),
            ...(imageUrl && { imageUrl })
        }));
        form.setFieldValue('productSkus', updatedSkus);
    }, [form]);

    const handleGroupApply = useCallback((attributeName: string, attributeValue: string, price: number | null, quantity: number | null, imageUrl?: string | null) => {
        const updatedSkus = form.values.productSkus.map(sku => {
            const hasMatchingAttribute = sku.attributes.some(attr =>
                attr.attributeKeyName === attributes.find(a => a.attributeKeyDisplay === attributeName)?.attributeKeyName &&
                attr.values.has(attributeValue)
            );

            if (hasMatchingAttribute) {
                return {
                    ...sku,
                    ...(price && { price }),
                    ...(quantity && { quantity }),
                    ...(imageUrl && { imageUrl })
                };
            }
            return sku;
        });

        form.setFieldValue('productSkus', updatedSkus);
    }, [form]);

    const handleImageUpload = useCallback(async (skuId: string, file: File | null) => { 
        if (!file) return;

        try {
            const result = await uploadToCloudinary(file, 'image');
            updateSku(skuId, 'imageUrl', result.secure_url);
        } catch (error) {
            showErrorNotification("Thông báo", "Không thể tải lên hình ảnh");
        }
    }, [updateSku]);

    useEffect(() => {
        const willShowSkuBulkAction = form.values.productSkus?.length > 0;
        if (setIsShowQuantity) {
            setIsShowQuantity(!willShowSkuBulkAction);
        }
    }, [form.values.productSkus, setIsShowQuantity]);

    return (
        <Paper shadow="xs" p="md" mb="md" className="bg-white">
            <Group justify="space-between" mb={collapsed ? 0 : "md"}>
                <Title order={5}>Phân loại sản phẩm</Title>
                <ActionIcon variant="subtle" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
                </ActionIcon>
            </Group>

            {!collapsed && (
                <Stack>
                    <AttributeSelecter
                        attributeForSku={attributeForSkuData || []}
                        attributes={attributes}
                        selectedClassificationType={selectedClassificationType}
                        onAttributesChange={setAttributes}
                        onClassificationTypeChange={setSelectedClassificationType}
                    /> 

                    {form.values.productSkus?.length > 0 && (
                        <>
                            <Divider label="Thiết lập chung" labelPosition="center" />
                            <SkuBulkAction
                                attributes={attributes}
                                skus={form.values.productSkus}
                                onApplyBulk={handleBulkApply}
                                onApplyToGroup={handleGroupApply}
                            />
                            <Divider label="Danh sách phân loại" labelPosition="center" />
                            <SkuTable
                                attributes={attributes}
                                skus={form.values.productSkus}
                                onImageUpload={handleImageUpload}
                                onSkuFieldUpdate={updateSku}
                            />
                        </>
                    )}
                </Stack>
            )}
        </Paper>
    );
};

export default SkuDetails;