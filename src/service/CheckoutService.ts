import { API_ENDPOINTS } from "../constant";
import type { CheckoutRequestDto, CheckoutResponseDto } from "../types/CheckoutType";
import type { CheckoutInfoDto } from "../types/ShipmentType";
import type { PaymentResultData } from "../types/PaymentResultType";
import { axiosInstance } from "./AxiosInstant";

export type ItemsCheckoutRequest = Record<string, number>; 

const getCheckoutInfo = async (itemsCheckoutRequest: ItemsCheckoutRequest): Promise<CheckoutInfoDto[]> => {
    const response = await axiosInstance.post(API_ENDPOINTS.CHECKOUT.GET, itemsCheckoutRequest)
    return response.data;
};

const createCheckout = async (CheckoutRequestDto: CheckoutRequestDto): Promise<CheckoutResponseDto> => {
    const response = await axiosInstance.post(API_ENDPOINTS.CHECKOUT.CREATE, CheckoutRequestDto);
    return response.data;
};

const getOrderResult = async (orderId: string): Promise<PaymentResultData> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENT.RESULT(orderId));
    return response.data;
};

export const CheckoutService = {
    getCheckoutInfo,
    createCheckout,
    getOrderResult,
}