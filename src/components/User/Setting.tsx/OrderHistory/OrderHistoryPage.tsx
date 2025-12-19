import {
    Stack,
    Title
} from '@mantine/core';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { OrderStatusDefaultDataUser } from '../../../../data/OrderData';
import { useOrder, type SearchType } from '../../../../hooks/useOrder';
import { useURLParams } from '../../../../hooks/useURLParams';
import type { ShopOrderStatus, UserOrderItemDto } from '../../../../types/OrderType';
import FilterByStatus from '../../../Myshop/Order/OrderPage/Filter/FilterByStatus';
import Pagination from '../../../common/PaginationCustom';
import { PaginationSkeleton } from '../../../Myshop/Product/Managerment/Skeleton';
import showSuccessNotification from '../../../Toast/NotificationSuccess';
import { ContentEmpty } from '../../../common/ContentEmpty';
import OrderFilter from './OrderFilter';
import ShopOrderItem from './ShopOrderItem';
import OrderSkeleton from './Skeleton';

const OrderHistory = () => {
    const { getParam, updateParams, setPageParam } = useURLParams();

    const [activePage, setActivePage] = useState(() => {
        const page = getParam('page');
        return page ? parseInt(page, 10) : 1;
    });

    const [activeStatus, setActiveStatus] = useState<ShopOrderStatus>(() => {
        const status = getParam('status');
        return (status as ShopOrderStatus) || "INIT_PROCESSING";
    });

    const [searchTerm, setSearchTerm] = useState(() => getParam('search') || '');
    const [searchType, setSearchType] = useState<SearchType>(() =>
        (getParam('searchType') as SearchType) || "order_code"
    );
    const [sortBy, setSortBy] = useState<string | null>(() => getParam('sortBy') || "newest");

    const [itemsPerPage] = useState(10);
    const [data, setData] = useState<UserOrderItemDto[]>([]);
    const {
        totalCount,
        totalPages,
        isLoadingOrders: isLoading,

        orders,
        fetchOrders,
        rejectShopOrder,
    } = useOrder({
        initialParams: {
            page: 0,
            limit: itemsPerPage,
            status: activeStatus,
        },
        mode: 'user',
    });

    const loadOrders = useCallback(() => {
        updateParams({
            status: activeStatus,
            search: searchTerm,
            searchType: searchType !== 'order_code' ? searchType : null,
            sortBy: sortBy !== 'newest' ? sortBy : null,
            page: activePage > 1 ? activePage : null
        });

        fetchOrders({
            page: activePage - 1,
            limit: itemsPerPage,
            status: activeStatus,
            search: searchTerm,
            searchType: searchType,
            sortBy: sortBy || undefined,
        });
    }, [activePage, activeStatus, sortBy, searchTerm, searchType, fetchOrders, updateParams]);

    useEffect(() => {
        loadOrders();
    }, [activeStatus, activePage]);

    useEffect(() => {
        setData(orders);
    }, [orders]);

    const handleStatusChange = (status: ShopOrderStatus | "all") => {
        const newStatus = status.toUpperCase() as ShopOrderStatus;
        setActiveStatus(newStatus);
        setActivePage(1);
        updateParams({ status: newStatus, page: null });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSortBy("newest");
        updateParams({
            search: null,
            searchType: null,
            sortBy: null
        });
        loadOrders();
    };

    const handleApplyFilters = () => {
        setActivePage(1);
        loadOrders();
    };

    const handlePageChange = (page: number) => {
        setActivePage(page);
        setPageParam(page);
    };

    const handleCancelOrder = useCallback((orderItemId: string, reason: string) => {
        rejectShopOrder(orderItemId, reason)
            .then(() => {
                loadOrders();
            });
    }, [rejectShopOrder, loadOrders]);

    const handleBuyAgain = (productIds: string[]) => {
        console.log('Buy again products:', productIds);
        showSuccessNotification("Hệ thống", "Chức năng mua lại đang được phát triển")
    };

    const handleReview = (productId: string) => {
        console.log('Review product:', productId);
        showSuccessNotification("Hệ thống", "Chức năng mua lại đang được phát triển")
    };

    return (
        <div className=' overflow-hidden 2xl:h-[94vh] md:h-[91vh]'>
            <Title order={4} className="!mb-4 text-slate-800">Đơn hàng của tôi</Title>

            <FilterByStatus
                selectedStatus={activeStatus}
                onStatusChange={handleStatusChange}
                orderStatusData={OrderStatusDefaultDataUser}
                isShowCount={false}
            />

            <OrderFilter
                searchTerm={searchTerm}
                searchTypeValue={searchType}
                sortBy={sortBy}
                onSearchChange={setSearchTerm}
                onSearchTypeValueChange={setSearchType}
                onSortByChange={setSortBy}
                onClearAll={handleClearFilters}
                onFetchWithParam={handleApplyFilters}
            />

            {isLoading ? (
                <OrderSkeleton count={3} />
            ) : data.length > 0 ? (
                <div className='flex flex-col 2xl:h-[80vh] md:h-[71vh]'>
                    <Stack gap="md" mt="md" className='overflow-y-scroll'>
                        {data.map((order) => (
                            <ShopOrderItem
                                key={order.shopOrderId}
                                order={order}
                                onCancelOrder={handleCancelOrder}
                                onBuyAgain={handleBuyAgain}
                                onReview={handleReview}
                                activeStatus={activeStatus}
                            />
                        ))}
                    </Stack>
                    <div className="flex-1">
                        <Suspense fallback={<PaginationSkeleton />} >
                            <Pagination
                                currentPage={activePage}
                                totalPages={totalPages}
                                totalItems={totalCount}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </Suspense>
                    </div>

                </div>
            ) : (
                <ContentEmpty
                    title="Không có đơn hàng nào"
                    description="Bạn chưa có đơn hàng thời trang nào trong danh mục này"
                    buttonText="Khám phá thời trang"
                    buttonLink="/products"
                    imageType="boan_khoan"
                    height="h-[72vh]"
                />
            )}
        </div>
    );
};

export default OrderHistory;