import type { ErrorResponseDto } from "../types/CommonType";

export const getErrorMessage = (error: any): string => {
  const errorResponse = error as ErrorResponseDto;
  if (errorResponse?.details && errorResponse.details.length > 0) {
    const firstDetail = errorResponse.details[0];
    return firstDetail.message;
  }

  if (errorResponse?.message) {
    return errorResponse.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }

  return 'Đã có lỗi không xác định xảy ra.';
};
