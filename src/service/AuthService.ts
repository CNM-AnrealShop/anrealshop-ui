import { API_ENDPOINTS } from '../constant';
import type { HistoryLoginDto, LoginRequest, LoginResponse } from '../types/AuthType';
import type { ShopDto } from '../types/ShopType';
import type { ProfileRequest, RegisterRequest, UserDto } from '../types/UserType';
import { axiosInstance, axiosNoAuthInstance } from './AxiosInstant';

const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosNoAuthInstance.post<LoginResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    loginRequest
  );
  return response.data;
};

const register = async (registerRequest: RegisterRequest): Promise<string> => {
  const response = await axiosNoAuthInstance.post<string>(
    API_ENDPOINTS.USERS.REGISTER,
    registerRequest
  );
  return response.data;
};

const refreshToken = async (): Promise<void> => {
  const response = await axiosNoAuthInstance.post(API_ENDPOINTS.AUTH.REFRESH);
  return response.data;
};


const logout = async (): Promise<void> => {
  const response = await axiosNoAuthInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
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
  refreshToken,
  getProfile,
  updateProfile,
  logout,
  register,
  getShopInfo,
  verifyEmail,
  getHistoryLogin,
};

export default authService;