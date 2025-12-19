import { API_ENDPOINTS } from "../constant";
import type { AddressRequestDto } from "../types/AddressType";
import { axiosInstance } from "./AxiosInstant";


const getProvinceList = async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.ADDRESS.GET_PROVINCE_LIST);
    return res.data;
};

const getDistrictList = async (provinceId: string) => {
    const res = await axiosInstance.get(`${API_ENDPOINTS.ADDRESS.GET_DISTRICT_LIST}?provinceId=${provinceId}`);
    return res.data;
};

const getWardList = async (districtId: string) => {
    const res = await axiosInstance.get(`${API_ENDPOINTS.ADDRESS.GET_WARD_LIST}?districtId=${districtId}`);
    return res.data;
};

// User addresses
const getUserPrimaryAddress = async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.ADDRESS.USER_ADDRESS_PRIMARY);
    return res.data;
};

const getUserAddresses = async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.ADDRESS.USER_ADDRESS_ALL);
    return res.data;
};

const createUserAddress = async (addressDto: AddressRequestDto) => {
    const res = await axiosInstance.post(API_ENDPOINTS.ADDRESS.USER_ADDRESS_CREATE, addressDto);
    return res.data;
};

const updateUserAddress = async (id: string, addressDto: AddressRequestDto) => {
    const res = await axiosInstance.put(API_ENDPOINTS.ADDRESS.USER_ADDRESS_UPDATE(id), addressDto);
    return res.data;
};

const deleteUserAddress = async (id: string) => {
    const res = await axiosInstance.delete(API_ENDPOINTS.ADDRESS.USER_ADDRESS_DELETE(id));
    return res.data;
};

// Shop addresses
const getShopPrimaryAddress = async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.ADDRESS.SHOP_ADDRESS_PRIMARY);
    return res.data;
};

const getShopAddresses = async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.ADDRESS.SHOP_ADDRESS_ALL);
    return res.data;
};

const createShopAddress = async (addressDto: AddressRequestDto) => {
    const res = await axiosInstance.post(API_ENDPOINTS.ADDRESS.SHOP_ADDRESS_CREATE, addressDto);
    return res.data;
};

const updateShopAddress = async (id: string, addressDto: AddressRequestDto) => {
    const res = await axiosInstance.put(API_ENDPOINTS.ADDRESS.SHOP_ADDRESS_UPDATE(id), addressDto);
    return res.data;
};

const deleteShopAddress = async (id: string) => {
    const res = await axiosInstance.delete(API_ENDPOINTS.ADDRESS.SHOP_ADDRESS_DELETE(id));
    return res.data;
};


export const AddressService = {
    // geo lists
    getProvinceList,
    getDistrictList,
    getWardList,
    // user
    getUserPrimaryAddress,
    getUserAddresses,
    createUserAddress,
    updateUserAddress,
    deleteUserAddress,
    // shop
    getShopPrimaryAddress,
    getShopAddresses,
    createShopAddress,
    updateShopAddress,
    deleteShopAddress,
};