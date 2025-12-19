import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { UseProductParams } from '../hooks/useProduct';

export const getMessageDate = (date: string) => {
  const messageDate = new Date(date);
  return "Ngày " + format(messageDate, 'dd', { locale: vi }) + " tháng " + format(messageDate, 'MM', { locale: vi }) + " năm " + format(messageDate, 'yyyy', { locale: vi });
}

export const formatMessageTime = (date: Date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return format(date, 'HH:mm', { locale: vi });
  } else if (date >= yesterday) {
    return 'Hôm qua';
  } else if (now.getFullYear() === date.getFullYear()) {
    return format(date, 'dd/MM', { locale: vi });
  } else {
    return format(date, 'dd/MM/yyyy', { locale: vi });
  }
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
};

export const formatDateForBe = (date: Date | null): string => {
  if (!date) return '';
  return format(date, 'dd-MM-yyyy', { locale: vi });
};

export const getDefaultDateRange_Now_Yesterday = (): [Date, Date] => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  today.setHours(23, 59, 59, 999);
  return [yesterday, today];
};

export const getDefaultDateRange_Now_Tomorrow = (): [Date, Date] => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(23, 59, 59, 999);
  return [today, tomorrow];
};

export const equalDates = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'yellow';
    case 'processing': return 'blue';
    case 'shipping': return 'indigo';
    case 'completed': return 'green';
    case 'cancelled': return 'red';
    default: return 'gray';
  }
};


export function formatSkuPart(input: string, maxLen: number = 3): string {
  if (!input) return '';

  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, maxLen)
    .toUpperCase();
}


export function getParams(params: UseProductParams): string {
  const queryParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (key && value != null && value !== '' && key !== 'dateRange') {
      queryParams.append(key, String(value));
    }
  });
  if (params?.dateRange) {
    const [startDate, endDate] = params.dateRange;
    if (startDate) queryParams.append('startDate', formatDateForBe(startDate));
    if (endDate) queryParams.append('endDate', formatDateForBe(endDate));
  }
  return queryParams.toString();
}

export function formatStringView(input: string): string {
  if (!input) return '';
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
}