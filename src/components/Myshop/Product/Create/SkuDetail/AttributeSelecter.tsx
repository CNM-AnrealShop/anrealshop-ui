import {
    ActionIcon,
    Button,
    Card,
    Group,
    MultiSelect,
    Select,
    Stack,
    Text
} from '@mantine/core';
import { useCallback, useMemo } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import type { ProductAttribute } from '../../../../../types/AttributeType';

interface AttributeSelecterProps {
    attributeForSku: ProductAttribute[];
    attributes: ProductAttribute[];
    selectedClassificationType: string | null;
    onAttributesChange: (attributes: ProductAttribute[]) => void;
    onClassificationTypeChange: (type: string | null) => void;
}

const AttributeSelecter = ({
    attributeForSku,
    attributes,
    selectedClassificationType,
    onAttributesChange,
    onClassificationTypeChange
}: AttributeSelecterProps) => {

    const classificationOptions = useMemo(() => {
        const selectedAttributeNames = attributes.map(attr => {
            const foundAttr = attributeForSku.find(skuAttr => skuAttr.attributeKeyDisplay === attr.attributeKeyDisplay);
            return foundAttr?.attributeKeyName;
        }).filter(Boolean);

        return attributeForSku
            .filter(attr => !selectedAttributeNames.includes(attr.attributeKeyName))
            .map(attr => ({
                value: attr.attributeKeyName,
                label: attr.attributeKeyDisplay
            }));
    }, [attributes, attributeForSku]);

    const addClassification = useCallback(() => {
        
        if (!selectedClassificationType) return;

        const selectedAttr = attributeForSku.find(
            attr => attr.attributeKeyName === selectedClassificationType
        );

        if (!selectedAttr) return;

        const newAttribute: ProductAttribute = {
            attributeKeyName: selectedAttr.attributeKeyName,
            attributeKeyDisplay: selectedAttr.attributeKeyDisplay,
            values: new Set<string>(),
        };

        const updatedAttributes = [...attributes, newAttribute];
        onAttributesChange(updatedAttributes);
        onClassificationTypeChange(null);
    }, [selectedClassificationType, attributes, onAttributesChange, onClassificationTypeChange]);

    const updateAttributeValues = useCallback((attributeId: string, values: string[]) => {
        const updatedAttributes = attributes.map(attr =>
            attr.attributeKeyName === attributeId ? { ...attr, values: new Set(values) } : attr
        );
        onAttributesChange(updatedAttributes);
    }, [attributes, onAttributesChange]);
    
    const removeAttribute = useCallback((attributeId: string) => {
        const updatedAttributes = attributes.filter(attr => attr.attributeKeyName !== attributeId);
        onAttributesChange(updatedAttributes);
    }, [attributes, onAttributesChange]);

    const getValueSuggestions = useCallback((classificationType: string) => {
        const attribute = attributeForSku.find(attr => attr.attributeKeyDisplay === classificationType);
        return Array.from(attribute?.values || []).map(value => ({ value, label: value })) || [];
    }, [attributeForSku]);

    return (
        <Stack>
            {/* Add classification */}
            <Group align="flex-end">
                <Select
                    label="Loại phân loại"
                    placeholder={classificationOptions.length > 0 ? "Chọn loại phân loại" : "Đã chọn hết thuộc tính"}
                    data={classificationOptions}
                    value={selectedClassificationType}
                    onChange={onClassificationTypeChange}
                    style={{ flex: 1 }}
                    clearable
                    disabled={classificationOptions.length === 0}
                />
                <Button
                    leftSection={<FiPlus size={16} />}
                    onClick={addClassification}
                    disabled={!selectedClassificationType || classificationOptions.length === 0}
                >
                    Thêm
                </Button>
            </Group>

            {/* Attributes list */}
            {attributes.map(attribute => (
                <Card key={attribute.attributeKeyName} p="xs" shadow="xs" className='!bg-gray-100'>
                    <Group justify="apart" mb="xs">
                        <Text fw={500}>{attribute.attributeKeyDisplay}</Text>
                        <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => removeAttribute(attribute.attributeKeyName)}
                        >
                            <FiTrash2 size={16} />
                        </ActionIcon>
                    </Group>

                    <MultiSelect
                        data={getValueSuggestions(attribute.attributeKeyDisplay)}
                        placeholder={`Chọn ${attribute.attributeKeyDisplay.toLowerCase()}`}
                        searchable
                        value={Array.from(attribute.values)}
                        onChange={(values) => updateAttributeValues(attribute.attributeKeyName, values)}
                        clearable
                    />
                </Card>
            ))}
        </Stack>
    );
};

export default AttributeSelecter;
