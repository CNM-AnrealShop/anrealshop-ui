import { API_ENDPOINTS } from "../constant";
import type { UseProductParams } from "../hooks/useProduct";
import type { MyShopProductDto, MyShopProductListResponse, ProductCreateRequest, ProductDetailDto, ProductStatusDto } from "../types/ProductType";
import { getParams } from "../untils/Untils";
import { axiosInstance, axiosNoWithCredInstance } from "./AxiosInstant";

const create = async (data: ProductCreateRequest) => {
    const response = await axiosInstance.post(API_ENDPOINTS.PRODUCTS.CREATE, data);
    return response.data;
}

const getProductById = async (id: string): Promise<ProductDetailDto> => {
    const response = await axiosNoWithCredInstance.get(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
    return response.data;
};

const getListFeatured = async () => {
    console.log('getListFeatured is not implemented yet');
    return [];
};
const getListNewApproval = async () => {
    console.log('getListNewApproval is not implemented yet');
    return [];
};

const getListTrending = async () => {
    console.log('getListTrending is not implemented yet');
    return [];
};

const getListRecommended = async (params?: UseProductParams) => {
    const queryParams = getParams(params || {});
    const response = await axiosNoWithCredInstance.get(`${API_ENDPOINTS.PRODUCTS.GET_RECOMMENDED_PRODUCTS}?${queryParams}`); 
    return response.data;
};


const getMyShopProducts = async (params?: UseProductParams): Promise<MyShopProductListResponse> => {
    const queryParams = getParams(params || {});
    const response = await axiosInstance.get(`${API_ENDPOINTS.PRODUCTS.GET_MY_SHOP_PRODUCTS}?${queryParams}`);
    return response.data;
};

const getMyShopProductsAdmin = async (params?: UseProductParams): Promise<MyShopProductListResponse> => {
    const queryParams = getParams(params || {});
    const response = await axiosInstance.get(`${API_ENDPOINTS.PRODUCTS.GET_PRODUCTS_ADMIN}?${queryParams}`);
    return response.data;
};

const getMyShopProductById = async (id: string): Promise<ProductCreateRequest> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.GET_MY_SHOP_PRODUCT_BY_ID(id));
    return response.data;
};

const update = async (id: string, data: ProductCreateRequest): Promise<MyShopProductDto> => {
    const response = await axiosInstance.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), data);
    return response.data;
};

const deleteProduct = async (id: string, isForce: boolean = false) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.PRODUCTS.DELETE(id), {
        params: { isForce }
    });
    return response.data;
};


const updateVisibility = async (id: string, visible: boolean) => {
    const response = await axiosInstance.put(API_ENDPOINTS.PRODUCTS.UPDATE_VISIBILITY(id), null, {
        params: { visible }
    });
    return response.data;
};


const getProductNameSuggestions = async (keyword: string): Promise<string[]> => {
    const response = await axiosInstance.get(
        `${API_ENDPOINTS.PRODUCTS.GET_MY_SHOP_SUGGEST_PRODUCT_NAME}?keyword=${encodeURIComponent(keyword)}`
    );
    return response.data;
};


const getProductStatusMetadata = async (): Promise<ProductStatusDto[]> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.GET_META_STATUS);
    return response.data;
};
const getProductStatusMetadata_admin = async (startDate: string, endDate: string): Promise<ProductStatusDto[]> => { 
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.GET_META_STATUS_ADMIN, {
        params: { startDate, endDate }
    });
    return response.data;
};


const deleteProducts = async (ids: string[]): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.PRODUCTS.DELETE_MULTIPLE, {
        data: ids
    });
};

const updateProductsVisibility = async (ids: string[], visible = true): Promise<void> => {
    await axiosInstance.put(API_ENDPOINTS.PRODUCTS.UPDATE_MULTIPLE_VISIBILITY,
        ids, { params: { visible } });
};

const rejectProduct = async (id: string, reason: string): Promise<void> => {
    await axiosInstance.put(API_ENDPOINTS.PRODUCTS.REJECT(id),
        { reason });
};

const approveProduct = async (id: string): Promise<void> => {
    await axiosInstance.put(API_ENDPOINTS.PRODUCTS.APPROVE(id));
};



const ProductsService = {
    create,
    getProductById,
    getListFeatured,
    getListNewApproval,
    getListTrending,
    getListRecommended,
    getMyShopProducts,
    getMyShopProductsAdmin,
    getMyShopProductById,
    update,
    deleteProduct,
    updateVisibility,
    getProductNameSuggestions,
    getProductStatusMetadata_admin,
    getProductStatusMetadata,
    deleteProducts,
    updateProductsVisibility,
    rejectProduct,
    approveProduct
};

export default ProductsService;