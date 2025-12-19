import { Button, Group, Select, TextInput } from '@mantine/core';
import React from 'react';
import { FiCheck, FiSearch, FiX } from 'react-icons/fi';
import type { SearchType } from '../../../../hooks/useOrder';


interface SearchTypeOption {
    value: SearchType;
    label: string;
}

interface OrderFilterProps {
    searchTerm: string;
    searchTypeValue: SearchType;
    sortBy: string | null;
    onSearchChange: (value: string) => void;
    onSearchTypeValueChange: (value: SearchType) => void;
    onSortByChange: (value: string | null) => void;
    onClearAll: () => void;
    onFetchWithParam: () => void;
    searchTypes?: SearchTypeOption[];
    sortOptions?: { value: string; label: string }[];
}

const OrderFilter: React.FC<OrderFilterProps> = ({
    searchTerm,
    searchTypeValue,
    sortBy,
    onSearchChange,
    onSearchTypeValueChange,
    onSortByChange,
    onClearAll,
    onFetchWithParam,
    searchTypes = [
        { value: 'order_code', label: 'Mã đơn hàng' },
        { value: 'product_name', label: 'Tên sản phẩm' },
        { value: 'shop_name', label: 'Tên shop' },
    ],
    sortOptions = [
        { value: 'newest', label: 'Đơn hàng mới nhất' },
        { value: 'oldest', label: 'Đơn hàng cũ nhất' }
    ]
}) => {
    const getSearchPlaceholder = () => {
        switch (searchTypeValue) {
            case 'order_code':
                return 'Nhập mã đơn hàng...';
            case 'customer_name':
                return 'Nhập tên người mua...';
            case 'product_name':
                return 'Nhập tên sản phẩm...';
            default:
                return 'Tìm kiếm...';
        }
    };

    return (
        <Group justify="space-between" my="md">
            <div className="flex items-center" style={{ width: 440 }}>
                <Select
                    data={searchTypes}
                    value={searchTypeValue}
                    onChange={(value) => onSearchTypeValueChange(value as SearchType)}
                    styles={{
                        root: { minWidth: 150, maxWidth: 150 },
                        input: {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderRight: 0
                        }
                    }}
                />
                <TextInput
                    placeholder={getSearchPlaceholder()}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.currentTarget.value)}
                    rightSection={<FiSearch size={16} />}
                    style={{ flex: 1 }}
                    styles={{
                        input: {
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        }
                    }}
                />
            </div>
            <Group>
                <Select
                    placeholder="Sắp xếp theo"
                    value={sortBy}
                    onChange={onSortByChange}
                    data={sortOptions}
                    style={{ width: 200 }}
                />

                <Button
                    variant="outline"
                    onClick={onClearAll}
                    disabled={!searchTerm && !sortBy}
                    color="rgba(255, 94, 94, 1)"
                    size="xs"
                >
                    <FiX size={14} />
                </Button>

                <Button
                    variant="outline"
                    leftSection={<FiCheck size={14} />}
                    onClick={onFetchWithParam}
                    disabled={!searchTerm && !sortBy}
                    size="xs"
                >
                    Áp dụng
                </Button>
            </Group>
        </Group>
    );
};

export default OrderFilter;
