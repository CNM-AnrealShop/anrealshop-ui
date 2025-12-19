import { API_ENDPOINTS } from "../constant";
import type { ShopCreateRequest } from "../types/ShopType";
import { axiosInstance } from "./AxiosInstant";

const createShop = async (shopData: ShopCreateRequest) => {
    const response = await axiosInstance.post(
        `${API_ENDPOINTS.SHOPS.REGISTER}`, shopData
    ); 
    return response.data;
}

const ShopService = {
    createShop
};

export default ShopService;