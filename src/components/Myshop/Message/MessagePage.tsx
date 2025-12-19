import {
    Badge,
    Box,
    Group,
    Paper,
    Title
} from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

// Import components
import ContentMessage from './ContentMessage';
import ConversationList from './ConversationList';
import ModalInforCustomer from './ModalInforCustomer';

// Import mock data
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, QUICK_REPLIES } from '../../../data/mockData';
import type { Attachment, Conversation, Message } from '../../../types/MessageTypes';
import { getStatusColor } from '../../../untils/Untils';

const MessagePage = () => {
    const [activeTab, setActiveTab] = useState<string | null>('customers');
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [customerDrawerOpened, { open: openCustomerDrawer, close: closeCustomerDrawer }] = useDisclosure(false);
    const [quickRepliesOpened, { open: openQuickReplies, close: closeQuickReplies }] = useDisclosure(false);
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [loading, setLoading] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showConversationList, setShowConversationList] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { width } = useViewportSize();

    // Set mobile view based on viewport width
    useEffect(() => {
        setIsMobileView(width < 768);
        if (width >= 768) {
            setShowConversationList(true);
        }
    }, [width]);

    // Handle conversation selection
    const selectConversation = (conversation: Conversation) => {
        setLoading(true);

        // In mobile view, hide conversation list when selecting a conversation
        if (isMobileView) {
            setShowConversationList(false);
        }

        // Mark conversation as read
        const updatedConversations = conversations.map(conv => {
            if (conv.id === conversation.id) {
                return { ...conv, lastMessage: { ...conv.lastMessage, isRead: true }, unreadCount: 0 };
            }
            return conv;
        });

        setConversations(updatedConversations);
        setSelectedConversation(conversation);

        // Load messages for this conversation (in real app, this would be an API call)
        setTimeout(() => {
            setMessages(MOCK_MESSAGES[conversation.id] || []);
            setLoading(false);
            // Scroll to bottom of messages
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }, 300);
    };

    // Handle sending message
    const sendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;

        // Create new message
        const message: Message = {
            id: `new-${Date.now()}`,
            content: newMessage,
            timestamp: new Date(),
            isRead: true,
            isSent: true
        };

        // Update messages
        setMessages([...messages, message]);

        // Update conversation with last message
        const updatedConversations = conversations.map(conv => {
            if (conv.id === selectedConversation.id) {
                return {
                    ...conv,
                    lastMessage: {
                        content: newMessage,
                        timestamp: new Date(),
                        isRead: true
                    }
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        setNewMessage('');

        // Scroll to bottom of messages
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Insert quick reply
    const insertQuickReply = (reply: string) => {
        setNewMessage(reply);
        closeQuickReplies();
    };

    // Back to conversation list in mobile view
    const backToList = () => {
        setShowConversationList(true);
    };

    const sendMessageWithAttachments = (attachments: Attachment[]) => {
        if (!selectedConversation) return;

        // Tạo tin nhắn mới với đính kèm
        const message: Message = {
            id: `new-${Date.now()}`,
            content: newMessage.trim() || '', // Có thể có hoặc không có nội dung văn bản
            timestamp: new Date(),
            isRead: true,
            isSent: true,
            attachments: attachments // Thêm đính kèm vào tin nhắn
        };

        // Cập nhật danh sách tin nhắn
        setMessages([...messages, message]);

        // Cập nhật conversation với tin nhắn cuối cùng
        const updatedConversations = conversations.map(conv => {
            if (conv.id === selectedConversation.id) {
                return {
                    ...conv,
                    lastMessage: {
                        content: newMessage.trim() || 'Đã gửi đính kèm',
                        timestamp: new Date(),
                        isRead: true
                    }
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        setNewMessage(''); // Xóa tin nhắn

        // Cuộn xuống cuối
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <Box px="md" py="lg">
            <Paper shadow="md" radius="lg" h="calc(100vh - 120px)" className="overflow-hidden">
                <div className="flex flex-col h-full">
                    <Paper px="md" py={12} className="border-b border-gray-200" radius={0}>
                        <Group justify="space-between">
                            <Group gap="xs">
                                <Title order={4} className="text-primary">Tin nhắn</Title>
                            </Group>
                            <Badge size="md" variant="outline" color="blue">
                                {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)} chưa đọc
                            </Badge>
                        </Group>
                    </Paper>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Conversation List - Giảm chiều rộng từ 1/3 xuống còn 1/4 */}
                        {(showConversationList || !isMobileView) && (
                            <Box style={{ width: isMobileView ? '100%' : '25%' }} className="border-r">
                                <ConversationList
                                    conversations={conversations}
                                    activeTab={activeTab}
                                    searchTerm={searchTerm}
                                    selectedConversation={selectedConversation}
                                    onSelectConversation={selectConversation}
                                    onSetActiveTab={setActiveTab}
                                    onSearchChange={setSearchTerm}
                                    getStatusColor={getStatusColor}
                                />
                            </Box>
                        )}

                        {/* Message Content */}
                        {!showConversationList || !isMobileView ? (
                            <div className="flex-1 flex flex-col h-full">
                                <ContentMessage
                                    selectedConversation={selectedConversation}
                                    messages={messages}
                                    newMessage={newMessage}
                                    loading={loading}
                                    isMobileView={isMobileView}
                                    quickRepliesOpened={quickRepliesOpened}
                                    messagesEndRef={messagesEndRef}
                                    QUICK_REPLIES={QUICK_REPLIES}
                                    getStatusColor={getStatusColor}
                                    onBackToList={backToList}
                                    onSendMessage={sendMessage}
                                    onSetNewMessage={setNewMessage}
                                    onOpenCustomerDrawer={openCustomerDrawer}
                                    onOpenQuickReplies={openQuickReplies}
                                    onCloseQuickReplies={closeQuickReplies}
                                    insertQuickReply={insertQuickReply}
                                    onSendMessageWithAttachments={sendMessageWithAttachments}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </Paper>

            {/* Sử dụng component ModalInforCustomer thay vì định nghĩa Drawer trong này */}
            <ModalInforCustomer
                opened={customerDrawerOpened}
                onClose={closeCustomerDrawer}
                conversation={selectedConversation}
                getStatusColor={getStatusColor}
            />
        </Box>
    );
};

export default MessagePage;