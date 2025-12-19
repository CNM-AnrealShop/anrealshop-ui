import type { EnhancedStore } from '@reduxjs/toolkit';
import axios, { type AxiosRequestConfig } from 'axios';
import showErrorNotification from '../components/Toast/NotificationError';
import { APP_ROUTES_PUBLIC, BASE_API_URL } from '../constant';
import type { ErrorResponseDto } from '../types/CommonType';
import authService from './AuthService';


const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
const axiosNoAuthInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosNoWithCredInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any | null, success = false) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (success) {
      resolve(null);
    } else {
      reject(error);
    }
  });
  failedQueue = [];
};

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

    showErrorNotification("Thông báo", "Phiên đăng nhập của bạn đã hết hạn. Đăng nhập lại trong giây lát...");

    setTimeout(() => {
      window.location.href = `/login?redirect=${returnUrl}`;
    }, 3000);
  };
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
      const statusCode = error.response?.status;
      const errorResponseData: ErrorResponseDto | undefined = error.response?.data;

      if (statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            failedQueue.push({ resolve, reject: () => { } });
          }).then(() => axiosInstance(originalRequest));
        }

        isRefreshing = true;

        try {
          await authService.refreshToken();
          processQueue(null, true);
          return axiosInstance(originalRequest);
        } catch {
          processQueue(null, false);
          redirectToLoginWithDelay();
          return Promise.reject(new Error('Phiên làm việc hết hạn.'));
        } finally {
          isRefreshing = false;
        }
      }

      if (statusCode === 401) {
        redirectToLoginWithDelay();
        return Promise.resolve({ data: null });
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

export { axiosInstance, axiosNoAuthInstance, axiosNoWithCredInstance };
