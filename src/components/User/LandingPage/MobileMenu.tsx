import { Avatar, Button } from '@mantine/core';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface NavItem {
    label: string;
    link: string;
    scrollTo?: string;
}

interface MobileMenuProps {
    isAuthenticated: boolean;
    user: any; // Replace with proper type
    navItems: NavItem[];
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void;
    onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    isAuthenticated,
    user,
    navItems,
    onNavClick,
    onClose
}) => {
    return (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md mt-2 py-4 px-5 rounded-md z-40">
            <div className="flex flex-col space-y-4">
                {/* Navigation links */}
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.link}
                        onClick={(e) => {
                            onNavClick(e, item);
                            if (onClose) onClose();
                        }}
                        className="font-medium text-gray-700 hover:text-primary transition-colors"
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Authentication section */}
                {!isAuthenticated ? (
                    <Button
                        component={Link}
                        to="/login"
                        className="bg-primary hover:bg-primary/90 mt-2"
                        leftSection={<FaSignOutAlt size={14} />}
                    >
                        Đăng nhập / Đăng ký
                    </Button>
                ) : (
                    <div className="border-t border-gray-200 mt-4 pt-4">
                        {/* User info */}
                        <div className="flex items-center mb-4">
                            <Avatar
                                src={user?.avatarUrl}
                                radius="xl"
                                size="sm"
                                mr={8}
                            />
                            <div>
                                <p className="font-medium text-sm">{user?.fullName}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>

                        {/* User links */}
                        <Link
                            to="/account/profile"
                            className="block py-2 font-medium text-gray-700 hover:text-primary transition-colors"
                            onClick={onClose}
                        >
                            Hồ sơ của tôi
                        </Link>
                        <Link
                            to="/account/orders"
                            className="block py-2 font-medium text-gray-700 hover:text-primary transition-colors"
                            onClick={onClose}
                        >
                            Đơn hàng của tôi
                        </Link>
                        {user?.roles?.includes('SELLER') && (
                            <Link
                                to="/seller/dashboard"
                                className="block py-2 font-medium text-gray-700 hover:text-primary transition-colors"
                                onClick={onClose}
                            >
                                Quản lý cửa hàng
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;
