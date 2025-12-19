import { Avatar, Badge, Image, Loader, Paper, ScrollArea, Text } from '@mantine/core';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import { FiPaperclip, FiVideo } from 'react-icons/fi';
import type { Attachment, Conversation, Message } from '../../../types/MessageTypes';

interface MessageViewProps {
    messages: Message[];
    selectedConversation: Conversation;
    loading: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    openPreview: (url: string, type: 'image' | 'video') => void;
}

const MessageView: React.FC<MessageViewProps> = ({
    messages,
    selectedConversation,
    loading,
    messagesEndRef,
    openPreview,
}) => {
    return (
        <ScrollArea className="flex-1 p-4 bg-gray-50">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader size="md" />
                </div>
            ) : (
                <>
                    {messages.map((message, index) => {
                        // Kiểm tra xem tin nhắn có phải đầu tiên của ngày không
                        const showDateHeader = index === 0 ||
                            new Date(message.timestamp).toDateString() !==
                            new Date(messages[index - 1].timestamp).toDateString();

                        return (
                            <div key={message.id}>
                                {showDateHeader && (
                                    <div className="flex justify-center my-4">
                                        <Badge variant="outline">
                                            {format(new Date(message.timestamp), 'EEEE, dd/MM/yyyy', { locale: vi })}
                                        </Badge>
                                    </div>
                                )}

                                <div className={`flex mb-4 ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                                    {!message.isSent && (
                                        <Avatar
                                            src={selectedConversation.customer.avatar}
                                            radius="xl"
                                            size="sm"
                                            mr="xs"
                                            mt="xs"
                                            color={selectedConversation.type === 'customer' ? 'blue' :
                                                selectedConversation.type === 'support' ? 'green' : 'purple'}
                                        >
                                            {selectedConversation.customer.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                    )}

                                    <div className="max-w-[80%]">
                                        <div className={`px-3 py-2 rounded-lg ${
                                            message.isSent ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'
                                        }`}>
                                            {message.content && (
                                                <Text size="sm">
                                                    {message.content}
                                                </Text>
                                            )}

                                            {message.attachments && message.attachments.length > 0 && (
                                                <div className="mt-2 space-y-2">
                                                    {message.attachments.map((attachment: Attachment) => (
                                                        <div key={attachment.id} className="mt-1">
                                                            {attachment.type === 'image' ? (
                                                                <div
                                                                    className="rounded overflow-hidden cursor-pointer"
                                                                    onClick={() => openPreview(attachment.url, 'image')}
                                                                >
                                                                    <Image
                                                                        src={attachment.url}
                                                                        alt={attachment.name}
                                                                        radius="sm"
                                                                    />
                                                                </div>
                                                            ) : attachment.type === 'video' ? (
                                                                <div
                                                                    className="rounded overflow-hidden cursor-pointer"
                                                                    onClick={() => openPreview(attachment.url, 'video')}
                                                                >
                                                                    <div className="relative">
                                                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                                                            <FiVideo size={32} color="#fff" />
                                                                        </div>
                                                                        <video
                                                                            src={attachment.url}
                                                                            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Paper p="xs" className="flex items-center">
                                                                    <FiPaperclip size={16} className="mr-2" />
                                                                    <Text size="xs">{attachment.name}</Text>
                                                                </Paper>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Text size="xs" c="dimmed" mt={4} ta={message.isSent ? "right" : "left"}>
                                            {format(new Date(message.timestamp), 'HH:mm', { locale: vi })}
                                        </Text>
                                    </div>

                                    {message.isSent && (
                                        <Avatar
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=30"
                                            radius="xl"
                                            size="sm"
                                            ml="xs"
                                            mt="xs"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </>
            )}
        </ScrollArea>
    );
};

export default MessageView;