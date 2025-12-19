import { ActionIcon, Badge, Box, Group, Image, Loader } from '@mantine/core';
import { FiChevronLeft, FiChevronRight, FiTrash2, FiVideo, FiXCircle } from 'react-icons/fi'; 
import type { MediaDto } from '../../../../../types/CommonType';


interface MediaPreviewItemProps {
  item: MediaDto;
  index: number;
  mediaLength: number;
  onRemove: (index: number) => void;
  onReorder: (index: number, direction: 'up' | 'down') => void;
  isMainImage: boolean;
}

const MediaPreviewItem = ({
  item,
  index,
  mediaLength,
  onRemove,
  onReorder,
  isMainImage,
}: MediaPreviewItemProps) => {
  const displayUrl = item.type === 'VIDEO' ? (item.thumbnailUrl || item.url) : item.url;
  const isFailed = item.isUploaded === false && !item.isUploading;

  return (
    <Box
      key={item.url}
      pos="relative"
      className="border border-gray-200 rounded-md overflow-hidden flex-shrink-0 bg-white group"
      w={80}
      h={80}
    >
      {isMainImage && item.type === 'IMAGE' && (
        <Badge className="absolute top-1 left-1 z-[8]" color="blue" size="xs">
          Chính
        </Badge>
      )}

      {item.type === 'VIDEO' && (
        <Badge className="absolute top-1 left-1 z-[8]" color="red" size="xs">
          Video
        </Badge>
      )}

      {item.isUploading && (
        <Box
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          className="flex items-center justify-center bg-black bg-opacity-50 z-[8]"
        >
          <Loader color="white" size="sm" />
        </Box>
      )}

      {isFailed && (
        <Box
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          className="flex items-center justify-center bg-black bg-opacity-60 z-[8]"
          title='Tải lên không thành công'
        >
          <FiXCircle size={30} className="text-red-500" />
        </Box>
      )}

      {item.type === 'IMAGE' || (item.type === 'VIDEO' && (item.thumbnailUrl || item.url.startsWith('blob:'))) ? (
        <Image 
          src={displayUrl} 
          alt={`Sản phẩm ${index + 1}`} 
          height={80} 
          width={80} 
          fit="cover" 
          className={isFailed ? "opacity-50" : ""} 
        />
      ) : (
        <div className="relative h-[80px] w-[80px] bg-gray-100 flex items-center justify-center">
          <FiVideo size={20} className="text-gray-500" />
        </div>
      )}

      <div className="absolute top-0 right-0 p-1">
        <Group gap={4}>
          {item.type === 'IMAGE' && !isFailed && (
            <>
              <ActionIcon
                size="xs"
                variant="filled"
                color="gray"
                onClick={() => onReorder(index, 'up')}
                disabled={index === 0 || item.isUploading || isFailed}
                className="bg-black !bg-opacity-50 hover:bg-opacity-70 opacity-0 group-hover:opacity-100"
              >
                <FiChevronLeft size={12} />
              </ActionIcon>

              <ActionIcon
                size="xs"
                variant="filled"
                color="gray"
                onClick={() => onReorder(index, 'down')}
                disabled={index === mediaLength - 1 || item.isUploading || isFailed}
                className="bg-black !bg-opacity-50 hover:bg-opacity-70 opacity-0 group-hover:opacity-100"
              >
                <FiChevronRight size={12} />
              </ActionIcon>
            </>
          )}

          <ActionIcon
            size="xs"
            variant="filled"
            color="red"
            onClick={() => onRemove(index)}
            disabled={item.isUploading}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 z-30 opacity-0 group-hover:opacity-100"
          >
            <FiTrash2 size={12} />
          </ActionIcon>
        </Group>
      </div>
    </Box>
  );
};

export default MediaPreviewItem;