import {
    Button,
    Card,
    Collapse,
    Divider,
    FileInput,
    Group,
    NumberInput,
    Select,
    Stack,
    Text
} from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import { FiGlobe, FiImage, FiSettings, FiUsers } from 'react-icons/fi';
import { uploadToCloudinary } from '../../../../../service/Cloundinary';
import type { ProductAttribute } from '../../../../../types/AttributeType';
import type { ProductSkuRequest } from '../../../../../types/ProductType';
import showErrorNotification from '../../../../Toast/NotificationError';
import showSuccessNotification from '../../../../Toast/NotificationSuccess';


interface SkuBulkActionProps {
    attributes: ProductAttribute[];
    skus: ProductSkuRequest[];
    onApplyBulk: (price: number | null, quantity: number | null, imageUrl?: string | null) => void;
    onApplyToGroup: (attributeName: string, attributeValue: string, price: number | null, quantity: number | null, imageUrl?: string | null) => void;
}

const SkuBulkAction = ({ attributes, skus, onApplyBulk, onApplyToGroup }: SkuBulkActionProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);
    const [selectedAttributeValue, setSelectedAttributeValue] = useState<string | null>(null);

    const attributeOptions = useMemo(() => 
        attributes.map(attr => ({ value: attr.attributeKeyDisplay, label: attr.attributeKeyDisplay })), [attributes]
    );

    const attributeValueOptions = useMemo(() => {
        const attribute = attributes.find(attr => attr.attributeKeyDisplay === selectedAttribute);
        return Array.from(attribute?.values || []).map(value => ({ value, label: value })) || [];
    }, [selectedAttribute, attributes]);

    const getGroupCount = useCallback(() => {
        if (!selectedAttribute || !selectedAttributeValue) return 0;
        
        const attributeKey = attributes.find(attr => attr.attributeKeyDisplay === selectedAttribute)?.attributeKeyName;
        const count = skus.filter(sku => 
            sku.attributes.some(attr => 
                attr.attributeKeyName === attributeKey && 
                Array.from(attr.values)[0] === selectedAttributeValue
            )
        ).length;
        return count;
    }, [selectedAttribute, selectedAttributeValue, skus]);

    const getInputValues = () => {
        const priceInput = document.getElementById('bulk-price') as HTMLInputElement;
        const stockInput = document.getElementById('bulk-stock') as HTMLInputElement;
        return {
            price: priceInput?.value ? parseFloat(priceInput.value.replace(/[^\d.-]/g, '')) : null,
            quantity: stockInput?.value ? parseFloat(stockInput.value) : null
        };
    };

    const clearInputs = () => {
        const priceInput = document.getElementById('bulk-price') as HTMLInputElement;
        const stockInput = document.getElementById('bulk-stock') as HTMLInputElement;
        if (priceInput) priceInput.value = '';
        if (stockInput) stockInput.value = '';
        setImageFile(null);
    };

    const applyBulkValues = useCallback(async (isGroupAction = false) => {
        const { price, quantity } = getInputValues();
        let imageUrl: string | null = null;
        if (imageFile) {
            try {
                setIsUploading(true);
                const uploadResult = await uploadToCloudinary(imageFile, 'image');
                imageUrl = uploadResult.secure_url;
                showSuccessNotification('Thông báo', 'Tải ảnh lên thành công!');
            } catch (error) {
                showErrorNotification('Thông báo', 'Tải ảnh lên thất bại. Vui lòng thử lại sau.');
                return;
            } finally {
                setIsUploading(false);
            }
        }

        if (price || quantity || imageUrl) {
            if (isGroupAction && selectedAttribute && selectedAttributeValue) {
                onApplyToGroup(selectedAttribute, selectedAttributeValue, price, quantity, imageUrl);
                setSelectedAttribute(null);
                setSelectedAttributeValue(null);
            } else if (!isGroupAction) {
                onApplyBulk(price, quantity, imageUrl);
            }
            clearInputs();
        }
    }, [onApplyBulk, onApplyToGroup, imageFile, selectedAttribute, selectedAttributeValue]);

    return (
        <Card shadow="none" px={0} py={10}>
            <Stack gap="md">
                <Group align="flex-end">
                    <NumberInput
                        placeholder="Giá"
                        min={0}
                        step={1000}
                        rightSection={<Text size="xs">₫</Text>}
                        id="bulk-price"
                        style={{ flex: 1 }}
                        thousandSeparator=","
                    />
                    <NumberInput
                        placeholder="Tồn kho"
                        min={0}
                        id="bulk-stock"
                        style={{ flex: 1 }}
                        thousandSeparator=","
                    />
                    <FileInput
                        placeholder="Chọn ảnh"
                        accept="image/*"
                        value={imageFile}
                        onChange={setImageFile}
                        leftSection={<FiImage size={16} />}
                        style={{ flex: 1 }}
                        clearable
                    />
                </Group>

                <Group grow>
                    <Button 
                        onClick={() => applyBulkValues(false)}
                        loading={isUploading}
                        leftSection={<FiGlobe size={16} />}
                        variant="filled"
                    >
                        Áp dụng cho tất cả ({skus.length})
                    </Button>
                    <Button
                        variant="outline"
                        leftSection={<FiSettings size={16} />}
                        onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                        {showAdvanced ? 'Ẩn nâng cao' : 'Nâng cao'}
                    </Button>
                </Group>

                <Collapse in={showAdvanced}>
                    <Stack gap="md">
                        <Divider label="Áp dụng theo nhóm thuộc tính" labelPosition="center" />
                        <Group grow>
                            <Select
                                placeholder="Chọn thuộc tính"
                                data={attributeOptions}
                                value={selectedAttribute}
                                onChange={(value) => {
                                    setSelectedAttribute(value);
                                    setSelectedAttributeValue(null);
                                }}
                                clearable
                            />
                            <Select
                                placeholder="Chọn giá trị"
                                data={attributeValueOptions}
                                value={selectedAttributeValue}
                                onChange={setSelectedAttributeValue}
                                disabled={!selectedAttribute}
                                clearable
                            />
                        </Group>
                        <Button
                            onClick={() => applyBulkValues(true)}
                            loading={isUploading}
                            leftSection={<FiUsers size={16} />}
                            variant="outline"
                            disabled={!selectedAttribute || !selectedAttributeValue}
                            fullWidth
                        >
                            Áp dụng cho nhóm ({getGroupCount()})
                        </Button>
                        {selectedAttribute && selectedAttributeValue && (
                            <Text size="xs" c="dimmed" ta="center">
                                Sẽ áp dụng cho {getGroupCount()} sản phẩm có {selectedAttribute}: {selectedAttributeValue}
                            </Text>
                        )}
                    </Stack>
                </Collapse>
            </Stack>
        </Card>
    );
};

export default SkuBulkAction;