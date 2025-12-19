import { ActionIcon, Text, Transition } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useCategory } from '../../../hooks/useCategory';
import type { CategoryDisplayDto } from '../../../types/CategoryType';

interface SidebarCategoryProps {
    selectedCategory: string;
    onCategoryChange: (categorySlug: string) => void;
    collapsed: boolean;
    onToggleCollapse: () => void;
}

const SidebarCategory = ({
    selectedCategory,
    onCategoryChange,
    collapsed,
    onToggleCollapse
}: SidebarCategoryProps) => {
    const { categoriesDisplay, getCategoriesDisplay, isLoading } = useCategory();
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        getCategoriesDisplay('SIDEBAR', 'public');
    }, [getCategoriesDisplay]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleExpand = (categoryId: string, e: React.MouseEvent) => {
        e.stopPropagation();
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

    const buildCategoryTree = (categories: CategoryDisplayDto[]): CategoryDisplayDto[] => {
        const categoryMap = new Map<string, CategoryDisplayDto & { children: CategoryDisplayDto[] }>();
        const rootCategories: (CategoryDisplayDto & { children: CategoryDisplayDto[] })[] = [];

        categories.forEach(cat => {
            categoryMap.set(cat.categoryId, { ...cat, children: [] });
        });

        categories.forEach(cat => {
            const categoryNode = categoryMap.get(cat.categoryId)!;
            if (cat.parentId && categoryMap.has(cat.parentId)) {
                const parent = categoryMap.get(cat.parentId)!;
                parent.children.push(categoryNode);
            } else {
                rootCategories.push(categoryNode);
            }
        });

        return rootCategories;
    };

    const renderCategory = (
        category: CategoryDisplayDto & { children?: CategoryDisplayDto[] },
        index: number,
        level: number = 0
    ) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedCategories.has(category.slug);
        const isSelected = selectedCategory === category.slug;

        return (
            <div key={category.id} className={level > 0 && !collapsed ? 'ml-4' : ''}>
                <motion.button
                    onClick={() => onCategoryChange(category.slug)}
                    className={`w-full text-left rounded-lg transition-colors mb-1 relative ${collapsed ? 'p-2' : 'p-3'
                        } ${isSelected && !collapsed
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    title={collapsed ? category.categoryName : undefined}
                >
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'}`}>

                        {category.thumbnailUrl && (
                            <div className={`flex-shrink-0 rounded-md overflow-hidden bg-gray-100 ${collapsed ? 'w-10 h-10' : 'w-8 h-8'
                                } ${isSelected && collapsed
                                    ? 'ring-2 ring-primary ring-offset-2'
                                    : ''
                                }`}>
                                <img
                                    src={category.thumbnailUrl}
                                    alt={category.categoryName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        {!collapsed && (
                            <div className="flex-1 flex items-center justify-between min-w-0">
                                <Text
                                    size="sm"
                                    fw={level === 0 ? 500 : 400}
                                    className="truncate"
                                >
                                    {category.categoryName}
                                </Text>

                                {hasChildren && (
                                    <div
                                        onClick={(e) => toggleExpand(category.categoryId, e)}
                                        className={`cursor-pointer p-1 rounded hover:bg-white/20 transition-colors ${isSelected ? 'text-white' : 'text-gray-600'
                                            }`}
                                    >
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiChevronDown size={14} />
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.button>

                {!collapsed && hasChildren && isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1"
                    >
                        {category.children!.map((child, childIndex) =>
                            renderCategory(child, index + childIndex + 1, level + 1)
                        )}
                    </motion.div>
                )}
            </div>
        );
    };

    const categoryTree = buildCategoryTree(categoriesDisplay);

    return (
        <div
            className={`rounded-lg shadow-sm transition-all duration-300 h-screen ${collapsed ? 'w-16' : 'w-64'
                } ${scrolled
                    ? 'bg-white/80 backdrop-blur-lg'
                    : 'bg-white'
                }`}
        >
            {/* Toggle Button */}
            <div className={`${collapsed ? 'p-2' : 'p-4'} border-b transition-colors duration-300 flex items-center justify-between`}>
                <Transition mounted={!collapsed} transition="fade" duration={200}>
                    {(styles) => (
                        <Text fw={600} style={styles}>
                            Danh mục
                        </Text>
                    )}
                </Transition>
                <ActionIcon
                    variant="subtle"
                    onClick={onToggleCollapse}
                    size="sm"
                >
                    {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
                </ActionIcon>
            </div>

            <div className={`${collapsed ? 'p-1' : 'p-2'} overflow-y-auto`} style={{ height: 'calc(100vh - 64px)' }}>
                {isLoading ? (
                    <div className="text-center py-8">
                        <Text size="sm" c="dimmed">Đang tải...</Text>
                    </div>
                ) : categoryTree.length > 0 ? (
                    <>
                        {/* "Tất cả" option */}
                        <motion.button
                            onClick={() => onCategoryChange('all')}
                            className={`w-full text-left rounded-lg transition-colors mb-1 ${collapsed ? 'p-2' : 'p-3'
                                } ${selectedCategory === 'all' && !collapsed
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {collapsed ? (
                                <div className="flex justify-center">
                                    <div
                                        className={`w-10 h-10 rounded-md flex items-center justify-center ${selectedCategory === 'all'
                                                ? 'bg-gray-200 ring-2 ring-primary ring-offset-2'
                                                : 'bg-gray-200'
                                            }`}
                                    >
                                        <FiGrid size={20} className="text-gray-700" />
                                    </div>
                                </div>
                            ) : (
                                <Text size="sm" fw={500}>
                                    Tất cả
                                </Text>
                            )}
                        </motion.button>

                        {/* Category tree */}
                        {categoryTree.map((category, index) =>
                            renderCategory(category, index + 1)
                        )}
                    </>
                ) : (
                    <div className="text-center py-8">
                        <Text size="sm" c="dimmed">Không có danh mục</Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarCategory;
