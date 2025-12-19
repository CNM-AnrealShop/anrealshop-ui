import {
    Anchor, Box, Breadcrumbs, Card, Container,
    Group, Paper, Text, Title
} from '@mantine/core';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { FiChevronRight, FiPrinter } from 'react-icons/fi';
import { type SearchType } from '../../../hooks/useOrder';
import { useURLParams } from '../../../hooks/useURLParams';
import { useShipping, type shipParams } from '../../../hooks/useShipping';
import Pagination from '../../common/PaginationCustom';
import { PaginationSkeleton } from '../Product/Managerment/Skeleton';
import { type PreparingShippingStatus } from './Data';
import NonOrderFound from './OrderPage/OrderView/NonOrderFond';
import Filter, { type SortByType } from './OrderPrint/Filter';
import HeaderListView from './OrderPrint/HeaderListView';
import OrderPrintList from './OrderPrint/OrderPrintList';
import PrintInfoForm from './OrderPrint/PrintInfoForm';
import PrintInfoPage from './OrderPrint/PrintInfoPage';
import showErrorNotification from '../../Toast/NotificationError';


const OrderPrintPage = () => {
    const { getParam, updateParams, clearParams } = useURLParams();

    const init_params: shipParams = {
        page: parseInt(getParam('page', '1') || '1', 10),
        limit: 10,
        searchType: (getParam('searchType', 'order_code') || 'order_code') as SearchType,
        search: getParam('search', '') || '',
        sortBy: (getParam('sortBy', 'newest') || 'newest') as SortByType,
        preparingStatus: (getParam('preparingStatus', 'all') || 'all') as PreparingShippingStatus,
    }

    const [selectedShipping, setSelectedShipping] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isPrinted] = useState(false);  //// them set vao hai nhe

    const [activePage, setActivePage] = useState(parseInt(getParam('page', '1') || '1', 10));
    const [itemsPerPage] = useState(10);

    const [params, setParams] = useState<shipParams>(init_params);

    const {
        totalCount,
        totalPages,
        // isLoading,
        data: shippingLists,
        fetchShipping,
    } = useShipping({
        initialParams: init_params
    });

    const loadShipping = useCallback(() => {
        updateParams({
            page: activePage > 1 ? activePage : null,
            searchType: params.searchType !== 'order_code' ? params.searchType : null,
            search: params.search || null,
            sortBy: params.sortBy !== 'newest' ? params.sortBy : null,
            preparingStatus: params.preparingStatus !== 'all' ? params.preparingStatus : null,
        });

        const paramsForFetch: shipParams = {
            ...params,
            page: activePage - 1,
            limit: itemsPerPage
        }

        fetchShipping(paramsForFetch)
    }, [activePage, params, fetchShipping, updateParams]);

    useEffect(() => {
        loadShipping();
    }, [activePage, params.preparingStatus]);

    const handleSelectAll = () => {
        setSelectedShipping(selectAll ? [] : shippingLists.flatMap(order => order.shippingId));
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        setSelectAll(selectedShipping.length === shippingLists.length && shippingLists.length > 0);
    }, [selectedShipping, shippingLists]);

    const handleSelectShipping = (shippingId: string) => {
        setSelectedShipping(prev => {
            if (prev.includes(shippingId)) {
                return prev.filter(id => id !== shippingId);
            } else {
                return [...prev, shippingId];
            }
        });
    };

    const handleParamsChange = (newParams: shipParams) => {
        setParams(newParams);
        setActivePage(1);
    };

    const handleResetFilter = () => {
        const defaultParams: shipParams = {
            searchType: 'order_code' as SearchType,
            search: '',
            sortBy: 'newest' as SortByType,
            preparingStatus: 'all' as PreparingShippingStatus,
        };

        setParams(defaultParams);
        setActivePage(1);
        clearParams(); // Clear all URL parameters
    };

    const handlePageChange = (page: number) => {
        setActivePage(page);
        updateParams({ page: page > 1 ? page : null });
    };

    const handlePrintShipping = () => {
        showErrorNotification("Nhắc nhở", "Chức năng đang được phát triển");
    };

    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/myshop' },
        { title: 'Quản lý đơn hàng', href: '/myshop/orders' },
        { title: 'In phiếu giao hàng', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm">
            {item.title}
        </Anchor>
    ));

    return (
        <Container fluid px="lg" py="md" >
            <Paper
                shadow="xs"
                p="md"
                mb="md"
                radius="md"
                className="border-b border-gray-200"
            >
                <Box mb="xs">
                    <Breadcrumbs separator={<FiChevronRight size={14} />}>
                        {breadcrumbItems}
                    </Breadcrumbs>
                </Box>

                <Group justify="space-between" align="center">
                    <Group>
                        <FiPrinter size={24} className="text-primary" />
                        <Title order={2} size="h3">In phiếu giao hàng</Title>
                    </Group>
                    <Text c="dimmed" size="sm">
                        In phiếu giao hàng cho đơn hàng đã chọn
                    </Text>
                </Group>
            </Paper>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-9">
                    <Filter
                        initialParams={params}
                        onFilterChange={handleParamsChange}
                        onResetFilter={handleResetFilter}
                        orderCount={shippingLists.length}
                    />
                    <Card shadow="xs" p="md" radius="md" bg={"white"}>

                        <HeaderListView
                            selectAll={selectAll}
                            onSelectAll={handleSelectAll}
                        />
                        {shippingLists.length > 0 ? (
                            <>
                                <OrderPrintList
                                    shippingData={shippingLists}
                                    selectedShipping={selectedShipping}
                                    selectAll={selectAll}
                                    onSelectShipping={handleSelectShipping}
                                />

                                <Suspense fallback={<PaginationSkeleton />}>
                                    <Pagination
                                        currentPage={activePage}
                                        totalPages={totalPages}
                                        totalItems={totalCount}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </Suspense>
                            </>
                        ) : (
                            <NonOrderFound />
                        )}
                    </Card>
                </div>

                <div className="col-span-12 lg:col-span-3">
                    <div className="sticky top-20">
                        <PrintInfoForm
                            selectedShipping={selectedShipping}
                            isPrinting={isPrinted}
                            onPrint={handlePrintShipping}
                        />
                        <PrintInfoPage />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default OrderPrintPage;