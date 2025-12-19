import { useCallback, useState } from 'react';
import { CategoryService } from '../service/CategoryService';
import ProductsService from '../service/ProductsService';

interface UseSuggestState {
  isLoading: boolean;
  error: string | null;
}

type SuggestType = 'name' | 'category';

export const useSuggest = <T>(type: SuggestType) => {
  const [state, setState] = useState<UseSuggestState>({
    isLoading: false,
    error: null
  });

  const getSuggestions = useCallback(async (keyword: string): Promise<T[]> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      let suggestions: T[];

      if (type === 'name') {
        suggestions = await ProductsService.getProductNameSuggestions(keyword.trim()) as T[];
      } else if (type === 'category') {
        suggestions = await CategoryService.getCategorySuggestions(keyword) as T[];
      } else {
        throw new Error(`Unsupported suggestion type: ${type}`);
      }

      setState(prev => ({ ...prev, isLoading: false }));
      return suggestions;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || `Lỗi tải gợi ý ${type === 'name' ? 'sản phẩm' : 'danh mục'}`;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));

      return [] as T[];
    }
  }, [type]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    isLoading: state.isLoading,
    error: state.error,
    getSuggestions,
    clearError
  };
};