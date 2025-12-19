import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../constant';
import authService from '../service/AuthService';
import type { AddressDto } from '../types/AddressType';
import type { LoginRequest, LoginResponse } from '../types/AuthType';
import type { ErrorResponseDto } from '../types/CommonType';
import type { ShopDto } from '../types/ShopType';
import type { ProfileRequest, RegisterRequest, UserDto } from '../types/UserType';

interface AuthError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: ErrorResponseDto['details'];
  traceId?: string;
}

interface AuthState {
  user: UserDto | null;
  shop: ShopDto | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: AuthError | null;
}

const initialState: AuthState = {
  user: null,
  shop: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  API_ENDPOINTS.AUTH.LOGIN,
  async (loginData: LoginRequest, { rejectWithValue }) => {
    try {
      const response: LoginResponse = await authService.login(loginData);
      return response;
    } catch (error: any) {
      const response = error.response.data as ErrorResponseDto;
      const authError: AuthError = {
        message: response.message || 'Đăng nhập thất bại.',
        code: response.code,
        // statusCode: response.code,
        details: response.details,
        traceId: response.traceId,
      };
      return rejectWithValue(authError);
    }
  }
);


export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user: UserDto = await authService.getProfile();
      return user;
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Không thể xác thực người dùng.',
        code: error.code,
        statusCode: error.statusCode,
        details: error.details,
        traceId: error.traceId,
      };
      return rejectWithValue(authError);
    }
  }
);

export const fetchCurrentShop = createAsyncThunk(
  'shopAuth/fetchCurrentShop',
  async (_, { rejectWithValue }) => {
    try {
      const response: ShopDto = await authService.getShopInfo();
      return response;
    } catch (error: any) {
      const shopAuthError: AuthError = {
        message: error.message || 'Không thể xác thực cửa hàng.',
        code: error.code,
        statusCode: error.statusCode,
        details: error.details,
        traceId: error.traceId,
      };
      return rejectWithValue(shopAuthError);
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData: ProfileRequest, { rejectWithValue }) => {
    try {
      const updatedUser: UserDto = await authService.updateProfile(profileData);
      return updatedUser;
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Cập nhật thông tin thất bại.',
        code: error.code,
        statusCode: error.statusCode,
        details: error.details,
        traceId: error.traceId,
      };
      return rejectWithValue(authError);
    }
  }
);

export const logoutUser = createAsyncThunk(
  API_ENDPOINTS.AUTH.LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Đăng xuất thất bại.',
        code: error.code,
        statusCode: error.statusCode,
        details: error.details,
        traceId: error.traceId,
      };
      return rejectWithValue(authError);
    }
  }
);

export const registerUser = createAsyncThunk(
  API_ENDPOINTS.USERS.REGISTER,
  async (registerData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response: string = await authService.register(registerData);
      return response;
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Đăng ký thất bại.',
        code: error.code,
        statusCode: error.statusCode,
        details: error.details,
        traceId: error.traceId,
      };
      return rejectWithValue(authError);
    }
  }
);

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    addToCart: (state) => {
      if (state.user) {
        state.user.cartCount = (state.user.cartCount || 0) + 1;
      }
    },
    removeFromCart: (state) => {
      if (state.user && state.user.cartCount && state.user.cartCount > 0) {
        state.user.cartCount = state.user.cartCount - 1;
      }
    },
    updateCartCount: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.cartCount = action.payload;
      }
    },
    clearCart: (state) => {
      if (state.user) {
        state.user.cartCount = 0;
      }
    },

    updateAddress: (state, action: PayloadAction<AddressDto>) => {
      if (state.user) {
        state.user.address = action.payload;
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      state.shop = null;
    },

    createShopForUser: (state, action: PayloadAction<ShopDto>) => {
      state.shop = action.payload;
      if (state.user) {
        state.user.hasShop = true;
      }
    },

    updateVerifiedStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.verified = action.payload;
      }
    },

    updatePasswordStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.hasPassword = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = (action.payload as AuthError) || { message: 'Đăng nhập thất bại không xác định.' };
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = 'idle';
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchCurrentShop.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentShop.fulfilled, (state, action: PayloadAction<ShopDto>) => {
        state.status = 'succeeded';
        state.shop = action.payload;
        state.isAuthenticated = true;
        if (state.user) {
          state.user.hasShop = !!action.payload;
        }
        state.error = null;
      })
      .addCase(fetchCurrentShop.rejected, (state) => {
        state.status = 'idle';
        state.shop = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as AuthError) || { message: 'Cập nhật thông tin thất bại.' };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
        state.shop = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as AuthError) || { message: 'Đăng xuất thất bại.' };
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as AuthError) || { message: 'Đăng ký thất bại.' };
      });
  },
});

export default userAuthSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  updateCartCount,
  clearCart,
  logout,
  createShopForUser,
  updateVerifiedStatus,
  updatePasswordStatus,
} = userAuthSlice.actions;