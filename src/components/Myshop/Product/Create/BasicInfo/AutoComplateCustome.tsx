
import {
    ActionIcon,
    Autocomplete,
    Box,
    Text,
    type AutocompleteProps
} from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import type { BaseCategoryDto } from '../../../../../types/CategoryType';



interface AutoComplateCustomeProps extends Omit<AutocompleteProps, 'value' | 'onChange' | 'onClear' | 'error' | 'data'> {
    categories: BaseCategoryDto[];
    value?: string | null;
    onChange: (value: string | null) => void;
    onClear?: () => void;
    onSearchChange?: (searchValue: string) => void;
    error?: React.ReactNode;
}

const AutoComplateCustome = ({
    categories,
    value,
    onChange,
    onClear,
    onSearchChange,
    placeholder = "Nhập để tìm kiếm...",
    error,
    ...rest
}: AutoComplateCustomeProps) => {
    const [searchValue, setSearchValue] = useState(value || '');

    useEffect(() => {
        if (value !== undefined && value !== null) {
            setSearchValue(value);
        }
    }, [value]);

    const handleCategorySelect = useCallback((selectedValue: string) => {
        const selectedOption = categories.find(option => option.id === selectedValue);
        if (selectedOption) {
            onChange(selectedOption.id);
            setSearchValue(selectedOption.urlPath || selectedOption.name);
        }
    }, [categories, onChange]);

    const handleClearInternal = useCallback(() => {
        onChange(null);
        setSearchValue('');
        if (onClear) {
            onClear();
        }
    }, [onChange, onClear]);

    const handleSearchChange = useCallback((newSearchValue: string) => {
        setSearchValue(newSearchValue);
        if (onSearchChange) {
            onSearchChange(newSearchValue);
        }
    }, [onSearchChange]);

    const autocompleteData = useMemo(() => {
        return categories.map(option => ({
            value: option.id,
            label: option.urlPath || option.name
        }));
    }, [categories]);

    const renderOption = useCallback(({ option }: any) => {
        const categoryOption = categories.find(opt => opt.id === option.value);
        if (!categoryOption) return null;

        return (
            <Box>
                <Text size="sm" className="text-contentText">
                    {categoryOption.urlPath || categoryOption.name}
                </Text>
            </Box>
        );
    }, [categories]);

    const rightSection = useMemo(() => {
        return value ? (
            <ActionIcon
                size="sm"
                variant="subtle"
                color="gray"
                onClick={handleClearInternal}
            >
                <FiX size={14} />
            </ActionIcon>
        ) : null;
    }, [value, handleClearInternal]);

    const filterFunction = useCallback(({ options }: any) => {
        return options;
    }, []);

    const autocompleteStyles = useMemo(() => ({
        input: {
            fontSize: '14px',
            minHeight: '36px'
        },
        dropdown: {
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
        },
        option: {
            padding: '8px 12px',
            borderRadius: '4px',
            margin: '2px 4px'
        }
    }), []);

    const comboboxProps = useMemo(() => ({
        transitionProps: { transition: 'pop' as const, duration: 200 },
        shadow: 'md' as const
    }), []);

    return (
        <Autocomplete
            value={searchValue}
            onChange={handleSearchChange}
            onOptionSubmit={handleCategorySelect}
            data={autocompleteData}
            placeholder={placeholder}
            limit={5}
            maxDropdownHeight={300}
            error={error}
            rightSection={rightSection}
            comboboxProps={comboboxProps}
            renderOption={renderOption}
            filter={filterFunction}
            styles={autocompleteStyles}
            {...rest}
        />
    );
};

export default AutoComplateCustome;