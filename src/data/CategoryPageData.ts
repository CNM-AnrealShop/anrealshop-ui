// import type { Category } from '../components/User/CategoryPage/CategoryPage';
import { mockFeaturedProducts, type Product } from '../data/FilterData';
import type { BaseCategoryDto } from '../types/CategoryType';


// Hàm lấy sản phẩm theo danh mục
export const getCategoryProducts = async (categoryId: string, filters: any) : Promise<Product[]> => {
  console.log('Filters applied:', categoryId);
  // Giả lập API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Giả lập lọc sản phẩm
      let products = [...mockFeaturedProducts];
      
      // Lọc theo thương hiệu
      if (filters.brands && filters.brands.length > 0) {
        products = products.filter(p => filters.brands.includes(p.brand?.toLowerCase()));
      }
      
      // Lọc theo xuất xứ
      if (filters.origins && filters.origins.length > 0) {
        products = products.filter(p => filters.origins.includes(p.origin?.toLowerCase()));
      }
      
      // Lọc theo kích thước
      if (filters.sizes && filters.sizes.length > 0) {
        products = products.filter(p => 
          p.sizes && p.sizes.some(size => filters.sizes.includes(size))
        );
      }
      
      // Sắp xếp
      switch (filters.sort) {
        case 'price-asc':
          products.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price-desc':
          products.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'name-asc':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // Newest
          products.sort((a, b) => Number(b.id) - Number(a.id));
      }
      
      resolve(products);
    }, 800);
  });
};




export const categories: BaseCategoryDto[] = [
  {
    id: '1',
    name: 'Thời trang nữ',
    parentId: null,
    level: 0,
    hasChildren: true
  },
  {
    id: '2',
    name: 'Đầm váy',
    parentId: '1',
    level: 1,
    hasChildren: true
  },
  {
    id: '3',
    name: 'Áo sơ mi',
    parentId: '1',
    level: 1,
    hasChildren: false
  },
  {
    id: '4',
    name: 'Thời trang nam',
    parentId: null,
    level: 0,
    hasChildren: true
  },
  {
    id: '5',
    name: 'Áo thun nam',
    parentId: '4',
    level: 1,
    hasChildren: false
  },
  {
    id: '6',
    name: 'Quần',
    parentId: '4',
    level: 1,
    hasChildren: true
  },
  {
    id: '7',
    name: 'Phụ kiện',
    parentId: null,
    level: 0,
    hasChildren: false
  },
  {
    id: '8',
    name: 'Áo khoác nữ',
    parentId: '1',
    level: 1,
    hasChildren: false
  },
  {
    id: '9',
    name: 'Quần âu nam',
    parentId: '6',
    level: 2,
    hasChildren: false
  },
  {
    id: '10',
    name: 'Quần jean',
    parentId: '6',
    level: 2,
    hasChildren: false
  },
  {
    id: '11',
    name: 'Quần đùi',
    parentId: '6',
    level: 2,
    hasChildren: false
  },
  {
    id: '12',
    name: 'Đầm dạ hội',
    parentId: '2',
    level: 2,
    hasChildren: false
  },
  {
    id: '13',
    name: 'Đầm công sở',
    parentId: '2',
    level: 2,
    hasChildren: false
  },
  {
    id: '14',
    name: 'Đầm maxi',
    parentId: '2',
    level: 2,
    hasChildren: false
  }
];




export const categorySuggestData: BaseCategoryDto[] = [
  {
    id: '1',
    name: 'Điện tử',
    urlPath: 'Danh mục > Điện tử',
    urlSlug: 'dien-tu'
  },
  {
    id: '2',
    name: 'Thời trang',
    urlPath: 'Danh mục > Thời trang',
    urlSlug: 'thoi-trang'
  },
  {
    id: '3',
    name: 'Gia dụng',
    urlPath: 'Danh mục > Gia dụng',
    urlSlug: 'gia-dung'
  },
  {
    id: '4',
    name: 'Sách & Văn phòng phẩm',
    urlPath: 'Danh mục > Sách & Văn phòng phẩm',
    urlSlug: 'sach-van-phong-pham'
  },
  {
    id: '5',
    name: 'Thể thao & Du lịch',
    urlPath: 'Danh mục > Thể thao & Du lịch',
    urlSlug: 'the-thao-du-lich'
  },
  {
    id: '6',
    name: 'Mẹ & Bé',
    urlPath: 'Danh mục > Mẹ & Bé',
    urlSlug: 'me-be'
  },
  {
    id: '7',
    name: 'Làm đẹp & Sức khỏe',
    urlPath: 'Danh mục > Làm đẹp & Sức khỏe',
    urlSlug: 'lam-dep-suc-khoe'
  },
  {
    id: '8',
    name: 'Xe cộ',
    urlPath: 'Danh mục > Xe cộ',
    urlSlug: 'xe-co'
  },
  {
    id: '9',
    name: 'Nhà cửa & Đời sống',
    urlPath: 'Danh mục > Nhà cửa & Đời sống',
    urlSlug: 'nha-cua-doi-song'
  },
  {
    id: '10',
    name: 'Thú cưng',
    urlPath: 'Danh mục > Thú cưng',
    urlSlug: 'thu-cung'
  },
  // Sub-categories examples
  {
    id: '11',
    name: 'Điện thoại & Phụ kiện',
    urlPath: 'Danh mục > Điện tử > Điện thoại & Phụ kiện',
    urlSlug: 'dien-thoai-phu-kien'
  },
  {
    id: '12',
    name: 'Áo nam',
    urlPath: 'Danh mục > Thời trang > Áo nam',
    urlSlug: 'ao-nam'
  },
  {
    id: '13',
    name: 'Áo nữ',
    urlPath: 'Danh mục > Thời trang > Áo nữ',
    urlSlug: 'ao-nu'
  },
  {
    id: '14',
    name: 'Laptop',
    urlPath: 'Danh mục > Điện tử > Laptop',
    urlSlug: 'laptop'
  },
  {
    id: '15',
    name: 'Nồi cơm điện',
    urlPath: 'Danh mục > Gia dụng > Nồi cơm điện',
    urlSlug: 'noi-com-dien'
  }
];