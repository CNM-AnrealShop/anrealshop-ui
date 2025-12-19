import {
    ActionIcon,
    Group,
    NumberInput,
    Paper,
    SimpleGrid,
    Stack,
    Textarea,
    TextInput,
    Title,
    type AutocompleteProps,
    type NumberInputProps,
    type SelectProps,
    type TextareaProps,
    type TextInputProps
} from '@mantine/core';
import { memo, useEffect, useState } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import RichTextEditor from '../../../../RichText/RichTextEditor';
import CategoryInfo from './CategoryInfo';
import type { BaseCategoryDto } from '../../../../../types/CategoryType';
import { CategoryService } from '../../../../../service/CategoryService';

interface BasicInforProps {
    isShowQuantity?: boolean;
    isEditMode?: boolean;
    nameProps: TextInputProps;
    sortDescriptionProps: TextareaProps;
    priceProps: NumberInputProps;
    discountPriceProps: NumberInputProps;
    categoryIdProps: SelectProps;
    categoryPathProps: AutocompleteProps;
    descriptionProps: TextInputProps;
    quantityProps: NumberInputProps;
}

const BasicInfor = memo(({
    isShowQuantity,
    isEditMode = false,
    nameProps,
    sortDescriptionProps,
    priceProps,
    discountPriceProps,
    categoryIdProps,
    categoryPathProps,
    descriptionProps,
    quantityProps,
}: BasicInforProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [categoriesSuggestions, setCategoriesSuggestions] = useState<BaseCategoryDto[]>([]);

    const toggleSection = () => {
        setCollapsed(prev => !prev);
    };

    useEffect(() => {
        if (isEditMode) return;
        const fetchCategoriesSuggestions = async () => {
            try {
                const data = await CategoryService.getCategorySuggestionsByNameProduct(nameProps.value as string);
                setCategoriesSuggestions(data);
                if (!categoryIdProps.value && data.length > 0) {
                    const formOnChange = categoryIdProps.onChange as (value: string | null) => void;
                    formOnChange?.(data[0].id);
                }
                if (categoryPathProps.onChange && data.length > 0) {
                    const cateSelected = data[0];
                    const pathValue = cateSelected.urlPath || cateSelected.name;
                    const pathOnChange = categoryPathProps.onChange as (value: string) => void;
                    pathOnChange(pathValue);
                } else if (categoryPathProps.onChange && !categoryIdProps.value) {
                    const pathOnChange = categoryPathProps.onChange as (value: string) => void;
                    pathOnChange('');
                }
            } catch (err) {
                console.error("Lỗi lấy category:", err);
                setCategoriesSuggestions([]);
            }
        };

        const value = nameProps.value as string;
        if (value && value.trim() !== '' && value.trim().length >= 10 && value.trim().length <= 255) {
            fetchCategoriesSuggestions();
        } else {
            setCategoriesSuggestions([]);
        }
    }, [nameProps.value]);

    const handleCategorySearchChange = useDebouncedCallback(async (searchValue: string) => {
        try {
            const data = await CategoryService.getCategorySuggestions(searchValue);
            setCategoriesSuggestions(data);
        } catch (err) {
            console.error("Lỗi lấy category suggestions từ search:", err);
        }
    }, 500);

    return (
        <Paper shadow="xs" p="md" mb="md" className="bg-white">
            <Group justify="space-between" mb={collapsed ? 0 : "md"}>
                <Title order={5}>Thông tin cơ bản</Title>
                <ActionIcon variant="subtle" onClick={toggleSection}>
                    {collapsed ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
                </ActionIcon>
            </Group>

            {!collapsed && (
                <Stack>
                    <TextInput
                        label="Tên sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                        required
                        {...nameProps}
                    />

                    <Textarea
                        label="Mô tả ngắn"
                        placeholder="Mô tả ngắn về sản phẩm"
                        required
                        minRows={3}
                        maxRows={5}
                        {...sortDescriptionProps}
                    />

                    <SimpleGrid cols={3} spacing="lg">
                        <NumberInput
                            label="Giá gốc"
                            placeholder="Nhập giá sản phẩm"
                            required
                            min={0}
                            {...priceProps}
                            thousandSeparator=",">
                        </NumberInput>

                        <NumberInput
                            label="Giá khuyến mãi"
                            placeholder="Nhập giá khuyến mãi"
                            min={0}
                            {...discountPriceProps}
                            thousandSeparator=",">
                        </NumberInput>

                        <NumberInput
                            label="Số lượng"
                            placeholder="Nhập số lượng sản phẩm"
                            min={0}
                            disabled={!isShowQuantity}
                            {...quantityProps}
                            thousandSeparator=",">
                        </NumberInput>
                    </SimpleGrid>

                    <CategoryInfo
                        categoryIdProps={{
                            ...categoryIdProps,
                            value: categoryIdProps.value ?? undefined
                        } as AutocompleteProps}
                        categoryPathProps={{
                            ...categoryPathProps,
                            value: categoryPathProps.value ?? undefined
                        } as AutocompleteProps}
                        categories={categoriesSuggestions}
                        onSearchChange={handleCategorySearchChange}
                    />

                    <RichTextEditor
                        descriptionProps={{
                            ...descriptionProps
                        }}
                    />
                </Stack>
            )}
        </Paper>
    );
});

export default BasicInfor;