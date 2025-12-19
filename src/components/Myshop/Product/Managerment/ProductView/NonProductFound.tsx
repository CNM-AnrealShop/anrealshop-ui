import { Button, Group, Text } from '@mantine/core';
import { FiHome, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { BaseCategoryDto } from '../../../../../types/CategoryType';

interface NonProductFoundProps {
  searchQuery?: string;
  category?: BaseCategoryDto | null;
}

const NonProductFound = ({ searchQuery, category }: NonProductFoundProps) => {
  const hasFilters = searchQuery || category;

  return (
    <div className="p-8 pb-16 text-center">
      <div className="flex justify-center mb-4">
        {hasFilters ? <FiSearch size={42} className="text-gray-300" /> : <FiHome size={42} className="text-gray-300" />}
      </div>
      
      <Text size="lg" fw={500} c="dimmed" mb="xs">
        {hasFilters ? 'Không tìm thấy sản phẩm nào' : 'Danh sách sản phẩm trống'}
      </Text>
      
      <Text size="sm" c="dimmed" mb="md">
        {hasFilters 
          ? 'Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc'
          : 'Hãy thêm sản phẩm của bạn để bắt đầu bán hàng'
        }
      </Text>

      <Group justify="center">
        
        <Link to="/myshop/product/create">
          <Button 
            leftSection={<FiPlus size={16} />}
            className="bg-primary hover:bg-primary/90"
          >
            Thêm sản phẩm mới
          </Button>
        </Link>
      </Group>
    </div>
  );
};

export default NonProductFound;