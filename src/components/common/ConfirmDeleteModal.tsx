import { Button, Group, Modal, Text } from '@mantine/core';
import { useMemo } from 'react';

interface ConfirmDeleteModalProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    itemName?: string;
}

export const ConfirmDeleteModal = ({
    opened,
    onClose,
    onConfirm,
    title = "Xác nhận xóa",
    message,
    confirmText = "Xóa",
    cancelText = "Hủy",
    itemName
}: ConfirmDeleteModalProps) => {
    const randomImage = useMemo(() => {
        if (opened) {
            const imageNumber = Math.floor(Math.random() * 7) + 15;
            return `/images/boan_khoan/${imageNumber}.png`;
        }
    }, [opened]);

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
                {opened && (<img
                    src={randomImage}
                    alt="Confirm delete"
                    className="w-40 h-40 mx-auto mb-4 object-contain"
                />)}
                <Text size="lg" fw={600} mb="xs">
                    {message}
                </Text>
                {itemName && (
                    <Text size="sm" c="dimmed" mb="md">
                        {itemName}
                    </Text>
                )}
                <Text size="sm" c="dimmed" mb="xl">
                    Hành động này không thể hoàn tác.
                </Text>

                <Group justify="center" gap="md">
                    <Button variant="outline" onClick={onClose} size="sm">
                        {cancelText}
                    </Button>
                    <Button color="red" onClick={onConfirm} size="sm">
                        {confirmText}
                    </Button>
                </Group>
            </div>
        </Modal>
    );
};
