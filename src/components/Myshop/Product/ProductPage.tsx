import { Anchor, Box, Breadcrumbs, Container, Group, Paper, Text, Title } from '@mantine/core';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { FiChevronRight, FiShoppingBag } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import type { BaseCategoryDto } from '../../../types/CategoryType';
import type { ProductStatus } from '../../../types/ProductType';
import {
  CheckboxSelectedSkeleton,
  FilterControlsSkeleton,
  OptionConfigSkeleton,
  PaginationSkeleton,
  ProductGridSkeleton,
  ProductListSkeleton,
  StatusFilterSkeleton,
} from './Managerment/Skeleton';

const FilterByStatus = lazy(() => import('./Managerment/Filter/FilterByStatus'));
const OptionConfig = lazy(() => import('./Managerment/OptionConfig/OptionConfig'));
const FilterProduct = lazy(() => import('./Managerment/Filter/FilterProduct'));
const CheckboxSelected = lazy(() => import('./Managerment/ProductView/CheckboxSelected'));
const GridView = lazy(() => import('./Managerment/ProductView/GridView/GridView'));
const ListView = lazy(() => import('./Managerment/ProductView/ListView/ListView'));
const NonProductFound = lazy(() => import('./Managerment/ProductView/NonProductFound'));
const Pagination = lazy(() => import('../../common/PaginationCustom'));

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>(
    (searchParams.get('view') as 'grid' | 'list') || 'grid'
  );

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState<BaseCategoryDto | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(searchParams.get('sortBy') || null);
  const [status, setStatus] = useState<ProductStatus>(
    (searchParams.get('status') as ProductStatus) || 'ALL'
  );

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [activePage, setActivePage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );

  const updateURLParams = useCallback((updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'ALL') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const {
    products,
    statusMetadata,
    totalCount,
    totalPages,
    isLoading,
    isEmpty,
    fetchProducts,
    fetchStatusMetadata,
    updateVisibility,
    updateVisibilityMultible,
  } = useProduct({
    autoFetch: false,
    mode: 'myshop',
    initialParams: {
      page: 0,
      limit: viewMode === 'list' ? 10 : 12,
      status: status !== 'ALL' ? status : undefined
    }
  });

  const loadProducts = useCallback(() => {
    updateURLParams({
      search: searchQuery || null,
      categoryId: category?.urlSlug || category?.id || null,
      categoryName: category?.name || null,
      categoryPath: category?.urlPath || null,
      sortBy: sortBy || null,
      page: activePage.toString(),
      status: status !== 'ALL' ? status : null,
      view: viewMode
    });

    fetchProducts({
      page: activePage - 1,
      limit: viewMode === 'list' ? 10 : 12,
      status: status !== 'ALL' ? status : undefined,
      search: searchQuery || undefined,
      categoryId: category?.urlSlug || category?.id || undefined,
      sortBy: sortBy || undefined
    });
    setSelectedProductIds([]);
  }, [activePage, viewMode, status, searchQuery, category?.id, category?.urlSlug, sortBy, fetchProducts, updateURLParams]);


  useEffect(() => {
    const categoryParam = searchParams.get('categoryId');
    if (categoryParam && !category) {
      setCategory({
        id: categoryParam,
        name: searchParams.get('categoryName') || '',
        urlPath: searchParams.get('categoryPath') || '',
        urlSlug: categoryParam,
      } as BaseCategoryDto);
    }
  }, [searchParams, category]);

  useEffect(() => {
    loadProducts();
  }, [status, activePage]);

  useEffect(() => {
    fetchStatusMetadata();
  }, [fetchStatusMetadata]);


  const handleStatusChange = useCallback((newStatus: ProductStatus) => {
    setStatus(newStatus);
    setActivePage(1);
  }, [updateURLParams]);

  const handleViewModeChange = useCallback((newViewMode: 'grid' | 'list') => {
    setViewMode(newViewMode);
    updateURLParams({
      view: newViewMode
    });
  }, [updateURLParams]);

  const handleSearchChange = useCallback((newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  }, [updateURLParams]);

  const handleCategoryChange = useCallback((newCategory: BaseCategoryDto | null) => {
    setCategory(newCategory);
  }, [updateURLParams]);

  const handleSortChange = useCallback((newSortBy: string | null) => {
    setSortBy(newSortBy);
  }, [updateURLParams]);

  const handlePageChange = useCallback((newPage: number) => {
    setActivePage(newPage);
  }, [updateURLParams]);

  const onFetchWithParam = useCallback(() => {
    setActivePage(1);
    loadProducts();
  }, [searchQuery, category, sortBy, updateURLParams, loadProducts]);

  const handleClearAll = useCallback(() => {
    setSearchQuery('');
    setCategory(null);
    setSortBy(null);

    const newParams = new URLSearchParams();
    const viewMode = searchParams.get('view') || 'grid';
    const currentStatus = searchParams.get('status') || 'ALL';

    newParams.set('view', viewMode);
    if (currentStatus !== 'ALL') {
      newParams.set('status', currentStatus);
    }

    setSearchParams(newParams, { replace: true });

    fetchProducts({
      page: 0,
      limit: viewMode === 'list' ? 10 : 12,
      status: status !== 'ALL' ? status : undefined
    });
    setSelectedProductIds([]);
  }, [searchParams, setSearchParams, status, fetchProducts]);


  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProductIds(products.map(p => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProductIds(prev => [...prev, productId]);
    } else {
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
    }
  };

  const handleToggleStatus = useCallback((productId: string, visible: boolean) => {
    updateVisibility(productId, visible)
      .then(() => {
        fetchStatusMetadata();
        loadProducts();
      })
  }, [loadProducts, updateVisibility]);

  const handleRefresh = useCallback(() => {
    fetchStatusMetadata();
    loadProducts();
  }, [fetchStatusMetadata, loadProducts]);

  // Breadcrumb items
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/myshop' },
    { title: 'Quản lý sản phẩm', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm">
      {item.title}
    </Anchor>
  ));

  return (
    <Container fluid px="lg" py="md">
      {/* Page Header */}
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
            <FiShoppingBag size={24} className="text-primary" />
            <Title order={2} size="h3">Quản lý sản phẩm</Title>
          </Group>
          <Text c="dimmed" size="sm">
            Quản lý và tổ chức toàn bộ danh sách sản phẩm của bạn
          </Text>
        </Group>
      </Paper>

      {/* Options and Configs */}
      <Paper
        shadow="xs"
        p="md"
        mb="md"
        radius="md"
        className="bg-white"
      >
        <Suspense fallback={<OptionConfigSkeleton />}>
          <OptionConfig
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        </Suspense>
      </Paper>

      {/* Filters */}
      <Paper
        shadow="xs"
        mb="md"
        radius="md"
        className="bg-white"
      >
        <Suspense fallback={<StatusFilterSkeleton />}>
          <FilterByStatus
            selectedStatus={status}
            onStatusChange={handleStatusChange}
            productStatusData={statusMetadata}
          />
        </Suspense>
        <Suspense fallback={<FilterControlsSkeleton />}>
          <FilterProduct
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onFetchWithParam={onFetchWithParam}
            onClearAll={handleClearAll}
          />
        </Suspense>

        {isEmpty && !isLoading && (
          <NonProductFound
            searchQuery={searchQuery}
            category={category}
          />
        )}

        {!isEmpty && (
          <div className={viewMode === 'list' ? 'pl-8 pr-4' : 'pl-6 pr-4'}>
            <Suspense fallback={<CheckboxSelectedSkeleton />}>
              <CheckboxSelected
                selectedProductIds={selectedProductIds}
                products={products}
                updateVisibilityMultible={updateVisibilityMultible}
                onSelectAll={handleSelectAll}
                onRefresh={handleRefresh}
              />
            </Suspense>
          </div>
        )}

        {viewMode === 'list' && !isEmpty ? (
          <Suspense fallback={<ProductListSkeleton />}>
            <ListView
              products={products}
              isLoading={isLoading}
              selectedProducts={selectedProductIds}
              onSelectAll={handleSelectAll}
              onSelectProduct={handleSelectProduct}
              onToggleStatus={handleToggleStatus}
              onRefresh={handleRefresh}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<ProductGridSkeleton />}>
            <GridView
              products={products}
              isLoading={isLoading}
              selectedProducts={selectedProductIds}
              onSelectAll={handleSelectAll}
              onSelectProduct={handleSelectProduct}
              onToggleStatus={handleToggleStatus}
              onRefresh={handleRefresh}
            />
          </Suspense>
        )}

        <Suspense fallback={<PaginationSkeleton />}>
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            totalItems={totalCount}
            itemsPerPage={viewMode === 'list' ? 10 : 12}
            onPageChange={handlePageChange}
          />
        </Suspense>
      </Paper>
    </Container>
  );
};

export default ProductPage;