import { Anchor, Box, Breadcrumbs, Flex, Group, Paper, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { Suspense, lazy } from 'react';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CategoryDisplayPage } from '../../components/Admin/CategoryDisplay/CategoryDisplayPage.tsx';
import User from '../../components/Admin/User/UserPage.tsx';
import OverlayLoading from '../../components/common/OverlayLoading';
import showErrorNotification from '../../components/Toast/NotificationError';
import { APP_ROUTES } from '../../constant';
import { useAppSelector } from '../../hooks/useAppRedux';

const CategoryManagement = lazy(() => import('../../components/Admin/Category/CategoryPage'));
const AdminHeader = lazy(() => import('../../components/Admin/Header/AdminHeader'));
const AdminSidebar = lazy(() => import('../../components/Admin/Header/AdminSideBar'));
const ProductApprovalPage = lazy(() => import('../../components/Admin/Product/ProductPage'));
const ShopApprovalPage = lazy(() => import('../../components/Admin/Shop/ShopPage'));

// const AdminDashboard = lazy(() => import('../../components/Admin/Dashboard/AdminDashboard'));
// const UserManagement = lazy(() => import('../../components/Admin/User/UserManagement'));
// const OrderManagement = lazy(() => import('../../components/Admin/Order/OrderManagement'));
// const ReportManagement = lazy(() => import('../../components/Admin/Report/ReportManagement'));
// const SystemSettings = lazy(() => import('../../components/Admin/Setting/SystemSettings'));
const UserManagement = () => <User />;
const AdminDashboard = () => <div>Quản lý người dùng</div>;
const OrderManagement = () => <div>Quản lý đơn hàng</div>;
const ReportManagement = () => <div>Báo cáo và thống kê</div>;
const SystemSettings = () => <div>Cài đặt hệ thống</div>;



const AdminPage: React.FC = () => {
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);

    const routeNames: Record<string, string> = {
      'admin': 'Quản trị',
      'dashboard': 'Tổng quan',
      'categories': 'Quản lý danh mục',
      'users': 'Quản lý người dùng',
      'shop-registrations': 'Đăng ký shop',
      'product-approvals': 'Duyệt sản phẩm',
      'orders': 'Quản lý đơn hàng',
      'reports': 'Báo cáo & Thống kê',
      'settings': 'Cài đặt hệ thống',
      'display': 'Hiển thị trang chủ'
    };

    const items = [
      <Anchor component={Link} to="/" key="home">
        <Group gap={4}>
          <FiHome size={14} />
          <span>Trang chủ</span>
        </Group>
      </Anchor>
    ];

    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      items.push(
        isLast ? (
          <Text key={segment} fw={500}>
            {routeNames[segment] || segment}
          </Text>
        ) : (
          <Anchor component={Link} to={currentPath} key={segment}>
            {routeNames[segment] || segment}
          </Anchor>
        )
      );
    });

    return items;
  };

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <OverlayLoading visible={true} />
  }

  if (isAuthenticated && user.role !== 'ADMIN') {
    showErrorNotification('Quyền truy cập bị từ chối', 'Bạn không có quyền truy cập vào trang quản trị.');
    navigate(APP_ROUTES.HOME);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div></div>}>
        <AdminHeader toggleSidebar={toggle} sidebarOpened={opened} />
      </Suspense>

      <Flex className="flex-1">
        <AdminSidebar opened={opened} onClose={close} />

        <Box className="flex-1 bg-gray-50 p-4 "  >
          <Paper p="md" mb="md" radius="md" shadow="xs">
            <Breadcrumbs separator={<FiChevronRight size={14} />}>
              {generateBreadcrumbs()}
            </Breadcrumbs>
          </Paper>

          <Paper p="md" radius="md" shadow="xs" className='min-h-[76vh]'>
            <Routes>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="categories/display" element={<CategoryDisplayPage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="shop-registrations" element={<ShopApprovalPage />} />
              <Route path="product-approvals" element={<ProductApprovalPage />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="reports" element={<ReportManagement />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Paper>
        </Box>
      </Flex>
    </div>
  );
};

export default AdminPage;