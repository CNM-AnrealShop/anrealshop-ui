import type { UserRoleType } from "../types/UserType"

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:4141/api'
export const BASE_BE_URL = import.meta.env.VITE_BASE_BE_URL || 'http://localhost:4141'
export const MAX_IMAGE_SIZE = import.meta.env.VITE_MAX_IMAGE_SIZE
export const BASE_FE_URL = import.meta.env.VITE_BASE_FE_URL
export const GOOGLE_LOGIN_URL = `${BASE_BE_URL}/oauth2/authorize/google`
export const CLOUNDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
export const CLOUNDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME



export type TypeMode = 'myshop' | 'admin' | 'user';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    FORGOT_PASSWORD: '/forgot-password',
    REFRESH: '/auth/refresh-token',
    SWITCH_TOKEN_TYPE: (type: UserRoleType) => `/auth/switch-token-type?type=${type}`,
    HISTORY_LOGIN: '/history-login',
  },
  OTP: {
    GET_OTP: '/otp/sendOtp',
    VERIFY_OTP: '/otp/verifyOTP',
  },
  USERS: {
    ME: '/user/me',
    REGISTER: '/user/register',
    PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    RESET_PASSWORD: '/user/reset-password',
    UPDATE_PROFILE: '/user/update-profile',
    VERIFY_EMAIL: '/user/verify-email',
  },
  ADMIN: {
    USER_LIST: '/admin/users',
    USER_DISABLE: (userId: string) => `/admin/users/${userId}/disable`,
    CATEGORY_LIST: '/admin/categories',
    CATEGORY_DISABLED: '/admin/categories/disabled',
    CATEGORY_ID: (categoryId: string) => `/admin/categories/${categoryId}`,
    CATEGORY_SWITCH: (categoryId: string) => `/admin/categories/${categoryId}/switch-status`,
    CATEGORY_DISPLAY: '/admin/categories/display',
  },
  SHOPS: {
    INFO: '/shops',
    REGISTER: '/shops/register',
  },
  PRODUCTS: {
    BASE: '/products',
    GET_BY_ID: (id: string) => `/public/products/${id}`,
    GET_RECOMMENDED_PRODUCTS: '/public/products',
    GET_TRENDING_PRODUCTS: 'chua phat trien',
    CREATE: '/products',
    CREATE_LIST: '/products/creates',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    DELETE_MULTIPLE: '/products',
    GET_MY_SHOP_SUGGEST_PRODUCT_NAME: '/products/suggest-my-products-by-name',
    GET_META_STATUS: '/products/filter-statuses',
    GET_META_STATUS_ADMIN: '/products/filter-statuses-admin',
    GET_MY_SHOP_PRODUCTS: '/products/my-shop',
    GET_MY_SHOP_PRODUCT_BY_ID: (id: string) => `/products/my-shop/${id}`,
    GET_PRODUCTS_ADMIN: '/products/admin',
    GET_PRODUCTS_ADMIN_BY_ID: (id: string) => `/products/admin/${id}`,
    UPDATE_VISIBILITY: (id: string) => `/products/${id}/update-visible`,
    UPDATE_MULTIPLE_VISIBILITY: '/products/update-visible-multiple',
    REJECT: (id: string) => `/products/reject/${id}`,
    APPROVE: (id: string) => `/products/approve/${id}`,
  },
  ATTRIBUTES: {
    ATTRIBUTE_FOR_SHOP: '/attributes/my-shop',
  },
  CATEGORIES: {
    BASE: '/categories',
    GET_FOR_SHOP: '/categories/my-shop',
    GET_MY_SHOP_SUGGEST_CATEGORIES: '/categories/suggest',
    GET_SUGGEST_BY_NAME_PRODUCT: '/categories/suggest-by-product-name',
    GET_PUBLIC_DISPLAY: '/public/categories',
  },

  CART: {
    BASE: '/cart',
    GET: '/user/cart',
    ADD_ITEM: '/user/cart/add',
    REMOVE_ITEM: (cartItemId: string) => `/user/cart/remove/${cartItemId}`,
    REMOVE_ITEMS: '/user/cart/clear',
    UPDATE_QUANTITY: `/user/cart/update-quantity`,
    UPDATE_SELECTED: '/user/cart/update-selected',
  },

  SHIPMENT: {
    BASE: '/shipping',
    GET_SHIPPING_FEE_FORCART: '/shipping/fee-for-cart',
    GET_SHIPPING_FEE_FORCHECKOUT: '/shipping/fee-for-checkout',
    CREATE_SHIPMENTS: '/shipping/create-shipments',
    MYSHOP_LIST: '/shipping/my-shop',
    MYSHOP_REJECT: (shippingId: string) => `/shipping/my-shop/reject-shipping/${shippingId}`,
  },

  ADDRESS: {
    USER_ADDRESS_PRIMARY: 'address/get-address-primary',
    SHOP_ADDRESS_PRIMARY: 'address/get-shop-address-primary',
    USER_ADDRESS_ALL: 'address/get-address-all',
    SHOP_ADDRESS_ALL: 'address/get-shop-address-all',
    GET_WARD_LIST: 'address/get-ward-list',
    GET_PROVINCE_LIST: 'address/get-province-list',
    GET_DISTRICT_LIST: 'address/get-district-list',

    USER_ADDRESS_CREATE: 'address/user-address',
    USER_ADDRESS_UPDATE: (id: string) => `address/user-address/${id}`,
    USER_ADDRESS_DELETE: (id: string) => `address/user-address/${id}`,
    SHOP_ADDRESS_CREATE: 'address/shop-address',
    SHOP_ADDRESS_UPDATE: (id: string) => `address/shop-address/${id}`,
    SHOP_ADDRESS_DELETE: (id: string) => `address/shop-address/${id}`,

  },

  CHECKOUT: {
    GET: 'checkout/items',
    CREATE: 'checkout'
  },

  PAYMENT: {
    RESULT: (orderId: string) => `payment/result/${orderId}`,
  },

  ORDERS: {
    BASE: '/orders',
    MYSHOP_META_DATA: '/my-shop/orders/meta-data',
    MYSHOP_ORDERS: '/my-shop/orders',
    MYSHOP_APPROVALS: '/my-shop/orders/approvals',
    MYSHOP_APPROVAL: (shopOrderId: string) => `/my-shop/orders/approve/${shopOrderId}`,
    MYSHOP_REJECT: (orderItemId: string) => `/my-shop/orders/reject-id/${orderItemId}`,
    MYSHOP_REJECTS: '/my-shop/orders/reject-ids',

    USER_ORDERS: '/user/orders',
    USER_ORDER_DETAILS: (orderId: string) => `/user/orders/${orderId}`,
    USER_REJECT_ORDER: (orderId: string) => `/user/orders/reject/${orderId}`,
  }
};



