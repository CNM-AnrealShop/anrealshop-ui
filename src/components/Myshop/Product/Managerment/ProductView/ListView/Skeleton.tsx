import { Checkbox, Group, Skeleton as MantineSkeleton, Table } from '@mantine/core';

interface ListViewSkeletonProps {
  rowCount?: number;
}

const ListViewSkeleton = ({ rowCount = 5 }: ListViewSkeletonProps) => {
  const rows = Array(rowCount).fill(0);

  return (
    <div className="p-4 bg-white rounded-md overflow-hidden">
      <Table horizontalSpacing="md" verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={40}>
              <Checkbox disabled />
            </Table.Th>
            <Table.Th>Sản phẩm</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Giá</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Tồn kho</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Đã bán</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Trạng thái</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Hoạt động</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((_, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <Checkbox disabled />
              </Table.Td>
              <Table.Td>
                <Group>
                  <MantineSkeleton height={40} width={40} radius="sm" />
                  <div style={{ flex: 1 }}>
                    <MantineSkeleton height={16} width="70%" mb={6} />
                    <MantineSkeleton height={12} width="40%" />
                  </div>
                </Group>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <MantineSkeleton height={16} width="60%" mx="auto" />
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <MantineSkeleton height={16} width="40%" mx="auto" />
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <MantineSkeleton height={16} width="40%" mx="auto" />
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <MantineSkeleton height={24} width="80%" mx="auto" radius="xl" />
              </Table.Td>
              <Table.Td>
                <Group gap="xs" justify="center">
                  <MantineSkeleton height={20} width={40} radius="xl" />
                  <MantineSkeleton height={20} width={20} circle />
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default ListViewSkeleton;