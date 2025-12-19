import { useState, useCallback } from 'react';
import type { ErrorResponseDto } from '../types/CommonType';

interface ApiErrorHandler {
  generalError: string | null;
  fieldErrors: Record<string, string>;
  handleError: (error: any) => void;
  clearErrors: () => void;
}

export const useApiErrorHandler = (): ApiErrorHandler => {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleError = useCallback((error: any) => {
    setGeneralError(null);
    setFieldErrors({});

    const errorResponse = error as ErrorResponseDto;
    
    if (errorResponse?.message) {
      setGeneralError(errorResponse.message);
      
      if (errorResponse.details && errorResponse.details.length > 0) {
        const errors: Record<string, string> = {};
        errorResponse.details.forEach(detail => {
          errors[detail.field] = detail.message;
        });
        setFieldErrors(errors);
      }
    } else if (error instanceof Error) {
        setGeneralError(error.message);
    } else {
      setGeneralError('Đã có lỗi không xác định xảy ra.');
    }
  }, []);

  const clearErrors = useCallback(() => {
    setGeneralError(null);
    setFieldErrors({});
  }, []);

  return {
    generalError,
    fieldErrors,
    handleError,
    clearErrors,
  };
};