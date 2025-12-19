import {
    Avatar,
    Badge,
    Group,
    Indicator,
    Paper,
    ScrollArea,
    Tabs,
    Text,
    TextInput,
    UnstyledButton
} from '@mantine/core';
import {
    FiHeadphones,
    FiMessageSquare,
    FiSearch,
    FiUsers
} from 'react-icons/fi';
import type { Conversation } from '../../../types/MessageTypes';
import { formatMessageTime } from '../../../untils/Untils';

interface ConversationListProps {
  conversations: Conversation[];
  activeTab: string | null;
  searchTerm: string;
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onSetActiveTab: (tab: string | null) => void;
  onSearchChange: (term: string) => void;
  getStatusColor: (status: string) => string;
}

const ConversationList = ({
  conversations,
  activeTab,
  searchTerm,
  selectedConversation,
  onSelectConversation,
  onSetActiveTab,
  onSearchChange,
  getStatusColor
}: ConversationListProps) => {
  
  // Filter conversations based on active tab and search term
  const filteredConversations = conversations.filter(conv => {
    // Apply tab filter based on conversation type
    if (activeTab === 'customers' && conv.type !== 'customer') return false;
    if (activeTab === 'support' && conv.type !== 'support') return false;
    if (activeTab === 'chatbox' && conv.type !== 'chatbox') return false;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const nameMatch = conv.customer.name.toLowerCase().includes(term);
      const messageMatch = conv.lastMessage.content.toLowerCase().includes(term);
      const phoneMatch = conv.customer.phone?.toLowerCase().includes(term);
      const emailMatch = conv.customer.email?.toLowerCase().includes(term);
      
      if (!(nameMatch || messageMatch || phoneMatch || emailMatch)) {
        return false;
      }
    }
    
    return true;
  });

  // Count messages by type
  const countByType = {
    customers: conversations.filter(c => c.type === 'customer').reduce((acc, c) => acc + c.unreadCount, 0),
    support: conversations.filter(c => c.type === 'support').reduce((acc, c) => acc + c.unreadCount, 0),
    chatbox: conversations.filter(c => c.type === 'chatbox').reduce((acc, c) => acc + c.unreadCount, 0),
  };

  return (
    <div className="flex-none w-full  border-r flex flex-col h-full">
      <Paper px="md" py="xs" className="border-b" radius={0}>
        <TextInput
          placeholder="Tìm kiếm tin nhắn..."
          leftSection={<FiSearch size={16} />}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
        />
      </Paper>
      
      <Tabs value={activeTab} onChange={onSetActiveTab} className="border-b flex flex-nowrap">
        <Tabs.List grow>
          <Tabs.Tab 
            value="customers" 
            leftSection={<FiUsers size={16} />}
            rightSection={
              countByType.customers > 0 ? 
              <Badge size="sm" variant="filled" color="red" className="-mr-1">
                {countByType.customers}
              </Badge> : null
            }
          >
            Khách hàng
          </Tabs.Tab>
          <Tabs.Tab 
            value="support" 
            leftSection={<FiHeadphones size={16} />}
            rightSection={
              countByType.support > 0 ? 
              <Badge size="sm" variant="filled" color="red" className="-mr-1">
                {countByType.support}
              </Badge> : null
            }
          >
            Hỗ trợ
          </Tabs.Tab>
          <Tabs.Tab 
            value="chatbox" 
            leftSection={<FiMessageSquare size={16} />}
            rightSection={
              countByType.chatbox > 0 ? 
              <Badge size="sm" variant="filled" color="red" className="-mr-1">
                {countByType.chatbox}
              </Badge> : null
            }
          >
            Chat box
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      
      <ScrollArea className="flex-1 mt-4">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <FiMessageSquare size={48} className="text-gray-300 mb-2" />
            <Text size="sm" c="dimmed">Không có tin nhắn</Text>
            <Text size="xs" c="dimmed" mt={5}>
              {activeTab === 'customers' ? 'Không có tin nhắn từ khách hàng' : 
               activeTab === 'support' ? 'Không có yêu cầu hỗ trợ' :
               activeTab === 'chatbox' ? 'Không có tin nhắn trên chat box' : 
               'Không tìm thấy tin nhắn phù hợp'}
            </Text>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <UnstyledButton
              key={conversation.id}
              className={`w-full p-3 hover:bg-gray-100 transition-colors border-b ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <Group justify="space-between" wrap="nowrap">
                <Group wrap="nowrap" style={{ overflow: 'hidden', flex: 1 }}>
                  <Indicator 
                    position="bottom-end" 
                    color="green" 
                    offset={7}
                    disabled={!conversation.customer.avatar}
                    processing
                    size={16}
                  >
                    <Avatar 
                      src={conversation.customer.avatar} 
                      radius="xl" 
                      size="md"
                      color={conversation.type === 'customer' ? 'blue' : 
                            conversation.type === 'support' ? 'green' : 'purple'}
                    >
                      {conversation.customer.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Indicator>
                  
                  <div style={{ overflow: 'hidden', flex: 1 }}>
                    <Group justify="space-between" wrap="nowrap">
                      <Text fw={600} lineClamp={1} size="sm" className="flex-1">
                        {conversation.customer.name}
                      </Text>
                      <Text size="xs" c="dimmed" fw={conversation.unreadCount > 0 ? 600 : 400}>
                        {formatMessageTime(conversation.lastMessage.timestamp)}
                      </Text>
                    </Group>
                    
                    <Group justify="space-between" wrap="nowrap" mt={4}>
                      <Text 
                        size="sm" 
                        c={conversation.unreadCount > 0 ? "dark" : "dimmed"}
                        fw={conversation.unreadCount > 0 ? 600 : 400}
                        lineClamp={1}
                      >
                        {conversation.lastMessage.content}
                      </Text>
                      <Group gap="xs">
                        {conversation.unreadCount > 0 && (
                          <Badge size="sm" color="red" variant="filled">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </Group>
                    </Group>
                    
                    <Group mt={4} gap="xs">
                      {conversation.orderInfo && (
                        <Badge 
                          size="sm" 
                          variant="outline" 
                          color={getStatusColor(conversation.orderInfo.status)}
                        >
                          {conversation.orderInfo.orderNumber}
                        </Badge>
                      )}
                      
                      {conversation.type === 'support' && (
                        <Badge size="sm" variant="light" color="green">
                          Hỗ trợ
                        </Badge>
                      )}
                      
                      {conversation.type === 'chatbox' && (
                        <Badge size="sm" variant="light" color="purple">
                          Chat box
                        </Badge>
                      )}
                    </Group>
                  </div>
                </Group>
              </Group>
            </UnstyledButton>
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default ConversationList;