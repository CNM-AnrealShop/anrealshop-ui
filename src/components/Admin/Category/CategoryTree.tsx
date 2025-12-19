import {
    ActionIcon,
    Badge,
    Box,
    Group,
    Menu,
    Text,
    Tooltip
} from '@mantine/core';
import {
    FiChevronDown,
    FiChevronRight,
    FiEdit2,
    FiEye,
    FiEyeOff,
    FiLayers,
    FiMoreVertical,
    FiPlus,
    FiTrash2
} from 'react-icons/fi';
import { useState } from 'react';
import type { AdminCategoryDto } from '../../../types/CategoryType';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryTreeProps {
    categories: AdminCategoryDto[];
    onEdit: (category: AdminCategoryDto, isAdd?: boolean) => void;
    onDelete: (categoryId: string) => void;
    onToggleStatus: (categoryId: string) => void;
}

export const CategoryTree = ({ categories, onEdit, onDelete, onToggleStatus }: CategoryTreeProps) => {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const toggleExpand = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const buildCategoryTree = (categories: AdminCategoryDto[]): AdminCategoryDto[] => {
        const categoryMap = new Map<string, AdminCategoryDto & { children: AdminCategoryDto[] }>();

        categories.forEach(cat => {
            categoryMap.set(cat.id, { ...cat, children: [] });
        });

        const tree: AdminCategoryDto[] = [];

        categoryMap.forEach(cat => {
            if (cat.parentId && categoryMap.has(cat.parentId)) {
                categoryMap.get(cat.parentId)!.children.push(cat);
            } else {
                tree.push(cat);
            }
        });

        return tree;
    };

    const renderCategoryTreeRecursive = (
        categoryList: AdminCategoryDto[],
        currentLevel: number = 0
    ): React.ReactNode[] => {
        return categoryList.map((category, index) => {
            const typedCategory = category as AdminCategoryDto & { children?: AdminCategoryDto[] };
            const hasChildren = typedCategory.children && typedCategory.children.length > 0;
            const isExpanded = expandedCategories.includes(category.id);

            return (
                <motion.div
                    key={category.id}
                    className="category-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{
                        marginLeft: `${currentLevel * 20}px`,
                        marginBottom: '8px',
                        marginTop: currentLevel === 0 && index > 0 ? '16px' : '0px',
                    }}
                >
                    <Box
                        className={`rounded-md border ${category.visible ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}
                    >
                        <Group
                            justify="space-between"
                            p="xs"
                            align="center"
                            className={`rounded-md ${!category.visible && 'opacity-70'}`}
                        >
                            <Group>
                                {hasChildren ? (
                                    <ActionIcon
                                        size="sm"
                                        variant="subtle"
                                        onClick={() => toggleExpand(category.id)}
                                    >
                                        {expandedCategories.includes(category.id) ? (
                                            <FiChevronDown />
                                        ) : (
                                            <FiChevronRight />
                                        )}
                                    </ActionIcon>
                                ) : (
                                    <ActionIcon size="sm" variant="subtle" color="gray" disabled>
                                        <FiLayers size={14} />
                                    </ActionIcon>
                                )}

                                <Group gap="sm" align="center">
                                    <Text fw={500}>{category.name}</Text>

                                    <Tooltip label={category.visible ? "Đang hiện" : "Đang ẩn"}>
                                        <ActionIcon
                                            size="xs"
                                            variant="transparent"
                                            color={category.visible ? "blue" : "gray"}
                                            onClick={() => onToggleStatus(category.id)}
                                        >
                                            {category.visible ? (
                                                <FiEye size={14} />
                                            ) : (
                                                <FiEyeOff size={14} style={{ opacity: 0.5 }} />
                                            )}
                                        </ActionIcon>
                                    </Tooltip>

                                    {!category.visible && (
                                        <Badge size="xs" color="gray">Ẩn</Badge>
                                    )}

                                    <Text c="dimmed" size="xs">
                                        <Text span c="dimmed" size="xs" className="hidden sm:inline">
                                            ({category.slug}) -
                                        </Text>
                                        {' '}
                                        {hasChildren
                                            ? `${typedCategory.children!.length} danh mục con`
                                            : 'Không có danh mục con'}
                                    </Text>
                                </Group>
                            </Group>

                            <Group gap="xs">
                                <Menu position="bottom-end" withArrow withinPortal>
                                    <Menu.Target>
                                        <ActionIcon variant="subtle">
                                            <FiMoreVertical size={14} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            leftSection={<FiPlus size={14} />}
                                            onClick={() => onEdit(category, true)}
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
                                        >
                                            Xóa danh mục
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Group>
                    </Box>

                    <AnimatePresence>
                        {hasChildren && isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <Box mt="xs">
                                    {renderCategoryTreeRecursive(typedCategory.children!, currentLevel + 1)}
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            );
        });
    };

    const tree = buildCategoryTree(categories);

    return (
        <Box className="rounded-lg bg-white">
            {renderCategoryTreeRecursive(tree, 0)}
        </Box>
    );
};
