import {
  ActionIcon,
  FileInput,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { memo, useRef, useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiVideo,
} from 'react-icons/fi';
import { useMediaUpload } from '../../../../../hooks/useMediaUpload';
import type { MediaDto } from '../../../../../types/CommonType';
import showErrorNotification from '../../../../Toast/NotificationError';
import AddMediaButton from './AddMediaButton';
import MediaPreviewItem from './MediaReviewItem';


interface MediaUploadProps {
  media: MediaDto[]; 
  setMedia: (value: MediaDto[] | ((prev: MediaDto[]) => MediaDto[])) => void;
  error?: string;
}


const MediaUpload = memo(({ media, setMedia, error }: MediaUploadProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const imageInputRef = useRef<HTMLButtonElement>(null);
  const videoInputRef = useRef<HTMLButtonElement>(null);

  const { uploadImages, uploadVideo, removeMedia, reorderMedia } = useMediaUpload(
    setMedia 
  );
  const toggleSection = () => {
    setCollapsed((prev) => !prev);
  };

  const hasVideo = media.some((item) => item.type === 'VIDEO');

  const handleImageUpload = async (files: File[] | null) => {
    if (!files || files.length === 0)
      return;
    const existingImagesCount = media.filter(m => m.type === 'IMAGE').length;
    const filesArray: File[] = files;
    const MAX_IMAGES = 10;
    const availableSlots = MAX_IMAGES - existingImagesCount;
    if (availableSlots <= 0) {
      showErrorNotification('Nhắc nhẹ', 'Bạn đã đạt giới hạn tối đa 10 hình ảnh.');
      return;
    }
    if (availableSlots < filesArray.length) {
      showErrorNotification('Nhắc nhẹ', `Bạn chỉ có thể thêm ${availableSlots} hình ảnh.`);
    }
    const filesForProcessing = filesArray.slice(0, availableSlots);
    try {
      await uploadImages(filesForProcessing);
    } catch (error) {
      showErrorNotification('Lỗi tải lên', 'Có lỗi xảy ra khi tải lên hình ảnh. Vui lòng thử lại.');
    }
  }

  const handleVideoUpload = async (file: File | null) => {
    if (!file) return;
    if (hasVideo) {
      showErrorNotification('Nhắc nhẹ', 'Bạn chỉ có thể thêm một video.');
      return;
    }
    try {
      await uploadVideo(file);
    } catch (error) {
      showErrorNotification('Lỗi tải lên', 'Có lỗi xảy ra khi tải lên video. Vui lòng thử lại.');
    }
  }


  return (
    <Paper shadow="xs" p="md" mb="md" className="bg-white">
      <Group justify="space-between" mb={collapsed ? 0 : 'md'}>
        <Title order={5}>Hình ảnh và video</Title>
        <ActionIcon variant="subtle" onClick={toggleSection}>
          {collapsed ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
        </ActionIcon>
      </Group>

      {!collapsed && (
        <Stack>
          <Text size="sm" c="dimmed">
            Thêm tối đa 10 hình ảnh và 1 video. Hình đầu tiên sẽ là hình ảnh chính của sản phẩm.
          </Text>

          <FileInput
            ref={imageInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif"
            style={{ display: 'none' }}
          />
          <FileInput
            ref={videoInputRef}
            onChange={handleVideoUpload}
            accept="video/mp4,video/webm"
            style={{ display: 'none' }}
          />

          <div className="border rounded-md p-3 bg-gray-50 mb-2">
            <Text size="sm" fw={500} mb="xs">
              Xem trước
            </Text>

            <div className="flex overflow-x-auto pb-2 gap-2" style={{ scrollbarWidth: 'thin' }}>
              {media.map((item, index) => (
                <MediaPreviewItem
                  key={item.url}
                  item={item}
                  index={index}
                  mediaLength={media.length}
                  onRemove={removeMedia}
                  onReorder={reorderMedia}
                  isMainImage={index === 0}
                />
              ))}

              {media.filter((m) => m.type === 'IMAGE').length < 10 && (
                <AddMediaButton
                  label="Thêm ảnh"
                  icon={FiPlus}
                  onClick={() => imageInputRef.current?.click()}
                />
              )}

              {!hasVideo && (
                <AddMediaButton
                  label="Thêm video"
                  icon={FiVideo}
                  onClick={() => videoInputRef.current?.click()}
                />
              )}
            </div>
          </div>
          {error && <Text size="xs" c="red" mt={4}>{error}</Text>}

          <Text size="xs" c="dimmed" mt="xs">
            <b>Lưu ý:</b> Hình ảnh nên có tỉ lệ 1:1, kích thước tối thiểu 500x500 pixels và không quá 5MB.
            Video nên có độ dài dưới 30 giây và không quá 50MB.
          </Text>
        </Stack>
      )}
    </Paper>
  );
});

export default MediaUpload;