import { ActionIcon, Badge, Box, Button, Collapse, Group, Image, Loader, Menu, Text } from '@mantine/core';
import { useRef, useState } from 'react';
import { FiChevronDown, FiChevronsDown, FiChevronUp, FiEdit2, FiImage, FiVideo, FiX } from 'react-icons/fi';
import { motion, Reorder } from 'framer-motion';
import { uploadToCloudinary } from '../../../service/Cloundinary';
import type { CategoryDisplayDto } from '../../../types/CategoryType';
import showErrorNotification from '../../Toast/NotificationError';

interface CategoryDisplayListProps {
    categories: CategoryDisplayDto[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryDisplayDto[]>>;
    position: 'HOMEPAGE' | 'SIDEBAR';
    onRemove: (categoryId: string, position: 'HOMEPAGE' | 'SIDEBAR') => void;
    onReorder: (categories: CategoryDisplayDto[], position: 'HOMEPAGE' | 'SIDEBAR') => void;
    maxItems: number;
}

export const CategoryDisplayList = ({
    categories,
    setCategories,
    position,
    onRemove,
    onReorder,
    maxItems
}: CategoryDisplayListProps) => {
    const [uploadingCategoryId, setUploadingCategoryId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedMediaType, setSelectedMediaType] = useState<'IMAGE' | 'VIDEO' | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);


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

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= categories.length) return;

        const newCategories = [...categories];
        [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
        onReorder(newCategories.map((cat, idx) => ({ ...cat, order: idx + 1 })), position);
    };

    const handleReorder = (newCategories: CategoryDisplayDto[]) => {
        onReorder(newCategories.map((cat, idx) => ({ ...cat, order: idx + 1 })), position);
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
                        rightSection={
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FiChevronDown size={14} />
                            </motion.div>
                        }
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                    </Button>
                </Group>
            </motion.div>

            <Collapse in={isExpanded}>
                <Reorder.Group
                    axis="y"
                    values={categories}
                    onReorder={handleReorder}
                    className="space-y-2"
                    style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                    {categories.map((category, index) => (
                        <Reorder.Item
                            key={category.categoryId}
                            value={category}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border rounded-lg bg-white"
                            style={{ cursor: 'grab' }}
                        >
                            <Group justify="space-between" p="xs" wrap="nowrap" gap="md">
                                <ActionIcon size="sm" variant="subtle" color="gray" style={{ cursor: 'grab' }}>
                                    <FiChevronsDown size={14} />
                                </ActionIcon>

                                <Box style={{ flex: '0 0 200px', minWidth: 0 }}>
                                    <Text size="sm" fw={500} lineClamp={2}>{category.categoryName}</Text>
                                </Box>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    style={{
                                        minWidth: category.mediaType === 'VIDEO' ? 120 : 80,
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
                                    {uploadingCategoryId === category.categoryId ? (
                                        <Loader size="sm" />
                                    ) : category.thumbnailUrl ? (
                                        <>
                                            {category.mediaType === 'VIDEO' ? (
                                                <video src={category.thumbnailUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay muted loop />
                                            ) : (
                                                <Image src={category.thumbnailUrl} alt={category.categoryName} fit="cover" h="100%" />
                                            )}
                                        </>
                                    ) : (
                                        <FiImage size={24} color="#ccc" />
                                    )}
                                </motion.div>

                                <Box style={{ flex: 1 }} />

                                <Group gap="xs" wrap="nowrap">
                                    <ActionIcon size="sm" variant="light" onClick={() => handleMove(index, 'up')} disabled={index === 0}>
                                        <FiChevronUp size={14} />
                                    </ActionIcon>
                                    <ActionIcon size="sm" variant="light" onClick={() => handleMove(index, 'down')} disabled={index === categories.length - 1}>
                                        <FiChevronDown size={14} />
                                    </ActionIcon>
                                </Group>

                                <Menu position="bottom-end" withArrow>
                                    <Menu.Target>
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            color="blue"
                                            disabled={uploadingCategoryId === category.categoryId}
                                        >
                                            <FiEdit2 size={14} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label>Cập nhật media</Menu.Label>
                                        <Menu.Item
                                            leftSection={<FiImage size={14} />}
                                            onClick={() => openFileDialog(category.categoryId, 'IMAGE')}
                                            disabled={uploadingCategoryId === category.categoryId}
                                        >
                                            Tải lên hình ảnh
                                        </Menu.Item>
                                        <Menu.Item
                                            leftSection={<FiVideo size={14} />}
                                            onClick={() => openFileDialog(category.categoryId, 'VIDEO')}
                                            disabled={uploadingCategoryId === category.categoryId}
                                        >
                                            Tải lên video
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>

                                <ActionIcon size="sm" variant="subtle" color="red" onClick={() => onRemove(category.categoryId, position)}>
                                    <FiX size={14} />
                                </ActionIcon>
                            </Group>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </Collapse>
        </Box>
    );
};
