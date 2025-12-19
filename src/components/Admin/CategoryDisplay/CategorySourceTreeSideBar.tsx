import { ActionIcon, Badge, Box, Button, Collapse, Group, Image, Loader, Menu, Text } from '@mantine/core';
import { motion, Reorder } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { FiChevronRight, FiChevronsDown, FiEdit2, FiImage, FiVideo, FiX } from 'react-icons/fi';
import { uploadToCloudinary } from '../../../service/Cloundinary';
import type { CategoryDisplayDto } from '../../../types/CategoryType';
import showErrorNotification from '../../Toast/NotificationError';

interface CategorySourceTreeSideBarProps {
    categories: CategoryDisplayDto[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryDisplayDto[]>>;
    position: 'HOMEPAGE' | 'SIDEBAR';
    onRemove: (categoryId: string, position: 'HOMEPAGE' | 'SIDEBAR') => void;
    onReorder: (categories: CategoryDisplayDto[], position: 'HOMEPAGE' | 'SIDEBAR') => void;
    maxItems: number;
}

interface TreeNode extends CategoryDisplayDto {
    children: TreeNode[];
}

export const CategorySourceTreeSideBar = ({
    categories,
    setCategories,
    position,
    onRemove,
    onReorder,
    maxItems
}: CategorySourceTreeSideBarProps) => {
    const [uploadingCategoryId, setUploadingCategoryId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedMediaType, setSelectedMediaType] = useState<'IMAGE' | 'VIDEO' | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    const treeCategories = useMemo(() => {
        const buildTree = (items: CategoryDisplayDto[]): TreeNode[] => {
            const map = new Map<string, TreeNode>();
            const roots: TreeNode[] = [];
            items.forEach(item => {
                map.set(item.categoryId, { ...item, children: [] });
            });
            items.forEach(item => {
                const node = map.get(item.categoryId)!;
                if (item.parentId && map.has(item.parentId)) {
                    map.get(item.parentId)!.children.push(node);
                } else {
                    roots.push(node);
                }
            });

            return roots;
        };

        return buildTree(categories);
    }, [categories]);

    const handleMediaUpload = async (file: File | null) => {
        if (!file || !selectedCategoryId || !selectedMediaType) return;

        const category = categories.find(c => c.categoryId === selectedCategoryId);
        if (!category) return;
        setUploadingCategoryId(selectedCategoryId);

        try {
            const resourceType = selectedMediaType === 'VIDEO' ? 'video' : 'image';
            const { secure_url } = await uploadToCloudinary(file, resourceType);

            setCategories(prev => prev.map(cat =>
                cat.categoryId === selectedCategoryId
                    ? { ...cat, thumbnailUrl: secure_url, mediaType: selectedMediaType }
                    : cat
            ));
        } catch (error) {
            showErrorNotification('Không thể tải lên file. Vui lòng thử lại.');
        } finally {
            setUploadingCategoryId(null);
            setSelectedCategoryId(null);
            setSelectedMediaType(null);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleMediaUpload(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openFileDialog = (categoryId: string, mediaType: 'IMAGE' | 'VIDEO') => {
        setSelectedCategoryId(categoryId);
        setSelectedMediaType(mediaType);

        if (fileInputRef.current) {
            fileInputRef.current.accept = mediaType === 'IMAGE' ? 'image/*' : 'video/*';
            fileInputRef.current.click();
        }
    };

    const toggleExpand = (categoryId: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const handleReorder = (newCategories: CategoryDisplayDto[]) => {
        onReorder(newCategories.map((cat, idx) => ({ ...cat, order: idx + 1 })), position);
    };

    const renderCategory = (node: TreeNode, index: number, level: number = 0): React.ReactNode => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedCategories.has(node.categoryId);

        return (
            <div key={node.categoryId} style={{ marginLeft: level * 16 }}>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border rounded-lg bg-white mb-2"
                >
                    <Group justify="space-between" p="xs" wrap="nowrap" gap="md">
                        {/* Expand/Collapse Button */}
                        {hasChildren ? (
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                onClick={() => toggleExpand(node.categoryId)}
                            >
                                <motion.div
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiChevronRight size={14} />
                                </motion.div>
                            </ActionIcon>
                        ) : (
                            <Box w={28} />
                        )}

                        {/* Drag Handle */}
                        <ActionIcon size="sm" variant="subtle" color="gray" style={{ cursor: 'grab' }}>
                            <FiChevronsDown size={14} />
                        </ActionIcon>

                        {/* Category Name */}
                        <Box style={{ flex: '0 0 180px', minWidth: 0 }}>
                            <Text size="sm" fw={level === 0 ? 500 : 400} lineClamp={2}>
                                {node.categoryName}
                            </Text>
                        </Box>

                        {/* Thumbnail */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                minWidth: node.mediaType === 'VIDEO' ? 120 : 80,
                                height: 60,
                                borderRadius: 8,
                                overflow: 'hidden',
                                border: '1px solid #e0e0e0',
                                backgroundColor: '#f5f5f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                position: 'relative'
                            }}
                        >
                            {uploadingCategoryId === node.categoryId ? (
                                <Loader size="sm" />
                            ) : node.thumbnailUrl ? (
                                <>
                                    {node.mediaType === 'VIDEO' ? (
                                        <video
                                            src={node.thumbnailUrl}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            autoPlay
                                            muted
                                            loop
                                        />
                                    ) : (
                                        <Image
                                            src={node.thumbnailUrl}
                                            alt={node.categoryName}
                                            fit="cover"
                                            h="100%"
                                        />
                                    )}
                                </>
                            ) : (
                                <FiImage size={24} color="#ccc" />
                            )}
                        </motion.div>

                        <Box style={{ flex: 1 }} />

                        {/* Edit Menu */}
                        <Menu position="bottom-end" withArrow>
                            <Menu.Target>
                                <ActionIcon
                                    size="sm"
                                    variant="subtle"
                                    color="blue"
                                    disabled={uploadingCategoryId === node.categoryId}
                                >
                                    <FiEdit2 size={14} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Cập nhật media</Menu.Label>
                                <Menu.Item
                                    leftSection={<FiImage size={14} />}
                                    onClick={() => openFileDialog(node.categoryId, 'IMAGE')}
                                    disabled={uploadingCategoryId === node.categoryId}
                                >
                                    Tải lên hình ảnh
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<FiVideo size={14} />}
                                    onClick={() => openFileDialog(node.categoryId, 'VIDEO')}
                                    disabled={uploadingCategoryId === node.categoryId}
                                >
                                    Tải lên video
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        {/* Remove Button */}
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="red"
                            onClick={() => onRemove(node.categoryId, position)}
                        >
                            <FiX size={14} />
                        </ActionIcon>
                    </Group>
                </motion.div>

                {/* Render children */}
                {hasChildren && (
                    <Collapse in={isExpanded}>
                        <Box mt="xs">
                            {node.children.map((child, childIndex) =>
                                renderCategory(child, index + childIndex + 1, level + 1)
                            )}
                        </Box>
                    </Collapse>
                )}
            </div>
        );
    };

    if (categories.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Box className="border-2 border-dashed border-gray-300 rounded-lg" p="xl" ta="center">
                    <Text size="sm" c="dimmed">Chưa có danh mục nào. Chọn danh mục từ bên trái.</Text>
                    <Text size="xs" c="dimmed" mt="xs">(Tối đa {maxItems} danh mục)</Text>
                </Box>
            </motion.div>
        );
    }

    return (
        <Box>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Group justify="space-between" mb="sm">
                    <Group gap="xs">
                        <Text size="sm" c="dimmed">{categories.length} / {maxItems} danh mục</Text>
                        {categories.length >= maxItems && (
                            <Badge size="sm" color="red" variant="light">Đã đạt giới hạn</Badge>
                        )}
                    </Group>
                    <Button
                        variant="subtle"
                        size="xs"
                        onClick={() => {
                            const allIds = new Set(categories.map(c => c.categoryId));
                            setExpandedCategories(
                                expandedCategories.size > 0 ? new Set() : allIds
                            );
                        }}
                    >
                        {expandedCategories.size > 0 ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
                    </Button>
                </Group>
            </motion.div>

            <Reorder.Group
                axis="y"
                values={categories}
                onReorder={handleReorder}
                className="space-y-2"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
                {treeCategories.map((node, index) => (
                    <Reorder.Item
                        key={node.categoryId}
                        value={node}
                        style={{ cursor: 'grab' }}
                    >
                        {renderCategory(node, index)}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </Box>
    );
};
