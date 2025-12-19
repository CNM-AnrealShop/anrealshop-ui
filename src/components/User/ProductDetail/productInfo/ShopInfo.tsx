import {
    Avatar,
    Box,
    Button,
    Group,
    Paper,
    Text
} from '@mantine/core';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../constant';

interface ShopInfoProps {
    id: string;
    url: string;
    name: string;
}

export const ShopInfo = ({ id, url, name }: ShopInfoProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper withBorder p="md" radius="md" className="mb-6">
                <Group justify="space-between" wrap="nowrap">
                    <Group wrap="nowrap">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Avatar src={url} size="lg" radius="md" />
                        </motion.div>
                        <Box>
                            <Text fw={600} size="sm">{name}</Text>
                            <Text size="xs" c="dimmed">Online 2 giờ trước</Text>
                        </Box>
                    </Group>

                    <Group gap="xs">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                component={Link}
                                to={`${APP_ROUTES.SHOP}/${id}`}
                                variant="outline"
                                size="xs"
                                leftSection={<FiShoppingBag size={14} />}
                            >
                                Xem Shop
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="outline"
                                size="xs"
                                leftSection={<FiMessageCircle size={14} />}
                            >
                                Chat
                            </Button>
                        </motion.div>
                    </Group>
                </Group>
            </Paper>
        </motion.div>
    )
}
