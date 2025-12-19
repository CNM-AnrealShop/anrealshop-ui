import { Avatar, Menu } from '@mantine/core';
import { useState } from 'react';
import { FaClipboardList, FaHeart, FaRegUser, FaSignInAlt, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../constant';
import { useAuth } from '../../../hooks/useAuth';

interface MenuUserSectionProps {
    user: any;
    isAuthenticated: boolean;
    scrolled: boolean;
}

const MenuUserSection = ({ user, isAuthenticated, scrolled }: MenuUserSectionProps) => {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { handleLogout } = useAuth();


    return (
        <Menu
            opened={userMenuOpened}
            onClose={() => setUserMenuOpened(false)}
            shadow="md"
            width={200}
            position="bottom-end"
            offset={5}
            transitionProps={{ transition: 'scale-y', duration: 150 }}
            withArrow
        >
            <Menu.Target>
                <div
                    className="relative"
                    onClick={() => setUserMenuOpened(prev => !prev)}
                >
                    {isAuthenticated && user ? (
                        <Avatar
                            src={user.avatarUrl}
                            alt={user.fullName || "User"}
                            size="sm"
                            radius="xl"
                            className="cursor-pointer transition-transform hover:scale-110"
                        />
                    ) : (
                        <button className={`p-2 ${scrolled ? 'text-gray-700' : 'text-white'} hover:opacity-70 transition-all`}>
                            <FaUser size={18} />
                        </button>
                    )}
                </div>
            </Menu.Target>

            <Menu.Dropdown
                className="before:content-[''] before:absolute before:w-full before:h-5 before:top-0 before:-translate-y-full before:left-0"
            >
                {isAuthenticated && user ? (
                    <>
                        <Menu.Label>
                            <div className="flex flex-col">
                                <span className="font-semibold">{user.fullName}</span>
                                <span className="text-xs text-gray-500 truncate">{user.email}</span>
                            </div>
                        </Menu.Label>
                        <Menu.Divider />
                        <Menu.Item
                            component={Link}
                            to={APP_ROUTES.USER_PROFILE}
                            leftSection={<FaRegUser size={14} />}
                        >
                            Hồ sơ của tôi
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            to="/settings/orders"
                            leftSection={<FaClipboardList size={14} />}
                        >
                            Đơn hàng của tôi
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            to="/account/wishlist"
                            leftSection={<FaHeart size={14} />}
                        >
                            Sản phẩm yêu thích
                        </Menu.Item>

                        <Menu.Divider />
                        {user?.hasShop ? (
                            <Menu.Item
                                component={Link}
                                to={APP_ROUTES.MYSHOP.BASE}
                                leftSection={<FaStore size={14} />}
                            >
                                Quản lý cửa hàng
                            </Menu.Item>

                        ) : <Menu.Item
                            component={Link}
                            to={APP_ROUTES.SHOP_REGISTER}
                            leftSection={<FaStore size={14} />}
                        >
                            Đăng ký cửa hàng
                        </Menu.Item>}

                        <Menu.Divider />
                        <Menu.Item
                            onClick={handleLogout}
                            color="red"
                            leftSection={<FaSignOutAlt size={14} />}
                        >
                            Đăng xuất
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Label>Tài khoản</Menu.Label>
                        <Menu.Item
                            component={Link}
                            to="/login"
                            leftSection={<FaSignInAlt size={14} />}
                        >
                            Đăng nhập
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            to="/register"
                            leftSection={<FaRegUser size={14} />}
                        >
                            Đăng ký
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export default MenuUserSection;