export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_REDIRECT: (redirectPath: string) => `/login?redirect=${redirectPath}`,
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  CART: '/carts',
  CHECKOUT: '/checkout',
  PAYMENT_RESULT: (orderId: string) => `/payment/result/${orderId}`,
  PRODUCT_DETAIL: '/products/:slug',
  USER_SETTINGS: '/settings/*',
  USER_PROFILE: '/settings/profile',
  USER_SECURITY: '/settings/security',
  USER_ADDRESSES: '/settings/addresses',

  PRODUCTS: '/products',
  SEARCH: '/search',
  CATEGORY_PAGE: (slug: string) => `/category/${slug}`,
  SHOP_PAGE: (slug: string) => `/shop/${slug}`,

  SHOP: '/shop',
  SHOP_REGISTER: '/shop/register',

  // MyShop Routes
  MYSHOP: {
    BASE: '/myshop/*',

    DASHBOARD: '/myshop/dashboard',
    SALE: '/myshop/sale',
    PRODUCTS: '/myshop/products',
    PRODUCT_CREATE: '/myshop/products/create',
    PRODUCT_EDIT: (id: string) => `/myshop/products/edit/${id}`,
    ORDERS: '/myshop/orders',
    ORDER_DETAIL: (id: string) => `/myshop/orders/${id}`,
    MESSAGES: '/myshop/messages',
    SETTINGS: '/myshop/settings',
  },

  // Admin Routes
  ADMIN: {
    BASE: '/admin/*',

    DASHBOARD: '/admin/dashboard',
    CATEGORIES: '/admin/categories',
    USERS: '/admin/users',
    SHOP_REGISTRATIONS: '/admin/shop-registrations',
    PRODUCT_APPROVALS: '/admin/product-approvals',
    ORDERS: '/admin/orders',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },
};

export const APP_ROUTES_PUBLIC = [
  APP_ROUTES.HOME,
  APP_ROUTES.LOGIN,
  APP_ROUTES.REGISTER,
  APP_ROUTES.FORGOT_PASSWORD,
  APP_ROUTES.PRODUCT_DETAIL.split('/:')[0],
]

export const ROUTE_NAMES: Record<string, string> = {
  admin: 'Quản trị',
  dashboard: 'Tổng quan',
  categories: 'Quản lý danh mục',
  users: 'Quản lý người dùng',
  'shop-registrations': 'Duyệt đăng ký shop',
  'product-approvals': 'Duyệt sản phẩm',
  orders: 'Quản lý đơn hàng',
  reports: 'Báo cáo & Thống kê',
  settings: 'Cài đặt hệ thống',
  myshop: 'Kênh người bán',
  products: 'Quản lý sản phẩm',
  create: 'Thêm sản phẩm mới',
  edit: 'Chỉnh sửa sản phẩm',
  messages: 'Quản lý chat',
  sale: 'Phân tích bán hàng',
};

// 4. User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT_APPROVALS: 'product-approvals',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  USERS: 'users',
  SHOPS: 'shops',
  SHOP_REGISTRATIONS: 'shop-registrations',
  USER_PROFILE: 'user-profile',
  CART: 'cart',
};

export const APP_CONFIG = {
  ITEMS_PER_PAGE: 10,
  REQUEST_TIMEOUT: 30000,
};

export const LOCAL_STORAGE_KEYS = {
  ORDER_ITEM_IDS: 'orderItemIds',
};