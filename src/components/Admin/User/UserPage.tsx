import { Box, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import { getRejectReasons } from '../../../data/RejectData';
import { useURLParams } from '../../../hooks/useURLParams';
import { useUser } from '../../../hooks/useUser';
import type { UserManagerDto, UserRoleType } from '../../../types/UserType';
import { getDefaultDateRange_Now_Yesterday } from '../../../untils/Untils';
import PaginationCustom from '../../common/PaginationCustom';
import RejectModal from '../../RejectModal/RejectModal';
import Filter from './Filter';
import UserDetailModal from './UserDetailModal';
import UserList from './UserList';

const UserPage = () => {
    const { getParam, updateParams } = useURLParams();
    const defaultRange = getDefaultDateRange_Now_Yesterday();

    const [selectedUser, setSelectedUser] = useState<UserManagerDto | null>(null);
    const [activeTab, setActiveTab] = useState(getParam('role') || 'ALL');
    const [searchTerm, setSearchTerm] = useState(getParam('search'));
    const [page, setPage] = useState(parseInt(getParam('page')) || 1);
    const [itemsPerPage] = useState(10);
    const [date, setDate] = useState<[Date | null, Date | null]>(() => {
        const startDateStr = getParam('startDate');
        const endDateStr = getParam('endDate');

        if (startDateStr && endDateStr) {
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                return [startDate, endDate];
            }
        }
        return defaultRange;
    });

    const {
        users,
        totalPages,
        currentPage,
        isLoading,
        fetchUsers,
        statusMetadata,
        disableUser,
    } = useUser({
        initialParams: {
            page: 0,
            accountType: 'USER' as UserRoleType,
            limit: itemsPerPage,
            dateRange: defaultRange
        }
    });

    const fetchUserData = useCallback(() => {
        updateParams({
            page: page > 1 ? page : null,
            role: activeTab !== 'ALL' ? activeTab : null,
            search: searchTerm || null,
            startDate: date[0] ? date[0].toISOString().split('T')[0] : null,
            endDate: date[1] ? date[1].toISOString().split('T')[0] : null,
        });

        return fetchUsers({
            page: page - 1,
            accountType: (activeTab === 'ALL' ? undefined : activeTab) as UserRoleType,
            search: searchTerm,
            limit: itemsPerPage,
            dateRange: date
        });
    }, [fetchUsers, activeTab, searchTerm, date, page, updateParams, itemsPerPage]);

    useEffect(() => {
        fetchUserData();
    }, [page]);

    useEffect(() => {
        setPage(1);
    }, [activeTab]);

    useEffect(() => {
        if (page === 1) {
            fetchUserData();
        }
    }, [activeTab]);

    const handleApplyFilters = () => {
        setPage(1);
        fetchUserData();
    };

    const resetFilters = () => {
        setDate(defaultRange);
        setActiveTab('ALL');
        setSearchTerm('');
        setPage(1);
    };

    const handleTabChange = (tab: string | null) => {
        if (tab) setActiveTab(tab);
    };

    const [detailModalOpened, { open: openDetailModal, close: closeDetailModal }] = useDisclosure(false);
    const [rejectModalOpened, { open: openRejectModal, close: closeRejectModal }] = useDisclosure(false);

    const handleViewUser = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setSelectedUser(user);
            openDetailModal();
        }
    };

    const handleDeleteUser = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setSelectedUser(user);
            openRejectModal();
        }
    };

    const handleRejectUser = async (reason: string) => {
        if (!selectedUser) return;

        const success = await disableUser(selectedUser.id, reason);
        if (success) {
            fetchUserData();
        }
        setSelectedUser(null);
    };

    const totalItems = totalPages * itemsPerPage;

    return (
        <Box>
            <Paper shadow='none'>
                <Filter
                    date={date}
                    searchTerm={searchTerm}
                    activeTab={activeTab}
                    userStatusData={statusMetadata}
                    onDateChange={setDate}
                    onSearchChange={setSearchTerm}
                    onTabChange={handleTabChange}
                    onResetFilters={resetFilters}
                    onApplyFilters={handleApplyFilters}
                />

                <UserList
                    users={users}
                    onViewUser={handleViewUser}
                    onDeleteUser={handleDeleteUser}
                    loading={isLoading}
                />

                <PaginationCustom
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setPage}
                />
            </Paper>

            <UserDetailModal
                opened={detailModalOpened}
                onClose={closeDetailModal}
                user={selectedUser}
            />

            <RejectModal
                data={getRejectReasons('user')}
                opened={rejectModalOpened}
                onClose={closeRejectModal}
                onConfirm={handleRejectUser}
                orderId={selectedUser?.id || ''}
            />
        </Box>
    );
};

export default UserPage;
