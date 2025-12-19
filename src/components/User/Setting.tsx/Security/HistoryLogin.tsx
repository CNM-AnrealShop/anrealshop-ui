import {
    Badge,
    Box,
    Group,
    Loader,
    Stack,
    Text,
    Title
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import authService from '../../../../service/AuthService';
import type { HistoryLoginDto } from '../../../../types/AuthType';
import { getErrorMessage } from '../../../../untils/ErrorUntils';
import { formatDate } from '../../../../untils/Untils';
import showErrorNotification from '../../../Toast/NotificationError';

const HistoryLogin: React.FC = () => {
    const [loginActivities, setLoginActivities] = useState<HistoryLoginDto[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    useEffect(() => {
        fetchLoginHistory();
    }, []);

    const fetchLoginHistory = async () => {
        setIsLoadingHistory(true);
        try {
            const history = await authService.getHistoryLogin();
            setLoginActivities(history);
        } catch (error) {
            showErrorNotification('Lỗi', getErrorMessage(error) || 'Không thể tải lịch sử đăng nhập');
        } finally {
            setIsLoadingHistory(false);
        }
    };

    return (
        <Box style={{ flex: 1 }}>
            <Title order={6} className="mb-3 text-slate-800">
                Hoạt động đăng nhập gần đây
            </Title>

            {isLoadingHistory ? (
                <Box className="flex justify-center p-4">
                    <Loader size="md" />
                </Box>
            ) : loginActivities.length > 0 ? (
                <Stack>
                    {loginActivities.map((activity) => (
                        <Box key={activity.id} className="p-3 border border-gray-100 rounded-md">
                            <Group justify="space-between">
                                <Text size="sm" fw={500}>{activity.location || 'Không xác định'}</Text>
                                {activity.currentSession && (
                                    <Badge color="green" size="sm">Hiện tại</Badge>
                                )}
                                {activity.active && (
                                    <Badge color="blue" size="sm">Đang hoạt động</Badge>
                                )}
                            </Group>
                            <Text size="xs" color="dimmed">
                                {activity.device || activity.userAgent} · {formatDate(activity.loginAt)}
                            </Text>
                            {activity.logoutAt && (
                                <Text size="xs" color="dimmed">
                                    Đăng xuất: {formatDate(activity.logoutAt)}
                                </Text>
                            )}
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Text size="sm" c="dimmed">Không có lịch sử đăng nhập</Text>
            )}
        </Box>
    );
};

export default HistoryLogin;
