import { Button, Card, Group, Menu, SegmentedControl, Select, Text, TextInput } from '@mantine/core';
import '@mantine/dates/styles.css';
import { useState } from 'react';
import { FiCheck, FiDownload, FiSearch, FiTruck, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { ShopOrderStatus } from '../../../../../types/OrderType';
import HistoryExport from '../Modal/HistoryExport';
import ModalExport from '../Modal/ModalExport';
import type { PreparingStatus, SearchType } from '../../../../../hooks/useOrder';

interface OrderFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchTypeValue: SearchType;
  onSearchTypeValueChange: (value: SearchType) => void;
  sortBy: string | null;
  onSortByChange: (value: string | null) => void;
  currentStatus: ShopOrderStatus | "all";
  totalOrders?: number;
  onStatusFilterChange?: (value: PreparingStatus) => void;
  onFetchWithParam: () => void;
  onClearAll: () => void;

  selectedOrder: string[];
  approvalOrders: () => void;
}

const OrderFilter = ({
  searchTerm,
  onSearchChange,
  searchTypeValue,
  onSearchTypeValueChange,
  sortBy,
  onSortByChange,
  currentStatus = 'all',
  totalOrders = 0,
  onStatusFilterChange,
  onFetchWithParam,
  onClearAll,
  selectedOrder,
  approvalOrders
}: OrderFilterProps) => {
  const [exportModalOpened, setExportModalOpened] = useState(false);
  const [historyModalOpened, setHistoryModalOpened] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const searchTypes = [
    { value: 'order_code', label: 'Mã đơn hàng' },
    { value: 'customer_name', label: 'Tên người mua' },
    { value: 'product_name', label: 'Tên sản phẩm' },
  ];

  const getSearchPlaceholder = () => {
    switch (searchTypeValue) {
      case 'order_code':
        return 'Nhập mã đơn hàng...';
      case 'customer_name':
        return 'Nhập tên người mua...';
      case 'product_name':
        return 'Nhập tên sản phẩm...';
      default:
        return 'Tìm kiếm...';
    }
  };


  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    if (onStatusFilterChange) {
      onStatusFilterChange(value as PreparingStatus);
    }
  };

  return (
    <>
      <Card  px={0} pb={0}>

        {currentStatus === 'PREPARING' &&
          <Group mb="md">
            <Text size="sm" fw={500}>Trạng thái xử lý:</Text>
            <SegmentedControl
              value={statusFilter}
              onChange={handleStatusFilterChange}
              data={[
                { label: 'Tất cả', value: 'all' },
                { label: 'Chưa xử lý', value: 'confirmed' },
                { label: 'Đã xử lý', value: 'preparing' },
              ]}
              size="sm"
              radius="md"
              styles={{
                root: {
                  backgroundColor: '#f5f5f5',
                  padding: '2px',
                },
                label: {
                  fontWeight: 500,
                  fontSize: '13px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                },
                control: {
                  border: 'none',
                  minWidth: '120px',
                }
              }}
            />
          </Group>}

        <Group justify="space-between" mb="md">
          <div className="flex items-center" style={{ width: 440 }}>
            <Select
              data={searchTypes}
              value={searchTypeValue}
              onChange={(value) => onSearchTypeValueChange(value as SearchType)}
              styles={{
                root: { minWidth: 150, maxWidth: 150 },
                input: {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 0
                }
              }}
            />
            <TextInput
              placeholder={getSearchPlaceholder()}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.currentTarget.value)}
              rightSection={<FiSearch size={16} />}
              style={{ flex: 1 }}
              styles={{
                input: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }
              }}
            />
          </div>
          <Group>
            <Select
              placeholder="Sắp xếp theo"
              value={sortBy}
              onChange={onSortByChange}
              data={[
                { value: 'newest', label: 'Đơn hàng mới nhất' },
                { value: 'oldest', label: 'Đơn hàng cũ nhất' }
              ]}
              style={{ width: 200 }}
            />

            <Button
              variant="outline"
              onClick={onClearAll}
              disabled={!searchTerm && !sortBy}
              color="rgba(255, 94, 94, 1)"
              size="xs"
            >
              <FiX size={14} />
            </Button>

            <Button
              variant="outline"
              leftSection={<FiCheck size={14} />}
              onClick={onFetchWithParam}
              disabled={!searchTerm && !sortBy}
              size="xs"
            >
              Áp dụng
            </Button>
          </Group>
        </Group>



        <Group justify="space-between">
          <Group gap="xs">
            <Text size="sm" fw={500}>Số đơn hàng:</Text>
            <Text size="sm" fw={700}>{totalOrders}</Text>
          </Group>
          <Group>
            {currentStatus === 'PREPARING' && (
              <Link to="/myshop/orders/shipping">
                <Button
                  color="blue"
                  leftSection={<FiTruck size={14} />}
                  variant="filled"
                  size='xs'
                >
                  Giao hàng loạt
                </Button>
              </Link>
            )}

            {currentStatus === 'PENDING_CONFIRMATION' && (
              <Button
                  color="blue"
                  leftSection={<FiCheck size={14} />}
                  variant="filled"
                  size='xs'
                  disabled={selectedOrder.length === 0}
                  onClick={() => {approvalOrders()}}
                >
                  Duyệt đơn
                </Button>
            )}

            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <Button
                  variant="outline"
                  leftSection={<FiDownload size={14} />}
                  size="xs"
                >
                  Xuất
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => setExportModalOpened(true)}>
                  Xuất
                </Menu.Item>
                <Menu.Item onClick={() => setHistoryModalOpened(true)}>
                  Lịch sử xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

      </Card>

      {/* Modals */}
      <ModalExport
        opened={exportModalOpened}
        onClose={() => setExportModalOpened(false)}
      />

      <HistoryExport
        opened={historyModalOpened}
        onClose={() => setHistoryModalOpened(false)}
      />
    </>
  );
};

export default OrderFilter;