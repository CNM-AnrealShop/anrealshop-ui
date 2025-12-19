import { Box, Group, Pagination, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useProduct, useProductApproval } from '../../../hooks/useProduct';
import type { MyShopProductDto, ProductStatus } from '../../../types/ProductType';
import { getDefaultDateRange_Now_Yesterday } from '../../../untils/Untils';
import Filter from './Filter';
import ProductList from './ProductList';
import RejectModal from './RejectModal';
import ProductReviewModal from './Review/ProductReviewModal';
import { useLocation, useNavigate } from 'react-router-dom';



const ProductApprovalPage = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const getInitialStateFromUrl = () => {
        const params = new URLSearchParams(location.search);

        const pageFromUrl = params.get('page');
        const initialPage = pageFromUrl ? parseInt(pageFromUrl) : 1;

        const statusFromUrl = params.get('status');
        const initialTab = statusFromUrl || 'ALL';

        const searchFromUrl = params.get('search') || '';

        let initialDateRange = getDefaultDateRange_Now_Yesterday();
        const startDateStr = params.get('startDate');
        const endDateStr = params.get('endDate');

        if (startDateStr && endDateStr) {
            try {
                const startDate = new Date(startDateStr);
                const endDate = new Date(endDateStr);
                if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                    initialDateRange = [startDate, endDate];
                }
            } catch (e) {
                console.error('Invalid date format in URL');
            }
        }

        return {
            page: initialPage,
            tab: initialTab,
            search: searchFromUrl,
            dateRange: initialDateRange
        };
    };

    const initialState = getInitialStateFromUrl();

    const [selectedProduct, setSelectedProduct] = useState<MyShopProductDto | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [activeTab, setActiveTab] = useState(initialState.tab);
    const [searchTerm, setSearchTerm] = useState(initialState.search);
    const [page, setPage] = useState(initialState.page);
    const [date, setDate] = useState<[Date | null, Date | null]>(initialState.dateRange);

    const { approvalProduct, rejectProduct, isLoading: actionLoading } = useProductApproval();


    const {
        products,
        totalPages,
        currentPage,
        isLoading,
        fetchProducts,
        fetchStatusMetadata,
        statusMetadata
    } = useProduct({
        mode: 'admin',
        autoFetch: false,
        initialParams: {
            page: 0,
            status: 'ALL' as ProductStatus,
            limit: 40,
            dateRange: getDefaultDateRange_Now_Yesterday()
        }
    });

    const updateUrlParams = useCallback(() => {
        const params = new URLSearchParams();
        if (page > 1) {
            params.set('page', page.toString());
        }

        if (activeTab !== 'ALL') {
            params.set('status', activeTab);
        }
        if (searchTerm) {
            params.set('search', searchTerm);
        }

        if (date[0] && date[1]) {
            params.set('startDate', date[0].toISOString().split('T')[0]);
            params.set('endDate', date[1].toISOString().split('T')[0]);
        }

        const query = params.toString();
        const newUrl = query ? `${location.pathname}?${query}` : location.pathname;
        navigate(newUrl, { replace: true });
    }, [navigate, location.pathname, page, activeTab, searchTerm, date]);


    const fetchProductData = useCallback(() => {
        updateUrlParams();
        fetchStatusMetadata(date)
        return fetchProducts({
            page: page - 1,
            status: (activeTab === 'ALL' ? undefined : activeTab) as ProductStatus,
            search: searchTerm,
            limit: 10,
            dateRange: date
        });
    }, [fetchProducts, activeTab, searchTerm, date]);


    useEffect(() => {
        fetchProductData();
    }, [page]);

    useEffect(() => {
        setPage(1);
        fetchProductData();
    }, [activeTab])

    const handleApplyFilters = () => {
        fetchProductData();
    };

    const resetFilters = () => {
        const defaultRange = getDefaultDateRange_Now_Yesterday();
        setDate(defaultRange);
        setActiveTab('ALL');
        setSearchTerm('');
        setPage(1);
        fetchProductData();
    };

    const handleTabChange = (tab: string | null) => {
        if (tab === null) return;
        setActiveTab(tab);
    };

    // Modals
    const [reviewModalOpened, { open: openReviewModal, close: closeReviewModal }] = useDisclosure(false);
    const [rejectModalOpened, { open: openRejectModal, close: closeRejectModal }] = useDisclosure(false);

    // Handle approve product
    const handleApprove = async (productId: string | null) => {
        if (!productId) return;
        await approvalProduct(productId)
            .then(() => {
                fetchProductData();
            })
    };

    // Handle reject product
    const handleReject = async () => {
        if (!selectedProduct) return;

        await rejectProduct(selectedProduct.id, rejectionReason)
            .then(() => {
                fetchProductData();
            })
            .finally(() => {
                closeRejectModal();
                setSelectedProduct(null);
                setRejectionReason('');
            })
    };

    const openProductReview = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setSelectedProduct(product);
            openReviewModal();
        }
    };

    const closeProductReview = () => {
        setSelectedProduct(null);
        closeReviewModal();
        fetchProductData();
    };

    const closeRejectModalFc = () => {
        closeRejectModal();
        fetchProductData();
    };

    const handleViewRejectionReason = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (product && product.restrictedReason) {
            setSelectedProduct(product);
            setRejectionReason(product.restrictedReason);
            openRejectModal();
        }
    };

    return (
        <Box>
            <Paper p="md" radius="md" withBorder mb="md">
                <Filter
                    date={date}
                    searchTerm={searchTerm}
                    activeTab={activeTab}
                    productStatusData={statusMetadata}
                    onDateChange={setDate}
                    onSearchChange={setSearchTerm}
                    onTabChange={handleTabChange}
                    onResetFilters={resetFilters}
                    onApplyFilters={handleApplyFilters}
                />

                <ProductList
                    products={products}
                    onViewProduct={openProductReview}
                    onApproveProduct={handleApprove}
                    onRejectProduct={(productId) => {
                        setSelectedProduct(products.find(p => p.id === productId) || null);
                        setRejectionReason('');
                        closeReviewModal();
                        openRejectModal();
                    }}
                    onViewRejectionReason={handleViewRejectionReason}
                    loading={isLoading}
                />

                <Group justify="flex-end" mt="md">
                    <Pagination
                        total={totalPages}
                        value={currentPage}
                        onChange={setPage}
                        size="sm"
                    />
                </Group>
            </Paper>

            <ProductReviewModal
                opened={reviewModalOpened}
                onClose={closeProductReview}
                product={selectedProduct}
                onApprove={approvalProduct}
                loading={actionLoading}
                onReject={() => {
                    closeReviewModal();
                    openRejectModal();
                }}
            />

            <RejectModal
                opened={rejectModalOpened}
                onClose={closeRejectModalFc}
                onReject={handleReject}
                rejectionReason={rejectionReason}
                onReasonChange={setRejectionReason}
                existsProductReason={selectedProduct?.restrictedReason ? true : false}
                isViolation={selectedProduct?.status === 'VIOLATION'}
                onApprove={() => handleApprove(selectedProduct?.id || null)}
            />

        </Box>
    );
};

export default ProductApprovalPage;