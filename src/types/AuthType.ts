import type { UserDto } from "./UserType";


export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserDto;
}

export interface OtpRequest {
  code: string;
  email: string;
}

export interface ResetPwRequest {
  email: string;
  password: string;
  otp: string;
}

export interface HistoryLoginDto {
  id: string;
  loginAt: string;
  logoutAt: string;
  userAgent: string;
  location: string;
  device: string;
  currentSession: boolean;
  active: boolean;
}
