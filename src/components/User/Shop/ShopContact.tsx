import React from 'react';
import { Grid, Paper, Title, Stack, Group, Text } from '@mantine/core';
import {
    FiPhone,
    FiMail,
    FiGlobe,
    FiMapPin,
    FiTruck,
    FiShield,
    FiAward
} from 'react-icons/fi';

interface ShopInfo {
    phone: string;
    email: string;
    website?: string;
    address: string;
}

interface ShopContactProps {
    shopInfo: ShopInfo;
}

const ShopContact: React.FC<ShopContactProps> = ({ shopInfo }) => {
    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper withBorder p="md">
                    <Title order={4} mb="md">Thông tin liên hệ</Title>
                    <Stack gap="sm">
                        <Group>
                            <FiPhone size={16} />
                            <Text>{shopInfo.phone}</Text>
                        </Group>
                        <Group>
                            <FiMail size={16} />
                            <Text>{shopInfo.email}</Text>
                        </Group>
                        {shopInfo.website && (
                            <Group>
                                <FiGlobe size={16} />
                                <Text>{shopInfo.website}</Text>
                            </Group>
                        )}
                        <Group>
                            <FiMapPin size={16} />
                            <Text>{shopInfo.address}</Text>
                        </Group>
                    </Stack>
                </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper withBorder p="md">
                    <Title order={4} mb="md">Chính sách shop</Title>
                    <Stack gap="sm">
                        <Group>
                            <FiTruck size={16} />
                            <Text size="sm">Giao hàng toàn quốc</Text>
                        </Group>
                        <Group>
                            <FiShield size={16} />
                            <Text size="sm">Đổi trả trong 30 ngày</Text>
                        </Group>
                        <Group>
                            <FiAward size={16} />
                            <Text size="sm">Cam kết hàng chính hãng</Text>
                        </Group>
                    </Stack>
                </Paper>
            </Grid.Col>
        </Grid>
    );
};

export default ShopContact;