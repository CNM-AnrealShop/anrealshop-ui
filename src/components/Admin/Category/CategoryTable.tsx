import { ActionIcon, Badge, Group, Menu, Table, Text, Tooltip } from '@mantine/core';
import { FiEdit2, FiEye, FiEyeOff, FiMoreVertical, FiPlus, FiTrash2 } from 'react-icons/fi';
import type { AdminCategoryDto } from '../../../types/CategoryType';
import PaginationCustom from '../../common/PaginationCustom';

interface CategoryTableProps {
    categories: AdminCategoryDto[];
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onEdit: (category: AdminCategoryDto) => void;
    onDelete: (categoryId: string) => void;
    onToggleStatus: (categoryId: string) => void;
}

export const CategoryTable = ({
    categories,
    currentPage,
    itemsPerPage,
    onPageChange,
    onEdit,
    onDelete,
    onToggleStatus
}: CategoryTableProps) => {

    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCategories = categories.slice(startIndex, endIndex);

    const getDirectChildrenCount = (parentId: string): number => {
        return paginatedCategories.filter(cat => cat.parentId === parentId).length;
    };

    const rows = paginatedCategories.map((category) => {
        const directChildrenCount = getDirectChildrenCount(category.id);

        return (
            <Table.Tr key={category.id}>
                <Table.Td>
                    <Text>
                        {'—'.repeat(category.level)} {category.name}
                    </Text>
                    {category.description && (
                        <Text size="xs" c="dimmed" lineClamp={1}>
                            {category.description}
                        </Text>
                    )}
                </Table.Td>
                <Table.Td>{category.slug}</Table.Td>
                <Table.Td>
                    {category.level === 0 ? 'Danh mục gốc' : `Cấp ${category.level + 1}`}
                    {directChildrenCount > 0 && (
                        <Text size="xs" c="dimmed">
                            {directChildrenCount} danh mục con trực tiếp
                        </Text>
                    )}
                </Table.Td>
                <Table.Td>
                    <Group gap="xs">
                        <Badge
                            color={category.visible ? 'green' : 'gray'}
                            variant="light"
                        >
                            {category.visible ? 'Hiện' : 'Ẩn'}
                        </Badge>
                        <Tooltip label={category.visible ? "Ẩn danh mục này" : "Hiện danh mục này"}>
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                color={category.visible ? "blue" : "gray"}
                                onClick={() => onToggleStatus(category.id)}
                            >
                                <FiEye size={14} style={{ opacity: category.visible ? 1 : 0.5 }} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Group justify="center" gap="xs">
                        <Tooltip label="Chỉnh sửa">
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                onClick={() => onEdit(category)}
                            >
                                <FiEdit2 size={14} />
                            </ActionIcon>
                        </Tooltip>
                        <Menu position="bottom-end" withArrow withinPortal>
                            <Menu.Target>
                                <ActionIcon size="sm" variant="subtle">
                                    <FiMoreVertical size={14} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={<FiPlus size={14} />}
                                    onClick={() => onEdit(category)}
                                >
                                    Thêm danh mục con
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<FiEdit2 size={14} />}
                                    onClick={() => onEdit(category)}
                                >
                                    Chỉnh sửa
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={category.visible ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                                    onClick={() => onToggleStatus(category.id)}
                                >
                                    {category.visible ? 'Ẩn danh mục' : 'Hiện danh mục'}
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    leftSection={<FiTrash2 size={14} />}
                                    color="red"
                                    onClick={() => onDelete(category.id)}
                                    disabled={category.hasChildren || category.productCount > 0}
                                >
                                    Xóa danh mục
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <div className="overflow-x-auto">
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ minWidth: '200px', maxWidth: '300px' }}>Tên danh mục</Table.Th>
                        <Table.Th style={{ width: '180px' }}>Slug</Table.Th>
                        <Table.Th style={{ width: '150px' }}>Cấp độ</Table.Th>
                        <Table.Th style={{ width: '120px' }}>Trạng thái</Table.Th>
                        <Table.Th style={{ width: '120px', textAlign: 'center' }}>Hành động</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <PaginationCustom
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={categories.length}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};
