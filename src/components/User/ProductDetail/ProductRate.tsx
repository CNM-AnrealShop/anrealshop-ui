import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Image,
  Modal,
  Pagination,
  Paper,
  Progress,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useState } from 'react';
import { FiImage, FiMessageSquare, FiShare2, FiStar, FiThumbsUp } from 'react-icons/fi';

interface ProductReviewMedia {
  id: string;
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO';
}

interface ProductReview {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    fullName?: string;
    avatarUrl?: string;
  };
  media: ProductReviewMedia[];
}

interface ProductRateProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const ProductRate = ({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution = {
    5: Math.round(Math.random() * 100),
    4: Math.round(Math.random() * 60),
    3: Math.round(Math.random() * 30),
    2: Math.round(Math.random() * 15),
    1: Math.round(Math.random() * 10),
  }
}: ProductRateProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showWithImages, setShowWithImages] = useState(false);
  
  // Calculate total ratings for distribution percentages
  const totalRatings = Object.values(ratingDistribution).reduce((a, b) => a + b, 0) || 1;
  
  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('vi-VN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    if (filterRating && review.rating !== filterRating) return false;
    if (showWithImages && review.media.length === 0) return false;
    return true;
  });
  
  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const displayedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Get count of reviews with images
  const reviewsWithImagesCount = reviews.filter(review => review.media.length > 0).length;
  
  // Review image gallery
  const allImages = reviews.flatMap(review => 
    review.media.filter(media => media.mediaType === 'IMAGE').map(media => ({
      url: media.mediaUrl,
      reviewId: review.id
    }))
  );

  return (
    <>
      <Paper radius="md" className="bg-white shadow-sm mb-8">
        <Box className="p-6">
          <Title order={3} className="mb-6">Đánh giá sản phẩm</Title>
          
          {/* Rating summary */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} className="mb-8">
            <Box className="flex flex-col items-center justify-center">
              <Text size="2rem" fw={700} className="text-primary">{averageRating.toFixed(1)}/5</Text>
              <Rating value={averageRating} fractions={2} readOnly size="lg" className="mb-2" />
              <Text size="sm" c="dimmed">{totalReviews} đánh giá</Text>
            </Box>
            
            <Stack className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <Group key={star} justify="apart" className="flex-nowrap" gap="xs">
                  <Group className="flex-nowrap" gap="xs" w="70px">
                    <Text size="sm">{star}</Text>
                    <FiStar size={14} />
                  </Group>
                  <Box className="flex-1">
                    <Progress 
                      value={(ratingDistribution[star as keyof typeof ratingDistribution] / totalRatings) * 100} 
                      color={star > 3 ? 'green' : star > 2 ? 'yellow' : 'red'}
                    />
                  </Box>
                  <Text size="sm" className="w-40px text-right">
                    {ratingDistribution[star as keyof typeof ratingDistribution]}
                  </Text>
                </Group>
              ))}
            </Stack>
          </SimpleGrid>
          
          {/* Filters */}
          <Box className="mb-6">
            <Group>
              <Button 
                variant={!filterRating ? 'filled' : 'outline'} 
                size="xs"
                onClick={() => {
                  setFilterRating(null);
                  setCurrentPage(1);
                }}
              >
                Tất cả
              </Button>
              {[5, 4, 3, 2, 1].map(star => (
                <Button
                  key={`filter-${star}`}
                  variant={filterRating === star ? 'filled' : 'outline'}
                  size="xs"
                  leftSection={<FiStar size={14} />}
                  onClick={() => {
                    setFilterRating(filterRating === star ? null : star);
                    setCurrentPage(1);
                  }}
                >
                  {star}
                </Button>
              ))}
              <Button
                variant={showWithImages ? 'filled' : 'outline'}
                size="xs"
              leftSection={<FiImage size={14} />}
                onClick={() => {
                  setShowWithImages(!showWithImages);
                  setCurrentPage(1);
                }}
              >
                Có hình ảnh ({reviewsWithImagesCount})
              </Button>
            </Group>
          </Box>
          
          {/* Image gallery */}
          {allImages.length > 0 && (
            <Box className="mb-6">
              <Text fw={600} className="mb-2">Hình ảnh từ người dùng ({allImages.length})</Text>
              <Group>
                {allImages.slice(0, 8).map((image, index) => (
                  <Box 
                    key={`gallery-${index}`}
                    className="w-[100px] h-[100px] cursor-pointer overflow-hidden border border-gray-200 rounded hover:border-primary transition-all"
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <Image 
                      src={image.url} 
                      alt={`Review image ${index + 1}`} 
                      width={100} 
                      height={100} 
                      fit="cover" 
                    />
                  </Box>
                ))}
                {allImages.length > 8 && (
                  <Box className="w-[100px] h-[100px] cursor-pointer overflow-hidden border border-gray-200 rounded-md flex items-center justify-center bg-gray-50">
                    <Text size="sm" fw={500} className="text-primary">
                      +{allImages.length - 8} ảnh
                    </Text>
                  </Box>
                )}
              </Group>
            </Box>
          )}
          
          {/* Review list */}
          <Stack>
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review) => (
                <Paper key={review.id} withBorder p="md" className="hover:bg-gray-50 transition-colors">
                  <Group justify="apart" className="mb-2">
                    <Group>
                      <Avatar src={review.user.avatarUrl} radius="xl" color="blue">
                        {review.user.fullName?.substring(0, 2) || review.user.username.substring(0, 2)}
                      </Avatar>
                      <div>
                        <Text fw={600}>{review.user.fullName || review.user.username}</Text>
                        <Group gap={5}>
                          <Rating value={review.rating} readOnly size="xs" />
                          <Text size="xs" c="dimmed">· {formatDate(review.createdAt)}</Text>
                        </Group>
                      </div>
                    </Group>
                    <Badge color={review.rating > 3 ? 'green' : review.rating > 2 ? 'yellow' : 'red'}>
                      {review.rating} sao
                    </Badge>
                  </Group>
                  
                  {review.comment && (
                    <Text size="sm" className="mb-3">
                      {review.comment}
                    </Text>
                  )}
                  
                  {review.media.length > 0 && (
                    <Group className="mt-2">
                      {review.media.map((media, idx) => (
                        <Box 
                          key={`review-${review.id}-media-${idx}`} 
                          className="w-[80px] h-[80px] cursor-pointer overflow-hidden border border-gray-200 rounded"
                          onClick={() => setSelectedImage(media.mediaUrl)}
                        >
                          <Image 
                            src={media.mediaUrl} 
                            width={80} 
                            height={80} 
                            fit="cover" 
                            alt={`Ảnh đánh giá ${idx+1}`}
                          />
                        </Box>
                      ))}
                    </Group>
                  )}
                  
                  <Group justify="apart" className="mt-3">
                    <Group gap={5}>
                      <Button variant="subtle" size="xs"  leftSection={<FiThumbsUp size={14} />} >
                        Hữu ích
                      </Button>
                      <Button variant="subtle" size="xs"  leftSection={<FiMessageSquare size={14} />} >
                        Bình luận
                      </Button>
                    </Group>
                    <Button variant="subtle" size="xs"  leftSection={<FiShare2 size={14} />} >
                      Chia sẻ
                    </Button>
                  </Group>
                </Paper>
              ))
            ) : (
              <Box className="py-8 text-center">
                <FiStar size={40} className="mx-auto mb-3 text-gray-300" />
                <Text fw={500}>Không có đánh giá phù hợp với bộ lọc</Text>
                <Button 
                  variant="subtle" 
                  className="mt-2"
                  onClick={() => {
                    setFilterRating(null);
                    setShowWithImages(false);
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </Box>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Group justify="center" className="mt-4">
                <Pagination 
                  total={totalPages} 
                  value={currentPage} 
                  onChange={setCurrentPage} 
                  siblings={1}
                  boundaries={1}
                />
              </Group>
            )}
          </Stack>
        </Box>
      </Paper>
      
      {/* Image preview modal */}
      <Modal
        opened={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        withCloseButton
        size="lg"
        padding={0}
        centered
      >
        <Image 
          src={selectedImage || ''} 
          alt="Preview" 
          fit="contain"
          height={500}
        />
      </Modal>
    </>
  );
};

export default ProductRate;