# 🛍️ AnrealShop - Frontend

<div align="center">
  <img src="https://res.cloudinary.com/dqogp38jb/image/upload/v1762293614/Screenshot_from_2025-11-05_03-43-28_pcty2g.png" alt="AnrealShop Banner" width="100%">
  
  ### Ứng dụng thương mại điện tử hiện đại được xây dựng với React, TypeScript, và Mantine UI
  
  [![Demo](https://img.shields.io/badge/Demo-shop.haiemdavang.id.vn-blue?style=for-the-badge)](https://shop.haiemdavang.id.vn)
  [![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)]()
  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
</div>

---

## 🚀 Demo & Tài khoản Test

### 🔗 Link Demo
**[https://shop.haiemdavang.id.vn](https://shop.haiemdavang.id.vn)**

> ⚠️ **Lưu ý**: Hệ thống đang trong quá trình phát triển. Một số tính năng có thể chưa hoàn thiện.

### 👤 Tài khoản Test

#### 🛒 User không có shop
- **Email**: `botgiatv2@gmail.com`
- **Password**: `Ngochai123456@`
- **Quyền**: Xem sản phẩm, mua hàng, quản lý đơn hàng cá nhân

#### 🏪 User có shop (Seller)
- **Email**: `botgiatv3@gmail.com`
- **Password**: `Ngochai123456@`
- **Quyền**: Tất cả quyền của User + Quản lý shop, sản phẩm của shop

#### 👨‍💼 Admin
- **Email**: `admin@example.com`
- **Password**: `Ngochai123456@`
- **Quyền**: Quản trị toàn bộ hệ thống

---

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt](#cài-đặt)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Scripts](#scripts)
- [Tính năng Admin](#tính-năng-admin)
- [Roadmap](#roadmap)
- [Đóng góp](#đóng-góp)

## 🎯 Giới thiệu

AnrealShop là một nền tảng thương mại điện tử đa người bán (marketplace) với giao diện người dùng hiện đại và tính năng quản trị mạnh mẽ. Dự án tập trung vào:

- ✨ Trải nghiệm người dùng mượt mà với animations
- 🚀 Hiệu suất cao với React 19 và Vite
- 🎨 Giao diện đẹp mắt với Mantine UI và Tailwind CSS
- 📱 Responsive hoàn toàn trên mọi thiết bị
- 🔒 Bảo mật với OAuth và JWT

## ✨ Tính năng

### 🛒 Người dùng (Buyer)
- 🔐 Đăng nhập/Đăng ký với Google OAuth
- 🛍️ Xem và tìm kiếm sản phẩm
- 🛒 Quản lý giỏ hàng
- 💳 Đặt hàng và thanh toán
- 📦 Theo dõi đơn hàng
- ⭐ Đánh giá sản phẩm
- 💬 Chat với người bán (đang phát triển)
- 🔔 Thông báo real-time với WebSocket

### 🏪 Người bán (Seller)
- 📊 Dashboard quản lý shop
- 📦 Quản lý sản phẩm (CRUD)
- 📝 Quản lý đơn hàng của shop
- 📈 Thống kê doanh thu
- 🖼️ Upload hình ảnh sản phẩm
- 💬 Chat với khách hàng (đang phát triển)

### 👨‍💼 Quản trị viên (Admin)
- 📊 Dashboard tổng quan hệ thống
- 📂 Quản lý danh mục (Category Tree với animations)
- 🎯 Quản lý hiển thị danh mục (Homepage & Sidebar)
  - Drag & Drop reordering
  - Upload media (hình ảnh & video)
  - Tối đa 8 categories cho Homepage
  - Tối đa 6 categories cho Sidebar
- 👥 Quản lý người dùng và shops
- 📦 Quản lý tất cả đơn hàng
- 🖼️ Upload media lên Cloudinary
- ✏️ Rich text editor với TipTap
- 🎬 Hỗ trợ video thumbnail cho categories

## 🛠️ Công nghệ sử dụng

### Core
- **React 19.1.0** - UI Library với Server Components
- **TypeScript 5.8.3** - Type Safety
- **Vite 6.3.5** - Build Tool siêu nhanh
- **React Router DOM 7.6.1** - Client-side Routing

### UI & Styling
- **Mantine UI 7.17.7** - Component Library đầy đủ
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **Framer Motion 12.23.22** - Production-ready animations
- **React Icons 5.5.0** - Icon library
- **Embla Carousel 8.6.0** - Carousel với autoplay

### State Management & Data
- **Redux Toolkit 2.8.2** - Global State Management
- **React Redux 9.2.0** - React Bindings
- **Axios 1.10.0** - HTTP Client
- **SockJS & STOMP** - WebSocket cho real-time

### Form & Editor
- **Mantine Form 7.17.7** - Form Management với validation
- **TipTap 2.12.0** - Rich Text Editor (WYSIWYG)
- **React Number Format 5.4.4** - Format số tiền
- **Mantine Dates 7.17.7** - Date/Time picker

### Utilities
- **Day.js 1.11.13** - Date manipulation
- **Date-fns 4.1.0** - Date utilities
- **Slugify 1.6.6** - URL-friendly slugs
- **React OAuth Google 0.12.2** - Google Login

## 📦 Cài đặt

### Yêu cầu
- Node.js >= 18.0.0
- npm >= 9.0.0 hoặc yarn >= 1.22.0

### Các bước cài đặt

```bash
# Clone repository
git clone https://github.com/your-username/anrealshop-frontend.git
cd anrealshop-frontend

# Cài đặt dependencies
npm install

# Tạo file .env từ example
cp .env.example .env

# Chỉnh sửa file .env với thông tin của bạn
nano .env
```

### Cấu hình Environment Variables

```env
# API Backend
VITE_API_URL=https://api.example.com

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Cloudinary (Upload media)
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# WebSocket (Optional)
VITE_WS_URL=wss://api.example.com/ws
```

### Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173` 🚀

## 📁 Cấu trúc dự án

```
anrealshop-frontend/
├── public/                 # Static assets
│   ├── banner.png         # Header image
│   └── ...
├── src/
│   ├── components/         # React components
│   │   ├── Admin/         # Admin-only components
│   │   │   ├── Category/          # Category CRUD
│   │   │   ├── CategoryDisplay/   # Display management
│   │   │   ├── Product/           # Product management
│   │   │   └── Dashboard/         # Admin dashboard
│   │   ├── Shop/          # Shop/Seller components
│   │   ├── User/          # User components
│   │   ├── Toast/         # Notifications
│   │   └── Common/        # Shared components
│   ├── pages/             # Page components (routes)
│   │   ├── Admin/         # Admin pages
│   │   ├── Shop/          # Shop pages
│   │   ├── User/          # User pages
│   │   └── Auth/          # Authentication pages
│   ├── service/           # API services
│   │   ├── api/           # API calls
│   │   ├── Cloundinary.ts # Cloudinary upload
│   │   └── websocket.ts   # WebSocket connection
│   ├── store/             # Redux store
│   │   ├── slices/        # Redux slices
│   │   └── store.ts       # Store configuration
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── router.tsx         # Route configuration
├── .env                   # Environment variables (gitignored)
├── .env.example           # Environment template
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
└── README.md              # This file
```

## 🚀 Scripts

```bash
# Development
npm run dev          # Chạy dev server (localhost:5173)

# Build
npm run build        # Build cho production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Chạy ESLint
npm run type-check   # Check TypeScript types
```

## 🎨 Tính năng Admin

### 📂 Quản lý danh mục
- **Category Tree**: Hiển thị cây danh mục phân cấp
- **Expand/Collapse**: Animation mượt mà với Framer Motion
- **CRUD Operations**: Thêm, sửa, xóa danh mục
- **Nested Categories**: Hỗ trợ đa cấp không giới hạn
- **Visibility Toggle**: Ẩn/hiện danh mục
- **Slug Auto-generate**: Tự động tạo URL-friendly slug

### 🎯 Quản lý hiển thị danh mục
- **Homepage Display**: 
  - Tối đa 8 danh mục
  - Hiển thị nổi bật trên trang chủ
  - Upload hình ảnh hoặc video thumbnail
- **Sidebar Display**: 
  - Tối đa 6 danh mục
  - Hiển thị menu bên trái
  - Hỗ trợ icon hoặc hình ảnh
- **Drag & Drop**: Sắp xếp thứ tự bằng kéo thả
- **Media Upload**: Cloudinary integration
- **Real-time Preview**: Xem trước ngay lập tức

### 🖼️ Upload Media
- Hỗ trợ hình ảnh: JPG, PNG, GIF, WebP
- Hỗ trợ video: MP4, WebM
- Tự động optimize với Cloudinary
- Preview real-time
- Progress indicator
- Video autoplay với muted

## 🎭 Animations & UX

Dự án sử dụng **Framer Motion** để tạo trải nghiệm người dùng mượt mà:

### Animation Features
- ✨ **Fade-in animations**: Smooth entrance cho components
- 🎬 **Staggered animations**: Hiệu ứng lần lượt cho lists
- 🎯 **Drag & Drop**: Visual feedback khi reorder
- 📊 **Expand/Collapse**: Smooth height transitions
- 🎨 **Hover effects**: Interactive states
- 🔄 **Loading states**: Skeleton và spinners
- 📱 **Page transitions**: Smooth routing

### Performance Optimizations
- Code splitting với React.lazy
- Image lazy loading
- Memoization với React.memo
- Virtual scrolling cho long lists
- Debouncing cho search inputs

## 🗺️ Roadmap

### ✅ Đã hoàn thành
- [x] Authentication với Google OAuth
- [x] Admin dashboard
- [x] Category management với animations
- [x] Product CRUD
- [x] Shop management
- [x] Order processing
- [x] Real-time notifications

### 🚧 Đang phát triển
- [ ] Chat system (Buyer-Seller)
- [ ] Payment gateway integration
- [ ] Advanced search & filters
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Email notifications

### 📋 Kế hoạch tương lai
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Analytics dashboard
- [ ] AI product recommendations
- [ ] Social media integration

## 🔧 Cấu hình nâng cao

### Tối ưu Build
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'mantine': ['@mantine/core', '@mantine/hooks'],
        }
      }
    }
  }
})
```

### Environment cho các môi trường

```bash
# Development
.env.development

