import { Button, Checkbox, Group, Modal, Stack, Text } from '@mantine/core';
import type { AdminCategoryDto } from '../../../types/CategoryType';

interface ModalConfirmStatusProps {
    opened: boolean;
    onClose: () => void;
    category: AdminCategoryDto | null;
    includeChildren: boolean;
    onIncludeChildrenChange: (value: boolean) => void;
    onConfirm: () => void;
    isSubmitting: boolean;
}

const ModalConfirmStatus: React.FC<ModalConfirmStatusProps> = ({
    opened,
    onClose,
    category,
    includeChildren,
    onIncludeChildrenChange,
    onConfirm,
    isSubmitting
}) => {
    if (!category) return null;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`${!category.visible ? 'Ẩn' : 'Hiện'} danh mục`}
            centered
            p={"md"}
        >
            <Stack gap="md">
                <Text size="sm">
                    Bạn có chắc chắn muốn {!category.visible ? 'ẩn' : 'hiện'} danh mục{' '}
                    <Text span fw={700}>{category.name}</Text>?
                </Text>

                <Checkbox
                    label="Áp dụng cho tất cả danh mục con (nếu có)"
                    checked={includeChildren}
                    onChange={(event) => onIncludeChildrenChange(event.currentTarget.checked)}
                />

                <Group justify="flex-end" gap="sm">
                    <Button variant="default" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={onConfirm}
                        loading={isSubmitting}
                        color={!category.visible ? 'red' : 'blue'}
                    >
                        {!category.visible ? 'Ẩn' : 'Hiện'}
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ModalConfirmStatus;
