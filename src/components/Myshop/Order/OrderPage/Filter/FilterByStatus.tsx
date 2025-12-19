import { Tabs, Text } from '@mantine/core';
import type { OrderStatusDto, ShopOrderStatus } from '../../../../../types/OrderType';


interface FilterByStatusProps {
  selectedStatus: any;
  onStatusChange: (status: ShopOrderStatus | "all") => void;
  orderStatusData: OrderStatusDto[];
  isShowCount?: boolean;
}

const FilterByStatus = ({ selectedStatus, onStatusChange, orderStatusData, isShowCount = true }: FilterByStatusProps) => {
  const handleStatusChange = (value: string | null) => {
    if (value as ShopOrderStatus | "all" != selectedStatus) {
      onStatusChange(value as ShopOrderStatus | "all");
    }
  };

  return (
    <div className="pb-0">
      <Tabs
        value={selectedStatus}
        onChange={handleStatusChange}
        classNames={{
          list: "border-b-0",
          tab: "px-4 py-2 font-medium data-[active]:bg-blue-50 data-[active]:text-blue-600 data-[active]:border-blue-200",
          tabLabel: "flex items-center"
        }}
      >
        <Tabs.List>
          {orderStatusData.map((status) => {
            const isActive = status.id.toLocaleLowerCase() === selectedStatus.toLocaleLowerCase();
            const statusCount = orderStatusData.find(s => s.id === status.id)?.count || 0;

            return (
              <Tabs.Tab
                key={status.id}
                value={status.id}
                className={`!py-3 !px-4 cursor-pointer transition-colors duration-200 ${isActive
                  ? '!text-primary border-b-2 !border-primary'
                  : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-2 min-w-24 justify-center">
                  {status.name}
                  {isShowCount && <Text
                    size="sm"
                    fw={500}
                  >
                    ({statusCount})
                  </Text>}
                </div>
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default FilterByStatus;