import type { Conversation, Message } from "../types/MessageTypes";


// Quick Reply Template
export const QUICK_REPLIES = [
  'Chào bạn, cảm ơn bạn đã nhắn tin cho shop!',
  'Hiện sản phẩm này vẫn còn hàng ạ',
  'Đơn hàng của bạn đang được xử lý và sẽ được giao trong 1-3 ngày tới',
  'Sản phẩm này có các size: S, M, L, XL và các màu: đen, trắng, xanh navy',
  'Bạn có thể đổi/trả hàng trong vòng 7 ngày nếu sản phẩm còn nguyên tem mác',
  'Shop nhận ship COD toàn quốc và freeship với đơn hàng từ 500.000đ',
  'Cảm ơn bạn đã mua hàng, mong bạn hài lòng với sản phẩm!'
];

// Mock Data
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    type: 'customer',
    customer: {
      id: 'cust1',
      name: 'Nguyễn Văn A',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50',
      phone: '0901234567',
      email: 'nguyenvana@example.com',
      location: 'TP. Hồ Chí Minh',
    },
    lastMessage: {
      content: 'Sản phẩm này còn hàng size L màu đen không shop?',
      timestamp: new Date(2023, 11, 10, 14, 35),
      isRead: false,
    },
    unreadCount: 3,
    isStarred: true,
    isArchived: false,
    orderInfo: {
      id: 'ord1',
      orderNumber: 'ORD-23065',
      status: 'shipping',
      items: [
        {
          id: 'item1',
          name: 'Áo thun nam cổ tròn basic',
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=50',
          price: 220000,
          quantity: 2,
        }
      ]
    }
  },
  {
    id: 'conv2',
    type: 'chatbox',
    customer: {
      id: 'cust2',
      name: 'Trần Thị B',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50',
      phone: '0912345678',
      email: 'tranthib@example.com',
      location: 'Hà Nội'
    },
    lastMessage: {
      content: 'Cảm ơn shop, mình đã nhận được hàng rồi nhé',
      timestamp: new Date(2023, 11, 9, 10, 15),
      isRead: true,
    },
    unreadCount: 0,
    isStarred: false,
    isArchived: false
  },
  {
    id: 'conv3',
    type: 'support',
    customer: {
      id: 'cust3',
      name: 'Lê Văn C',
      phone: '0923456789',
      email: 'levanc@example.com',
      location: 'Đà Nẵng'
    },
    lastMessage: {
      content: 'Mình muốn đổi size, shop có thể giúp mình không?',
      timestamp: new Date(2023, 11, 8, 18, 22),
      isRead: false,
    },
    unreadCount: 1,
    isStarred: true,
    isArchived: false,
    orderInfo: {
      id: 'ord2',
      orderNumber: 'ORD-23067',
      status: 'completed',
      items: [
        {
          id: 'item2',
          name: 'Quần jeans nam slim fit',
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=50',
          price: 450000,
          quantity: 1,
        }
      ]
    }
  },
  {
    id: 'conv4',
    type: 'customer',
    customer: {
      id: 'cust4',
      name: 'Phạm Thị D',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=50',
      phone: '0934567890',
      email: 'phamthid@example.com',
      location: 'Nha Trang'
    },
    lastMessage: {
      content: 'Sản phẩm này có mấy màu vậy shop?',
      timestamp: new Date(2023, 11, 6, 9, 45),
      isRead: true,
    },
    unreadCount: 0,
    isStarred: false,
    isArchived: true
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv1': [
    {
      id: 'msg1-1',
      content: 'Chào shop, mình muốn hỏi về sản phẩm áo thun nam cổ tròn basic',
      timestamp: new Date(2023, 11, 10, 14, 30),
      isRead: true,
      isSent: false
    },
    {
      id: 'msg1-2',
      content: 'Sản phẩm này còn hàng size L màu đen không shop?',
      timestamp: new Date(2023, 11, 10, 14, 32),
      isRead: true,
      isSent: false
    },
    {
      id: 'msg1-3',
      content: 'Và shop có ship COD đến Quận 7 không ạ?',
      timestamp: new Date(2023, 11, 10, 14, 35),
      isRead: false,
      isSent: false
    }
  ],
  'conv2': [
    {
      id: 'msg2-1',
      content: 'Chào shop, đơn hàng ORD-23066 của mình đã giao đến đâu rồi ạ?',
      timestamp: new Date(2023, 11, 9, 9, 30),
      isRead: true,
      isSent: false
    },
    {
      id: 'msg2-2',
      content: 'Chào bạn, đơn hàng của bạn đang được vận chuyển và dự kiến giao trong hôm nay ạ.',
      timestamp: new Date(2023, 11, 9, 9, 45),
      isRead: true,
      isSent: true
    },
    {
      id: 'msg2-3',
      content: 'Cảm ơn shop, mình đã nhận được hàng rồi nhé',
      timestamp: new Date(2023, 11, 9, 10, 15),
      isRead: true,
      isSent: false
    }
  ],
  'conv3': [
    {
      id: 'msg3-1',
      content: 'Chào shop, mình đã nhận được đơn hàng quần jeans rồi ạ',
      timestamp: new Date(2023, 11, 8, 18, 15),
      isRead: true,
      isSent: false
    },
    {
      id: 'msg3-2',
      content: 'Nhưng mình thấy size hơi rộng, mình muốn đổi xuống size nhỏ hơn được không?',
      timestamp: new Date(2023, 11, 8, 18, 18),
      isRead: true,
      isSent: false
    },
    {
      id: 'msg3-3',
      content: 'Mình muốn đổi size, shop có thể giúp mình không?',
      timestamp: new Date(2023, 11, 8, 18, 22),
      isRead: false,
      isSent: false
    }
  ],
  'conv4': [
    {
      id: 'msg4-1',
      content: 'Sản phẩm này có mấy màu vậy shop?',
      timestamp: new Date(2023, 11, 6, 9, 45),
      isRead: true,
      isSent: false
    },
    {
      id: 'msg4-2',
      content: 'Chào bạn, sản phẩm này hiện có 3 màu: đen, trắng và xanh navy ạ.',
      timestamp: new Date(2023, 11, 6, 10, 15),
      isRead: true,
      isSent: true,
      attachments: [
        {
          id: 'att1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300',
          name: 'product-colors.jpg'
        }
      ]
    }
  ]
};