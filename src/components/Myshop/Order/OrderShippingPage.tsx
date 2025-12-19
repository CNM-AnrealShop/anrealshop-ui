import {
  Anchor, Box, Breadcrumbs, Container,
  Group, Paper, Text, Title
} from '@mantine/core';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronRight, FiTruck } from 'react-icons/fi';
import { useAppSelector } from '../../../hooks/useAppRedux';
import { useOrder, type OrderCountType, type PreparingStatus, type SearchType, type UseOrderParams } from '../../../hooks/useOrder';
import { useShipping } from '../../../hooks/useShipping';
import { useURLParams } from '../../../hooks/useURLParams';
import type { OrderItemDto } from '../../../types/OrderType';
import type { CreateShipmentRequest } from '../../../types/ShipmentType';
import { formatDateForBe, getDefaultDateRange_Now_Yesterday } from '../../../untils/Untils';
import Pagination from '../../common/PaginationCustom';
import { PaginationSkeleton } from '../Product/Managerment/Skeleton';
import NonOrderFound from './OrderPage/OrderView/NonOrderFond';
import Filter, { type SortByType } from './OrderShipping/Filter/Filter';
import OrderShippingProductList from './OrderShipping/OrderView/OrderShippingProductList';
import InfoPage from './OrderShipping/shopAddress/InfoPage';
import ShippingInfoForm from './OrderShipping/shopAddress/ShippingInfoForm';


const OrderShippingPage = () => {
  const { getParam, updateParams, clearParams } = useURLParams();

  const init_params: UseOrderParams = {
    orderType: (getParam('orderType', 'all') as OrderCountType),
    searchType: (getParam('searchType', 'order_code') as SearchType),
    search: getParam('search', ''),
    sortBy: (getParam('sortBy', 'newest') as SortByType),
    confirmSD: getParam('confirmSD', formatDateForBe(getDefaultDateRange_Now_Yesterday()[0])),
    confirmED: getParam('confirmED', formatDateForBe(getDefaultDateRange_Now_Yesterday()[1])),
    preparingStatus: (getParam('preparingStatus', 'all') as PreparingStatus),
  }

  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activePage, setActivePage] = useState(parseInt(getParam('page', '1'), 10));
  const [itemsPerPage] = useState(10);

  const [params, setParams] = useState<UseOrderParams>(init_params);
  const { user } = useAppSelector((state) => state.auth);
  const [data, setData] = useState<OrderItemDto[]>([]);

  const filterSectionRef = useRef<HTMLDivElement>(null);
  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      if (filterSectionRef.current) {
        const elementPosition = filterSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 79;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  const {
    totalCount,
    totalPages,
    isLoadingOrders: isLoading,

    orders,
    fetchOrders,

    rejectOrder
  } = useOrder({
    initialParams: {
      page: 0,
      limit: itemsPerPage,
      status: 'all',
    }
  });

  const { createShipping, rejectShippingItem } = useShipping();

  const loadOrders = useCallback((filterData?: UseOrderParams, page?: number) => {
    const finalPage = page || activePage;
    updateParams({
      ...filterData,
      page: finalPage.toString(),
      limit: itemsPerPage.toString(),
    });

    setParams(prevParams => ({
      ...prevParams,
      ...filterData,
    }));

    fetchOrders({
      page: finalPage - 1,
      limit: itemsPerPage,
      mode: 'shipping',
      ...params,
      ...filterData,
    });
  }, [activePage, fetchOrders, itemsPerPage, params, updateParams]);

  useEffect(() => {
    setData(orders);
  }, [orders]);

  // LOGIC SELECT ORDER
  const handleSelectAll = () => {
    if (params.preparingStatus === 'preparing') {
      setSelectedOrder(selectAll ? [] : data.flatMap(order => order.shopOrderId));
    } else {
      setSelectedOrder(selectAll ? [] : data.filter(order => order.orderStatus === 'CONFIRMED')
        .flatMap(order => order.shopOrderId));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    setSelectAll(selectedOrder.length === data.length && data.length > 0);
  }, [selectedOrder, data]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrder(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  // HANDLE ACTIONS
  const handleResetFilter = () => {
    setParams(init_params);
    setActivePage(1);
    clearParams();
    scrollToTop();
  };

  const handleActiveFilter = (filterData: UseOrderParams) => {
    setActivePage(1);
    loadOrders(filterData, 1);
    scrollToTop();
  }

  const handlePageChange = (page: number) => {
    setActivePage(page);
    loadOrders(undefined, page);
    scrollToTop();
  };

  const handleSubmitShipping = async (note: string, pickupDate: string) => {
    const createShipmentRequest: CreateShipmentRequest = {
      shopOrderIds: selectedOrder,
      addressId: user?.address?.id || '',
      note,
      pickupDate,
    };
    setIsSubmitting(true);
    createShipping(createShipmentRequest)
      .then(() => {
        setIsSubmitting(false);
        loadOrders();
        setSelectedOrder([]);
      })
  }

  const handleRejectOrder = useCallback(async (shippingId: string, reason: string) => {
    rejectShippingItem(shippingId, reason)
      .then(() => {
        loadOrders();
      })
  }, [rejectOrder]);


  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/myshop' },
    { title: 'Quản lý đơn hàng', href: '/myshop/orders' },
    { title: 'Giao hàng loạt', href: '#' },
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
            <FiTruck size={24} className="text-primary" />
            <Title order={2} size="h3">Giao hàng loạt</Title>
          </Group>
          <Text c="dimmed" size="sm">
            Tạo và quản lý đơn giao hàng cho nhiều sản phẩm cùng lúc
          </Text>
        </Group>
      </Paper>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-9" ref={filterSectionRef}>
          <Filter
            initialParams={params}
            onFilterChange={handleActiveFilter}
            onResetFilter={handleResetFilter}
            orderCount={data.length}
          />
          {data.length > 0 ? (
            <>
              <OrderShippingProductList
                orders={orders}
                selectedOrder={selectedOrder}
                preparingStatus={params.preparingStatus}
                selectAll={selectAll}
                isLoading={isLoading}
                onSelectAll={handleSelectAll}
                onSelectOrder={handleSelectOrder}
                onCancelOrder={handleRejectOrder}
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
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-20">
            <ShippingInfoForm
              shopAddress={user?.address}
              countOrderItems={selectedOrder.length}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmitShipping}
              preparingStatus={params.preparingStatus}
            />
            <InfoPage />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderShippingPage;