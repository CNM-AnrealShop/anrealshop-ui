import {
  ActionIcon,
  Avatar,
  Burger,
  Divider,
  Group,
  Indicator,
  Menu,
  Text,
  UnstyledButton
} from '@mantine/core';
import { useState } from 'react';
import {
  FiBell,
  FiChevronDown,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiUser
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppRedux';
import { useAuth } from '../../../hooks/useAuth';

const AdminHeader: React.FC<{ toggleSidebar: () => void, sidebarOpened: boolean }> = ({ toggleSidebar, sidebarOpened }) => {
  const [hasUnread] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  const userMenuItems = [
    { label: 'Hồ sơ của tôi', icon: <FiUser size={14} />, path: '/admin/profile' },
    { label: 'Cài đặt tài khoản', icon: <FiSettings size={14} />, path: '/admin/settings' },
    { label: 'Trợ giúp', icon: <FiHelpCircle size={14} />, path: '/admin/help' },
    { label: 'Quay lại cửa hàng', icon: <FiHome size={14} />, path: '/' },
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Quản trị viên';
      case 'MY_SHOP':
        return 'Chủ cửa hàng';
      case 'USER':
        return 'Người dùng';
      default:
        return role;
    }
  };

  return (
    <div className="sticky top-0 z-10">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo và nút menu cho mobile */}
          <div className="flex items-center">
            <Burger
              size="sm"
              opened={sidebarOpened}
              onClick={toggleSidebar}
              className="mr-2 md:hidden"
            />
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <img src="/images/logo.jfif" alt="AnrealShop" className="h-8 w-auto" />
              <div className="font-semibold text-xl">
                <span className="text-primary">Admin</span>
                <span className="text-slate-700">System</span>
              </div>
            </Link>
          </div>

          {/* Phần bên phải: tìm kiếm, thông báo và người dùng */}
          <Group gap="md">
            {/* Tìm kiếm */}
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Tìm kiếm"
            >
              <FiSearch size={20} className="text-gray-700" />
            </ActionIcon>

            {/* Tin nhắn */}
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Tin nhắn"
              component={Link}
              to="/admin/messages"
            >
              <FiMessageSquare size={20} className="text-gray-700" />
            </ActionIcon>

            {/* Thông báo */}
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

                  {/* Thông báo mẫu */}
                  <div className="space-y-1 max-h-[300px] overflow-auto">
                    <div className="p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <Text size="sm" fw={500}>
                        Có 5 shop mới đăng ký
                      </Text>
                      <Text size="xs" c="dimmed">
                        Cần xem xét và phê duyệt
                      </Text>
                      <Text size="xs" c="dimmed" className="mt-1">
                        5 phút trước
                      </Text>
                    </div>

                    <div className="p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <Text size="sm" fw={500}>
                        10 sản phẩm đang chờ duyệt
                      </Text>
                      <Text size="xs" c="dimmed">
                        Các sản phẩm mới cần xem xét trước khi xuất bản
                      </Text>
                      <Text size="xs" c="dimmed" className="mt-1">
                        1 giờ trước
                      </Text>
                    </div>
                  </div>

                  <Divider className="my-2" />

                  <UnstyledButton
                    className="w-full text-center text-sm text-primary py-1"
                    component={Link}
                    to="/admin/notifications"
                  >
                    Xem tất cả thông báo
                  </UnstyledButton>
                </div>
              </Menu.Dropdown>
            </Menu>

            {/* Menu người dùng */}
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition-colors">
                  <Avatar
                    src={user?.avatarUrl || undefined}
                    alt={user?.fullName}
                    size="md"
                    radius="xl"
                  >
                    {!user?.avatarUrl && user?.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <Text size="sm" fw={500}>
                      {user?.fullName || user?.username || 'Admin User'}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {user?.role ? getRoleLabel(user.role) : 'Quản trị viên'}
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
                    component={Link}
                    to={item.path}
                  >
                    {item.label}
                  </Menu.Item>
                ))}

                <Menu.Divider />

                <Menu.Item
                  leftSection={<FiLogOut size={14} />}
                  color="red"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;