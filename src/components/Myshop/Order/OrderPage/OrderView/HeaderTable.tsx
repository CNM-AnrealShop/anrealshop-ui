import { Box, Card, Checkbox, Group, Text } from '@mantine/core';
import type { ShopOrderStatus } from '../../../../../types/OrderType';

type HeaderTableProps = {
    selectAll: boolean;
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currentStatus: ShopOrderStatus | 'all';
}
const HeaderTable = ({ currentStatus, onSelectAll, selectAll }: HeaderTableProps) => {
    return (
        <Card withBorder p={0} className="!bg-gray-50">
            <Box className="px-4 py-3">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <Group gap="sm">
                           {currentStatus === 'PENDING_CONFIRMATION' && (
                             <Checkbox
                                checked={selectAll}
                                onChange={onSelectAll}
                            />
                           )}
                            <Text size="sm" fw={500}>
                                Sản phẩm
                            </Text>
                        </Group>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Thanh toán
                        </Text>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Trạng thái
                        </Text>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Vận chuyển
                        </Text>
                    </div>
                    <div className="col-span-2 text-center">
                        <Text size="sm" fw={500}>
                            Thao tác
                        </Text>
                    </div>
                </div>
            </Box>
        </Card>
    );
};

export default HeaderTable;
