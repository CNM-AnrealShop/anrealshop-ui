import { Box, Title, Group, Button, SimpleGrid, Text, Paper, Badge } from '@mantine/core';
import { FiSearch, FiChevronRight, FiArrowUp, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Dữ liệu giả lập cho các từ khóa tìm kiếm phổ biến 
interface SearchTerm {
  id: number;
  term: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

const mockSearchTerms: SearchTerm[] = [
  { id: 1, term: 'Điện thoại Samsung', count: 12500, trend: 'up', category: 'Điện tử' },
  { id: 2, term: 'Laptop gaming', count: 9800, trend: 'up', category: 'Máy tính' },
  { id: 3, term: 'Giày Nike', count: 8700, trend: 'stable', category: 'Thời trang' },
  { id: 4, term: 'Áo phông nam', count: 7600, trend: 'down', category: 'Thời trang' },
  { id: 5, term: 'Nước hoa nữ', count: 6900, trend: 'up', category: 'Làm đẹp' },
  { id: 6, term: 'Tai nghe không dây', count: 6500, trend: 'up', category: 'Phụ kiện' },
  { id: 7, term: 'Máy lọc không khí', count: 5800, trend: 'up', category: 'Gia dụng' },
  { id: 8, term: 'Sách tiếng Anh', count: 5200, trend: 'stable', category: 'Sách' },
  { id: 9, term: 'Đồng hồ thông minh', count: 4700, trend: 'up', category: 'Công nghệ' },
  { id: 10, term: 'Bình giữ nhiệt', count: 4300, trend: 'down', category: 'Đời sống' },
  { id: 11, term: 'Kem chống nắng', count: 3900, trend: 'up', category: 'Làm đẹp' },
  { id: 12, term: 'Nồi chiên không dầu', count: 3500, trend: 'stable', category: 'Nhà bếp' }
];

const SearchTop = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [filteredTerms, setFilteredTerms] = useState<SearchTerm[]>(mockSearchTerms);

  // Lấy danh sách các danh mục duy nhất từ dữ liệu
  const categories = ['Tất cả', ...Array.from(new Set(mockSearchTerms.map(item => item.category)))];

  // Lọc từ khóa theo danh mục khi danh mục thay đổi
  useEffect(() => {
    if (activeCategory === 'Tất cả') {
      setFilteredTerms(mockSearchTerms);
    } else {
      const filtered = mockSearchTerms.filter(item => item.category === activeCategory);
      setFilteredTerms(filtered);
    }
  }, [activeCategory]);

  return (
    <Box className="top-search-terms">
      <Group justify="space-between" className="mb-6">
        <Title order={4} className="flex items-center gap-2 text-slate-900">
          <FiSearch size={24} className="text-blue-500" />
          <span>Từ khóa tìm kiếm hàng đầu</span>
        </Title>

        <Button
          component={Link}
          to="/search-trends"
          variant="subtle"
          color="blue"
          rightSection={<FiChevronRight size={16} />}
          className="text-primary hover:bg-blue-50"
        >
          Xem tất cả
        </Button>
      </Group>

      {/* Tabs cho các danh mục */}
      <Group className="mb-6 overflow-x-auto hide-scrollbar" gap="sm">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'filled' : 'light'}
            color={activeCategory === category ? 'blue' : 'gray'}
            size="sm"
            radius="md"
            onClick={() => setActiveCategory(category)}
            className={`${
              activeCategory === category 
                ? 'bg-primary hover:bg-primary-dark' 
                : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            {category}
          </Button>
        ))}
      </Group>

      {/* Grid hiển thị các từ khóa */}
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="md">
        {filteredTerms.slice(0, 12).map((item) => (
          <Paper
            key={item.id}
            p="sm"
            shadow="sm"
            radius="md"
            withBorder
            className="hover:shadow-md transition-shadow"
          >
            <Link to={`/search?q=${encodeURIComponent(item.term)}`} className="no-underline">
              <Group justify="apart" className="mb-2">
                <Text fw={600} size="sm" className="text-slate-900">
                  {item.term}
                </Text>
                {item.trend === 'up' ? (
                  <Badge color="green" size="sm" leftSection={<FiArrowUp size={12} />}>
                    Tăng
                  </Badge>
                ) : item.trend === 'down' ? (
                  <Badge color="red" size="sm" leftSection={<FiArrowUp size={12} className="rotate-180" />}>
                    Giảm
                  </Badge>
                ) : (
                  <Badge color="gray" size="sm" leftSection={<FiTrendingUp size={12} />}>
                    Ổn định
                  </Badge>
                )}
              </Group>

              <Group justify="apart" className="items-center">
                <Text size="xs" c="dimmed">
                  {item.count.toLocaleString()} lượt tìm
                </Text>
                <Text size="xs" fw={500} className="text-blue-600">
                  {item.category}
                </Text>
              </Group>
            </Link>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchTop;