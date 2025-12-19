import {
    Button,
    Container,
    LoadingOverlay,
    Paper,
    Tabs,
    Text,
    Title
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
    FiMapPin,
    FiShoppingCart,
    FiStar
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import ShopInfoComponent from './ShopInfo';
// import ProductList from './ProductList';
import { mockShopReviews, mockShops, type Review, type ShopInfo } from '../../../data/UserData';
import ShopContact from './ShopContact';
import ShopReviews from './ShopReview';

const ShopPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [activeTab, setActiveTab] = useState<string | null>('products');
    const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
    // const [products, setProducts] = useState<ShopProduct[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchShopData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));

            const foundShop = slug ? mockShops[slug] : null;

            if (foundShop) {
                setShopInfo(foundShop);
                // setProducts(mockShopProducts);
                setReviews(mockShopReviews);
                setIsFollowing(foundShop.isFollowing);
            } else {
                setShopInfo(null);
            }

            setLoading(false);
        };

        fetchShopData();
    }, [slug]);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    // Xử lý trường hợp không tìm thấy shop
    if (!loading && !shopInfo) {
        return (
            <Container size="xl" py="xl">
                <Paper withBorder p="xl" className="text-center">
                    <Title order={3} mb="md">Không tìm thấy shop</Title>
                    <Text color="dimmed" mb="lg">
                        Shop bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                    </Text>
                    <Button component={Link} to="/">
                        Về trang chủ
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container size="xl" py="xl" className="relative min-h-screen">
            {/* Loading Overlay */}

            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            {shopInfo && (
                <>
                    {/* Shop Info */}
                    <ShopInfoComponent
                        shopInfo={shopInfo}
                        isFollowing={isFollowing}
                        onFollowToggle={handleFollow}
                    />

                    {/* Tabs */}
                    <Tabs value={activeTab} onChange={setActiveTab}>
                        <Tabs.List>
                            <Tabs.Tab value="products" leftSection={<FiShoppingCart size={16} />}>
                                Sản phẩm ({shopInfo.totalProducts})
                            </Tabs.Tab>
                            <Tabs.Tab value="reviews" leftSection={<FiStar size={16} />}>
                                Đánh giá ({shopInfo.totalReviews})
                            </Tabs.Tab>
                            <Tabs.Tab value="info" leftSection={<FiMapPin size={16} />}>
                                Thông tin shop
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="products" pt="md">
                            sua hai nhe
                            {/* <ProductList 
                                products={products}
                                shopName={shopInfo.name}
                            /> */}
                        </Tabs.Panel>

                        <Tabs.Panel value="reviews" pt="md">
                            <ShopReviews reviews={reviews} />
                        </Tabs.Panel>

                        <Tabs.Panel value="info" pt="md">
                            <ShopContact shopInfo={shopInfo} />
                        </Tabs.Panel>
                    </Tabs>
                </>
            )}
        </Container>
    );
};

export default ShopPage;