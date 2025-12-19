import { FiCheck, FiShield, FiShoppingBag, FiUser, FiUsers, FiX } from 'react-icons/fi';
import type { IconType } from 'react-icons';

export const useUserStatus = () => {
    const getStatusIcon = (status: string): IconType => {
        switch (status) {
            case 'ALL':
                return FiUsers;
            case 'USER':
                return FiUser;
            case 'MY_SHOP':
                return FiShoppingBag;
            case 'ADMIN':
                return FiShield;
            case 'ACTIVE':
                return FiCheck;
            case 'DISABLED':
                return FiX;
            default:
                return FiUsers;
        }
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'ALL':
                return 'gray';
            case 'USER':
                return 'blue';
            case 'MY_SHOP':
                return 'green';
            case 'ADMIN':
                return 'red';
            case 'ACTIVE':
                return 'green';
            case 'DISABLED':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'ALL':
                return 'Tất cả';
            case 'USER':
                return 'Người dùng';
            case 'MY_SHOP':
                return 'Người bán';
            case 'ADMIN':
                return 'Quản trị viên';
            case 'ACTIVE':
                return 'Hoạt động';
            case 'DISABLED':
                return 'Đã khóa';
            default:
                return status;
        }
    };

    const getRoleBadgeColor = (role: string): string => {
        switch (role) {
            case 'ADMIN':
                return 'red';
            case 'MY_SHOP':
                return 'green';
            case 'USER':
                return 'blue';
            default:
                return 'gray';
        }
    };

    const getRoleLabel = (role: string): string => {
        switch (role) {
            case 'ADMIN':
                return 'Admin';
            case 'MY_SHOP':
                return 'Người bán';
            case 'USER':
                return 'Người dùng';
            default:
                return role;
        }
    };

    return {
        getStatusIcon,
        getStatusColor,
        getStatusLabel,
        getRoleBadgeColor,
        getRoleLabel,
    };
};
