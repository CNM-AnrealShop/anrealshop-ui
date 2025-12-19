import type { MyShopProductDto, ProductStatusDto } from '../types/ProductType';

export const productStatusDefaultData: ProductStatusDto[] = [
  {
    id: 'ALL',
    name: 'Tất cả',
    count: 0
  },
  {
    id: 'ACTIVE',
    name: 'Đang hoạt động',
    count: 0
  },
  {
    id: 'VIOLATION',
    name: 'Vi phạm',
    count: 0
  },
  {
    id: 'PENDING',
    name: 'Chờ duyệt',
    count: 0
  },
  {
    id: 'HIDDEN',
    name: 'Đang ẩn',
    count: 0
  }
];
export const productStatusDefaultDataAdmin: ProductStatusDto[] = [ 
  {
    id: 'ALL',
    name: 'Tất cả',
    count: 0
  },
  {
    id: 'ACTIVE',
    name: 'Đang hoạt động',
    count: 0
  },
  {
    id: 'VIOLATION',
    name: 'Vi phạm',
    count: 0
  },
  {
    id: 'PENDING',
    name: 'Chờ duyệt',
    count: 0
  } 
];


export const productNameSuggestionsDataDefault: string[] = [
  // Điện tử & Công nghệ
  'iPhone 15 Pro Max 256GB',
  'Samsung Galaxy S24 Ultra',
  'MacBook Air M2 13 inch',
  'iPad Pro 11 inch 2024',
  'AirPods Pro 3rd Gen',
  'Sony WH-1000XM5 Headphones',
  'Dell XPS 13 Laptop',
  'Nintendo Switch OLED',
  
];


