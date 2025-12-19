import React from 'react';
import { 
  Box, 
  Button, 
  Divider, 
  Group, 
  Stack, 
  Switch, 
  Text, 
  Title 
} from '@mantine/core';
import { FiSave, FiCheck } from 'react-icons/fi';
import { notifications } from '@mantine/notifications';

interface NotificationSettings {
  emailOrder: boolean;
  emailPromotion: boolean;
  emailNewsletter: boolean;
  pushOrder: boolean;
  pushPromotion: boolean;
  pushSystem: boolean;
}

interface NotificationProps {
  settings?: NotificationSettings;
  onUpdateSettings?: (settings: NotificationSettings) => void;
}

const Notification: React.FC<NotificationProps> = ({
  settings = {
    emailOrder: true,
    emailPromotion: false,
    emailNewsletter: true,
    pushOrder: true,
    pushPromotion: true,
    pushSystem: true,
  },
  onUpdateSettings
}) => {
  const [notificationSettings, setNotificationSettings] = React.useState<NotificationSettings>(settings);
  
  // Xử lý cập nhật cài đặt thông báo
  const handleUpdateNotifications = () => {
    // Gọi callback nếu được truyền vào
    if (onUpdateSettings) {
      onUpdateSettings(notificationSettings);
    }
    
    // Xử lý cập nhật cài đặt thông báo với API
    console.log('Cập nhật cài đặt thông báo:', notificationSettings);
    
    // Hiển thị thông báo thành công
    notifications.show({
      title: 'Cập nhật cài đặt thông báo',
      message: 'Cài đặt thông báo đã được cập nhật thành công',
      color: 'green',
      icon: <FiCheck />,
    });
  };

  // Xử lý thay đổi giá trị switch
  const handleSwitchChange = (key: keyof NotificationSettings, checked: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: checked
    });
  };

  return (
    <>
      <Title order={4} className="mb-4 text-slate-800">Cài đặt thông báo</Title>
      
      <Box>
        <Text size="sm" fw={600} className="mb-3 text-slate-700">
          Thông báo email
        </Text>
        
        <Stack gap="xs" className="mb-4">
          <Group justify="apart">
            <Text size="sm">Thông báo đơn hàng</Text>
            <Switch
              checked={notificationSettings.emailOrder}
              onChange={(event) => handleSwitchChange('emailOrder', event.currentTarget.checked)}
            />
          </Group>
          <Text size="xs" color="dimmed" ml="md">
            Nhận email khi trạng thái đơn hàng của bạn thay đổi
          </Text>
          
          <Group justify="apart">
            <Text size="sm">Khuyến mãi và ưu đãi</Text>
            <Switch
              checked={notificationSettings.emailPromotion}
              onChange={(event) => handleSwitchChange('emailPromotion', event.currentTarget.checked)}
            />
          </Group>
          <Text size="xs" color="dimmed" ml="md">
            Nhận email về các chương trình khuyến mãi và ưu đãi đặc biệt
          </Text>
          
          <Group justify="apart">
            <Text size="sm">Bản tin</Text>
            <Switch
              checked={notificationSettings.emailNewsletter}
              onChange={(event) => handleSwitchChange('emailNewsletter', event.currentTarget.checked)}
            />
          </Group>
          <Text size="xs" color="dimmed" ml="md">
            Nhận bản tin hàng tháng về sản phẩm mới và xu hướng
          </Text>
        </Stack>
        
        <Divider className="my-4" />
        
        <Text size="sm" fw={600} className="mb-3 text-slate-700">
          Thông báo đẩy
        </Text>
        
        <Stack gap="xs" className="mb-4">
          <Group justify="apart">
            <Text size="sm">Trạng thái đơn hàng</Text>
            <Switch
              checked={notificationSettings.pushOrder}
              onChange={(event) => handleSwitchChange('pushOrder', event.currentTarget.checked)}
            />
          </Group>
          
          <Group justify="apart">
            <Text size="sm">Ưu đãi và khuyến mãi</Text>
            <Switch
              checked={notificationSettings.pushPromotion}
              onChange={(event) => handleSwitchChange('pushPromotion', event.currentTarget.checked)}
            />
          </Group>
          
          <Group justify="apart">
            <Text size="sm">Thông báo hệ thống</Text>
            <Switch
              checked={notificationSettings.pushSystem}
              onChange={(event) => handleSwitchChange('pushSystem', event.currentTarget.checked)}
            />
          </Group>
        </Stack>
        
        <Button
          onClick={handleUpdateNotifications}
          className="mt-2 bg-primary hover:bg-picton-blue-600"
          leftSection={<FiSave size={16} />}
        >
          Lưu cài đặt
        </Button>
      </Box>
    </>
  );
};

export default Notification;