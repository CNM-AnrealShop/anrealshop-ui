import type { EnhancedStore } from '@reduxjs/toolkit';
import axios from 'axios';
import showErrorNotification from '../components/Toast/NotificationError';
import { APP_ROUTES_PUBLIC, BASE_API_URL } from '../constant';
import type { ErrorResponseDto } from '../types/CommonType';


const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const setupAxiosInterceptors = (
  store: EnhancedStore,
  logoutAction: () => { type: string }
) => {
  const redirectToLoginWithDelay = () => {
    store.dispatch(logoutAction());

    const currentPath = window.location.pathname.split('/');
    if (APP_ROUTES_PUBLIC.includes(currentPath[1] ? `/${currentPath[1]}` : '/')) {
      return;
    }

    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    
    if (window.location.pathname.includes('/login')) return;

    showErrorNotification("Thông báo", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");

    setTimeout(() => {
      window.location.href = `/login?redirect=${returnUrl}`;
    }, 1500);
  };

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getCookie('XSRF-TOKEN');
      
      if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log('Axios Error:', error);
      const statusCode = error.response?.status;
      const errorResponseData: ErrorResponseDto | undefined = error.response?.data;

      if (statusCode === 401 || statusCode === 419) {
        redirectToLoginWithDelay();
        return Promise.reject(error);
      }

      if (errorResponseData) {
        const customError = new Error(errorResponseData.message || 'Đã có lỗi xảy ra từ server.');
        (customError as any).code = errorResponseData.code;
        (customError as any).details = errorResponseData.details;
        (customError as any).traceId = errorResponseData.traceId;
        (customError as any).statusCode = statusCode;

        return Promise.reject(customError);
      }

      return Promise.reject(new Error('Mất kết nối server.'));
    }
  );
};

export { axiosInstance };