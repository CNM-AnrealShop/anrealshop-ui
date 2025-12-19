import { Group, Skeleton, Table } from '@mantine/core';

export const UserListSkeleton = ({ rows = 8 }: { rows?: number }) => {
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
                {Array(rows).fill(0).map((_, i) => (
                    <Table.Tr key={i}>
                        <Table.Td>
                            <Group className='flex !flex-nowrap'>
                                <Skeleton height={40} circle />
                                <div>
                                    <Skeleton height={16} width={150} radius="sm" mb={4} />
                                    <Skeleton height={12} width={80} radius="sm" />
                                </div>
                            </Group>
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                            <Skeleton height={16} width={150} radius="sm" mx="auto" />
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                            <Skeleton height={16} width={100} radius="sm" mx="auto" />
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                            <Skeleton height={24} width={80} radius="xl" mx="auto" />
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                            <Skeleton height={16} width={90} radius="sm" mx="auto" />
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                            <Skeleton height={24} width={90} radius="xl" mx="auto" />
                        </Table.Td>
                        <Table.Td>
                            <Group justify="center">
                                <Skeleton height={32} width={32} radius="sm" />
                                <Skeleton height={32} width={32} radius="sm" />
                            </Group>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};
