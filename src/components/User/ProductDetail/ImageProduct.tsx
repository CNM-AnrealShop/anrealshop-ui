import { ActionIcon, Box, Group, Image, LoadingOverlay, ScrollArea, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface ImageProductProps {
  media: string[];
  thumbnailUrl: string;
  productName: string;
  selectedImage: number;
  setSelectedImage: (image: number) => void;
}

const ImageProduct = ({
  media,
  thumbnailUrl,
  productName,
  selectedImage,
  setSelectedImage
}: ImageProductProps) => {
  const [loading, setLoading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [zoomedView, setZoomedView] = useState(false);


  useEffect(() => {

    const img = new window.Image();
    img.src = media[0] || thumbnailUrl;
    img.onload = () => {
      setPreloadedImages(prev => [...prev, img.src]);
    };

    media.slice(1).forEach((imageUrl) => {
      const preloadImg = new window.Image();
      preloadImg.src = imageUrl;
      preloadImg.onload = () => {
        setPreloadedImages(prev => [...prev, imageUrl]);
      };
    });
  }, [media, thumbnailUrl]);

  const handlePrevImage = () => {
    const prevIndex = selectedImage === 0 ? media.length - 1 : selectedImage - 1;
    const prevImageUrl = media[prevIndex];

    if (!preloadedImages.includes(prevImageUrl)) {
      setLoading(true);
    }
    setSelectedImage(prevIndex);
  };

  const handleNextImage = () => {
    const nextIndex = selectedImage === media.length - 1 ? 0 : selectedImage + 1;
    const nextImageUrl = media[nextIndex];
    if (!preloadedImages.includes(nextImageUrl)) {
      setLoading(true);
    }
    setSelectedImage(nextIndex);
  };

  const handleImageLoad = () => {
    setLoading(false);
    const currentUrl = media[selectedImage];
    if (currentUrl && !preloadedImages.includes(currentUrl)) {
      setPreloadedImages(prev => [...prev, currentUrl]);
    }
  };

  return (
    <>
      <Box className="relative flex flex-col md:flex-row" style={{ minHeight: '440px' }}>
        <Stack
          className="flex-shrink-0 mr-4 hidden md:flex"
          gap="xs"
          style={{
            // width: '90px',
            maxHeight: '440px',
            overflowY: 'auto'
          }}
        >
          {media.map((imgUrl, idx) => (
            <Box
              key={idx}
              className={`cursor-pointer overflow-hidden border-2 rounded-md transition-all ${selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-300'
                }`}
              onClick={() => setSelectedImage(idx)}
              style={{
                height: '80px',
                position: 'relative',
                flexShrink: 0
              }}
            >
              <Image
                src={imgUrl}
                height={80}
                width={80}
                fit="cover"
                className="object-cover w-[80px] h-[80px] rounded"
                alt={`${productName} - ảnh ${idx + 1}`}
                loading="lazy"
              />
            </Box>
          ))}
        </Stack>

        <Box
          className="relative flex-1 overflow-hidden rounded-md bg-white"
          style={{ minHeight: '400px' }}
        >
          <Box
            className="relative w-full h-full"
            style={{ minHeight: '400px', cursor: 'zoom-in' }}
            onClick={() => setZoomedView(true)}
          >
            <LoadingOverlay visible={loading} />
            <Image
              src={media[selectedImage] || thumbnailUrl}
              height={500}
              className="w-full h-full object-cover bg-white transition-opacity duration-300"
              alt={productName}
              onLoad={handleImageLoad}
            />

            {media.length > 1 && (
              <Box className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                {selectedImage + 1}/{media.length}
              </Box>
            )}
          </Box>
          
          <ScrollArea className="mt-2 md:hidden">
            <Group className="gap-2 justify-center">
              {media.map((imgUrl, idx) => (
                <Box
                  key={idx}
                  className={`cursor-pointer overflow-hidden border-2 rounded-md flex-shrink-0 ${selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-200'
                    }`}
                  onClick={() => setSelectedImage(idx)}
                  style={{ width: '60px', height: '60px' }}
                >
                  <Image
                    src={imgUrl}
                    height={60}
                    width={60}
                    fit="cover"
                    alt={`${productName} - ảnh ${idx + 1}`}
                    loading="lazy"
                  />
                </Box>
              ))}
            </Group>
          </ScrollArea>

          {/* Navigation Arrows */}
          {media.length > 1 && (
            <div className="absolute top-1/2 w-full flex justify-between px-2" style={{ transform: 'translateY(-50%)' }}>
              <ActionIcon
                variant="filled"
                radius="xl"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: '#333',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                className="hover:bg-white"
              >
                <FiChevronLeft size={20} />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                radius="xl"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: '#333',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                className="hover:bg-white"
              >
                <FiChevronRight size={20} />
              </ActionIcon>
            </div>
          )}
        </Box>
      </Box>

      {/* Zoomed View Modal */}
      {zoomedView && createPortal(
        <div
          className="!fixed !top-0 !left-0 !right-0 bottom-0 bg-black/90 !z-[999] flex items-center justify-center"
          onClick={() => setZoomedView(false)}
          style={{ backdropFilter: 'blur(2px)' }}
        >
          {/* Close button */}
          <ActionIcon
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white'
            }}
            className="hover:bg-black/70"
            variant="filled"
            radius="xl"
            size="lg"
            onClick={() => setZoomedView(false)}
          >
            <FiX size={24} />
          </ActionIcon>

          {/* Zoomed image container */}
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh'
            }}
          >
            <Image
              src={media[selectedImage] || thumbnailUrl}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              alt={`${productName} - zoomed view`}
            />
          </div>

          {/* Navigation in zoomed view */}
          {media.length > 1 && (
            <div className="absolute top-1/2 w-full flex justify-between px-6" style={{ transform: 'translateY(-50%)' }}>
              <ActionIcon
                variant="filled"
                radius="xl"
                size="xl"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: 'white'
                }}
                className="hover:bg-black/50"
              >
                <FiChevronLeft size={24} />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                radius="xl"
                size="xl"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: 'white'
                }}
                className="hover:bg-black/50"
              >
                <FiChevronRight size={24} />
              </ActionIcon>
            </div>
          )}

          {/* Thumbnails in zoomed view */}
          {media.length > 1 && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{ bottom: '24px' }}
            >
              <ScrollArea className="w-auto">
                <Group className="bg-black/20 p-2 rounded-lg" gap="xs">
                  {media.map((imgUrl, idx) => (
                    <Box
                      key={`zoom-${idx}`}
                      className={`cursor-pointer overflow-hidden border-2 rounded-md transition-all ${selectedImage === idx ? 'border-white' : 'border-transparent hover:border-gray-400'
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(idx);
                      }}
                      style={{
                        width: '50px',
                        height: '50px',
                        opacity: selectedImage === idx ? 1 : 0.7
                      }}
                    >
                      <Image
                        src={imgUrl}
                        height={50}
                        width={50}
                        fit="cover"
                        className="object-cover w-[50px] h-[50px] rounded"
                        alt={`${productName} - thumbnail ${idx + 1}`}
                      />
                    </Box>
                  ))}
                </Group>
              </ScrollArea>
            </div>
          )}
        </div>, document.body
      )}
    </>
  );
};

export default ImageProduct;