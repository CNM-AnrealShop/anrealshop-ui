import { Button, Card, Text } from '@mantine/core';
import { FiPackage } from 'react-icons/fi';

interface NonOrderFoundProps {
  searchTerm?: string;
  onClearFilters?: () => void;
  message?: string;
  subMessage?: string;
}

const NonOrderFound = ({
  searchTerm,
  onClearFilters,
  message = 'Không tìm thấy đơn hàng nào',
  subMessage = 'Không có đơn hàng nào trong trạng thái đã chọn'
}: NonOrderFoundProps) => {
  return (
    <>

      <Card withBorder p={0} className="!bg-white mt-2">
        <div className="text-center py-10 min-h-[80vh] " style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <FiPackage size={48} className="mx-auto text-gray-300 mb-4" />
          <Text size="lg" fw={500} c="dimmed">{message}</Text>
          <Text size="sm" c="dimmed" mt="xs">
            {subMessage}
          </Text>
          {(searchTerm) && (
            <Button
              variant="outline"
              mt="md"
              onClick={onClearFilters}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default NonOrderFound;