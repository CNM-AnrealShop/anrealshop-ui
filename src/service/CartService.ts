import { API_ENDPOINTS } from "../constant";
import type { CartAddItemDto } from "../types/CartType";
import { axiosInstance } from "./AxiosInstant";


const getCart = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.CART.GET);
    return response.data;
}

const addItemToCart = async (cartItemDto: CartAddItemDto) => {
    const response = await axiosInstance.post(API_ENDPOINTS.CART.ADD_ITEM, cartItemDto);
    return response.data;
};

const removeItemFromCart = async (cartItemId: string) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.CART.REMOVE_ITEM(cartItemId));
    return response.data;
};

const clearCart = async (ids: string[]) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.CART.REMOVE_ITEMS, { data:  ids  });
    return response.data;
};

const updateQuantity = async (cartItemId: string, quantity: number) => {
    const response = await axiosInstance.put(API_ENDPOINTS.CART.UPDATE_QUANTITY, null, {
        params: {
            cartItemId,
            quantity
        }
    });
    return response.data;
}

const updateSelectedItems = async (itemIds: string[], selected: boolean) => {
    const payload = {
        itemIds,
        selected
    };
    const response = await axiosInstance.put(API_ENDPOINTS.CART.UPDATE_SELECTED, payload);
    return response.data;
}

export const CartService = {
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    updateQuantity,
    updateSelectedItems,
};