import { ActionIcon, Box, Divider, Drawer, Group, NavLink, ScrollArea, Text, ThemeIcon, Tooltip } from '@mantine/core';
import React, { useState } from 'react';
import {
  FiBarChart2,
  FiCheckSquare,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiHome,
  FiLayers,
  FiLogOut,
  FiPlusCircle,
  FiSettings,
  FiShoppingCart,
  FiUsers
} from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: MenuItem[];
}

interface NavItemProps {
  item: MenuItem;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
  level?: number;
}

const NavItem: React.FC<NavItemProps> = ({ item, active, onClick, collapsed = false, level = 0 }) => {
  const [opened, setOpened] = useState(active);
  const navigate = useNavigate();
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpened(!opened);
    } else if (item.path) {
      navigate(item.path);
    }
    onClick?.();
  };

  if (collapsed && level === 0) {
    const content = (
      <NavLink
        active={active}
        leftSection={
          <ThemeIcon variant="light" color={active ? "blue" : "gray"} size="sm">
            {item.icon}
          </ThemeIcon>
        }
        onClick={handleClick}
        className='rounded-md hover:bg-gray-100 transition-colors duration-200'
        style={{ padding: '8px' }}
      />
    );

    return (
      <Tooltip label={item.label} position="right" withArrow>
        {content}
      </Tooltip>
    );
  }

  const navLinkContent = (
    <NavLink
      label={item.label}
      active={active && !hasChildren}
      leftSection={
        <ThemeIcon variant="light" color={active ? "blue" : "gray"} size="sm">
          {item.icon}
        </ThemeIcon>
      }
      opened={opened}
      onChange={setOpened}
      childrenOffset={28}
      my={4}
      onClick={handleClick}
      className='rounded-md hover:bg-gray-100 transition-colors duration-200'
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer'
      }}
    >
      {hasChildren && item.children?.map((child, index) => (
        <NavItem
          key={index}
          item={child}
          active={window.location.pathname === child.path}
          onClick={onClick}
          level={level + 1}
        />
      ))}
    </NavLink>
  );

  return navLinkContent;
};

interface AdminSidebarProps {
  opened: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ opened, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: <FiHome size={16} />,
      label: 'Tổng quan',
      path: '/admin/dashboard'
    },
    {
      icon: <FiLayers size={16} />,
      label: 'Danh mục',
      children: [
        {
          icon: <FiSettings size={14} />,
          label: 'Quản lý danh mục',
          path: '/admin/categories'
        },
        {
          icon: <FiEye size={14} />,
          label: 'Hiển thị danh mục',
          path: '/admin/categories/display'
        }
      ]
    },
    {
      icon: <FiUsers size={16} />,
      label: 'Người dùng',
      path: '/admin/users'
    },
    {
      icon: <FiPlusCircle size={16} />,
      label: 'Đăng ký shop',
      path: '/admin/shop-registrations'
    },
    {
      icon: <FiCheckSquare size={16} />,
      label: 'Duyệt sản phẩm',
      path: '/admin/product-approvals'
    },
    {
      icon: <FiShoppingCart size={16} />,
      label: 'Đơn hàng',
      path: '/admin/orders'
    },
    {
      icon: <FiBarChart2 size={16} />,
      label: 'Báo cáo & Thống kê',
      path: '/admin/reports'
    },
    {
      icon: <FiSettings size={16} />,
      label: 'Cài đặt',
      path: '/admin/settings'
    }
  ];

  const isItemActive = (item: MenuItem): boolean => {
    if (item.path && location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };

  const desktopSidebar = (
    <Box
      w={collapsed ? 70 : 250}
      h="calc(100vh - 65px)"
      bg="white"
      style={{
        borderRight: '1px solid #eaeaea',
        position: 'sticky',
        top: '65px',
        left: 0,
        zIndex: 2,
        overflow: 'hidden',
        transition: 'width 0.3s ease'
      }}
      p="xs"
      className="hidden md:block"
    >
      <ScrollArea h="100vh" scrollbarSize={6} offsetScrollbars>
        <Box py="md">
          <Group justify="space-between" mb="md" px="md">
            {!collapsed && (
              <Text fw={700} size="sm" c="dimmed">
                QUẢN TRỊ
              </Text>
            )}
            <ActionIcon
              variant="subtle"
              onClick={() => setCollapsed(!collapsed)}
              size="sm"
            >
              {collapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
            </ActionIcon>
          </Group>

          {menuItems.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              active={isItemActive(item)}
              collapsed={collapsed}
            />
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );

  const mobileSidebar = (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="xs"
      title={
        <div className="flex items-center gap-2">
          <img src="/images/logo.jfif" alt="AnrealShop" className="h-8 w-auto" />
          <div className="font-semibold text-lg">
            <span className="text-primary">Admin</span>
            <span className="text-slate-700">System</span>
          </div>
        </div>
      }
      className="md:hidden"
    >
      <div className="mt-4">
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            active={isItemActive(item)}
            onClick={onClose}
          />
        ))}

        <Divider my="sm" />

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            navigate('/');
            onClose();
          }}
        >
          <ThemeIcon variant="light" color="gray" size="sm">
            <FiHome size={16} />
          </ThemeIcon>
          Quay lại cửa hàng
        </div>

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
          onClick={onClose}
        >
          <ThemeIcon variant="light" color="red" size="sm">
            <FiLogOut size={16} />
          </ThemeIcon>
          Đăng xuất
        </div>
      </div>
    </Drawer>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default AdminSidebar;