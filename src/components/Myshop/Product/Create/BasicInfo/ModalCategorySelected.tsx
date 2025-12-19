import {
    Modal,
    Button,
    Group,
    Text,
    Stack,
    ScrollArea,
    Box,
    Divider
} from '@mantine/core';
import { useState, useEffect, memo } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import type { BaseCategoryDto } from '../../../../../types/CategoryType';
import { CategoryService } from '../../../../../service/CategoryService';

interface ModalCategorySelectedProps {
    opened: boolean;
    onClose: () => void;
    onSelect: (categoryId: string, path: string) => void;
    selectedCategoryId?: string;
}

const ModalCategorySelected = memo(({ opened, onClose, onSelect, selectedCategoryId }: ModalCategorySelectedProps) => {
    const [selectedPath, setSelectedPath] = useState<string[]>([]);
    const [categories, setCategories] = useState<BaseCategoryDto[]>([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            const categories = await CategoryService.getCategoryForShop();
            setCategories(categories);
        }
        fetchAllCategories();
    }, []);

    useEffect(() => {
        if (opened && selectedCategoryId) {
            const buildPath = (categoryId: string): string[] => {
                const category = categories.find(cat => cat.id === categoryId);
                if (!category) return [];
                
                if (category.parentId) {
                    return [...buildPath(category.parentId), categoryId];
                }
                return [categoryId];
            };
            
            setSelectedPath(buildPath(selectedCategoryId));
        } else if (opened && !selectedCategoryId) {
            setSelectedPath([]);
        }
    }, [opened, selectedCategoryId, categories]);

    const getCategoriesByLevel = (level: number) => {
        const parentId = level === 0 ? undefined : selectedPath[level - 1];
        return categories.filter(cat => cat.level === level && cat.parentId === parentId);
    };

    const handleCategoryClick = (categoryId: string, level: number) => {
        const newPath = selectedPath.slice(0, level).concat(categoryId);
        setSelectedPath(newPath);
    };

    const handleSave = () => {
        if (selectedPath.length > 0) {
            const lastSelected = selectedPath[selectedPath.length - 1];
            const selectedCategory = categories.find(cat => cat.id === lastSelected);
            const path = selectedCategory ? selectedCategory.urlPath || selectedCategory.name : '';
            onSelect(lastSelected, path);
        }
        handleClose();
    };

    const handleClose = () => {
        setSelectedPath([]);
        onClose();
    };

    const getSelectedPathDisplay = () => {
        return selectedPath
            .map(id => categories.find(cat => cat.id === id)?.name)
            .filter(Boolean)
            .join(' > ');
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Chọn danh mục sản phẩm"
            size="xl"
        >
            <Box mb="md" p="sm" className="bg-gray-50 rounded">
                <Text size="sm" fw={500}>{selectedPath.length > 0 ? "Bạn chọn: ": "Vui lòng chọn danh mục "} {getSelectedPathDisplay()}</Text>
            </Box>

            <Group align="flex-start" gap="md" style={{ height: '80%' }}>
                {[0, 1, 2].map(level => {
                    const levelCategories = getCategoriesByLevel(level);

                    return (
                        <Box key={level} style={{ flex: 1, height: '100%' }}>
                            <Text size="sm" fw={600} mb="xs">Cấp {level + 1}</Text>
                            <Divider mb="xs" />
                            <ScrollArea style={{ height: 320 }}>
                                <Stack gap={2} mr={10}>
                                    {levelCategories.map(category => {
                                        const isSelected = selectedPath[level] === category.id;
                                        const hasChildren = categories.some(cat => cat.parentId === category.id);

                                        return (
                                            <Button
                                                key={category.id}
                                                variant={isSelected ? "filled" : "subtle"}
                                                fullWidth
                                                justify="space-between"
                                                onClick={() => handleCategoryClick(category.id, level)}
                                                rightSection={hasChildren ? <FiChevronRight size={14} /> : null}
                                            >
                                                {category.name}
                                            </Button>
                                        );
                                    })}
                                    {levelCategories.length === 0 && level > 0 && (
                                        <Text size="sm" c="dimmed" ta="center" py="md">
                                            Không có danh mục con
                                        </Text>
                                    )}
                                </Stack>
                            </ScrollArea>
                        </Box>
                    );
                })}
            </Group>

            <Group justify='end' mt="md">
                <Button variant="outline" onClick={handleClose}>Hủy</Button>
                <Button 
                    onClick={handleSave}
                    disabled={selectedPath.length === 0}
                >
                    Xác nhận
                </Button>
            </Group>
        </Modal>
    );
});

export default ModalCategorySelected;
