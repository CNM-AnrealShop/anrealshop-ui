import {
    Anchor,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Divider,
    Group,
    Paper,
    Tabs,
    Text,
    Title,
    useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React, { useMemo, useState } from 'react';
import {
    FiChevronRight,
    FiHome,
    FiSave,
    FiShoppingBag
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import About from './About'; // Import component thông tin cá nhân
import TabControll from './TabControll';

interface SettingsProps {
    // Thêm các props nếu cần thiết
}

interface ProfileData {
    fullName: string;
    email: string;
    phone: string;
    avatar: File | null;
    bio: string;
}

// interface ShopSettings {
//     shopName: string;
//     shopDescription: string;
//     shopLogo: File | null;
//     shopBanner: File | null;
//     shopColors: {
//         primary: string;
//         secondary: string;
//     };
//     categories: string[];
//     paymentMethods: string[];
// }


const Setting: React.FC<SettingsProps> = () => {
    const theme = useMantineTheme();
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saved, { open: openSaved, close: closeSaved }] = useDisclosure(false);

    // Profile settings state
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0912345678',
        avatar: null,
        bio: 'Chủ shop thời trang online từ năm 2020.',
    });

    // Avatar preview URL
    const [avatarPreview, setAvatarPreview] = useState<string | null>('https://i.pravatar.cc/150?img=12');

    // Shop settings
    // const [shopSettings, setShopSettings] = useState<ShopSettings>({
    //     shopName: 'AnrealShop',
    //     shopDescription: 'Shop thời trang chất lượng cao với giá cả hợp lý.',
    //     shopLogo: null,
    //     shopBanner: null,
    //     shopColors: {
    //         primary: '#3b82f6',
    //         secondary: '#f43f5e',
    //     },
    //     categories: ['clothing', 'accessories'],
    //     paymentMethods: ['momo', 'cod', 'banking'],
    // });

    // Shop logo and banner previews
    // const [shopLogoPreview, setShopLogoPreview] = useState<string | null>('https://placehold.co/100x100/3b82f6/white?text=A');
    // const [shopBannerPreview, setShopBannerPreview] = useState<string | null>('https://placehold.co/800x200/f43f5e/white?text=AnrealShop');

    // Handle profile data changes
    const handleProfileChange = (field: keyof ProfileData, value: any) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    // Handle avatar change
    const handleAvatarChange = (file: File | null) => {
        handleProfileChange('avatar', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };



    // Handle shop settings change
    // const handleShopChange = <K extends keyof ShopSettings>(field: K, value: ShopSettings[K]) => {
    //     setShopSettings(prev => ({ ...prev, [field]: value }));
    // };



    // Handle shop logo change
    // const handleShopLogoChange = (file: File | null) => {
    //     handleShopChange('shopLogo', file);
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setShopLogoPreview(e.target?.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };


    // Save settings
    const saveSettings = () => {
        setSaving(true);

        // Simulate API call
        setTimeout(() => {
            setSaving(false);
            openSaved();

            // Show notification
            notifications.show({
                title: 'Cài đặt đã được lưu',
                message: 'Các thay đổi của bạn đã được lưu thành công',
                color: 'green',
            });

            // Hide saved message after a few seconds
            setTimeout(closeSaved, 3000);
        }, 1000);
    };

    // Reset all settings
    const resetSettings = () => {
        // Implementation would go here
        // For now just show a notification
        notifications.show({
            title: 'Cài đặt đã được đặt lại',
            message: 'Tất cả cài đặt đã được khôi phục về mặc định',
            color: 'blue',
        });
    };

    const breadcrumbItems = useMemo(() => {
        // Tab name mapping
        const tabNames: Record<string, string> = {
            'profile': 'Thông tin cá nhân',
            'shop': 'Cài đặt cửa hàng',
            'notifications': 'Thông báo',
            'security': 'Bảo mật',
            'payment': 'Thanh toán',
            'team': 'Đội ngũ',
            'messaging': 'Nhắn tin',
            'advanced': 'Nâng cao'
        };

        return [
            <Anchor component={Link} to="/" key="home">
                <Group gap={4}>
                    <FiHome size={14} />
                    <span>Trang chủ</span>
                </Group>
            </Anchor>,
            <Anchor component={Link} to="/myshop/settings" key="settings">
                Cài đặt
            </Anchor>,
            <Text key="current" fw={500}>
                {tabNames[activeTab] || 'Không xác định'}
            </Text>
        ];
    }, [activeTab]);

    return (
        <Container size="xl" p="md">
            {/* Thêm breadcrumbs */}
            <Paper
                shadow="xs"
                p="md"
                mb="md"
                radius="md"
                className="border-b border-gray-200"
            >
                <Box mb="xs">
                    <Breadcrumbs separator={<FiChevronRight size={14} />}>
                        {breadcrumbItems}
                    </Breadcrumbs>
                </Box>

                <Group justify="space-between" align="center">
                    <Group>
                        <FiShoppingBag size={24} className="text-primary" />
                        <Title order={2} size="h3">Cài đặt</Title>
                    </Group>
                    <Text c="dimmed" size="sm">
                        Quản lý thông tin và các thiết lập của cửa hàng
                    </Text>
                </Group>
            </Paper>

            <Paper radius="md" withBorder>
                <Tabs
                    value={activeTab}
                    onChange={(value) => setActiveTab(value as string)}
                    orientation="vertical"
                    radius="md"
                    variant="pills"
                    styles={(theme) => ({
                        root: {
                            display: 'flex' // Đảm bảo hiển thị dạng flex
                        },
                        list: {
                            minWidth: 200,
                            borderRight: `1px solid ${theme.colors.gray[3]}`,
                            margin: 0,
                            padding: theme.spacing.md,
                            paddingRight: 0
                        },
                        panel: {
                            flex: 1,
                            paddingLeft: 0 // Loại bỏ padding bên trái để tránh khoảng trống
                        },
                        tabsList: {
                            gap: theme.spacing.xs // Giảm khoảng cách giữa các tab
                        }
                    })}
                >
                    <TabControll />

                    {/* Tabs.Panel */}
                    <Tabs.Panel value="profile" p="md">
                        <About
                            profileData={profileData}
                            avatarPreview={avatarPreview}
                            saving={saving}
                            handleProfileChange={handleProfileChange}
                            handleAvatarChange={handleAvatarChange}
                            saveSettings={saveSettings}
                            resetSettings={resetSettings}
                        />
                    </Tabs.Panel>

                    <Tabs.Panel value="shop" p="md">
                        <Title order={3} mb="md">Cài đặt cửa hàng</Title>
                        <Divider mb="md" />

                        {/* Content giữ nguyên */}

                        <Group justify="flex-end" mt="lg">
                            <Button variant="outline" onClick={resetSettings}>
                                Đặt lại
                            </Button>
                            <Button onClick={saveSettings} loading={saving}>
                                Lưu thay đổi
                            </Button>
                        </Group>
                    </Tabs.Panel>

                    {/* Thêm các Tabs.Panel khác ở đây */}

                </Tabs>

                {saved && (
                    <Paper
                        p="md"
                        style={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            zIndex: 1000,
                            backgroundColor: theme.colors.green[6],
                            color: 'white'
                        }}
                    >
                        <Group>
                            <FiSave />
                            <Text>Cài đặt đã được lưu thành công!</Text>
                        </Group>
                    </Paper>
                )}
            </Paper>
        </Container>
    );
};

export default Setting;