export const myShopProductData: MyShopProductDto[] = [
  {
    id: '1',
    name: 'Áo thun nam basic cotton 100%',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=300',
    urlSlug: 'ao-thun-nam-basic-cotton-100',
    categoryId: '12',
    discountPrice: 179000,
    quantity: 45,
    sold: 120,
    status: 'ACTIVE',
    visible: true,
    createdAt: '2023-11-10T14:30:00Z',
    productSkus: [
      {
        id: 'sku-1-1',
        sku: 'ATHUN-S-WHITE',
        imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=300',
        price: 199000,
        quantity: 15,
        sold: 40,
        createdAt: '2023-11-10T14:30:00Z'
      },
      {
        id: 'sku-1-2',
        sku: 'ATHUN-M-WHITE',
        imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=300',
        price: 199000,
        quantity: 20,
        sold: 50,
        createdAt: '2023-11-10T14:30:00Z'
      },
      {
        id: 'sku-1-3',
        sku: 'ATHUN-L-WHITE',
        imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=300',
        price: 199000,
        quantity: 10,
        sold: 30,
        createdAt: '2023-11-10T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Giày thể thao nữ cao cấp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300',
    urlSlug: 'giay-the-thao-nu-cao-cap',
    categoryId: '8',
    discountPrice: 420000,
    quantity: 28,
    sold: 67,
    status: 'ACTIVE',
    visible: true,
    createdAt: '2023-12-05T09:15:00Z',
    productSkus: [
      {
        id: 'sku-2-1',
        sku: 'GIAY-36-PINK',
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300',
        price: 450000,
        quantity: 8,
        sold: 20,
        createdAt: '2023-12-05T09:15:00Z'
      },
      {
        id: 'sku-2-2',
        sku: 'GIAY-37-PINK',
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300',
        price: 450000,
        quantity: 12,
        sold: 25,
        createdAt: '2023-12-05T09:15:00Z'
      },
      {
        id: 'sku-2-3',
        sku: 'GIAY-38-PINK',
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300',
        price: 450000,
        quantity: 8,
        sold: 22,
        createdAt: '2023-12-05T09:15:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Túi xách nữ thời trang da thật',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?q=80&w=300',
    urlSlug: 'tui-xach-nu-thoi-trang-da-that',
    categoryId: '2',
    discountPrice: 320000,
    quantity: 15,
    sold: 42,
    status: 'PENDING',
    visible: false,
    createdAt: '2024-01-18T16:45:00Z',
    productSkus: [
      {
        id: 'sku-3-1',
        sku: 'TUI-BLACK-LEATHER',
        imageUrl: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?q=80&w=300',
        price: 350000,
        quantity: 8,
        sold: 22,
        createdAt: '2024-01-18T16:45:00Z'
      },
      {
        id: 'sku-3-2',
        sku: 'TUI-BROWN-LEATHER',
        imageUrl: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?q=80&w=300',
        price: 350000,
        quantity: 7,
        sold: 20,
        createdAt: '2024-01-18T16:45:00Z'
      }
    ]
  },
  {
    id: '4',
    name: 'Áo khoác dù nam chống nước',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300',
    urlSlug: 'ao-khoac-du-nam-chong-nuoc',
    categoryId: '12',
    discountPrice: 499000,
    quantity: 0,
    sold: 89,
    status: 'HIDDEN',
    visible: false,
    createdAt: '2023-10-22T11:20:00Z',
    productSkus: [
      {
        id: 'sku-4-1',
        sku: 'KHOAC-M-NAVY',
        imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300',
        price: 550000,
        quantity: 0,
        sold: 45,
        createdAt: '2023-10-22T11:20:00Z'
      },
      {
        id: 'sku-4-2',
        sku: 'KHOAC-L-NAVY',
        imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300',
        price: 550000,
        quantity: 0,
        sold: 44,
        createdAt: '2023-10-22T11:20:00Z'
      }
    ]
  },
  {
    id: '5',
    name: 'Đồng hồ thông minh Apple Watch Series 9',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=300',
    urlSlug: 'dong-ho-thong-minh-apple-watch-series-9',
    categoryId: '1',
    discountPrice: 11200000,
    quantity: 7,
    sold: 31,
    status: 'VIOLATION',
    visible: false,
    createdAt: '2024-02-01T08:30:00Z',
    productSkus: [
      {
        id: 'sku-5-1',
        sku: 'APPLE-WATCH-41MM-PINK',
        imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=300',
        price: 12000000,
        quantity: 3,
        sold: 15,
        createdAt: '2024-02-01T08:30:00Z'
      },
      {
        id: 'sku-5-2',
        sku: 'APPLE-WATCH-45MM-PINK',
        imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=300',
        price: 13000000,
        quantity: 4,
        sold: 16,
        createdAt: '2024-02-01T08:30:00Z'
      }
    ]
  },
  {
    id: '6',
    name: 'Tai nghe Bluetooth Sony WH-1000XM5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300',
    urlSlug: 'tai-nghe-bluetooth-sony-wh-1000xm5',
    categoryId: '1',
    discountPrice: 750000,
    quantity: 22,
    sold: 67,
    status: 'ACTIVE',
    visible: true,
    createdAt: '2023-11-25T13:45:00Z',
    productSkus: [
      {
        id: 'sku-6-1',
        sku: 'SONY-WH1000XM5-BLACK',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300',
        price: 799000,
        quantity: 12,
        sold: 35,
        createdAt: '2023-11-25T13:45:00Z'
      },
      {
        id: 'sku-6-2',
        sku: 'SONY-WH1000XM5-SILVER',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300',
        price: 799000,
        quantity: 10,
        sold: 32,
        createdAt: '2023-11-25T13:45:00Z'
      }
    ]
  },
  {
    id: '7',
    name: 'Váy liền thân công sở thanh lịch',
    thumbnailUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300',
    urlSlug: 'vay-lien-than-cong-so-thanh-lich',
    categoryId: '13',
    discountPrice: 520000,
    quantity: 18,
    sold: 45,
    status: 'ACTIVE',
    visible: true,
    createdAt: '2023-12-14T10:15:00Z',
    productSkus: [
      {
        id: 'sku-7-1',
        sku: 'VAY-S-NAVY',
        imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300',
        price: 560000,
        quantity: 6,
        sold: 15,
        createdAt: '2023-12-14T10:15:00Z'
      },
      {
        id: 'sku-7-2',
        sku: 'VAY-M-NAVY',
        imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300',
        price: 560000,
        quantity: 8,
        sold: 20,
        createdAt: '2023-12-14T10:15:00Z'
      },
      {
        id: 'sku-7-3',
        sku: 'VAY-L-NAVY',
        imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300',
        price: 560000,
        quantity: 4,
        sold: 10,
        createdAt: '2023-12-14T10:15:00Z'
      }
    ]
  },
  {
    id: '8',
    name: 'Ví da nam cao cấp handmade',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=300',
    urlSlug: 'vi-da-nam-cao-cap-handmade',
    categoryId: '2',
    discountPrice: 420000,
    quantity: 32,
    sold: 28,
    status: 'ACTIVE',
    visible: true,
    createdAt: '2024-01-05T15:20:00Z',
    productSkus: [
      {
        id: 'sku-8-1',
        sku: 'VI-LEATHER-BROWN',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=300',
        price: 450000,
        quantity: 16,
        sold: 14,
        createdAt: '2024-01-05T15:20:00Z'
      },
      {
        id: 'sku-8-2',
        sku: 'VI-LEATHER-BLACK',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=300',
        price: 450000,
        quantity: 16,
        sold: 14,
        createdAt: '2024-01-05T15:20:00Z'
      }
    ]
  },
  {
    id: '9',
    name: 'Laptop gaming Asus ROG Strix G15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=300',
    urlSlug: 'laptop-gaming-asus-rog-strix-g15',
    categoryId: '14',
    discountPrice: 25900000,
    quantity: 3,
    sold: 12,
    status: 'ACTIVE',
    visible: true,
    createdAt: '2024-01-20T09:00:00Z',
    productSkus: [
      {
        id: 'sku-9-1',
        sku: 'ASUS-ROG-RTX3070-512GB',
        imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=300',
        price: 27900000,
        quantity: 3,
        sold: 12,
        createdAt: '2024-01-20T09:00:00Z'
      }
    ]
  },
  {
    id: '10',
    name: 'Nồi cơm điện Sharp 1.8L',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300',
    urlSlug: 'noi-com-dien-sharp-1-8l',
    categoryId: '15',
    discountPrice: 890000,
    quantity: 25,
    sold: 156,
    status: 'ACTIVE',
    visible: true,
    createdAt: '2023-09-15T14:30:00Z',
    productSkus: [
      {
        id: 'sku-10-1',
        sku: 'SHARP-KS-COM18V-WH',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300',
        price: 950000,
        quantity: 25,
        sold: 156,
        createdAt: '2023-09-15T14:30:00Z'
      }
    ]
  }
];



