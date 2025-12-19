import React from 'react';
import { Tabs } from '@mantine/core';
import {
    FiUser,
    FiShield,
    FiCreditCard,
    FiBell,
    FiMessageSquare,
    FiSettings,
    FiUsers,
    FiShoppingBag
} from 'react-icons/fi';

const TabControll: React.FC = () => {
    return (
        <Tabs.List>
            <Tabs.Tab 
                value="profile" 
                leftSection={<FiUser size={16} />}
            >
                Thông tin cá nhân
            </Tabs.Tab>
            <Tabs.Tab 
                value="shop" 
                leftSection={<FiShoppingBag size={16} />}
            >
                Cài đặt cửa hàng
            </Tabs.Tab>
            <Tabs.Tab 
                value="notifications" 
                leftSection={<FiBell size={16} />}
            >
                Thông báo
            </Tabs.Tab>
            <Tabs.Tab 
                value="security" 
                leftSection={<FiShield size={16} />}
            >
                Bảo mật
            </Tabs.Tab>
            <Tabs.Tab 
                value="payment" 
                leftSection={<FiCreditCard size={16} />}
            >
                Thanh toán
            </Tabs.Tab>
            <Tabs.Tab 
                value="team" 
                leftSection={<FiUsers size={16} />}
            >
                Đội ngũ
            </Tabs.Tab>
            <Tabs.Tab 
                value="messaging" 
                leftSection={<FiMessageSquare size={16} />}
            >
                Nhắn tin
            </Tabs.Tab>
            <Tabs.Tab 
                value="advanced" 
                leftSection={<FiSettings size={16} />}
            >
                Nâng cao
            </Tabs.Tab>
        </Tabs.List>
    );
};

export default TabControll;