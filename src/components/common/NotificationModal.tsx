import { Button, Group, Modal, Text } from '@mantine/core';
import { useMemo } from 'react';

interface NotificationModalProps {
    opened: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => void;
    showCancel?: boolean;
    cancelText?: string;
    onCancel?: () => void;
    imageType?: 'boan_khoan' | 'success' | 'info';
}

export const NotificationModal = ({
    opened,
    onClose,
    title = "Thông báo",
    message,
    confirmText = "Đồng ý",
    onConfirm,
    showCancel = false,
    cancelText = "Hủy",
    onCancel,
    imageType = 'info'
}: NotificationModalProps) => {
    const randomImage = useMemo(() => {
        if (imageType === 'boan_khoan') {
            const imageNumber = Math.floor(Math.random() * 7) + 15;
            return `/images/boan_khoan/${imageNumber}.png`;
        }
        return `/images/boan_khoan/15.png`;
    }, [opened, imageType]);

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            onClose();
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            onClose();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={title}
            size="sm"
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <div className="text-center">
                <img
                    src={randomImage}
                    alt="Notification"
                    className="w-32 h-32 mx-auto mb-4 object-contain"
                />
                <Text size="lg" fw={600} mb="md">
                    {message}
                </Text>

                <Group justify="center" gap="md" mt="xl">
                    {showCancel && (
                        <Button variant="outline" onClick={handleCancel} size="md">
                            {cancelText}
                        </Button>
                    )}
                    <Button onClick={handleConfirm} size="md">
                        {confirmText}
                    </Button>
                </Group>
            </div>
        </Modal>
    );
};
