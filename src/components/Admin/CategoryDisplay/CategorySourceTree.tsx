import { ActionIcon, Badge, Box, Group, Menu, Text, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiHome, FiLayers, FiSidebar } from 'react-icons/fi';
import type { AdminCategoryDto } from '../../../types/CategoryType';

interface CategorySourceTreeProps {
    categories: AdminCategoryDto[];
    onAddToDisplay: (category: AdminCategoryDto, position: 'HOMEPAGE' | 'SIDEBAR') => void;
    homepageIds?: string[];
    sidebarIds?: string[];
}

export const CategorySourceTree = ({
    categories,
    onAddToDisplay,
    homepageIds = [],
    sidebarIds = []
}: CategorySourceTreeProps) => {
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
        return categoryList.map((category) => {
            const typedCategory = category as AdminCategoryDto & { children?: AdminCategoryDto[] };
            const hasChildren = typedCategory.children && typedCategory.children.length > 0;
            const isInHomepage = homepageIds.includes(category.id);
            const isInSidebar = sidebarIds.includes(category.id);
            const isFullyAdded = isInHomepage && isInSidebar;

            return (
                <Box
                    key={category.id}
                    style={{
                        marginLeft: `${currentLevel * 16}px`,
                        marginBottom: '4px',
                    }}
                >
                    <Box
                        className={`rounded-md border border-gray-200 hover:bg-gray-50`}
                    >
                        <Group justify="space-between" p="xs" align="center" className='!flex-nowrap'>
                            <Group gap="xs">
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
                                        <FiLayers size={12} />
                                    </ActionIcon>
                                )}

                                <Tooltip label={category.name} position="top-start" withArrow>
                                    <Text size="sm" className='flex-1' lineClamp={1} fw={500}>{category.name}</Text>
                                </Tooltip>
                                    

                                {isFullyAdded && (
                                    <Badge size="xs" color="gray">Đã thêm đầy đủ</Badge>
                                )}
                            </Group>

                            {!isFullyAdded && (
                                <Menu position="bottom-end" withArrow withinPortal>
                                    <Menu.Target>
                                        <ActionIcon size="sm" variant="subtle">
                                            <FiChevronRight size={12} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            leftSection={<FiHome size={14} />}
                                            onClick={() => onAddToDisplay(category, 'HOMEPAGE')}
                                            disabled={isInHomepage}
                                        >
                                            Thêm vào trang chủ
                                            {isInHomepage && <Text size="xs" c="dimmed" ml="xs">(Đã thêm)</Text>}
                                        </Menu.Item>
                                        <Menu.Item
                                            leftSection={<FiSidebar size={14} />}
                                            onClick={() => onAddToDisplay(category, 'SIDEBAR')}
                                            disabled={isInSidebar}
                                        >
                                            Thêm vào sidebar
                                            {isInSidebar && <Text size="xs" c="dimmed" ml="xs">(Đã thêm)</Text>}
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            )}
                        </Group>
                    </Box>

                    {hasChildren && expandedCategories.includes(category.id) && (
                        <Box mt="xs">
                            {renderCategoryTreeRecursive(typedCategory.children!, currentLevel + 1)}
                        </Box>
                    )}
                </Box>
            );
        });
    };

    const tree = buildCategoryTree(categories.filter(c => c.visible));

    return (
        <Box className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)', minHeight: '80vh' }}>
            {tree.length > 0 ? (
                renderCategoryTreeRecursive(tree, 0)
            ) : (
                <Text size="sm" c="dimmed" ta="center" py="xl">
                    Không có danh mục nào
                </Text>
            )}
        </Box>
    );
};
