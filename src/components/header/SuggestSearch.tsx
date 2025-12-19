import React, { useState, useEffect } from 'react';
import { Paper, Group, Text, Divider, Skeleton, Box, UnstyledButton } from '@mantine/core';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type SearchResult = {
  id: string;
  name: string;
  thumbnailUrl?: string;
  price: number;
  category?: string;
};

interface SuggestSearchProps {
  searchTerm: string;
  visible: boolean;
  onSelect: () => void;
  withBlur?: boolean;
  className?: string; 
}

// Hàm mô phỏng gọi API tìm kiếm
const mockSearchAPI = async (term: string): Promise<{ products: SearchResult[], categories: string[], recentSearches: string[] }> => {
  // Giả lập độ trễ API
  await new Promise(resolve => setTimeout(resolve, 300));

  // Nếu không có từ khóa, trả về rỗng
  if (!term.trim()) {
    return { products: [], categories: [], recentSearches: [] };
  }

  // Mô phỏng kết quả tìm kiếm
  return {
    products: [
      { id: '1', name: `Áo thun ${term}`, price: 299000, thumbnailUrl: 'https://picsum.photos/id/26/60/60', category: 'Áo & Thời trang nam' },
      { id: '2', name: `Quần jean ${term} dáng suông`, price: 499000, thumbnailUrl: 'https://picsum.photos/id/21/60/60', category: 'Quần & Thời trang nam' },
      { id: '3', name: `Giày ${term} thể thao`, price: 799000, thumbnailUrl: 'https://picsum.photos/id/15/60/60', category: 'Giày & Phụ kiện' },
    ],
    categories: [
      'Áo thun',
      'Quần jean',
      'Giày thể thao'
    ],
    recentSearches: [
      'áo khoác',
      'quần jean nam',
      'giày nike'
    ]
  };
};

const SuggestSearch: React.FC<SuggestSearchProps> = ({
  searchTerm,
  visible,
  onSelect,
  withBlur = true,
  className = ''
}) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    products: SearchResult[];
    categories: string[];
    recentSearches: string[];
  }>({
    products: [],
    categories: [],
    recentSearches: []
  });

  useEffect(() => {
    if (!visible || !searchTerm.trim()) {
      setResults({ products: [], categories: [], recentSearches: [] });
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await mockSearchAPI(searchTerm);
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 200);
    return () => clearTimeout(timer);
  }, [searchTerm, visible]);

  if (!visible) return null;

  // Define blur class based on withBlur prop
  const blurClass = !withBlur ? '!backdrop-blur-md !bg-white/80' : '!bg-white';
  console.log('blurClass', withBlur);

  // Loading state
  if (loading) {
    return (
      <Paper
        shadow="md"
        radius="md"
        className={`absolute mt-1 w-full z-50 px-3 py-3 ${blurClass} ${className}`}
      >
        <Box mb="md">
          <Skeleton height={16} mb={8} />
          <Skeleton height={16} mb={8} width="80%" />
          <Skeleton height={16} width="60%" />
        </Box>

        <Divider my="sm" />

        {Array(3).fill(0).map((_, index) => (
          <Group key={index} mb="md">
            <Skeleton height={50} width={50} radius="md" />
            <Box style={{ flex: 1 }}>
              <Skeleton height={16} mb={6} />
              <Skeleton height={12} width="50%" />
            </Box>
            <Skeleton height={16} width={60} />
          </Group>
        ))}
      </Paper>
    );
  }

  // When there are no results
  const noResults = !results.products.length && !results.categories.length && !searchTerm.trim();

  // Display search history when no keyword
  if (noResults) {
    return (
      <Paper
        shadow="md"
        radius="md"
        className={`absolute mt-1 w-full z-50 px-3 py-3 ${blurClass} ${className}`}
      >
        <Text size="sm" fw={500} mb="xs">Tìm kiếm gần đây</Text>
        {results.recentSearches.length > 0 ? (
          results.recentSearches.map((term, index) => (
            <UnstyledButton
              key={index}
              className="w-full text-left p-2 hover:bg-gray-100 rounded"
              onClick={onSelect}
            >
              <Group>
                <FiSearch size={14} className="text-gray-500" />
                <Text size="sm">{term}</Text>
              </Group>
            </UnstyledButton>
          ))
        ) : (
          <Text size="sm" color="dimmed" ta="center" py="md">
            Không có lịch sử tìm kiếm gần đây
          </Text>
        )}
      </Paper>
    );
  }

  // Display search results
  return (
    <Paper
      shadow="md"
      radius="md"
      className={`absolute mt-1 w-full z-50 px-3 py-3 ${blurClass} ${className}`}
    >
      {/* Categories */}
      {results.categories.length > 0 && (
        <>
          <Text size="sm" fw={500} mb="xs">Danh mục liên quan</Text>
          <Group mb="md">
            {results.categories.map((category, index) => (
              <Link
                key={index}
                to={`/search?category=${encodeURIComponent(category)}`}
                className="no-underline"
                onClick={onSelect}
              >
                <Box
                  className="bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded-full text-sm text-gray-700"
                >
                  {category}
                </Box>
              </Link>
            ))}
          </Group>
          <Divider my="sm" />
        </>
      )}

      {/* Suggested products */}
      {results.products.length > 0 && (
        <>
          <Text size="sm" fw={500} mb="md">Sản phẩm gợi ý</Text>

          {results.products.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="no-underline text-inherit"
              onClick={onSelect}
            >
              <Group mb="md" className="hover:bg-gray-50 rounded p-2 -mx-2">
                {product.thumbnailUrl && (
                  <img
                    src={product.thumbnailUrl}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <Box style={{ flex: 1 }}>
                  <Text size="sm" lineClamp={1}>{product.name}</Text>
                  {product.category && (
                    <Text size="xs" color="dimmed">{product.category}</Text>
                  )}
                </Box>
                <Text size="sm" fw={500}>{product.price.toLocaleString()}đ</Text>
              </Group>
            </Link>
          ))}

          <Divider my="sm" />
        </>
      )}

      {/* See all results */}
      <Link
        to={`/search?q=${encodeURIComponent(searchTerm)}`}
        className="block text-center text-blue-600 no-underline hover:underline py-1"
        onClick={onSelect}
      >
        <Text size="sm">Xem tất cả kết quả cho "{searchTerm}"</Text>
      </Link>
    </Paper>
  );
};

export default SuggestSearch;