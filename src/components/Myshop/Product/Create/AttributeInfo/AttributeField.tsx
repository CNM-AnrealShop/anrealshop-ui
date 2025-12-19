import { Select } from '@mantine/core';
import { memo, useCallback, useMemo } from 'react';
import type { BaseAttribute, ProductAttribute } from '../../../../../types/AttributeType';
import { MultiSelectCreatable } from './MultiSelectedCreateable';

interface AttributeFieldProps {
    attribute: BaseAttribute;
    formAttributes: ProductAttribute[];
    onAttributesChange: (attributes: ProductAttribute[]) => void;
}

const AttributeField = memo(({ attribute, formAttributes, onAttributesChange }: AttributeFieldProps) => {
    const { attributeKeyName, attributeKeyDisplay, values, isDefault, isMultiSelect } = attribute;

    const currentValue = useMemo(() => {
        const attr = formAttributes.find(a => a.attributeKeyName === attributeKeyName);
        return attr?.values || [];
    }, [formAttributes, attributeKeyName]);


    const updateForm = useCallback((valuess: string[]) => {
        const attributes = formAttributes.filter(a => a.attributeKeyName !== attributeKeyName);

        if (valuess.length > 0) {
            attributes.push(
                {
                    attributeKeyName,
                    attributeKeyDisplay,
                    values: new Set(valuess),
                }
            );
        }
        onAttributesChange(attributes);
    }, [formAttributes, onAttributesChange, attributeKeyName]);

    const handleMultiChange = useCallback((values: string[]) => {
        updateForm(values);
    }, [updateForm]);

    const handleSingleChange = useCallback((selectedValue: string | null) => {
        updateForm(selectedValue ? [selectedValue] : []);
    }, [updateForm]);

    if (isMultiSelect) {
        return (
            <MultiSelectCreatable
                options={values}
                value={Array.from(currentValue)}
                onChange={handleMultiChange}
                placeholder={`Chọn ${attributeKeyDisplay.toLowerCase()}`}
                canCreate={!isDefault}
                label={attributeKeyDisplay}
            />
        );
    }

    return (
        <Select
            label={attributeKeyDisplay}
            placeholder={`Chọn ${attributeKeyDisplay.toLowerCase()}`}
            data={values.map(val => ({ value: val, label: val }))}
            searchable
            clearable
            value={Array.from(currentValue)[0] || null}
            onChange={handleSingleChange}
        />
    );
});

export default AttributeField;