import {
    ActionIcon,
    Group,
    Image,
    NumberInput,
    Table,
    Text,
    TextInput,
    Tooltip
} from '@mantine/core';
import { useCallback } from 'react';
import { FiImage, FiTrash2, FiUpload } from 'react-icons/fi';
import type { ProductAttribute } from '../../../../../types/AttributeType';
import type { ProductSkuRequest } from '../../../../../types/ProductType';

interface SkuTableProps {
    attributes: ProductAttribute[];
    skus: ProductSkuRequest[];
    onImageUpload: (skuId: string, file: File | null) => void;
    onSkuFieldUpdate: (skuId: string, field: string, value: any) => void;
}

const SkuTable = ({ attributes, skus, onImageUpload, onSkuFieldUpdate }: SkuTableProps) => {
    
    const handleImageUpload = useCallback((skuId: string, file: File | null) => {
        if (file) 
            onImageUpload(skuId, file);
    }, [onImageUpload]);

    const handleImageDelete = useCallback((skuId: string) => {
        onSkuFieldUpdate(skuId, 'imageUrl', '');
    }, [onSkuFieldUpdate]);

    const updateSkuField = useCallback((skuId: string, field: string, value: any) => {
        onSkuFieldUpdate(skuId, field, value);
    }, [onSkuFieldUpdate]);

    const getAttributeValueForDisplay = useCallback((sku: ProductSkuRequest, attributeKeyName: string) => {
        const attribute = sku.attributes.find(attr => attr.attributeKeyName === attributeKeyName);
        return attribute?.values || '-';
    }, []);

    return (
        <div className="overflow-x-auto">
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        {attributes.map(attr => (
                            <Table.Th key={attr.attributeKeyName}>{attr.attributeKeyDisplay}</Table.Th>
                        ))}
                        <Table.Th>Hình ảnh</Table.Th>
                        <Table.Th>Giá</Table.Th>
                        <Table.Th>Tồn kho</Table.Th>
                        <Table.Th>SKU</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {skus.map((sku, index) => (
                        <Table.Tr key={sku.sku}>
                            {attributes.map((attr) => (
                                <Table.Td key={attr.attributeKeyName}>
                                    {getAttributeValueForDisplay(sku, attr.attributeKeyName)}
                                </Table.Td>
                            ))}
                            <Table.Td>
                                <div className="w-16 h-16 relative overflow-hidden rounded border">
                                    {sku.imageUrl ? (
                                        <div className="relative group">
                                            <Image
                                                src={sku.imageUrl}
                                                alt={`SKU ${index}`}
                                                width={64}
                                                height={64}
                                                fit="cover"
                                                className="rounded"
                                            />
                                            
                                            {/* Overlay with actions */}
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded">
                                                <Group gap="xs">
                                                    <Tooltip label="Thay đổi ảnh">
                                                        <label>
                                                            <ActionIcon
                                                                size="sm"
                                                                variant="filled"
                                                                color="blue"
                                                                component="span"
                                                                className="cursor-pointer"
                                                            >
                                                                <FiUpload size={14} />
                                                            </ActionIcon>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageUpload(sku.sku, e.target.files?.[0] || null)}
                                                            />
                                                        </label>
                                                    </Tooltip>
                                                    
                                                    <Tooltip label="Xóa ảnh">
                                                        <ActionIcon
                                                            size="sm"
                                                            variant="filled"
                                                            color="red"
                                                            onClick={() => handleImageDelete(sku.sku)}
                                                        >
                                                            <FiTrash2 size={14} />
                                                        </ActionIcon>
                                                    </Tooltip>
                                                </Group>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="border border-dashed border-gray-300 rounded flex items-center justify-center h-full w-full cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                            <div className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-500">
                                                <FiImage size={20} />
                                                <Text size="xs" mt={2}>Chọn ảnh</Text>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(sku.sku, e.target.files?.[0] || null)}
                                            />
                                        </label>
                                    )}
                                </div>
                            </Table.Td>
                            <Table.Td>
                                <NumberInput
                                    size="xs"
                                    value={sku.price}
                                    onChange={(val) => updateSkuField(sku.sku, 'price', val ?? 0)}
                                    min={0}
                                    w={100}
                                    hideControls
                                    rightSection={<Text size="xs" c="dimmed">₫</Text>}
                                />
                            </Table.Td>
                            <Table.Td>
                                <NumberInput
                                    size="xs"
                                    value={sku.quantity}
                                    onChange={(val) => updateSkuField(sku.sku, 'quantity', val)}
                                    min={0}
                                    w={80}
                                />
                            </Table.Td>
                            <Table.Td>
                                <TextInput
                                    size="xs"
                                    value={sku.sku}
                                    onChange={(e) => updateSkuField(sku.sku, 'sku', e.target.value)}
                                    w={120}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default SkuTable;
