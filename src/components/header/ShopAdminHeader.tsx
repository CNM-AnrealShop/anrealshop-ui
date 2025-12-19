import {
  ActionIcon,
  Avatar,
  Burger,
  Collapse,
  Divider,
  Drawer,
  Group,
  Indicator,
  Menu,
  Stack,
  Text,
  UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import {
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiPackage,
  FiPieChart,
  FiPlus,
  FiPrinter,
  FiSettings,
  FiShoppingBag,
  FiTruck,
  FiUser
} from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppRedux';
import { APP_ROUTES } from '../../constant';

const navLinks = [
  { label: 'Tổng quan', icon: <FiPieChart size={16} />, path: '/myshop/dashboard' },
  {
    label: 'Sản phẩm',
    icon: <FiShoppingBag size={16} />,
    path: '/myshop/products',
    children: [
      { label: 'Quản lý', icon: <FiPackage size={16} />, path: '/myshop/products' },
      { label: 'Tạo sản phẩm', icon: <FiPlus size={16} />, path: '/myshop/products/create' },
    ]
  },
  {
    label: 'Đơn hàng',
    icon: <FiPackage size={16} />,
    path: '/myshop/orders',
    children: [
      { label: 'Đơn hàng', icon: <FiPackage size={16} />, path: '/myshop/orders' },
      { label: 'Giao hàng loạt', icon: <FiTruck size={16} />, path: '/myshop/orders/shipping' },
      { label: 'In phiếu giao hàng', icon: <FiPrinter size={16} />, path: '/myshop/orders/printing' },
    ]
  },
  { label: 'Tin nhắn', icon: <FiMessageSquare size={16} />, path: '/myshop/messages' },
  { label: 'Cài đặt', icon: <FiSettings size={16} />, path: '/myshop/settings' },
];

export function ShopAdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [hasUnread] = useState(true);
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);

  const { shop } = useAppSelector((state) => state.auth);

  const toggleSubmenu = (label: string) => {
    setOpenedSubmenu(openedSubmenu === label ? null : label);
  };

  const userMenuItems = [
    { label: 'Hồ sơ của tôi', icon: <FiUser size={14} />, onClick: () => console.log('Profile') },
    { label: 'Cài đặt tài khoản', icon: <FiSettings size={14} />, onClick: () => console.log('Settings') },
    { label: 'Quay lại cửa hàng', icon: <FiHome size={14} />, onClick: () => navigate(APP_ROUTES.HOME) },
  ];

  // const isUnderPath = (parentPath: string) => {
  //   return location.pathname.startsWith(parentPath);
  // };

  const isMenuActive = (item: any) => {
    if (item.children) {
      return item.children.some((child: any) => location.pathname === child.path || location.pathname.startsWith(child.path));
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path);
  };

  return (
    <div className="sticky top-0 z-10">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Burger opened={opened} onClick={toggle} className="mr-2 lg:hidden" />
            <Link to="/shop-admin/dashboard" className="flex items-center gap-2">
              <img src="/images/logo.jfif" alt="AnrealShop" className="h-8 w-auto" />
              <div className="font-semibold text-xl hidden sm:block">
                <span className="text-primary">Admin</span>
                <span className="text-slate-700">Panel</span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-1">
              {navLinks.map((item) => {
                const isActive = isMenuActive(item);

                if (item.children) {
                  return (
                    <Menu key={item.label} trigger="hover" openDelay={100} closeDelay={200} position="bottom-start">
                      <Menu.Target>
                        <Link
                          to={item.path}
                          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${isActive
                            ? 'text-primary bg-primary/5'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                          {item.icon}
                          {item.label}
                          <FiChevronDown size={14} className="ml-1" />
                        </Link>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {item.children.map((child: any) => {
                          const isChildActive = location.pathname === child.path;
                          return (
                            <Menu.Item
                              key={child.path}
                              leftSection={child.icon}
                              component={Link}
                              to={child.path}
                              className={isChildActive ? 'bg-primary/5 text-primary' : ''}
                            >
                              {child.label}
                            </Menu.Item>
                          );
                        })}
                      </Menu.Dropdown>
                    </Menu>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right section: notifications and user */}
          <Group gap="md">
            {/* Notifications */}
            <Menu shadow="md" width={320} position="bottom-end">
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  radius="xl"
                  aria-label="Thông báo"
                >
                  <Indicator size={8} offset={4} color="red" withBorder disabled={!hasUnread}>
                    <FiBell size={20} className="text-gray-700" />
                  </Indicator>
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <div className="p-2">
                  <Group justify="space-between" className="mb-2">
                    <Text fw={500}>Thông báo</Text>
                    <Text size="xs" c="dimmed" className="cursor-pointer hover:underline">
                      Đánh dấu tất cả đã đọc
                    </Text>
                  </Group>

                  <Divider className="mb-2" />

                  {/* Sample notifications */}
                  <div className="space-y-1 max-h-[300px] overflow-auto">
                    <div className="p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <Text size="sm" fw={500}>
                        Đơn hàng mới #12345
                      </Text>
                      <Text size="xs" c="dimmed">
                        Khách hàng Nguyễn Văn A vừa đặt một đơn hàng mới
                      </Text>
                      <Text size="xs" c="dimmed" className="mt-1">
                        5 phút trước
                      </Text>
                    </div>

                    <div className="p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <Text size="sm" fw={500}>
                        Cập nhật hệ thống
                      </Text>
                      <Text size="xs" c="dimmed">
                        Hệ thống sẽ bảo trì vào ngày 20/05/2025
                      </Text>
                      <Text size="xs" c="dimmed" className="mt-1">
                        2 giờ trước
                      </Text>
                    </div>
                  </div>

                  <Divider className="my-2" />

                  <UnstyledButton className="w-full text-center text-sm text-primary py-1">
                    Xem tất cả thông báo
                  </UnstyledButton>
                </div>
              </Menu.Dropdown>
            </Menu>

            {/* User menu */}
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition-colors">
                  <Avatar
                    src={shop?.avatarUrl || '/images/default-shop-logo.png'}
                    size="md"
                    radius="xl"
                  />
                  <div className="hidden md:block text-left">
                    <Text size="sm" fw={500}>
                      {shop?.name || 'N/A Shop'}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Quản trị viên
                    </Text>
                  </div>
                  <FiChevronDown size={14} className="hidden md:block text-gray-500" />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                {userMenuItems.map((item, index) => (
                  <Menu.Item
                    key={index}
                    leftSection={item.icon}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </Menu.Item>
                ))}

              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        withCloseButton
        title={
          <div className="flex items-center gap-2">
            <img src="/images/logo.jfif" alt="AnrealShop" className="h-8 w-auto" />
            <div className="font-semibold text-lg">
              <span className="text-primary">Admin</span>
              <span className="text-slate-700">Panel</span>
            </div>
          </div>
        }
      >
        <Stack>
          {navLinks.map((item) => {
            const isActive = isMenuActive(item);

            if (item.children) {
              const isOpen = openedSubmenu === item.label;
              return (
                <div key={item.label}>
                  <UnstyledButton
                    className={`w-full px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </div>
                    {isOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
                  </UnstyledButton>
                  <Collapse in={isOpen}>
                    <div className="pl-6 space-y-1 mt-1">
                      {item.children.map((child: any) => {
                        const isChildActive = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isChildActive
                              ? 'text-primary bg-primary/5'
                              : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            onClick={close}
                          >
                            {child.icon}
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </Collapse>
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive
                  ? 'text-primary bg-primary/5'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
                onClick={close}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
          <Divider my="sm" />
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-gray-600 hover:bg-gray-100"
            onClick={close}
          >
            <FiHome size={16} />
            Quay lại cửa hàng
          </Link>
          <UnstyledButton
            className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-red-600 hover:bg-red-50"
          >
            <FiLogOut size={16} />
            Đăng xuất
          </UnstyledButton>
        </Stack>
      </Drawer>
    </div>
  );
}

export default ShopAdminHeader;