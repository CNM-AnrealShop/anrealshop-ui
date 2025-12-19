import { Group, Pagination, Text } from '@mantine/core';

interface PaginationCustomProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const PaginationCustom: React.FC<PaginationCustomProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Group justify="space-between" mt="md" p="sm">
      <Text size="sm" c="dimmed">
        Hiển thị {startItem} - {endItem} trong tổng số {totalItems} mục
      </Text>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={onPageChange}
        size="sm"
        withEdges
      />
    </Group>
  );
};

export default PaginationCustom;