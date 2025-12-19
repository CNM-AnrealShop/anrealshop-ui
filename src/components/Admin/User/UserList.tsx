import { ActionIcon, Avatar, Badge, Group, Menu, Table, Text, Tooltip } from '@mantine/core';
import { FiEye, FiLock, FiMoreVertical } from 'react-icons/fi';
import type { UserManagerDto } from '../../../types/UserType';
import { formatDate } from '../../../untils/Untils';
import { useUserStatus } from '../../../hooks/useUserStatus';
import { UserListSkeleton } from './skeleton';

interface UserListProps {
    users: UserManagerDto[];
    onViewUser: (userId: string) => void;
    onDeleteUser: (userId: string) => void;
    loading: boolean;
}

const UserList: React.FC<UserListProps> = ({
    users,
    onViewUser,
    onDeleteUser,
    loading
}) => {
    const { getRoleBadgeColor, getRoleLabel } = useUserStatus();

    if (loading) {
        return <UserListSkeleton />;
    }

    return (
        <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Người dùng</Table.Th>
                    <Table.Th style={{ textAlign: 'center' }}>Email</Table.Th>
                    <Table.Th style={{ textAlign: 'center' }}>Số điện thoại</Table.Th>
                    <Table.Th style={{ textAlign: 'center' }}>Vai trò</Table.Th>
                    <Table.Th style={{ textAlign: 'center' }}>Ngày tạo</Table.Th>
                    <Table.Th style={{ textAlign: 'center' }}>Trạng thái</Table.Th>
                    <Table.Th style={{ width: '100px', textAlign: 'center' }}>Thao tác</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {users.length === 0 ? (
                    <Table.Tr>
                        <Table.Td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                            <Text my={'70px'} fw={500} c="dimmed">Không có người dùng nào</Text>
                        </Table.Td>
                    </Table.Tr>
                ) : (
                    users.map((user) => (
                        <Table.Tr key={user.id}>
                            <Table.Td>
                                <Group className='flex !flex-nowrap'>
                                    <Avatar
                                        src={user.avatarUrl}
                                        alt={user.fullName}
                                        radius="xl"
                                        size="md"
                                    />
                                    <Tooltip label={user.fullName}>
                                        <div>
                                            <Text size="sm" fw={500} lineClamp={1}>{user.fullName}</Text>
                                            <Text size="xs" c="dimmed">@{user.username}</Text>
                                        </div>
                                    </Tooltip>
                                </Group>
                            </Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>
                                <Text size="sm">{user.email}</Text>
                            </Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>
                                <Text size="sm">{user.phoneNumber || '-'}</Text>
                            </Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>
                                <Badge color={getRoleBadgeColor(user.role)}>
                                    {getRoleLabel(user.role)}
                                </Badge>
                            </Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>
                                {formatDate(user.createdAt)}
                            </Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>
                                <Badge color={user.verified ? 'green' : 'gray'}>
                                    {user.verified ? 'Đã xác minh' : 'Chưa xác minh'}
                                </Badge>
                            </Table.Td>
                            <Table.Td>
                                <Group justify="center">
                                    <Tooltip label="Xem chi tiết">
                                        <ActionIcon
                                            variant="subtle"
                                            onClick={() => onViewUser(user.id)}
                                        >
                                            <FiEye size={16} />
                                        </ActionIcon>
                                    </Tooltip>

                                    <Menu position="bottom-end" withinPortal>
                                        <Menu.Target>
                                            <ActionIcon variant="subtle">
                                                <FiMoreVertical size={16} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item
                                                color="red"
                                                leftSection={<FiLock size={14} />}
                                                onClick={() => onDeleteUser(user.id)}
                                            >
                                                Khóa tài khoản
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))
                )}
            </Table.Tbody>
        </Table>
    );
};

export default UserList;
