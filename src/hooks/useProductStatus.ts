import { useCallback, useMemo } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiClock, FiEyeOff, FiGrid, FiX } from 'react-icons/fi';

export const useProductStatusIcon = () => {
  return useMemo(() => ({
    getStatusIcon: (statusId: string) => {
      switch (statusId.toLowerCase()) {
        case 'all':
          return FiGrid;
        case 'active':
          return FiCheckCircle;
        case 'violation':
          return FiAlertTriangle;
        case 'pending':
          return FiClock;
        case 'hidden':
          return FiEyeOff; 
        default:
          return FiGrid;
      }
    }
  }), []);
};


export const useProductStatusColor = () => {
  return useMemo(() => ({
    getStatusColor: (statusId: string) => {
      switch (statusId.toLowerCase()) {
        case 'all':
          return 'gray';
        case 'active':
          return 'green';
        case 'violation':
          return 'red';
        case 'pending':
          return 'yellow';
        case 'hidden':
          return 'gray'; 
        default:
          return 'gray';
      }
    },
    getStatusIconColor: (statusId: string) => {
      switch (statusId.toLowerCase()) {
        case 'all':
          return '#6b7280';
        case 'active':
          return '#22c55e';
        case 'violation':
          return '#ef4444';
        case 'pending':
          return '#eab308';
        case 'hidden':
          return '#6b7280'; 
        default:
          return '#6b7280';
      }
    }
  }), []);
};


export const useProductStatusLabel = () => {
  return useMemo(() => ({
    getStatusLabel: (statusId: string) => {
      switch (statusId.toLowerCase()) {
        case 'all':
          return 'Tất cả';
        case 'active':
          return 'Đang hoạt động';
        case 'violation':
          return 'Vi phạm';
        case 'pending':
          return 'Chờ duyệt';
        case 'hidden':
          return 'Đang ẩn'; 
        default:
          return 'Không xác định';
      }
    }
  }), []);
};




export const useProductForAd = () => {
  const convertStatus = useCallback((status: string, reason?: string) => {
    status = status.toLowerCase();
    if (status === 'all')
      return "ALL";
    if (status !== 'violation' && reason)
      return 'ACTIVE';
    if (!reason)
      return 'PENDING';
    if (status === 'violation')
      return 'VIOLATION';
    else 
      return 'ALL'
  }, []);

  const getStatusLabel = useCallback((statusId: string) => {
    switch (statusId.toLowerCase()) {
        case 'all':
          return "Tất cả";
        case 'active':
          return "Đã duyệt"; 
        case 'violation':
          return "Từ chối";
        case 'pending':
          return "Chờ duyệt";
        default:
          return "Không xác định";
      }
  }, []);

  const getStatusColor = useCallback((statusId: string) => {
    switch (statusId.toLowerCase()) {
      case 'all':
        return 'gray';
      case 'active':
        return 'green';
      case 'violation':
        return 'red';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  }, []);

  const getStatusIconColor = useCallback((statusId: string) => {
    switch (statusId.toLowerCase()) {
      case 'all':
        return '#6b7280';
      case 'active':
        return '#22c55e';
      case 'violation':
        return '#ef4444';
      case 'pending':
        return '#eab308';
      default:
        return '#6b7280';
    }
  }, []);

  const getStatusIcon = useCallback((statusId: string) => {
    switch (statusId.toLowerCase()) {
      case 'all':
        return FiGrid;
      case 'active':
        return FiCheckCircle;
      case 'violation':
        return FiX;
      case 'pending':
        return FiClock;
      default:
        return FiGrid;
    }
  }, []);

  return {
    convertStatus,
    getStatusLabel,
    getStatusIconColor,
    getStatusColor,
    getStatusIcon
  }
}
