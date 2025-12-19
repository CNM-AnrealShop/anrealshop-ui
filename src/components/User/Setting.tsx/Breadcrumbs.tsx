import { Anchor, Text } from '@mantine/core';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
    return (
        <div className="flex items-center space-x-2 text-sm mb-4">
            <Anchor component={Link} to="/" className="!flex !items-center text-gray-500 hover:text-primary !no-underline">
                <FiHome size={14} className="inline-block mr-1" />
                Trang chủ
            </Anchor>
            <FiChevronRight size={14} className="text-gray-400" />
            <Anchor component={Link} to="/account" className="text-gray-500 hover:text-primary !no-underline">
                Tài khoản
            </Anchor>
            <FiChevronRight size={14} className="text-gray-400" />
            <Text className="text-gray-900">Cài đặt tài khoản</Text>
        </div>
    );
}

export default Breadcrumbs

