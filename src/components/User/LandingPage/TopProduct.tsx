import { Button, Container, Group, SimpleGrid, Text, Box } from '@mantine/core';
import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';
import { useGetProduct } from '../../../hooks/useProduct';
import type { UserProductDto } from '../../../types/ProductType';
import ProductCard from '../Common/ProductCard';

export const TopProduct = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [fashionProducts, setFashionProducts] = useState<UserProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const { getListRecommended } = useGetProduct();

    useEffect(() => {
        setLoading(true);
        getListRecommended()
            .then((data) => {
                setFashionProducts(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('top-product-section');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <Container size="xl" py={40} id="top-product-section" className="backdrop-blur-sm bg-white/20">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold">Sản phẩm thời trang nổi bật</h2>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                    Khám phá các sản phẩm thời trang được yêu thích nhất và tìm kiếm phong cách phù hợp với cá tính của bạn
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                {loading ? (
                    <Box className="py-20 text-center">
                        <div className="animate-pulse">
                            <Text c="dimmed">Đang tải sản phẩm...</Text>
                        </div>
                    </Box>
                ) : fashionProducts.length > 0 ? (
                    <>
                        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing={{ base: 10, sm: 'xl' }}>
                            {fashionProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    className="h-full"
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </SimpleGrid>

                        <Group justify="center" mt={20}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <Button
                                    component={Link}
                                    to="/products?category=fashion"
                                    size="md"
                                    variant="subtle"
                                    className="px-10 hover:bg-gray-100 border-gray-300"
                                >
                                    Xem thêm sản phẩm
                                </Button>
                            </motion.div>
                        </Group>
                    </>
                ) : (
                    <Box className="py-20 text-center bg-white/70 backdrop-blur-sm shadow-sm rounded-lg">
                        <FiPackage size={50} className="mx-auto mb-4 text-gray-400" />
                        <Text size="lg" fw={500} c="dimmed">
                            Hiện tại không có sản phẩm nổi bật
                        </Text>
                        <Text c="dimmed" size="sm" mt="xs">
                            Vui lòng quay lại sau hoặc khám phá các danh mục khác
                        </Text>
                        
                    </Box>
                )}
            </motion.div>
        </Container>
    );
};
