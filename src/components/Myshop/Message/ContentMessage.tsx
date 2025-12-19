import {
    ActionIcon,
    FileButton,
    Group,
    Menu,
    Paper,
    Text,
    Textarea,
    Tooltip
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
    FiChevronDown,
    FiImage,
    FiMessageSquare,
    FiSend,
    FiSmile,
    FiVideo
} from 'react-icons/fi';
import type { Attachment, Conversation, Message } from '../../../types/MessageTypes';
import FileReview from './FileReview';
import MessageHeader from './MessageHeader';
import MessageView from './MessageView';
import ModalReview from './ModalReview';

interface ContentMessageProps {
    selectedConversation: Conversation | null;
    messages: Message[];
    newMessage: string;
    loading: boolean;
    isMobileView: boolean;
    quickRepliesOpened: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    QUICK_REPLIES: string[];
    getStatusColor: (status: string) => string;
    onBackToList: () => void;
    onSendMessage: () => void;
    onSendMessageWithAttachments: (attachments: Attachment[]) => void;
    onSetNewMessage: (message: string) => void;
    onOpenCustomerDrawer: () => void;
    onOpenQuickReplies: () => void;
    onCloseQuickReplies: () => void;
    insertQuickReply: (reply: string) => void;
}

const ContentMessage: React.FC<ContentMessageProps> = ({
    selectedConversation,
    messages,
    newMessage,
    loading,
    isMobileView,
    quickRepliesOpened,
    messagesEndRef,
    QUICK_REPLIES,
    getStatusColor,
    onBackToList,
    onSendMessage,
    onSendMessageWithAttachments,
    onSetNewMessage,
    onOpenCustomerDrawer,
    onOpenQuickReplies,
    onCloseQuickReplies,
    insertQuickReply
}) => {
    // State để quản lý file đính kèm
    const [attachments, setAttachments] = useState<(File & { preview?: string; type: string })[]>([]);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const [previewType, setPreviewType] = useState<'image' | 'video'>('image');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSelectingFiles, setIsSelectingFiles] = useState(false);

    // Cleanup khi component unmount
    useEffect(() => {
        return () => {
            // Giải phóng URL objects khi component unmount
            attachments.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, []);

    // Xử lý khi chọn ảnh
    const handleImageSelect = async (files: File[]) => {
        if (!files || files.length === 0) return;

        setIsSelectingFiles(true);

        try {
            // Xử lý từng file một và cập nhật state sau mỗi file
            const newAttachments: any = [];

            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    const preview = URL.createObjectURL(file);

                    newAttachments.push({
                        ...file,
                        preview,
                        type: 'image'
                    });
                }
            }

            if (newAttachments.length > 0) {
                // Cập nhật state với tất cả file mới
                setAttachments(prev => [...prev, ...newAttachments]);

                // Đã loại bỏ phần tự động mở modal preview
            }
        } catch (error) {
            console.error('Lỗi khi xử lý file ảnh:', error);
        } finally {
            setIsSelectingFiles(false);
        }
    };

    // Xử lý khi chọn video
    const handleVideoSelect = async (files: File[]) => {
        if (!files || files.length === 0) return;

        setIsSelectingFiles(true);

        try {
            // Xử lý từng file một và cập nhật state sau mỗi file
            const newAttachments: any = [];

            for (const file of files) {
                if (file.type.startsWith('video/')) {
                    const preview = URL.createObjectURL(file);

                    newAttachments.push({
                        ...file,
                        preview,
                        type: 'video'
                    });
                }
            }

            if (newAttachments.length > 0) {
                // Cập nhật state với tất cả file mới
                setAttachments(prev => [...prev, ...newAttachments]);

                // Đã loại bỏ phần tự động mở modal preview
            }
        } catch (error) {
            console.error('Lỗi khi xử lý file video:', error);
        } finally {
            setIsSelectingFiles(false);
        }
    };

    // Xóa file đính kèm
    const removeAttachment = (index: number) => {
        setAttachments(prevAttachments => {
            const newAttachments = [...prevAttachments];

            // Giải phóng URL đối tượng để tránh rò rỉ bộ nhớ
            if (newAttachments[index].preview) {
                URL.revokeObjectURL(newAttachments[index].preview as string);
            }

            newAttachments.splice(index, 1);
            return newAttachments;
        });
    };

    // Xóa tất cả file đính kèm
    const clearAllAttachments = () => {
        // Giải phóng tất cả URL object
        attachments.forEach(file => {
            if (file.preview) {
                URL.revokeObjectURL(file.preview);
            }
        });
        setAttachments([]);
    };

    // Xem trước ảnh/video
    const openPreview = (url: string, type: 'image' | 'video') => {
        console.log('Mở preview:', url, type);
        setPreviewUrl(url);
        setPreviewType(type);
        setIsPreviewModalOpen(true);
    };

    // Đóng xem trước
    const closePreview = () => {
        setIsPreviewModalOpen(false);
    };

    // Gửi tin nhắn với đính kèm
    const sendMessageWithAttachments = async () => {
        if (attachments.length === 0 && !newMessage.trim()) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Mô phỏng tải lên với tiến trình
            for (let i = 1; i <= 5; i++) {
                await new Promise(resolve => setTimeout(resolve, 300));
                setUploadProgress(i * 20);
            }

            // Chuyển đổi attachments thành định dạng API mong đợi
            const attachmentData: Attachment[] = attachments.map((file, index) => ({
                id: `new-${Date.now()}-${index}`,
                type: file.type === 'image' ? 'image' : 'video',
                url: file.preview || '',
                name: file.name,
                size: file.size
            }));

            // Gọi hàm gửi tin nhắn với đính kèm
            onSendMessageWithAttachments(attachmentData);

            // Giải phóng URL đối tượng để tránh rò rỉ bộ nhớ
            attachments.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });

            // Reset các trạng thái
            setAttachments([]);
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Nếu không có cuộc hội thoại nào được chọn
    if (!selectedConversation) {
        // Giữ nguyên phần này
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                {isMobileView && (
                    <ActionIcon variant="subtle" onClick={onBackToList} mb="lg">
                        <FiChevronDown size={20} className="rotate-90" />
                    </ActionIcon>
                )}
                <FiMessageSquare size={64} className="text-gray-200 mb-4" />
                <Text size="lg" fw={600} c="dimmed">Chọn một cuộc trò chuyện</Text>
                <Text size="sm" c="dimmed" maw={400} mt="xs">
                    Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu chat với khách hàng của bạn.
                </Text>
            </div>
        );
    }

    console.log("Current attachments:", attachments);

    return (
        <>
            {/* Conversation Header */}
            <MessageHeader
                selectedConversation={selectedConversation}
                isMobileView={isMobileView}
                getStatusColor={getStatusColor}
                onBackToList={onBackToList}
                onOpenCustomerDrawer={onOpenCustomerDrawer}
            />

            {/* Messages */}
            <MessageView
                messages={messages}
                selectedConversation={selectedConversation}
                loading={loading}
                messagesEndRef={messagesEndRef}
                openPreview={openPreview}
            />
            <FileReview
                attachments={attachments}
                isUploading={isUploading}
                isSelectingFiles={isSelectingFiles}
                uploadProgress={uploadProgress}
                openPreview={openPreview}
                removeAttachment={removeAttachment}
                clearAllAttachments={clearAllAttachments}
                sendMessageWithAttachments={sendMessageWithAttachments}
            />

            {/* Message Input */}
            <Paper p="xs" className="border-t">
                <Group gap="xs" align="flex-end">
                    <Menu
                        opened={quickRepliesOpened}
                        onClose={onCloseQuickReplies}
                        position="top-start"
                        offset={{ mainAxis: 5, crossAxis: 0 }}
                        width={300}
                    >
                        <Menu.Target>
                            <ActionIcon variant="default" title="Tin nhắn mẫu" onClick={onOpenQuickReplies}>
                                <FiMessageSquare size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Tin nhắn mẫu</Menu.Label>
                            {QUICK_REPLIES.map((reply, index) => (
                                <Menu.Item
                                    key={index}
                                    onClick={() => insertQuickReply(reply)}
                                >
                                    <Text size="sm" lineClamp={1}>{reply}</Text>
                                </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                    </Menu>

                    {/* Image Upload Button - Sửa lại */}
                    <FileButton
                        onChange={handleImageSelect}
                        accept="image/*"
                        multiple
                        disabled={isUploading}
                    >
                        {(props) => (
                            <Tooltip label="Gửi hình ảnh">
                                <ActionIcon
                                    variant="default"
                                    disabled={isUploading || isSelectingFiles}
                                    loading={isSelectingFiles}
                                    {...props}
                                >
                                    <FiImage size={16} />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </FileButton>

                    {/* Video Upload Button - Sửa lại */}
                    <FileButton
                        onChange={handleVideoSelect}
                        accept="video/*"
                        multiple
                        disabled={isUploading}
                    >
                        {(props) => (
                            <Tooltip label="Gửi video">
                                <ActionIcon
                                    variant="default"
                                    disabled={isUploading || isSelectingFiles}
                                    loading={isSelectingFiles}
                                    {...props}
                                >
                                    <FiVideo size={16} />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </FileButton>

                    <Tooltip label="Thêm emoji">
                        <ActionIcon variant="default">
                            <FiSmile size={16} />
                        </ActionIcon>
                    </Tooltip>

                    <Textarea
                        placeholder="Nhập tin nhắn của bạn..."
                        minRows={1}
                        maxRows={4}
                        autosize
                        value={newMessage}
                        onChange={(e) => onSetNewMessage(e.currentTarget.value)}
                        className="flex-1"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (attachments.length > 0) {
                                    sendMessageWithAttachments();
                                } else if (newMessage.trim()) {
                                    onSendMessage();
                                }
                            }
                        }}
                        disabled={isUploading}
                    />

                    <Tooltip label={isUploading ? "Đang tải lên..." : "Gửi tin nhắn"}>
                        <ActionIcon
                            variant="filled"
                            color="blue"
                            disabled={(!newMessage.trim() && attachments.length === 0) || isUploading}
                            onClick={attachments.length > 0 ? sendMessageWithAttachments : onSendMessage}
                            loading={isUploading}
                        >
                            <FiSend size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Paper>

            {/* Modal Xem trước */}
            <ModalReview
                opened={isPreviewModalOpen}
                onClose={closePreview}
                url={previewUrl}
                type={previewType}
            />
        </>
    );
};

export default ContentMessage;