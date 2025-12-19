
export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}


export interface Product {
  id: string;
  slug?: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  shop: {
    name: string;
    slug?: string;
  };
  category: {
    name: string;
  };
  tags?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ShopInfo {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  coverImage: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  totalFollowers: number;
  joinDate: string;
  isFollowing: boolean;
  badges: string[];
  responseTime: string;
  responseRate: number;
}

// Interface cho sản phẩm shop
export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sold: number;
  discount?: number;
}

// Interface cho đánh giá
export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

// Mock data cho shops
export const mockShops: { [key: string]: ShopInfo } = {
  'fashion-store-vn': {
    id: 'shop-001',
    slug: 'fashion-store-vn',
    name: 'Fashion Store VN',
    avatar: 'https://picsum.photos/id/64/200/200',
    coverImage: 'https://picsum.photos/id/1/1200/400',
    description: 'Chuyên cung cấp thời trang nam nữ chất lượng cao với giá cả hợp lý. Cam kết 100% hàng chính hãng, đổi trả trong 30 ngày.',
    address: '123 Nguyễn Văn Linh, Q.7, TP.HCM',
    phone: '0901234567',
    email: 'contact@fashionstorevn.com',
    website: 'www.fashionstorevn.com',
    rating: 4.8,
    totalReviews: 2450,
    totalProducts: 156,
    totalFollowers: 15200,
    joinDate: '2020-03-15',
    isFollowing: false,
    badges: ['Shop uy tín', 'Hàng chính hãng', 'Giao hàng nhanh'],
    responseTime: '< 1 giờ',
    responseRate: 98
  },
  'nike-vietnam': {
    id: 'shop-002',
    slug: 'nike-vietnam',
    name: 'Nike Vietnam',
    avatar: 'https://picsum.photos/id/65/200/200',
    coverImage: 'https://picsum.photos/id/2/1200/400',
    description: 'Cửa hàng chính thức Nike với đầy đủ các sản phẩm thể thao mới nhất.',
    address: '456 Lê Văn Việt, Q.9, TP.HCM',
    phone: '0902345678',
    email: 'contact@nikevietnam.com',
    website: 'www.nike.com.vn',
    rating: 4.9,
    totalReviews: 3200,
    totalProducts: 89,
    totalFollowers: 28500,
    joinDate: '2019-08-20',
    isFollowing: false,
    badges: ['Thương hiệu quốc tế', 'Sản phẩm chính hãng', 'Freeship toàn quốc'],
    responseTime: '< 30 phút',
    responseRate: 99
  },
  'tech-world-store': {
    id: 'shop-003',
    slug: 'tech-world-store',
    name: 'Tech World Store',
    avatar: 'https://picsum.photos/id/66/200/200',
    coverImage: 'https://picsum.photos/id/3/1200/400',
    description: 'Chuyên cung cấp các thiết bị công nghệ, điện thoại, laptop, phụ kiện với giá tốt nhất thị trường.',
    address: '789 Võ Văn Ngân, Thủ Đức, TP.HCM',
    phone: '0903456789',
    email: 'info@techworld.vn',
    website: 'www.techworld.vn',
    rating: 4.7,
    totalReviews: 1850,
    totalProducts: 234,
    totalFollowers: 12300,
    joinDate: '2021-01-10',
    isFollowing: true,
    badges: ['Shop tin cậy', 'Bảo hành chính hãng', 'Hỗ trợ 24/7'],
    responseTime: '< 2 giờ',
    responseRate: 95
  }
};

// Mock data cho sản phẩm shop
export const mockShopProducts: ShopProduct[] = [
  {
    id: 'sp1',
    slug: 'ao-thun-unisex-cotton-basic',
    name: 'Áo Thun Unisex Cotton Basic Form Rộng',
    image: 'https://picsum.photos/id/26/300/400',
    price: 250000,
    originalPrice: 350000,
    rating: 4.5,
    sold: 120,
    discount: 29
  },
  {
    id: 'sp2',
    slug: 'quan-jean-nam-slimfit',
    name: 'Quần Jean Nam Slimfit Cao Cấp',
    image: 'https://picsum.photos/id/21/300/400',
    price: 500000,
    rating: 4.7,
    sold: 85
  },
  {
    id: 'sp3',
    slug: 'giay-sneaker-nike-air-force-1',
    name: 'Giày Sneaker Nike Air Force 1 White',
    image: 'https://picsum.photos/id/15/300/400',
    price: 2800000,
    rating: 4.9,
    sold: 45
  },
  {
    id: 'sp4',
    slug: 'dam-maxi-hoa-nhi-nu',
    name: 'Đầm Maxi Hoa Nhí Nữ Dáng Dài',
    image: 'https://picsum.photos/id/90/300/400',
    price: 650000,
    originalPrice: 850000,
    rating: 4.3,
    sold: 67,
    discount: 24
  },
  {
    id: 'sp5',
    slug: 'ao-hoodie-ni-nam-oversize',
    name: 'Áo Hoodie Nỉ Nam Oversize Streetwear',
    image: 'https://picsum.photos/id/28/300/400',
    price: 750000,
    rating: 4.6,
    sold: 93
  },
  {
    id: 'sp6',
    slug: 'tui-xach-nu-da-that',
    name: 'Túi Xách Nữ Da Thật Cao Cấp',
    image: 'https://picsum.photos/id/119/300/400',
    price: 1500000,
    rating: 4.8,
    sold: 34
  },
  {
    id: 'sp7',
    slug: 'ao-khoac-bomber-nam',
    name: 'Áo Khoác Bomber Nam Phong Cách Hàn Quốc',
    image: 'https://picsum.photos/id/29/300/400',
    price: 880000,
    originalPrice: 1200000,
    rating: 4.4,
    sold: 56,
    discount: 27
  },
  {
    id: 'sp8',
    slug: 'chan-vay-nu-xuyen-thau',
    name: 'Chân Váy Nữ Xuyên Thấu Phối Ren',
    image: 'https://picsum.photos/id/91/300/400',
    price: 420000,
    rating: 4.2,
    sold: 78
  }
];

