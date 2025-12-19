import { API_ENDPOINTS } from "../constant";
import type { AttributeForShop } from "../types/AttributeType";
import { axiosInstance } from "./AxiosInstant";

const getAttributeForShop = async (): Promise<AttributeForShop> => {
    const response = await axiosInstance.get(
        `${API_ENDPOINTS.ATTRIBUTES.ATTRIBUTE_FOR_SHOP}`
    )
    return response.data;
}

const AttributeService = {
    getAttributeForShop,
}

export default AttributeService;