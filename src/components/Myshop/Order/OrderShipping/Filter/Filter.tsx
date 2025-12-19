import { Button, Card, Divider, SegmentedControl, Select, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useEffect, useState } from 'react';
import { FiCalendar, FiFilter, FiPrinter, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { OrderCountType, PreparingStatus, SearchType, UseOrderParams } from '../../../../../hooks/useOrder';
import { formatDateForBe, getDefaultDateRange_Now_Yesterday } from '../../../../../untils/Untils';
import { getSearchPlaceholder, orderTypeOptions, searchTypes } from '../../Data';

export type SortByType = 'newest' | 'oldest';

interface FilterProps {
    initialParams?: UseOrderParams;
    onFilterChange: (filters: UseOrderParams) => void;
    onResetFilter: () => void;
    orderCount?: number;
}

const Filter = ({ initialParams, onFilterChange, onResetFilter, orderCount = 0 }: FilterProps) => {
    const [orderType, setOrderType] = useState<OrderCountType | null>(initialParams?.orderType || 'all');
    const [value, setValue] = useState<[Date | null, Date | null]>(getDefaultDateRange_Now_Yesterday());
    const [searchTypeValue, setSearchTypeValue] = useState<SearchType>(initialParams?.searchType || 'order_code');
    const [searchTerm, setSearchTerm] = useState(initialParams?.search || '');
    const [sortValue, setSortValue] = useState<SortByType>(
        initialParams?.sortBy === 'oldest' ? 'oldest' : 'newest');
    const [preparingStatus, setPreparingStatus] = useState<PreparingStatus>(initialParams?.preparingStatus || 'all');


    const applyFilters = () => {
        onFilterChange({
            orderType: orderType || 'all',
            searchType: searchTypeValue,
            search: searchTerm,
            sortBy: sortValue,
            confirmSD: value[0] ? formatDateForBe(value[0]) : '',
            confirmED: value[1] ? formatDateForBe(value[1]) : '',
            preparingStatus: preparingStatus,
        });
    };

    useEffect(() => {
        onFilterChange({
            orderType: orderType || 'all',
            searchType: searchTypeValue,
            search: searchTerm,
            sortBy: sortValue,
            confirmSD: value[0] ? formatDateForBe(value[0]) : '',
            confirmED: value[1] ? formatDateForBe(value[1]) : '',
            preparingStatus: preparingStatus,
        });
    }, [preparingStatus])

    const resetFilters = () => {
        if (onResetFilter) {
            onResetFilter();
        }
        setOrderType('all');
        setSearchTypeValue('order_code');
        setSearchTerm('');
        setSortValue('newest');
        setValue(getDefaultDateRange_Now_Yesterday());
        setPreparingStatus('all');
    };



    return (
        <Card shadow="xs" p="md" radius="md" withBorder mb="md">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4" style={{ width: '100%' }}>
                    <div style={{ width: '28%' }}>
                        <SegmentedControl
                            value={preparingStatus}
                            onChange={(value) => setPreparingStatus(value as PreparingStatus)}
                            data={[
                                { label: 'Tất cả', value: 'all' as PreparingStatus },
                                { label: 'Chưa xử lý', value: 'confirmed' as PreparingStatus },
                                { label: 'Đã xử lý', value: 'preparing' as PreparingStatus },
                            ]}
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
                                    minWidth: '80px',
                                }
                            }}
                        />
                    </div>

                    <div className="flex items-center flex-1" >
                        <Select
                            data={searchTypes}
                            value={searchTypeValue}
                            onChange={(value) => setSearchTypeValue(value as SearchType)}
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
                            onChange={(e) => setSearchTerm(e.currentTarget.value)}
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

                <div className="flex items-end gap-4">
                    <div style={{ width: '25%' }}>
                        <Select
                            placeholder="Chọn loại đơn hàng"
                            label="Loại đơn hàng"
                            data={orderTypeOptions}
                            value={orderType || null}
                            onChange={(val) => setOrderType(val as OrderCountType | null)}

                        />
                    </div>



                    <div className='flex-1'>
                        <DatePickerInput
                            type='range'
                            label="Thời gian xác nhận đơn hàng"
                            placeholder="Chọn khoảng thời gian"
                            valueFormat="DD/MM/YYYY"
                            maxDate={new Date()}
                            value={value}
                            onChange={setValue}
                            rightSection={<FiCalendar size={16} />}
                        />
                    </div>

                    <div style={{ width: '25%' }}>
                        <Select
                            label="Sắp xếp theo"
                            placeholder="Sắp xếp theo"
                            value={sortValue}
                            onChange={(value) => {
                                const sortBy = value as SortByType;
                                setSortValue(sortBy);
                            }}
                            data={[
                                { value: 'newest', label: 'Đơn hàng mới nhất' },
                                { value: 'oldest', label: 'Đơn hàng cũ nhất' }
                            ]}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        {orderCount} đơn hàng
                    </div>
                    <div className="flex gap-2">
                        {preparingStatus === 'preparing' && (
                            <Link to="/myshop/orders/printing">
                                <Button
                                    variant="light"
                                    // onClick={applyFilters}
                                    leftSection={<FiPrinter size={14} />}
                                >
                                    In phiếu
                                </Button>
                            </Link>
                        )}
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