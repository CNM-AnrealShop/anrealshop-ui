import { useCallback, useState } from 'react';
import showErrorNotification from '../components/Toast/NotificationError';
import showSuccessNotification from '../components/Toast/NotificationSuccess';
import UserService from '../service/UserService';
import type { AdminUserListResponse, UserManagerDto, UserRoleType } from '../types/UserType';

export interface UserParams {
    page?: number;
    accountType?: UserRoleType;
    search?: string;
    limit?: number;
    dateRange?: [Date | null, Date | null];
}

interface UseUserParams {
    initialParams?: UserParams;
}



export const useUser = ({ initialParams }: UseUserParams = {}) => {
    const [users, setUsers] = useState<UserManagerDto[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const statusMetadata = [
        { id: 'ALL', count: 0 },
        { id: 'USER', count: 0 },
        { id: 'MY_SHOP', count: 0 },
        { id: 'ADMIN', count: 0 },
    ];

    const fetchUsers = useCallback(async (params?: UserParams) => {
        setIsLoading(true);
        try {
            const requestParams: UserParams = {
                page: params?.page ?? initialParams?.page ?? 0,
                accountType: params?.accountType ?? initialParams?.accountType,
                search: params?.search ?? initialParams?.search,
                limit: params?.limit ?? initialParams?.limit ?? 10,
                dateRange: params?.dateRange ?? initialParams?.dateRange,
            };
            const response: AdminUserListResponse = await UserService.getUserListForManager(requestParams);
            setUsers(response.users);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage + 1);
        } catch (error) {
            showErrorNotification('Không thể tải danh sách người dùng');
        } finally {
            setIsLoading(false);
        }
    }, [initialParams]);

    const disableUser = useCallback(async (userId: string, reason: string) => {
        try {
            await UserService.disableUser(userId, { reason });
            showSuccessNotification('Đã khóa tài khoản người dùng');
            return true;
        } catch (error) {
            showErrorNotification('Không thể khóa tài khoản người dùng');
            return false;
        }
    }, []);

    return {
        users,
        totalPages,
        currentPage,
        isLoading,
        statusMetadata,
        fetchUsers,
        disableUser,
    };
};