# Staging
.env.staging

# Production
.env.production
```

## 🤝 Đóng góp

Dự án đang trong giai đoạn phát triển và rất hoan nghênh mọi đóng góp!

### Quy trình đóng góp

1. **Fork** dự án
2. Tạo **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. Mở **Pull Request**

### Coding Standards
- Sử dụng TypeScript cho type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments cho complex logic
- Test trước khi commit

## 📝 License

Dự án này được phân phối dưới giấy phép **MIT License**.

## 👥 Team

- **Lead Developer**: Hai Em Da Vang
- **Email**: contact@haiemdavang.id.vn
- **Demo**: [shop.haiemdavang.id.vn](https://shop.haiemdavang.id.vn)

## 🔗 Links

- 🌐 [Live Demo](https://shop.haiemdavang.id.vn)
- 📚 [API Documentation](https://api.haiemdavang.id.vn/docs)
- 🎨 [Design System](https://mantine.dev)
- 💬 [Discord Community](#)
- 🐛 [Report Bug](https://github.com/your-username/anrealshop-frontend/issues)

## 📸 Screenshots

<details>
<summary>Click để xem screenshots</summary>

### Homepage
![Homepage](./docs/screenshots/homepage.png)

### Admin Dashboard
![Admin Dashboard](./docs/screenshots/admin-dashboard.png)

### Category Management
![Category Management](./docs/screenshots/category-management.png)

### Shop Management
![Shop Management](./docs/screenshots/shop-management.png)

</details>

---

<div align="center">
  <p>Made with ❤️ by AnrealShop Team</p>
  <p>
    <a href="https://shop.haiemdavang.id.vn">Demo</a> •
    <a href="#tính-năng">Features</a> •
    <a href="#cài-đặt">Installation</a> •
    <a href="#đóng-góp">Contributing</a>
  </p>
</div>
