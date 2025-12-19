import {
    ActionIcon,
    Button,
    Group,
    Image,
    Paper,
    Progress,
    ScrollArea,
    Text,
    Tooltip
} from '@mantine/core';
import React from 'react';
import {
    FiUploadCloud,
    FiVideo,
    FiX
} from 'react-icons/fi';

interface FileReviewProps {
    attachments: (File & { preview?: string; type: string })[];
    isUploading: boolean;
    isSelectingFiles: boolean;
    uploadProgress: number;
    openPreview: (url: string, type: 'image' | 'video') => void;
    removeAttachment: (index: number) => void;
    clearAllAttachments: () => void;
    sendMessageWithAttachments: () => void;
}

const FileReview: React.FC<FileReviewProps> = ({
    attachments,
    isUploading,
    isSelectingFiles,
    uploadProgress,
    openPreview,
    removeAttachment,
    clearAllAttachments,
    sendMessageWithAttachments
}) => {
    if (attachments.length === 0) return null;

    return (
        <Paper p="xs" className="border-t border-b bg-gray-50">
            <Group gap="sm" align="center" mb={8}>
                <Text size="sm" fw={500}>Đính kèm ({attachments.length})</Text>
                {isUploading && (
                    <Progress
                        value={uploadProgress}
                        size="xs"
                        radius="xl"
                        className="flex-1"
                    />
                )}
                {!isUploading && (
                    <Group gap="xs">
                        <Button
                            variant="light"
                            size="xs"
                            color="blue"
                            leftSection={<FiUploadCloud size={14} />}
                            onClick={sendMessageWithAttachments}
                            loading={isSelectingFiles}
                        >
                            Gửi đính kèm
                        </Button>
                        <Button
                            variant="subtle"
                            size="xs"
                            color="red"
                            onClick={clearAllAttachments}
                        >
                            Xóa tất cả
                        </Button>
                    </Group>
                )}
            </Group>
            <ScrollArea
                style={{ width: '100%' }}
                offsetScrollbars
                type="auto"
            >
                <Group gap="xs" wrap="nowrap">
                    {attachments.map((file, index) => (
                        <Paper
                            key={`attachment-${index}-${file.name}`}
                            withBorder
                            p={4}
                            className="relative"
                            style={{ width: 100, height: 100, overflow: 'hidden', cursor: 'pointer' }}
                        >
                            {file.type === 'image' && (
                                <div className="!w-full !h-full relative overflow-hidden">
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        fit="cover"
                                        className='w-full h-full object-cover'
                                        radius="sm"
                                        onClick={() => openPreview(file.preview as string, 'image')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            )}

                            {file.type === 'video' && (
                                <div
                                    className="relative flex items-center justify-center bg-gray-800"
                                    onClick={() => openPreview(file.preview as string, 'video')}
                                    style={{
                                        cursor: 'pointer',
                                        height: '80px',
                                        width: '90px',
                                        borderRadius: '0.25rem',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <FiVideo size={32} color="#fff" />
                                    <video
                                        src={file.preview}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            position: 'absolute',
                                            opacity: 0.6
                                        }}
                                    />
                                </div>
                            )}

                            <Tooltip label="Xóa">
                                <ActionIcon
                                    size="xs"
                                    radius="xl"
                                    color="red"
                                    className="!absolute !top-1 !right-1 bg-white bg-opacity-70"
                                    onClick={() => removeAttachment(index)}
                                >
                                    <FiX size={10} />
                                </ActionIcon>
                            </Tooltip>
                        </Paper>
                    ))}
                </Group>
            </ScrollArea>
        </Paper>
    );
};

export default FileReview;