// Mock data cho đánh giá
export const mockShopReviews: Review[] = [
  {
    id: 'r1',
    userName: 'Nguyễn Văn An',
    userAvatar: 'https://picsum.photos/id/32/100/100',
    rating: 5,
    comment: 'Shop uy tín, hàng đẹp, giao hàng nhanh. Áo thun cotton rất mềm mại và thoáng mát. Sẽ ủng hộ shop lâu dài!',
    date: '2023-06-10',
    images: ['https://picsum.photos/id/26/200/200', 'https://picsum.photos/id/27/200/200']
  },
  {
    id: 'r2',
    userName: 'Trần Thị Bình',
    userAvatar: 'https://picsum.photos/id/47/100/100',
    rating: 4,
    comment: 'Chất lượng sản phẩm tốt, giá cả hợp lý. Đầm maxi rất đẹp và vừa vặn. Tuy nhiên giao hàng hơi chậm so với cam kết.',
    date: '2023-06-08'
  },
  {
    id: 'r3',
    userName: 'Lê Văn Cường',
    userAvatar: 'https://picsum.photos/id/91/100/100',
    rating: 5,
    comment: 'Rất hài lòng với dịch vụ của shop. Nhân viên tư vấn nhiệt tình, sản phẩm đúng mô tả. Giày Nike chính hãng 100%.',
    date: '2023-06-05',
    images: ['https://picsum.photos/id/15/200/200']
  },
  {
    id: 'r4',
    userName: 'Phạm Thị Diệu',
    userAvatar: 'https://picsum.photos/id/48/100/100',
    rating: 4,
    comment: 'Túi xách da thật chất lượng tốt, thiết kế đẹp. Packaging cẩn thận. Chỉ tiếc là màu hơi khác so với ảnh một chút.',
    date: '2023-06-03'
  },
  {
    id: 'r5',
    userName: 'Hoàng Minh Đức',
    userAvatar: 'https://picsum.photos/id/92/100/100',
    rating: 5,
    comment: 'Áo hoodie oversize cực kỳ đẹp và ấm. Form dáng chuẩn, chất liệu nỉ dày dặn. Đáng tiền!',
    date: '2023-06-01',
    images: ['https://picsum.photos/id/28/200/200']
  },
  {
    id: 'r6',
    userName: 'Võ Thị Emi',
    userAvatar: 'https://picsum.photos/id/49/100/100',
    rating: 4,
    comment: 'Quần jean nam slimfit đẹp, chất jean co giãn tốt. Bạn trai mình rất thích. Shop giao hàng đúng hẹn.',
    date: '2023-05-30'
  }
];


export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Thời trang nam', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 1250 },
  { id: 'cat2', name: 'Thời trang nữ', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 1845 },
  { id: 'cat3', name: 'Điện thoại', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 738 },
  { id: 'cat4', name: 'Máy tính', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 512 },
  { id: 'cat5', name: 'Đồng hồ', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 347 },
  { id: 'cat6', name: 'Giày dép', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 927 },
  { id: 'cat6', name: 'Giày dép', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 927 },
  { id: 'cat6', name: 'Giày dép', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 927 },
  { id: 'cat6', name: 'Giày dép', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 927 },
  { id: 'cat6', name: 'Giày dép', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=580', productCount: 927 },
];

