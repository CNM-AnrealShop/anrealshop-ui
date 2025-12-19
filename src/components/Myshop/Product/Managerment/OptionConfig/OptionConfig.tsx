import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Tooltip,
} from '@mantine/core';
import {
  FiGrid,
  FiLayers,
  FiList,
  FiPlus,
  FiSettings,
  FiTag
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface OptionConfigProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const OptionConfig = ({ viewMode, onViewModeChange }: OptionConfigProps) => {

  return (
    <div className="">
      <Group justify="space-between">
        <Group>
          {/* Cài đặt sản phẩm */}
          <Menu shadow="md" width={220} position="bottom-start">
            <Menu.Target>
              <Button
                leftSection={<FiSettings size={16} />}
                variant="light"
                color="blue"
              >
                Cài đặt sản phẩm
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Tùy chỉnh hiển thị</Menu.Label>
              <Menu.Item leftSection={<FiGrid size={14} />}>
                Hiển thị thuộc tính
              </Menu.Item>
              <Menu.Item leftSection={<FiTag size={14} />}>
                Quản lý thẻ
              </Menu.Item>
              <Menu.Divider />

              <Menu.Label>Phân loại</Menu.Label>
              <Menu.Item leftSection={<FiLayers size={14} />}>
                Quản lý danh mục
              </Menu.Item>
              <Menu.Item leftSection={<FiList size={14} />}>
                Trường tùy chỉnh
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Link to="/myshop/products/create">
            <Button
              leftSection={<FiPlus size={16} />}
              variant="filled"
              className="bg-primary hover:bg-primary/90"
              component="span"
            >
              Thêm mới sản phẩm
            </Button>
          </Link>
        </Group>

        <Group gap="xs">
          <Tooltip label="Chế độ lưới" withArrow position="bottom">
            <ActionIcon
              variant="default"
              size="lg"
              radius="md"
              className={
                viewMode === 'grid'
                  ? "!bg-blue-50 !text-primary !border-blue-200 hover:bg-blue-100"
                  : "text-gray-600 hover:bg-gray-100"
              }
              onClick={() => onViewModeChange('grid')}
            >
              <FiGrid size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Chế độ danh sách" withArrow position="bottom">
            <ActionIcon
              variant="default"
              size="lg"
              radius="md"
              className={
                viewMode === 'list'
                  ? "!bg-blue-50 !text-primary !border-blue-200 hover:bg-blue-100"
                  : "text-gray-600 hover:bg-gray-100"
              }
              onClick={() => onViewModeChange('list')}
            >
              <FiList size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>


    </div>
  );
};

export default OptionConfig;