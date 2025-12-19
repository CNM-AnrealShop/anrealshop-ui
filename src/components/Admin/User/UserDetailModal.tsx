import { Avatar, Badge, Box, Divider, Group, Modal, Stack, Text } from '@mantine/core';
import { FiCalendar, FiMail, FiPhone, FiShield, FiUser } from 'react-icons/fi';
import type { UserManagerDto } from '../../../types/UserType';
import { formatDate } from '../../../untils/Untils';
import { useUserStatus } from '../../../hooks/useUserStatus';

interface UserDetailModalProps {
    opened: boolean;
    onClose: () => void;
    user: UserManagerDto | null;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ opened, onClose, user }) => {
    const { getRoleBadgeColor, getRoleLabel } = useUserStatus();

    if (!user) return null;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Thông tin người dùng"
            size="lg"
            centered
        >
            <Stack gap="md" p={"md"}>
                <Group>
                    <Avatar src={user.avatarUrl} size={80} radius="xl" />
                    <Stack gap="xs">
                        <Text size="lg" fw={600}>{user.fullName}</Text>
                        <Group gap="xs">
                            <Badge color={getRoleBadgeColor(user.role)}>
                                {getRoleLabel(user.role)}
                            </Badge>
                            <Badge color={user.verified ? 'green' : 'gray'}>
                                {user.verified ? 'Đã xác minh' : 'Chưa xác minh'}
                            </Badge>
                        </Group>
                    </Stack>
                </Group>

                <Divider />

                <Box>
                    <Text size="sm" fw={600} mb="xs">Thông tin liên hệ</Text>
                    <Stack gap="xs">
                        <Group gap="xs">
                            <FiUser size={16} />
                            <Text size="sm" c="dimmed">Tên đăng nhập:</Text>
                            <Text size="sm" fw={500}>@{user.username}</Text>
                        </Group>
                        <Group gap="xs">
                            <FiMail size={16} />
                            <Text size="sm" c="dimmed">Email:</Text>
                            <Text size="sm" fw={500}>{user.email}</Text>
                        </Group>
                        <Group gap="xs">
                            <FiPhone size={16} />
                            <Text size="sm" c="dimmed">Số điện thoại:</Text>
                            <Text size="sm" fw={500}>{user.phoneNumber || 'Chưa cập nhật'}</Text>
                        </Group>
                    </Stack>
                </Box>

                <Divider />

                <Box>
                    <Text size="sm" fw={600} mb="xs">Thông tin tài khoản</Text>
                    <Stack gap="xs">
                        <Group gap="xs">
                            <FiShield size={16} />
                            <Text size="sm" c="dimmed">ID:</Text>
                            <Text size="sm" fw={500}>{user.id}</Text>
                        </Group>
                        <Group gap="xs">
                            <FiCalendar size={16} />
                            <Text size="sm" c="dimmed">Ngày tạo:</Text>
                            <Text size="sm" fw={500}>{formatDate(user.createdAt)}</Text>
                        </Group>
                    </Stack>
                </Box>
            </Stack>
        </Modal>
    );
};

export default UserDetailModal;