export const mockFeaturedProducts: Product[] = [
  {
    id: 'p1',
    name: 'Áo thun nam cao cấp',
    price: 299000,
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387'],
    rating: 4.8,
    reviewCount: 125,
    shop: { name: 'Fashion Store' },
    category: { name: 'Thời trang nam' },
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'Giày thể thao nữ',
    price: 850000,
    discountPrice: 680000,
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387'],
    rating: 4.6,
    reviewCount: 89,
    shop: { name: 'Sportland' },
    category: { name: 'Giày dép' },
    isFeatured: true
  },
  {
    id: 'p3',
    name: 'Đồng hồ nam dây da',
    price: 2150000,
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387'],
    rating: 4.9,
    reviewCount: 213,
    shop: { name: 'LuxWatch' },
    category: { name: 'Đồng hồ' },
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'Balo laptop chống sốc',
    price: 750000,
    discountPrice: 599000,
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387'],
    rating: 4.7,
    reviewCount: 64,
    shop: { name: 'Tech Gear' },
    category: { name: 'Phụ kiện' },
    isFeatured: true
  },
  {
    id: 'p5',
    name: 'Balo laptop chống sốc',
    price: 750000,
    discountPrice: 599000,
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387'],
    rating: 4.7,
    reviewCount: 64,
    shop: { name: 'Tech Gear' },
    category: { name: 'Phụ kiện' },
    isFeatured: true
  },
  {
    id: 'p6',
    name: 'Balo laptop chống sốc',
    price: 750000,
    discountPrice: 599000,
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387'],
    rating: 4.7,
    reviewCount: 64,
    shop: { name: 'Tech Gear' },
    category: { name: 'Phụ kiện' },
    isFeatured: true
  }
];

export const mockNewArrivals: Product[] = [
  {
    id: 'p5',
    name: 'Tai nghe bluetooth không dây',
    price: 1200000,
    images: ['https://images.unsplash.com/photo-1578319439584-104c94d37305?q=80&w=870'],
    rating: 4.5,
    reviewCount: 42, 
    shop: { name: 'Sound World' },
    category: { name: 'Điện tử' },
    isNew: true
  },
  {
    id: 'p6',
    name: 'Váy liền thân nữ',
    price: 450000,
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=387'],
    rating: 4.3,
    reviewCount: 28,
    shop: { name: 'Lady Style' },
    category: { name: 'Thời trang nữ' },
    isNew: true
  },
  {
    id: 'p7',
    name: 'Váy liền thân nữ',
    price: 450000,
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=387'],
    rating: 4.3,
    reviewCount: 28,
    shop: { name: 'Lady Style' },
    category: { name: 'Thời trang nữ' },
    isNew: true
  },
  {
    id: 'p8',
    name: 'Kính mát thời trang',
    price: 380000,
    discountPrice: 320000,
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=580'],
    rating: 4.4,
    reviewCount: 37,
    shop: { name: 'Accessories Hub' },
    category: { name: 'Phụ kiện' },
    isNew: true
  },
  {
    id: 'p9',
    name: 'Đèn ngủ thông minh',
    price: 550000,
    images: ['https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1170'],
    rating: 4.6,
    reviewCount: 19,
    shop: { name: 'Smart Home' },
    category: { name: 'Gia dụng' },
    isNew: true
  },
];

export const mockTrendingProducts: Product[] = [
  {
    id: 'p9',
    name: 'Điện thoại Samsung Galaxy S23',
    price: 19500000,
    discountPrice: 18200000,
    images: ['https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=580'],
    rating: 4.9,
    reviewCount: 352,
    shop: { name: 'Mobile World' },
    category: { name: 'Điện thoại' },
    tags: ['trending']
  },
  {
    id: 'p10',
    name: 'Máy ảnh mirrorless Sony Alpha',
    price: 28500000,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=464'],
    rating: 4.8,
    reviewCount: 127,
    shop: { name: 'Camera Hub' },
    category: { name: 'Thiết bị điện tử' },
    tags: ['trending']
  },
  {
    id: 'p11',
    name: 'Laptop gaming Asus ROG',
    price: 32000000,
    discountPrice: 29500000,
    images: ['https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1074'],
    rating: 4.7,
    reviewCount: 215,
    shop: { name: 'Laptop Pro' },
    category: { name: 'Máy tính' },
    tags: ['trending']
  },
  {
    id: 'p12',
    name: 'Laptop gaming Asus ROG',
    price: 32000000,
    discountPrice: 29500000,
    images: ['https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1074'],
    rating: 4.7,
    reviewCount: 215,
    shop: { name: 'Laptop Pro' },
    category: { name: 'Máy tính' },
    tags: ['trending']
  },
  {
    id: 'p13',
    name: 'Laptop gaming Asus ROG',
    price: 32000000,
    discountPrice: 29500000,
    images: ['https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1074'],
    rating: 4.7,
    reviewCount: 215,
    shop: { name: 'Laptop Pro' },
    category: { name: 'Máy tính' },
    tags: ['trending']
  },
];
