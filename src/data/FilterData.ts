
// Dữ liệu danh mục
export const CATEGORIES = [
  { value: 'all', label: 'Tất cả sản phẩm' },
  { value: 'clothing', label: 'Quần áo' },
  { value: 'shoes', label: 'Giày dép' },
  { value: 'accessories', label: 'Phụ kiện' },
  { value: 'bags', label: 'Túi xách' },
  { value: 'watches', label: 'Đồng hồ' },
];
export const RATING_OPTIONS = [
  { label: 'Từ 5 sao', value: 5 },
  { label: 'Từ 4 sao', value: 4 },
  { label: 'Từ 3 sao', value: 3 },
  { label: 'Từ 2 sao', value: 2 },
  { label: 'Từ 1 sao', value: 1 },
];
// Dữ liệu thương hiệu
export const BRANDS = [
  { value: 'nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'puma', label: 'Puma' },
  { value: 'levi', label: 'Levi\'s' },
  { value: 'gucci', label: 'Gucci' },
  { value: 'zara', label: 'Zara' },
  { value: 'h&m', label: 'H&M' },
  { value: 'uniqlo', label: 'Uniqlo' },
  { value: 'gap', label: 'GAP' },
  { value: 'converse', label: 'Converse' },
  { value: 'timberland', label: 'Timberland' },
  { value: 'vans', label: 'Vans' },
  { value: 'dior', label: 'Dior' },
  { value: 'fila', label: 'Fila' },
  { value: 'champion', label: 'Champion' },
];

// Mảng màu sắc
export const COLORS = [
  { value: 'white', label: 'Trắng', color: '#FFFFFF', border: true },
  { value: 'black', label: 'Đen', color: '#000000' },
  { value: 'red', label: 'Đỏ', color: '#FF4136' },
  { value: 'blue', label: 'Xanh dương', color: '#0074D9' },
  { value: 'green', label: 'Xanh lá', color: '#2ECC40' },
  { value: 'yellow', label: 'Vàng', color: '#FFDC00' },
  { value: 'purple', label: 'Tím', color: '#B10DC9' },
  { value: 'pink', label: 'Hồng', color: '#FF85A2' },
  { value: 'orange', label: 'Cam', color: '#FF851B' },
  { value: 'brown', label: 'Nâu', color: '#A05A2C' },
  { value: 'grey', label: 'Xám', color: '#AAAAAA' },
  { value: 'navy', label: 'Xanh Navy', color: '#001f3f' },
  { value: 'teal', label: 'Xanh lục lam', color: '#39CCCC' },
  { value: 'olive', label: 'Olive', color: '#3D9970' },
  { value: 'maroon', label: 'Đỏ sẫm', color: '#85144b' },
];

// Dữ liệu kích thước
export const SIZES = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: 'xxl', label: '2XL' },
];

// Dữ liệu xuất xứ
export const ORIGINS = [
  { value: 'vietnam', label: 'Việt Nam' },
  { value: 'china', label: 'Trung Quốc' },
  { value: 'korea', label: 'Hàn Quốc' },
  { value: 'japan', label: 'Nhật Bản' },
  { value: 'usa', label: 'Mỹ' },
  { value: 'italy', label: 'Ý' },
  { value: 'france', label: 'Pháp' },
  { value: 'thailand', label: 'Thái Lan' },
  { value: 'germany', label: 'Đức' },
  { value: 'uk', label: 'Anh' },
  { value: 'spain', label: 'Tây Ban Nha' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'india', label: 'Ấn Độ' },
  { value: 'singapore', label: 'Singapore' },
];

// Khoảng giá gợi ý
export const PRICE_SUGGESTIONS = [
  { min: 0, max: 500000, label: 'Dưới 500.000₫' },
  { min: 500000, max: 1000000, label: '500.000₫ - 1.000.000₫' },
  { min: 1000000, max: 1500000, label: '1.000.000₫ - 1.500.000₫' },
  { min: 1500000, max: 2000000, label: '1.500.000₫ - 2.000.000₫' },
  { min: 2000000, max: 5000000, label: 'Trên 2.000.000₫' },
];

// Cấu hình sắp xếp
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
];



