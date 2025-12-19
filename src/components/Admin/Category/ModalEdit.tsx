import { Button, Group, Modal, Select, Stack, Switch, TextInput, Textarea } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CategoryRequestDto } from '../../../types/CategoryType';

interface CategoryModalProps {
    opened: boolean;
    onClose: () => void;
    form: UseFormReturnType<CategoryRequestDto>;
    onSubmit: (values: CategoryRequestDto) => void;
    isEditing: boolean;
    isSubmitting: boolean;
    parentOptions: { value: string; label: string; disabled?: boolean }[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    opened,
    onClose,
    form,
    onSubmit,
    isEditing,
    isSubmitting,
    parentOptions
}) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
            size="lg"
            centered
        >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack gap="md">
                    <TextInput
                        label="Tên danh mục"
                        placeholder="Nhập tên danh mục"
                        required
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        label="Slug"
                        placeholder="slug-danh-muc"
                        required
                        {...form.getInputProps('slug')}
                    />

                    <Select
                        label="Danh mục cha"
                        placeholder="Chọn danh mục cha (nếu có)"
                        data={parentOptions}
                        clearable
                        searchable
                        {...form.getInputProps('parentId')}
                    />

                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả cho danh mục"
                        minRows={3}
                        {...form.getInputProps('description')}
                    />

                    <Switch
                        label="Hiển thị danh mục"
                        description="Bật để hiển thị danh mục trên trang chủ"
                        {...form.getInputProps('visible', { type: 'checkbox' })}
                    />

                    <Group justify="flex-end" gap="sm" mt="md">
                        <Button variant="default" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button type="submit" loading={isSubmitting}>
                            {isEditing ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};

export default CategoryModal;