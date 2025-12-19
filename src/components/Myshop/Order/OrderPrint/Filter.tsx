import { Button, Card, Divider, SegmentedControl, Select, TextInput } from '@mantine/core';
import '@mantine/dates/styles.css';
import { useCallback, useEffect, useState } from 'react';
import { FiFilter, FiRefreshCw, FiSearch } from 'react-icons/fi';
import type { SearchType } from '../../../../hooks/useOrder';
import { getSearchPlaceholder, preparingShippingMethods, searchShipTypes, type PreparingShippingStatus } from '../Data';
import type { shipParams } from '../../../../hooks/useShipping';

export type SortByType = 'newest' | 'oldest';

interface FilterProps {
    initialParams?: shipParams;
    onFilterChange?: (filters: shipParams) => void;
    onResetFilter?: () => void;
    orderCount?: number;
}

const Filter = ({ initialParams, onFilterChange, onResetFilter, orderCount = 0 }: FilterProps) => {
    const [searchTypeValue, setSearchTypeValue] = useState<SearchType>(initialParams?.searchType || 'order_code');
    const [searchTerm, setSearchTerm] = useState(initialParams?.search || '');
    const [sortValue, setSortValue] = useState<SortByType>(
        initialParams?.sortBy === 'oldest' ? 'oldest' : 'newest');
    const [preparingStatus, setPreparingStatus] = useState<PreparingShippingStatus>(initialParams?.preparingStatus || 'all');

    const onFillterChangeCallback = useCallback(() => {
        if (onFilterChange) {
            onFilterChange({
                searchType: searchTypeValue,
                search: searchTerm,
                sortBy: sortValue || 'newest',
                preparingStatus: preparingStatus || 'all'
            });
        }
    }, [onFilterChange, preparingStatus, searchTerm, searchTypeValue, sortValue]);

    useEffect(() => {
        onFillterChangeCallback();
    }, [ preparingStatus]);

    const applyFilters = () => {
        onFillterChangeCallback();
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSearchTypeValue('order_code');
        setSortValue('newest');
        setPreparingStatus('all');
        if (onResetFilter) {
            onResetFilter();
        }
    };

    const onSearchTypeValueChange = (value: SearchType) => {
        setSearchTypeValue(value);
    };

    const onSearchChange = (value: string) => {
        setSearchTerm(value);
    };


    return (
        <Card shadow="xs" p="md" radius="md" withBorder mb="md">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4" style={{ width: '100%' }}>
                    <div style={{ width: '38%' }}>
                        <SegmentedControl
                            value={preparingStatus}
                            onChange={(value) => { setPreparingStatus(value as PreparingShippingStatus); onFillterChangeCallback(); }}
                            data={preparingShippingMethods}
                            size="sm"
                            radius="md"
                            styles={{
                                root: {
                                    backgroundColor: '#f5f5f5',
                                    padding: '2px',
                                },
                                label: {
                                    fontWeight: 500,
                                    fontSize: '13px',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                },
                                control: {
                                    border: 'none',
                                    minWidth: '120px',
                                }
                            }}
                        />
                    </div>

                    <div className="flex items-center flex-1" >
                        <Select
                            data={searchShipTypes}
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
                            placeholder={getSearchPlaceholder(searchTypeValue)}
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

                </div>

                <div className="flex flex-1 items-center justify-between">
                    <div className="font-medium">
                        {orderCount} đơn hàng
                    </div>
                    <div className="flex gap-2 justify-end items-center">
                        <div style={{ width: '40%' }}>
                            <Select
                                placeholder="Sắp xếp theo"
                                value={sortValue}
                                onChange={(value) => {
                                    const sortBy = value as SortByType;
                                    setSortValue(sortBy);
                                }}
                                data={[
                                    { value: 'newest', label: 'Đơn vận mới nhất' },
                                    { value: 'oldest', label: 'Đơn vận cũ nhất' }
                                ]}
                            />
                        </div>
                        <Divider orientation="vertical" mx={"sm"} />
                        <Button
                            onClick={applyFilters}
                            leftSection={<FiFilter size={14} />}
                        >
                            Lọc
                        </Button>

                        <Button
                            variant="outline"
                            onClick={resetFilters}
                            leftSection={<FiRefreshCw size={14} />}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Filter;