export interface Product {
  id: string; // Sử dụng string cho ID để nhất quán
  name: string;
  price: number;
  discountPrice?: number;
  images: string[]; // Mảng các URL hình ảnh
  rating: number;
  reviewCount: number;
  shop: { name: string };
  category: { name: string; code?: string }; // Giữ nguyên category là một object
  isFeatured?: boolean;
  brand?: string; // Ví dụ: 'uniqlo', 'zara' (nên lưu dưới dạng chữ thường)
  origin?: string; // Ví dụ: 'vietnam', 'china' (nên lưu dưới dạng chữ thường)
  colors?: string[]; // Mảng các màu chữ thường, ví dụ: ['black', 'white']
  sizes?: string[]; // Mảng các kích thước chữ thường, ví dụ: ['s', 'm', 'l']
}



export const mockFeaturedProducts: Product[] = [
  {
    id: 'p1',
    name: 'Áo Sơ Mi Lụa Tay Dài Nữ',
    price: 799000,
    discountPrice: 650000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.8,
    reviewCount: 152,
    shop: { name: 'Chic Boutique' },
    category: { name: 'Thời trang nữ', code: 'thoi-trang-nu' },
    isFeatured: true,
    brand: 'gucci', // Giả định 'gucci' có trong FilterData.BRANDS
    origin: 'italy',   // Giả định 'italy' có trong FilterData.ORIGINS
    colors: ['white', 'pink'], // Giả định 'white', 'pink' có trong FilterData.COLORS
    sizes: ['s', 'm']       // Giả định 's', 'm' có trong FilterData.SIZES
  },
  {
    id: 'p2',
    name: 'Quần Jeans Nam Slimfit Rách Gối',
    price: 950000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.6,
    reviewCount: 98,
    shop: { name: 'Urban Denim' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'levis',
    origin: 'usa',
    colors: ['blue', 'black'],
    sizes: ['m', 'l', 'xl']
  },
  {
    id: 'p3',
    name: 'Váy Maxi Hoa Mùa Hè',
    price: 1250000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.9,
    reviewCount: 220,
    shop: { name: 'Summer Dresses' },
    category: { name: 'Thời trang nữ', code: 'thoi-trang-nu' },
    isFeatured: true,
    brand: 'zara',
    origin: 'spain',
    colors: ['yellow', 'red', 'floral'], // 'floral' là một ví dụ, có thể là một màu cụ thể
    sizes: ['s', 'm', 'l']
  },
  {
    id: 'p4',
    name: 'Áo Khoác Bomber Nam Kaki',
    price: 1100000,
    discountPrice: 899000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 75,
    shop: { name: 'StreetStyle Hub' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'adidas',
    origin: 'germany',
    colors: ['black', 'khaki'],
    sizes: ['m', 'l', 'xl']
  },
  {
    id: 'p5',
    name: 'Túi Xách Da Nữ Công Sở',
    price: 1850000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.8,
    reviewCount: 112,
    shop: { name: 'Elegant Bags' },
    category: { name: 'Phụ kiện', code: 'phu-kien' },
    isFeatured: false,
    brand: 'charles & keith',
    origin: 'singapore',
    colors: ['black', 'brown', 'nude'],
    sizes: ['one-size'] // Ví dụ cho one-size
  },
  {
    id: 'p6',
    name: 'Giày Sneaker Cổ Cao Unisex',
    price: 2200000,
    discountPrice: 1950000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.9,
    reviewCount: 301,
    shop: { name: 'Sneaker World' },
    category: { name: 'Giày dép', code: 'giay-dep' },
    isFeatured: true,
    brand: 'nike',
    origin: 'usa',
    colors: ['white', 'red', 'black'],
    sizes: ['38', '39', '40', '41', '42']
  },
  {
    id: 'p7',
    name: 'Áo Len Cổ Lọ Giữ Ấm',
    price: 680000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.5,
    reviewCount: 88,
    shop: { name: 'Cozy Knits' },
    category: { name: 'Thời trang nữ', code: 'thoi-trang-nu' },
    isFeatured: false,
    brand: 'uniqlo',
    origin: 'japan',
    colors: ['gray', 'beige', 'black'],
    sizes: ['s', 'm', 'l']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  },
  {
    id: 'p8',
    name: 'Quần Tây Nam Lịch Lãm',
    price: 1350000,
    images: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=387'],
    rating: 4.7,
    reviewCount: 130,
    shop: { name: 'Gentlemen Store' },
    category: { name: 'Thời trang nam', code: 'thoi-trang-nam' },
    isFeatured: true,
    brand: 'pierre cardin',
    origin: 'france',
    colors: ['black', 'navy', 'gray'],
    sizes: ['30', '31', '32', '33', '34']
  }
];