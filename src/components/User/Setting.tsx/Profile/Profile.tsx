import {
    Alert,
    Avatar,
    Box,
    Button,
    FileButton,
    Group,
    Loader,
    Select,
    Stack,
    Text,
    TextInput,
    Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import {
    FiAlertCircle,
    FiCheck,
    FiSave,
    FiShield,
    FiUpload
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { uploadToCloudinary } from '../../../../service/Cloundinary';
import OtpService from '../../../../service/OtpService';
import { updateUserProfile } from '../../../../store/authSlice';
import type { ProfileRequest } from '../../../../types/UserType';
import { getErrorMessage } from '../../../../untils/ErrorUntils';
import showErrorNotification from '../../../Toast/NotificationError';
import showSuccessNotification from '../../../Toast/NotificationSuccess';
import ModalVerifyCode from '../../../common/ModalVerifyCode';
import { useURLParams } from '../../../../hooks/useURLParams';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, status } = useAppSelector((state) => state.auth);
    const { redirectTo } = useURLParams();

    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);
    const [opened, { open, close }] = useDisclosure(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(null);

    const profileForm = useForm({
        initialValues: {
            fullName: user?.fullName || '',
            phoneNumber: user?.phoneNumber || '',
            gender: user?.gender || 'MALE',
            dob: user?.dob || '',
        },
        validate: {
            phoneNumber: (value) => {
                if (!value) return null;
                return /^[0-9]{10}$/.test(value) ? null : 'Số điện thoại không hợp lệ';
            },
        },
    });

    useEffect(() => {
        if (user) {
            profileForm.setValues({
                fullName: user.fullName || '',
                phoneNumber: user.phoneNumber || '',
                gender: user.gender || 'MALE',
                dob: user.dob || '',
            });
            setAvatarPreview(user.avatarUrl || null);
        }
    }, [user]);

    const handleSendOtp = async () => {
        if (!user?.email) return;

        setIsSendingOtp(true);
        try {
            await OtpService.getOtp(user.email, 'VERIFY_EMAIL');
            showSuccessNotification('Gửi mã thành công', 'Mã xác thực đã được gửi đến email của bạn.');
            open();
        } catch (err) {
            showErrorNotification('Gửi mã thất bại', getErrorMessage(err) || 'Không thể gửi mã xác thực. Vui lòng thử lại.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleAvatarChange = async (file: File | null) => {
        if (!file) return;

        if (file.size > 1024 * 1024) {
            showErrorNotification('Lỗi', 'Kích thước ảnh không được vượt quá 1MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatarPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        setIsUploadingAvatar(true);
        try {
            const uploadResult = await uploadToCloudinary(file, 'image');
            setUploadedAvatarUrl(uploadResult.secure_url);
            showSuccessNotification('Thành công', 'Ảnh đại diện đã được tải lên. Nhấn "Lưu thay đổi" để cập nhật.');
        } catch (error) {
            showErrorNotification('Tải ảnh thất bại', 'Không thể tải ảnh lên. Vui lòng thử lại.');
            setAvatarPreview(user?.avatarUrl || null);
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const handleUpdateProfile = async (values: typeof profileForm.values) => {
        try {
            const profileData: ProfileRequest = {
                fullName: values.fullName,
                phoneNumber: values.phoneNumber || undefined,
                gender: values.gender as 'MALE' | 'FEMALE' | 'OTHER',
                dob: values.dob,
                avatarUrl: uploadedAvatarUrl || user?.avatarUrl || undefined,
            };

            await dispatch(updateUserProfile(profileData)).unwrap();
            showSuccessNotification('Cập nhật thành công', 'Thông tin cá nhân đã được cập nhật');
            setUploadedAvatarUrl(null);
            redirectTo();
        } catch (error: any) {
            showErrorNotification('Cập nhật thất bại', getErrorMessage(error) || 'Không thể cập nhật thông tin. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Title order={4} className="!mb-6 text-slate-800">
                Thông tin cá nhân
            </Title>

            {!user?.verified && (
                <Alert
                    icon={<FiAlertCircle size={16} />}
                    color="orange"
                    className="!mb-6"
                    title="Tài khoản chưa được xác thực"
                >
                    <Stack gap="xs">
                        <Text size="sm">
                            Vui lòng xác thực email để bảo mật tài khoản của bạn tốt hơn.
                        </Text>
                        <Button
                            size="xs"
                            variant="light"
                            color="orange"
                            leftSection={<FiShield size={14} />}
                            onClick={handleSendOtp}
                            loading={isSendingOtp}
                        >
                            Xác thực ngay
                        </Button>
                    </Stack>
                </Alert>
            )}

            <Group align="flex-start" className="!mb-6">
                <Box>
                    <Text size="sm" fw={500} className="!mb-2 text-slate-700">
                        Ảnh đại diện
                    </Text>
                    <Box className="flex flex-col items-center">
                        <Box className="relative">
                            <Avatar
                                src={avatarPreview}
                                alt="Avatar"
                                size={120}
                                radius={120}
                                className="border-4 border-gray-100"
                            />
                            {isUploadingAvatar && (
                                <Box
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
                                    style={{ width: 120, height: 120 }}
                                >
                                    <Loader color="white" size="md" />
                                </Box>
                            )}
                        </Box>

                        <FileButton
                            onChange={handleAvatarChange}
                            accept="image/png,image/jpeg,image/jpg"
                            disabled={isUploadingAvatar}
                        >
                            {(props) => (
                                <Button
                                    {...props}
                                    variant="light"
                                    size="xs"
                                    color="blue"
                                    className="mt-3"
                                    leftSection={<FiUpload size={14} />}
                                    loading={isUploadingAvatar}
                                >
                                    {isUploadingAvatar ? 'Đang tải...' : 'Tải ảnh lên'}
                                </Button>
                            )}
                        </FileButton>

                        <Text size="xs" color="dimmed" className="!mt-2 text-center">
                            JPG, JPEG hoặc PNG. Tối đa 1MB
                        </Text>
                    </Box>
                </Box>

                <Box style={{ flex: 1 }} component="form" onSubmit={profileForm.onSubmit(handleUpdateProfile)}>
                    <Text size="sm" fw={500} className="!mb-4 text-slate-700">
                        Thông tin cơ bản
                    </Text>

                    <TextInput
                        label="Họ và tên"
                        placeholder="Nhập họ và tên đầy đủ"
                        className="mb-3"
                        {...profileForm.getInputProps('fullName')}
                    />

                    <Group grow className="mb-3">
                        <TextInput
                            label="Email"
                            value={user?.email || ''}
                            rightSection={
                                user?.verified ? (
                                    <FiCheck size={16} className="text-green-500" />
                                ) : (
                                    <FiAlertCircle size={16} className="text-red-500" />
                                )
                            }
                            disabled
                        />

                        <TextInput
                            label="Số điện thoại"
                            placeholder="0912345678"
                            {...profileForm.getInputProps('phoneNumber')}
                        />
                    </Group>

                    <Group grow className="mb-3">
                        <TextInput
                            label="Ngày sinh"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            {...profileForm.getInputProps('dob')}
                        />

                        <Select
                            label="Giới tính"
                            placeholder="Chọn giới tính"
                            data={[
                                { value: 'MALE', label: 'Nam' },
                                { value: 'FEMALE', label: 'Nữ' },
                                { value: 'OTHER', label: 'Khác' },
                            ]}
                            {...profileForm.getInputProps('gender')}
                        />
                    </Group>

                    <Button
                        type="submit"
                        className="mt-4 bg-primary hover:bg-picton-blue-600"
                        leftSection={<FiSave size={16} />}
                        loading={status === 'loading'}
                        disabled={status === 'loading'}
                    >
                        Lưu thay đổi
                    </Button>
                </Box>
            </Group>

            <ModalVerifyCode opened={opened} onClose={close} email={user?.email || ''} />
        </>
    );
};

export default Profile;