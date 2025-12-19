import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Group,
    LoadingOverlay,
    Menu,
    Modal,
    Pagination,
    Paper,
    Stack,
    Table,
    Tabs,
    Text,
    Textarea,
    TextInput,
    Title,
    Tooltip
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
    FiCalendar,
    FiCheck,
    FiCheckCircle,
    FiClock,
    FiEye,
    FiFilter,
    FiGrid,
    FiList,
    FiMoreVertical,
    FiRefreshCw,
    FiSearch,
    FiX
} from 'react-icons/fi';
type DateRangePickerValue = [Date | null, Date | null];

// Types
interface User {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
}

interface Shop {
    id: string;
    name: string;
    description: string;
    avatar_url: string;
    user: User;
    created_at: string;
    status: 'pending' | 'approved' | 'rejected';
    product_count: number;
    follower_count: number;
    total_reviews: number;
    average_rating: number;
    review_note?: string;
}

const ShopApprovalPage = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string | null>('pending');
    const [activeTab, setActiveTab] = useState('pending');
    const [rejectionReason, setRejectionReason] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([null, null]);
    const [searchTerm, setSearchTerm] = useState('');

    // Modals
    const [reviewModalOpened, { open: openReviewModal, close: closeReviewModal }] = useDisclosure(false);
    const [rejectModalOpened, { open: openRejectModal, close: closeRejectModal }] = useDisclosure(false);
    const [successModalOpened, { open: openSuccessModal, close: closeSuccessModal }] = useDisclosure(false);

    // Mock data
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const mockShops: Shop[] = [
                {
                    id: 'SHP001',
                    name: 'Fashion Store',
                    description: 'Cửa hàng thời trang nam nữ chất lượng cao, giá cả phải chăng.',
                    avatar_url: 'https://images.unsplash.com/photo-1507914372368-b2b085b925a1?q=80&w=100',
                    user: {
                        id: 'U001',
                        full_name: 'Nguyễn Văn A',
                        email: 'nguyenvana@example.com',
                        phone_number: '0901234567'
                    },
                    created_at: '2023-05-15T08:30:00Z',
                    status: 'pending',
                    product_count: 0,
                    follower_count: 0,
                    total_reviews: 0,
                    average_rating: 0
                },
                {
                    id: 'SHP002',
                    name: 'Sportland',
                    description: 'Chuyên cung cấp các sản phẩm thể thao chính hãng.',
                    avatar_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=100',
                    user: {
                        id: 'U002',
                        full_name: 'Trần Văn B',
                        email: 'tranvanb@example.com',
                        phone_number: '0912345678'
                    },
                    created_at: '2023-05-16T10:15:00Z',
                    status: 'pending',
                    product_count: 0,
                    follower_count: 0,
                    total_reviews: 0,
                    average_rating: 0
                },
                {
                    id: 'SHP003',
                    name: 'Accessories World',
                    description: 'Thế giới phụ kiện điện thoại, laptop và các thiết bị điện tử.',
                    avatar_url: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=100',
                    user: {
                        id: 'U003',
                        full_name: 'Lê Thị C',
                        email: 'lethic@example.com',
                        phone_number: '0923456789'
                    },
                    created_at: '2023-05-17T09:45:00Z',
                    status: 'approved',
                    product_count: 15,
                    follower_count: 120,
                    total_reviews: 45,
                    average_rating: 4.7,
                    review_note: 'Cửa hàng đầy đủ thông tin, hình ảnh chuyên nghiệp.'
                },
                {
                    id: 'SHP004',
                    name: 'Tech Garden',
                    description: 'Chuyên cung cấp các sản phẩm công nghệ chính hãng.',
                    avatar_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=100',
                    user: {
                        id: 'U004',
                        full_name: 'Phạm Văn D',
                        email: 'phamvand@example.com',
                        phone_number: '0934567890'
                    },
                    created_at: '2023-05-18T14:20:00Z',
                    status: 'rejected',
                    product_count: 0,
                    follower_count: 0,
                    total_reviews: 0,
                    average_rating: 0,
                    review_note: 'Thông tin cửa hàng chưa đầy đủ, cần bổ sung thông tin chi tiết và hình ảnh mẫu sản phẩm.'
                },
            ];

            setShops(mockShops);
            setIsLoading(false);
        }, 1000);
    }, []);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    // Handle status change
    const handleApprove = (shop: Shop) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setShops(prev =>
                prev.map(s =>
                    s.id === shop.id ? { ...s, status: 'approved', review_note: 'Cửa hàng đạt chuẩn' } : s
                )
            );
            setSelectedShop(null);
            setIsLoading(false);
            openSuccessModal();
        }, 800);
    };

    const handleReject = () => {
        if (!selectedShop) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setShops(prev =>
                prev.map(s =>
                    s.id === selectedShop.id ? { ...s, status: 'rejected', review_note: rejectionReason } : s
                )
            );
            setSelectedShop(null);
            setRejectionReason('');
            closeRejectModal();
            setIsLoading(false);
            openSuccessModal();
        }, 800);
    };

    // Open shop review
    const openShopReview = (shop: Shop) => {
        setSelectedShop(shop);
        openReviewModal();
    };

    // Handle tab change
    const handleTabChange = (tab: string | null) => {
        if (tab === null) return;
        setActiveTab(tab);
        setStatusFilter(tab === 'all' ? null : tab);
    };

    // Reset filters
    const resetFilters = () => {
        setDateRange([null, null]);
        setStatusFilter('pending');
        setActiveTab('pending');
        setSearchTerm('');
        setIsLoading(true);

        // Simulate API call to reset
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    // Handle date filter
    const handleDateRangeChange = (range: DateRangePickerValue) => {
        setDateRange(range);

        if (range[0] && range[1]) {
            setIsLoading(true);

            // Simulate filtering by date
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    // Filter shops by status
    const filteredShops = statusFilter
        ? shops.filter(shop => shop.status === statusFilter)
        : shops;

    // Status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'green';
            case 'rejected': return 'red';
            case 'pending': return 'yellow';
            default: return 'gray';
        }
    };

    // Status label
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approved': return 'Đã phê duyệt';
            case 'rejected': return 'Đã từ chối';
            case 'pending': return 'Đang chờ duyệt';
            default: return 'Không xác định';
        }
    };

    return (
        <Box>
            <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />

            <Paper p="md" radius="md" withBorder mb="md">
                <Stack gap="xs">
                    <Group justify="space-between" align="flex-start" mb="md" className='!flex-col'>
                        <Stack gap="xs">
                            <Title order={3} size="h4">Xác nhận cửa hàng</Title>
                            <Text size="sm" c="dimmed">
                                Xem xét và phê duyệt các cửa hàng mới được đăng ký.
                            </Text>
                        </Stack>

                    
                        <Stack gap="xs">
                            <Group>
                                <DatePickerInput
                                    type="range"
                                    placeholder="Lọc theo ngày đăng ký"
                                    value={dateRange}
                                    onChange={handleDateRangeChange}
                                    clearable
                                    leftSection={<FiCalendar size={16} />}
                                    rightSection={dateRange[0] ? (
                                        <ActionIcon size="sm" variant="subtle" onClick={() => setDateRange([null, null])}>
                                            <FiX size={14} />
                                        </ActionIcon>
                                    ) : null}
                                    style={{ minWidth: '300px' }}
                                />

                                

                                <Tooltip label="Reset bộ lọc">
                                    <ActionIcon
                                        variant="light"
                                        color="gray"
                                        onClick={resetFilters}
                                        disabled={!dateRange[0] && statusFilter === 'pending'}
                                    >
                                        <FiRefreshCw size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>

                            <Group>
                                <TextInput
                                    placeholder="Tìm kiếm theo tên, ID, thông tin chủ shop..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                                    leftSection={<FiSearch size={16} />}
                                    style={{ minWidth: '300px' }}
                                />

                                <Group gap="xs">
                                    <Tooltip label="Chế độ lưới">
                                        <ActionIcon
                                            variant="default"
                                            size="lg"
                                            radius="md"
                                            className={viewMode === 'grid' ? "!bg-blue-50 !text-primary !border-blue-200" : ""}
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <FiGrid size={16} />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label="Chế độ bảng">
                                        <ActionIcon
                                            variant="default"
                                            size="lg"
                                            radius="md"
                                            className={viewMode === 'list' ? "!bg-blue-50 !text-primary !border-blue-200" : ""}
                                            onClick={() => setViewMode('list')}
                                        >
                                            <FiList size={16} />
                                        </ActionIcon>
                                    </Tooltip>
                                </Group>
                            </Group>
                        </Stack>
                    </Group>

                    <Tabs value={activeTab} onChange={handleTabChange} mb="md">
                        <Tabs.List>
                            <Tabs.Tab value="pending" leftSection={<FiClock size={14} />}>
                                Chờ duyệt ({shops.filter(p => p.status === 'pending').length})
                            </Tabs.Tab>
                            <Tabs.Tab value="approved" leftSection={<FiCheckCircle size={14} />}>
                                Đã duyệt ({shops.filter(p => p.status === 'approved').length})
                            </Tabs.Tab>
                            <Tabs.Tab value="rejected" leftSection={<FiX size={14} />}>
                                Đã từ chối ({shops.filter(p => p.status === 'rejected').length})
                            </Tabs.Tab>
                            <Tabs.Tab value="all" leftSection={<FiFilter size={14} />}>
                                Tất cả ({shops.length})
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>

                    {/* View as Table */}
                    {viewMode === 'list' ? (
                        <Table striped highlightOnHover withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Cửa hàng</Table.Th>
                                    <Table.Th>Chủ sở hữu</Table.Th>
                                    <Table.Th>Liên hệ</Table.Th>
                                    <Table.Th>Ngày đăng ký</Table.Th>
                                    <Table.Th>Trạng thái</Table.Th>
                                    <Table.Th style={{ width: '100px', textAlign: 'center' }}>Thao tác</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {filteredShops.length === 0 ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                                            <Text fw={500} c="dimmed">Không có cửa hàng nào</Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ) : (
                                    filteredShops.map((shop) => (
                                        <Table.Tr key={shop.id}>
                                            <Table.Td>
                                                <Group>
                                                    <Avatar
                                                        src={shop.avatar_url}
                                                        alt={shop.name}
                                                        size="md"
                                                        radius="md"
                                                    />
                                                    <div>
                                                        <Text size="sm" fw={500}>{shop.name}</Text>
                                                        <Text size="xs" c="dimmed">ID: {shop.id}</Text>
                                                    </div>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td>{shop.user.full_name}</Table.Td>
                                            <Table.Td>
                                                <Text size="sm">{shop.user.email}</Text>
                                                <Text size="sm">{shop.user.phone_number}</Text>
                                            </Table.Td>
                                            <Table.Td>{formatDate(shop.created_at)}</Table.Td>
                                            <Table.Td>
                                                <Badge color={getStatusColor(shop.status)}>
                                                    {getStatusLabel(shop.status)}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <Group justify="center">
                                                    <Tooltip label="Xem chi tiết">
                                                        <ActionIcon
                                                            variant="subtle"
                                                            onClick={() => openShopReview(shop)}
                                                        >
                                                            <FiEye size={16} />
                                                        </ActionIcon>
                                                    </Tooltip>

                                                    {shop.status === 'pending' && (
                                                        <Menu position="bottom-end" withinPortal>
                                                            <Menu.Target>
                                                                <ActionIcon variant="subtle">
                                                                    <FiMoreVertical size={16} />
                                                                </ActionIcon>
                                                            </Menu.Target>
                                                            <Menu.Dropdown>
                                                                <Menu.Item
                                                                    leftSection={<FiCheck size={14} color="green" />}
                                                                    onClick={() => handleApprove(shop)}
                                                                >
                                                                    Phê duyệt
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    leftSection={<FiX size={14} color="red" />}
                                                                    onClick={() => {
                                                                        setSelectedShop(shop);
                                                                        openRejectModal();
                                                                    }}
                                                                >
                                                                    Từ chối
                                                                </Menu.Item>
                                                            </Menu.Dropdown>
                                                        </Menu>
                                                    )}
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                )}
                            </Table.Tbody>
                        </Table>
                    ) : (
                        // View as Grid
                        <Box my="md">
                            {filteredShops.length === 0 ? (
                                <Text fw={500} c="dimmed" ta="center">Không có cửa hàng nào</Text>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {filteredShops.map((shop) => (
                                        <Paper key={shop.id} withBorder p="md" radius="md">
                                            <Group align="flex-start" mb="xs">
                                                <Avatar
                                                    src={shop.avatar_url}
                                                    size="xl"
                                                    radius="md"
                                                    alt={shop.name}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <Text fw={700} size="lg" lineClamp={1}>{shop.name}</Text>
                                                    <Text size="xs" c="dimmed">{shop.id}</Text>
                                                    <Badge color={getStatusColor(shop.status)} mt="xs">
                                                        {getStatusLabel(shop.status)}
                                                    </Badge>
                                                </div>
                                            </Group>

                                            <Text size="sm" lineClamp={2} mb="md">{shop.description}</Text>

                                            <Stack gap="xs">
                                                <Group justify="space-between">
                                                    <Text size="sm" c="dimmed">Chủ sở hữu:</Text>
                                                    <Text size="sm">{shop.user.full_name}</Text>
                                                </Group>

                                                <Group justify="space-between">
                                                    <Text size="sm" c="dimmed">Email:</Text>
                                                    <Text size="sm">{shop.user.email}</Text>
                                                </Group>

                                                <Group justify="space-between">
                                                    <Text size="sm" c="dimmed">Ngày đăng ký:</Text>
                                                    <Text size="sm">{formatDate(shop.created_at)}</Text>
                                                </Group>
                                            </Stack>

                                            <Group mt="md" justify="apart">
                                                <Button
                                                    variant="light"
                                                    leftSection={<FiEye size={16} />}
                                                    onClick={() => openShopReview(shop)}
                                                >
                                                    Xem chi tiết
                                                </Button>

                                                {shop.status === 'pending' && (
                                                    <Group gap="xs">
                                                        <Button
                                                            variant="outline"
                                                            color="red"
                                                            onClick={() => {
                                                                setSelectedShop(shop);
                                                                openRejectModal();
                                                            }}
                                                        >
                                                            <FiX size={16} />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            color="green"
                                                            onClick={() => handleApprove(shop)}
                                                        >
                                                            <FiCheck size={16} />
                                                        </Button>
                                                    </Group>
                                                )}
                                            </Group>
                                        </Paper>
                                    ))}
                                </div>
                            )}
                        </Box>
                    )}

                    <Group justify="flex-end" mt="md">
                        <Pagination total={Math.ceil(shops.length / 10)} value={page} onChange={setPage} />
                    </Group>
                </Stack>
            </Paper>

            {/* Shop Review Modal */}
            <Modal
                opened={reviewModalOpened}
                onClose={closeReviewModal}
                title={`Chi tiết cửa hàng: ${selectedShop?.name || ''}`}
                size="lg"
                centered
            >
                {selectedShop && (
                    <Stack>
                        <Group align="flex-start">
                            <Avatar
                                src={selectedShop.avatar_url}
                                size={100}
                                radius="md"
                                alt={selectedShop.name}
                            />
                            <Stack style={{ flex: 1 }} gap="xs">
                                <Text fw={700} size="xl">{selectedShop.name}</Text>
                                <Text size="sm" c="dimmed">ID: {selectedShop.id}</Text>
                                <Badge color={getStatusColor(selectedShop.status)} size="lg">
                                    {getStatusLabel(selectedShop.status)}
                                </Badge>
                                <Text mt="xs">{selectedShop.description}</Text>
                            </Stack>
                        </Group>

                        <Paper withBorder p="md" mt="md">
                            <Title order={5} mb="sm">Thông tin chủ sở hữu</Title>
                            <Stack gap="xs">
                                <Group justify="space-between">
                                    <Text size="sm" fw={500}>Họ tên:</Text>
                                    <Text size="sm">{selectedShop.user.full_name}</Text>
                                </Group>

                                <Group justify="space-between">
                                    <Text size="sm" fw={500}>Email:</Text>
                                    <Text size="sm">{selectedShop.user.email}</Text>
                                </Group>

                                <Group justify="space-between">
                                    <Text size="sm" fw={500}>Số điện thoại:</Text>
                                    <Text size="sm">{selectedShop.user.phone_number}</Text>
                                </Group>

                                <Group justify="space-between">
                                    <Text size="sm" fw={500}>Ngày đăng ký:</Text>
                                    <Text size="sm">{formatDate(selectedShop.created_at)}</Text>
                                </Group>
                            </Stack>
                        </Paper>

                        {selectedShop.status !== 'pending' && (
                            <Paper withBorder p="md">
                                <Group align="center" mb="xs">
                                    <Title order={5}>Kết quả xét duyệt</Title>
                                    <Badge color={getStatusColor(selectedShop.status)}>
                                        {getStatusLabel(selectedShop.status)}
                                    </Badge>
                                </Group>

                                <Text size="sm">
                                    {selectedShop.review_note || "Không có ghi chú"}
                                </Text>
                            </Paper>
                        )}

                        <Group mt="xl" justify="space-between">
                            <Button variant="outline" onClick={closeReviewModal}>
                                Đóng
                            </Button>

                            {selectedShop.status === 'pending' && (
                                <Group>
                                    <Button
                                        variant="outline"
                                        color="red"
                                        leftSection={<FiX size={16} />}
                                        onClick={() => {
                                            closeReviewModal();
                                            openRejectModal();
                                        }}
                                    >
                                        Từ chối
                                    </Button>
                                    <Button
                                        color="green"
                                        leftSection={<FiCheck size={16} />}
                                        onClick={() => handleApprove(selectedShop)}
                                    >
                                        Phê duyệt
                                    </Button>
                                </Group>
                            )}
                        </Group>
                    </Stack>
                )}
            </Modal>

            {/* Reject Modal */}
            <Modal
                opened={rejectModalOpened}
                onClose={closeRejectModal}
                title="Từ chối cửa hàng"
                centered
            >
                <Stack>
                    <Text size="sm">Vui lòng cung cấp lý do từ chối cửa hàng:</Text>

                    <Textarea
                        placeholder="Nhập lý do từ chối..."
                        minRows={4}
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.currentTarget.value)}
                        required
                    />

                    <Group justify="space-between" mt="md">
                        <Button variant="outline" onClick={closeRejectModal}>
                            Hủy
                        </Button>
                        <Button
                            color="red"
                            leftSection={<FiX size={16} />}
                            onClick={handleReject}
                            disabled={!rejectionReason.trim()}
                        >
                            Từ chối cửa hàng
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Success Modal */}
            <Modal
                opened={successModalOpened}
                onClose={closeSuccessModal}
                title="Thao tác thành công"
                centered
            >
                <Stack align="center">
                    <FiCheckCircle size={48} color="green" />
                    <Text>Trạng thái cửa hàng đã được cập nhật thành công!</Text>
                    <Button onClick={closeSuccessModal} mt="md" fullWidth>
                        Đóng
                    </Button>
                </Stack>
            </Modal>
        </Box>
    );
};

export default ShopApprovalPage;