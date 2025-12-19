import { API_ENDPOINTS } from "../constant";
import type { CartShippingFee } from "../types/ShipmentType";
import type { shipParams } from "../hooks/useShipping";
import type { BaseCreateShipmentRequest, CheckoutShippingFee, CreateShipmentRequest, MyShopShippingListResponse } from "../types/ShipmentType";
import { axiosInstance } from "./AxiosInstant";

const getFeeForCart = async (cartItemIds: string[]): Promise<CartShippingFee[]> => {
  const response = await axiosInstance.post(API_ENDPOINTS.SHIPMENT.GET_SHIPPING_FEE_FORCART, cartItemIds);
  return response.data;
};

const getFeeForCheckout = async (checkoutShippingFee: CheckoutShippingFee): Promise<CartShippingFee[]> => {
  const response = await axiosInstance.post(API_ENDPOINTS.SHIPMENT.GET_SHIPPING_FEE_FORCHECKOUT, checkoutShippingFee);
  return response.data;
};

const createShipments = async (createShipmentRequest: CreateShipmentRequest): Promise<void> => {
  await axiosInstance.put(API_ENDPOINTS.SHIPMENT.CREATE_SHIPMENTS, createShipmentRequest);
}

const createShipmentForShopOrder = async (orderId: string, createShipmentRequest: BaseCreateShipmentRequest): Promise<void> => {
  await axiosInstance.put(`${API_ENDPOINTS.SHIPMENT.CREATE_SHIPMENTS}/${orderId}`, createShipmentRequest);
}


const getMyShopShipping = async (params?: shipParams): Promise<MyShopShippingListResponse> => {
  const response = await axiosInstance.get(API_ENDPOINTS.SHIPMENT.MYSHOP_LIST, { params });
  return response.data;
};

const rejectMyshopShipping = async (shippingId: string, reason: string): Promise<void> => {
  await axiosInstance.put(`${API_ENDPOINTS.SHIPMENT.MYSHOP_REJECT(shippingId)}`, reason);
};

export const ShipmentService = {
  getFeeForCart,
  getFeeForCheckout,
  createShipments,
  createShipmentForShopOrder,
  getMyShopShipping,
  rejectMyshopShipping,
};