export const PRICE_SUGGESTIONS = [
    { value: [0, 100000] as [number, number], label: 'Dưới 100K' },
    { value: [100000, 500000] as [number, number], label: '100K - 500K' },
    { value: [500000, 1000000] as [number, number], label: '500K - 1Tr' },
    { value: [1000000, 5000000] as [number, number], label: '1Tr - 5Tr' },
    { value: [5000000, 10000000] as [number, number], label: 'Trên 5Tr' },
];

export const BRANDS = [
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'puma', label: 'Puma' },
    { value: 'uniqlo', label: 'Uniqlo' },
    { value: 'zara', label: 'Zara' },
];

export const COLORS = [
    { value: 'Đen', label: 'Đen', hex: '#000000' },
    { value: 'Trắng', label: 'Trắng', hex: '#FFFFFF' },
    { value: 'Đỏ', label: 'Đỏ', hex: '#FF0000' },
    { value: 'Xanh dương', label: 'Xanh dương', hex: '#0000FF' },
    { value: 'Xanh lá', label: 'Xanh lá', hex: '#00FF00' },
    { value: 'Vàng', label: 'Vàng', hex: '#FFFF00' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

export const ORIGINS = [
    { value: 'Việt Nam', label: 'Việt Nam' },
    { value: 'Mỹ', label: 'Mỹ' },
    { value: 'Hàn Quốc', label: 'Hàn Quốc' },
    { value: 'Nhật Bản', label: 'Nhật Bản' },
    { value: 'Trung Quốc', label: 'Trung Quốc' },
    { value: 'Thái Lan', label: 'Thái Lan' },
    { value: 'Anh', label: 'Anh' },
    { value: 'Pháp', label: 'Pháp' },
    { value: 'Ý', label: 'Ý' },
];

export const RATING_OPTIONS = [
    { value: '5', label: '5 sao' },
    { value: '4', label: 'Từ 4 sao' },
    { value: '3', label: 'Từ 3 sao' },
];

export const GENDERS = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
    { value: 'Unisex', label: 'Unisex' },
];
