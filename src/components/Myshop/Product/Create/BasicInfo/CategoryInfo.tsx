
import {
    Button,
    Group,
    Paper,
    type AutocompleteProps
} from '@mantine/core';
import { memo, useState } from 'react';
import { FiGrid } from 'react-icons/fi';
import type { BaseCategoryDto } from '../../../../../types/CategoryType';
import AutoComplateCustome from './AutoComplateCustome';
import ModalCategorySelected from './ModalCategorySelected';

interface CategoryInfoProps {
    categoryIdProps: AutocompleteProps;
    categories: BaseCategoryDto[];
    categoryPathProps: AutocompleteProps;
    onSearchChange?: (searchValue: string) => void;
}

const CategoryInfo = memo(({ categoryIdProps, categories, categoryPathProps, onSearchChange }: CategoryInfoProps) => {
    const [modalOpened, setModalOpened] = useState(false);

    const handleModalSelect = (categoryIdValue: string, path: string) => {
        const formOnChange = categoryIdProps.onChange as (value: string | null) => void;
        if (formOnChange) {
            formOnChange(categoryIdValue);
        }

        if (categoryPathProps.onChange && path) {
            const pathOnChange = categoryPathProps.onChange as (value: string) => void;
            pathOnChange(path);
        }
        setModalOpened(false);
    };

    const handleCateSelectedChange = (categoryIdValue: string | null) => {
        const cateSelected = categories.find(c => c.id === categoryIdValue);
        const formOnChange = categoryIdProps.onChange as (value: string | null) => void;

        if (formOnChange) {
            formOnChange(categoryIdValue);
        }

        if (categoryPathProps.onChange && cateSelected) {
            const pathValue = cateSelected.urlPath || cateSelected.name;
            const pathOnChange = categoryPathProps.onChange as (value: string) => void;
            pathOnChange(pathValue);
        } else if (categoryPathProps.onChange && !categoryIdValue) {
            const pathOnChange = categoryPathProps.onChange as (value: string) => void;
            pathOnChange('');
        }
    };

    return (
        <Paper className="!bg-transparent" shadow="none" mb={10}>
            <Group mb={5} justify="space-between">
                <label className="text-sm font-medium">
                    Danh mục <span className="text-red-500">*</span>
                </label>
                <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<FiGrid size={14} />}
                    onClick={() => setModalOpened(true)}
                >
                    Chọn từ danh sách
                </Button>
            </Group>

            <AutoComplateCustome
                categories={categories}
                value={categoryPathProps.value as string || ''}
                onChange={handleCateSelectedChange}
                onSearchChange={onSearchChange}
                error={categoryIdProps.error}
                placeholder="Nhập để tìm kiếm danh mục..."
                required={categoryIdProps.required}
                onClear={() => {
                    const formOnChange = categoryIdProps.onChange as (value: string | null) => void;
                    if (formOnChange) formOnChange('');
                    if (categoryPathProps.onChange) {
                        const pathOnChange = categoryPathProps.onChange as (value: string) => void;
                        pathOnChange('');
                    }
                }}
                description={categoryIdProps.error ? undefined : ''}
            />

            <ModalCategorySelected
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSelect={handleModalSelect}
                selectedCategoryId={categoryIdProps.value as string}
            />
        </Paper>
    );
});

export default CategoryInfo;