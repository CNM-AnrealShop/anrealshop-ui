import { Button, Group, Modal, PinInput, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppRedux';
import authService from '../../service/AuthService';
import OtpService from '../../service/OtpService';
import { updateVerifiedStatus } from '../../store/authSlice';
import { getErrorMessage } from '../../untils/ErrorUntils';
import showErrorNotification from '../Toast/NotificationError';
import showSuccessNotification from '../Toast/NotificationSuccess';
import { useURLParams } from '../../hooks/useURLParams';

interface ModalVerifyCodeProps {
    opened: boolean;
    onClose: () => void;
    email: string;
}

const ModalVerifyCode: React.FC<ModalVerifyCodeProps> = ({ opened, onClose, email }) => {
    const dispatch = useAppDispatch();
    const [otpValue, setOtpValue] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    const { redirectTo } = useURLParams();

    const handleSendOtp = async () => {
        if (!email) return;

        setIsSendingOtp(true);
        try {
            await OtpService.getOtp(email, 'VERIFY_EMAIL');
            showSuccessNotification('Gửi mã thành công', 'Mã xác thực đã được gửi đến email của bạn.');
        } catch (err) {
            showErrorNotification('Gửi mã thất bại', getErrorMessage(err) || 'Không thể gửi mã xác thực. Vui lòng thử lại.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!email || otpValue.length !== 6) {
            showErrorNotification('Thông báo lỗi', 'Vui lòng nhập đủ 6 số');
            return;
        }

        setIsVerifying(true);
        try {
            await authService.verifyEmail(otpValue);
            dispatch(updateVerifiedStatus(true));
            showSuccessNotification('Xác thực thành công', 'Email của bạn đã được xác thực thành công.');
            handleClose();
            redirectTo();
        } catch (error: any) {
            showErrorNotification('Xác thực thất bại', error.message || 'Mã xác thực không đúng');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleClose = () => {
        setOtpValue('');
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Xác thực email"
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Stack>
                <Text size="sm" c="dimmed">
                    Nhập mã xác thực 6 số đã được gửi đến email: <strong>{email}</strong>
                </Text>

                <PinInput
                    length={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    type="number"
                    size="lg"
                    mx="auto"
                />

                <Group justify="space-between">
                    <Button
                        variant="subtle"
                        size="sm"
                        onClick={handleSendOtp}
                        loading={isSendingOtp}
                        disabled={isSendingOtp}
                    >
                        Gửi lại mã
                    </Button>

                    <Button
                        onClick={handleVerifyOtp}
                        loading={isVerifying}
                        disabled={otpValue.length !== 6 || isVerifying}
                    >
                        Xác thực
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ModalVerifyCode;
