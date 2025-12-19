import { useCallback } from 'react';
import { uploadToCloudinary } from '../service/Cloundinary';
import type { MediaDto } from '../types/CommonType';

export function useMediaUpload(
  setFormMedia: (value: MediaDto[] | ((prev: MediaDto[]) => MediaDto[])) => void
) {
  const uploadImages = useCallback(async (files: File[] | null) => {
    if (!files || files.length === 0) return;
    const newMediaItems: MediaDto[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      thumbnailUrl: '',
      type: 'IMAGE' as const,
      isUploading: true,
      isUploaded: undefined
    }));

    setFormMedia((prev) => [...prev, ...newMediaItems]);
    let hasUploadErrors = false;
    const uploadPromises = newMediaItems.map(async (item) => {
      if (item.file) {
        try {
          const { secure_url, public_id } = await uploadToCloudinary(item.file, 'image');
          setFormMedia((prev) =>
            prev.map((m) => {
              if (m.url === item.url) {
                URL.revokeObjectURL(item.url);
                return { ...m, url: secure_url, thumbnailUrl: secure_url, id: public_id, isUploading: false, isUploaded: true, file: undefined };
              }
              return m;
            })
          );
        } catch (error) {
          hasUploadErrors = true;
          setFormMedia((prev) =>
            prev.map((m) =>
              m.url === item.url
                ? {
                  ...m,
                  isUploading: false,
                  isUploaded: false,
                }
                : m
            )
          );
        }
      }
    });

    await Promise.allSettled(uploadPromises);
    if (hasUploadErrors) {
      throw new Error('Có ảnh tải lên không thành công. Vui lòng thử lại.');
    }
  }, [setFormMedia]);

  const uploadVideo = useCallback(async (file: File | null) => {
    if (!file) return;
    const tempVideoUrl = "https://www.certificate.digital/images/theme/resize/cropping.webp";
    const videoItem: MediaDto = {
      file,
      url: tempVideoUrl,
      thumbnailUrl: '',
      type: 'VIDEO',
      isUploading: true,
      isUploaded: undefined,
    };

    setFormMedia((prev) => {
      const idx = prev.findIndex((m) => m.type === 'VIDEO');
      if (idx !== -1) {
        if (prev[idx].url.startsWith('blob:')) URL.revokeObjectURL(prev[idx].url);
        const updated = [...prev];
        updated[idx] = videoItem;
        return updated;
      }
      return [...prev, videoItem];
    });

    try {
      const { secure_url, public_id } = await uploadToCloudinary(file, 'video');
      const thumbnailUrl = secure_url.replace(/\.(mp4|webm|mov)$/, '.jpg');

      setFormMedia((prev) =>
        prev.map((m) =>
          m.url === tempVideoUrl
            ? { ...m, url: secure_url, thumbnailUrl, id: public_id, isUploading: false, isUploaded: true, file: undefined }
            : m
        )
      );
      URL.revokeObjectURL(tempVideoUrl);
    } catch (error) {
      setFormMedia((prev) =>
        prev.map((m) =>
          m.url === tempVideoUrl
            ? {
              ...m,
              isUploading: false,
              isUploaded: false,
            }
            : m
        )
      );
      URL.revokeObjectURL(tempVideoUrl);
      throw new Error('Tải lên video không thành công. Vui lòng thử lại.');
    }
  }, [setFormMedia]);

  const removeMedia = useCallback((index: number) => {
    setFormMedia((prev) => {
      const updated = [...prev];
      if (updated[index].url.startsWith('blob:')) URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  }, [setFormMedia]);

  const reorderMedia = useCallback((index: number, direction: 'up' | 'down') => {
    setFormMedia((prev) => {
      const updated = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updated.length) return prev;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }, [setFormMedia]);

  return { uploadImages, uploadVideo, removeMedia, reorderMedia };
}