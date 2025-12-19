import { Card, Group, Title, CopyButton, Tooltip, ActionIcon, Menu } from '@mantine/core';
import { FiCopy, FiPrinter, FiDownload, FiMoreVertical, FiClipboard, FiBarChart } from 'react-icons/fi';

interface OptionProps {
  orderNumber: string;
  onPrint: () => void;
}

const Option = ({ orderNumber, onPrint }: OptionProps) => {
  return (
    <Card withBorder p="md">
      <Group justify="space-between">
        <Group>
          <Title order={4}>Chi tiết đơn hàng #{orderNumber}</Title>
          <CopyButton value={orderNumber}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Đã sao chép" : "Sao chép mã đơn hàng"} withArrow position="right">
                <ActionIcon size="sm" onClick={copy} variant="subtle">
                  <FiCopy size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
        <Group>
          <Tooltip label="In đơn hàng">
            <ActionIcon variant="light" size="lg" onClick={onPrint}>
              <FiPrinter size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Tải xuống">
            <ActionIcon variant="light" size="lg">
              <FiDownload size={18} />
            </ActionIcon>
          </Tooltip>
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="light" size="lg">
                <FiMoreVertical size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<FiClipboard size={14} />}>
                Xuất hóa đơn
              </Menu.Item>
              <Menu.Item leftSection={<FiBarChart size={14} />}>
                Thống kê đơn hàng
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Card>
  );
};

export default Option;
