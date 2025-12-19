import {
    Box,
    Button,
    Divider,
    Group,
    Modal,
    ScrollArea,
    Tabs,
    Text,
    Tooltip
} from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FiCheck, FiImage, FiInfo, FiList, FiTag, FiX } from 'react-icons/fi';
import { useGetProduct } from '../../../../hooks/useProduct';
import { useProductForAd, useProductStatusColor, useProductStatusLabel } from '../../../../hooks/useProductStatus';
import type { MyShopProductDto, ProductDetailDto } from '../../../../types/ProductType';
import { formatDate, formatPrice } from '../../../../untils/Untils';
import MediaTab from './MediaTab';
import OverviewTab from './OverviewTab';
import ShippingTab from './ShippingTab';
import StatusAccept from './StatusAccept';
import VariantTab from './VariantTab';
import { ProductReviewTabsSkeleton } from './skeleton';

interface ProductReviewModalProps {
    opened: boolean;
    onClose: () => void;
    product: MyShopProductDto | null;
    onApprove: (productId: string) => Promise<boolean>;
    loading: boolean;
    onReject: () => void;
}

const ProductReviewModal: React.FC<ProductReviewModalProps> = ({
    opened,
    onClose,
    product,
    onApprove,
    loading,
    onReject,
}) => {
    const [activeTab, setActiveTab] = useState<string | null>('overview');
    const [productDetail, setProductDetail] = useState<ProductDetailDto | null>(null);
    const { isLoading, getProductById } = useGetProduct();

    const { convertStatus } = useProductForAd();

    // Sử dụng hooks
    const { getStatusColor } = useProductStatusColor();
    const { getStatusLabel } = useProductStatusLabel();

    // Set up modal dimensions
    const [modalHeight, setModalHeight] = useState("90vh");
    useEffect(() => {
        const updateModalDimensions = () => {
            const viewportHeight = window.innerHeight;
            const newModalHeight = `${viewportHeight * 0.9}px`;
            setModalHeight(newModalHeight); 
        };

        updateModalDimensions();
        window.addEventListener('resize', updateModalDimensions);

        return () => window.removeEventListener('resize', updateModalDimensions);
    }, []);

    const fetchProduct = useCallback(() => {
        if (!product) return;
        getProductById(product.id)
            .then((data) => {
                setProductDetail(data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [product, getProductById]);

    useEffect(() => { 
        if (!opened || !product) return;
        fetchProduct();
    }, [opened]);

    const handleReject = () => {
        if (productDetail) {
            onReject();
        }
    };

    const handleApproval = async () => {
        if (productDetail) {
            await onApprove(productDetail.id)
                .then(() => {
                    fetchProduct();
                })
        }
    };

    

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Text fw={600} size="lg">Chi tiết sản phẩm</Text>}
            size="xl"
            centered
            styles={{
                content: {
                    height: modalHeight,
                    maxHeight: modalHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                },
                header: {
                    paddingBottom: '12px',
                    marginBottom: 0
                },
                body: {
                    padding: '0 16px 16px 16px',
                    flex: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }
            }}
        >
            <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Tabs value={activeTab} onChange={setActiveTab} mb="md">
                    <Tabs.List>
                        <Tabs.Tab value="overview" leftSection={<FiInfo size={14} />}>
                            Tổng quan
                        </Tabs.Tab>
                        <Tabs.Tab value="media" leftSection={<FiImage size={14} />}>
                            Hình ảnh
                        </Tabs.Tab>
                        <Tabs.Tab value="variants" leftSection={<FiTag size={14} />}>
                            Kho hàng
                        </Tabs.Tab>
                        <Tabs.Tab value="shipping" leftSection={<FiList size={14} />}>
                            Vận chuyển
                        </Tabs.Tab>
                        <Tabs.Tab value="statusActive" leftSection={<FiList size={14} />}>
                            Trạng thái
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <ScrollArea style={{ flex: 1 }} offsetScrollbars>
                    {isLoading ? (
                        <ProductReviewTabsSkeleton activeTab={activeTab} />
                    ) : (
                        <>
                            {productDetail && activeTab === 'overview' && (
                                <OverviewTab
                                    product={productDetail}
                                    formatPrice={formatPrice}
                                    formatDate={formatDate}
                                    getStatusColor={getStatusColor}
                                    getStatusLabel={getStatusLabel}
                                />
                            )}
                            {productDetail && activeTab === 'media' && (
                                <MediaTab
                                    product={productDetail}
                                    allMedia={productDetail.medias || []}
                                />
                            )}
                            {productDetail && activeTab === 'variants' && (
                                <VariantTab
                                    product={productDetail}
                                />
                            )}
                            {productDetail && activeTab === 'shipping' && (
                                <ShippingTab
                                    product={productDetail}
                                />
                            )}
                            {productDetail && activeTab === 'statusActive' && (
                                <StatusAccept
                                    product={productDetail}
                                />
                            )}
                        </>
                    )}
                </ScrollArea>

                <Box>
                    <Divider my="md" />
                    <Group justify="space-between">
                        <Button variant="outline" onClick={onClose}>
                            Đóng
                        </Button>

                        <Group>
                            {!isLoading && productDetail && convertStatus(productDetail.status, productDetail.restrictedReason) !== 'VIOLATION' && (
                                <Tooltip label="Từ chối sản phẩm này">
                                    <Button
                                        variant={`${convertStatus(productDetail.status, productDetail.restrictedReason) !== 'PENDING' ? 'filled' : 'subtle'}`}
                                        color="red"
                                        loading={loading}
                                        leftSection={<FiX size={16} />}
                                        onClick={handleReject}
                                    >
                                        Từ chối
                                    </Button>
                                </Tooltip>
                            )}
                            {!isLoading && productDetail && convertStatus(productDetail.status, productDetail.restrictedReason) !== 'ACTIVE' && (
                                <Tooltip label="Phê duyệt sản phẩm này">
                                    <Button
                                        variant={`${convertStatus(productDetail.status, productDetail.restrictedReason) !== 'PENDING' ? 'filled' : 'subtle'}`}
                                        color="blue"
                                        loading={loading}
                                        leftSection={<FiCheck size={16} />}
                                        onClick={handleApproval}
                                    >
                                        Phê duyệt
                                    </Button>
                                </Tooltip>
                            )}
                        </Group>
                    </Group>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProductReviewModal;