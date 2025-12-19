import React from 'react';
import {
    Paper,
    Image,
    Grid,
    Group,
    Avatar,
    Title,
    Badge,
    Text,
    Button,
    Stack,
    ActionIcon,
    Progress
} from '@mantine/core';
import {
    FiHeart,
    FiMessageCircle,
    FiShare2,
    FiMapPin,
    FiClock,
    FiUsers,
    FiStar
} from 'react-icons/fi';

interface ShopInfo {
    id: string;
    name: string;
    avatar: string;
    coverImage: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    rating: number;
    totalReviews: number;
    totalProducts: number;
    totalFollowers: number;
    joinDate: string;
    isFollowing: boolean;
    badges: string[];
    responseTime: string;
    responseRate: number;
}

interface ShopInfoProps {
    shopInfo: ShopInfo;
    isFollowing: boolean;
    onFollowToggle: () => void;
}

const ShopInfoComponent: React.FC<ShopInfoProps> = ({ 
    shopInfo, 
    isFollowing, 
    onFollowToggle 
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <>
            {/* Cover Image */}
            <Paper radius="md" mb="md" style={{ overflow: 'hidden' }}>
                <Image
                    src={shopInfo.coverImage}
                    height={300}
                    fit="cover"
                    alt="Shop Cover"
                />
            </Paper>

            {/* Shop Info Header */}
            <Paper withBorder p="md" radius="md" mb="md">
                <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Group align="flex-start" gap="md">
                            <Avatar
                                src={shopInfo.avatar}
                                size={100}
                                radius="md"
                            />
                            <div style={{ flex: 1 }}>
                                <Group align="center" mb="xs">
                                    <Title order={2}>{shopInfo.name}</Title>
                                    <Group gap="xs">
                                        {shopInfo.badges.map((badge, index) => (
                                            <Badge key={index} variant="light" color="blue">
                                                {badge}
                                            </Badge>
                                        ))}
                                    </Group>
                                </Group>

                                <Text color="dimmed" mb="md">
                                    {shopInfo.description}
                                </Text>

                                <Group mb="md">
                                    <Group gap="xs">
                                        <FiMapPin size={16} />
                                        <Text size="sm">{shopInfo.address}</Text>
                                    </Group>
                                </Group>

                                <Group>
                                    <Group gap="xs">
                                        <FiStar size={16} />
                                        <Text size="sm" fw={500}>{shopInfo.rating}</Text>
                                        <Text size="sm" color="dimmed">({shopInfo.totalReviews} đánh giá)</Text>
                                    </Group>
                                    <Group gap="xs">
                                        <FiUsers size={16} />
                                        <Text size="sm">{shopInfo.totalFollowers.toLocaleString()} người theo dõi</Text>
                                    </Group>
                                    <Group gap="xs">
                                        <FiClock size={16} />
                                        <Text size="sm">Tham gia từ {formatDate(shopInfo.joinDate)}</Text>
                                    </Group>
                                </Group>
                            </div>
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Stack align="flex-end">
                            <Group>
                                <ActionIcon variant="light" size="lg">
                                    <FiShare2 size={20} />
                                </ActionIcon>
                                <Button
                                    variant={isFollowing ? "outline" : "filled"}
                                    leftSection={<FiHeart size={16} />}
                                    onClick={onFollowToggle}
                                >
                                    {isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
                                </Button>
                                <Button
                                    variant="light"
                                    leftSection={<FiMessageCircle size={16} />}
                                >
                                    Chat ngay
                                </Button>
                            </Group>

                            <Paper withBorder p="md" w="100%">
                                <Stack gap="xs">
                                    <Group justify="space-between">
                                        <Text size="sm" color="dimmed">Tỷ lệ phản hồi</Text>
                                        <Text size="sm" fw={500}>{shopInfo.responseRate}%</Text>
                                    </Group>
                                    <Progress value={shopInfo.responseRate} size="sm" />
                                    
                                    <Group justify="space-between">
                                        <Text size="sm" color="dimmed">Thời gian phản hồi</Text>
                                        <Text size="sm" fw={500}>{shopInfo.responseTime}</Text>
                                    </Group>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Paper>
        </>
    );
};

export default ShopInfoComponent;