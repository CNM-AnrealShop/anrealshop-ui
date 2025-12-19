import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Text, Group, Box, SimpleGrid, Container } from '@mantine/core';
import { FaArrowRight } from 'react-icons/fa';

export interface MenuItem {
    id: string;
    label: string;
    link: string;
    image?: string;
    subcategories?: SubMenuItem[];
}

export interface SubMenuItem {
    id: string;
    label: string;
    link: string;
    featured?: boolean;
}

export interface MenuCategory {
    key: string;
    label: string;
    items: MenuItem[];
    showImage?: boolean;
}

interface MenuHeaderSectionProps {
    menuCategories: MenuCategory[];
    scrolled: boolean;
}

const MenuHeaderSection: React.FC<MenuHeaderSectionProps> = ({ menuCategories, scrolled }) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleMenuEnter = (menuKey: string) => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setActiveMenu(menuKey);
    };

    const handleMenuLeave = () => {
        const timeout = setTimeout(() => {
            setActiveMenu(null);
        }, 300);
        setHoverTimeout(timeout);
    };

    const handleDropdownEnter = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
    };

    const handleDropdownLeave = () => {
        handleMenuLeave();
    };

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            height: 0,
            transition: {
                duration: 0.2
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            height: 'auto',
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <nav className="hidden lg:block">
            <Group gap="xl">
                {menuCategories.map((category, index) => (
                    <div
                        key={category.key}
                        className="relative"
                        onMouseEnter={() => handleMenuEnter(category.key)}
                        onMouseLeave={handleMenuLeave}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                            <Text
                                component="span"
                                className={`font-medium cursor-pointer ${scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80'
                                    } transition-colors`}
                            >
                                {category.label}
                            </Text>
                        </motion.div>

                        {activeMenu === category.key && (
                            <motion.div
                                className="absolute left-1/2 transform -translate-x-1/2 pt-5 z-30 w-screen max-w-5xl"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={dropdownVariants}
                                onMouseEnter={handleDropdownEnter}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <Box
                                    className="bg-white shadow-xl rounded-lg overflow-hidden"
                                    style={{ minWidth: '650px' }}
                                >
                                    <Container p="md">
                                        <SimpleGrid cols={category.showImage ? 3 : 4} spacing="xl">
                                            {category.items.map((item) => (
                                                <Box key={item.id} className="p-2">
                                                    {item.image && category.showImage && (
                                                        <Link to={item.link} className="block mb-3">
                                                            <img
                                                                src={item.image}
                                                                alt={item.label}
                                                                className="w-full h-32 object-cover rounded-md hover:opacity-90 transition-opacity"
                                                            />
                                                        </Link>
                                                    )}

                                                    <Link to={item.link} className="no-underline">
                                                        <Text
                                                            fw={600}
                                                            className="text-gray-800 hover:text-primary mb-3 transition-colors"
                                                        >
                                                            {item.label}
                                                        </Text>
                                                    </Link>

                                                    {item.subcategories && item.subcategories.length > 0 && (
                                                        <Box>
                                                            {item.subcategories.map((subItem) => (
                                                                <Link
                                                                    key={subItem.id}
                                                                    to={subItem.link}
                                                                    className="no-underline block py-1"
                                                                >
                                                                    <Text
                                                                        size="sm"
                                                                        className={`text-gray-600 hover:text-primary transition-colors ${subItem.featured ? 'font-medium text-primary' : ''}`}
                                                                    >
                                                                        {subItem.label}
                                                                    </Text>
                                                                </Link>
                                                            ))}

                                                            <Link to={item.link} className="no-underline flex items-center mt-2">
                                                                <Text
                                                                    size="sm"
                                                                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                                                                >
                                                                    Xem tất cả
                                                                    <FaArrowRight size={10} className="ml-1" />
                                                                </Text>
                                                            </Link>
                                                        </Box>
                                                    )}
                                                </Box>
                                            ))}
                                        </SimpleGrid>
                                    </Container>
                                </Box>
                            </motion.div>
                        )}
                    </div>
                ))}
            </Group>
        </nav>
    );
};

export default MenuHeaderSection;
