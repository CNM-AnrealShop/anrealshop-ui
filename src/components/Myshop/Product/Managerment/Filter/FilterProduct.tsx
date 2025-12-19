import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Group,
  Loader,
  Select
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import {
  FiCheck,
  FiFilter,
  FiSearch,
  FiX
} from 'react-icons/fi';
import { useSuggest } from '../../../../../hooks/useSuggest';
import type { BaseCategoryDto } from '../../../../../types/CategoryType';

interface FilterProductProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  category: BaseCategoryDto | null;
  onCategoryChange: (value: BaseCategoryDto | null) => void;
  sortBy: string | null;
  onSortChange: (value: string | null) => void;
  onFetchWithParam: () => void;
  onClearAll: () => void;
}

const FilterProduct = ({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  onFetchWithParam,
  onClearAll
}: FilterProductProps) => {

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localCategory, setLocalCategory] = useState<string | null>(category?.name || null);
  const [localSortBy, setLocalSortBy] = useState<string | null>(sortBy);

  const [debouncedSearchQuery] = useDebouncedValue(localSearchQuery, 300);
  const [debouncedCategoryQuery] = useDebouncedValue(localCategory || '', 300);

  const [categorySuggestions, setCategorySuggestions] = useState<BaseCategoryDto[]>([]);
  const [productNameSuggestions, setProductNameSuggestions] = useState<string[]>([]);

  const {
    isLoading: isLoadingName,
    getSuggestions: getProductNameSuggestions
  } = useSuggest<string>('name');

  const {
    isLoading: isLoadingCate,
    getSuggestions: getCategorySuggestions
  } = useSuggest<BaseCategoryDto>('category');

  useEffect(() => {
    const fetchProductSuggestions = async () => {
      try {
        const suggestions = await getProductNameSuggestions(debouncedSearchQuery);
        setProductNameSuggestions([...new Set(suggestions)]);
      } catch (error) {
        setProductNameSuggestions([]);
      }
    };

    fetchProductSuggestions();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const fetchCategorySuggestions = async () => {
      try {
        const suggestions = await getCategorySuggestions(debouncedCategoryQuery);
        setCategorySuggestions(suggestions);
      } catch (error) {
        setCategorySuggestions([]);
      }
    };

    fetchCategorySuggestions();
  }, [debouncedCategoryQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearchQuery(value);
    onSearchChange(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setLocalCategory(value);
  }, []);
  const handleSubmitCategoryChange = useCallback(() => {
    const selectedCategory = categorySuggestions.find(cat => cat.name === localCategory);
    if (!selectedCategory) {
      const data = categorySuggestions[0];
      setLocalCategory(data ? data.name : null);
      onCategoryChange(data || null);
    } else {
      setLocalCategory(selectedCategory.name);
      onCategoryChange(selectedCategory);
    }
  }, [localCategory, categorySuggestions, onCategoryChange]);

  const handleSortChange = useCallback((value: string | null) => {
    setLocalSortBy(value);
    onSortChange(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setLocalSearchQuery('');
    setProductNameSuggestions([]);
    onSearchChange('');
  }, [onSearchChange]);

  const handleClearCategory = useCallback(() => {
    setLocalCategory(null);
    setCategorySuggestions([]);
    onCategoryChange(null);
  }, [onCategoryChange]);

  const handleClearAllFilters = useCallback(() => {
    setLocalSearchQuery('');
    setLocalCategory(null);
    setLocalSortBy(null);
    setProductNameSuggestions([]);
    setCategorySuggestions([]);

    onClearAll();
  }, [onClearAll]);



  return (
    <div className=" p-4 bg-white rounded-md">
      <Group justify="space-between" mb="sm">
        <Box style={{ width: '320px' }} className="relative">
          <Autocomplete
            placeholder="Tìm kiếm sản phẩm theo tên..."
            leftSection={<FiSearch size={16} />}
            value={localSearchQuery}
            onChange={handleSearchChange}
            data={productNameSuggestions}
            filter={({ options }) => options}
            maxDropdownHeight={300}
            rightSectionWidth={localSearchQuery ? 40 : 0}
            rightSection={localSearchQuery && (
              isLoadingName ? <Loader size="xs" /> :
                <ActionIcon onClick={handleClearSearch} variant="subtle" color="gray">
                  <FiX size={16} />
                </ActionIcon>
            )}
            comboboxProps={{
              transitionProps: { transition: 'pop', duration: 200 },
              shadow: 'md'
            }}
            styles={{
              input: {
                fontSize: '14px',
                minHeight: '36px',
                paddingRight: localSearchQuery ? '40px' : '12px'
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
            }}
          />
        </Box>

        <Group>
          <Box style={{ width: '220px' }}>
            <Autocomplete
              placeholder="Lọc theo danh mục"
              leftSection={<FiFilter size={16} />}
              value={localCategory || ''}
              onChange={(value) => handleCategoryChange(value)}
              onOptionSubmit={handleSubmitCategoryChange}
              onBlur={handleSubmitCategoryChange}
              data={categorySuggestions.map(cat => cat.name)}
              filter={({ options }) => options}
              maxDropdownHeight={300}
              rightSectionWidth={localCategory ? 40 : 0}
              rightSection={localCategory && (
                isLoadingCate ? <Loader size="xs" /> :
                  <ActionIcon onClick={handleClearCategory} variant="subtle" color="gray">
                    <FiX size={16} />
                  </ActionIcon>
              )}
              comboboxProps={{
                transitionProps: { transition: 'pop', duration: 200 },
                shadow: 'md'
              }}
              styles={{
                input: {
                  fontSize: '14px',
                  minHeight: '36px',
                  paddingRight: localCategory ? '40px' : '12px'
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
              }}
            />
          </Box>

          <Select
            style={{ width: '180px' }}
            placeholder="Sắp xếp theo"
            data={[
              { value: 'name-asc', label: 'Tên A-Z' },
              { value: 'name-desc', label: 'Tên Z-A' },
              { value: 'price-asc', label: 'Giá tăng dần' },
              { value: 'price-desc', label: 'Giá giảm dần' },
              { value: 'newest', label: 'Mới nhất' },
              { value: 'bestseller', label: 'Bán chạy nhất' },
            ]}
            value={localSortBy}
            onChange={handleSortChange}
          />

          <Button
            variant="light"
            onClick={handleClearAllFilters}
            disabled={!localSearchQuery && !localCategory && !localSortBy}
            color="rgba(255, 94, 94, 1)"
            size="xs"
          >
            <FiX size={14} />
          </Button>

          <Button
            variant="filled"
            leftSection={<FiCheck size={14} />}
            onClick={onFetchWithParam}
            disabled={!localSearchQuery && !localCategory && !localSortBy}
            size="xs"
          >
            Áp dụng
          </Button>
        </Group>
      </Group>
    </div>
  );
};

export default FilterProduct;