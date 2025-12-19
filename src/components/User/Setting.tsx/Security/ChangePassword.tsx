import {
    Alert,
    Box,
    Button,
    Group,
    PasswordInput,
    Text,
    Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiSave } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import UserService from '../../../../service/UserService';
import { updatePasswordStatus } from '../../../../store/authSlice';
import { getErrorMessage } from '../../../../untils/ErrorUntils';
import showErrorNotification from '../../../Toast/NotificationError';
import showSuccessNotification from '../../../Toast/NotificationSuccess';

interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [hasPassword, setHasPassword] = useState<boolean>(true);

    useEffect(() => {
        setHasPassword(user?.hasPassword ?? true);
    }, [user]);

    const passwordForm = useForm({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validate: {
            currentPassword: (value) => {
                if (!hasPassword) return null;
                return value.length >= 6 ? null : 'Mật khẩu phải có ít nhất 6 ký tự';
            },
            newPassword: (value) => (value.length >= 6 ? null : 'Mật khẩu phải có ít nhất 6 ký tự'),
            confirmPassword: (value, values) => (value === values.newPassword ? null : 'Mật khẩu không khớp'),
        },
    });

    const handleChangePassword = async (values: PasswordFormValues) => {
        try {
            if (hasPassword) {
                await UserService.changePassword({
                    oldPassword: values.currentPassword,
                    newPassword: values.newPassword,
                });
                showSuccessNotification('Đổi mật khẩu', 'Mật khẩu đã được thay đổi thành công');
            } else {
                await UserService.changePassword({
                    oldPassword: '',
                    newPassword: values.newPassword,
                });
                dispatch(updatePasswordStatus(true));
                showSuccessNotification('Tạo mật khẩu', 'Mật khẩu đã được tạo thành công');
            }

            passwordForm.reset();
        } catch (error) {
            showErrorNotification(
                hasPassword ? 'Đổi mật khẩu thất bại' : 'Tạo mật khẩu thất bại',
                getErrorMessage(error) || 'Có lỗi xảy ra. Vui lòng thử lại.'
            );
        }
    };

    return (
        <Box style={{ flex: 1, maxWidth: 400 }}>
            <Title order={4} className="!mb-4 text-slate-800">
                {hasPassword ? 'Đổi mật khẩu' : 'Tạo mật khẩu'}
            </Title>

            <Box component="form" onSubmit={passwordForm.onSubmit(handleChangePassword)}>
                <Alert color="blue" mb="md">
                    <Group className='!flex !items-center !gap-2'>
                        <div>
                            <FiAlertTriangle size={16} />
                        </div>
                        <div>
                            <Text size="sm">
                                Mật khẩu nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                            </Text>
                        </div>
                    </Group>
                </Alert>

                {hasPassword && (
                    <PasswordInput
                        label="Mật khẩu hiện tại"
                        placeholder="Nhập mật khẩu hiện tại"
                        className="mb-3"
                        {...passwordForm.getInputProps('currentPassword')}
                    />
                )}

                <PasswordInput
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    className="mb-3"
                    {...passwordForm.getInputProps('newPassword')}
                />

                <PasswordInput
                    label="Xác nhận mật khẩu mới"
                    placeholder="Nhập lại mật khẩu mới"
                    className="mb-3"
                    {...passwordForm.getInputProps('confirmPassword')}
                />

                <Button
                    type="submit"
                    className="mt-2 bg-primary hover:bg-picton-blue-600"
                    leftSection={<FiSave size={16} />}
                >
                    {hasPassword ? 'Đổi mật khẩu' : 'Tạo mật khẩu'}
                </Button>
            </Box>
        </Box>
    );
};

export default ChangePassword;
