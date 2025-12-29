import { API_ENDPOINTS, BASE_API_URL } from '../constant';
import type { HistoryLoginDto, LoginRequest, LoginResponse } from '../types/AuthType';
import type { ShopDto } from '../types/ShopType';
import type { ProfileRequest, RegisterRequest, UserDto } from '../types/UserType';
import { axiosInstance } from './AxiosInstant';

const SANCTUM_BASE_URL = BASE_API_URL.replace('/api', '');

const getCsrfCookie = async (): Promise<void> => {
  await axiosInstance.get('/sanctum/csrf-cookie', {
    baseURL: SANCTUM_BASE_URL 
  });
};

const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  await getCsrfCookie();
  const response = await axiosInstance.post<LoginResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    loginRequest,
  );

  return response.data;
};

const register = async (registerRequest: RegisterRequest): Promise<string> => {
  await getCsrfCookie();
  const response = await axiosInstance.post<string>(
    API_ENDPOINTS.USERS.REGISTER,
    registerRequest
  );
  return response.data;
};

const logout = async (): Promise<void> => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};


const getProfile = async (): Promise<UserDto> => {
  const response = await axiosInstance.get<UserDto>(API_ENDPOINTS.USERS.ME);
  return response.data;
};

const updateProfile = async (profileData: ProfileRequest): Promise<UserDto> => {
  const response = await axiosInstance.put<UserDto>(
    API_ENDPOINTS.USERS.UPDATE_PROFILE,
    profileData
  );
  return response.data;
};

const verifyEmail = async (code: string): Promise<UserDto> => {
  const response = await axiosInstance.put<UserDto>(
    API_ENDPOINTS.USERS.VERIFY_EMAIL, {},
    { params: { code } }
  );
  return response.data;
};


const getShopInfo = async (): Promise<ShopDto> => {
  const response = await axiosInstance.get<ShopDto>(API_ENDPOINTS.SHOPS.INFO);
  return response.data;
};


const getHistoryLogin = async (): Promise<HistoryLoginDto[]> => {
  const response = await axiosInstance.get<HistoryLoginDto[]>(API_ENDPOINTS.AUTH.HISTORY_LOGIN);
  return response.data;
};


const authService = {
  login,
  getProfile,
  updateProfile,
  logout,
  register,
  getShopInfo,
  verifyEmail,
  getHistoryLogin,
};

export default authService;