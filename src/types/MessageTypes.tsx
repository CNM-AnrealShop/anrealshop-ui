export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isSent: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'document'; 
  url: string;
  name: string;
  size?: number;
}
export interface Conversation {
  id: string;
  type: 'customer' | 'support' | 'chatbox'; // Thêm trường này
  customer: {
    id: string;
    name: string;
    avatar?: string;
    phone?: string;
    email?: string;
    location?: string;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  unreadCount: number;
  isStarred: boolean;
  isArchived: boolean;
  orderInfo?: {
    id: string;
    orderNumber: string;
    status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
    items: Array<{
      id: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }>;
  };
}
