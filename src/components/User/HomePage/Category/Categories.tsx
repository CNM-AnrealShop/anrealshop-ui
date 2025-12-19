import {
    Avatar,
    Box,
    Button,
    Group,
    SimpleGrid,
    Text,
    Title,
    UnstyledButton
} from '@mantine/core';
import { FiChevronRight, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { mockCategories } from '../../../../data/UserData';

const Categories = () => {

    return (
        <Box>
            <Group justify="space-between" className="mb-4">
                <Title order={4} className="flex items-center gap-2 text-slate-900">
                    <FiGrid size={24} className="text-primary" />
                    <span>Danh mục phổ biến</span>
                </Title>

                <Button
                    component={Link}
                    to="/categories"
                    variant="subtle"
                    color="blue"
                    rightSection={<FiChevronRight size={16} />}
                    className="text-primary hover:bg-blue-50"
                >
                    Xem tất cả
                </Button>
            </Group>

            {/* Sử dụng SimpleGrid để hiển thị đúng 6 items theo grid */}
            <SimpleGrid cols={{ base: 3, sm: 6 }} spacing="lg">
                {mockCategories.slice(0, 6).map((category) => (
                    <UnstyledButton
                        key={category.id}
                        component={Link}
                        to={`/category/${category.id}`}
                        className="flex flex-col items-center transition-transform hover:scale-105"
                    >
                        <Avatar
                            src={category.image}
                            size={90}
                            radius="xl"
                            alt={category.name}
                            className="mb-3 border-2 border-gray-100 shadow-sm"
                            styles={{
                                root: {
                                    borderRadius: '50%' // Đảm bảo hình tròn hoàn toàn
                                },
                                image: {
                                    objectFit: 'cover',
                                    borderRadius: '50%' // Đảm bảo hình tròn hoàn toàn
                                }
                            }}
                        />
                        <Text size="sm" fw={600} ta="center" className="text-slate-900 hover:!text-primary" lineClamp={2}>
                            {category.name}
                        </Text>
                    </UnstyledButton>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Categories;