import { Box, Button, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { useCategory } from '../../../hooks/useCategory';
import type { AdminCategoryDto, CategoryDisplayDto } from '../../../types/CategoryType';
import showErrorNotification from '../../Toast/NotificationError';
import PaginationCustom from '../../common/PaginationCustom';
import { CategoryDisplayList } from './CategoryDisplayList';
import { CategorySourceTree } from './CategorySourceTree';
import { CategorySourceTreeSideBar } from './CategorySourceTreeSideBar';

export const CategoryDisplayPage = () => {
    const {
        categories,
        categoriesDisplay,
        isSubmitting,
        getCategoriesDisplay,
        updateCategoryDisplay,
        deleteCategoryDisplay,
    } = useCategory({ autoFetch: true });

    const [localHomepageCategories, setLocalHomepageCategories] = useState<CategoryDisplayDto[]>([]);
    const [localSidebarCategories, setLocalSidebarCategories] = useState<CategoryDisplayDto[]>([]);
    const [removedHomepageIds, setRemovedHomepageIds] = useState<string[]>([]);
    const [removedSidebarIds, setRemovedSidebarIds] = useState<string[]>([]);
    const [hasHomepageChanges, setHasHomepageChanges] = useState(false);
    const [hasSidebarChanges, setHasSidebarChanges] = useState(false);
    const [sidebarCurrentPage, setSidebarCurrentPage] = useState(1);
    const sidebarItemsPerPage = 10;

    useEffect(() => {
        getCategoriesDisplay();
    }, [getCategoriesDisplay]);

    const homepageCategories = useMemo(() =>
        categoriesDisplay.filter(c => c.position === 'HOMEPAGE'),
        [categoriesDisplay]);

    const sidebarCategories = useMemo(() =>
        categoriesDisplay.filter(c => c.position === 'SIDEBAR'),
        [categoriesDisplay]);

    const paginatedSidebarCategories = useMemo(() => {
        const startIndex = (sidebarCurrentPage - 1) * sidebarItemsPerPage;
        const endIndex = startIndex + sidebarItemsPerPage;
        return localSidebarCategories.slice(startIndex, endIndex);
    }, [localSidebarCategories, sidebarCurrentPage]);

    const sidebarTotalPages = useMemo(() =>
        Math.ceil(localSidebarCategories.length / sidebarItemsPerPage),
        [localSidebarCategories.length]
    );

    useEffect(() => {
        setLocalHomepageCategories(homepageCategories);
        setRemovedHomepageIds([]);
        setHasHomepageChanges(false);
    }, [homepageCategories]);

    useEffect(() => {
        setLocalSidebarCategories(sidebarCategories);
        setRemovedSidebarIds([]);
        setHasSidebarChanges(false);
        setSidebarCurrentPage(1);
    }, [sidebarCategories]);

    const handleAddToDisplay = (category: AdminCategoryDto, position: 'HOMEPAGE' | 'SIDEBAR') => {
        if (position === 'HOMEPAGE' && localHomepageCategories.length >= 7) {
            showErrorNotification('Thông báo lỗi', 'Đã đạt đến số lượng danh mục tối đa cho trang chủ (7 danh mục).');
            return;
        }
        const findAllChildren = (parentCategory: AdminCategoryDto): AdminCategoryDto[] => {
            const children = categories.filter(cat => cat.parentId === parentCategory.id);
            const allDescendants: AdminCategoryDto[] = [...children];

            children.forEach(child => {
                const descendants = findAllChildren(child);
                allDescendants.push(...descendants);
            });

            return allDescendants;
        };

        if (position === 'HOMEPAGE') {
            const order = localHomepageCategories.length + 1;
            const categoryDisplayToAdd: CategoryDisplayDto = {
                id: '',
                categoryId: category.id,
                categoryName: category.name,
                position: position,
                order,
                slug: category.slug,
                parentId: category.parentId,
                level: category.level,
            };
            setLocalHomepageCategories(prev => [...prev, categoryDisplayToAdd]);
            setHasHomepageChanges(true);
        } else {
            const categoriesToAdd: CategoryDisplayDto[] = [];
            let currentOrder = localSidebarCategories.length + 1;

            categoriesToAdd.push({
                id: '',
                categoryId: category.id,
                categoryName: category.name,
                position: position,
                order: currentOrder++,
                slug: category.slug,
                parentId: category.parentId,
                level: category.level,
            });
            if (category.hasChildren) {
                const allChildren = findAllChildren(category);
                allChildren.forEach(child => {
                    const isAlreadyAdded = localSidebarCategories.some(c => c.categoryId === child.id);
                    if (!isAlreadyAdded) {
                        categoriesToAdd.push({
                            id: '',
                            categoryId: child.id,
                            categoryName: child.name,
                            position: position,
                            order: currentOrder++,
                            slug: child.slug,
                            parentId: child.parentId,
                            level: child.level,
                        });
                    }
                });
            }
            const newCategories = categoriesToAdd.filter(
                newCat => !localSidebarCategories.some(existingCat => existingCat.categoryId === newCat.categoryId)
            );

            if (newCategories.length > 0) {
                setLocalSidebarCategories(prev => [...prev, ...newCategories]);
                setHasSidebarChanges(true);
            }
        }
    };

    const handleRemove = (categoryId: string, position: 'HOMEPAGE' | 'SIDEBAR') => {
        if (position === 'HOMEPAGE') {
            const removedCategory = localHomepageCategories.find(c => c.categoryId === categoryId);
            if (removedCategory?.id) {
                setRemovedHomepageIds(prev => [...prev, removedCategory.id]);
            }
            setLocalHomepageCategories(prev => prev.filter(c => c.categoryId !== categoryId));
            setHasHomepageChanges(true);
        } else {
            const removedCategory = localSidebarCategories.find(c => c.categoryId === categoryId);
            if (removedCategory?.id) {
                setRemovedSidebarIds(prev => [...prev, removedCategory.id]);
            }
            setLocalSidebarCategories(prev => prev.filter(c => c.categoryId !== categoryId));
            setHasSidebarChanges(true);
        }
    };

    const handleReorder = (reorderedCategories: CategoryDisplayDto[], position: 'HOMEPAGE' | 'SIDEBAR') => {
        if (position === 'HOMEPAGE') {
            setLocalHomepageCategories(reorderedCategories);
            setHasHomepageChanges(true);
        } else {
            setLocalSidebarCategories(reorderedCategories);
            setHasSidebarChanges(true);
        }
    }

    const handleSaveHomepage = async () => {
        try {
            if (removedHomepageIds.length > 0) {
                await deleteCategoryDisplay(removedHomepageIds);
            }
            const otherCategories = categoriesDisplay.filter(c => c.position === 'HOMEPAGE');
            const categoriesToUpdate = [...otherCategories, ...localHomepageCategories].map(cat => ({
                id: cat.id,
                categoryId: cat.categoryId,
                position: cat.position,
                order: cat.order,
                thumbnailUrl: cat.thumbnailUrl,
                mediaType: cat.mediaType
            }));

            await updateCategoryDisplay(categoriesToUpdate);
            setRemovedHomepageIds([]);
        } catch (error) {
            console.error('Error saving homepage categories:', error);
        }
    };

    const handleSaveSidebar = async () => {
        try {
            if (removedSidebarIds.length > 0) {
                await deleteCategoryDisplay(removedSidebarIds);
            }

            const otherCategories = categoriesDisplay.filter(c => c.position === 'SIDEBAR');
            const categoriesToUpdate = [...otherCategories, ...localSidebarCategories].map(cat => ({
                id: cat.id,
                categoryId: cat.categoryId,
                position: cat.position,
                order: cat.order,
                thumbnailUrl: cat.thumbnailUrl,
                mediaType: cat.mediaType
            }));

            await updateCategoryDisplay(categoriesToUpdate);
            setRemovedSidebarIds([]);
        } catch (error) {
            console.error('Error saving sidebar categories:', error);
        }
    };

    const homepageIds = useMemo(() => localHomepageCategories.map(c => c.categoryId), [localHomepageCategories]);
    const sidebarIds = useMemo(() => localSidebarCategories.map(c => c.categoryId), [localSidebarCategories]);

    return (
        <Box>
            <Title order={4} mb="lg">Hiển thị danh mục</Title>

            <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box style={{ position: 'sticky', top: 80, zIndex: 1 }}>
                        <Paper shadow="xs" p="md" withBorder>
                            <Stack gap="md">
                                <Title order={5}>Danh mục có sẵn</Title>
                                <Text size="sm" c="dimmed">Chọn danh mục để thêm vào vị trí hiển thị</Text>
                                <CategorySourceTree
                                    categories={categories}
                                    onAddToDisplay={handleAddToDisplay}
                                    homepageIds={homepageIds}
                                    sidebarIds={sidebarIds}
                                />
                            </Stack>
                        </Paper>
                    </Box>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="md">
                        <Paper shadow="xs" p="md" withBorder>
                            <Stack gap="md">
                                <Group justify="space-between" align="center">
                                    <div>
                                        <Title order={5}>Danh mục trang chủ</Title>
                                        <Text size="sm" c="dimmed">Hiển thị trên trang chủ (tối đa 7 danh mục)</Text>
                                    </div>
                                    {hasHomepageChanges && (
                                        <Button
                                            leftSection={<FiSave size={14} />}
                                            onClick={handleSaveHomepage}
                                            loading={isSubmitting}
                                            size="sm"
                                        >
                                            Lưu thay đổi
                                        </Button>
                                    )}
                                </Group>
                                <CategoryDisplayList
                                    categories={localHomepageCategories}
                                    setCategories={(updater) => {
                                        setLocalHomepageCategories(updater);
                                        setHasHomepageChanges(true);
                                    }}
                                    position="HOMEPAGE"
                                    onRemove={handleRemove}
                                    onReorder={handleReorder}
                                    maxItems={7}
                                />
                            </Stack>
                        </Paper>

                        <Paper shadow="xs" p="md" withBorder>
                            <Stack gap="md">
                                <Group justify="space-between" align="center">
                                    <div>
                                        <Title order={5}>Danh mục sidebar</Title>
                                        <Text size="sm" c="dimmed">Hiển thị trên thanh bên (tối đa 10 danh mục)</Text>
                                    </div>
                                    {hasSidebarChanges && (
                                        <Button
                                            leftSection={<FiSave size={16} />}
                                            onClick={handleSaveSidebar}
                                            loading={isSubmitting}
                                            size="sm"
                                        >
                                            Lưu thay đổi
                                        </Button>
                                    )}
                                </Group>
                                <CategorySourceTreeSideBar
                                    categories={paginatedSidebarCategories}
                                    setCategories={(updater) => {
                                        setLocalSidebarCategories(prev => {
                                            const newCategories = typeof updater === 'function' ? updater(prev) : updater;
                                            setHasSidebarChanges(true);
                                            return newCategories;
                                        });
                                    }}
                                    position="SIDEBAR"
                                    onRemove={handleRemove}
                                    onReorder={handleReorder}
                                    maxItems={100}
                                />
                                {localSidebarCategories.length > sidebarItemsPerPage && (
                                    <PaginationCustom
                                        currentPage={sidebarCurrentPage}
                                        totalPages={sidebarTotalPages}
                                        totalItems={localSidebarCategories.length}
                                        itemsPerPage={sidebarItemsPerPage}
                                        onPageChange={setSidebarCurrentPage}
                                    />
                                )}
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Box>
    );
};

export default CategoryDisplayPage;
