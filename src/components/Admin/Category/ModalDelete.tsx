import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Group,
    Modal,
    Stack,
    Text
} from '@mantine/core';
import { FiAlertCircle } from 'react-icons/fi';
import type { AdminCategoryDto } from '../../../types/CategoryType';

interface DeleteCategoryModalProps {
    opened: boolean;
    onClose: () => void;
    onConfirmDelete: (includeChildren: boolean) => void;
    category: AdminCategoryDto | null;
    isSubmitting?: boolean;
}

/**
 * Modal xác nhận xóa danh mục
 */
const ModalDelete: React.FC<DeleteCategoryModalProps> = ({
    opened,
    onClose,
    onConfirmDelete,
    category,
    isSubmitting = false
}) => {
    const [includeChildren, setIncludeChildren] = useState(false);

    if (!category) return null;

    const canDelete = category.productCount === 0;
    const hasChildren = category.hasChildren;

    const handleConfirm = () => {
        onConfirmDelete(includeChildren);
    };

    const handleClose = () => {
        setIncludeChildren(false);
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Xác nhận xóa danh mục"
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            p={"md"}
        >
            <Stack gap="md">
                <Group align="flex-start">
                    <FiAlertCircle size={24} className="text-red-500" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                        <Text fw={500}>Bạn có chắc chắn muốn xóa danh mục này?</Text>
                        <Text size="sm" c="dimmed" mt={4}>
                            <Text span fw={600}>{category.name}</Text>
                        </Text>
                    </div>
                </Group>

                {!canDelete ? (
                    <Stack gap="xs">
                        {category.productCount > 0 && (
                            <Text c="red" size="sm">
                                ⚠️ Không thể xóa: Danh mục này có {category.productCount} sản phẩm
                            </Text>
                        )}
                        <Text c="dimmed" size="xs" mt="xs">
                            Vui lòng di chuyển hoặc xóa tất cả sản phẩm trước khi xóa danh mục này.
                        </Text>
                    </Stack>
                ) : (
                    <>
                        {hasChildren && (
                            <Stack gap="xs">
                                <Checkbox
                                    label="Xóa cả tất cả danh mục con (không thể hoàn tác)"
                                    checked={includeChildren}
                                    onChange={(event) => setIncludeChildren(event.currentTarget.checked)}
                                    color="red"
                                />

                                {includeChildren ? (
                                    <Text c="red" size="xs" mt="xs">
                                        ⚠️ Tất cả danh mục con sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác!
                                    </Text>
                                ) : (
                                    <Text c="dimmed" size="xs" mt="xs">
                                        Nếu không chọn, bạn cần xóa hoặc di chuyển các danh mục con trước.
                                    </Text>
                                )}
                            </Stack>
                        )}

                        {!hasChildren && (
                            <Text c="dimmed" size="xs">
                                Hành động này không thể hoàn tác.
                            </Text>
                        )}
                    </>
                )}

                <Group justify="flex-end" mt="md">
                    <Button variant="outline" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        color="red"
                        onClick={handleConfirm}
                        disabled={!canDelete || (hasChildren && !includeChildren)}
                        loading={isSubmitting}
                    >
                        Xác nhận xóa
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ModalDelete;