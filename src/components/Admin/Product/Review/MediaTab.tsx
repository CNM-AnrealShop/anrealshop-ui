import { ActionIcon, Badge, Box, Card, Center, Grid, Image, Paper, SimpleGrid, Text } from '@mantine/core';
import React, { useState } from 'react';
import { FiImage, FiMaximize, FiMinimize2, FiVideo } from 'react-icons/fi';
import type { MediaDto } from '../../../../types/CommonType';
import type { ProductDetailDto } from '../../../../types/ProductType';

interface MediaTabProps {
  product: ProductDetailDto;
  allMedia: MediaDto[];
}

const MediaTab: React.FC<MediaTabProps> = ({
  product,
  allMedia
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.thumbnailUrl || '');
  const [viewType, setViewType] = useState<'grid' | 'detail'>('grid');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredSelected, setHoveredSelected] = useState(false);

  const handleSelectMedia = (url: string) => {
    setSelectedImage(url);
    setViewType('detail');
  };

  const selectedMedia = allMedia.find(media => media.url === selectedImage) || allMedia[0];
  const isVideo = selectedMedia?.type === 'VIDEO';

  return (
    <Box p="xs">
      {viewType === 'grid' && (
        <SimpleGrid cols={{ base: 2, xs: 3, sm: 6, md: 6 }} spacing="xs">
          {allMedia.map((media, index) => (
            <Card
              key={media.id || index}
              p={0}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSelectMedia(media.url)}
            >
              <Box pos="relative">
                <div className="w-full h-28 flex-shrink-0 object-cover rounded-sm overflow-hidden">
                  <Image
                    src={media.thumbnailUrl || media.url}
                    height={120}
                    radius="sm"
                    fit="cover"
                  />
                </div>
                {media.type === 'VIDEO' && (
                  <Box
                    pos="absolute"
                    top={5}
                    right={5}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: '50%',
                      padding: '4px'
                    }}
                  >
                    <FiVideo size={16} color="white" />
                  </Box>
                )}

                {hoveredIndex === index && (
                  <Center
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      borderRadius: '4px'
                    }}
                  >
                    <ActionIcon
                      variant="filled"
                      size="lg"
                      color="blue"
                      radius="xl"
                    >
                      <FiMaximize size={14} />
                    </ActionIcon>
                  </Center>
                )}
              </Box>
              <Text size="xs" ta="center" p={4} lineClamp={1}>
                {media.type === 'VIDEO' ? 'Video' : `Hình ${index + 1}`}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {viewType === 'detail' && (
        <Grid gutter="md">
          {/* Left column - thumbnails */}
          <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
            <Paper radius="md"       >
              <Text size="sm" fw={500} mb="xs">Tất cả hình ảnh ({allMedia.length})</Text>
              <SimpleGrid cols={{ base: 2, xs: 3 }} spacing="xs">
                {allMedia.map((media, index) => (
                  <Card
                    key={media.id || index}
                    p={0}

                    style={{
                      cursor: 'pointer',
                      borderColor: media.url === selectedImage ? '#228be6' : undefined,
                      borderWidth: media.url === selectedImage ? '2px' : '1px'
                    }}
                    onClick={() => handleSelectMedia(media.url)}
                  >
                    <Box pos="relative">
                      <div className="w-full h-28 flex-shrink-0 object-cover rounded-sm overflow-hidden">
                        <Image
                          src={media.thumbnailUrl || media.url}
                          height={120}
                          radius="sm"
                          fit="cover"
                        />
                      </div>
                      {media.type === 'VIDEO' && (
                        <Box
                          pos="absolute"
                          top={3}
                          right={3}
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '50%',
                            padding: '2px'
                          }}
                        >
                          <FiVideo size={12} color="white" />
                        </Box>
                      )}
                    </Box>
                  </Card>
                ))}
              </SimpleGrid>
            </Paper>
          </Grid.Col>

          {/* Right column - selected image */}
          <Grid.Col span={{ base: 12, sm: 6, md: 8 }}>
            <Paper radius="md">
              <Box
                pos="relative"
                onMouseEnter={() => setHoveredSelected(true)}
                onMouseLeave={() => setHoveredSelected(false)}
              >
                {/* Badge for image type in top right */}
                <Badge
                  color={isVideo ? 'red' : 'blue'}
                  size="md"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 2
                  }}
                  leftSection={isVideo ? <FiVideo size={12} /> : <FiImage size={12} />}
                >
                  {isVideo ? 'Video' : `Hình ảnh`}
                </Badge>

                {isVideo ? (
                  <video
                    src={selectedImage}
                    controls
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  <div className="w-full h-full  flex items-center justify-center object-cover rounded-sm overflow-hidden">
                    <Image
                      src={selectedImage || 'https://placehold.co/600x400?text=No+Image'}
                      height={250}
                      radius="md"
                      fit="contain"
                      style={{ backgroundColor: '#f8f9fa' }}
                    />
                  </div>
                )}

                {/* Minimize button on hover */}
                {hoveredSelected && (
                  <ActionIcon
                    variant="filled"
                    color="gray"
                    radius="xl"
                    size="lg"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                    }}
                    onClick={() => setViewType('grid')}
                  >
                    <FiMinimize2 size={20} />
                  </ActionIcon>
                )}

              </Box>
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
};

export default MediaTab;  