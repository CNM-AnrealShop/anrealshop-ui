import { useCallback, useEffect, useState } from 'react';
import showErrorNotification from '../components/Toast/NotificationError';
import showSuccessNotification from '../components/Toast/NotificationSuccess';
import type { TypeMode } from '../constant';
import { productStatusDefaultData, productStatusDefaultDataAdmin } from '../data/ProductData';
import ProductsService from '../service/ProductsService';
import type {
    MyShopProductDto,
    MyShopProductListResponse,
    ProductStatus,
    ProductStatusDto,
    UserProductDto
} from '../types/ProductType';
import { getErrorMessage } from '../untils/ErrorUntils';
import { formatDateForBe, getDefaultDateRange_Now_Yesterday } from '../untils/Untils';


export interface UseProductParams {
    page?: number;
    limit?: number;
    status?: ProductStatus;
    search?: string;
    categoryId?: string;
    sortBy?: string;
    dateRange?: [Date | null, Date | null];
    // ---- user product specific ----
    minPrice?: number;
    maxPrice?: number;
    brands?: string[];
    rating?: number;
    colors?: string[];
    sizes?: string[];
    origins?: string[];
    genders?: string[];
    
}
interface UseProductOptions {
    mode?: TypeMode;
    autoFetch?: boolean;
    initialParams?: UseProductParams;
}

interface UseProductState {
    products: MyShopProductDto[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
    isEmpty: boolean;
}

export const useProduct = (options: UseProductOptions = {}) => {
    const { autoFetch = false, initialParams, mode = 'myshop' } = options;

    const [state, setState] = useState<UseProductState>({
        products: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        isLoading: false,
        error: null,
        isEmpty: true
    });

    const [statusMetadata, setStatusMetadata] = useState<ProductStatusDto[]>(mode === 'admin' ? productStatusDefaultDataAdmin : productStatusDefaultData);

    const fetchProducts = useCallback(async (params?: UseProductParams) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            error: null
        }));
        try {
            var response: MyShopProductListResponse = {
                totalCount: 0,
                totalPages: 0,
                currentPage: 0,
                products: []
            };
            if (mode === 'admin') {
                response = await ProductsService.getMyShopProductsAdmin(params);
            } else if (mode === 'myshop') {
                response = await ProductsService.getMyShopProducts(params);
            }
            setState(prev => ({
                ...prev,
                products: response.products || [],
                totalCount: response.totalCount || 0,
                totalPages: response.totalPages || 0,
                currentPage: (params?.page || 0) + 1,
                isLoading: false,
                error: null,
                isEmpty: !response.products || response.products.length === 0
            }));

            return response;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);

            setState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
                products: [],
                totalCount: 0,
                totalPages: 0,
                isEmpty: true
            }));

            showErrorNotification('Lỗi tải sản phẩm', errorMessage);
            throw err;
        }
    }, []);



    const updateVisibility = useCallback(async (id: string, visible: boolean) => {
        try {
            await ProductsService.updateVisibility(id, visible);
            const statusText = visible ? 'hiển thị' : 'ẩn';
            showSuccessNotification('Thành công', `Sản phẩm đã được ${statusText}.`);

            setState(prev => ({
                ...prev,
                products: prev.products.map(p =>
                    p.id === id ? { ...p, visible } : p
                )
            }));

            return true;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi cập nhật sản phẩm', errorMessage);
            throw err;
        }
    }, []);

    const updateVisibilityMultible = useCallback(async (ids: string[], visible: boolean) => {
        try {
            await ProductsService.updateProductsVisibility(ids, visible);
            const statusText = visible ? 'hiển thị' : 'ẩn';
            showSuccessNotification('Thành công', `Sản phẩm đã được ${statusText}.`);

            for (const id of ids) {
                setState(prev => ({
                    ...prev,
                    products: prev.products.map(p =>
                        p.id === id ? { ...p, visible } : p
                    )
                }));
            }

            return true;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi cập nhật sản phẩm', errorMessage);
            throw err;
        }
    }, []);



    const refresh = useCallback(async (params?: {
        page?: number;
        limit?: number;
        status?: ProductStatus;
        search?: string;
        categoryId?: string;
        sortBy?: string;
    }) => {
        return fetchProducts(params || initialParams);
    }, [fetchProducts, initialParams]);

    // Reset state
    const reset = useCallback(() => {
        setState({
            products: [],
            totalCount: 0,
            totalPages: 0,
            currentPage: 1,
            isLoading: false,
            error: null,
            isEmpty: true
        });
    }, []);

    const fetchStatusMetadata = useCallback(async (date?: [Date | null, Date | null]) => {
        try {
            if (mode === 'admin') {
                const [startDate, endDate] = date || getDefaultDateRange_Now_Yesterday();
                const metadata = await ProductsService.getProductStatusMetadata_admin(formatDateForBe(startDate), formatDateForBe(endDate));
                setStatusMetadata(metadata);
                return metadata;
            } else if (mode === 'myshop') {
                const metadata = await ProductsService.getProductStatusMetadata();
                setStatusMetadata(metadata);
                return metadata;
            }
        } catch (err: any) {
            setStatusMetadata(productStatusDefaultData);
            return productStatusDefaultData;
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchProducts(initialParams);
        }
    }, [autoFetch, fetchProducts, initialParams]);

    return {
        // State
        ...state,
        statusMetadata,

        // Actions
        fetchProducts,
        fetchStatusMetadata,
        updateVisibility,
        updateVisibilityMultible,
        refresh,
        reset,

        // Computed values 
        hasProducts: state.products.length > 0,
        hasError: !!state.error,
        hasNextPage: state.currentPage < state.totalPages,
        hasPrevPage: state.currentPage > 1,
    };
};

export const useProductDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const deleteProduct = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            await ProductsService.deleteProduct(id);
            showSuccessNotification('Thành công', 'Sản phẩm đã được xóa thành công.');

            return true;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi xóa sản phẩm', errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);
    const deleteProducts = useCallback(async (ids: string[]) => {
        try {
            setIsLoading(true);
            await ProductsService.deleteProducts(ids);
            showSuccessNotification('Thành công', 'Sản phẩm đã được xóa thành công.');
            return true;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi xóa sản phẩm', errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);
    return {
        deleteProduct,
        deleteProducts,
        isLoading
    };
}

export const useProductApproval = () => {
    const [isLoading, setIsLoading] = useState(false);
    const approvalProduct = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            await ProductsService.approveProduct(id);
            showSuccessNotification('Thành công', 'Sản phẩm đã được phê duyệt thành công.');
            return true;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi phê duyệt sản phẩm', errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const rejectProduct = useCallback(async (id: string, reason: string) => {
        try {
            setIsLoading(true);
            await ProductsService.rejectProduct(id, reason);
            showSuccessNotification('Thành công', 'Sản phẩm đã được từ chối thành công.');
            return true;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi từ chối sản phẩm', errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [])

    return {
        isLoading,
        approvalProduct,
        rejectProduct
    }
}

export const useGetProduct = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getProductById = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const result = await ProductsService.getProductById(id);
            return result;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi tải sản phẩm', errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getListRecommended = useCallback(async (params?: UseProductParams) => {
        setIsLoading(true);
        try {
            console.log('getListRecommended params:', params);
            const result: UserProductDto[] = await ProductsService.getListRecommended(params);
            console.log('getListRecommended result:', result);
            return result;
            return [];
        } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            showErrorNotification('Lỗi tải sản phẩm', errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getProductById,
        getListRecommended
    };
}
